import { NextRequest, NextResponse } from 'next/server';
import { saveUserResult, generateUserSlug, type UserResult } from '@/lib/utopia';
import { createSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result: UserResult = body.result;

    if (!result || !result.id) {
      return NextResponse.json(
        { error: 'Missing required fields: id' },
        { status: 400 }
      );
    }

    // Generate slug if not present
    if (!result.slug) {
      result.slug = await generateUserSlug(result.id, result.name);
    }

    // Save the quiz result
    await saveUserResult(result);

    // Create session for the user
    const { sessionToken, csrfToken } = await createSession(result.id);

    // Create response with session cookies
    const response = NextResponse.json({
      success: true,
      slug: result.slug,
    });

    // Set session cookie (HTTP-only, Secure, SameSite)
    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 90 * 24 * 60 * 60, // 90 days
      path: '/',
    });

    // Set CSRF token cookie (readable by JS, not HTTP-only)
    response.cookies.set('csrf-token', csrfToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 90 * 24 * 60 * 60, // 90 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error saving result:', error);
    return NextResponse.json(
      { error: 'Failed to save result' },
      { status: 500 }
    );
  }
}
