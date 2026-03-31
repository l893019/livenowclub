import { NextRequest, NextResponse } from 'next/server';
import { leaveUtopia } from '@/lib/utopia';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, userId } = body;

    if (!slug || !userId) {
      return NextResponse.json(
        { error: 'Missing slug or userId' },
        { status: 400 }
      );
    }

    const success = await leaveUtopia(slug, userId);

    if (!success) {
      return NextResponse.json(
        { error: 'Utopia not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error leaving utopia:', error);
    return NextResponse.json(
      { error: 'Failed to leave utopia' },
      { status: 500 }
    );
  }
}
