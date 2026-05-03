import { NextRequest, NextResponse } from 'next/server';
import { getUserResult } from '@/lib/utopia';
import { arrayToQuizAnswers, calculateDimensions } from '@/lib/dimensions';
import { getAdjectiveIndex, getIdentityFromDimensions } from '@/lib/identities';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
  }

  try {
    const user = await getUserResult(userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const answers = user.answers;

    if (!answers || !Array.isArray(answers) || answers.length !== 7) {
      return NextResponse.json({
        error: 'Invalid answers',
        answers,
        user,
      }, { status: 400 });
    }

    const quizAnswers = arrayToQuizAnswers(answers);

    if (!quizAnswers) {
      return NextResponse.json({
        error: 'Could not convert answers',
        answers,
      }, { status: 400 });
    }

    const dims = calculateDimensions(quizAnswers);
    const adjIdx = getAdjectiveIndex(dims.certainty, dims.posture);
    const combinedIntensity = (Math.abs(dims.certainty) + Math.abs(dims.posture)) / 2;
    const identity = getIdentityFromDimensions(dims.agency, dims.certainty, dims.posture, adjIdx);

    return NextResponse.json({
      userId,
      user: {
        name: user.name,
        archetype: user.archetype,
      },
      answers,
      quizAnswers,
      dimensions: dims,
      adjIdx,
      combinedIntensity,
      identity: identity ? {
        key: identity.key,
        name: identity.name,
        adjective: identity.adjective,
        noun: identity.noun,
      } : null,
    });
  } catch (error) {
    console.error('Debug identity error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
