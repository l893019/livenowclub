import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';
import { requireAdmin } from '@/lib/adminAuth';

const redis = new Redis(process.env.REDIS_URL || '');

// Which essays do people come back to? Combines the full 90-day per-essay
// pageview counts (no top-10 truncation) with repeat-reader analysis from
// stored sessions: a "reread" is the same visitorId opening the same essay
// in more than one session.
export async function GET(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const days = Math.min(parseInt(request.nextUrl.searchParams.get('days') || '90'), 90);

    // Full per-essay view counts and active-day counts
    const perEssay: Record<string, { views: number; activeDays: number }> = {};
    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const date = d.toISOString().split('T')[0];
      const keys = await redis.keys(`stats:pageviews:${date}:/read/*`);
      for (const key of keys) {
        const slug = key.replace(`stats:pageviews:${date}:/read/`, '');
        if (slug.includes('/')) continue;
        const count = parseInt((await redis.get(key)) || '0');
        if (!perEssay[slug]) perEssay[slug] = { views: 0, activeDays: 0 };
        perEssay[slug].views += count;
        if (count > 0) perEssay[slug].activeDays += 1;
      }
    }

    // Repeat readers from completed sessions
    const raw = await redis.zrange('stats:sessions:completed', 0, -1);
    const visits: Record<string, Record<string, number>> = {}; // slug -> visitorId -> session count
    let sessionsParsed = 0;
    for (const s of raw) {
      try {
        const session = JSON.parse(s);
        const visitor = session.visitorId;
        if (!visitor || !Array.isArray(session.pages)) continue;
        sessionsParsed++;
        const slugsInSession = new Set<string>();
        for (const p of session.pages) {
          const m = typeof p.page === 'string' && p.page.match(/^\/read\/([^/]+)$/);
          if (m) slugsInSession.add(m[1]);
        }
        for (const slug of slugsInSession) {
          visits[slug] = visits[slug] || {};
          visits[slug][visitor] = (visits[slug][visitor] || 0) + 1;
        }
      } catch {}
    }

    const essays = Object.entries(perEssay)
      .map(([slug, v]) => {
        const readers = visits[slug] || {};
        const distinct = Object.keys(readers).length;
        const repeat = Object.values(readers).filter((n) => n >= 2).length;
        const maxSessions = Math.max(0, ...Object.values(readers));
        return {
          slug,
          views: v.views,
          activeDays: v.activeDays,
          distinctReaders: distinct,
          repeatReaders: repeat,
          maxSessionsBySameReader: maxSessions,
        };
      })
      .sort((a, b) => b.views - a.views);

    return NextResponse.json({ days, sessionsAnalyzed: sessionsParsed, essays });
  } catch (error: any) {
    console.error('Rereads error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
