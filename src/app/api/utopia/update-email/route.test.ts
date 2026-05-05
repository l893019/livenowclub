import { NextRequest } from 'next/server'

// Mock dependencies
jest.mock('@/lib/redis', () => ({
  redis: {
    set: jest.fn(),
    get: jest.fn(),
    exists: jest.fn(),
    incr: jest.fn(),
    expire: jest.fn(),
    del: jest.fn(),
  },
}))

jest.mock('@/lib/utopia', () => ({
  updateUserEmail: jest.fn(),
}))

jest.mock('@/lib/logging', () => ({
  logSecurityEvent: jest.fn(),
}))

jest.mock('@/lib/auth', () => ({
  requireAuth: jest.fn(),
  requireOwnership: jest.fn(),
  validateCSRF: jest.fn(),
  UnauthorizedError: class UnauthorizedError extends Error {
    constructor(message: string) {
      super(message)
      this.name = 'UnauthorizedError'
    }
  },
  ForbiddenError: class ForbiddenError extends Error {
    constructor(message: string) {
      super(message)
      this.name = 'ForbiddenError'
    }
  },
  CSRFError: class CSRFError extends Error {
    constructor(message: string) {
      super(message)
      this.name = 'CSRFError'
    }
  },
}))

import { POST } from './route'
import { redis } from '@/lib/redis'
import { updateUserEmail } from '@/lib/utopia'
import { requireAuth, requireOwnership, validateCSRF, UnauthorizedError, ForbiddenError, CSRFError } from '@/lib/auth'
import * as logging from '@/lib/logging'

