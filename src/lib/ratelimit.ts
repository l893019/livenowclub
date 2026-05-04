import { redis } from './redis';

// Common rate limits for different endpoint types
export const RATE_LIMITS = {
  // Generous limit for general API usage
  general: { limit: 100, window: 60 }, // 100 req/minute

  // Strict limit for registration/sensitive operations
  strict: { limit: 5, window: 300 }, // 5 req/5min

  // Very strict for admin endpoints
  admin: { limit: 10, window: 60 }, // 10 req/minute
} as const;

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
  // Validate inputs
  if (!identifier || !action) {
    throw new Error('identifier and action must be non-empty');
  }
  if (limit <= 0 || windowSeconds <= 0) {
    throw new Error('limit and windowSeconds must be positive');
  }

  try {
    const key = `ratelimit:${scope}:${identifier}:${action}`;
    const count = await redis.incr(key);

    // Always set/refresh expiry to prevent key from persisting forever
    // (Safe approach: refreshes TTL on every request)
    await redis.expire(key, windowSeconds);

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

export function getClientIP(request: Request): string {
  // Try Vercel/Cloudflare forwarded IP first
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // x-forwarded-for can be "client, proxy1, proxy2"
    return forwarded.split(',')[0].trim();
  }

  // Fallback to x-real-ip
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Default fallback (shouldn't happen on Vercel)
  return '0.0.0.0';
}
