# LiveNowClub Security Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform livenowclub.com from an unsecured application to a production-ready platform with comprehensive authentication, authorization, encryption, and abuse prevention.

**Architecture:** Three-phase implementation: (1) Immediate fixes to lock down critical endpoints and prevent API abuse, (2) Core security infrastructure including session auth, authorization middleware, and data encryption, (3) Hardening with validation, security headers, advanced rate limiting, and audit logging.

**Tech Stack:** Next.js 16.1.6, TypeScript 5, Redis (Upstash), Web Crypto API, Vercel Edge Runtime

---

## Prerequisites

Before starting, generate required secrets:

```bash
# Generate encryption key (32 bytes for AES-256)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
# Save as DATA_ENCRYPTION_KEY

# Generate admin API key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Save as ADMIN_API_KEY

# Generate unsubscribe secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Save as UNSUBSCRIBE_SECRET
```

Add to `.env.local`:
```
DATA_ENCRYPTION_KEY=<base64-key-from-above>
ADMIN_API_KEY=<hex-key-from-above>
UNSUBSCRIBE_SECRET=<hex-key-from-above>
```

Add to Vercel production environment variables (same values).

---

## PHASE 1: IMMEDIATE FIXES

### Task 1: Lock Down /api/stats Endpoint

**Files:**
- Modify: `src/app/api/stats/route.ts`

**Step 1: Add admin API key check to /api/stats**

Update `src/app/api/stats/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET(request: NextRequest) {
  // Admin API key authentication
  const apiKey = request.headers.get('x-admin-key');

  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get("days") || "7");

  // ... rest of existing implementation
}
```

**Step 2: Test the endpoint protection**

Run:
```bash
# Should fail without key
curl http://localhost:3000/api/stats

# Should succeed with key
curl -H "X-Admin-Key: YOUR_ADMIN_API_KEY" http://localhost:3000/api/stats
```

Expected:
- First request: 401 Unauthorized
- Second request: 200 with stats data

**Step 3: Commit**

```bash
git add src/app/api/stats/route.ts
git commit -m "feat: add admin API key protection to /api/stats

- Require X-Admin-Key header for stats access
- Return 401 for unauthorized requests
- Prevents public data exposure vulnerability"
```

---

### Task 2: Disable /api/debug-identity in Production

**Files:**
- Modify: `src/app/api/debug-identity/route.ts`

**Step 1: Add environment check**

Update `src/app/api/debug-identity/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getUserResult } from "@/lib/utopia";

export async function GET(request: NextRequest) {
  // Disable in production
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    );
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  // ... rest of existing implementation
}
```

**Step 2: Test in development**

Run:
```bash
# Should work in development
curl "http://localhost:3000/api/debug-identity?userId=test-id"
```

Expected: 200 with debug data

**Step 3: Commit**

```bash
git add src/app/api/debug-identity/route.ts
git commit -m "feat: disable debug endpoint in production

- Add NODE_ENV check to return 404 in production
- Prevents information disclosure vulnerability"
```

---

### Task 3: Create Rate Limiting Infrastructure

**Files:**
- Create: `src/lib/ratelimit.ts`

**Step 1: Create rate limiting module**

Create `src/lib/ratelimit.ts`:

```typescript
import { getRedis } from "./redis";

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitError';
  }
}

export interface RateLimitConfig {
  limit: number;
  windowSeconds: number;
}

/**
 * Check rate limit using Redis
 * @param scope - 'ip' or 'user'
 * @param identifier - IP address or user ID
 * @param endpoint - endpoint name for tracking
 * @param limit - max requests allowed
 * @param windowSeconds - time window in seconds
 */
export async function checkRateLimit(
  scope: 'ip' | 'user',
  identifier: string,
  endpoint: string,
  limit: number,
  windowSeconds: number
): Promise<void> {
  const redis = getRedis();
  const window = Math.floor(Date.now() / (windowSeconds * 1000));
  const key = `ratelimit:${scope}:${identifier}:${endpoint}:${window}`;

  const count = await redis.incr(key);

  // Set expiry on first increment
  if (count === 1) {
    await redis.expire(key, windowSeconds);
  }

  if (count > limit) {
    throw new RateLimitError(
      `Rate limit exceeded: ${limit} requests per ${windowSeconds}s`
    );
  }
}

/**
 * Get client IP from request headers
 */
export function getClientIP(request: Request): string {
  // Vercel provides the real IP in x-forwarded-for
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  // Fallback to x-real-ip
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

/**
 * Rate limit configurations for different endpoints
 */
export const RATE_LIMITS = {
  subscribe: { limit: 5, windowSeconds: 3600 }, // 5/hour
  reading: { limit: 10, windowSeconds: 3600 }, // 10/hour
  track: { limit: 100, windowSeconds: 3600 }, // 100/hour
  default: { limit: 100, windowSeconds: 3600 }, // 100/hour
} as const;
```

**Step 2: Commit**

```bash
git add src/lib/ratelimit.ts
git commit -m "feat: add rate limiting infrastructure

- Create checkRateLimit function using Redis
- Add getClientIP helper for IP extraction
- Define rate limit configs for endpoints
- Prevents API abuse and DoS attacks"
```

---

### Task 4: Apply Rate Limiting to /api/subscribe

**Files:**
- Modify: `src/app/api/subscribe/route.ts`

**Step 1: Add rate limiting to subscribe endpoint**

Update `src/app/api/subscribe/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIP, RateLimitError, RATE_LIMITS } from "@/lib/ratelimit";

export async function POST(request: NextRequest) {
  try {
    // Rate limit check
    const clientIP = getClientIP(request);
    await checkRateLimit(
      'ip',
      clientIP,
      'subscribe',
      RATE_LIMITS.subscribe.limit,
      RATE_LIMITS.subscribe.windowSeconds
    );

    const { email } = await request.json();

    // ... rest of existing implementation
  } catch (error) {
    if (error instanceof RateLimitError) {
      return NextResponse.json(
        { error: error.message },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**Step 2: Test rate limiting**

Run:
```bash
# Make 6 requests quickly
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/subscribe \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com"}'
  echo ""
done
```

Expected: First 5 succeed (or return validation error), 6th returns 429

**Step 3: Commit**

```bash
git add src/app/api/subscribe/route.ts
git commit -m "feat: add rate limiting to subscribe endpoint

- Limit to 5 requests/hour per IP
- Return 429 when rate limit exceeded
- Prevents email enumeration and spam"
```

---

### Task 5: Apply Rate Limiting to /api/reading/generate

**Files:**
- Modify: `src/app/api/reading/generate/route.ts`

**Step 1: Add rate limiting to reading generation**

Update `src/app/api/reading/generate/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIP, RateLimitError, RATE_LIMITS } from "@/lib/ratelimit";

