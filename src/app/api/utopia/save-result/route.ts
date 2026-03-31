import { NextRequest, NextResponse } from 'next/server';
import { saveUserResult, type UserResult } from '@/lib/utopia';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result: UserResult = body.result;

    if (!result || !result.id || !result.name || !result.archetype) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await saveUserResult(result);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving result:', error);
    return NextResponse.json(
      { error: 'Failed to save result' },
      { status: 500 }
    );
  }
}
