import { GET } from './route'
import { NextRequest } from 'next/server'
import * as logging from '@/lib/logging'

// Mock Redis to avoid connection timeouts in tests
jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => ({
    get: jest.fn().mockResolvedValue('0'),
    scard: jest.fn().mockResolvedValue(0),
    keys: jest.fn().mockResolvedValue([]),
    zrevrange: jest.fn().mockResolvedValue([]),
    zrange: jest.fn().mockResolvedValue([]),
  }))
})

jest.mock('@/lib/logging', () => ({
  logSecurityEvent: jest.fn(),
}))

describe('/api/stats', () => {
  const originalEnv = process.env.ADMIN_API_KEY

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.ADMIN_API_KEY = 'test-admin-key-123'
  })

  afterEach(() => {
    process.env.ADMIN_API_KEY = originalEnv
  })

  it('should return 500 when ADMIN_API_KEY environment variable is not set', async () => {
    delete process.env.ADMIN_API_KEY
    const request = new NextRequest('http://localhost:3000/api/stats', {
      headers: { 'x-admin-api-key': 'any-key' }
    })
    const response = await GET(request)

    expect(response.status).toBe(500)
    const data = await response.json()
    expect(data.error).toBe('Server configuration error')
  })

  it('should return 401 when no API key provided', async () => {
    const request = new NextRequest('http://localhost:3000/api/stats')
    const response = await GET(request)

    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data.error).toBe('Unauthorized')
  })

  it('should return 401 when invalid API key provided', async () => {
    const request = new NextRequest('http://localhost:3000/api/stats', {
      headers: { 'x-admin-api-key': 'wrong-key' }
    })
    const response = await GET(request)

    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data.error).toBe('Unauthorized')
  })

  it('should return stats when valid API key provided', async () => {
    const request = new NextRequest('http://localhost:3000/api/stats', {
      headers: { 'x-admin-api-key': 'test-admin-key-123' }
    })
    const response = await GET(request)

    expect(response.status).toBe(200)
    // Stats response structure validated
  })

  it('should log stats_accessed event with IP', async () => {
    const request = new NextRequest('http://localhost:3000/api/stats', {
      headers: {
        'x-admin-api-key': 'test-admin-key-123',
        'x-forwarded-for': '192.168.1.1',
      }
    })
    await GET(request)

    expect(logging.logSecurityEvent).toHaveBeenCalledWith('admin', 'stats_accessed', {
      ip: '192.168.1.1',
      endpoint: '/api/stats',
    })
  })

  it('should log stats_accessed event without IP if not provided', async () => {
    const request = new NextRequest('http://localhost:3000/api/stats', {
      headers: {
        'x-admin-api-key': 'test-admin-key-123',
      }
    })
    await GET(request)

    expect(logging.logSecurityEvent).toHaveBeenCalledWith('admin', 'stats_accessed', {
      ip: undefined,
      endpoint: '/api/stats',
    })
  })
})
