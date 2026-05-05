import { NextRequest } from 'next/server'
import { POST } from './route'
import { requireAuth, validateCSRF, UnauthorizedError, CSRFError } from '@/lib/auth'
import { checkRateLimit, RateLimitError } from '@/lib/ratelimit'
import { createUtopia, getUserResult } from '@/lib/utopia'

// Mock dependencies
jest.mock('@/lib/auth', () => ({
  requireAuth: jest.fn(),
  validateCSRF: jest.fn(),
  UnauthorizedError: class UnauthorizedError extends Error {
    constructor(message: string) {
      super(message)
      this.name = 'UnauthorizedError'
    }
  },
  CSRFError: class CSRFError extends Error {
    constructor(message: string) {
      super(message)
      this.name = 'CSRFError'
    }
  },
}))

jest.mock('@/lib/ratelimit', () => {
  class RateLimitError extends Error {
    retryAfter: number
    constructor(message: string, retryAfter: number) {
      super(message)
      this.name = 'RateLimitError'
      this.retryAfter = retryAfter
    }
  }

  return {
    checkRateLimit: jest.fn(),
    RateLimitError,
  }
})

jest.mock('@/lib/utopia', () => ({
  createUtopia: jest.fn(),
  getUserResult: jest.fn(),
  updateUserEmail: jest.fn(),
}))

