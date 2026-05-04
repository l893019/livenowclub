import { checkRateLimit, RateLimitError, getClientIP } from './ratelimit'
import { redis } from '@/lib/redis'

jest.mock('@/lib/redis', () => ({
  redis: {
    incr: jest.fn(),
    expire: jest.fn(),
  },
}))

describe('checkRateLimit', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should allow request when under limit', async () => {
    ;(redis.incr as jest.Mock).mockResolvedValue(1)

    await expect(
      checkRateLimit('ip', '127.0.0.1', 'test', 10, 60)
    ).resolves.not.toThrow()

    expect(redis.incr).toHaveBeenCalledWith('ratelimit:ip:127.0.0.1:test')
    expect(redis.expire).toHaveBeenCalledWith('ratelimit:ip:127.0.0.1:test', 60)
  })

  it('should throw RateLimitError when limit exceeded', async () => {
    ;(redis.incr as jest.Mock).mockResolvedValue(11)

    await expect(
      checkRateLimit('ip', '127.0.0.1', 'test', 10, 60)
    ).rejects.toThrow(RateLimitError)

    expect(redis.incr).toHaveBeenCalledWith('ratelimit:ip:127.0.0.1:test')
  })

  it('should create correct key for user scope', async () => {
    ;(redis.incr as jest.Mock).mockResolvedValue(1)

    await checkRateLimit('user', 'user-123', 'api', 100, 3600)

    expect(redis.incr).toHaveBeenCalledWith('ratelimit:user:user-123:api')
    expect(redis.expire).toHaveBeenCalledWith('ratelimit:user:user-123:api', 3600)
  })

  it('should always set/refresh expiry to prevent orphaned keys', async () => {
    ;(redis.incr as jest.Mock).mockResolvedValue(5)

    await checkRateLimit('ip', '1.2.3.4', 'test', 10, 60)

    // Should set expiry on every request to prevent race conditions
    expect(redis.expire).toHaveBeenCalledWith('ratelimit:ip:1.2.3.4:test', 60)
  })

  it('should handle Redis errors gracefully', async () => {
    ;(redis.incr as jest.Mock).mockRejectedValue(new Error('Redis connection failed'))

    // Should not throw - fails open for availability
    await expect(
      checkRateLimit('ip', '127.0.0.1', 'test', 10, 60)
    ).resolves.not.toThrow()
  })
})

describe('input validation', () => {
  it('should throw on empty identifier', async () => {
    await expect(
      checkRateLimit('ip', '', 'test', 10, 60)
    ).rejects.toThrow('identifier and action must be non-empty')
  })

  it('should throw on empty action', async () => {
    await expect(
      checkRateLimit('ip', '1.2.3.4', '', 10, 60)
    ).rejects.toThrow('identifier and action must be non-empty')
  })

  it('should throw on negative limit', async () => {
    await expect(
      checkRateLimit('ip', '1.2.3.4', 'test', -5, 60)
    ).rejects.toThrow('limit and windowSeconds must be positive')
  })

  it('should throw on zero window', async () => {
    await expect(
      checkRateLimit('ip', '1.2.3.4', 'test', 10, 0)
    ).rejects.toThrow('limit and windowSeconds must be positive')
  })
})

describe('getClientIP', () => {
  it('should extract IP from x-forwarded-for', () => {
    const request = new Request('http://localhost', {
      headers: { 'x-forwarded-for': '1.2.3.4, 5.6.7.8' }
    })
    expect(getClientIP(request)).toBe('1.2.3.4')
  })

  it('should extract IP from x-real-ip if no x-forwarded-for', () => {
    const request = new Request('http://localhost', {
      headers: { 'x-real-ip': '9.10.11.12' }
    })
    expect(getClientIP(request)).toBe('9.10.11.12')
  })

  it('should return fallback if no headers', () => {
    const request = new Request('http://localhost')
    expect(getClientIP(request)).toBe('0.0.0.0')
  })
})

describe('RateLimitError', () => {
  it('should have correct properties', () => {
    const error = new RateLimitError('Rate limit exceeded', 60)

    expect(error.message).toBe('Rate limit exceeded')
    expect(error.retryAfter).toBe(60)
    expect(error.name).toBe('RateLimitError')
    expect(error).toBeInstanceOf(Error)
  })
})
