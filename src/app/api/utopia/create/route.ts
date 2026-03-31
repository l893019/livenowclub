import { NextRequest, NextResponse } from 'next/server';
import { createUtopia, getUserResult } from '@/lib/utopia';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, customName } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
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

    const room = await createUtopia(
      userId,
      userResult.name,
      userResult.archetype,
      customName
    );

    const shareUrl = `https://livenowclub.com/wonder/essay/quiz/utopia/${room.slug}`;

    return NextResponse.json({
      success: true,
      room,
      shareUrl,
    });
  } catch (error) {
    console.error('Error creating utopia:', error);
    return NextResponse.json(
      { error: 'Failed to create utopia' },
      { status: 500 }
    );
  }
}
