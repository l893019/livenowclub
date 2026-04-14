import { NextRequest, NextResponse } from 'next/server';
import { joinUtopia, getUserResult, getUtopia } from '@/lib/utopia';
import { sendJoinNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, userId } = body;

    console.log('[Join Utopia] Request:', { slug, userId });

    if (!slug || !userId) {
      console.log('[Join Utopia] Missing params:', { slug, userId });
      return NextResponse.json(
        { error: 'Missing slug or userId' },
        { status: 400 }
      );
    }

    // Get user's result to get their name and archetype
    const userResult = await getUserResult(userId);
    if (!userResult) {
      console.log('[Join Utopia] User not found:', userId);
      return NextResponse.json(
        { error: 'User not found. Please complete the quiz first.' },
        { status: 404 }
      );
    }

    console.log('[Join Utopia] User found:', {
      id: userResult.id,
      name: userResult.name,
      archetype: userResult.archetype
    });

    const room = await joinUtopia(
      slug,
      userId,
      userResult.name,
      userResult.archetype
    );

    if (!room) {
      console.log('[Join Utopia] Utopia not found:', slug);
      return NextResponse.json(
        { error: 'Utopia not found' },
        { status: 404 }
      );
    }

    console.log('[Join Utopia] Success:', {
      slug: room.slug,
      memberCount: room.members.length,
      members: room.members.map(m => ({ id: m.id, name: m.name }))
    });

    // Send notification email to founder (async, don't block response)
    const founderResult = await getUserResult(room.createdBy);
    if (founderResult?.email && room.createdBy !== userId) {
      console.log('[Join Utopia] Sending notification to founder:', founderResult.email);
      sendJoinNotification({
        toEmail: founderResult.email,
        toName: founderResult.name,
        joinerName: userResult.name,
        joinerArchetype: userResult.archetype,
        utopiaName: room.name,
        utopiaSlug: room.slug,
        joinerId: userId,
        founderId: room.createdBy,
      }).catch(err => {
        console.error('[Join Utopia] Email notification failed:', err);
      });
    }

    return NextResponse.json({
      success: true,
      room,
    });
  } catch (error) {
    console.error('[Join Utopia] Error:', error);
    return NextResponse.json(
      { error: 'Failed to join utopia' },
      { status: 500 }
    );
  }
}
