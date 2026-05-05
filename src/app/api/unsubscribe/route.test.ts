import { POST } from './route'
import { NextRequest } from 'next/server'
import { redis } from '@/lib/redis'
import { signUnsubscribeToken } from '@/lib/tokens'

jest.mock('@/lib/redis', () => ({
  redis: {
    sadd: jest.fn(),
  },
}))

jest.mock('@/lib/tokens', () => ({
  signUnsubscribeToken: jest.fn(),
  verifyUnsubscribeToken: jest.fn(),
}))

jest.mock('@/lib/logging', () => ({
  logSecurityEvent: jest.fn(),
}))

describe('POST /api/unsubscribe', () => {
  const originalEnv = process.env.UNSUBSCRIBE_SECRET

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.UNSUBSCRIBE_SECRET = 'test-secret-key-at-least-32-characters-long'
  })

  afterEach(() => {
    process.env.UNSUBSCRIBE_SECRET = originalEnv
  })

  it('should return 400 when email is missing', async () => {
    const request = new NextRequest('http://localhost:3000/api/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({}),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Missing email parameter')
  })

  it('should return 400 when token is missing', async () => {
    const request = new NextRequest('http://localhost:3000/api/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Missing token parameter')
  })

  it('should return 401 when token is invalid', async () => {
    const { verifyUnsubscribeToken } = require('@/lib/tokens')
    ;(verifyUnsubscribeToken as jest.Mock).mockReturnValue(null)

    const request = new NextRequest('http://localhost:3000/api/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        token: 'invalid-token'
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.error).toBe('Invalid or expired token')
  })

  it('should return 401 when token email does not match', async () => {
    const { verifyUnsubscribeToken } = require('@/lib/tokens')
    ;(verifyUnsubscribeToken as jest.Mock).mockReturnValue('other@example.com')

    const request = new NextRequest('http://localhost:3000/api/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        token: 'valid-token'
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.error).toBe('Token does not match email')
  })

  it('should unsubscribe email when token is valid', async () => {
    const { verifyUnsubscribeToken } = require('@/lib/tokens')
    ;(verifyUnsubscribeToken as jest.Mock).mockReturnValue('test@example.com')
    ;(redis.sadd as jest.Mock).mockResolvedValue(1)

    const request = new NextRequest('http://localhost:3000/api/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        token: 'valid-token'
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.message).toContain('unsubscribed')
    expect(redis.sadd).toHaveBeenCalledWith('unsubscribed', 'test@example.com')
  })

  it('should normalize email to lowercase', async () => {
    const { verifyUnsubscribeToken } = require('@/lib/tokens')
    ;(verifyUnsubscribeToken as jest.Mock).mockReturnValue('TEST@EXAMPLE.COM')
    ;(redis.sadd as jest.Mock).mockResolvedValue(1)

    const request = new NextRequest('http://localhost:3000/api/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({
        email: 'TEST@EXAMPLE.COM',
        token: 'valid-token'
      }),
    })

    const response = await POST(request)

    expect(response.status).toBe(200)
    expect(redis.sadd).toHaveBeenCalledWith('unsubscribed', 'test@example.com')
  })

  it('should return 500 on Redis error', async () => {
    const { verifyUnsubscribeToken } = require('@/lib/tokens')
    ;(verifyUnsubscribeToken as jest.Mock).mockReturnValue('test@example.com')
    ;(redis.sadd as jest.Mock).mockRejectedValue(new Error('Redis error'))

    const request = new NextRequest('http://localhost:3000/api/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        token: 'valid-token'
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Something went wrong')
  })
})
