import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || '');

export async function GET(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    // Get all contact form submission events
    const contactEvents = await redis.zrevrange('stats:events:contact_form_submit', 0, -1, 'WITHSCORES');

    const submissions = [];

    for (let i = 0; i < contactEvents.length; i += 2) {
      const eventData = contactEvents[i];
      const timestamp = parseInt(contactEvents[i + 1]);

      try {
        const event = JSON.parse(eventData);
        const visitorId = event.visitorId;

        // Get visitor’s session data
        const sessionKeys = await redis.keys(`session:${visitorId}:*`);
        let sessionData = null;

        if (sessionKeys.length > 0) {
          // Get the most recent session for this visitor
          const sessions = await Promise.all(
            sessionKeys.map(async (key) => {
              const data = await redis.get(key);
              return data ? JSON.parse(data) : null;
            })
          );

          // Find session that matches the timestamp
          sessionData = sessions
            .filter(s => s && s.pages)
            .sort((a, b) => b.lastActivity - a.lastActivity)[0];
        }

        // Get visitor metadata
        const visitorData = await redis.get(`visitor:${visitorId}`);
        const visitor = visitorData ? JSON.parse(visitorData) : null;

        submissions.push({
          timestamp,
          date: new Date(timestamp).toISOString(),
          name: event.metadata?.name || 'Anonymous',
          email: event.metadata?.email || 'Not provided',
          messagePreview: event.metadata?.message_preview || '',
          visitorId,
          country: visitor?.country || sessionData?.country || 'Unknown',
          referrer: sessionData?.referrer || visitor?.referrer || 'Direct',
          journey: sessionData?.pages?.map((p: any) => p.page || p) || [],
          sessionDuration: sessionData ? Math.floor((sessionData.lastActivity - sessionData.startTime) / 1000) : 0,
          pagesViewed: sessionData?.pages?.length || 0
        });
      } catch (e) {
        console.error('Error parsing contact event:', e);
      }
    }

    // Sort by timestamp descending (most recent first)
    submissions.sort((a, b) => b.timestamp - a.timestamp);

    return NextResponse.json({
      total: submissions.length,
      submissions
    });

  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}
