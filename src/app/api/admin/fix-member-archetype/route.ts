import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || '');

// Quick fix endpoint to correct a member's archetype in a utopia
// DELETE THIS AFTER USE
export async function POST(request: NextRequest) {
  try {
    const { slug, memberId, newArchetype, secret } = await request.json();

    // Simple secret check
    if (secret !== 'fix-louise-2026') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get utopia
    const data = await redis.get(`utopia:${slug}`);
    if (!data) {
      return NextResponse.json({ error: 'Utopia not found' }, { status: 404 });
    }

    const utopia = JSON.parse(data);

    // Find and update member
    const member = utopia.members.find((m: { id: string }) => m.id === memberId);
    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    const oldArchetype = member.archetype;
    member.archetype = newArchetype;

    // Save
    await redis.set(`utopia:${slug}`, JSON.stringify(utopia));

    return NextResponse.json({
      success: true,
      message: `Updated ${member.name} from ${oldArchetype} to ${newArchetype}`,
      utopia,
    });
  } catch (error) {
    console.error('Fix error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
