import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || '');

export async function POST(request: NextRequest) {
  try {
    const { page, referrer, event, identity, context, metadata } = await request.json();

    // Get visitor info
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const country = request.headers.get('x-vercel-ip-country') || 'unknown';

    // Create unique visitor ID (hash of IP + user agent)
    const visitorId = Buffer.from(`${ip}-${userAgent}`).toString('base64').slice(0, 16);

    const timestamp = new Date().toISOString();
    const date = timestamp.split('T')[0]; // YYYY-MM-DD

    // Track events (quiz started, email signup, etc.)
    if (event) {
      await redis.incr(`stats:events:${date}:${event}`);
      await redis.incr(`stats:events:total:${event}`);

      // Store event details
      await redis.zadd(
        `stats:events:${event}`,
        Date.now(),
        JSON.stringify({ timestamp, identity, context, metadata, page })
      );

      // Keep only last 1000 events per type
      await redis.zremrangebyrank(`stats:events:${event}`, 0, -1001);
    }

    // Track pageview (only if no event, or if it's a pageview event)
    if (!event || event === 'pageview') {
      await redis.incr(`stats:pageviews:${date}:${page}`);
      await redis.incr(`stats:pageviews:${date}:total`);
    }

    // Track unique visitors (using set for deduplication)
    await redis.sadd(`stats:visitors:${date}`, visitorId);

    // Track referrers
    if (referrer && referrer !== '') {
      await redis.incr(`stats:referrers:${date}:${referrer}`);
    }

    // Track countries
    await redis.incr(`stats:countries:${date}:${country}`);

    // Store recent visit
    await redis.zadd(
      `stats:recent`,
      Date.now(),
      JSON.stringify({ page, timestamp, country, referrer })
    );

    // Keep only last 100 recent visits
    await redis.zremrangebyrank('stats:recent', 0, -101);

    // Set expiry on daily keys (keep 90 days)
    await redis.expire(`stats:pageviews:${date}:${page}`, 90 * 24 * 60 * 60);
    await redis.expire(`stats:pageviews:${date}:total`, 90 * 24 * 60 * 60);
    await redis.expire(`stats:visitors:${date}`, 90 * 24 * 60 * 60);
    await redis.expire(`stats:referrers:${date}:${referrer}`, 90 * 24 * 60 * 60);
    await redis.expire(`stats:countries:${date}:${country}`, 90 * 24 * 60 * 60);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
