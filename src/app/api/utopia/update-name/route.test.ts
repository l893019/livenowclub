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
  updateUserName: jest.fn(),
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
import { updateUserName } from '@/lib/utopia'
import { requireAuth, requireOwnership, validateCSRF, UnauthorizedError, ForbiddenError, CSRFError } from '@/lib/auth'

describe('/api/utopia/update-name', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(requireAuth as jest.Mock).mockResolvedValue('user-123')
    ;(validateCSRF as jest.Mock).mockResolvedValue(undefined)
    ;(requireOwnership as jest.Mock).mockResolvedValue(undefined)
    ;(updateUserName as jest.Mock).mockResolvedValue(undefined)
  })

  describe('Authentication', () => {
    it('should require authentication', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/update-name', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', name: 'New Name' }),
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

      const request = new NextRequest('http://localhost:3000/api/utopia/update-name', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', name: 'New Name' }),
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
      const request = new NextRequest('http://localhost:3000/api/utopia/update-name', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', name: 'New Name' }),
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

      const request = new NextRequest('http://localhost:3000/api/utopia/update-name', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', name: 'New Name' }),
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

      const request = new NextRequest('http://localhost:3000/api/utopia/update-name', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', name: 'New Name' }),
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

  describe('Ownership Verification', () => {
    it('should verify ownership before updating name', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/update-name', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', name: 'New Name' }),
        headers: { 'content-type': 'application/json' },
      })

      await POST(request)

      expect(requireOwnership).toHaveBeenCalledWith('user-123', 'user-123')
    })

    it('should return 403 when user does not own the resource', async () => {
      ;(requireOwnership as jest.Mock).mockRejectedValue(
        new ForbiddenError('Access denied: not resource owner')
      )

      const request = new NextRequest('http://localhost:3000/api/utopia/update-name', {
        method: 'POST',
        body: JSON.stringify({ userId: 'other-user', name: 'New Name' }),
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
      const request = new NextRequest('http://localhost:3000/api/utopia/update-name', {
        method: 'POST',
        body: JSON.stringify({ name: 'New Name' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('userId and name required')
    })

    it('should return 400 when name is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/update-name', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('userId and name required')
    })

    it('should return 400 for name with HTML tags', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/update-name', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', name: '<script>alert("xss")</script>' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      // After HTML removal, remaining text has invalid characters
      expect(data.error).toBe('Name contains invalid characters')
    })

    it('should return 400 for name with invalid characters', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/update-name', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', name: 'User123@!' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Name contains invalid characters')
    })

    it('should return 400 for name exceeding max length', async () => {
      const longName = 'A'.repeat(51)
      const request = new NextRequest('http://localhost:3000/api/utopia/update-name', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', name: longName }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Name must not exceed 50 characters')
    })

    it('should return 400 for name that is only whitespace', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/update-name', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', name: '   ' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Name cannot be empty')
    })

    it('should accept valid name with spaces and hyphens', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/update-name', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', name: "Mary-Jane O'Brien" }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(updateUserName).toHaveBeenCalledWith('user-123', "Mary-Jane O'Brien")
    })

    it('should trim whitespace from name', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/update-name', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', name: '  John Doe  ' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(updateUserName).toHaveBeenCalledWith('user-123', 'John Doe')
    })
  })

  describe('Success Cases', () => {
    it('should update name when all validations pass', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/update-name', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', name: 'New Name' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.success).toBe(true)
      expect(updateUserName).toHaveBeenCalledWith('user-123', 'New Name')
    })

    it('should not call updateUserName before authentication', async () => {
      ;(requireAuth as jest.Mock).mockRejectedValue(new UnauthorizedError('No session token'))

      const request = new NextRequest('http://localhost:3000/api/utopia/update-name', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', name: 'New Name' }),
        headers: { 'content-type': 'application/json' },
      })

      await POST(request)

      expect(updateUserName).not.toHaveBeenCalled()
    })

    it('should not call updateUserName before ownership verification', async () => {
      ;(requireOwnership as jest.Mock).mockRejectedValue(
        new ForbiddenError('Access denied: not resource owner')
      )

      const request = new NextRequest('http://localhost:3000/api/utopia/update-name', {
        method: 'POST',
        body: JSON.stringify({ userId: 'other-user', name: 'New Name' }),
        headers: { 'content-type': 'application/json' },
      })

      await POST(request)

      expect(updateUserName).not.toHaveBeenCalled()
    })
  })

  describe('Error Handling', () => {
    it('should return 500 on database error', async () => {
      ;(updateUserName as jest.Mock).mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/utopia/update-name', {
        method: 'POST',
        body: JSON.stringify({ userId: 'user-123', name: 'New Name' }),
        headers: { 'content-type': 'application/json' },
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.error).toBe('Failed to update name')
    })
  })
})
