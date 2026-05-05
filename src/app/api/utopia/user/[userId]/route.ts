import { NextRequest, NextResponse } from 'next/server';
import { getUserUtopias, getUserResult } from '@/lib/utopia';
import { requireAuth, requireOwnership, UnauthorizedError, ForbiddenError } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    // Authenticate user first
    const sessionUserId = await requireAuth(request);

    const { userId } = await params;

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      );
    }

    // Verify ownership: sessionUserId must match the userId in the URL
    await requireOwnership(sessionUserId, userId);

    const [user, utopias] = await Promise.all([
      getUserResult(userId),
      getUserUtopias(userId),
    ]);

    return NextResponse.json({
      user,
      utopias,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    console.error('Error getting user utopias:', error);
    return NextResponse.json(
      { error: 'Failed to get user utopias' },
      { status: 500 }
    );
  }
}
