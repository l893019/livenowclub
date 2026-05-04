# LiveNowClub.com Security Overhaul Design

**Date:** 2026-05-04
**Status:** Approved
**Priority:** Critical

## Executive Summary

This document outlines a comprehensive security overhaul for livenowclub.com, a Next.js personality quiz platform with social features. The application currently has **critical vulnerabilities** including no authentication layer, unrestricted data access, and potential for API abuse.

**Critical Issues Found:**
- No authentication on any API endpoints
- `/api/stats` exposes all user data (emails, quiz answers, profiles) publicly
- IDOR vulnerabilities allowing user impersonation
- No rate limiting on expensive AI operations (Anthropic API)
- No CSRF protection
- Sensitive data stored as plaintext in Redis

**Impact:** Complete account takeover possible, data breach risk, API cost abuse, user privacy violations.

---

## 1. Authentication Architecture

### Strategy
Session-based authentication with secure HTTP-only cookies.

### Rationale
- **No passwords needed**: Users don't create traditional accounts - quiz completion is their "registration"
- **Persistent across devices**: Email can be used for session recovery
- **Low friction**: Maintains current UX while adding security
- **Vercel-compatible**: Works with edge functions and serverless

### Implementation

**Session Creation:**
1. User completes quiz and submits results
2. Generate cryptographically secure session token (32-byte random, 256 bits)
3. Store session in Redis: `session:{token}` → `{userId, createdAt, lastActive, csrfToken}`
4. Set secure cookie: `httpOnly=true, secure=true, sameSite=lax, maxAge=90days`

**Session Validation:**
```typescript
// Middleware: src/lib/auth.ts
export async function requireAuth(request: NextRequest): Promise<string> {
  const sessionToken = request.cookies.get('session')?.value;
  if (!sessionToken) throw new UnauthorizedError();

  const sessionData = await redis.get(`session:${sessionToken}`);
  if (!sessionData) throw new UnauthorizedError();

  const session = JSON.parse(sessionData);

  // Check expiry (90 days)
  if (Date.now() - session.createdAt > 90 * 24 * 60 * 60 * 1000) {
    await redis.del(`session:${sessionToken}`);
    throw new UnauthorizedError('Session expired');
  }

  // Refresh last active
  session.lastActive = Date.now();
  await redis.set(`session:${sessionToken}`, JSON.stringify(session), 'EX', 90 * 24 * 60 * 60);

  return session.userId;
}
```

**Session Lifecycle:**
- Created: When quiz results saved (`POST /api/utopia/save-result`)
- Duration: 90 days (matches user data TTL)
- Auto-refresh: On any authenticated request
- Invalidation: Explicit logout or expiry

---

## 2. Authorization & API Protection

### Access Control Model

**Public (no auth):**
- `GET /api/utopia/[slug]` - View utopia details
- `GET /api/og/*` - OpenGraph images
- `POST /api/subscribe` - Email signup (rate-limited)
- `POST /api/track` - Analytics (rate-limited)

**Authenticated (session required):**
- `POST /api/utopia/save-result` - Save quiz results
- `POST /api/utopia/create` - Create utopias
- `POST /api/utopia/join` - Join utopias
- `POST /api/reading/generate` - Generate AI readings
- `GET /api/utopia/user/[userId]` - Only if userId matches session
- `POST /api/connections/create` - Create connections

**Owner-only (session + ownership check):**
- `POST /api/utopia/update-name` - Update own name only
- `POST /api/utopia/update-email` - Update own email only
- `POST /api/utopia/leave` - Leave if member

**Admin-only (separate API key):**
- `GET /api/stats` - Requires `X-Admin-Key` header

**Removed in production:**
- `/api/debug-identity` - Environment check, disabled if `NODE_ENV=production`

### Middleware Pattern

```typescript
// Authorization helpers: src/lib/auth.ts
export async function requireOwnership(userId: string, resourceUserId: string) {
  if (userId !== resourceUserId) {
    throw new ForbiddenError('Access denied');
  }
}

export async function requireMembership(userId: string, utopiaSlug: string) {
  const utopia = await getUtopia(utopiaSlug);
  if (!utopia.members.includes(userId)) {
    throw new ForbiddenError('Must be a member');
  }
}

// Example usage in route:
export async function POST(request: NextRequest) {
  const userId = await requireAuth(request); // Get authenticated user
  const body = await request.json();

  await requireOwnership(userId, body.userId); // Verify ownership

  // Proceed with operation...
}
```

---

## 3. Rate Limiting & Abuse Prevention

