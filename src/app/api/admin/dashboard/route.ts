import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || '');

export async function GET(request: NextRequest) {
  try {
    // Simple auth check - replace with something more secure
    const authHeader = request.headers.get('authorization');
    const expectedAuth = process.env.ADMIN_API_KEY;

    if (!expectedAuth || authHeader !== `Bearer ${expectedAuth}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    // Total pageviews
    let totalPageviews = 0;
    let essayPageviews = 0;
    let homepagePageviews = 0;

    for (const date of dates) {
      const total = await redis.get(`stats:pageviews:${date}:total`);
      const homepage = await redis.get(`stats:pageviews:${date}:/`);

      if (total) totalPageviews += parseInt(total);
      if (homepage) homepagePageviews += parseInt(homepage);

      const keys = await redis.keys(`stats:pageviews:${date}:/read/*`);
      for (const key of keys) {
        const count = await redis.get(key);
        if (count) essayPageviews += parseInt(count);
      }
    }

    // Email signups
    let totalSignups = 0;
    for (const date of dates) {
      const signups = await redis.get(`stats:emails:${date}`);
      if (signups) totalSignups += parseInt(signups);
    }

    // Exit-intent popup stats
    let exitIntentShown = 0;
    let exitIntentDismissed = 0;

    for (const date of dates) {
      const shown = await redis.get(`stats:events:${date}:exit_intent_shown`);
      const dismissed = await redis.get(`stats:events:${date}:exit_intent_dismissed`);
      if (shown) exitIntentShown += parseInt(shown);
      if (dismissed) exitIntentDismissed += parseInt(dismissed);
    }

    // Get exit-intent signups
    const exitIntentEvents = await redis.zrange('stats:events:email_signup', 0, -1);
    let exitIntentSignups = 0;
    for (const eventStr of exitIntentEvents) {
      try {
        const event = JSON.parse(eventStr);
        if (event.context === 'exit-intent') {
          exitIntentSignups++;
        }
      } catch (e) {}
    }

    // Scroll slide-in stats
    let slideInShown = 0;
    let slideInDismissed = 0;

    for (const date of dates) {
      const shown = await redis.get(`stats:events:${date}:scroll_slidein_shown`);
      const dismissed = await redis.get(`stats:events:${date}:scroll_slidein_dismissed`);
      if (shown) slideInShown += parseInt(shown);
      if (dismissed) slideInDismissed += parseInt(dismissed);
    }

    // Get scroll slide-in signups
    let slideInSignups = 0;
    for (const eventStr of exitIntentEvents) {
      try {
        const event = JSON.parse(eventStr);
        if (event.context === 'essay' && event.page === '/') {
          slideInSignups++;
        }
      } catch (e) {}
    }

    // Daily breakdown
    const dailyData = [];
    for (const date of dates.reverse()) {
      const views = await redis.get(`stats:pageviews:${date}:total`) || '0';
      const exitPop = await redis.get(`stats:events:${date}:exit_intent_shown`) || '0';
      const slideIn = await redis.get(`stats:events:${date}:scroll_slidein_shown`) || '0';
      const signups = await redis.get(`stats:emails:${date}`) || '0';

      dailyData.push({
        date,
        views: parseInt(views),
        exitPopupShown: parseInt(exitPop),
        slideInShown: parseInt(slideIn),
        signups: parseInt(signups),
      });
    }

    // Top essays
    const essayCounts: Record<string, number> = {};
    for (const date of dates) {
      const keys = await redis.keys(`stats:pageviews:${date}:/read/*`);
      for (const key of keys) {
        const parts = key.split(':');
        const essay = parts.slice(3).join(':');
        const count = await redis.get(key);
        essayCounts[essay] = (essayCounts[essay] || 0) + parseInt(count || '0');
      }
    }

    const topEssays = Object.entries(essayCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([essay, count]) => ({
        slug: essay.replace('/read/', ''),
        views: count,
      }));

    const response = {
      period: 'Last 7 Days',
      overview: {
        totalPageviews,
        homepagePageviews,
        essayPageviews,
        totalSignups,
        overallConversionRate: totalPageviews > 0 ? ((totalSignups / totalPageviews) * 100).toFixed(2) : '0.00',
      },
      exitIntentPopup: {
        shown: exitIntentShown,
        dismissed: exitIntentDismissed,
        signups: exitIntentSignups,
        impressionRate: essayPageviews > 0 ? ((exitIntentShown / essayPageviews) * 100).toFixed(1) : '0.0',
        dismissRate: exitIntentShown > 0 ? ((exitIntentDismissed / exitIntentShown) * 100).toFixed(1) : '0.0',
        conversionRate: exitIntentShown > 0 ? ((exitIntentSignups / exitIntentShown) * 100).toFixed(2) : '0.00',
      },
      scrollSlideIn: {
        shown: slideInShown,
        dismissed: slideInDismissed,
        signups: slideInSignups,
        impressionRate: homepagePageviews > 0 ? ((slideInShown / homepagePageviews) * 100).toFixed(1) : '0.0',
        dismissRate: slideInShown > 0 ? ((slideInDismissed / slideInShown) * 100).toFixed(1) : '0.0',
        conversionRate: slideInShown > 0 ? ((slideInSignups / slideInShown) * 100).toFixed(2) : '0.00',
      },
      dailyBreakdown: dailyData,
      topEssays,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
