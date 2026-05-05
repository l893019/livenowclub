import { signUnsubscribeToken, verifyUnsubscribeToken } from './tokens'

describe('Token signing and verification', () => {
  const originalEnv = process.env.UNSUBSCRIBE_SECRET

  beforeEach(() => {
    process.env.UNSUBSCRIBE_SECRET = 'test-secret-key-at-least-32-characters-long'
  })

  afterEach(() => {
    process.env.UNSUBSCRIBE_SECRET = originalEnv
  })

  describe('signUnsubscribeToken', () => {
    it('should throw error when UNSUBSCRIBE_SECRET not set', () => {
      delete process.env.UNSUBSCRIBE_SECRET

      expect(() => signUnsubscribeToken('test@example.com')).toThrow('UNSUBSCRIBE_SECRET not configured')
    })

    it('should generate a signed token', () => {
      const token = signUnsubscribeToken('test@example.com')

      expect(token).toBeDefined()
      expect(typeof token).toBe('string')
      expect(token.length).toBeGreaterThan(0)
      expect(token).toContain('.')
    })

    it('should generate different tokens for different emails', () => {
      const token1 = signUnsubscribeToken('test1@example.com')
      const token2 = signUnsubscribeToken('test2@example.com')

      expect(token1).not.toBe(token2)
    })

    it('should generate consistent tokens for same email at same timestamp', () => {
      const email = 'test@example.com'
      const now = Date.now()

      // Mock Date.now to return consistent timestamp
      jest.spyOn(Date, 'now').mockReturnValue(now)

      const token1 = signUnsubscribeToken(email)
      const token2 = signUnsubscribeToken(email)

      expect(token1).toBe(token2)

      jest.restoreAllMocks()
    })
  })

  describe('verifyUnsubscribeToken', () => {
    it('should return null when UNSUBSCRIBE_SECRET not set', () => {
      delete process.env.UNSUBSCRIBE_SECRET

      const result = verifyUnsubscribeToken('any-token')

      expect(result).toBeNull()
    })

    it('should return null for invalid token format', () => {
      const result = verifyUnsubscribeToken('not-a-valid-token')

      expect(result).toBeNull()
    })

    it('should verify a valid token', () => {
      const email = 'test@example.com'
      const token = signUnsubscribeToken(email)

      const verified = verifyUnsubscribeToken(token)

      expect(verified).toBe(email)
    })

    it('should return null for tampered token', () => {
      const email = 'test@example.com'
      const token = signUnsubscribeToken(email)

      // Tamper with the token
      const parts = token.split('.')
      parts[0] = Buffer.from('tampered@example.com').toString('base64url')
      const tamperedToken = parts.join('.')

      const verified = verifyUnsubscribeToken(tamperedToken)

      expect(verified).toBeNull()
    })

    it('should return null for expired token (> 30 days)', () => {
      const email = 'test@example.com'

      // Create token 31 days ago
      const oldTimestamp = Date.now() - (31 * 24 * 60 * 60 * 1000)
      jest.spyOn(Date, 'now').mockReturnValue(oldTimestamp)

      const token = signUnsubscribeToken(email)

      jest.restoreAllMocks()

      // Verify with current timestamp
      const verified = verifyUnsubscribeToken(token)

      expect(verified).toBeNull()
    })

    it('should verify token within 30 day window', () => {
      const email = 'test@example.com'

      // Create token 29 days ago
      const oldTimestamp = Date.now() - (29 * 24 * 60 * 60 * 1000)
      jest.spyOn(Date, 'now').mockReturnValue(oldTimestamp)

      const token = signUnsubscribeToken(email)

      jest.restoreAllMocks()

      // Verify with current timestamp
      const verified = verifyUnsubscribeToken(token)

      expect(verified).toBe(email)
    })
  })
})
