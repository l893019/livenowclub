import { NextRequest, NextResponse } from 'next/server';
import { saveUserResult, generateUserSlug, type UserResult } from '@/lib/utopia';

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

    // Generate slug if not present
    if (!result.slug) {
      result.slug = await generateUserSlug(result.id, result.name);
    }

    await saveUserResult(result);

    return NextResponse.json({
      success: true,
      slug: result.slug,
    });
  } catch (error) {
    console.error('Error saving result:', error);
    return NextResponse.json(
      { error: 'Failed to save result' },
      { status: 500 }
    );
  }
}
