import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';
import { requireAdmin } from '@/lib/adminAuth';

const redis = new Redis(process.env.REDIS_URL || '');

// Scroll-depth distribution per page from the stored scroll_depth events
// (last 1000). For each page: how many distinct readers hit each milestone,
// so we can see where people actually stop.
export async function GET(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const raw = await redis.zrange('stats:events:scroll_depth', 0, -1, 'WITHSCORES');
    // pages -> depth -> set of reader ids (session if present, else visitor+day)
    const pages: Record<string, Record<number, Set<string>>> = {};
    let earliest = Infinity;
    for (let i = 0; i < raw.length; i += 2) {
      try {
        const e = JSON.parse(raw[i]);
        const ts = parseInt(raw[i + 1]);
        if (ts < earliest) earliest = ts;
        const page = e.page || 'unknown';
        const depth = e.metadata?.depth;
        if (!depth) continue;
        const reader = e.sessionId || `${e.visitorId}-${new Date(ts).toISOString().slice(0, 10)}`;
        pages[page] = pages[page] || {};
        pages[page][depth] = pages[page][depth] || new Set();
        pages[page][depth].add(reader);
      } catch {}
    }

    const result = Object.entries(pages)
      .map(([page, depths]) => ({
        page,
        readers25: depths[25]?.size || 0,
        readers50: depths[50]?.size || 0,
        readers75: depths[75]?.size || 0,
        readers100: depths[100]?.size || 0,
      }))
      .sort((a, b) => b.readers25 - a.readers25);

    return NextResponse.json({
      windowStart: earliest === Infinity ? null : new Date(earliest).toISOString(),
      pages: result,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
