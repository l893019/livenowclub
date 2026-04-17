import { NextRequest, NextResponse } from 'next/server';
import { updateUserEmail } from '@/lib/utopia';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, email } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      );
    }

    await updateUserEmail(userId, email || '');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Update Email] Error:', error);
    return NextResponse.json(
      { error: 'Failed to update email' },
      { status: 500 }
    );
  }
}