export async function POST(request: NextRequest) {
  try {
    // Rate limit check
    const clientIP = getClientIP(request);
    await checkRateLimit(
      'ip',
      clientIP,
      'reading',
      RATE_LIMITS.reading.limit,
      RATE_LIMITS.reading.windowSeconds
    );

    // ... rest of existing implementation
  } catch (error) {
    if (error instanceof RateLimitError) {
      return NextResponse.json(
        { error: error.message },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**Step 2: Test rate limiting**

Run:
```bash
# Make 11 requests quickly
for i in {1..11}; do
  curl -X POST http://localhost:3000/api/reading/generate \
    -H "Content-Type: application/json" \
    -d '{"answers":[0,1,0,1,0,1,0],"members":[]}'
  echo ""
done
```

Expected: First 10 succeed (or return validation error), 11th returns 429

**Step 3: Commit**

```bash
git add src/app/api/reading/generate/route.ts
git commit -m "feat: add rate limiting to reading generation

- Limit to 10 requests/hour per IP
- Prevents Anthropic API cost abuse
- Return 429 when rate limit exceeded"
```

---

### Task 6: Apply Rate Limiting to /api/track

**Files:**
- Modify: `src/app/api/track/route.ts`

**Step 1: Add rate limiting to analytics tracking**

Update `src/app/api/track/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIP, RateLimitError, RATE_LIMITS } from "@/lib/ratelimit";

export async function POST(request: NextRequest) {
  try {
    // Rate limit check
    const clientIP = getClientIP(request);
    await checkRateLimit(
      'ip',
      clientIP,
      'track',
      RATE_LIMITS.track.limit,
      RATE_LIMITS.track.windowSeconds
    );

    // ... rest of existing implementation
  } catch (error) {
    if (error instanceof RateLimitError) {
      return NextResponse.json(
        { error: error.message },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/track/route.ts
git commit -m "feat: add rate limiting to analytics endpoint

- Limit to 100 requests/hour per IP
- Prevents analytics flooding
- Return 429 when rate limit exceeded"
```

---

## PHASE 2: CORE SECURITY

### Task 7: Create Authentication Infrastructure

**Files:**
- Create: `src/lib/auth.ts`

**Step 1: Create authentication module**

Create `src/lib/auth.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "./redis";

export class UnauthorizedError extends Error {
  constructor(message: string = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends Error {
  constructor(message: string = 'Forbidden') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class CSRFError extends Error {
  constructor(message: string = 'CSRF validation failed') {
    super(message);
    this.name = 'CSRFError';
  }
}

export interface Session {
  userId: string;
  csrfToken: string;
  createdAt: number;
  lastActive: number;
}

const SESSION_DURATION = 90 * 24 * 60 * 60; // 90 days in seconds

/**
 * Generate cryptographically secure random token
 */
function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Buffer.from(bytes).toString('hex');
}

/**
 * Create a new session for a user
 * Returns session token and CSRF token
 */
export async function createSession(userId: string): Promise<{ sessionToken: string; csrfToken: string }> {
  const redis = getRedis();
  const sessionToken = generateToken();
  const csrfToken = generateToken();

  const session: Session = {
    userId,
    csrfToken,
    createdAt: Date.now(),
    lastActive: Date.now(),
  };

  await redis.set(
    `session:${sessionToken}`,
    JSON.stringify(session),
    'EX',
    SESSION_DURATION
  );

  return { sessionToken, csrfToken };
}

/**
 * Validate session and return user ID
 * Refreshes session expiry on access
 */
export async function requireAuth(request: NextRequest): Promise<string> {
  const sessionToken = request.cookies.get('session')?.value;

  if (!sessionToken) {
    throw new UnauthorizedError('No session token');
  }

  const redis = getRedis();
  const sessionData = await redis.get(`session:${sessionToken}`);

  if (!sessionData) {
    throw new UnauthorizedError('Invalid or expired session');
  }

  const session: Session = JSON.parse(sessionData);

  // Check expiry (90 days)
  if (Date.now() - session.createdAt > SESSION_DURATION * 1000) {
    await redis.del(`session:${sessionToken}`);
    throw new UnauthorizedError('Session expired');
  }

  // Refresh last active and extend expiry
  session.lastActive = Date.now();
  await redis.set(
    `session:${sessionToken}`,
    JSON.stringify(session),
    'EX',
    SESSION_DURATION
  );

  return session.userId;
}

/**
 * Verify user owns a resource
 */
export async function requireOwnership(userId: string, resourceUserId: string): Promise<void> {
  if (userId !== resourceUserId) {
    throw new ForbiddenError('Access denied: not resource owner');
  }
}

/**
 * Validate CSRF token
 */
export async function validateCSRF(request: NextRequest, sessionToken: string): Promise<void> {
  const tokenFromHeader = request.headers.get('x-csrf-token');
  const tokenFromCookie = request.cookies.get('csrf-token')?.value;

  if (!tokenFromHeader || !tokenFromCookie) {
    throw new CSRFError('CSRF token missing');
  }

  if (tokenFromHeader !== tokenFromCookie) {
    throw new CSRFError('CSRF token mismatch');
  }

  const redis = getRedis();
  const sessionData = await redis.get(`session:${sessionToken}`);

  if (!sessionData) {
    throw new CSRFError('Invalid session');
  }

  const session: Session = JSON.parse(sessionData);

  if (session.csrfToken !== tokenFromHeader) {
    throw new CSRFError('Invalid CSRF token');
  }
}

/**
 * Delete a session (logout)
 */
export async function deleteSession(sessionToken: string): Promise<void> {
  const redis = getRedis();
  await redis.del(`session:${sessionToken}`);
}
```

**Step 2: Commit**

```bash
git add src/lib/auth.ts
git commit -m "feat: add session authentication infrastructure

- Create session management with Redis storage
- Add requireAuth middleware for protected routes
- Add requireOwnership for resource access control
- Add CSRF validation
- Generate cryptographically secure tokens
- 90-day session duration with auto-refresh"
```

---

### Task 8: Update save-result to Create Sessions

**Files:**
- Modify: `src/app/api/utopia/save-result/route.ts`

**Step 1: Create session when saving quiz results**

Update `src/app/api/utopia/save-result/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { saveUserResult } from "@/lib/utopia";
import { createSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const result = await request.json();

    if (!result || !result.id || !result.identity) {
      return NextResponse.json(
        { error: "Invalid result data" },
        { status: 400 }
      );
    }

    // Save the quiz result
    await saveUserResult(result.id, result);

    // Create session for the user
    const { sessionToken, csrfToken } = await createSession(result.id);

    // Create response with session cookies
    const response = NextResponse.json({ success: true });

    // Set session cookie (HTTP-only, Secure, SameSite)
    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 90 * 24 * 60 * 60, // 90 days
      path: '/',
    });

    // Set CSRF token cookie (readable by JS, not HTTP-only)
    response.cookies.set('csrf-token', csrfToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 90 * 24 * 60 * 60, // 90 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error("Error saving result:", error);
    return NextResponse.json(
      { error: "Failed to save result" },
      { status: 500 }
    );
  }
}
```

**Step 2: Test session creation**

Run:
```bash
curl -X POST http://localhost:3000/api/utopia/save-result \
  -H "Content-Type: application/json" \
  -d '{"id":"test-user-123","identity":"archetype-1","answers":[0,1,0,1,0,1,0]}' \
  -v
```

Expected: Response includes Set-Cookie headers for 'session' and 'csrf-token'

**Step 3: Commit**

```bash
git add src/app/api/utopia/save-result/route.ts
git commit -m "feat: create session on quiz completion

- Generate session and CSRF tokens
- Set secure HTTP-only cookie for session
- Set readable cookie for CSRF token
- 90-day expiry with SameSite=lax protection"
```

---

### Task 9: Protect update-email Endpoint

**Files:**
- Modify: `src/app/api/utopia/update-email/route.ts`

**Step 1: Add authentication and ownership checks**

Update `src/app/api/utopia/update-email/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { updateUserEmail } from "@/lib/utopia";
import { requireAuth, requireOwnership, UnauthorizedError, ForbiddenError } from "@/lib/auth";
import { checkRateLimit } from "@/lib/ratelimit";

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const sessionUserId = await requireAuth(request);

    // Per-user rate limiting (3 email changes per day)
    await checkRateLimit('user', sessionUserId, 'update-email', 3, 86400);

    const { userId, email } = await request.json();

    if (!userId || !email) {
      return NextResponse.json(
        { error: "userId and email required" },
        { status: 400 }
      );
    }

    // Verify ownership
    await requireOwnership(sessionUserId, userId);

    // Update email
    await updateUserEmail(userId, email);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    console.error("Error updating email:", error);
    return NextResponse.json(
      { error: "Failed to update email" },
      { status: 500 }
    );
  }
}
```

**Step 2: Test authentication**

Run:
```bash
# Should fail without session cookie
curl -X POST http://localhost:3000/api/utopia/update-email \
  -H "Content-Type: application/json" \
  -d '{"userId":"test-123","email":"new@example.com"}'

# Should fail if userId doesn't match session
curl -X POST http://localhost:3000/api/utopia/update-email \
  -H "Content-Type: application/json" \
  -H "Cookie: session=valid-session-token" \
  -d '{"userId":"different-user","email":"new@example.com"}'
```

Expected:
- First request: 401 Unauthorized
- Second request: 403 Forbidden

**Step 3: Commit**

```bash
git add src/app/api/utopia/update-email/route.ts
git commit -m "feat: protect update-email with auth and ownership

- Require valid session
- Verify user owns the account being modified
- Add per-user rate limiting (3/day)
- Return 401/403 for unauthorized access"
```

---

### Task 10: Protect update-name Endpoint

**Files:**
- Modify: `src/app/api/utopia/update-name/route.ts`

**Step 1: Add authentication and ownership checks**

Update `src/app/api/utopia/update-name/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { updateUserName } from "@/lib/utopia";
import { requireAuth, requireOwnership, UnauthorizedError, ForbiddenError } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const sessionUserId = await requireAuth(request);

    const { userId, name } = await request.json();

    if (!userId || !name) {
      return NextResponse.json(
        { error: "userId and name required" },
        { status: 400 }
      );
    }

    // Verify ownership
    await requireOwnership(sessionUserId, userId);

    // Update name
    await updateUserName(userId, name);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    console.error("Error updating name:", error);
    return NextResponse.json(
      { error: "Failed to update name" },
      { status: 500 }
    );
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/utopia/update-name/route.ts
git commit -m "feat: protect update-name with auth and ownership

- Require valid session
- Verify user owns the account being modified
- Return 401/403 for unauthorized access"
```

---

### Task 11: Protect utopia/create Endpoint

**Files:**
- Modify: `src/app/api/utopia/create/route.ts`

**Step 1: Add authentication and rate limiting**

Update `src/app/api/utopia/create/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createUtopia } from "@/lib/utopia";
import { requireAuth, UnauthorizedError } from "@/lib/auth";
import { checkRateLimit, RateLimitError } from "@/lib/ratelimit";

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const sessionUserId = await requireAuth(request);

    // Per-user rate limiting (5 utopias per day)
    await checkRateLimit('user', sessionUserId, 'create-utopia', 5, 86400);

    const { userId, slug } = await request.json();

    if (!userId || !slug) {
      return NextResponse.json(
        { error: "userId and slug required" },
        { status: 400 }
      );
    }

    // Verify userId matches session
    if (sessionUserId !== userId) {
      throw new UnauthorizedError('Cannot create utopia for different user');
    }

    // Create utopia
    const result = await createUtopia(userId, slug);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    if (error instanceof RateLimitError) {
      return NextResponse.json({ error: error.message }, { status: 429 });
    }

    console.error("Error creating utopia:", error);
    return NextResponse.json(
      { error: "Failed to create utopia" },
      { status: 500 }
    );
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/utopia/create/route.ts
git commit -m "feat: protect utopia creation with auth

- Require valid session
- Verify userId matches authenticated user
- Add rate limiting (5/day per user)
- Prevent utopia creation spoofing"
```

---

### Task 12: Protect utopia/join Endpoint

**Files:**
- Modify: `src/app/api/utopia/join/route.ts`

**Step 1: Add authentication**

Update `src/app/api/utopia/join/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { joinUtopia } from "@/lib/utopia";
import { requireAuth, UnauthorizedError } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const sessionUserId = await requireAuth(request);

    const { userId, slug } = await request.json();

    if (!userId || !slug) {
      return NextResponse.json(
        { error: "userId and slug required" },
        { status: 400 }
      );
    }

    // Verify userId matches session
    if (sessionUserId !== userId) {
      throw new UnauthorizedError('Cannot join utopia as different user');
    }

    // Join utopia
    const result = await joinUtopia(userId, slug);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    console.error("Error joining utopia:", error);
    return NextResponse.json(
      { error: "Failed to join utopia" },
      { status: 500 }
    );
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/utopia/join/route.ts
git commit -m "feat: protect utopia join with auth

- Require valid session
- Verify userId matches authenticated user
- Prevent joining as different user"
```

---

### Task 13: Protect utopia/leave Endpoint

**Files:**
- Modify: `src/app/api/utopia/leave/route.ts`

**Step 1: Add authentication**

Update `src/app/api/utopia/leave/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { leaveUtopia } from "@/lib/utopia";
import { requireAuth, UnauthorizedError } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const sessionUserId = await requireAuth(request);

    const { userId, slug } = await request.json();

    if (!userId || !slug) {
      return NextResponse.json(
        { error: "userId and slug required" },
        { status: 400 }
      );
    }

    // Verify userId matches session
    if (sessionUserId !== userId) {
      throw new UnauthorizedError('Cannot leave utopia as different user');
    }

    // Leave utopia
    await leaveUtopia(userId, slug);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    console.error("Error leaving utopia:", error);
    return NextResponse.json(
      { error: "Failed to leave utopia" },
      { status: 500 }
    );
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/utopia/leave/route.ts
git commit -m "feat: protect utopia leave with auth

- Require valid session
- Verify userId matches authenticated user
- Prevent evicting other users"
```

---

### Task 14: Protect connections/create Endpoint

**Files:**
- Modify: `src/app/api/connections/create/route.ts`

**Step 1: Add authentication and rate limiting**

Update `src/app/api/connections/create/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createConnection } from "@/lib/connections";
import { requireAuth, UnauthorizedError } from "@/lib/auth";
import { checkRateLimit, RateLimitError } from "@/lib/ratelimit";

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const sessionUserId = await requireAuth(request);

    // Per-user rate limiting (20 connections per hour)
    await checkRateLimit('user', sessionUserId, 'create-connection', 20, 3600);

    const { userId, targetUserId } = await request.json();

    if (!userId || !targetUserId) {
      return NextResponse.json(
        { error: "userId and targetUserId required" },
        { status: 400 }
      );
    }

    // Verify userId matches session
    if (sessionUserId !== userId) {
      throw new UnauthorizedError('Cannot create connection for different user');
    }

    // Create connection
    const result = await createConnection(userId, targetUserId);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    if (error instanceof RateLimitError) {
      return NextResponse.json({ error: error.message }, { status: 429 });
    }

    console.error("Error creating connection:", error);
    return NextResponse.json(
      { error: "Failed to create connection" },
      { status: 500 }
    );
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/connections/create/route.ts
git commit -m "feat: protect connections with auth

- Require valid session
- Verify userId matches authenticated user
- Add rate limiting (20/hour per user)
- Prevent connection spoofing"
```

---

### Task 15: Protect utopia/user/[userId] Endpoint

**Files:**
- Modify: `src/app/api/utopia/user/[userId]/route.ts`

**Step 1: Add authentication and ownership check**

Update `src/app/api/utopia/user/[userId]/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getUserResult, getUserUtopias } from "@/lib/utopia";
import { requireAuth, requireOwnership, UnauthorizedError, ForbiddenError } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    // Authenticate user
    const sessionUserId = await requireAuth(request);

    const { userId } = await params;

    // Verify user owns this data
    await requireOwnership(sessionUserId, userId);

    // Fetch user data
    const [user, utopias] = await Promise.all([
      getUserResult(userId),
      getUserUtopias(userId),
    ]);

    return NextResponse.json({
      user,
      utopias,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    if (error instanceof ForbiddenError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/utopia/user/[userId]/route.ts
git commit -m "feat: protect user data access with auth

- Require valid session
- Verify user owns the data being accessed
- Prevent unauthorized user data exposure
- Return 401/403 for unauthorized access"
```

---

### Task 16: Create Data Encryption Module

**Files:**
- Create: `src/lib/crypto.ts`

**Step 1: Create encryption utilities**

Create `src/lib/crypto.ts`:

```typescript
/**
 * Data encryption utilities using Web Crypto API (AES-256-GCM)
 */

// Get encryption key from environment (32 bytes base64-encoded)
function getEncryptionKey(): Uint8Array {
  const keyBase64 = process.env.DATA_ENCRYPTION_KEY;
  if (!keyBase64) {
    throw new Error('DATA_ENCRYPTION_KEY not configured');
  }
  return Uint8Array.from(Buffer.from(keyBase64, 'base64'));
}

/**
 * Encrypt plaintext using AES-256-GCM
 * Returns base64-encoded string: iv (12 bytes) + ciphertext
 */
export async function encrypt(plaintext: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);

  // Generate random IV (12 bytes for GCM)
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Import key
  const key = await crypto.subtle.importKey(
    'raw',
    getEncryptionKey(),
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  );

  // Encrypt
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );

  // Combine IV + ciphertext
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encrypted), iv.length);

  // Return base64
  return Buffer.from(combined).toString('base64');
}

/**
 * Decrypt ciphertext using AES-256-GCM
 * Input is base64-encoded string: iv (12 bytes) + ciphertext
 */
export async function decrypt(ciphertext: string): Promise<string> {
  const combined = Uint8Array.from(Buffer.from(ciphertext, 'base64'));

  // Extract IV and encrypted data
  const iv = combined.slice(0, 12);
  const encrypted = combined.slice(12);

  // Import key
  const key = await crypto.subtle.importKey(
    'raw',
    getEncryptionKey(),
    { name: 'AES-GCM' },
    false,
    ['decrypt']
  );

  // Decrypt
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    encrypted
  );

  // Return plaintext
  return new TextDecoder().decode(decrypted);
}

/**
 * Check if a value appears to be encrypted
 * Encrypted values are base64 with length > 16 (at least IV)
 */
export function isEncrypted(value: string): boolean {
  if (!value || value.length < 16) return false;

  try {
    const decoded = Buffer.from(value, 'base64');
    return decoded.length > 12; // Must have at least IV
  } catch {
    return false;
  }
}
```

**Step 2: Commit**

```bash
git add src/lib/crypto.ts
git commit -m "feat: add AES-256-GCM encryption utilities

- Implement encrypt/decrypt using Web Crypto API
- Use 12-byte IV for GCM mode
- Support base64 encoding for storage
- Add isEncrypted helper for migration
- Use DATA_ENCRYPTION_KEY from environment"
```

---

### Task 17: Add Encryption to User Data Storage

**Files:**
- Modify: `src/lib/utopia.ts`

**Step 1: Update saveUserResult to encrypt sensitive data**

In `src/lib/utopia.ts`, find the `saveUserResult` function and update it:

```typescript
import { encrypt, decrypt, isEncrypted } from "./crypto";

export async function saveUserResult(userId: string, result: any) {
  const redis = getRedis();

  // Encrypt sensitive fields
  const encryptedResult = {
    ...result,
    email: result.email ? await encrypt(result.email) : null,
    answers: await encrypt(JSON.stringify(result.answers)),
  };

  await redis.set(
    `user:${userId}`,
    JSON.stringify(encryptedResult),
    'EX',
    90 * 24 * 60 * 60 // 90 days
  );
}
```

**Step 2: Update getUserResult to decrypt data**

In `src/lib/utopia.ts`, find the `getUserResult` function and update it:

```typescript
export async function getUserResult(userId: string) {
  const redis = getRedis();
  const raw = await redis.get(`user:${userId}`);

  if (!raw) return null;

  const data = JSON.parse(raw);

  // Check if data needs migration (lazy migration)
  const needsMigration = data.email && !isEncrypted(data.email);

  if (needsMigration) {
    // Encrypt and re-save
    const encrypted = {
      ...data,
      email: data.email ? await encrypt(data.email) : null,
      answers: await encrypt(JSON.stringify(data.answers)),
    };

    await redis.set(
      `user:${userId}`,
      JSON.stringify(encrypted),
      'EX',
      90 * 24 * 60 * 60
    );

    // Return decrypted (original data was plaintext)
    return data;
  }

  // Data is encrypted, decrypt it
  return {
    ...data,
    email: data.email ? await decrypt(data.email) : null,
    answers: JSON.parse(await decrypt(data.answers)),
  };
}
```

**Step 3: Commit**

```bash
git add src/lib/utopia.ts
git commit -m "feat: encrypt user emails and quiz answers

- Encrypt email addresses before Redis storage
- Encrypt quiz answers array
- Implement lazy migration for existing plaintext data
- Decrypt on read for application use
- Maintains 90-day TTL"
```

---

### Task 18: Add CSRF Protection to State-Changing Endpoints

**Files:**
- Modify: `src/app/api/utopia/update-email/route.ts`
- Modify: `src/app/api/utopia/update-name/route.ts`
- Modify: `src/app/api/utopia/create/route.ts`
- Modify: `src/app/api/utopia/join/route.ts`
- Modify: `src/app/api/utopia/leave/route.ts`
- Modify: `src/app/api/connections/create/route.ts`

**Step 1: Add CSRF validation to update-email**

Update `src/app/api/utopia/update-email/route.ts`:

```typescript
import { requireAuth, requireOwnership, validateCSRF, UnauthorizedError, ForbiddenError, CSRFError } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const sessionUserId = await requireAuth(request);
    const sessionToken = request.cookies.get('session')?.value!;

    // Validate CSRF token
    await validateCSRF(request, sessionToken);

    // ... rest of implementation
  } catch (error) {
    if (error instanceof CSRFError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    // ... rest of error handling
  }
}
```

**Step 2: Add CSRF validation to other endpoints**

Apply the same pattern to:
- `src/app/api/utopia/update-name/route.ts`
- `src/app/api/utopia/create/route.ts`
- `src/app/api/utopia/join/route.ts`
- `src/app/api/utopia/leave/route.ts`
- `src/app/api/connections/create/route.ts`

**Step 3: Commit**

```bash
git add src/app/api/utopia/*.ts src/app/api/connections/*.ts
git commit -m "feat: add CSRF protection to state-changing endpoints

- Validate CSRF token on all POST requests
- Require X-CSRF-Token header
- Return 403 for CSRF validation failures
- Protects against cross-site request forgery"
```

---

## PHASE 3: HARDENING

### Task 19: Create Input Validation Module

**Files:**
- Create: `src/lib/validation.ts`

**Step 1: Create validation utilities**

Create `src/lib/validation.ts`:

```typescript
/**
 * Input validation and sanitization utilities
 */

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Email validation (RFC 5322 compliant)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function validateEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  return EMAIL_REGEX.test(email);
}

// User name sanitization
export function sanitizeName(name: string): string {
  return name
    .trim()
    .slice(0, 50)
    .replace(/[<>]/g, '') // Remove HTML brackets
    .replace(/[^\w\s'-]/g, ''); // Only alphanumeric, spaces, hyphens, apostrophes
}

// Utopia slug validation
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateSlug(slug: string): boolean {
  return slug.length >= 3 &&
         slug.length <= 30 &&
         SLUG_REGEX.test(slug);
}

// User ID validation (UUID v4)
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function validateUserId(userId: string): boolean {
  return UUID_REGEX.test(userId);
}

// Quiz answer validation
export function validateQuizAnswers(answers: unknown): answers is number[] {
  if (!Array.isArray(answers) || answers.length !== 7) return false;

  // Question options per question (from quiz structure)
  const maxOptions = [3, 3, 3, 3, 3, 3, 3]; // Adjust based on actual quiz

  return answers.every((answer, idx) => {
    return Number.isInteger(answer) &&
           answer >= 0 &&
           answer <= maxOptions[idx];
  });
}

// Generic request body parser with validation
export async function parseValidatedBody<T>(
  request: Request,
  validator: (data: unknown) => data is T
): Promise<T> {
  try {
    const body = await request.json();
    if (!validator(body)) {
      throw new ValidationError('Invalid request body');
    }
    return body;
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    throw new ValidationError('Malformed JSON or invalid data');
  }
}
```

**Step 2: Commit**

```bash
git add src/lib/validation.ts
git commit -m "feat: add input validation utilities

- Email validation (RFC 5322 compliant)
- Name sanitization (remove HTML, special chars)
- Slug validation (alphanumeric + hyphens)
- UUID v4 validation for user IDs
- Quiz answer validation
- Generic body parser with type guards"
```

---

### Task 20: Apply Validation to subscribe Endpoint

**Files:**
- Modify: `src/app/api/subscribe/route.ts`

**Step 1: Add email validation**

Update `src/app/api/subscribe/route.ts`:

```typescript
import { validateEmail, ValidationError } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    // ... rate limiting code ...

    const { email } = await request.json();

    // Validate email
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // ... rest of implementation
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    // ... rest of error handling
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/subscribe/route.ts
git commit -m "feat: add email validation to subscribe

- Validate email format before processing
- Return 400 for invalid emails
- Prevents malformed data in database"
```

---

### Task 21: Apply Validation to update-name Endpoint

**Files:**
- Modify: `src/app/api/utopia/update-name/route.ts`

**Step 1: Add name sanitization**

Update `src/app/api/utopia/update-name/route.ts`:

```typescript
import { sanitizeName } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    // ... auth code ...

    const { userId, name } = await request.json();

    if (!userId || !name) {
      return NextResponse.json(
        { error: "userId and name required" },
        { status: 400 }
      );
    }

    // Sanitize name
    const sanitizedName = sanitizeName(name);

    if (!sanitizedName || sanitizedName.length === 0) {
      return NextResponse.json(
        { error: "Invalid name" },
        { status: 400 }
      );
    }

    await requireOwnership(sessionUserId, userId);
    await updateUserName(userId, sanitizedName);

    return NextResponse.json({ success: true });
  } catch (error) {
    // ... error handling
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/utopia/update-name/route.ts
git commit -m "feat: add name sanitization to update-name

- Remove HTML and special characters
- Enforce max 50 character limit
- Trim whitespace
- Return 400 for empty names after sanitization"
```

---

### Task 22: Apply Validation to save-result Endpoint

**Files:**
- Modify: `src/app/api/utopia/save-result/route.ts`

**Step 1: Add quiz answer validation**

Update `src/app/api/utopia/save-result/route.ts`:

```typescript
import { validateQuizAnswers, validateUserId, ValidationError } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const result = await request.json();

    if (!result || !result.id || !result.identity) {
      return NextResponse.json(
        { error: "Invalid result data" },
        { status: 400 }
      );
    }

    // Validate user ID format
    if (!validateUserId(result.id)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    // Validate quiz answers
    if (!validateQuizAnswers(result.answers)) {
      return NextResponse.json(
        { error: "Invalid quiz answers" },
        { status: 400 }
      );
    }

    // ... rest of implementation
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    // ... error handling
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/utopia/save-result/route.ts
git commit -m "feat: add validation to save-result

- Validate user ID is UUID v4 format
- Validate quiz answers (7 answers, valid ranges)
- Return 400 for malformed data
- Prevents invalid data in database"
```

---

### Task 23: Apply Validation to utopia/create Endpoint

**Files:**
- Modify: `src/app/api/utopia/create/route.ts`

**Step 1: Add slug validation**

Update `src/app/api/utopia/create/route.ts`:

```typescript
import { validateSlug, validateUserId, ValidationError } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    // ... auth and rate limiting ...

    const { userId, slug } = await request.json();

    if (!userId || !slug) {
      return NextResponse.json(
        { error: "userId and slug required" },
        { status: 400 }
      );
    }

    // Validate user ID
    if (!validateUserId(userId)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    // Validate slug
    if (!validateSlug(slug)) {
      return NextResponse.json(
        { error: "Invalid slug format (3-30 chars, lowercase alphanumeric + hyphens)" },
        { status: 400 }
      );
    }

    // ... rest of implementation
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    // ... error handling
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/utopia/create/route.ts
git commit -m "feat: add validation to utopia creation

- Validate slug format (alphanumeric + hyphens)
- Validate user ID is UUID v4
- Enforce 3-30 character slug length
- Return 400 for invalid input"
```

---

### Task 24: Configure Security Headers

**Files:**
- Modify: `next.config.ts`

**Step 1: Add security headers configuration**

Update `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.anthropic.com https://api.resend.com",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
      {
        source: '/wonder/essay/(.*).html',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },

  // ... existing config (rewrites, redirects, etc.)
};

export default nextConfig;
```

**Step 2: Test headers**

Run:
```bash
pnpm run dev
curl -I http://localhost:3000
```

Expected: Response includes all security headers

**Step 3: Commit**

```bash
git add next.config.ts
git commit -m "feat: add comprehensive security headers

- X-Frame-Options: DENY (prevent clickjacking)
- X-Content-Type-Options: nosniff
- Strict-Transport-Security (HSTS)
- Content-Security-Policy with API allowlist
- Referrer-Policy
- Permissions-Policy (disable camera, mic, geo)"
```

---

### Task 25: Create Security Audit Logging

**Files:**
- Create: `src/lib/logging.ts`

**Step 1: Create logging infrastructure**

Create `src/lib/logging.ts`:

```typescript
import { getRedis } from "./redis";

export type SecurityEvent =
  | 'auth.session_created'
  | 'auth.session_expired'
  | 'auth.unauthorized_access'
  | 'ratelimit.exceeded'
  | 'csrf.validation_failed'
  | 'data.email_updated'
  | 'data.suspicious_access'
  | 'admin.stats_accessed';

export interface SecurityLogEntry {
  event: SecurityEvent;
  timestamp: number;
  userId?: string;
  ip?: string;
  endpoint?: string;
  [key: string]: any;
}

/**
 * Log a security event to Redis
 * Events are stored in daily sorted sets with 90-day TTL
 */
export async function logSecurityEvent(
  event: SecurityEvent,
  metadata: Record<string, any> = {}
): Promise<void> {
  const redis = getRedis();

  const logEntry: SecurityLogEntry = {
    event,
    timestamp: Date.now(),
    ...metadata,
  };

  const date = new Date().toISOString().split('T')[0];
  const key = `security:events:${date}`;

  await redis.zadd(key, Date.now(), JSON.stringify(logEntry));

  // Auto-expire after 90 days
  await redis.expire(key, 90 * 24 * 60 * 60);
}

/**
 * Query security events for a date range
 */
export async function getSecurityEvents(days: number = 7): Promise<SecurityLogEntry[]> {
  const redis = getRedis();
  const events: SecurityLogEntry[] = [];
  const now = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const key = `security:events:${date}`;
    const dayEvents = await redis.zrange(key, 0, -1);

    events.push(...dayEvents.map(e => JSON.parse(e)));
  }

  return events.sort((a, b) => b.timestamp - a.timestamp);
}

/**
 * Get event count by type for a date range
 */
export async function getEventCounts(days: number = 7): Promise<Record<string, number>> {
  const events = await getSecurityEvents(days);
  const counts: Record<string, number> = {};

  for (const event of events) {
    counts[event.event] = (counts[event.event] || 0) + 1;
  }

  return counts;
}
```

**Step 2: Commit**

```bash
git add src/lib/logging.ts
git commit -m "feat: add security audit logging

- Log security events to Redis sorted sets
- Store events by date with 90-day TTL
- Support querying events by date range
- Track event counts by type
- Include metadata (userId, IP, endpoint)"
```

---

### Task 26: Add Logging to Authentication Events

**Files:**
- Modify: `src/lib/auth.ts`

**Step 1: Add logging to session lifecycle**

Update `src/lib/auth.ts`:

```typescript
import { logSecurityEvent } from "./logging";

export async function createSession(userId: string): Promise<{ sessionToken: string; csrfToken: string }> {
  // ... existing code ...

  await logSecurityEvent('auth.session_created', { userId });

  return { sessionToken, csrfToken };
}

export async function requireAuth(request: NextRequest): Promise<string> {
  const sessionToken = request.cookies.get('session')?.value;

  if (!sessionToken) {
    await logSecurityEvent('auth.unauthorized_access', {
      endpoint: request.nextUrl.pathname,
      ip: request.headers.get('x-forwarded-for') || 'unknown',
    });
    throw new UnauthorizedError('No session token');
  }

  const redis = getRedis();
  const sessionData = await redis.get(`session:${sessionToken}`);

  if (!sessionData) {
    await logSecurityEvent('auth.unauthorized_access', {
      endpoint: request.nextUrl.pathname,
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      reason: 'invalid_session',
    });
    throw new UnauthorizedError('Invalid or expired session');
  }

  const session: Session = JSON.parse(sessionData);

  if (Date.now() - session.createdAt > SESSION_DURATION * 1000) {
    await redis.del(`session:${sessionToken}`);
    await logSecurityEvent('auth.session_expired', { userId: session.userId });
    throw new UnauthorizedError('Session expired');
  }

  // ... rest of existing code ...
}

export async function validateCSRF(request: NextRequest, sessionToken: string): Promise<void> {
  // ... existing validation ...

  // If validation fails, log before throwing
  if (!tokenFromHeader || !tokenFromCookie || tokenFromHeader !== tokenFromCookie) {
    await logSecurityEvent('csrf.validation_failed', {
      endpoint: request.nextUrl.pathname,
      ip: request.headers.get('x-forwarded-for') || 'unknown',
    });
    throw new CSRFError('CSRF token mismatch');
  }

  // ... rest of existing code ...
}
```

**Step 2: Commit**

```bash
git add src/lib/auth.ts
git commit -m "feat: add logging to auth events

- Log session creation with userId
- Log unauthorized access attempts
- Log session expiration events
- Log CSRF validation failures
- Include endpoint and IP in logs"
```

---

### Task 27: Add Logging to Rate Limiting

**Files:**
- Modify: `src/lib/ratelimit.ts`

**Step 1: Add logging when rate limits exceeded**

Update `src/lib/ratelimit.ts`:

```typescript
import { logSecurityEvent } from "./logging";

export async function checkRateLimit(
  scope: 'ip' | 'user',
  identifier: string,
  endpoint: string,
  limit: number,
  windowSeconds: number
): Promise<void> {
  // ... existing code ...

  if (count > limit) {
    await logSecurityEvent('ratelimit.exceeded', {
      scope,
      identifier,
      endpoint,
      limit,
      count,
    });

    throw new RateLimitError(
      `Rate limit exceeded: ${limit} requests per ${windowSeconds}s`
    );
  }
}
```

**Step 2: Commit**

```bash
git add src/lib/ratelimit.ts
git commit -m "feat: add logging to rate limit events

- Log when rate limits are exceeded
- Include scope, identifier, endpoint
- Track limit and actual count
- Helps identify abuse patterns"
```

---

### Task 28: Add Logging to Data Modifications

**Files:**
- Modify: `src/app/api/utopia/update-email/route.ts`

**Step 1: Log email updates**

Update `src/app/api/utopia/update-email/route.ts`:

```typescript
import { logSecurityEvent } from "@/lib/logging";

export async function POST(request: NextRequest) {
  try {
    // ... auth and validation ...

    await updateUserEmail(userId, email);

    // Log email change
    await logSecurityEvent('data.email_updated', {
      userId,
      ip: request.headers.get('x-forwarded-for') || 'unknown',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // ... error handling
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/utopia/update-email/route.ts
git commit -m "feat: add logging to email updates

- Log when user email is changed
- Include userId and IP address
- Helps detect account takeover attempts"
```

---

### Task 29: Add Logging to Stats Access

**Files:**
- Modify: `src/app/api/stats/route.ts`

**Step 1: Log admin stats access**

Update `src/app/api/stats/route.ts`:

```typescript
import { logSecurityEvent } from "@/lib/logging";

export async function GET(request: NextRequest) {
  const apiKey = request.headers.get('x-admin-key');

  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Log admin access
  await logSecurityEvent('admin.stats_accessed', {
    ip: request.headers.get('x-forwarded-for') || 'unknown',
  });

  // ... rest of implementation
}
```

**Step 2: Commit**

```bash
git add src/app/api/stats/route.ts
git commit -m "feat: add logging to stats access

- Log all admin stats endpoint access
- Include IP address
- Helps audit admin activity"
```

---

### Task 30: Create Security Monitoring Endpoint

**Files:**
- Create: `src/app/api/security/logs/route.ts`

**Step 1: Create admin endpoint for viewing logs**

Create `src/app/api/security/logs/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getSecurityEvents, getEventCounts } from "@/lib/logging";

export async function GET(request: NextRequest) {
  // Admin API key authentication
  const apiKey = request.headers.get('x-admin-key');

  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get("days") || "7");

  const [events, counts] = await Promise.all([
    getSecurityEvents(days),
    getEventCounts(days),
  ]);

  return NextResponse.json({
    events,
    counts,
    period: {
      days,
      from: new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString(),
      to: new Date().toISOString(),
    },
  });
}
```

**Step 2: Test the endpoint**

Run:
```bash
curl -H "X-Admin-Key: YOUR_ADMIN_API_KEY" \
  "http://localhost:3000/api/security/logs?days=7"
```

Expected: JSON with events, counts, and period info

**Step 3: Commit**

```bash
git add src/app/api/security/logs/route.ts
git commit -m "feat: add security logs endpoint

- Admin-only endpoint for viewing security events
- Return events and counts for specified days
- Require X-Admin-Key header
- Support configurable date range"
```

---

### Task 31: Fix Unsubscribe Security (GET to POST)

**Files:**
- Create: `src/lib/unsubscribe.ts`
- Modify: `src/app/api/unsubscribe/route.ts`

**Step 1: Create unsubscribe token utilities**

Create `src/lib/unsubscribe.ts`:

```typescript
import { createHmac } from 'crypto';

interface UnsubscribePayload {
  email: string;
  timestamp: number;
}

const TOKEN_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days

/**
 * Generate signed unsubscribe token
 */
export function generateUnsubscribeToken(email: string): string {
  const payload: UnsubscribePayload = {
    email,
    timestamp: Date.now(),
  };

  const payloadStr = JSON.stringify(payload);
  const signature = createHmac('sha256', process.env.UNSUBSCRIBE_SECRET!)
    .update(payloadStr)
    .digest('hex');

  const combined = JSON.stringify({ payload: payloadStr, signature });
  return Buffer.from(combined).toString('base64url');
}

/**
 * Verify and decode unsubscribe token
 * Returns email if valid, throws if invalid/expired
 */
export function verifyUnsubscribeToken(token: string): string {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64url').toString());
    const { payload: payloadStr, signature } = decoded;

    // Verify signature
    const expectedSignature = createHmac('sha256', process.env.UNSUBSCRIBE_SECRET!)
      .update(payloadStr)
      .digest('hex');

    if (signature !== expectedSignature) {
      throw new Error('Invalid signature');
    }

    const payload: UnsubscribePayload = JSON.parse(payloadStr);

    // Check expiry
    if (Date.now() - payload.timestamp > TOKEN_EXPIRY) {
      throw new Error('Token expired');
    }

    return payload.email;
  } catch (error) {
    throw new Error('Invalid unsubscribe token');
  }
}
```

**Step 2: Update unsubscribe endpoint to use POST**

Update `src/app/api/unsubscribe/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { verifyUnsubscribeToken } from "@/lib/unsubscribe";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: "Token required" },
        { status: 400 }
      );
    }

    // Verify token and extract email
    const email = verifyUnsubscribeToken(token);

    // Add to unsubscribe list
    const redis = getRedis();
    await redis.sadd('unsubscribed', email);

    return NextResponse.json({ success: true, email });
  } catch (error) {
    console.error("Error unsubscribing:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );
  }
}
```

**Step 3: Update email sending to use new token format**

In `src/lib/email.ts` (or wherever unsubscribe links are generated), update to use new function:

```typescript
import { generateUnsubscribeToken } from "./unsubscribe";

// When sending email:
const unsubscribeToken = generateUnsubscribeToken(email);
const unsubscribeUrl = `https://livenowclub.com/unsubscribe?token=${unsubscribeToken}`;
```

**Step 4: Commit**

```bash
git add src/lib/unsubscribe.ts src/app/api/unsubscribe/route.ts src/lib/email.ts
git commit -m "feat: secure unsubscribe with signed tokens

- Generate HMAC-signed tokens for unsubscribe
- Change from GET to POST method
- Add 30-day token expiry
- Verify signature before processing
- Prevents unauthorized unsubscribe attacks"
```

---

### Task 32: Add Environment Variable Validation

**Files:**
- Create: `src/lib/env.ts`

**Step 1: Create environment validation**

Create `src/lib/env.ts`:

```typescript
/**
 * Validate required environment variables on startup
 */

const REQUIRED_ENV_VARS = [
  'REDIS_URL',
  'ANTHROPIC_API_KEY',
  'RESEND_API_KEY',
  'DATA_ENCRYPTION_KEY',
  'ADMIN_API_KEY',
  'UNSUBSCRIBE_SECRET',
] as const;

export function validateEnvironment(): void {
  const missing: string[] = [];

  for (const varName of REQUIRED_ENV_VARS) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please add them to .env.local or Vercel environment variables.'
    );
  }

  // Validate encryption key is base64 and 32 bytes
  const encKey = process.env.DATA_ENCRYPTION_KEY;
  if (encKey) {
    try {
      const decoded = Buffer.from(encKey, 'base64');
      if (decoded.length !== 32) {
        throw new Error(`DATA_ENCRYPTION_KEY must be 32 bytes (got ${decoded.length})`);
      }
    } catch (error) {
      throw new Error('DATA_ENCRYPTION_KEY must be valid base64-encoded 32-byte key');
    }
  }
}

// Run validation on module load
if (process.env.NODE_ENV !== 'test') {
  validateEnvironment();
}
```

**Step 2: Import in main app file**

In `src/app/layout.tsx` or similar root file, add:

```typescript
import '@/lib/env'; // Validates environment on startup
```

**Step 3: Commit**

```bash
git add src/lib/env.ts src/app/layout.tsx
git commit -m "feat: add environment variable validation

- Validate all required env vars on startup
- Check encryption key is valid base64 32-byte key
- Fail fast with clear error messages
- Prevents runtime errors from missing config"
```

---

### Task 33: Update README with Security Setup

**Files:**
- Modify: `README.md`

**Step 1: Add security setup section**

Update `README.md`:

```markdown
# LiveNowClub

[... existing content ...]

## Security Setup

This application includes comprehensive security measures. Follow these steps to configure:

### 1. Generate Secrets

Run the following commands to generate required secrets:

```bash
# Generate encryption key (32 bytes for AES-256)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Generate admin API key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate unsubscribe secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Add to .env.local

Create `.env.local` with the following:

```env
# Existing vars
REDIS_URL=your-redis-url
ANTHROPIC_API_KEY=your-key
RESEND_API_KEY=your-key

# Security vars (use generated values from step 1)
DATA_ENCRYPTION_KEY=<base64-key>
ADMIN_API_KEY=<hex-key>
UNSUBSCRIBE_SECRET=<hex-key>
```

### 3. Add to Vercel Production

Add the same environment variables to Vercel:

```bash
vercel env add DATA_ENCRYPTION_KEY production
vercel env add ADMIN_API_KEY production
vercel env add UNSUBSCRIBE_SECRET production
```

### 4. Security Features

- **Session Authentication**: 90-day secure HTTP-only cookies
- **Authorization**: Resource ownership verification on all endpoints
- **Rate Limiting**: IP and per-user limits to prevent abuse
- **Data Encryption**: AES-256-GCM for emails and quiz answers
- **CSRF Protection**: Token validation on state-changing requests
- **Input Validation**: Comprehensive validation and sanitization
- **Security Headers**: CSP, HSTS, X-Frame-Options, etc.
- **Audit Logging**: Security events logged for 90 days

### 5. Admin Endpoints

Protected endpoints requiring `X-Admin-Key` header:

- `GET /api/stats?days=7` - Analytics and user data
- `GET /api/security/logs?days=7` - Security event logs

Example:
```bash
curl -H "X-Admin-Key: your-admin-key" \
  https://livenowclub.com/api/stats
```

[... rest of existing content ...]
```

**Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add security setup instructions

- Document secret generation process
- List required environment variables
- Explain security features
- Document admin endpoints"
```

---

### Task 34: Create Final Security Checklist

**Files:**
- Create: `docs/SECURITY.md`

**Step 1: Create security documentation**

Create `docs/SECURITY.md`:

```markdown
# Security Implementation Checklist

## Phase 1: Immediate Fixes ✅

- [x] Lock down `/api/stats` with admin API key
- [x] Disable `/api/debug-identity` in production
- [x] Add IP-based rate limiting to `/api/subscribe`
- [x] Add IP-based rate limiting to `/api/reading/generate`
- [x] Add IP-based rate limiting to `/api/track`

## Phase 2: Core Security ✅

- [x] Implement session authentication infrastructure
- [x] Create sessions on quiz completion
- [x] Protect `/api/utopia/update-email` with auth + ownership
- [x] Protect `/api/utopia/update-name` with auth + ownership
- [x] Protect `/api/utopia/create` with auth + rate limiting
- [x] Protect `/api/utopia/join` with auth
- [x] Protect `/api/utopia/leave` with auth
- [x] Protect `/api/connections/create` with auth + rate limiting
- [x] Protect `/api/utopia/user/[userId]` with auth + ownership
- [x] Implement AES-256-GCM encryption for user data
- [x] Encrypt emails and quiz answers in Redis
- [x] Add CSRF protection to all state-changing endpoints

## Phase 3: Hardening ✅

- [x] Create input validation utilities
- [x] Add email validation to `/api/subscribe`
- [x] Add name sanitization to `/api/utopia/update-name`
- [x] Add quiz answer validation to `/api/utopia/save-result`
- [x] Add slug validation to `/api/utopia/create`
- [x] Configure security headers in `next.config.ts`
- [x] Create security audit logging infrastructure
- [x] Add logging to authentication events
- [x] Add logging to rate limit events
- [x] Add logging to data modification events
- [x] Add logging to admin access events
- [x] Create `/api/security/logs` endpoint
- [x] Secure unsubscribe with signed tokens (GET → POST)
- [x] Add environment variable validation
- [x] Update README with security setup

## Deployment Checklist

### Pre-Deployment

- [ ] Generate all required secrets (encryption key, admin key, unsubscribe secret)
- [ ] Add secrets to Vercel environment variables
- [ ] Run `pnpm run build` to verify no build errors
- [ ] Test all protected endpoints locally
- [ ] Verify CSRF tokens work in frontend
- [ ] Test rate limiting thresholds

### Deployment

- [ ] Deploy to Vercel production
- [ ] Verify environment variables loaded
- [ ] Test session creation on quiz completion
- [ ] Test authentication on protected endpoints
- [ ] Test admin endpoints with API key
- [ ] Monitor error rates in Vercel logs

### Post-Deployment

- [ ] Monitor security logs for suspicious activity
- [ ] Check rate limit effectiveness (should see some 429s)
- [ ] Verify encrypted data in Redis (emails should be base64)
- [ ] Test session persistence across devices
- [ ] Verify HTTPS-only cookies in production

## Security Monitoring

### Daily
- Check `/api/security/logs` for unusual patterns
- Monitor rate limit exceeded counts
- Check unauthorized access attempts

### Weekly
- Review session creation rate
- Check CSRF validation failures
- Monitor email update frequency

### Monthly
- Review admin API key access logs
- Rotate encryption keys if needed
- Update dependencies for security patches

## Incident Response

If security incident detected:

1. **Immediate**: Rotate compromised keys (admin API key, encryption key)
2. **Investigation**: Check `/api/security/logs` for attack patterns
3. **Mitigation**: Temporarily increase rate limits or block IPs if needed
4. **Recovery**: Force session logout if needed (clear Redis sessions)
5. **Review**: Update security measures based on incident

## Key Rotation

### Encryption Key Rotation

1. Generate new `DATA_ENCRYPTION_KEY`
2. Add as `DATA_ENCRYPTION_KEY_NEW` to environment
3. Update encryption code to try both keys on decrypt
4. After 90 days (user data TTL), remove old key
5. Rename `DATA_ENCRYPTION_KEY_NEW` to `DATA_ENCRYPTION_KEY`

### Admin API Key Rotation

1. Generate new `ADMIN_API_KEY`
2. Update Vercel environment variable
3. Update any admin scripts/tools
4. Old key immediately invalid

## Contact

For security issues, contact: [your-email]
```

**Step 2: Commit**

```bash
git add docs/SECURITY.md
git commit -m "docs: add security implementation checklist

- Document all completed tasks
- Add deployment checklist
- Include monitoring procedures
- Add incident response plan
- Document key rotation procedures"
```

---

### Task 35: Final Verification Build

**Files:**
- N/A (build verification)

**Step 1: Run production build**

```bash
cd ~/livenowclub-repo/.worktrees/security-overhaul
pnpm run build
```

Expected: Build succeeds with no errors

**Step 2: Run linter**

```bash
pnpm run lint
```

Expected: No new lint errors (existing errors from baseline are OK)

**Step 3: Verify environment variables are referenced correctly**

```bash
grep -r "process.env" src/ | grep -v node_modules
```

Expected: All env vars match `.env.local` and documentation

**Step 4: Create final commit if any fixes needed**

If build or lint found issues:
```bash
git add .
git commit -m "fix: resolve build/lint issues"
```

Otherwise, note build verification success.

---

## Implementation Complete

All tasks completed! The security overhaul is ready for deployment.

### Summary

- **34 commits** across 3 phases
- **Phase 1**: Critical endpoint protection and rate limiting
- **Phase 2**: Authentication, authorization, encryption, CSRF
- **Phase 3**: Validation, headers, logging, monitoring

### Next Steps

1. **Merge to main**:
   ```bash
   git checkout main
   git merge feature/security-overhaul
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Add environment variables in Vercel dashboard
   - Trigger deployment
   - Monitor logs

3. **Post-deployment verification**:
   - Test session creation
   - Verify protected endpoints return 401 without auth
   - Check security headers with `curl -I`
   - Monitor `/api/security/logs`

### Testing Recommendations

Before merging, test these critical paths:

1. **Quiz completion → session creation**
2. **Protected endpoint → 401 without session**
3. **Protected endpoint → 403 for different user**
4. **Rate limiting → 429 after threshold**
5. **CSRF → 403 without token**
6. **Admin endpoints → 401 without API key**
7. **Email encryption → verify in Redis**

Good luck with deployment! 🚀