### Multi-Layer Strategy

**Layer 1: Global IP-based limits**
| Endpoint | Limit | Window | Purpose |
|----------|-------|--------|---------|
| `/api/subscribe` | 5 | 1 hour | Prevent email spam |
| `/api/reading/generate` | 10 | 1 hour | Protect AI API costs |
| `/api/track` | 100 | 1 hour | Prevent analytics flooding |
| All others | 100 | 1 hour | General DoS protection |

**Layer 2: Per-user limits**
| Operation | Limit | Window | Purpose |
|-----------|-------|--------|---------|
| AI reading generation | 3 | 1 hour | Cost control |
| Utopia creation | 5 | 1 day | Prevent spam rooms |
| Email updates | 3 | 1 day | Prevent abuse |
| Connection creation | 20 | 1 hour | Prevent spam |
| Quiz result saves | 1 | 60 seconds | Prevent spam |

**Layer 3: Resource limits**
- Max 50 members per utopia (prevents unbounded AI context)
- Max 100 utopias per user
- Max request payload: 100KB

### Implementation

```typescript
// src/lib/ratelimit.ts
export async function checkRateLimit(
  scope: 'ip' | 'user',
  identifier: string,
  endpoint: string,
  limit: number,
  windowSeconds: number
): Promise<void> {
  const window = Math.floor(Date.now() / (windowSeconds * 1000));
  const key = `ratelimit:${scope}:${identifier}:${endpoint}:${window}`;

  const count = await redis.incr(key);
  await redis.expire(key, windowSeconds);

  if (count > limit) {
    await logSecurityEvent('ratelimit.exceeded', { scope, identifier, endpoint });
    throw new RateLimitError(`Rate limit exceeded: ${limit} requests per ${windowSeconds}s`);
  }
}

// Middleware wrapper
export async function withRateLimit(
  request: NextRequest,
  endpoint: string,
  ipLimit: number,
  userLimit?: number
) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  await checkRateLimit('ip', ip, endpoint, ipLimit, 3600);

  if (userLimit) {
    const userId = await requireAuth(request);
    await checkRateLimit('user', userId, endpoint, userLimit, 3600);
  }
}
```

---

## 4. Data Encryption & Secure Storage

### Encryption Strategy

**Encrypted at rest (Redis):**
- User emails (AES-256-GCM)
- Quiz answers (AES-256-GCM)
- Session tokens (cryptographically secure random)
- Connection metadata if sensitive

**Plaintext (by design):**
- Utopia slugs (needed for lookups)
- User names (public display)
- Archetype results (public)
- Analytics data (aggregated, not PII)

### Implementation

```typescript
// src/lib/crypto.ts
import { webcrypto } from 'crypto';

const ENCRYPTION_KEY = Buffer.from(process.env.DATA_ENCRYPTION_KEY!, 'base64');

export async function encrypt(plaintext: string): Promise<string> {
  const iv = webcrypto.getRandomValues(new Uint8Array(12)); // 96-bit IV for GCM
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);

  const key = await webcrypto.subtle.importKey(
    'raw',
    ENCRYPTION_KEY,
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  );

  const encrypted = await webcrypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );

  // Return: base64(iv + ciphertext)
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encrypted), iv.length);

  return Buffer.from(combined).toString('base64');
}

export async function decrypt(ciphertext: string): Promise<string> {
  const combined = Buffer.from(ciphertext, 'base64');
  const iv = combined.slice(0, 12);
  const encrypted = combined.slice(12);

  const key = await webcrypto.subtle.importKey(
    'raw',
    ENCRYPTION_KEY,
    { name: 'AES-GCM' },
    false,
    ['decrypt']
  );

  const decrypted = await webcrypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    encrypted
  );

  return new TextDecoder().decode(decrypted);
}

// Wrapper for user data
export async function storeUserData(userId: string, data: UserData) {
  const encrypted = {
    ...data,
    email: data.email ? await encrypt(data.email) : null,
    answers: await encrypt(JSON.stringify(data.answers)),
  };
  await redis.set(`user:${userId}`, JSON.stringify(encrypted), 'EX', 90 * 24 * 60 * 60);
}

export async function getUserData(userId: string): Promise<UserData> {
  const raw = await redis.get(`user:${userId}`);
  if (!raw) return null;

  const data = JSON.parse(raw);
  return {
    ...data,
    email: data.email ? await decrypt(data.email) : null,
    answers: JSON.parse(await decrypt(data.answers)),
  };
}
```

### Environment Variables

