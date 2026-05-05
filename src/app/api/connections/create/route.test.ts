import { NextRequest } from 'next/server'
import { POST } from './route'
import { requireAuth, UnauthorizedError, ForbiddenError } from '@/lib/auth'
import { checkRateLimit, RateLimitError } from '@/lib/ratelimit'
import { createConnection } from '@/lib/connections'
import { getUserResult } from '@/lib/utopia'

// Mock dependencies
jest.mock('@/lib/auth', () => ({
  requireAuth: jest.fn(),
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
}))

jest.mock('@/lib/ratelimit', () => ({
  checkRateLimit: jest.fn(),
  RateLimitError: class RateLimitError extends Error {
    retryAfter: number
    constructor(message: string, retryAfter: number) {
      super(message)
      this.name = 'RateLimitError'
      this.retryAfter = retryAfter
    }
  },
}))

jest.mock('@/lib/connections', () => ({
  createConnection: jest.fn(),
}))

jest.mock('@/lib/utopia', () => ({
  getUserResult: jest.fn(),
}))

describe('/api/connections/create', () => {
  const mockConnection = {
    id: 'connection-123',
    userId: 'user-123',
    connectWithUserId: 'user-456',
    createdAt: new Date().toISOString(),
  }

  const mockUserA = {
    id: 'user-123',
    name: 'User A',
    email: 'userA@example.com',
    archetype: 'Builder',
  }

  const mockUserB = {
    id: 'user-456',
    name: 'User B',
    email: 'userB@example.com',
    archetype: 'Explorer',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(requireAuth as jest.Mock).mockResolvedValue('user-123')
    ;(checkRateLimit as jest.Mock).mockResolvedValue(undefined)
    ;(getUserResult as jest.Mock).mockImplementation((userId: string) => {
      if (userId === 'user-123') return Promise.resolve(mockUserA)
      if (userId === 'user-456') return Promise.resolve(mockUserB)
      return Promise.resolve(null)
    })
    ;(createConnection as jest.Mock).mockResolvedValue(mockConnection)
  })

  describe('Authentication', () => {
    it('should require authentication', async () => {
      const request = new NextRequest('http://localhost:3000/api/connections/create', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', connectWithUserId: 'user-456' }),
        headers: { 'content-type': 'application/json' },
      })

      await POST(request)

      expect(requireAuth).toHaveBeenCalledWith(request)
    })

    it('should return 401 when not authenticated', async () => {
      ;(requireAuth as jest.Mock).mockRejectedValue(
        new UnauthorizedError('No session token')
      )

      const request = new NextRequest('http://localhost:3000/api/connections/create', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', connectWithUserId: 'user-456' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(401)
      const data = await response.json()
      expect(data.error).toBe('Unauthorized')
    })

    it('should verify sessionUserId matches userId', async () => {
      ;(requireAuth as jest.Mock).mockResolvedValue('user-999') // Different user

      const request = new NextRequest('http://localhost:3000/api/connections/create', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', connectWithUserId: 'user-456' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(403)
      const data = await response.json()
      expect(data.error).toBe('Cannot create connection as another user')
    })
  })

  describe('Rate Limiting', () => {
    it('should check rate limit for user', async () => {
      const request = new NextRequest('http://localhost:3000/api/connections/create', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', connectWithUserId: 'user-456' }),
        headers: { 'content-type': 'application/json' },
      })

      await POST(request)

      expect(checkRateLimit).toHaveBeenCalledWith(
        'user',
        'user-123',
        'create-connection',
        20,
        86400 // 24 hours in seconds
      )
    })

    it('should return 429 when rate limit exceeded', async () => {
      ;(checkRateLimit as jest.Mock).mockRejectedValue(
        new RateLimitError('Rate limit exceeded', 3600)
      )

      const request = new NextRequest('http://localhost:3000/api/connections/create', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', connectWithUserId: 'user-456' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(429)
      const data = await response.json()
      expect(data.error).toBe('Rate limit exceeded')
      expect(response.headers.get('Retry-After')).toBe('3600')
    })
  })

  describe('Validation', () => {
    it('should return 400 when userId is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/connections/create', {
        method: 'POST',
        body: JSON.stringify({ connectWithUserId: 'user-456' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Missing userId or connectWithUserId')
    })

    it('should return 400 when connectWithUserId is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/connections/create', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Missing userId or connectWithUserId')
    })

    it('should return 404 when userA not found', async () => {
      ;(getUserResult as jest.Mock).mockImplementation((userId: string) => {
        if (userId === 'user-123') return Promise.resolve(null)
        if (userId === 'user-456') return Promise.resolve(mockUserB)
        return Promise.resolve(null)
      })

      const request = new NextRequest('http://localhost:3000/api/connections/create', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', connectWithUserId: 'user-456' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(404)
      const data = await response.json()
      expect(data.error).toBe('One or both users not found')
    })

    it('should return 404 when userB not found', async () => {
      ;(getUserResult as jest.Mock).mockImplementation((userId: string) => {
        if (userId === 'user-123') return Promise.resolve(mockUserA)
        if (userId === 'user-456') return Promise.resolve(null)
        return Promise.resolve(null)
      })

      const request = new NextRequest('http://localhost:3000/api/connections/create', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', connectWithUserId: 'user-456' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(404)
      const data = await response.json()
      expect(data.error).toBe('One or both users not found')
    })
  })

  describe('Success Cases', () => {
    it('should create connection successfully', async () => {
      const request = new NextRequest('http://localhost:3000/api/connections/create', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', connectWithUserId: 'user-456' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.connection).toEqual(mockConnection)
      expect(createConnection).toHaveBeenCalledWith('user-123', 'user-456')
    })
  })

  describe('Error Handling', () => {
    it('should return 500 on server error', async () => {
      ;(createConnection as jest.Mock).mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/connections/create', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', connectWithUserId: 'user-456' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.error).toBe('Failed to create connection')
    })
  })

  describe('Order of Operations', () => {
    it('should check authentication before validation', async () => {
      ;(requireAuth as jest.Mock).mockRejectedValue(
        new UnauthorizedError('No session token')
      )

      const request = new NextRequest('http://localhost:3000/api/connections/create', {
        method: 'POST',
        body: JSON.stringify({}), // Missing fields
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(401)
      expect(requireAuth).toHaveBeenCalled()
    })

    it('should check rate limit after authentication', async () => {
      ;(checkRateLimit as jest.Mock).mockRejectedValue(
        new RateLimitError('Rate limit exceeded', 3600)
      )

      const request = new NextRequest('http://localhost:3000/api/connections/create', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', connectWithUserId: 'user-456' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(429)
      expect(requireAuth).toHaveBeenCalled()
      expect(checkRateLimit).toHaveBeenCalled()
    })

    it('should not create connection before authentication', async () => {
      ;(requireAuth as jest.Mock).mockRejectedValue(
        new UnauthorizedError('No session token')
      )

      const request = new NextRequest('http://localhost:3000/api/connections/create', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', connectWithUserId: 'user-456' }),
        headers: { 'content-type': 'application/json' },
      })

      await POST(request)

      expect(createConnection).not.toHaveBeenCalled()
    })

    it('should not create connection before rate limit check', async () => {
      ;(checkRateLimit as jest.Mock).mockRejectedValue(
        new RateLimitError('Rate limit exceeded', 3600)
      )

      const request = new NextRequest('http://localhost:3000/api/connections/create', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', connectWithUserId: 'user-456' }),
        headers: { 'content-type': 'application/json' },
      })

      await POST(request)

      expect(createConnection).not.toHaveBeenCalled()
    })
  })
})
