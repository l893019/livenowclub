import { validateEnv } from './env'

describe('Environment variable validation', () => {
  const originalEnv = { ...process.env }

  beforeEach(() => {
    // Set valid defaults for all required env vars
    process.env.DATA_ENCRYPTION_KEY = Buffer.from('a'.repeat(32)).toString('base64')
    process.env.ADMIN_API_KEY = 'admin-key-1234567890'
    process.env.UNSUBSCRIBE_SECRET = 'unsubscribe-secret-at-least-32-chars'
    process.env.UPSTASH_REDIS_REST_URL = 'https://redis.example.com'
    process.env.UPSTASH_REDIS_REST_TOKEN = 'redis-token-1234567890'
  })

  afterEach(() => {
    process.env = { ...originalEnv }
  })

  it('should pass validation when all env vars are valid', () => {
    expect(() => validateEnv()).not.toThrow()
  })

  it('should throw error when DATA_ENCRYPTION_KEY is missing', () => {
    delete process.env.DATA_ENCRYPTION_KEY

    expect(() => validateEnv()).toThrow('DATA_ENCRYPTION_KEY')
  })

  it('should throw error when DATA_ENCRYPTION_KEY is not base64', () => {
    process.env.DATA_ENCRYPTION_KEY = 'not-base64-!@#$%'

    expect(() => validateEnv()).toThrow(/DATA_ENCRYPTION_KEY.*base64/)
  })

  it('should throw error when DATA_ENCRYPTION_KEY is not 32 bytes', () => {
    process.env.DATA_ENCRYPTION_KEY = Buffer.from('short').toString('base64')

    expect(() => validateEnv()).toThrow(/DATA_ENCRYPTION_KEY.*32 bytes/)
  })

  it('should throw error when ADMIN_API_KEY is missing', () => {
    delete process.env.ADMIN_API_KEY

    expect(() => validateEnv()).toThrow('ADMIN_API_KEY')
  })

  it('should throw error when ADMIN_API_KEY is too short', () => {
    process.env.ADMIN_API_KEY = 'short'

    expect(() => validateEnv()).toThrow(/ADMIN_API_KEY.*16 characters/)
  })

  it('should throw error when UNSUBSCRIBE_SECRET is missing', () => {
    delete process.env.UNSUBSCRIBE_SECRET

    expect(() => validateEnv()).toThrow('UNSUBSCRIBE_SECRET')
  })

  it('should throw error when UNSUBSCRIBE_SECRET is too short', () => {
    process.env.UNSUBSCRIBE_SECRET = 'short'

    expect(() => validateEnv()).toThrow(/UNSUBSCRIBE_SECRET.*32 characters/)
  })

  it('should throw error when UPSTASH_REDIS_REST_URL is missing', () => {
    delete process.env.UPSTASH_REDIS_REST_URL

    expect(() => validateEnv()).toThrow('UPSTASH_REDIS_REST_URL')
  })

  it('should throw error when UPSTASH_REDIS_REST_URL is not a valid URL', () => {
    process.env.UPSTASH_REDIS_REST_URL = 'not-a-url'

    expect(() => validateEnv()).toThrow(/UPSTASH_REDIS_REST_URL.*HTTPS/)
  })

  it('should throw error when UPSTASH_REDIS_REST_URL is not HTTPS', () => {
    process.env.UPSTASH_REDIS_REST_URL = 'http://redis.example.com'

    expect(() => validateEnv()).toThrow(/UPSTASH_REDIS_REST_URL.*HTTPS/)
  })

  it('should throw error when UPSTASH_REDIS_REST_TOKEN is missing', () => {
    delete process.env.UPSTASH_REDIS_REST_TOKEN

    expect(() => validateEnv()).toThrow('UPSTASH_REDIS_REST_TOKEN')
  })

  it('should throw error when UPSTASH_REDIS_REST_TOKEN is too short', () => {
    process.env.UPSTASH_REDIS_REST_TOKEN = 'short'

    expect(() => validateEnv()).toThrow(/UPSTASH_REDIS_REST_TOKEN.*16 characters/)
  })

  it('should collect all validation errors', () => {
    delete process.env.DATA_ENCRYPTION_KEY
    delete process.env.ADMIN_API_KEY
    delete process.env.UNSUBSCRIBE_SECRET
    delete process.env.UPSTASH_REDIS_REST_TOKEN

    expect(() => validateEnv()).toThrow(/4 validation error/)
  })

  it('should provide helpful error message with all missing vars', () => {
    delete process.env.DATA_ENCRYPTION_KEY
    delete process.env.ADMIN_API_KEY

    const error = () => validateEnv()

    expect(error).toThrow('DATA_ENCRYPTION_KEY')
    expect(error).toThrow('ADMIN_API_KEY')
  })
})
