import { NextRequest, NextResponse } from 'next/server'
import { redis } from '@/lib/redis'
import { verifyUnsubscribeToken } from '@/lib/tokens'
import { logSecurityEvent } from '@/lib/logging'

/**
 * POST /api/unsubscribe
 * Unsubscribes an email address from notifications
 * Requires a signed token for security
 *
 * Request body:
 *   - email: string (required)
 *   - token: string (required, signed with UNSUBSCRIBE_SECRET)
 */
export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim()
    || request.headers.get('x-real-ip')
    || undefined

  try {
    // Parse request body
    const body = await request.json()
    const { email, token } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Missing email parameter' },
        { status: 400 }
      )
    }

    if (!token) {
      return NextResponse.json(
        { error: 'Missing token parameter' },
        { status: 400 }
      )
    }

    // Verify token
    const verifiedEmail = verifyUnsubscribeToken(token)

    if (!verifiedEmail) {
      await logSecurityEvent('data', 'unsubscribe_invalid_token', {
        email,
        ip,
      })

      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    // Verify token matches email (case-insensitive)
    if (verifiedEmail.toLowerCase() !== email.toLowerCase()) {
      await logSecurityEvent('data', 'unsubscribe_token_mismatch', {
        email,
        tokenEmail: verifiedEmail,
        ip,
      })

      return NextResponse.json(
        { error: 'Token does not match email' },
        { status: 401 }
      )
    }

    // Add email to unsubscribed set (lowercase for consistency)
    await redis.sadd('unsubscribed', email.toLowerCase())

    // Log successful unsubscribe
    await logSecurityEvent('data', 'unsubscribe_success', {
      email: email.toLowerCase(),
      ip,
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed',
    })
  } catch (error) {
    console.error('[Unsubscribe] Error:', error)

    await logSecurityEvent('data', 'unsubscribe_error', {
      ip,
      error: (error as Error).message,
    })

    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
