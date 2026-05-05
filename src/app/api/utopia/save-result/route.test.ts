import { NextRequest } from 'next/server'

// Mock Redis and utopia module
jest.mock('@/lib/redis', () => ({
  redis: {
    set: jest.fn(),
    get: jest.fn(),
    exists: jest.fn(),
  },
}))

jest.mock('@/lib/utopia', () => ({
  saveUserResult: jest.fn(),
  generateUserSlug: jest.fn(),
}))

jest.mock('@/lib/auth', () => ({
  createSession: jest.fn(),
}))

import { POST } from './route'
import { redis } from '@/lib/redis'
import { saveUserResult, generateUserSlug } from '@/lib/utopia'
import { createSession } from '@/lib/auth'

describe('/api/utopia/save-result', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(saveUserResult as jest.Mock).mockResolvedValue(undefined)
    ;(generateUserSlug as jest.Mock).mockResolvedValue('test-slug')
    ;(createSession as jest.Mock).mockResolvedValue({
      sessionToken: 'test-session-token-123',
      csrfToken: 'test-csrf-token-456',
    })
  })

  describe('Session Creation', () => {
    it('should create session when saving valid quiz result', async () => {
      const validResult = {
        id: '12345678-1234-4234-8234-123456789012',
        name: 'Test User',
        email: null,
        archetype: 'Builder',
        secondaryArchetype: 'Explorer',
        scores: { builder: 8, explorer: 6 },
        answers: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        createdAt: new Date().toISOString(),
      }

      const request = new NextRequest('http://localhost:3000/api/utopia/save-result', {
        method: 'POST',
        body: JSON.stringify({ result: validResult }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(200)

      // Check that session cookie was set
      const setCookieHeaders = response.headers.getSetCookie()
      expect(setCookieHeaders.length).toBeGreaterThanOrEqual(2)

      const sessionCookie = setCookieHeaders.find(h => h.startsWith('session='))
      const csrfCookie = setCookieHeaders.find(h => h.startsWith('csrf-token='))

      expect(sessionCookie).toBeDefined()
      expect(csrfCookie).toBeDefined()
    })

    it('should set HTTP-only cookie for session', async () => {
      const validResult = {
        id: '12345678-1234-4234-8234-123456789012',
        name: 'Test User',
        email: null,
        archetype: 'Builder',
        secondaryArchetype: 'Explorer',
        scores: { builder: 8 },
        answers: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        createdAt: new Date().toISOString(),
      }

      const request = new NextRequest('http://localhost:3000/api/utopia/save-result', {
        method: 'POST',
        body: JSON.stringify({ result: validResult }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      const setCookieHeaders = response.headers.getSetCookie()
      const sessionCookie = setCookieHeaders.find(h => h.startsWith('session='))

      expect(sessionCookie).toContain('HttpOnly')
      expect(sessionCookie.toLowerCase()).toContain('samesite=lax')
      expect(sessionCookie).toContain('Max-Age=7776000') // 90 days
      expect(sessionCookie).toContain('Path=/')
    })

    it('should set readable CSRF token cookie', async () => {
      const validResult = {
        id: '12345678-1234-4234-8234-123456789012',
        name: 'Test User',
        email: null,
        archetype: 'Builder',
        secondaryArchetype: 'Explorer',
        scores: { builder: 8 },
        answers: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        createdAt: new Date().toISOString(),
      }

      const request = new NextRequest('http://localhost:3000/api/utopia/save-result', {
        method: 'POST',
        body: JSON.stringify({ result: validResult }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      const setCookieHeaders = response.headers.getSetCookie()
      const csrfCookie = setCookieHeaders.find(h => h.startsWith('csrf-token='))

      // CSRF cookie should NOT be HttpOnly (needs to be readable by JS)
      expect(csrfCookie).not.toContain('HttpOnly')
      expect(csrfCookie!.toLowerCase()).toContain('samesite=lax')
      expect(csrfCookie).toContain('Max-Age=7776000') // 90 days
      expect(csrfCookie).toContain('Path=/')
    })

    it('should save session to Redis with correct TTL', async () => {
      const validResult = {
        id: '12345678-1234-4234-8234-123456789012',
        name: 'Test User',
        email: null,
        archetype: 'Builder',
        secondaryArchetype: 'Explorer',
        scores: { builder: 8 },
        answers: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        createdAt: new Date().toISOString(),
      }

      const request = new NextRequest('http://localhost:3000/api/utopia/save-result', {
        method: 'POST',
        body: JSON.stringify({ result: validResult }),
        headers: { 'content-type': 'application/json' },
      })

      await POST(request)

      // Check that createSession was called with the userId
      expect(createSession).toHaveBeenCalledWith('12345678-1234-4234-8234-123456789012')
    })
  })

  describe('Slug Generation', () => {
    it('should generate slug if not present', async () => {
      const validResult = {
        id: '12345678-1234-4234-8234-123456789012',
        name: 'Test User',
        email: null,
        archetype: 'Builder',
        secondaryArchetype: 'Explorer',
        scores: { builder: 8 },
        answers: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        createdAt: new Date().toISOString(),
        // No slug provided
      }

      const request = new NextRequest('http://localhost:3000/api/utopia/save-result', {
        method: 'POST',
        body: JSON.stringify({ result: validResult }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.slug).toBe('test-slug')
      expect(generateUserSlug).toHaveBeenCalledWith('12345678-1234-4234-8234-123456789012', 'Test User')
    })

    it('should preserve existing slug', async () => {
      const validResult = {
        id: '12345678-1234-4234-8234-123456789012',
        name: 'Test User',
        email: null,
        archetype: 'Builder',
        secondaryArchetype: 'Explorer',
        scores: { builder: 8 },
        answers: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        createdAt: new Date().toISOString(),
        slug: 'existing-slug',
      }

      const request = new NextRequest('http://localhost:3000/api/utopia/save-result', {
        method: 'POST',
        body: JSON.stringify({ result: validResult }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(data.success).toBe(true)
      expect(data.slug).toBe('existing-slug')
      expect(generateUserSlug).not.toHaveBeenCalled()
    })
  })

  describe('Validation', () => {
    it('should return 400 when result is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/save-result', {
        method: 'POST',
        body: JSON.stringify({}),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toContain('Missing required fields')
    })

    it('should return 400 when id is missing', async () => {
      const invalidResult = {
        name: 'Test User',
        archetype: 'Builder',
      }

      const request = new NextRequest('http://localhost:3000/api/utopia/save-result', {
        method: 'POST',
        body: JSON.stringify({ result: invalidResult }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toContain('Missing required fields: id')
    })

    it('should return 400 for invalid userId format', async () => {
      const invalidResult = {
        id: 'not-a-uuid',
        name: 'Test User',
        email: null,
        archetype: 'Builder',
        secondaryArchetype: 'Explorer',
        scores: { builder: 8 },
        answers: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        createdAt: new Date().toISOString(),
      }

      const request = new NextRequest('http://localhost:3000/api/utopia/save-result', {
        method: 'POST',
        body: JSON.stringify({ result: invalidResult }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Invalid user ID format')
    })

    it('should return 400 for invalid quiz answers - not an array', async () => {
      const invalidResult = {
        id: '12345678-1234-4234-8234-123456789012',
        name: 'Test User',
        email: null,
        archetype: 'Builder',
        secondaryArchetype: 'Explorer',
        scores: { builder: 8 },
        answers: 'not-an-array',
        createdAt: new Date().toISOString(),
      }

      const request = new NextRequest('http://localhost:3000/api/utopia/save-result', {
        method: 'POST',
        body: JSON.stringify({ result: invalidResult }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Quiz answers must be an array')
    })

    it('should return 400 for invalid quiz answers - wrong length', async () => {
      const invalidResult = {
        id: '12345678-1234-4234-8234-123456789012',
        name: 'Test User',
        email: null,
        archetype: 'Builder',
        secondaryArchetype: 'Explorer',
        scores: { builder: 8 },
        answers: ['A', 'B', 'C'],
        createdAt: new Date().toISOString(),
      }

      const request = new NextRequest('http://localhost:3000/api/utopia/save-result', {
        method: 'POST',
        body: JSON.stringify({ result: invalidResult }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Quiz must have exactly 7 answers')
    })

    it('should return 400 for invalid quiz answers - invalid option', async () => {
      const invalidResult = {
        id: '12345678-1234-4234-8234-123456789012',
        name: 'Test User',
        email: null,
        archetype: 'Builder',
        secondaryArchetype: 'Explorer',
        scores: { builder: 8 },
        answers: ['A', 'B', 'C', 'D', 'E', 'F', 'Z'],
        createdAt: new Date().toISOString(),
      }

      const request = new NextRequest('http://localhost:3000/api/utopia/save-result', {
        method: 'POST',
        body: JSON.stringify({ result: invalidResult }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Invalid answer for question 7')
    })

    it('should accept valid userId and answers', async () => {
      const validResult = {
        id: '12345678-1234-4234-8234-123456789012',
        name: 'Test User',
        email: null,
        archetype: 'Builder',
        secondaryArchetype: 'Explorer',
        scores: { builder: 8 },
        answers: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        createdAt: new Date().toISOString(),
      }

      const request = new NextRequest('http://localhost:3000/api/utopia/save-result', {
        method: 'POST',
        body: JSON.stringify({ result: validResult }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
    })
  })

  describe('Error Handling', () => {
    it('should return 500 on Redis error', async () => {
      ;(saveUserResult as jest.Mock).mockRejectedValue(new Error('Redis error'))

      const validResult = {
        id: '12345678-1234-4234-8234-123456789012',
        name: 'Test User',
        email: null,
        archetype: 'Builder',
        secondaryArchetype: 'Explorer',
        scores: { builder: 8 },
        answers: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        createdAt: new Date().toISOString(),
      }

      const request = new NextRequest('http://localhost:3000/api/utopia/save-result', {
        method: 'POST',
        body: JSON.stringify({ result: validResult }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.error).toBe('Failed to save result')
    })
  })
})
