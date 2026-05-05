import { NextRequest } from 'next/server'
import { redis } from './redis'
import crypto from 'crypto'

// Custom error classes
export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ForbiddenError'
  }
}

export class CSRFError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CSRFError'
  }
}

// Session interface
export interface Session {
  userId: string
  csrfToken: string
  createdAt: number
  lastActive: number
}

// Constants
const SESSION_DURATION = 90 * 24 * 60 * 60 // 90 days in seconds
const SESSION_PREFIX = 'session:'

/**
 * Generates a cryptographically secure random token
 */
function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

/**
 * Creates a new session for a user
 */
export async function createSession(userId: string): Promise<{
  sessionToken: string
  csrfToken: string
}> {
  const sessionToken = generateToken()
  const csrfToken = generateToken()

  const session: Session = {
    userId,
    csrfToken,
    createdAt: Date.now(),
    lastActive: Date.now(),
  }

  await redis.set(
    `${SESSION_PREFIX}${sessionToken}`,
    JSON.stringify(session),
    'EX',
    SESSION_DURATION
  )

  return { sessionToken, csrfToken }
}

/**
 * Validates session and returns userId
 * Throws UnauthorizedError if session is invalid or expired
 */
export async function requireAuth(request: NextRequest): Promise<string> {
  // Extract session token from cookie
  const sessionToken = request.cookies.get('session')?.value

  if (!sessionToken) {
    throw new UnauthorizedError('No session token')
  }

  // Get session from Redis
  const sessionData = await redis.get(`${SESSION_PREFIX}${sessionToken}`)

  if (!sessionData) {
    throw new UnauthorizedError('Invalid or expired session')
  }

  const session: Session = JSON.parse(sessionData)

  // Check if session is expired (> 90 days old)
  const sessionAge = Date.now() - session.createdAt
  if (sessionAge > SESSION_DURATION * 1000) {
    await redis.del(`${SESSION_PREFIX}${sessionToken}`)
    throw new UnauthorizedError('Session expired')
  }

  // Refresh session TTL and update lastActive
  session.lastActive = Date.now()
  await redis.set(
    `${SESSION_PREFIX}${sessionToken}`,
    JSON.stringify(session),
    'EX',
    SESSION_DURATION
  )

  return session.userId
}

/**
 * Validates that the authenticated user owns the resource
 * Throws ForbiddenError if userId doesn't match resourceUserId
 */
export async function requireOwnership(
  userId: string,
  resourceUserId: string
): Promise<void> {
  if (userId !== resourceUserId) {
    throw new ForbiddenError('Access denied: not resource owner')
  }
}

/**
 * Validates CSRF token from request header and cookie against session
 * Throws CSRFError if validation fails
 */
export async function validateCSRF(
  request: NextRequest,
  sessionToken: string
): Promise<void> {
  // Extract CSRF token from header and cookie
  const headerToken = request.headers.get('x-csrf-token')
  const cookieToken = request.cookies.get('csrf-token')?.value

  if (!headerToken || !cookieToken) {
    throw new CSRFError('CSRF token missing')
  }

  if (headerToken !== cookieToken) {
    throw new CSRFError('CSRF token mismatch')
  }

  // Get session from Redis
  const sessionData = await redis.get(`${SESSION_PREFIX}${sessionToken}`)

  if (!sessionData) {
    throw new CSRFError('Invalid session')
  }

  const session: Session = JSON.parse(sessionData)

  if (session.csrfToken !== headerToken) {
    throw new CSRFError('Invalid CSRF token')
  }
}

/**
 * Deletes a session from Redis
 */
export async function deleteSession(sessionToken: string): Promise<void> {
  await redis.del(`${SESSION_PREFIX}${sessionToken}`)
}
