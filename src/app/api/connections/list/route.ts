import { NextRequest, NextResponse } from 'next/server';
import { getUserConnections, getOtherUserId } from '@/lib/connections';
import { getUserResult } from '@/lib/utopia';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      );
    }

    const connections = await getUserConnections(userId);

    // Enrich with other user data
    const enrichedConnections = await Promise.all(
      connections.map(async (conn) => {
        const otherUserId = getOtherUserId(conn, userId);
        const otherUser = await getUserResult(otherUserId);
        return {
          ...conn,
          otherUser: otherUser || { id: otherUserId, name: 'Unknown' },
        };
      })
    );

    return NextResponse.json({
      success: true,
      connections: enrichedConnections,
    });
  } catch (error) {
    console.error('Error fetching connections:', error);
    return NextResponse.json(
      { error: 'Failed to fetch connections' },
      { status: 500 }
    );
  }
}
