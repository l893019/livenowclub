import { NextRequest, NextResponse } from 'next/server';
import { createUtopia, getUserResult, updateUserEmail } from '@/lib/utopia';
import { requireAuth, UnauthorizedError } from '@/lib/auth';
import { checkRateLimit, RateLimitError } from '@/lib/ratelimit';

export async function POST(request: NextRequest) {
  try {
    // Step 1: Authenticate user
    const sessionUserId = await requireAuth(request);

    // Step 2: Parse request body
    const body = await request.json();
    const { userId, customName, email } = body;

    // Step 3: Rate limit check (before validation to prevent enumeration attacks)
    // Use sessionUserId if userId is not provided (for rate limiting purposes)
    await checkRateLimit(
      'user',
      sessionUserId,
      'create-utopia',
      5,
      86400 // 24 hours in seconds
    );

    // Step 4: Validate userId
    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      );
    }

    // Step 5: Verify ownership - user can only create utopias for themselves
    if (sessionUserId !== userId) {
      return NextResponse.json(
        { error: 'Cannot create utopia for another user' },
        { status: 403 }
      );
    }

    // Step 6: Get user's result to get their name and archetype
    const userResult = await getUserResult(userId);
    if (!userResult) {
      return NextResponse.json(
        { error: 'User not found. Please complete the quiz first.' },
        { status: 404 }
      );
    }

    // Step 7: Update user's email if provided
    if (email) {
      await updateUserEmail(userId, email);
    }

    // Step 8: Create the utopia
    const room = await createUtopia(
      userId,
      userResult.name,
      userResult.archetype,
      customName,
      userResult.answers
    );

    const shareUrl = `https://livenowclub.vercel.app/wonder/essay/quiz/utopia/${room.slug}`;

    return NextResponse.json({
      success: true,
      room,
      shareUrl,
    });
  } catch (error) {
    // Handle authentication errors
    if (error instanceof UnauthorizedError) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Handle rate limit errors
    if (error instanceof RateLimitError) {
      return NextResponse.json(
        { error: 'Rate limit exceeded: 5 utopias per day' },
        {
          status: 429,
          headers: {
            'Retry-After': error.retryAfter.toString()
          }
        }
      );
    }

    console.error('Error creating utopia:', error);
    return NextResponse.json(
      { error: 'Failed to create utopia' },
      { status: 500 }
    );
  }
}
