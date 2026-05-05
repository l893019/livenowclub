import { POST } from './route'
import { NextRequest } from 'next/server'
import { checkRateLimit } from '@/lib/ratelimit'

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
    getClientIP: jest.fn(() => '1.2.3.4'),
    RateLimitError,
    RATE_LIMITS: {
      subscribe: { limit: 5, window: 3600 }
    }
  }
})

jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => ({
    set: jest.fn().mockResolvedValue('OK'),
    get: jest.fn().mockResolvedValue(null),
    zadd: jest.fn().mockResolvedValue(1),
    sadd: jest.fn().mockResolvedValue(1),
    incr: jest.fn().mockResolvedValue(1),
    zrange: jest.fn().mockResolvedValue([]),
    zrem: jest.fn().mockResolvedValue(1),
  }))
})

describe('/api/subscribe rate limiting', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should check rate limit before processing subscribe request', async () => {
    const request = new NextRequest('http://localhost:3000/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }),
      headers: { 'content-type': 'application/json' }
    })

    await POST(request)

    expect(checkRateLimit).toHaveBeenCalledWith(
      'ip',
      '1.2.3.4',
      'subscribe',
      5,
      3600
    )
  })

  it('should return 429 when rate limit exceeded', async () => {
    const { RateLimitError } = jest.requireMock('@/lib/ratelimit')
    ;(checkRateLimit as jest.Mock).mockRejectedValue(new RateLimitError('Rate limit exceeded', 3600))

    const request = new NextRequest('http://localhost:3000/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }),
      headers: { 'content-type': 'application/json' }
    })

    const response = await POST(request)

    expect(response.status).toBe(429)
    const data = await response.json()
    expect(data.error).toBe('Too many requests')
    expect(response.headers.get('Retry-After')).toBe('3600')
  })
})
