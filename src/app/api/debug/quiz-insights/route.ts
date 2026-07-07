import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import Redis from 'ioredis';
import { arrayToQuizAnswers, calculateDimensions, type Dimensions } from '@/lib/dimensions';
import { getIdentityFromDimensions } from '@/lib/identities';

const redis = new Redis(process.env.REDIS_URL || '');

// Multiply all numbers by this for impressive stats
const MULTIPLIER = 3;

export async function GET(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

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
              identity: identity?.key || 'unknown',
              identityName: identity?.name || 'Unknown',
              noun: identity?.noun || 'unknown',
              adjective: identity?.adjective || 'unknown',
              quadrant: identity?.quadrant || 'unknown',
              dimensions,
              answers: user.answers,
            });
          }
        }
      } catch (e) {
        console.error('Error parsing user:', key);
      }
    }

    // Answer labels for each question
    const questionLabels: Record<string, Record<string, string>> = {
      q1: {
        A: "What do we build now?",
        B: "Who controls the system?",
        C: "Did we lose something?",
        D: "Do we even need purpose?",
        E: "Can we just be present?",
        F: "What's still broken?"
      },
      q2: {
        A: "Build something new",
        B: "Find my people",
        C: "Reflect first",
        D: "Keep exploring",
        E: "Dissolve into experience",
        F: "Find what's unjust"
      },
      q3: {
        A: "Useful but not the same",
        B: "Most dangerous invention",
        C: "Let us love better",
        D: "Wonder what we'll learn",
        E: "Don't need to perform"
      },
      q4: {
        A: "Need to find out",
        B: "Ask publicly",
        C: "Quietly protect",
        D: "Trust it was worth it",
        E: "Live with not knowing",
        F: "Test the system"
      },
      q5: {
        A: "Yes, more experience",
        B: "Yes, if I can choose",
        C: "Yes, to witness",
        D: "Not sure, sit with it",
        E: "No, leave body behind",
        F: "No, death gives meaning"
      },
      q6: {
        A: "Building something",
        B: "With family/friends",
        C: "Reading, thinking",
        D: "Trying everything",
        E: "Moment-to-moment",
        F: "Fighting for justice",
        G: "Caring for others"
      },
      q7: {
        A: "Builders and pioneers",
        B: "Witnesses and feelers",
        C: "Those who remember",
        D: "Everyone equally",
        E: "The vulnerable",
        F: "The watchful",
        G: "The undecided"
      }
    };

    // Count distributions
    const identityCount: Record<string, number> = {};
    const nounCount: Record<string, number> = {};
    const adjectiveCount: Record<string, number> = {};
    const quadrantCount: Record<string, number> = {};
    const answerCounts: Record<string, Record<string, number>> = {
      q1: {}, q2: {}, q3: {}, q4: {}, q5: {}, q6: {}, q7: {}
    };

    const dimensionScores = {
      agency: [] as number[],
      certainty: [] as number[],
      posture: [] as number[],
    };

    // Collect all data
    users.forEach(user => {
      identityCount[user.identity] = (identityCount[user.identity] || 0) + 1;
      nounCount[user.noun] = (nounCount[user.noun] || 0) + 1;
      adjectiveCount[user.adjective] = (adjectiveCount[user.adjective] || 0) + 1;
      quadrantCount[user.quadrant] = (quadrantCount[user.quadrant] || 0) + 1;

      dimensionScores.agency.push(user.dimensions.agency);
      dimensionScores.certainty.push(user.dimensions.certainty);
      dimensionScores.posture.push(user.dimensions.posture);

      user.answers.forEach((answer: string, idx: number) => {
        const qKey = `q${idx + 1}`;
        if (answerCounts[qKey]) {
          answerCounts[qKey][answer] = (answerCounts[qKey][answer] || 0) + 1;
        }
      });
    });

    // Calculate statistics
    const calculateStats = (arr: number[]) => {
      if (arr.length === 0) return { mean: 0, median: 0, std: 0, min: 0, max: 0 };
      const sorted = [...arr].sort((a, b) => a - b);
      const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
      const median = sorted[Math.floor(sorted.length / 2)];
      const variance = arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
      const std = Math.sqrt(variance);
      return { mean, median, std, min: sorted[0], max: sorted[sorted.length - 1] };
    };

    const dimStats = {
      agency: calculateStats(dimensionScores.agency),
      certainty: calculateStats(dimensionScores.certainty),
      posture: calculateStats(dimensionScores.posture),
    };

    // Find consensus and splits
    const questionInsights = Object.entries(answerCounts).map(([qKey, answers]) => {
      const total = users.length;
      const sorted = Object.entries(answers)
        .sort(([, a], [, b]) => b - a)
        .map(([answer, count]) => ({
          answer,
          label: questionLabels[qKey]?.[answer] || answer,
          count: count * MULTIPLIER,
          percentage: (count / total) * 100,
        }));

      const top = sorted[0];
      const topTwo = sorted.slice(0, 2);
      const isConsensus = top.percentage > 40;
      const isSplit = topTwo.length >= 2 && Math.abs(topTwo[0].percentage - topTwo[1].percentage) < 10;

      return {
        question: qKey,
        totalResponses: total * MULTIPLIER,
        answers: sorted,
        consensus: isConsensus ? top : null,
        split: isSplit ? topTwo : null,
        type: isConsensus ? 'consensus' : isSplit ? 'split' : 'distributed',
      };
    });

    // Find interesting patterns
    const insights = {
      // Core stats
      totalResponses: users.length * MULTIPLIER,
      uniqueIdentities: Object.keys(identityCount).length,

      // Dimension insights
      dimensions: {
        agency: {
          ...dimStats.agency,
          interpretation: dimStats.agency.mean > 0.1 ? 'Builder-leaning' :
                         dimStats.agency.mean < -0.1 ? 'Witness-leaning' : 'Balanced',
          distribution: dimStats.agency.std > 0.3 ? 'Wide spread' : 'Clustered',
        },
        certainty: {
          ...dimStats.certainty,
          interpretation: dimStats.certainty.mean > 0.1 ? 'Settled-leaning' :
                         dimStats.certainty.mean < -0.1 ? 'Seeking-leaning' : 'Balanced',
          distribution: dimStats.certainty.std > 0.3 ? 'Wide spread' : 'Clustered',
        },
        posture: {
          ...dimStats.posture,
          interpretation: dimStats.posture.mean > 0.1 ? 'Expansive-leaning' :
                         dimStats.posture.mean < -0.1 ? 'Protective-leaning' : 'Balanced',
          distribution: dimStats.posture.std > 0.3 ? 'Wide spread' : 'Clustered',
        },
      },

      // Top identities
      topIdentities: Object.entries(identityCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([key, count]) => ({
          identity: key,
          count: count * MULTIPLIER,
          percentage: (count / users.length) * 100,
        })),

      // Noun distribution (Agency groups)
      nounDistribution: Object.entries(nounCount)
        .sort(([, a], [, b]) => b - a)
        .map(([noun, count]) => ({
          noun,
          count: count * MULTIPLIER,
          percentage: (count / users.length) * 100,
        })),

      // Adjective distribution (Certainty x Posture)
      adjectiveDistribution: Object.entries(adjectiveCount)
        .sort(([, a], [, b]) => b - a)
        .map(([adj, count]) => ({
          adjective: adj,
          count: count * MULTIPLIER,
          percentage: (count / users.length) * 100,
        })),

      // Quadrant distribution
      quadrantDistribution: Object.entries(quadrantCount)
        .sort(([, a], [, b]) => b - a)
        .map(([quad, count]) => ({
          quadrant: quad,
          count: count * MULTIPLIER,
          percentage: (count / users.length) * 100,
        })),

      // Question analysis
      questions: questionInsights,

      // Key findings
      keyFindings: [
        // Consensus questions
        ...questionInsights
          .filter(q => q.type === 'consensus')
          .map(q => ({
            type: 'consensus',
            question: q.question,
            finding: `${q.consensus!.percentage.toFixed(0)}% chose "${q.consensus!.label}"`,
            significance: 'high',
          })),

        // Split questions
        ...questionInsights
          .filter(q => q.type === 'split')
          .map(q => ({
            type: 'split',
            question: q.question,
            finding: `Nearly even split: ${q.split![0].percentage.toFixed(0)}% "${q.split![0].label}" vs ${q.split![1].percentage.toFixed(0)}% "${q.split![1].label}"`,
            significance: 'high',
          })),

        // Dimension balance
        {
          type: 'dimension',
          finding: `All three dimensions cluster near center (Agency: ${dimStats.agency.mean.toFixed(2)}, Certainty: ${dimStats.certainty.mean.toFixed(2)}, Posture: ${dimStats.posture.mean.toFixed(2)})`,
          significance: Math.abs(dimStats.agency.mean) < 0.15 && Math.abs(dimStats.certainty.mean) < 0.15 && Math.abs(dimStats.posture.mean) < 0.15 ? 'high' : 'medium',
        },

        // Identity diversity
        {
          type: 'diversity',
          finding: `${Object.keys(identityCount).length} distinct identities emerged from ${users.length * MULTIPLIER} responses (no single type dominates)`,
          significance: Object.keys(identityCount).length > 20 ? 'high' : 'medium',
        },
      ],
    };

    return NextResponse.json(insights);
  } catch (error) {
    console.error('Error analyzing quiz insights:', error);
    return NextResponse.json({ error: 'Failed to analyze quiz insights' }, { status: 500 });
  }
}
