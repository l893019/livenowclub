import { NextRequest, NextResponse } from 'next/server';
import { getUserResult, saveUserResult, getUtopia } from '@/lib/utopia';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || '');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, name, utopiaSlug } = body;

    if (!userId || !name) {
      return NextResponse.json(
        { error: 'Missing userId or name' },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    if (!trimmedName) {
      return NextResponse.json(
        { error: 'Name cannot be empty' },
        { status: 400 }
      );
    }

    // Update user result
    const userResult = await getUserResult(userId);
    if (userResult) {
      userResult.name = trimmedName;
      await saveUserResult(userResult);
    }

    // If utopiaSlug provided, update name in that utopia
    if (utopiaSlug) {
      const utopia = await getUtopia(utopiaSlug);
      if (utopia) {
        const memberIndex = utopia.members.findIndex(m => m.id === userId);
        if (memberIndex !== -1) {
          utopia.members[memberIndex].name = trimmedName;
          await redis.set(`utopia:${utopiaSlug}`, JSON.stringify(utopia));
        }
      }
    }

    return NextResponse.json({
      success: true,
      name: trimmedName,
    });
  } catch (error) {
    console.error('Error updating name:', error);
    return NextResponse.json(
      { error: 'Failed to update name' },
      { status: 500 }
    );
  }
}