describe('/api/utopia/create', () => {
  const validUserId = '550e8400-e29b-41d4-a716-446655440000'

  const mockUserResult = {
    id: validUserId,
    name: 'Test User',
    email: null,
    archetype: 'Builder',
    secondaryArchetype: 'Explorer',
    scores: { builder: 8 },
    answers: ['0', '1', '0'],
    createdAt: new Date().toISOString(),
  }

  const mockRoom = {
    slug: 'sirius-abc123',
    name: 'Sirius',
    createdBy: validUserId,
    members: [
      {
        id: validUserId,
        name: 'Test User',
        archetype: 'Builder',
        joinedAt: new Date().toISOString(),
        isFounder: true,
        answers: ['0', '1', '0'],
      },
    ],
    createdAt: new Date().toISOString(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(requireAuth as jest.Mock).mockResolvedValue(validUserId)
    ;(validateCSRF as jest.Mock).mockResolvedValue(undefined)
    ;(getUserResult as jest.Mock).mockResolvedValue(mockUserResult)
    ;(createUtopia as jest.Mock).mockResolvedValue(mockRoom)
    ;(checkRateLimit as jest.Mock).mockResolvedValue(undefined)
  })

  describe('Authentication', () => {
    it('should require authentication', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/create', {
        method: 'POST',
        body: JSON.stringify({ userId: validUserId }),
        headers: {
          'content-type': 'application/json',
          'cookie': 'session=test-session-token',
        },
      })

      await POST(request)

      expect(requireAuth).toHaveBeenCalledWith(request)
    })

    it('should return 401 when not authenticated', async () => {
      ;(requireAuth as jest.Mock).mockRejectedValue(
        new UnauthorizedError('No session token')
      )

      const request = new NextRequest('http://localhost:3000/api/utopia/create', {
        method: 'POST',
        body: JSON.stringify({ userId: validUserId }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(401)
      const data = await response.json()
      expect(data.error).toBe('Unauthorized')
    })

    it('should verify sessionUserId matches userId', async () => {
      const differentUserId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
      ;(requireAuth as jest.Mock).mockResolvedValue(differentUserId) // Different user

      const request = new NextRequest('http://localhost:3000/api/utopia/create', {
        method: 'POST',
        body: JSON.stringify({ userId: validUserId }),
        headers: {
          'content-type': 'application/json',
          'cookie': 'session=test-session-token',
        },
      })

      const response = await POST(request)

      expect(response.status).toBe(403)
      const data = await response.json()
      expect(data.error).toBe('Cannot create utopia for another user')
    })
  })

  describe('CSRF Protection', () => {
    it('should validate CSRF token', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/create', {
        method: 'POST',
        body: JSON.stringify({ userId: validUserId }),
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

      const request = new NextRequest('http://localhost:3000/api/utopia/create', {
        method: 'POST',
        body: JSON.stringify({ userId: validUserId }),
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

      const request = new NextRequest('http://localhost:3000/api/utopia/create', {
        method: 'POST',
        body: JSON.stringify({ userId: validUserId }),
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
    it('should check rate limit (5 utopias per day per user)', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/create', {
        method: 'POST',
        body: JSON.stringify({ userId: validUserId }),
        headers: { 'content-type': 'application/json' },
      })

      await POST(request)

      expect(checkRateLimit).toHaveBeenCalledWith(
        'user',
        validUserId,
        'create-utopia',
        5,
        86400 // 24 hours in seconds
      )
    })

    it('should return 429 when rate limit exceeded', async () => {
      ;(checkRateLimit as jest.Mock).mockRejectedValue(
        new RateLimitError('Rate limit exceeded', 86400)
      )

      const request = new NextRequest('http://localhost:3000/api/utopia/create', {
        method: 'POST',
        body: JSON.stringify({ userId: validUserId }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(429)
      const data = await response.json()
      expect(data.error).toBe('Rate limit exceeded: 5 utopias per day')
      expect(response.headers.get('Retry-After')).toBe('86400')
    })
  })

  describe('Validation', () => {
    it('should return 400 when userId is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/create', {
        method: 'POST',
        body: JSON.stringify({}),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Missing userId')
    })

    it('should return 400 when userId format is invalid', async () => {
      const invalidUserIds = [
        'not-a-uuid',
        '123',
        'user-123',
        '550e8400-e29b-31d4-a716-446655440000', // version 3, not 4
        '550e8400-e29b-41d4-c716-446655440000', // invalid variant
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
      ]

      for (const userId of invalidUserIds) {
        // Mock the session to match the invalid userId so we can test validation
        ;(requireAuth as jest.Mock).mockResolvedValue(userId)

        const request = new NextRequest('http://localhost:3000/api/utopia/create', {
          method: 'POST',
          body: JSON.stringify({ userId }),
          headers: { 'content-type': 'application/json' },
        })

        const response = await POST(request)

        expect(response.status).toBe(400)
        const data = await response.json()
        expect(data.error).toBe('Invalid user ID format')
      }
    })

    it('should accept valid UUID v4 userId formats', async () => {
      const validUserIds = [
        '550e8400-e29b-41d4-a716-446655440000',
        'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        'a3bb189e-8bf9-4d92-9c33-4deef1c3f7b5',
      ]

      for (const userId of validUserIds) {
        ;(requireAuth as jest.Mock).mockResolvedValue(userId)

        const request = new NextRequest('http://localhost:3000/api/utopia/create', {
          method: 'POST',
          body: JSON.stringify({ userId }),
          headers: { 'content-type': 'application/json' },
        })

        const response = await POST(request)

        expect(response.status).toBe(200)
      }
    })

    it('should return 400 when customName slug format is invalid', async () => {
      const invalidSlugs = [
        'ab', // too short
        'a'.repeat(31), // too long
        'My-Utopia', // uppercase
        'my_utopia', // underscore
        'my utopia', // space
        '-my-utopia', // starts with hyphen
        'my-utopia-', // ends with hyphen
        'my--utopia', // consecutive hyphens
      ]

      for (const customName of invalidSlugs) {
        const request = new NextRequest('http://localhost:3000/api/utopia/create', {
          method: 'POST',
          body: JSON.stringify({
            userId: validUserId,
            customName,
          }),
          headers: { 'content-type': 'application/json' },
        })

        const response = await POST(request)

        expect(response.status).toBe(400)
        const data = await response.json()
        expect(data.error).toMatch(/Slug must/)
      }
    })

    it('should accept valid customName slug formats', async () => {
      const validSlugs = [
        'my-utopia',
        'abc',
        'test-123',
        'my-awesome-utopia-name',
      ]

      for (const customName of validSlugs) {
        const request = new NextRequest('http://localhost:3000/api/utopia/create', {
          method: 'POST',
          body: JSON.stringify({
            userId: validUserId,
            customName,
          }),
          headers: { 'content-type': 'application/json' },
        })

        const response = await POST(request)

        expect(response.status).toBe(200)
      }
    })

    it('should return 404 when user result not found', async () => {
      ;(getUserResult as jest.Mock).mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/utopia/create', {
        method: 'POST',
        body: JSON.stringify({ userId: validUserId }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(404)
      const data = await response.json()
      expect(data.error).toBe('User not found. Please complete the quiz first.')
    })
  })

  describe('Successful Utopia Creation', () => {
    it('should create utopia successfully', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/create', {
        method: 'POST',
        body: JSON.stringify({ userId: validUserId }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.room).toEqual(mockRoom)
      expect(data.shareUrl).toBe(
        `https://livenowclub.vercel.app/wonder/essay/quiz/utopia/${mockRoom.slug}`
      )
    })

    it('should pass custom name to createUtopia', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/create', {
        method: 'POST',
        body: JSON.stringify({
          userId: validUserId,
          customName: 'my-custom-utopia',
        }),
        headers: { 'content-type': 'application/json' },
      })

      await POST(request)

      expect(createUtopia).toHaveBeenCalledWith(
        validUserId,
        'Test User',
        'Builder',
        'my-custom-utopia',
        ['0', '1', '0']
      )
    })

    it('should update user email if provided', async () => {
      const { updateUserEmail } = jest.requireMock('@/lib/utopia')

      const request = new NextRequest('http://localhost:3000/api/utopia/create', {
        method: 'POST',
        body: JSON.stringify({
          userId: validUserId,
          email: 'test@example.com',
        }),
        headers: { 'content-type': 'application/json' },
      })

      await POST(request)

      expect(updateUserEmail).toHaveBeenCalledWith(validUserId, 'test@example.com')
    })
  })

  describe('Error Handling', () => {
    it('should return 500 on server error', async () => {
      ;(createUtopia as jest.Mock).mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/utopia/create', {
        method: 'POST',
        body: JSON.stringify({ userId: validUserId }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.error).toBe('Failed to create utopia')
    })
  })

  describe('Order of Operations', () => {
    it('should check authentication before rate limiting', async () => {
      ;(requireAuth as jest.Mock).mockRejectedValue(
        new UnauthorizedError('No session token')
      )

      const request = new NextRequest('http://localhost:3000/api/utopia/create', {
        method: 'POST',
        body: JSON.stringify({ userId: validUserId }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(401)
      expect(requireAuth).toHaveBeenCalled()
      expect(checkRateLimit).not.toHaveBeenCalled()
    })

    it('should check rate limiting before validation', async () => {
      ;(checkRateLimit as jest.Mock).mockRejectedValue(
        new RateLimitError('Rate limit exceeded', 86400)
      )

      const request = new NextRequest('http://localhost:3000/api/utopia/create', {
        method: 'POST',
        body: JSON.stringify({}), // Missing userId
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(429)
      expect(checkRateLimit).toHaveBeenCalled()
      // Validation would normally fail with 400, but rate limit comes first
    })
  })
})
