import { GET } from './route'
import { NextRequest } from 'next/server'
import * as logging from '@/lib/logging'

jest.mock('@/lib/logging', () => ({
  getSecurityEvents: jest.fn(),
  getEventCounts: jest.fn(),
}))

describe('GET /api/security/logs', () => {
  const originalEnv = process.env.ADMIN_API_KEY

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.ADMIN_API_KEY = 'test-admin-key-123'
  })

  afterEach(() => {
    process.env.ADMIN_API_KEY = originalEnv
  })

  it('should return 500 when ADMIN_API_KEY not configured', async () => {
    delete process.env.ADMIN_API_KEY

    const request = new NextRequest('http://localhost:3000/api/security/logs', {
      headers: { 'x-admin-api-key': 'some-key' }
    })

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Server configuration error')
  })

  it('should return 401 when no API key provided', async () => {
    const request = new NextRequest('http://localhost:3000/api/security/logs')

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.error).toBe('Unauthorized')
  })

  it('should return 401 when wrong API key provided', async () => {
    const request = new NextRequest('http://localhost:3000/api/security/logs', {
      headers: { 'x-admin-api-key': 'wrong-key' }
    })

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.error).toBe('Unauthorized')
  })

  it('should return security logs for past 7 days by default', async () => {
    const mockEvents = [
      { type: 'auth', action: 'session_created', timestamp: '2025-01-01T12:00:00Z', metadata: {} },
      { type: 'ratelimit', action: 'limit_exceeded', timestamp: '2025-01-01T13:00:00Z', metadata: {} },
    ]
    const mockCounts = {
      'auth:session_created': 10,
      'ratelimit:limit_exceeded': 5,
    }

    ;(logging.getSecurityEvents as jest.Mock).mockResolvedValue(mockEvents)
    ;(logging.getEventCounts as jest.Mock).mockResolvedValue(mockCounts)

    const request = new NextRequest('http://localhost:3000/api/security/logs', {
      headers: { 'x-admin-api-key': 'test-admin-key-123' }
    })

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('events')
    expect(data).toHaveProperty('counts')
    expect(data).toHaveProperty('period')
    expect(data.period.days).toBe(7)
  })

  it('should return security logs for custom number of days', async () => {
    const mockEvents = []
    const mockCounts = {}

    ;(logging.getSecurityEvents as jest.Mock).mockResolvedValue(mockEvents)
    ;(logging.getEventCounts as jest.Mock).mockResolvedValue(mockCounts)

    const request = new NextRequest('http://localhost:3000/api/security/logs?days=30', {
      headers: { 'x-admin-api-key': 'test-admin-key-123' }
    })

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.period.days).toBe(30)
  })

  it('should limit days to 90 maximum', async () => {
    const mockEvents = []
    const mockCounts = {}

    ;(logging.getSecurityEvents as jest.Mock).mockResolvedValue(mockEvents)
    ;(logging.getEventCounts as jest.Mock).mockResolvedValue(mockCounts)

    const request = new NextRequest('http://localhost:3000/api/security/logs?days=200', {
      headers: { 'x-admin-api-key': 'test-admin-key-123' }
    })

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.period.days).toBe(90)
  })

  it('should aggregate events from multiple days', async () => {
    ;(logging.getSecurityEvents as jest.Mock).mockImplementation((date: string) => {
      if (date.endsWith('01')) {
        return Promise.resolve([{ type: 'auth', action: 'login', timestamp: date, metadata: {} }])
      }
      return Promise.resolve([])
    })
    ;(logging.getEventCounts as jest.Mock).mockResolvedValue({ 'auth:login': 3 })

    const request = new NextRequest('http://localhost:3000/api/security/logs?days=3', {
      headers: { 'x-admin-api-key': 'test-admin-key-123' }
    })

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(logging.getSecurityEvents).toHaveBeenCalledTimes(3)
  })

  it('should return proper date range in period info', async () => {
    ;(logging.getSecurityEvents as jest.Mock).mockResolvedValue([])
    ;(logging.getEventCounts as jest.Mock).mockResolvedValue({})

    const request = new NextRequest('http://localhost:3000/api/security/logs?days=7', {
      headers: { 'x-admin-api-key': 'test-admin-key-123' }
    })

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.period).toHaveProperty('startDate')
    expect(data.period).toHaveProperty('endDate')
    expect(data.period).toHaveProperty('days')
  })
})
