import { NextRequest, NextResponse } from 'next/server';
import { leaveUtopia } from '@/lib/utopia';
import { requireAuth, validateCSRF, UnauthorizedError, ForbiddenError, CSRFError } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Authenticate user first
    const sessionUserId = await requireAuth(request);
    const sessionToken = request.cookies.get('session')?.value!;
    await validateCSRF(request, sessionToken);

    const body = await request.json();
    const { slug, userId } = body;

    if (!slug || !userId) {
      return NextResponse.json(
        { error: 'Missing slug or userId' },
        { status: 400 }
      );
    }

    // Verify sessionUserId matches userId
    if (sessionUserId !== userId) {
      return NextResponse.json(
        { error: 'Cannot leave utopia as another user' },
        { status: 403 }
      );
    }

    const success = await leaveUtopia(slug, userId);

    if (!success) {
      return NextResponse.json(
        { error: 'Utopia not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error instanceof CSRFError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    console.error('Error leaving utopia:', error);
    return NextResponse.json(
      { error: 'Failed to leave utopia' },
      { status: 500 }
    );
  }
}
