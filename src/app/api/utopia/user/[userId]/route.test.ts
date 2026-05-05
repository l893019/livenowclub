import { NextRequest } from 'next/server'
import { GET } from './route'
import { requireAuth, requireOwnership, UnauthorizedError, ForbiddenError } from '@/lib/auth'
import { getUserUtopias, getUserResult } from '@/lib/utopia'

// Mock dependencies
jest.mock('@/lib/auth', () => ({
  requireAuth: jest.fn(),
  requireOwnership: jest.fn(),
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

jest.mock('@/lib/utopia', () => ({
  getUserUtopias: jest.fn(),
  getUserResult: jest.fn(),
}))

describe('/api/utopia/user/[userId]', () => {
  const mockUser = {
    id: 'user-123',
    name: 'Test User',
    email: 'test@example.com',
    archetype: 'Builder',
    secondaryArchetype: 'Explorer',
    scores: { builder: 8 },
    answers: ['0', '1', '0'],
    createdAt: new Date().toISOString(),
  }

  const mockUtopias = [
    {
      slug: 'sirius-abc123',
      name: 'Sirius',
      createdBy: 'user-456',
      members: [
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
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(requireAuth as jest.Mock).mockResolvedValue('user-123')
    ;(requireOwnership as jest.Mock).mockResolvedValue(undefined)
    ;(getUserResult as jest.Mock).mockResolvedValue(mockUser)
    ;(getUserUtopias as jest.Mock).mockResolvedValue(mockUtopias)
  })

  describe('Authentication', () => {
    it('should require authentication', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/user/user-123', {
        method: 'GET',
      })

      await GET(request, { params: Promise.resolve({ userId: 'user-123' }) })

      expect(requireAuth).toHaveBeenCalledWith(request)
    })

    it('should return 401 when not authenticated', async () => {
      ;(requireAuth as jest.Mock).mockRejectedValue(
        new UnauthorizedError('No session token')
      )

      const request = new NextRequest('http://localhost:3000/api/utopia/user/user-123', {
        method: 'GET',
      })

      const response = await GET(request, { params: Promise.resolve({ userId: 'user-123' }) })

      expect(response.status).toBe(401)
      const data = await response.json()
      expect(data.error).toBe('Unauthorized')
    })
  })

  describe('Ownership Verification', () => {
    it('should verify ownership using requireOwnership', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/user/user-123', {
        method: 'GET',
      })

      await GET(request, { params: Promise.resolve({ userId: 'user-123' }) })

      expect(requireOwnership).toHaveBeenCalledWith('user-123', 'user-123')
    })

    it('should return 403 when user does not own the resource', async () => {
      ;(requireOwnership as jest.Mock).mockRejectedValue(
        new ForbiddenError('Access denied: not resource owner')
      )

      const request = new NextRequest('http://localhost:3000/api/utopia/user/user-456', {
        method: 'GET',
      })

      const response = await GET(request, { params: Promise.resolve({ userId: 'user-456' }) })

      expect(response.status).toBe(403)
      const data = await response.json()
      expect(data.error).toBe('Access denied: not resource owner')
    })
  })

  describe('Validation', () => {
    it('should return 400 when userId is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/user/', {
        method: 'GET',
      })

      const response = await GET(request, { params: Promise.resolve({ userId: '' }) })

      expect(response.status).toBe(400)
      const data = await response.json()
      expect(data.error).toBe('Missing userId')
    })
  })

  describe('Success Cases', () => {
    it('should return user and utopias successfully', async () => {
      const request = new NextRequest('http://localhost:3000/api/utopia/user/user-123', {
        method: 'GET',
      })

      const response = await GET(request, { params: Promise.resolve({ userId: 'user-123' }) })

      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data.user).toEqual(mockUser)
      expect(data.utopias).toEqual(mockUtopias)
      expect(getUserResult).toHaveBeenCalledWith('user-123')
      expect(getUserUtopias).toHaveBeenCalledWith('user-123')
    })
  })

  describe('Error Handling', () => {
    it('should return 500 on server error', async () => {
      ;(getUserResult as jest.Mock).mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/utopia/user/user-123', {
        method: 'GET',
      })

      const response = await GET(request, { params: Promise.resolve({ userId: 'user-123' }) })

      expect(response.status).toBe(500)
      const data = await response.json()
      expect(data.error).toBe('Failed to get user utopias')
    })
  })

  describe('Order of Operations', () => {
    it('should check authentication before validation', async () => {
      ;(requireAuth as jest.Mock).mockRejectedValue(
        new UnauthorizedError('No session token')
      )

      const request = new NextRequest('http://localhost:3000/api/utopia/user/', {
        method: 'GET',
      })

      const response = await GET(request, { params: Promise.resolve({ userId: '' }) })

      expect(response.status).toBe(401)
      expect(requireAuth).toHaveBeenCalled()
      // Validation would normally fail with 400, but auth comes first
    })

    it('should not fetch user data before authentication', async () => {
      ;(requireAuth as jest.Mock).mockRejectedValue(
        new UnauthorizedError('No session token')
      )

      const request = new NextRequest('http://localhost:3000/api/utopia/user/user-123', {
        method: 'GET',
      })

      await GET(request, { params: Promise.resolve({ userId: 'user-123' }) })

      expect(getUserResult).not.toHaveBeenCalled()
      expect(getUserUtopias).not.toHaveBeenCalled()
    })

    it('should not fetch user data before ownership verification', async () => {
      ;(requireOwnership as jest.Mock).mockRejectedValue(
        new ForbiddenError('Access denied: not resource owner')
      )

      const request = new NextRequest('http://localhost:3000/api/utopia/user/user-456', {
        method: 'GET',
      })

      await GET(request, { params: Promise.resolve({ userId: 'user-456' }) })

      expect(getUserResult).not.toHaveBeenCalled()
      expect(getUserUtopias).not.toHaveBeenCalled()
    })
  })
})
