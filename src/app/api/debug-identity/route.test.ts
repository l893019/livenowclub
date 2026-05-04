import { GET } from './route'
import { NextRequest } from 'next/server'
import { getUserResult } from '@/lib/utopia'

// Mock the utopia module to avoid Redis dependencies
jest.mock('@/lib/utopia', () => ({
  getUserResult: jest.fn(),
}))

describe('/api/debug-identity', () => {
  const originalEnv = process.env.NODE_ENV

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    process.env.NODE_ENV = originalEnv
  })

  it('should return 404 in production', async () => {
    process.env.NODE_ENV = 'production'
    const request = new NextRequest('http://localhost:3000/api/debug-identity?userId=test')
    const response = await GET(request)

    expect(response.status).toBe(404)
    const data = await response.json()
    expect(data.error).toBe('Not found')
    // Should not call getUserResult in production
    expect(getUserResult).not.toHaveBeenCalled()
  })

  it('should work normally in development', async () => {
    process.env.NODE_ENV = 'development'

    // Mock user data with valid quiz answers
    ;(getUserResult as jest.Mock).mockResolvedValue({
      name: 'Test User',
      answers: [1, 2, 3, 4, 5, 6, 7],
    })

    const request = new NextRequest('http://localhost:3000/api/debug-identity?userId=test-user')
    const response = await GET(request)

    // Should not return 404 (will return 200 or other status based on user lookup)
    expect(response.status).not.toBe(404)
    expect(getUserResult).toHaveBeenCalledWith('test-user')
  })

  it('should work normally when NODE_ENV is not set', async () => {
    delete process.env.NODE_ENV

    // Mock user data with valid quiz answers
    ;(getUserResult as jest.Mock).mockResolvedValue({
      name: 'Test User',
      answers: [1, 2, 3, 4, 5, 6, 7],
    })

    const request = new NextRequest('http://localhost:3000/api/debug-identity?userId=test-user')
    const response = await GET(request)

    // Should not return 404 (defaults to development)
    expect(response.status).not.toBe(404)
    expect(getUserResult).toHaveBeenCalledWith('test-user')
  })
})
