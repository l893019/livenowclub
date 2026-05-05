import { NextRequest } from 'next/server'
import { POST } from './route'
import { requireAuth, validateCSRF, UnauthorizedError, CSRFError } from '@/lib/auth'
import { joinUtopia, getUserResult } from '@/lib/utopia'
import { sendJoinNotification } from '@/lib/email'

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

jest.mock('@/lib/utopia', () => ({
  joinUtopia: jest.fn(),
  getUserResult: jest.fn(),
}))

jest.mock('@/lib/email', () => ({
  sendJoinNotification: jest.fn().mockResolvedValue(undefined),
}))

describe('/api/utopia/join', () => {
  const mockUserResult = {
    id: 'user-123',
    name: 'Test User',
    email: 'test@example.com',
    archetype: 'Builder',
    secondaryArchetype: 'Explorer',
    scores: { builder: 8 },
    answers: ['0', '1', '0'],
    createdAt: new Date().toISOString(),
  }

  const mockRoom = {
    slug: 'sirius-abc123',
    name: 'Sirius',
    createdBy: 'user-456',
    members: [
      {
        id: 'user-456',
        name: 'Founder User',
        archetype: 'Explorer',
        joinedAt: new Date().toISOString(),
        isFounder: true,
        answers: ['1', '0', '1'],
      },
      {
        id: 'user-123',
        name: 'Test User',
        archetype: 'Builder',
        joinedAt: new Date().toISOString(),
        isFounder: false,
        answers: ['0', '1', '0'],
      },
    ],
    createdAt: new Date().toISOString(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(requireAuth as jest.Mock).mockResolvedValue('user-123')
    ;(validateCSRF as jest.Mock).mockResolvedValue(undefined)
    ;(getUserResult as jest.Mock).mockResolvedValue(mockUserResult)
    ;(joinUtopia as jest.Mock).mockResolvedValue(mockRoom)
  })

  describe('Authentication', () => {
    it('should require authentication', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/join', {
        method: 'POST',
        body: JSON.stringify({ slug: 'sirius-abc123', userId: 'user-123' }),
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

      const request = new NextRequest('http://localhost:3000/api/utopia/join', {
        method: 'POST',
        body: JSON.stringify({ slug: 'sirius-abc123', userId: 'user-123' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(401)
      const data = await response.json()
      expect(data.error).toBe('Unauthorized')
    })

    it('should verify sessionUserId matches userId', async () => {
      ;(requireAuth as jest.Mock).mockResolvedValue('user-456') // Different user

      const request = new NextRequest('http://localhost:3000/api/utopia/join', {
        method: 'POST',
        body: JSON.stringify({ slug: 'sirius-abc123', userId: 'user-123' }),
        headers: {
          'content-type': 'application/json',
          'cookie': 'session=test-session-token',
        },
      })

      const response = await POST(request)

      expect(response.status).toBe(403)
      const data = await response.json()
      expect(data.error).toBe('Cannot join utopia as another user')
    })
  })

  describe('CSRF Protection', () => {
    it('should validate CSRF token', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/join', {
        method: 'POST',
        body: JSON.stringify({ slug: 'sirius-abc123', userId: 'user-123' }),
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

      const request = new NextRequest('http://localhost:3000/api/utopia/join', {
        method: 'POST',
        body: JSON.stringify({ slug: 'sirius-abc123', userId: 'user-123' }),
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

      const request = new NextRequest('http://localhost:3000/api/utopia/join', {
        method: 'POST',
        body: JSON.stringify({ slug: 'sirius-abc123', userId: 'user-123' }),
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

  describe('Validation', () => {
    it('should return 400 when slug is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/join', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Missing slug or userId')
    })

    it('should return 400 when userId is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/join', {
        method: 'POST',
        body: JSON.stringify({ slug: 'sirius-abc123' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Missing slug or userId')
    })

    it('should return 404 when user result not found', async () => {
      ;(getUserResult as jest.Mock).mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/utopia/join', {
        method: 'POST',
        body: JSON.stringify({ slug: 'sirius-abc123', userId: 'user-123' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(404)
      const data = await response.json()
      expect(data.error).toBe('User not found. Please complete the quiz first.')
    })

    it('should return 404 when utopia not found', async () => {
      ;(joinUtopia as jest.Mock).mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/utopia/join', {
        method: 'POST',
        body: JSON.stringify({ slug: 'sirius-abc123', userId: 'user-123' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(404)
      const data = await response.json()
      expect(data.error).toBe('Utopia not found')
    })
  })

  describe('Successful Join', () => {
    it('should join utopia successfully', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/join', {
        method: 'POST',
        body: JSON.stringify({ slug: 'sirius-abc123', userId: 'user-123' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(data.room).toEqual(mockRoom)
    })

    it('should call joinUtopia with correct parameters', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/join', {
        method: 'POST',
        body: JSON.stringify({ slug: 'sirius-abc123', userId: 'user-123' }),
        headers: { 'content-type': 'application/json' },
      })

      await POST(request)

      expect(joinUtopia).toHaveBeenCalledWith(
        'sirius-abc123',
        'user-123',
        'Test User',
        'Builder',
        ['0', '1', '0']
      )
    })
  })

  describe('Error Handling', () => {
    it('should return 500 on server error', async () => {
      ;(joinUtopia as jest.Mock).mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/utopia/join', {
        method: 'POST',
        body: JSON.stringify({ slug: 'sirius-abc123', userId: 'user-123' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.error).toBe('Failed to join utopia')
    })
  })

  describe('Order of Operations', () => {
    it('should check authentication before validation', async () => {
      ;(requireAuth as jest.Mock).mockRejectedValue(
        new UnauthorizedError('No session token')
      )

      const request = new NextRequest('http://localhost:3000/api/utopia/join', {
        method: 'POST',
        body: JSON.stringify({}), // Missing slug and userId
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(401)
      expect(requireAuth).toHaveBeenCalled()
      // Validation would normally fail with 400, but auth comes first
    })
  })
})
