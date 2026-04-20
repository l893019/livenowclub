import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || '');

// View utopia data - DELETE AFTER USE
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug');
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== 'fix-louise-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  }

  const data = await redis.get(`utopia:${slug}`);
  if (!data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(JSON.parse(data));
}
