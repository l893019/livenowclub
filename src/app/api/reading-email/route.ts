import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';
import { getIdentity } from '@/lib/identities';
import { getPreGeneratedReading, identityToReading } from '@/lib/identity-to-reading';
import { sendReadingEmail } from '@/lib/email';

const redis = new Redis(process.env.REDIS_URL || '');

// Emails a quiz-taker their worldview reading and records the address the
// same way /api/subscribe does, so all captures live in one list.
export async function POST(request: NextRequest) {
  try {
    const { email, identityKey, acquisition } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    const identity = identityKey ? getIdentity(identityKey) : undefined;
    if (!identity) {
      return NextResponse.json({ error: 'Unknown identity' }, { status: 400 });
    }

    const reading = getPreGeneratedReading(identityKey) || identityToReading(identity);

    const result = await sendReadingEmail({
      toEmail: email,
      identityKey,
      identityName: identity.name,
      identityColor: identity.color,
      coreBeliefs: identity.coreBeliefs,
      superpower: identity.superpower,
      pattern: reading.pattern,
      gifts: reading.gifts,
      movement: reading.movement,
      tradeoff: reading.tradeoff,
    });

    // Record the capture regardless of transport hiccups; the address is the asset
    const timestamp = new Date().toISOString();
    const date = timestamp.split('T')[0];
    await redis.set(`email:${email}`, JSON.stringify({
      email,
      identity: identity.name,
      acquisition,
      timestamp,
      substackStatus: 'reading-email',
      readingSent: result.success,
    }));
    await redis.zadd('emails:all', Date.now(), email);
    await redis.sadd(`emails:identity:${identity.name}`, email);
    await redis.incr(`stats:emails:${date}`);
    await redis.incr(`stats:emails:total`);
    if (acquisition && typeof acquisition === 'string') {
      await redis.hincrby(`stats:acquisition-signups:${date}`, acquisition.slice(0, 100), 1);
      await redis.expire(`stats:acquisition-signups:${date}`, 90 * 24 * 60 * 60);
    }

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Could not send right now. Your reading is saved at this page.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Reading email error:', error);
    return NextResponse.json({ error: 'Failed to send reading' }, { status: 500 });
  }
}
