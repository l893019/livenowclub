import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';
import { requireAdmin } from '@/lib/adminAuth';

const redis = new Redis(process.env.REDIS_URL || '');

const SUBSTACK_URL = process.env.SUBSTACK_URL || 'https://louiseireland.substack.com';

// Substack no longer accepts server-side signups (its /api/v1/free endpoint
// returns 403 without a real browser session), so this route records the
// signup for our own records and hands the visitor off to Substack's
// subscribe page with their email pre-filled, one click to finish.
export async function POST(request: NextRequest) {
  try {
    const { email, identity, quizAnswers, referrer } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const date = timestamp.split('T')[0];

    // Get visitor context
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const visitorId = Buffer.from(`${ip}-${userAgent}`).toString('base64').slice(0, 16);

    const signupData = {
      email,
      identity,
      quizAnswers,
      referrer,
      timestamp,
      visitorId,
      substackStatus: 'handoff',
    };

    // Save to Redis
    await redis.set(`email:${email}`, JSON.stringify(signupData));
    await redis.zadd('emails:all', Date.now(), email);

    // Track by identity
    if (identity) {
      await redis.sadd(`emails:identity:${identity}`, email);
    }

    // Track funnel metrics
    await redis.incr(`stats:emails:${date}`);
    await redis.incr(`stats:emails:total`);

    return NextResponse.json({
      success: true,
      message: 'Almost done. Confirm on Substack and you\'re in.',
      substackAdded: false,
      substackUrl: `${SUBSTACK_URL}/subscribe?email=${encodeURIComponent(email)}&utm_source=livenowclub`,
    });
  } catch (error: any) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription', details: error.message },
      { status: 500 }
    );
  }
}

// Admin-only: export all captured signups (newest first) so they can be
// cross-checked against the Substack subscriber list.
export async function GET(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const emails = await redis.zrange('emails:all', 0, -1, 'REV');
    const signups = [];
    for (const email of emails) {
      const dataStr = await redis.get(`email:${email}`);
      signups.push(dataStr ? JSON.parse(dataStr) : { email });
    }
    return NextResponse.json({ total: signups.length, signups });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
