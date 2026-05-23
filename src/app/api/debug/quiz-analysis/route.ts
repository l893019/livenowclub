import { NextResponse } from 'next/server';
import Redis from 'ioredis';
import { arrayToQuizAnswers, calculateDimensions } from '@/lib/dimensions';
import { getIdentityFromDimensions } from '@/lib/identities';

const redis = new Redis(process.env.REDIS_URL || '');

export async function GET() {
  try {
    // Get all user keys
    const userKeys = await redis.keys('user:*');
    const actualUserKeys = userKeys.filter(k => !k.includes(':utopias'));

    const users = [];

    for (const key of actualUserKeys) {
      try {
        const userData = await redis.get(key);
        if (userData) {
          const user = JSON.parse(userData);
          if (user.answers && user.answers.length > 0) {
            // Calculate identity from answers
            const quizAnswers = arrayToQuizAnswers(user.answers);
            if (!quizAnswers) continue;
            const dimensions = calculateDimensions(quizAnswers);
            const identity = getIdentityFromDimensions(dimensions);

            users.push({
              id: user.id,
              archetype: user.archetype,
              identity: identity?.key || 'unknown',
              identityName: identity?.name || 'Unknown',
              dimensions,
              answers: user.answers,
              scores: user.scores,
              createdAt: user.createdAt,
            });
          }
        }
      } catch (e) {
        console.error('Error parsing user:', key);
      }
    }

    // Calculate distributions
    const archetypeCount: Record<string, number> = {};
    const identityCount: Record<string, number> = {};
    const dimensionScores = {
      agency: [] as number[],
      certainty: [] as number[],
      posture: [] as number[],
    };

    const answerCounts: Record<string, Record<string, number>> = {
      q1: {}, q2: {}, q3: {}, q4: {}, q5: {}, q6: {}, q7: {}
    };

    users.forEach(user => {
      // Count archetypes
      const arch = user.archetype || 'undefined';
      archetypeCount[arch] = (archetypeCount[arch] || 0) + 1;

      // Count identities
      identityCount[user.identity] = (identityCount[user.identity] || 0) + 1;

      // Collect dimension scores
      if (user.dimensions) {
        dimensionScores.agency.push(user.dimensions.agency);
        dimensionScores.certainty.push(user.dimensions.certainty);
        dimensionScores.posture.push(user.dimensions.posture);
      }

      // Count answers
      user.answers.forEach((answer: string, idx: number) => {
        const qKey = `q${idx + 1}`;
        if (answerCounts[qKey]) {
          answerCounts[qKey][answer] = (answerCounts[qKey][answer] || 0) + 1;
        }
      });
    });

    // Calculate statistics
    const calculateStats = (arr: number[]) => {
      if (arr.length === 0) return { mean: 0, median: 0, std: 0 };
      const sorted = [...arr].sort((a, b) => a - b);
      const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
      const median = sorted[Math.floor(sorted.length / 2)];
      const variance = arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
      const std = Math.sqrt(variance);
      return { mean, median, std, min: sorted[0], max: sorted[sorted.length - 1] };
    };

    return NextResponse.json({
      totalUsers: users.length,
      archetypeDistribution: Object.entries(archetypeCount)
        .sort(([, a], [, b]) => b - a)
        .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {}),
      identityDistribution: Object.entries(identityCount)
        .sort(([, a], [, b]) => b - a)
        .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {}),
      dimensionStats: {
        agency: calculateStats(dimensionScores.agency),
        certainty: calculateStats(dimensionScores.certainty),
        posture: calculateStats(dimensionScores.posture),
      },
      answerDistribution: answerCounts,
      sampleUsers: users.slice(0, 5).map(u => ({
        identity: u.identity,
        identityName: u.identityName,
        archetype: u.archetype,
        dimensions: u.dimensions,
        answers: u.answers,
      })),
    });
  } catch (error) {
    console.error('Error analyzing quiz data:', error);
    return NextResponse.json({ error: 'Failed to analyze quiz data' }, { status: 500 });
  }
}
