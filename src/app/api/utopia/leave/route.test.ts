import { NextRequest } from 'next/server'
import { POST } from './route'
import { requireAuth, validateCSRF, UnauthorizedError, ForbiddenError, CSRFError } from '@/lib/auth'
import { leaveUtopia } from '@/lib/utopia'

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

jest.mock('@/lib/utopia', () => ({
  leaveUtopia: jest.fn(),
}))

describe('/api/utopia/leave', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(requireAuth as jest.Mock).mockResolvedValue('user-123')
    ;(validateCSRF as jest.Mock).mockResolvedValue(undefined)
    ;(leaveUtopia as jest.Mock).mockResolvedValue(true)
  })

  describe('Authentication', () => {
    it('should require authentication', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/leave', {
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

      const request = new NextRequest('http://localhost:3000/api/utopia/leave', {
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

      const request = new NextRequest('http://localhost:3000/api/utopia/leave', {
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
      expect(data.error).toBe('Cannot leave utopia as another user')
    })
  })

  describe('CSRF Protection', () => {
    it('should validate CSRF token', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/leave', {
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

      const request = new NextRequest('http://localhost:3000/api/utopia/leave', {
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

      const request = new NextRequest('http://localhost:3000/api/utopia/leave', {
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
      const request = new NextRequest('http://localhost:3000/api/utopia/leave', {
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
      const request = new NextRequest('http://localhost:3000/api/utopia/leave', {
        method: 'POST',
        body: JSON.stringify({ slug: 'sirius-abc123' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Missing slug or userId')
    })
  })

  describe('Success Cases', () => {
    it('should leave utopia successfully', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/leave', {
        method: 'POST',
        body: JSON.stringify({ slug: 'sirius-abc123', userId: 'user-123' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(leaveUtopia).toHaveBeenCalledWith('sirius-abc123', 'user-123')
    })

    it('should return 404 when utopia not found', async () => {
      ;(leaveUtopia as jest.Mock).mockResolvedValue(false)

      const request = new NextRequest('http://localhost:3000/api/utopia/leave', {
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

  describe('Error Handling', () => {
    it('should return 500 on server error', async () => {
      ;(leaveUtopia as jest.Mock).mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/utopia/leave', {
        method: 'POST',
        body: JSON.stringify({ slug: 'sirius-abc123', userId: 'user-123' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.error).toBe('Failed to leave utopia')
    })
  })

  describe('Order of Operations', () => {
    it('should check authentication before validation', async () => {
      ;(requireAuth as jest.Mock).mockRejectedValue(
        new UnauthorizedError('No session token')
      )

      const request = new NextRequest('http://localhost:3000/api/utopia/leave', {
        method: 'POST',
        body: JSON.stringify({}), // Missing slug and userId
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(401)
      expect(requireAuth).toHaveBeenCalled()
      // Validation would normally fail with 400, but auth comes first
    })

    it('should not call leaveUtopia before authentication', async () => {
      ;(requireAuth as jest.Mock).mockRejectedValue(
        new UnauthorizedError('No session token')
      )

      const request = new NextRequest('http://localhost:3000/api/utopia/leave', {
        method: 'POST',
        body: JSON.stringify({ slug: 'sirius-abc123', userId: 'user-123' }),
        headers: { 'content-type': 'application/json' },
      })

      await POST(request)

      expect(leaveUtopia).not.toHaveBeenCalled()
    })
  })
})
