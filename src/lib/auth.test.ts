import {
  createSession,
  requireAuth,
  requireOwnership,
  validateCSRF,
  deleteSession,
  UnauthorizedError,
  ForbiddenError,
  CSRFError
} from './auth'
import { NextRequest } from 'next/server'
import { redis } from './redis'

jest.mock('./redis', () => ({
  redis: {
    set: jest.fn(),
    get: jest.fn(),
    del: jest.fn(),
  },
}))

describe('Authentication Infrastructure', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createSession', () => {
    it('should create session with random tokens', async () => {
      ;(redis.set as jest.Mock).mockResolvedValue('OK')

      const result = await createSession('user-123')

      expect(result.sessionToken).toHaveLength(64) // 32 bytes = 64 hex chars
      expect(result.csrfToken).toHaveLength(64)
      expect(result.sessionToken).not.toBe(result.csrfToken)

      expect(redis.set).toHaveBeenCalledWith(
        expect.stringContaining('session:'),
        expect.any(String),
        'EX',
        90 * 24 * 60 * 60
      )
    })

    it('should store session data with userId', async () => {
      ;(redis.set as jest.Mock).mockResolvedValue('OK')

      await createSession('user-123')

      const callArgs = (redis.set as jest.Mock).mock.calls[0]
      const sessionData = JSON.parse(callArgs[1])

      expect(sessionData.userId).toBe('user-123')
      expect(sessionData.csrfToken).toBeDefined()
      expect(sessionData.createdAt).toBeDefined()
      expect(sessionData.lastActive).toBeDefined()
    })
  })

  describe('requireAuth', () => {
    it('should throw UnauthorizedError when no session cookie', async () => {
      const request = new NextRequest('http://localhost:3000/api/test')

      await expect(requireAuth(request)).rejects.toThrow(UnauthorizedError)
      await expect(requireAuth(request)).rejects.toThrow('No session token')
    })

    it('should throw UnauthorizedError when session not found', async () => {
      ;(redis.get as jest.Mock).mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: { cookie: 'session=invalid-token' }
      })

      await expect(requireAuth(request)).rejects.toThrow(UnauthorizedError)
      await expect(requireAuth(request)).rejects.toThrow('Invalid or expired session')
    })

    it('should return userId for valid session', async () => {
      const sessionData = {
        userId: 'user-123',
        csrfToken: 'csrf-token',
        createdAt: Date.now(),
        lastActive: Date.now(),
      }
      ;(redis.get as jest.Mock).mockResolvedValue(JSON.stringify(sessionData))
      ;(redis.set as jest.Mock).mockResolvedValue('OK')

      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: { cookie: 'session=valid-token' }
      })

      const userId = await requireAuth(request)

      expect(userId).toBe('user-123')
      expect(redis.set).toHaveBeenCalled() // Should refresh session
    })

    it('should throw UnauthorizedError for expired session', async () => {
      const sessionData = {
        userId: 'user-123',
        csrfToken: 'csrf-token',
        createdAt: Date.now() - 91 * 24 * 60 * 60 * 1000, // 91 days ago
        lastActive: Date.now(),
      }
      ;(redis.get as jest.Mock).mockResolvedValue(JSON.stringify(sessionData))
      ;(redis.del as jest.Mock).mockResolvedValue(1)

      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: { cookie: 'session=expired-token' }
      })

      await expect(requireAuth(request)).rejects.toThrow(UnauthorizedError)
      await expect(requireAuth(request)).rejects.toThrow('Session expired')
      expect(redis.del).toHaveBeenCalledWith('session:expired-token')
    })
  })

  describe('requireOwnership', () => {
    it('should allow access when userId matches resourceUserId', async () => {
      await expect(
        requireOwnership('user-123', 'user-123')
      ).resolves.not.toThrow()
    })

    it('should throw ForbiddenError when userId does not match', async () => {
      await expect(
        requireOwnership('user-123', 'user-456')
      ).rejects.toThrow(ForbiddenError)

      await expect(
        requireOwnership('user-123', 'user-456')
      ).rejects.toThrow('Access denied: not resource owner')
    })
  })

  describe('validateCSRF', () => {
    it('should throw CSRFError when header missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: { cookie: 'csrf-token=token123' }
      })

      await expect(
        validateCSRF(request, 'session-token')
      ).rejects.toThrow(CSRFError)

      await expect(
        validateCSRF(request, 'session-token')
      ).rejects.toThrow('CSRF token missing')
    })

    it('should throw CSRFError when cookie missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: { 'x-csrf-token': 'token123' }
      })

      await expect(
        validateCSRF(request, 'session-token')
      ).rejects.toThrow(CSRFError)

      await expect(
        validateCSRF(request, 'session-token')
      ).rejects.toThrow('CSRF token missing')
    })

    it('should throw CSRFError when tokens do not match', async () => {
      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: {
          'x-csrf-token': 'token123',
          cookie: 'csrf-token=token456'
        }
      })

      await expect(
        validateCSRF(request, 'session-token')
      ).rejects.toThrow(CSRFError)

      await expect(
        validateCSRF(request, 'session-token')
      ).rejects.toThrow('CSRF token mismatch')
    })

    it('should throw CSRFError when session invalid', async () => {
      ;(redis.get as jest.Mock).mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: {
          'x-csrf-token': 'token123',
          cookie: 'csrf-token=token123'
        }
      })

      await expect(
        validateCSRF(request, 'session-token')
      ).rejects.toThrow(CSRFError)

      await expect(
        validateCSRF(request, 'session-token')
      ).rejects.toThrow('Invalid session')
    })

    it('should throw CSRFError when token does not match session', async () => {
      const sessionData = {
        userId: 'user-123',
        csrfToken: 'correct-token',
        createdAt: Date.now(),
        lastActive: Date.now(),
      }
      ;(redis.get as jest.Mock).mockResolvedValue(JSON.stringify(sessionData))

      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: {
          'x-csrf-token': 'wrong-token',
          cookie: 'csrf-token=wrong-token'
        }
      })

      await expect(
        validateCSRF(request, 'session-token')
      ).rejects.toThrow(CSRFError)

      await expect(
        validateCSRF(request, 'session-token')
      ).rejects.toThrow('Invalid CSRF token')
    })

    it('should pass when CSRF tokens match', async () => {
      const sessionData = {
        userId: 'user-123',
        csrfToken: 'correct-token',
        createdAt: Date.now(),
        lastActive: Date.now(),
      }
      ;(redis.get as jest.Mock).mockResolvedValue(JSON.stringify(sessionData))

      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: {
          'x-csrf-token': 'correct-token',
          cookie: 'csrf-token=correct-token'
        }
      })

      await expect(
        validateCSRF(request, 'session-token')
      ).resolves.not.toThrow()
    })
  })

  describe('deleteSession', () => {
    it('should delete session from Redis', async () => {
      ;(redis.del as jest.Mock).mockResolvedValue(1)

      await deleteSession('session-token-123')

      expect(redis.del).toHaveBeenCalledWith('session:session-token-123')
    })
  })

  describe('Error classes', () => {
    it('should create UnauthorizedError with correct properties', () => {
      const error = new UnauthorizedError('Test message')
      expect(error.message).toBe('Test message')
      expect(error.name).toBe('UnauthorizedError')
      expect(error).toBeInstanceOf(Error)
    })

    it('should create ForbiddenError with correct properties', () => {
      const error = new ForbiddenError('Test message')
      expect(error.message).toBe('Test message')
      expect(error.name).toBe('ForbiddenError')
      expect(error).toBeInstanceOf(Error)
    })

    it('should create CSRFError with correct properties', () => {
      const error = new CSRFError('Test message')
      expect(error.message).toBe('Test message')
      expect(error.name).toBe('CSRFError')
      expect(error).toBeInstanceOf(Error)
    })
  })
})
