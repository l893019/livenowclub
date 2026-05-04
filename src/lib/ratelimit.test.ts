import { checkRateLimit, RateLimitError } from './ratelimit'
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

  it('should set expiry only on first request (count=1)', async () => {
    ;(redis.incr as jest.Mock).mockResolvedValue(5)

    await checkRateLimit('ip', '1.2.3.4', 'test', 10, 60)

    expect(redis.expire).not.toHaveBeenCalled()
  })

  it('should handle Redis errors gracefully', async () => {
    ;(redis.incr as jest.Mock).mockRejectedValue(new Error('Redis connection failed'))

    // Should not throw - fails open for availability
    await expect(
      checkRateLimit('ip', '127.0.0.1', 'test', 10, 60)
    ).resolves.not.toThrow()
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
