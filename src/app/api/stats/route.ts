import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || '');

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const days = parseInt(searchParams.get('days') || '7');

    const stats: any = {
      pageviews: {},
      visitors: {},
      referrers: {},
      countries: {},
      recent: [],
      topPages: [],
    };

    // Get date range
    const dates: string[] = [];
    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split('T')[0]);
    }

    // Collect stats for each day
    for (const date of dates) {
      // Total pageviews
      const pageviews = await redis.get(`stats:pageviews:${date}:total`);
      stats.pageviews[date] = parseInt(pageviews || '0');

      // Unique visitors
      const visitors = await redis.scard(`stats:visitors:${date}`);
      stats.visitors[date] = visitors;

      // Get all pageview keys for this date to find top pages
      const keys = await redis.keys(`stats:pageviews:${date}:*`);
      for (const key of keys) {
        if (key.endsWith(':total')) continue;
        const page = key.replace(`stats:pageviews:${date}:`, '');
        const count = await redis.get(key);
        const existing = stats.topPages.find((p: any) => p.page === page);
        if (existing) {
          existing.views += parseInt(count || '0');
        } else {
          stats.topPages.push({ page, views: parseInt(count || '0') });
        }
      }

      // Get referrers
      const refKeys = await redis.keys(`stats:referrers:${date}:*`);
      for (const key of refKeys) {
        const referrer = key.replace(`stats:referrers:${date}:`, '');
        const count = await redis.get(key);
        if (stats.referrers[referrer]) {
          stats.referrers[referrer] += parseInt(count || '0');
        } else {
          stats.referrers[referrer] = parseInt(count || '0');
        }
      }

      // Get countries
      const countryKeys = await redis.keys(`stats:countries:${date}:*`);
      for (const key of countryKeys) {
        const country = key.replace(`stats:countries:${date}:`, '');
        const count = await redis.get(key);
        if (stats.countries[country]) {
          stats.countries[country] += parseInt(count || '0');
        } else {
          stats.countries[country] = parseInt(count || '0');
        }
      }
    }

    // Get recent visits
    const recent = await redis.zrevrange('stats:recent', 0, 19);
    stats.recent = recent.map((r) => JSON.parse(r));

    // Sort top pages
    stats.topPages.sort((a: any, b: any) => b.views - a.views);
    stats.topPages = stats.topPages.slice(0, 10);

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
