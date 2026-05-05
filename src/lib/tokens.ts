import crypto from 'crypto'

/**
 * Token validity period (30 days in milliseconds)
 */
const TOKEN_VALIDITY = 30 * 24 * 60 * 60 * 1000

/**
 * Signs an unsubscribe token with email and timestamp
 * Token format: base64url(email).timestamp.signature
 *
 * @param email - Email address to sign
 * @returns Signed token string
 * @throws Error if UNSUBSCRIBE_SECRET is not configured
 */
export function signUnsubscribeToken(email: string): string {
  const secret = process.env.UNSUBSCRIBE_SECRET

  if (!secret) {
    throw new Error('UNSUBSCRIBE_SECRET not configured')
  }

  const timestamp = Date.now().toString()
  const payload = `${email}.${timestamp}`

  // Create HMAC signature
  const signature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('base64url')

  // Encode email as base64url
  const encodedEmail = Buffer.from(email).toString('base64url')

  return `${encodedEmail}.${timestamp}.${signature}`
}

/**
 * Verifies an unsubscribe token and returns the email if valid
 *
 * @param token - Token to verify
 * @returns Email address if token is valid, null otherwise
 */
export function verifyUnsubscribeToken(token: string): string | null {
  const secret = process.env.UNSUBSCRIBE_SECRET

  if (!secret) {
    return null
  }

  try {
    // Parse token parts
    const parts = token.split('.')
    if (parts.length !== 3) {
      return null
    }

    const [encodedEmail, timestamp, signature] = parts

    // Decode email
    const email = Buffer.from(encodedEmail, 'base64url').toString('utf-8')

    // Check token age (30 days)
    const tokenAge = Date.now() - parseInt(timestamp, 10)
    if (tokenAge > TOKEN_VALIDITY) {
      return null
    }

    // Verify signature
    const payload = `${email}.${timestamp}`
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('base64url')

    if (signature !== expectedSignature) {
      return null
    }

    return email
  } catch (error) {
    return null
  }
}