**New required secrets:**
- `DATA_ENCRYPTION_KEY` - 32-byte base64-encoded AES key
- `ADMIN_API_KEY` - Random secure string for `/api/stats` access

**Generation:**
```bash
# Generate encryption key
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Generate admin API key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add to Vercel environment variables (production) and `.env.local` (development).

---

## 5. Input Validation & Sanitization

### Validation Rules

**Email validation:**
```typescript
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function validateEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  return EMAIL_REGEX.test(email);
}
```

**User name sanitization:**
```typescript
export function sanitizeName(name: string): string {
  return name
    .trim()
    .slice(0, 50)
    .replace(/[<>]/g, '') // Remove HTML
    .replace(/[^\w\s'-]/g, ''); // Alphanumeric + spaces, hyphens, apostrophes only
}
```

**Quiz answer validation:**
```typescript
export function validateQuizAnswers(answers: unknown): answers is number[] {
  if (!Array.isArray(answers) || answers.length !== 7) return false;

  return answers.every((answer, idx) => {
    const question = QUESTIONS[idx];
    const maxOption = question.options.length - 1;
    return Number.isInteger(answer) && answer >= 0 && answer <= maxOption;
  });
}
```

**Utopia slug validation:**
```typescript
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateSlug(slug: string): boolean {
  return slug.length >= 3 &&
         slug.length <= 30 &&
         SLUG_REGEX.test(slug);
}
```

**User ID validation:**
```typescript
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function validateUserId(userId: string): boolean {
  return UUID_REGEX.test(userId);
}
```

**Generic request body parser with validation:**
```typescript
export async function parseValidatedBody<T>(
  request: NextRequest,
  validator: (data: unknown) => data is T
): Promise<T> {
  try {
    const body = await request.json();
    if (!validator(body)) {
      throw new ValidationError('Invalid request body');
    }
    return body;
  } catch (error) {
    throw new ValidationError('Malformed JSON or invalid data');
  }
}
```

### Application Points

Apply validation at API route entry:
```typescript
// Example: POST /api/utopia/update-email/route.ts
export async function POST(request: NextRequest) {
  const userId = await requireAuth(request);

  const body = await parseValidatedBody(request, (data): data is { email: string } => {
    return typeof data === 'object' &&
           data !== null &&
           'email' in data &&
           validateEmail(data.email);
  });

  await requireOwnership(userId, body.userId);

  // Proceed with validated, sanitized data...
}
```

---

## 6. CSRF Protection & Security Headers

### CSRF Implementation

**Double-submit cookie pattern:**

1. Generate CSRF token on session creation
2. Store in both secure cookie and session data
3. Require token in `X-CSRF-Token` header for state-changing requests

```typescript
// Session creation includes CSRF token
export async function createSession(userId: string): Promise<string> {
  const sessionToken = webcrypto.getRandomValues(new Uint8Array(32));
  const csrfToken = webcrypto.getRandomValues(new Uint8Array(32));

  const session = {
    userId,
    csrfToken: Buffer.from(csrfToken).toString('hex'),
    createdAt: Date.now(),
    lastActive: Date.now()
  };

  await redis.set(
    `session:${Buffer.from(sessionToken).toString('hex')}`,
    JSON.stringify(session),
    'EX',
    90 * 24 * 60 * 60
  );

  return Buffer.from(sessionToken).toString('hex');
}

// CSRF validation middleware
export async function validateCSRF(request: NextRequest, userId: string) {
  const tokenFromHeader = request.headers.get('x-csrf-token');
  const tokenFromCookie = request.cookies.get('csrf-token')?.value;

  if (!tokenFromHeader || !tokenFromCookie) {
    throw new CSRFError('CSRF token missing');
  }

  if (tokenFromHeader !== tokenFromCookie) {
    throw new CSRFError('CSRF token mismatch');
  }

  const sessionToken = request.cookies.get('session')?.value;
  const session = await redis.get(`session:${sessionToken}`);

  if (!session || JSON.parse(session).csrfToken !== tokenFromHeader) {
    await logSecurityEvent('csrf.validation_failed', { userId });
    throw new CSRFError('Invalid CSRF token');
  }
}
```

**Exemptions:**
- GET requests (safe methods)
- `/api/track` (analytics, low risk)
- `/api/subscribe` (public, rate-limited)

### Security Headers

Add to `next.config.ts`:

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Required for Next.js
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.anthropic.com https://api.resend.com",
              "frame-ancestors 'none'"
            ].join('; ')
          }
        ]
      }
    ];
  }
};
```

### Unsubscribe Security Fix

**Current vulnerability:** GET request changes state, no token validation

**New implementation:**
```typescript
// Generate signed unsubscribe token in email
import { createHmac } from 'crypto';

function generateUnsubscribeToken(email: string): string {
  const payload = JSON.stringify({ email, timestamp: Date.now() });
  const signature = createHmac('sha256', process.env.UNSUBSCRIBE_SECRET!)
    .update(payload)
    .digest('hex');

  return Buffer.from(JSON.stringify({ payload, signature })).toString('base64url');
}

// Verify on POST /api/unsubscribe
export async function POST(request: NextRequest) {
  const { token } = await request.json();

  const decoded = JSON.parse(Buffer.from(token, 'base64url').toString());
  const { payload, signature } = decoded;

  const expectedSignature = createHmac('sha256', process.env.UNSUBSCRIBE_SECRET!)
    .update(payload)
    .digest('hex');

  if (signature !== expectedSignature) {
    throw new UnauthorizedError('Invalid unsubscribe token');
  }

  const { email, timestamp } = JSON.parse(payload);

  // Token expires after 30 days
  if (Date.now() - timestamp > 30 * 24 * 60 * 60 * 1000) {
    throw new UnauthorizedError('Unsubscribe token expired');
  }

  await redis.sadd('unsubscribed', email);
  return NextResponse.json({ success: true });
}
```

---

## 7. Monitoring, Audit Logging & Deployment

### Security Audit Logging

**Events to log:**
- `auth.session_created`
- `auth.session_expired`
- `auth.unauthorized_access`
- `ratelimit.exceeded`
- `csrf.validation_failed`
- `data.email_updated`
- `data.suspicious_access` (rapid userId enumeration)
- `admin.stats_accessed`

**Implementation:**
```typescript
// src/lib/logging.ts
export async function logSecurityEvent(
  event: string,
  metadata: Record<string, any>
) {
  const logEntry = {
    event,
    timestamp: Date.now(),
    ...metadata
  };

  const date = new Date().toISOString().split('T')[0];
  await redis.zadd(
    `security:events:${date}`,
    Date.now(),
    JSON.stringify(logEntry)
  );

  // Auto-expire after 90 days
  await redis.expire(`security:events:${date}`, 90 * 24 * 60 * 60);
}

// Query logs
export async function getSecurityEvents(days: number = 7) {
  const events = [];
  const now = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const dayEvents = await redis.zrange(`security:events:${date}`, 0, -1);
    events.push(...dayEvents.map(e => JSON.parse(e)));
  }

  return events;
}
```

### Monitoring Alerts

**Thresholds for manual review:**
- Rate limit exceeded >10 times/hour from same IP
- Failed auth attempts >20/hour globally
- Sudden spike in AI generation (>3x average)
- Multiple CSRF failures from same session (>3)
- Any access to `/api/stats` (if kept for admin)

**Implementation:** Log to separate Redis sorted set + optional webhook to Slack/Discord

### Deployment Strategy

**Phase 1: Immediate Fixes (Week 1)**
- [ ] Lock down `/api/stats` with admin API key
- [ ] Disable `/api/debug-identity` in production (`NODE_ENV` check)
- [ ] Add basic IP-based rate limiting
- [ ] Deploy to production as emergency patch
- [ ] Monitor error rates

**Phase 2: Core Security (Week 2-3)**
- [ ] Implement session authentication system
- [ ] Add authorization middleware to all endpoints
- [ ] Deploy data encryption (with migration for existing data)
- [ ] Add CSRF protection
- [ ] Update frontend to include session cookies and CSRF tokens
- [ ] Deploy to production with feature flag (gradual rollout)
- [ ] Monitor auth success rates

**Phase 3: Hardening (Week 4)**
- [ ] Comprehensive input validation on all endpoints
- [ ] Security headers in `next.config.ts`
- [ ] Per-user rate limiting
- [ ] Full audit logging
- [ ] Security testing (penetration testing)
- [ ] Monitor for 1 week before declaring stable

### Testing Approach

**Unit tests:**
- Validation functions (email, slug, userId, etc.)
- Encryption/decryption
- Rate limit logic

**Integration tests:**
- Auth flow (session creation, validation, expiry)
- Authorization (ownership checks, membership checks)
- CSRF protection
- Rate limiting (boundary conditions)

**Security tests:**
- Session hijacking attempts
- CSRF bypass attempts
- IDOR attacks on all endpoints
- SQL/NoSQL injection attempts
- Rate limit boundary testing
- Input validation bypasses

**Load tests:**
- Rate limits under load
- Session storage performance
- Encryption overhead

### Rollback Plan

**Safety mechanisms:**
- Feature flags for auth layer (can disable via env var)
- Backward-compatible session data format
- Keep unencrypted data for 7 days during migration
- Monitor error rates; rollback if >1% spike
- Gradual rollout: 10% → 50% → 100% traffic

**Rollback steps:**
1. Set `SECURITY_ENABLED=false` in Vercel env
2. Redeploy previous commit
3. Investigate issue
4. Fix and redeploy

### Documentation Updates

- [ ] Update API documentation with auth requirements
- [ ] Document rate limits for any external integrators
- [ ] Create security incident response playbook
- [ ] Document key rotation procedures
- [ ] Add security.txt file with contact info

---

## 8. Migration & Data Handling

### Existing User Data Migration

**Problem:** Existing users have plaintext data in Redis

**Solution:** Lazy migration on access
```typescript
// Detect if data is encrypted
function isEncrypted(value: string): boolean {
  // Encrypted data is base64 and has IV prefix
  try {
    const decoded = Buffer.from(value, 'base64');
    return decoded.length > 12; // IV is 12 bytes
  } catch {
    return false;
  }
}

// Migrate on read
export async function getUserData(userId: string): Promise<UserData> {
  const raw = await redis.get(`user:${userId}`);
  if (!raw) return null;

  const data = JSON.parse(raw);

  // Check if needs migration
  const needsMigration = data.email && !isEncrypted(data.email);

  if (needsMigration) {
    // Encrypt and re-save
    const migrated = {
      ...data,
      email: data.email ? await encrypt(data.email) : null,
      answers: await encrypt(JSON.stringify(data.answers)),
    };
    await redis.set(`user:${userId}`, JSON.stringify(migrated), 'EX', 90 * 24 * 60 * 60);
    return {
      ...data,
      answers: data.answers, // Already plaintext
    };
  }

  // Already encrypted, decrypt
  return {
    ...data,
    email: data.email ? await decrypt(data.email) : null,
    answers: JSON.parse(await decrypt(data.answers)),
  };
}
```

### Session Migration for Existing Users

**Problem:** Existing users don't have sessions

**Solution:** Generate session on first authenticated request
```typescript
// Frontend: Check for session cookie on page load
// If missing, call /api/auth/session/create with current userId (from localStorage)
// Backend validates userId exists, creates session, returns cookie
```

**Frontend changes needed:**
- Store session token in cookie (handled by backend Set-Cookie)
- Include CSRF token in all POST requests
- Handle 401 errors (redirect to quiz start)

---

## 9. Cost Analysis

### Infrastructure Costs

**Redis storage increase:**
- Encrypted data ~33% larger (base64 encoding overhead)
- Session storage: ~200 bytes per active session
- Audit logs: ~500 bytes per event
- Estimated increase: <10% total Redis usage

**Compute costs:**
- Encryption/decryption: Negligible (AES-GCM is fast)
- Rate limiting lookups: 1 extra Redis call per request
- Auth middleware: ~2ms per request overhead
- Total estimated increase: <5% function execution time

**Anthropic API protection:**
- Current risk: Unlimited abuse (could cost thousands)
- With rate limiting: Max 10 calls/hour/IP + 3 calls/hour/user
- Estimated savings: Prevents >90% potential abuse

**Net impact:** Security measures pay for themselves by preventing API abuse.

---

## 10. Success Metrics

**Security metrics:**
- Zero unauthorized data access incidents
- Zero successful CSRF attacks
- Rate limit effectiveness (% of malicious requests blocked)
- Session hijacking attempts (should be 0 successful)

**Performance metrics:**
- Auth middleware overhead: <5ms p95
- API response time increase: <10%
- Frontend load time: No significant change

**User experience metrics:**
- Authentication success rate: >99%
- False positive rate limiting: <0.1%
- Session persistence: >95% of users stay logged in

---

## Conclusion

This security overhaul addresses critical vulnerabilities in livenowclub.com through a comprehensive, phased approach. The design prioritizes:

1. **Immediate risk mitigation** (Phase 1)
2. **Foundational security** (Phase 2)
3. **Defense in depth** (Phase 3)

With proper implementation and testing, this will transform livenowclub.com from a critically vulnerable application to a secure, production-ready platform while maintaining the existing user experience.

**Next Steps:**
1. Review and approve this design
2. Generate encryption keys and admin API key
3. Begin Phase 1 implementation
4. Schedule security testing before Phase 3 completion
