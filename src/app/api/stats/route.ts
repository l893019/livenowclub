import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';
import { identities } from '@/lib/identities';

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
      emails: {
        total: 0,
        byDate: {},
        byIdentity: {},
        substackSuccess: 0,
        substackFailed: 0,
      },
      events: {},
      funnel: {
        quizStarted: 0,
        quizCompleted: 0,
        emailSignup: 0,
        completionRate: 0,
        signupRate: 0,
      },
      users: {
        total: 0,
        recent: [],
        byIdentity: {},
        byDate: {},
      },
      utopias: {
        total: 0,
        recent: [],
      },
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

    // Get email metrics
    stats.emails.total = parseInt(await redis.get('stats:emails:total') || '0');

    // Get email signups by date
    for (const date of dates) {
      const count = await redis.get(`stats:emails:${date}`);
      stats.emails.byDate[date] = parseInt(count || '0');

      const substackSuccess = await redis.get(`stats:substack:success:${date}`);
      stats.emails.substackSuccess += parseInt(substackSuccess || '0');

      const substackFailed = await redis.get(`stats:substack:failed:${date}`);
      stats.emails.substackFailed += parseInt(substackFailed || '0');
    }

    // Get email counts by identity
    const identityKeys = await redis.keys('emails:identity:*');
    for (const key of identityKeys) {
      const identity = key.replace('emails:identity:', '');
      const count = await redis.scard(key);
      stats.emails.byIdentity[identity] = count;
    }

    // Get event metrics
    for (const date of dates) {
      const eventKeys = await redis.keys(`stats:events:${date}:*`);
      for (const key of eventKeys) {
        const event = key.replace(`stats:events:${date}:`, '');
        const count = await redis.get(key);
        if (stats.events[event]) {
          stats.events[event] += parseInt(count || '0');
        } else {
          stats.events[event] = parseInt(count || '0');
        }
      }
    }

    // Calculate funnel metrics
    stats.funnel.quizStarted = parseInt(await redis.get('stats:events:total:quiz_started') || '0');
    stats.funnel.quizCompleted = parseInt(await redis.get('stats:events:total:quiz_completed') || '0');
    stats.funnel.emailSignup = stats.emails.total;

    if (stats.funnel.quizStarted > 0) {
      stats.funnel.completionRate = Math.round((stats.funnel.quizCompleted / stats.funnel.quizStarted) * 100);
    }
    if (stats.funnel.quizCompleted > 0) {
      stats.funnel.signupRate = Math.round((stats.funnel.emailSignup / stats.funnel.quizCompleted) * 100);
    }

    // Get user stats
    const userKeys = await redis.keys('user:*');
    // Filter out user:{id}:utopias keys, only get user:{id} keys
    const actualUserKeys = userKeys.filter(k => !k.includes(':utopias'));
    stats.users.total = actualUserKeys.length;

    // Get all users and sort by creation date
    const users: any[] = [];
    for (const key of actualUserKeys) {
      try {
        const userData = await redis.get(key);
        if (userData) {
          const user = JSON.parse(userData);
          users.push(user);

          // Count by identity/archetype - use friendly name
          const archetype = user.archetype || 'Unknown';
          const identity = identities[archetype];
          const identityName = identity ? identity.name : archetype;
          stats.users.byIdentity[identityName] = (stats.users.byIdentity[identityName] || 0) + 1;

          // Count by date
          if (user.createdAt) {
            const date = user.createdAt.split('T')[0];
            if (dates.includes(date)) {
              stats.users.byDate[date] = (stats.users.byDate[date] || 0) + 1;
            }
          }
        }
      } catch (e) {
        // Skip invalid user data
        continue;
      }
    }

    // Sort by creation date and get recent users
    users.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });

    stats.users.recent = users.slice(0, 20).map(u => {
      // Get the friendly identity name from the identities map
      const identity = identities[u.archetype];
      const identityName = identity ? identity.name : u.archetype;

      return {
        id: u.id,
        name: u.name,
        archetype: u.archetype,
        identityName: identityName,
        email: u.email,
        createdAt: u.createdAt,
      };
    });

    // Get utopia stats
    const utopiaKeys = await redis.keys('utopia:*');
    stats.utopias.total = utopiaKeys.length;

    const utopias: any[] = [];
    for (const key of utopiaKeys) {
      try {
        const utopiaData = await redis.get(key);
        if (utopiaData) {
          const utopia = JSON.parse(utopiaData);
          utopias.push(utopia);
        }
      } catch (e) {
        continue;
      }
    }

    // Sort by creation date and get recent utopias
    utopias.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });

    stats.utopias.recent = utopias.slice(0, 10).map(u => ({
      slug: u.slug,
      name: u.name,
      memberCount: u.members?.length || 0,
      createdAt: u.createdAt,
      createdBy: u.createdBy,
    }));

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
