import { NextRequest, NextResponse } from 'next/server';
import { saveUserResult, generateUserSlug, type UserResult } from '@/lib/utopia';
import { createSession } from '@/lib/auth';
import { validateUserId, validateQuizAnswers, ValidationError } from '@/lib/validation';

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

    // Validate userId
    try {
      validateUserId(result.id);
    } catch (error) {
      if (error instanceof ValidationError) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      throw error;
    }

    // Validate quiz answers
    try {
      validateQuizAnswers(result.answers);
    } catch (error) {
      if (error instanceof ValidationError) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      throw error;
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
