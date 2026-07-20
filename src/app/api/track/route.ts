import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || '');

/**
 * Analytics tracking endpoint
 *
 * Tracked events:
 * - pageview: Page views (automatic)
 * - scroll_depth: Scroll milestones (25%, 50%, 75%, 100%)
 * - scroll_depth_final: Final scroll position on page exit
 * - related_essays_impression: Related Essays section became visible
 * - related_essays_click: User clicked a related essay
 */
export async function POST(request: NextRequest) {
  try {
    const { page, referrer, event, identity, context, metadata, sessionId, noTrack } = await request.json();

    // Skip tracking if noTrack flag is set
    if (noTrack) {
      return NextResponse.json({ success: true, tracked: false });
    }

    // Get visitor info
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const country = request.headers.get('x-vercel-ip-country') || 'unknown';

    // Skip bots and uptime monitors (they execute JS and hit this endpoint)
    if (/bot|crawl|spider|slurp|monitor|pingdom|uptime|headless|lighthouse|python|curl|wget|scrapy|phantom/i.test(userAgent)) {
      return NextResponse.json({ success: true, tracked: false });
    }

    // A pageview is the default POST (no event) or an explicit pageview event.
    // Everything else (scroll_depth, impressions, signups) is an interaction
    // event and must not feed pageview-derived stats: session journeys, the
    // recent-visits feed, referrer and country counters.
    const isPageview = !event || event === 'pageview';

    // Create unique visitor ID (hash of IP + user agent)
    const visitorId = Buffer.from(`${ip}-${userAgent}`).toString('base64').slice(0, 16);

    const timestamp = new Date().toISOString();
    const date = timestamp.split('T')[0]; // YYYY-MM-DD
    const now = Date.now();

    // Track session if sessionId provided
    if (sessionId) {
      const sessionKey = `session:${sessionId}`;
      const sessionData = await redis.get(sessionKey);

      if (sessionData) {
        // Existing session - update
        const session = JSON.parse(sessionData);
        session.lastSeen = now;
        if (isPageview) {
          session.lastPage = page;
          session.pageCount = (session.pageCount || 1) + 1;
          session.pages = session.pages || [];
          session.pages.push({ page, timestamp: now });
        }

        await redis.setex(sessionKey, 1800, JSON.stringify(session)); // 30 min expiry
      } else {
        // New session
        const session = {
          id: sessionId,
          startPage: page,
          lastPage: page,
          startTime: now,
          lastSeen: now,
          pageCount: 1,
          pages: [{ page, timestamp: now }],
          referrer,
          country,
        };

        await redis.setex(sessionKey, 1800, JSON.stringify(session));

        // Track daily sessions
        await redis.incr(`stats:sessions:${date}`);
      }

      // Store completed sessions for analysis
      const sessionAge = now - (sessionData ? JSON.parse(sessionData).lastSeen : now);
      if (sessionAge > 300000) { // 5 minutes of inactivity = session ended
        const session = JSON.parse(sessionData || '{}');
        const duration = session.lastSeen - session.startTime;

        await redis.zadd(
          `stats:sessions:completed`,
          now,
          JSON.stringify({
            ...session,
            duration,
            endTime: now,
            referrer: session.referrer || referrer || '', // Preserve original referrer
            visitorId, // Add visitor ID for tracking
          })
        );

        // Keep last 1000 completed sessions
        await redis.zremrangebyrank(`stats:sessions:completed`, 0, -1001);
      }
    }

    // Track events (quiz started, email signup, etc.)
    if (event) {
      await redis.incr(`stats:events:${date}:${event}`);
      await redis.incr(`stats:events:total:${event}`);

      // Store event details
      await redis.zadd(
        `stats:events:${event}`,
        Date.now(),
        JSON.stringify({ timestamp, identity, context, metadata, page, visitorId })
      );

      // Keep only last 1000 events per type
      await redis.zremrangebyrank(`stats:events:${event}`, 0, -1001);
    }

    // Track pageview-derived stats (pageviews, referrers, countries, recent feed)
    const isInternalReferrer = referrer && /livenowclub\.com/i.test(referrer);
    if (isPageview) {
      await redis.incr(`stats:pageviews:${date}:${page}`);
      await redis.incr(`stats:pageviews:${date}:total`);

      // Track referrers (external only)
      if (referrer && referrer !== '' && !isInternalReferrer) {
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
    }

    // Track unique visitors (using set for deduplication)
    await redis.sadd(`stats:visitors:${date}`, visitorId);

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
