import { NextRequest, NextResponse } from 'next/server';
import { createConnection } from '@/lib/connections';
import { getUserResult } from '@/lib/utopia';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, connectWithUserId } = body;

    if (!userId || !connectWithUserId) {
      return NextResponse.json(
        { error: 'Missing userId or connectWithUserId' },
        { status: 400 }
      );
    }

    // Verify both users exist
    const userA = await getUserResult(userId);
    const userB = await getUserResult(connectWithUserId);

    if (!userA || !userB) {
      return NextResponse.json(
        { error: 'One or both users not found' },
        { status: 404 }
      );
    }

    // Create mutual connection
    const connection = await createConnection(userId, connectWithUserId);

    return NextResponse.json({
      success: true,
      connection,
    });
  } catch (error) {
    console.error('Error creating connection:', error);
    return NextResponse.json(
      { error: 'Failed to create connection' },
      { status: 500 }
    );
  }
}
