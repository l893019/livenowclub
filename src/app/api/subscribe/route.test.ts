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

describe('/api/subscribe email validation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Mock rate limit to pass for validation tests
    ;(checkRateLimit as jest.Mock).mockResolvedValue(undefined)
  })

  it('should return 400 for invalid email format', async () => {
    const request = new NextRequest('http://localhost:3000/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'not-an-email' }),
      headers: { 'content-type': 'application/json' }
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe('Invalid email format')
  })

  it('should return 400 for email without domain', async () => {
    const request = new NextRequest('http://localhost:3000/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'user@' }),
      headers: { 'content-type': 'application/json' }
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe('Invalid email format')
  })

  it('should return 400 for email with invalid TLD', async () => {
    const request = new NextRequest('http://localhost:3000/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'user@domain.c' }),
      headers: { 'content-type': 'application/json' }
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe('Invalid email format')
  })

  it('should return 400 for email exceeding max length', async () => {
    const longEmail = 'a'.repeat(250) + '@example.com'
    const request = new NextRequest('http://localhost:3000/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: longEmail }),
      headers: { 'content-type': 'application/json' }
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe('Email must not exceed 254 characters')
  })

  it('should return 400 for email with consecutive dots', async () => {
    const request = new NextRequest('http://localhost:3000/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'user..name@example.com' }),
      headers: { 'content-type': 'application/json' }
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe('Invalid email format')
  })

  it('should accept valid email address', async () => {
    const request = new NextRequest('http://localhost:3000/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'valid.user@example.com' }),
      headers: { 'content-type': 'application/json' }
    })

    const response = await POST(request)

    expect(response.status).not.toBe(400)
  })
})

describe('/api/subscribe GET endpoint (retry queue)', () => {
  const originalEnv = process.env.ADMIN_API_KEY;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.ADMIN_API_KEY = 'test-admin-key-123';
  });

  afterEach(() => {
    process.env.ADMIN_API_KEY = originalEnv;
  });

  it('should return 401 when no API key provided', async () => {
    const { GET } = await import('./route');
    const request = new NextRequest('http://localhost:3000/api/subscribe');
    const response = await GET(request);

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.error).toBe('Unauthorized');
  });

  it('should return 401 when invalid API key provided', async () => {
    const { GET } = await import('./route');
    const request = new NextRequest('http://localhost:3000/api/subscribe', {
      headers: { 'x-admin-api-key': 'wrong-key' }
    });
    const response = await GET(request);

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.error).toBe('Unauthorized');
  });

  it('should return 500 when ADMIN_API_KEY not configured', async () => {
    delete process.env.ADMIN_API_KEY;
    const { GET } = await import('./route');
    const request = new NextRequest('http://localhost:3000/api/subscribe', {
      headers: { 'x-admin-api-key': 'any-key' }
    });
    const response = await GET(request);

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toBe('Server configuration error');
  });
})
