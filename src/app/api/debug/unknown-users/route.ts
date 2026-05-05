import { NextResponse } from 'next/server';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || '');

export async function GET() {
  try {
    const userKeys = await redis.keys('user:*');
    const actualUserKeys = userKeys.filter(k => !k.includes(':utopias'));

    const archetypeCounts: Record<string, number> = {};
    const unknownUsers = [];

    for (const key of actualUserKeys) {
      try {
        const userData = await redis.get(key);
        if (userData) {
          const user = JSON.parse(userData);
          const archetype = user.archetype || 'missing-archetype';
          archetypeCounts[archetype] = (archetypeCounts[archetype] || 0) + 1;

          // Track users without valid archetypes
          const validArchetypes = ['citizen', 'shaper', 'architect', 'alive', 'friction',
                                   'mender', 'between', 'rooted',
                                   'presence', 'swimmer', 'conscience', 'cleareyed', 'embers', 'unbound'];
          if (!archetype || !validArchetypes.includes(archetype)) {
            unknownUsers.push({
              id: user.id,
              name: user.name,
              archetype: user.archetype,
              email: user.email,
              createdAt: user.createdAt,
              hasAnswers: !!(user.answers && user.answers.length > 0),
              hasScores: !!(user.scores && Object.keys(user.scores).length > 0),
              answers: user.answers?.slice(0, 3) || [] // First 3 answers for debugging
            });
          }
        }
      } catch (e) {
        console.error('Error parsing user:', key);
      }
    }

    return NextResponse.json({
      totalUsers: actualUserKeys.length,
      archetypeCounts: Object.entries(archetypeCounts)
        .sort(([,a], [,b]) => b - a)
        .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {}),
      unknownUsers
    });
  } catch (error) {
    console.error('Error investigating unknown users:', error);
    return NextResponse.json({ error: 'Failed to investigate users' }, { status: 500 });
  }
}
