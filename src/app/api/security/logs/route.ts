import { NextRequest, NextResponse } from 'next/server'
import { getSecurityEvents, getEventCounts } from '@/lib/logging'

/**
 * GET /api/security/logs
 * Admin-protected endpoint to view security events
 * Query params:
 *   - days: number of days to look back (default: 7, max: 90)
 */
export async function GET(request: NextRequest) {
  // Admin API key validation
  const apiKey = request.headers.get('x-admin-api-key')
  const expectedKey = process.env.ADMIN_API_KEY

  if (!expectedKey) {
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    )
  }

  if (!apiKey || apiKey !== expectedKey) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams
    let days = parseInt(searchParams.get('days') || '7')

    // Enforce limits
    if (days < 1) days = 1
    if (days > 90) days = 90

    // Generate date range
    const dates: string[] = []
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days + 1)

    for (let i = 0; i < days; i++) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      dates.push(d.toISOString().split('T')[0])
    }

    // Collect events from all dates
    const allEvents = []
    for (const date of dates) {
      const events = await getSecurityEvents(date)
      allEvents.push(...events)
    }

    // Sort events by timestamp (most recent first)
    allEvents.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    })

    // Get event counts
    const counts = await getEventCounts()

    // Return structured response
    return NextResponse.json({
      events: allEvents,
      counts,
      period: {
        days,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      },
    })
  } catch (error) {
    console.error('Security logs fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch security logs' },
      { status: 500 }
    )
  }
}
