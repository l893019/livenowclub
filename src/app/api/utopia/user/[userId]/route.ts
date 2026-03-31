import { NextRequest, NextResponse } from 'next/server';
import { getUserUtopias, getUserResult } from '@/lib/utopia';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      );
    }

    const [user, utopias] = await Promise.all([
      getUserResult(userId),
      getUserUtopias(userId),
    ]);

    return NextResponse.json({
      user,
      utopias,
    });
  } catch (error) {
    console.error('Error getting user utopias:', error);
    return NextResponse.json(
      { error: 'Failed to get user utopias' },
      { status: 500 }
    );
  }
}
