import { encrypt, decrypt, isEncrypted, EncryptionError } from './crypto'

// Mock environment variable
const originalEnv = process.env.DATA_ENCRYPTION_KEY

describe('Data Encryption Module', () => {
  beforeEach(() => {
    // Set a valid 32-byte base64 key for testing
    process.env.DATA_ENCRYPTION_KEY = 'emIZ2tdPe/JCyvQ/vYHu1lj0BEa7FXqMgofmrLY2qYs='
  })

  afterEach(() => {
    process.env.DATA_ENCRYPTION_KEY = originalEnv
  })

  describe('encrypt', () => {
    it('should encrypt plaintext and return base64 string', async () => {
      const plaintext = 'sensitive data'
      const encrypted = await encrypt(plaintext)

      expect(typeof encrypted).toBe('string')
      expect(encrypted.length).toBeGreaterThan(0)
      // Base64 pattern check
      expect(encrypted).toMatch(/^[A-Za-z0-9+/]+=*$/)
    })

    it('should produce different ciphertext for same plaintext (random IV)', async () => {
      const plaintext = 'test data'
      const encrypted1 = await encrypt(plaintext)
      const encrypted2 = await encrypt(plaintext)

      expect(encrypted1).not.toBe(encrypted2)
    })

    it('should encrypt empty string', async () => {
      const encrypted = await encrypt('')
      expect(typeof encrypted).toBe('string')
      expect(encrypted.length).toBeGreaterThan(0)
    })

    it('should encrypt unicode characters', async () => {
      const plaintext = 'Hello 世界 🌍'
      const encrypted = await encrypt(plaintext)
      expect(typeof encrypted).toBe('string')
      expect(encrypted.length).toBeGreaterThan(0)
    })

    it('should encrypt long text', async () => {
      const plaintext = 'a'.repeat(10000)
      const encrypted = await encrypt(plaintext)
      expect(typeof encrypted).toBe('string')
      expect(encrypted.length).toBeGreaterThan(0)
    })

    it('should throw EncryptionError when encryption key is missing', async () => {
      delete process.env.DATA_ENCRYPTION_KEY

      await expect(encrypt('test')).rejects.toThrow(EncryptionError)
      await expect(encrypt('test')).rejects.toThrow('DATA_ENCRYPTION_KEY not configured')
    })

    it('should throw EncryptionError when encryption key is invalid base64', async () => {
      process.env.DATA_ENCRYPTION_KEY = 'not-valid-base64!!!'

      await expect(encrypt('test')).rejects.toThrow(EncryptionError)
      await expect(encrypt('test')).rejects.toThrow('Invalid encryption key format')
    })

    it('should throw EncryptionError when encryption key is wrong length', async () => {
      // Valid base64 but only 16 bytes instead of 32
      process.env.DATA_ENCRYPTION_KEY = Buffer.from('a'.repeat(16)).toString('base64')

      await expect(encrypt('test')).rejects.toThrow(EncryptionError)
      await expect(encrypt('test')).rejects.toThrow('Encryption key must be 32 bytes')
    })
  })

  describe('decrypt', () => {
    it('should decrypt encrypted data back to plaintext', async () => {
      const plaintext = 'sensitive information'
      const encrypted = await encrypt(plaintext)
      const decrypted = await decrypt(encrypted)

      expect(decrypted).toBe(plaintext)
    })

    it('should decrypt empty string', async () => {
      const encrypted = await encrypt('')
      const decrypted = await decrypt(encrypted)

      expect(decrypted).toBe('')
    })

    it('should decrypt unicode characters', async () => {
      const plaintext = 'Hello 世界 🌍'
      const encrypted = await encrypt(plaintext)
      const decrypted = await decrypt(encrypted)

      expect(decrypted).toBe(plaintext)
    })

    it('should decrypt long text', async () => {
      const plaintext = 'test data '.repeat(1000)
      const encrypted = await encrypt(plaintext)
      const decrypted = await decrypt(encrypted)

      expect(decrypted).toBe(plaintext)
    })

    it('should throw EncryptionError when decryption key is missing', async () => {
      const encrypted = await encrypt('test')
      delete process.env.DATA_ENCRYPTION_KEY

      await expect(decrypt(encrypted)).rejects.toThrow(EncryptionError)
      await expect(decrypt(encrypted)).rejects.toThrow('DATA_ENCRYPTION_KEY not configured')
    })

    it('should throw EncryptionError for invalid base64 ciphertext', async () => {
      await expect(decrypt('not-valid-base64!!!')).rejects.toThrow(EncryptionError)
      await expect(decrypt('not-valid-base64!!!')).rejects.toThrow('Invalid ciphertext format')
    })

    it('should throw EncryptionError for too short ciphertext', async () => {
      // Valid base64 but too short (less than 12 bytes IV + 16 bytes auth tag)
      const tooShort = Buffer.from('short').toString('base64')

      await expect(decrypt(tooShort)).rejects.toThrow(EncryptionError)
      await expect(decrypt(tooShort)).rejects.toThrow('Ciphertext too short')
    })

    it('should throw EncryptionError for tampered ciphertext', async () => {
      const encrypted = await encrypt('original data')

      // Tamper with the ciphertext
      const buffer = Buffer.from(encrypted, 'base64')
      buffer[buffer.length - 1] ^= 0xFF // Flip bits in last byte (auth tag)
      const tampered = buffer.toString('base64')

      await expect(decrypt(tampered)).rejects.toThrow(EncryptionError)
      await expect(decrypt(tampered)).rejects.toThrow('Decryption failed')
    })

    it('should throw EncryptionError when key has changed', async () => {
      const encrypted = await encrypt('test data')

      // Change the encryption key
      process.env.DATA_ENCRYPTION_KEY = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA='

      await expect(decrypt(encrypted)).rejects.toThrow(EncryptionError)
      await expect(decrypt(encrypted)).rejects.toThrow('Decryption failed')
    })
  })

  describe('isEncrypted', () => {
    it('should return true for encrypted values', async () => {
      const encrypted = await encrypt('test data')
      expect(isEncrypted(encrypted)).toBe(true)
    })

    it('should return false for plaintext strings', () => {
      expect(isEncrypted('plain text')).toBe(false)
      expect(isEncrypted('user@example.com')).toBe(false)
      expect(isEncrypted('Hello World')).toBe(false)
    })

    it('should return false for empty string', () => {
      expect(isEncrypted('')).toBe(false)
    })

    it('should return false for short strings', () => {
      expect(isEncrypted('abc')).toBe(false)
    })

    it('should return false for strings with spaces', () => {
      expect(isEncrypted('has spaces in it')).toBe(false)
    })

    it('should return false for strings with special characters', () => {
      expect(isEncrypted('hello@world.com')).toBe(false)
      expect(isEncrypted('test-value')).toBe(false)
    })

    it('should return true for valid base64 strings of appropriate length', async () => {
      // Minimum: 12 bytes IV + 16 bytes auth tag = 28 bytes = 38+ chars base64
      const validBase64 = Buffer.from('a'.repeat(30)).toString('base64')
      expect(isEncrypted(validBase64)).toBe(true)
    })

    it('should return false for base64 strings that are too short', () => {
      // Less than 28 bytes
      const shortBase64 = Buffer.from('short').toString('base64')
      expect(isEncrypted(shortBase64)).toBe(false)
    })

    it('should handle actual encrypted data correctly', async () => {
      const plaintext = 'sensitive@example.com'
      const encrypted = await encrypt(plaintext)

      expect(isEncrypted(plaintext)).toBe(false)
      expect(isEncrypted(encrypted)).toBe(true)
    })
  })

  describe('round-trip encryption', () => {
    it('should handle multiple encrypt/decrypt cycles', async () => {
      let data = 'original data'

      for (let i = 0; i < 5; i++) {
        const encrypted = await encrypt(data)
        const decrypted = await decrypt(encrypted)
        expect(decrypted).toBe(data)
        data = decrypted
      }
    })

    it('should handle different data types as strings', async () => {
      const testCases = [
        '123456',
        'true',
        'null',
        JSON.stringify({ key: 'value' }),
        JSON.stringify([1, 2, 3]),
      ]

      for (const testCase of testCases) {
        const encrypted = await encrypt(testCase)
        const decrypted = await decrypt(encrypted)
        expect(decrypted).toBe(testCase)
      }
    })
  })

  describe('EncryptionError', () => {
    it('should have correct name and be instanceof Error', () => {
      const error = new EncryptionError('test message')
      expect(error.message).toBe('test message')
      expect(error.name).toBe('EncryptionError')
      expect(error).toBeInstanceOf(Error)
    })
  })
})
