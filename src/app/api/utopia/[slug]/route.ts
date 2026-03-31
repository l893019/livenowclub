import { NextRequest, NextResponse } from 'next/server';
import { getUtopia } from '@/lib/utopia';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Missing slug' },
        { status: 400 }
      );
    }

    const room = await getUtopia(slug);

    if (!room) {
      return NextResponse.json(
        { error: 'Utopia not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ room });
  } catch (error) {
    console.error('Error getting utopia:', error);
    return NextResponse.json(
      { error: 'Failed to get utopia' },
      { status: 500 }
    );
  }
}
