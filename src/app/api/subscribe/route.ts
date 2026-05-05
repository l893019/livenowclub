import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';
import { checkRateLimit, getClientIP, RateLimitError, RATE_LIMITS } from '@/lib/ratelimit';

const redis = new Redis(process.env.REDIS_URL || '');

export async function POST(request: NextRequest) {
  // Rate limiting
  const clientIP = getClientIP(request);
  try {
    await checkRateLimit('ip', clientIP, 'subscribe', RATE_LIMITS.subscribe.limit, RATE_LIMITS.subscribe.window);
  } catch (error) {
    if (error instanceof RateLimitError) {
      return NextResponse.json(
        { error: 'Too many requests' },
        {
          status: 429,
          headers: {
            'Retry-After': error.retryAfter.toString()
          }
        }
      );
    }
    throw error;
  }

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

    // Store email signup data
    const signupData: {
      email: string;
      identity: string | undefined;
      quizAnswers: unknown;
      referrer: string | undefined;
      timestamp: string;
      visitorId: string;
      substackStatus: string;
      substackError?: string;
    } = {
      email,
      identity,
      quizAnswers,
      referrer,
      timestamp,
      visitorId,
      substackStatus: 'pending',
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

    // Try to add to Substack
    let substackSuccess = false;
    let substackError = null;

    try {
      const substackUrl = process.env.SUBSTACK_URL || 'https://louiseireland.substack.com';
      const substackResponse = await fetch(`${substackUrl}/api/v1/free?nojs=true`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (compatible)',
        },
        body: new URLSearchParams({
          email,
          source: 'subscribe_page',
        }),
      });

      if (substackResponse.ok) {
        substackSuccess = true;
        signupData.substackStatus = 'subscribed';
        await redis.set(`email:${email}`, JSON.stringify(signupData));
        await redis.incr(`stats:substack:success:${date}`);
      } else {
        substackError = `Status ${substackResponse.status}`;
        signupData.substackStatus = 'failed';
        signupData.substackError = substackError;
        await redis.set(`email:${email}`, JSON.stringify(signupData));
        await redis.incr(`stats:substack:failed:${date}`);

        // Add to retry queue
        await redis.zadd('emails:retry', Date.now(), email);
      }
    } catch (error: any) {
      substackError = error.message;
      signupData.substackStatus = 'failed';
      signupData.substackError = substackError;
      await redis.set(`email:${email}`, JSON.stringify(signupData));
      await redis.incr(`stats:substack:failed:${date}`);

      // Add to retry queue
      await redis.zadd('emails:retry', Date.now(), email);
    }

    // Return response
    if (substackSuccess) {
      return NextResponse.json({
        success: true,
        message: 'Check your email to confirm your subscription!',
        substackAdded: true,
      });
    } else {
      // Fallback: provide Substack link with pre-filled email
      const substackUrl = process.env.SUBSTACK_URL || 'https://louiseireland.substack.com';
      return NextResponse.json({
        success: true,
        message: 'Almost there! Click below to complete your subscription.',
        substackAdded: false,
        substackUrl: `${substackUrl}?email=${encodeURIComponent(email)}`,
        error: substackError,
      });
    }
  } catch (error: any) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription', details: error.message },
      { status: 500 }
    );
  }
}

// Retry failed Substack additions (can be called via cron or manually)
export async function GET(request: NextRequest) {
  try {
    // Get failed emails from retry queue
    const emails = await redis.zrange('emails:retry', 0, 9); // Process 10 at a time
    const results = [];

    for (const email of emails) {
      const dataStr = await redis.get(`email:${email}`);
      if (!dataStr) continue;

      const data = JSON.parse(dataStr);

      // Try Substack again
      try {
        const substackUrl = process.env.SUBSTACK_URL || 'https://louiseireland.substack.com';
        const response = await fetch(`${substackUrl}/api/v1/free?nojs=true`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (compatible)',
          },
          body: new URLSearchParams({
            email,
            source: 'subscribe_page',
          }),
        });

        if (response.ok) {
          data.substackStatus = 'subscribed';
          data.retriedAt = new Date().toISOString();
          await redis.set(`email:${email}`, JSON.stringify(data));
          await redis.zrem('emails:retry', email);
          results.push({ email, status: 'success' });
        } else {
          results.push({ email, status: 'still_failed', error: `Status ${response.status}` });
        }
      } catch (error: any) {
        results.push({ email, status: 'still_failed', error: error.message });
      }

      // Rate limit: 1 request per second
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return NextResponse.json({
      processed: results.length,
      results,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