describe('/api/utopia/update-email', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(requireAuth as jest.Mock).mockResolvedValue('user-123')
    ;(validateCSRF as jest.Mock).mockResolvedValue(undefined)
    ;(requireOwnership as jest.Mock).mockResolvedValue(undefined)
    ;(updateUserEmail as jest.Mock).mockResolvedValue(undefined)
    ;(redis.incr as jest.Mock).mockResolvedValue(1)
    ;(redis.expire as jest.Mock).mockResolvedValue(1)
  })

  describe('Authentication', () => {
    it('should require authentication', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/update-email', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', email: 'new@example.com' }),
        headers: {
          'content-type': 'application/json',
          'cookie': 'session=test-session-token',
        },
      })

      await POST(request)

      expect(requireAuth).toHaveBeenCalledWith(request)
    })

    it('should return 401 when not authenticated', async () => {
      ;(requireAuth as jest.Mock).mockRejectedValue(new UnauthorizedError('No session token'))

      const request = new NextRequest('http://localhost:3000/api/utopia/update-email', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', email: 'new@example.com' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(401)
      const data = await response.json()
      expect(data.error).toBe('No session token')
    })
  })

  describe('CSRF Protection', () => {
    it('should validate CSRF token', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/update-email', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', email: 'new@example.com' }),
        headers: {
          'content-type': 'application/json',
          'cookie': 'session=test-session-token',
        },
      })

      await POST(request)

      expect(validateCSRF).toHaveBeenCalledWith(request, 'test-session-token')
    })

    it('should return 403 when CSRF token is missing', async () => {
      ;(validateCSRF as jest.Mock).mockRejectedValue(new CSRFError('CSRF token missing'))

      const request = new NextRequest('http://localhost:3000/api/utopia/update-email', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', email: 'new@example.com' }),
        headers: {
          'content-type': 'application/json',
          'cookie': 'session=test-session-token',
        },
      })

      const response = await POST(request)

      expect(response.status).toBe(403)
      const data = await response.json()
      expect(data.error).toBe('CSRF token missing')
    })

    it('should return 403 when CSRF token is invalid', async () => {
      ;(validateCSRF as jest.Mock).mockRejectedValue(new CSRFError('Invalid CSRF token'))

      const request = new NextRequest('http://localhost:3000/api/utopia/update-email', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', email: 'new@example.com' }),
        headers: {
          'content-type': 'application/json',
          'cookie': 'session=test-session-token',
        },
      })

      const response = await POST(request)

      expect(response.status).toBe(403)
      const data = await response.json()
      expect(data.error).toBe('Invalid CSRF token')
    })
  })

  describe('Rate Limiting', () => {
    it('should apply per-user rate limiting', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/update-email', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', email: 'new@example.com' }),
        headers: { 'content-type': 'application/json' },
      })

      await POST(request)

      // Check rate limit was applied (3 changes per day = 86400 seconds)
      expect(redis.incr).toHaveBeenCalledWith('ratelimit:user:user-123:update-email')
      expect(redis.expire).toHaveBeenCalledWith('ratelimit:user:user-123:update-email', 86400)
    })

    it('should return 429 when rate limit exceeded', async () => {
      ;(redis.incr as jest.Mock).mockResolvedValue(4) // 4th attempt exceeds limit of 3

      const request = new NextRequest('http://localhost:3000/api/utopia/update-email', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', email: 'new@example.com' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(429)
      const data = await response.json()
      expect(data.error).toBe('Rate limit exceeded')
    })
  })

  describe('Ownership Verification', () => {
    it('should verify ownership before updating email', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/update-email', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', email: 'new@example.com' }),
        headers: { 'content-type': 'application/json' },
      })

      await POST(request)

      expect(requireOwnership).toHaveBeenCalledWith('user-123', 'user-123')
    })

    it('should return 403 when user does not own the resource', async () => {
      ;(requireOwnership as jest.Mock).mockRejectedValue(
        new ForbiddenError('Access denied: not resource owner')
      )

      const request = new NextRequest('http://localhost:3000/api/utopia/update-email', {
        method: 'POST',
        body: JSON.stringify({ userId: 'other-user', email: 'new@example.com' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(403)
      const data = await response.json()
      expect(data.error).toBe('Access denied: not resource owner')
    })
  })

  describe('Validation', () => {
    it('should return 400 when userId is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/update-email', {
        method: 'POST',
        body: JSON.stringify({ email: 'new@example.com' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('userId and email required')
    })

    it('should return 400 when email is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/update-email', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('userId and email required')
    })
  })

  describe('Success Cases', () => {
    it('should update email when all validations pass', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/update-email', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', email: 'new@example.com' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(updateUserEmail).toHaveBeenCalledWith('user-123', 'new@example.com')
    })

    it('should log email_updated event', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/update-email', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', email: 'new@example.com' }),
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': '192.168.1.1',
        },
      })

      await POST(request)

      expect(logging.logSecurityEvent).toHaveBeenCalledWith('data', 'email_updated', {
        userId: 'user-123',
        ip: '192.168.1.1',
        field: 'email',
      })
    })

    it('should not call updateUserEmail before authentication', async () => {
      ;(requireAuth as jest.Mock).mockRejectedValue(new UnauthorizedError('No session token'))

      const request = new NextRequest('http://localhost:3000/api/utopia/update-email', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', email: 'new@example.com' }),
        headers: { 'content-type': 'application/json' },
      })

      await POST(request)

      expect(updateUserEmail).not.toHaveBeenCalled()
    })

    it('should not call updateUserEmail before ownership verification', async () => {
      ;(requireOwnership as jest.Mock).mockRejectedValue(
        new ForbiddenError('Access denied: not resource owner')
      )

      const request = new NextRequest('http://localhost:3000/api/utopia/update-email', {
        method: 'POST',
        body: JSON.stringify({ userId: 'other-user', email: 'new@example.com' }),
        headers: { 'content-type': 'application/json' },
      })

      await POST(request)

      expect(updateUserEmail).not.toHaveBeenCalled()
    })
  })

  describe('Error Handling', () => {
    it('should return 500 on database error', async () => {
      ;(updateUserEmail as jest.Mock).mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/utopia/update-email', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', email: 'new@example.com' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.error).toBe('Failed to update email')
    })
  })
})
