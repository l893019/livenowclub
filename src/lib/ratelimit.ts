import { redis } from './redis';

export class RateLimitError extends Error {
  retryAfter: number;

  constructor(message: string, retryAfter: number) {
    super(message);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

export async function checkRateLimit(
  scope: 'ip' | 'user',
  identifier: string,
  action: string,
  limit: number,
  windowSeconds: number
): Promise<void> {
  try {
    const key = `ratelimit:${scope}:${identifier}:${action}`;
    const count = await redis.incr(key);

    // Set expiry only on first request
    if (count === 1) {
      await redis.expire(key, windowSeconds);
    }

    if (count > limit) {
      throw new RateLimitError('Rate limit exceeded', windowSeconds);
    }
  } catch (error) {
    // Fail open: if Redis is down, allow the request
    // Rate limiting is important but shouldn't break the app
    if (error instanceof RateLimitError) {
      throw error;
    }
    // Log Redis errors but don't block requests
    console.error('Rate limit check failed:', error);
  }
}
