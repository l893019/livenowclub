# The Live Now Club

A Next.js application for discovering your identity and connecting with others.

## Security Features

This application implements comprehensive security measures to protect user data and prevent common web vulnerabilities.

### Security Implementations

- **Session Management**: Secure HTTP-only cookies with 90-day expiration
- **CSRF Protection**: Double-submit cookie pattern for state-changing operations
- **Data Encryption**: AES-256-GCM encryption for sensitive data at rest
- **Rate Limiting**: Request throttling to prevent abuse
- **Token Signing**: HMAC-signed tokens for email unsubscribe links
- **Admin Authentication**: API key protection for admin endpoints
- **Security Event Logging**: Comprehensive audit trail in Redis

## Getting Started

### Prerequisites

- Node.js 20+
- Redis (Upstash or local)
- Required environment variables (see below)

### Environment Variables

Create a `.env.local` file in the root directory with the following required variables:

```bash
# Data Encryption (required)
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
DATA_ENCRYPTION_KEY=your-base64-encoded-32-byte-key

# Admin API Key (required, min 16 characters)
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
ADMIN_API_KEY=your-admin-api-key-min-16-chars

# Unsubscribe Token Secret (required, min 32 characters)
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
UNSUBSCRIBE_SECRET=your-unsubscribe-secret-min-32-chars

# Redis (required)
UPSTASH_REDIS_REST_URL=https://your-redis-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token

# Optional: Redis local development
REDIS_URL=redis://localhost:6379
```

#### Generating Secure Keys

Use the following commands to generate cryptographically secure keys:

```bash
# Generate DATA_ENCRYPTION_KEY (32 bytes, base64 encoded)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Generate ADMIN_API_KEY (64 hex characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate UNSUBSCRIBE_SECRET (64 hex characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Building for Production

```bash
npm run build
npm start
```

The build process will automatically validate all required environment variables and fail if any are missing or invalid.

## Security Architecture

### Session Cookies

Sessions use secure HTTP-only cookies with the following properties:
- **Duration**: 90 days with automatic refresh
- **Storage**: Redis with encrypted session data
- **Security**: HTTP-only, SameSite=Lax, Secure in production
- **CSRF Token**: Included in session for state-changing operations

### CSRF Protection

State-changing POST requests require:
1. Valid session cookie
2. CSRF token in request header (`X-CSRF-Token`)
3. CSRF token in cookie (`csrf-token`)
4. Token must match session's stored CSRF token

### Data Encryption

Sensitive data (emails, PII) is encrypted at rest using:
- **Algorithm**: AES-256-GCM
- **Key**: 256-bit key from `DATA_ENCRYPTION_KEY`
- **IV**: Random 12-byte initialization vector per encryption
- **Authentication**: 128-bit authentication tag

### Admin Endpoints

Admin-only endpoints require the `X-Admin-API-Key` header:
- `/api/stats` - Analytics and metrics
- `/api/security/logs` - Security event logs

### Unsubscribe Links

Email unsubscribe links use HMAC-signed tokens:
- **Method**: POST (not GET to prevent CSRF)
- **Token Format**: `base64url(email).timestamp.signature`
- **Expiration**: 30 days
- **Verification**: HMAC-SHA256 signature validation

### Rate Limiting

The application uses Upstash rate limiting to prevent abuse:
- Configured per-endpoint
- Sliding window algorithm
- Returns 429 status on limit exceeded

### Security Event Logging

All security-relevant events are logged to Redis:
- Authentication attempts
- Rate limit violations
- CSRF validation failures
- Data access events
- Admin operations

Logs include:
- Event type and action
- Timestamp
- IP address
- Relevant metadata

Access logs via admin endpoint: `GET /api/security/logs?days=7`

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   └── api/               # API routes
│       ├── security/      # Security admin endpoints
│       ├── subscribe/     # Email subscription
│       ├── unsubscribe/   # Email unsubscription (POST only)
│       └── stats/         # Analytics (admin-only)
├── lib/                   # Core libraries
│   ├── auth.ts           # Session and CSRF management
│   ├── crypto.ts         # Data encryption
│   ├── env.ts            # Environment validation
│   ├── logging.ts        # Security event logging
│   ├── ratelimit.ts      # Rate limiting
│   └── tokens.ts         # Token signing/verification
└── middleware.ts         # Request middleware
```

## Learn More

To learn more about Next.js:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Security Disclosure

If you discover a security vulnerability, please email security@livenowclub.com instead of using the issue tracker.
