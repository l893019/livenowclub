import { NextRequest } from 'next/server'

// Mock RateLimitError class - must be defined before mocks
class MockRateLimitError extends Error {
  retryAfter: number
  constructor(message: string, retryAfter: number) {
    super(message)
    this.name = 'RateLimitError'
    this.retryAfter = retryAfter
  }
}

// Mock Redis
jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => ({
    incr: jest.fn(),
    setex: jest.fn(),
    get: jest.fn(),
    sadd: jest.fn(),
    zadd: jest.fn(),
    expire: jest.fn(),
    zremrangebyrank: jest.fn(),
  }))
})

jest.mock('@/lib/ratelimit', () => ({
  checkRateLimit: jest.fn(),
  getClientIP: jest.fn(() => '1.2.3.4'),
  RateLimitError: MockRateLimitError,
  RATE_LIMITS: {
    track: { limit: 100, window: 3600 }
  }
}))

import { POST } from './route'
import { checkRateLimit } from '@/lib/ratelimit'

describe('/api/track rate limiting', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should check rate limit before tracking event', async () => {
    const request = new NextRequest('http://localhost:3000/api/track', {
      method: 'POST',
      body: JSON.stringify({
        sessionId: 'test-session',
        event: 'page_view',
        data: {}
      }),
      headers: { 'content-type': 'application/json' }
    })

    await POST(request)

    expect(checkRateLimit).toHaveBeenCalledWith(
      'ip',
      '1.2.3.4',
      'track',
      100,
      3600
    )
  })

  it('should return 429 when rate limit exceeded', async () => {
    ;(checkRateLimit as jest.Mock).mockRejectedValue(
      new MockRateLimitError('Rate limit exceeded', 3600)
    )

    const request = new NextRequest('http://localhost:3000/api/track', {
      method: 'POST',
      body: JSON.stringify({
        sessionId: 'test-session',
        event: 'page_view',
        data: {}
      }),
      headers: { 'content-type': 'application/json' }
    })

    const response = await POST(request)

    expect(response.status).toBe(429)
    const data = await response.json()
    expect(data.error).toBe('Too many requests')
    expect(response.headers.get('Retry-After')).toBe('3600')
  })
})
