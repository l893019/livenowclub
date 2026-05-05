import { NextRequest, NextResponse } from 'next/server';
import { createConnection } from '@/lib/connections';
import { getUserResult } from '@/lib/utopia';
import { requireAuth, UnauthorizedError, ForbiddenError } from '@/lib/auth';
import { checkRateLimit, RateLimitError } from '@/lib/ratelimit';

export async function POST(request: NextRequest) {
  try {
    // Authenticate user first
    const sessionUserId = await requireAuth(request);

    const body = await request.json();
    const { userId, connectWithUserId } = body;

    if (!userId || !connectWithUserId) {
      return NextResponse.json(
        { error: 'Missing userId or connectWithUserId' },
        { status: 400 }
      );
    }

    // Verify sessionUserId matches userId
    if (sessionUserId !== userId) {
      return NextResponse.json(
        { error: 'Cannot create connection as another user' },
        { status: 403 }
      );
    }

    // Check rate limit: 20 connections per day per user
    await checkRateLimit('user', userId, 'create-connection', 20, 86400); // 24 hours in seconds

    // Verify both users exist
    const userA = await getUserResult(userId);
    const userB = await getUserResult(connectWithUserId);

    if (!userA || !userB) {
      return NextResponse.json(
        { error: 'One or both users not found' },
        { status: 404 }
      );
    }

    // Create mutual connection
    const connection = await createConnection(userId, connectWithUserId);

    return NextResponse.json({
      success: true,
      connection,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    if (error instanceof RateLimitError) {
      return NextResponse.json(
        { error: error.message },
        {
          status: 429,
          headers: { 'Retry-After': error.retryAfter.toString() },
        }
      );
    }
    console.error('Error creating connection:', error);
    return NextResponse.json(
      { error: 'Failed to create connection' },
      { status: 500 }
    );
  }
}
