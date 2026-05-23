import { NextResponse } from 'next/server';
import Redis from 'ioredis';
import { arrayToQuizAnswers, calculateDimensions } from '@/lib/dimensions';
import { getIdentityFromDimensions } from '@/lib/identities';

const redis = new Redis(process.env.REDIS_URL || '');

export async function GET() {
  try {
    const userKeys = await redis.keys('user:*');
    const actualUserKeys = userKeys.filter(k => !k.includes(':utopias'));

    const users: Array<{
      id: string;
      agency: number;
      certainty: number;
      posture: number;
      identity: string;
      identityName: string;
      noun: string;
      adjective: string;
      quadrant: string;
    }> = [];

    for (const key of actualUserKeys) {
      try {
        const userData = await redis.get(key);
        if (userData) {
          const user = JSON.parse(userData);
          if (user.answers && user.answers.length > 0) {
            const quizAnswers = arrayToQuizAnswers(user.answers);
            if (!quizAnswers) continue;
            const dimensions = calculateDimensions(quizAnswers);
            const identity = getIdentityFromDimensions(dimensions);

            users.push({
              id: user.id,
              agency: dimensions.agency,
              certainty: dimensions.certainty,
              posture: dimensions.posture,
              identity: identity?.key || 'unknown',
              identityName: identity?.name || 'Unknown',
              noun: identity?.noun || 'unknown',
              adjective: identity?.adjective || 'unknown',
              quadrant: identity?.quadrant || 'unknown',
            });
          }
        }
      } catch (e) {
        console.error('Error parsing user:', key);
      }
    }

    // Calculate identity centroids for label positioning
    const identityGroups: Record<string, { agency: number[], posture: number[], certainty: number[] }> = {};

    users.forEach(user => {
      if (!identityGroups[user.identity]) {
        identityGroups[user.identity] = { agency: [], posture: [], certainty: [] };
      }
      identityGroups[user.identity].agency.push(user.agency);
      identityGroups[user.identity].posture.push(user.posture);
      identityGroups[user.identity].certainty.push(user.certainty);
    });

    const identityCentroids = Object.entries(identityGroups).map(([identity, coords]) => ({
      identity,
      identityName: users.find(u => u.identity === identity)?.identityName || identity,
      count: coords.agency.length,
      centroid: {
        agency: coords.agency.reduce((a, b) => a + b, 0) / coords.agency.length,
        posture: coords.posture.reduce((a, b) => a + b, 0) / coords.posture.length,
        certainty: coords.certainty.reduce((a, b) => a + b, 0) / coords.certainty.length,
      }
    })).sort((a, b) => b.count - a.count);

    return NextResponse.json({
      users,
      identityCentroids,
      metadata: {
        totalUsers: users.length,
        uniqueIdentities: identityCentroids.length,
        axisLabels: {
          x: { min: 'Witness', max: 'Builder', label: 'Agency' },
          y: { min: 'Protective', max: 'Expansive', label: 'Posture' },
          color: { min: 'Seeking', max: 'Settled', label: 'Certainty' }
        },
        quadrants: [
          { name: 'Open', x: 'low', y: 'high', description: 'Seeking + Expansive' },
          { name: 'Poised/Driven', x: 'high', y: 'high', description: 'Settled + Expansive' },
          { name: 'Thoughtful', x: 'low', y: 'low', description: 'Seeking + Protective' },
          { name: 'Grounded', x: 'high', y: 'low', description: 'Settled + Protective' }
        ]
      }
    });

  } catch (error) {
    console.error('Error in viz data:', error);
    return NextResponse.json({ error: 'Failed to generate viz data' }, { status: 500 });
  }
}
