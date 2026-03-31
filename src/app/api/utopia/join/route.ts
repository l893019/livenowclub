import { NextRequest, NextResponse } from 'next/server';
import { joinUtopia, getUserResult } from '@/lib/utopia';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, userId } = body;

    if (!slug || !userId) {
      return NextResponse.json(
        { error: 'Missing slug or userId' },
        { status: 400 }
      );
    }

    // Get user's result to get their name and archetype
    const userResult = await getUserResult(userId);
    if (!userResult) {
      return NextResponse.json(
        { error: 'User not found. Please complete the quiz first.' },
        { status: 404 }
      );
    }

    const room = await joinUtopia(
      slug,
      userId,
      userResult.name,
      userResult.archetype
    );

    if (!room) {
      return NextResponse.json(
        { error: 'Utopia not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      room,
    });
  } catch (error) {
    console.error('Error joining utopia:', error);
    return NextResponse.json(
      { error: 'Failed to join utopia' },
      { status: 500 }
    );
  }
}
