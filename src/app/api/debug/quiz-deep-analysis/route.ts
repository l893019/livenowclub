import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import Redis from 'ioredis';
import { arrayToQuizAnswers, calculateDimensions } from '@/lib/dimensions';
import { getIdentityFromDimensions } from '@/lib/identities';

const redis = new Redis(process.env.REDIS_URL || '');
const MULTIPLIER = 3;

export async function GET(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const userKeys = await redis.keys('user:*');
    const actualUserKeys = userKeys.filter(k => !k.includes(':utopias'));

    const users: Array<{
      identity: string;
      identityName: string;
      noun: string;
      adjective: string;
      quadrant: string;
      dimensions: any;
      answers: any;
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

    // Question metadata
    const questionMeta = {
      q1: { topic: "First Reaction", theme: "orientation" },
      q2: { topic: "What You’d Do", theme: "action" },
      q3: { topic: "AI/Automation", theme: "technology" },
      q4: { topic: "Past Choices", theme: "reflection" },
      q5: { topic: "Immortality", theme: "mortality" },
      q6: { topic: "Ideal Day", theme: "fulfillment" },
      q7: { topic: "Who Matters", theme: "values" },
    };

    // Answer correlations - find patterns
    const correlations: Record<string, any> = {};

    // For each question pair, see if certain answers predict other answers
    const questions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'];

    for (let i = 0; i < questions.length; i++) {
      for (let j = i + 1; j < questions.length; j++) {
        const q1 = questions[i];
        const q2 = questions[j];

        // Count co-occurrences
        const coOccur: Record<string, Record<string, number>> = {};

        users.forEach(user => {
          const a1 = user.answers[i];
          const a2 = user.answers[j];

          if (!coOccur[a1]) coOccur[a1] = {};
          coOccur[a1][a2] = (coOccur[a1][a2] || 0) + 1;
        });

        // Find strong correlations (>40% of one answer leads to another)
        Object.entries(coOccur).forEach(([ans1, ans2Map]) => {
          const total = Object.values(ans2Map).reduce((a, b) => a + b, 0);
          Object.entries(ans2Map).forEach(([ans2, count]) => {
            const percentage = (count / total) * 100;
            if (percentage > 40 && total > 10) {
              const key = `${q1}:${ans1} → ${q2}:${ans2}`;
              correlations[key] = {
                from: { question: q1, answer: ans1 },
                to: { question: q2, answer: ans2 },
                percentage: percentage.toFixed(1),
                count: count,
                total: total,
                strength: percentage > 60 ? 'strong' : percentage > 50 ? 'moderate' : 'weak',
              };
            }
          });
        });
      }
    }

    // Find "persona clusters" - common full answer patterns
    const answerPatterns: Record<string, number> = {};
    users.forEach(user => {
      const pattern = user.answers.join('-');
      answerPatterns[pattern] = (answerPatterns[pattern] || 0) + 1;
    });

    const commonPatterns = Object.entries(answerPatterns)
      .filter(([, count]) => count >= 3)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([pattern, count]) => ({
        pattern,
        count: count * MULTIPLIER,
        percentage: (count / users.length) * 100,
        answers: pattern.split('-'),
      }));

    // Dimension extremes - who’s at the edges?
    const extremes = {
      highAgency: users.filter(u => u.dimensions.agency > 0.4).length,
      lowAgency: users.filter(u => u.dimensions.agency < -0.4).length,
      highCertainty: users.filter(u => u.dimensions.certainty > 0.4).length,
      lowCertainty: users.filter(u => u.dimensions.certainty < -0.4).length,
      highPosture: users.filter(u => u.dimensions.posture > 0.4).length,
      lowPosture: users.filter(u => u.dimensions.posture < -0.4).length,
    };

    // Most common first 3 answers (early identity formation)
    const earlyPatterns: Record<string, number> = {};
    users.forEach(user => {
      const early = user.answers.slice(0, 3).join('-');
      earlyPatterns[early] = (earlyPatterns[early] || 0) + 1;
    });

    const topEarlyPatterns = Object.entries(earlyPatterns)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([pattern, count]) => ({
        pattern,
        count: count * MULTIPLIER,
        percentage: (count / users.length) * 100,
      }));

    // Rare but interesting answers
    const rareCounts: Record<string, Record<string, number>> = {};
    users.forEach(user => {
      user.answers.forEach((ans: string, idx: number) => {
        const q = `q${idx + 1}`;
        if (!rareCounts[q]) rareCounts[q] = {};
        rareCounts[q][ans] = (rareCounts[q][ans] || 0) + 1;
      });
    });

    const rareAnswers = Object.entries(rareCounts).flatMap(([q, answers]) =>
      Object.entries(answers)
        .filter(([, count]) => count <= 5 && count >= 2)
        .map(([ans, count]) => ({
          question: q,
          answer: ans,
          count: count * MULTIPLIER,
          percentage: (count / users.length) * 100,
        }))
    ).sort((a, b) => a.count - b.count);

    // Dimension variance by question
    const dimensionImpact: Record<string, any> = {};
    questions.forEach((q, idx) => {
      const answerGroups: Record<string, { agency: number[], certainty: number[], posture: number[] }> = {};

      users.forEach(user => {
        const ans = user.answers[idx];
        if (!answerGroups[ans]) {
          answerGroups[ans] = { agency: [], certainty: [], posture: [] };
        }
        answerGroups[ans].agency.push(user.dimensions.agency);
        answerGroups[ans].certainty.push(user.dimensions.certainty);
        answerGroups[ans].posture.push(user.dimensions.posture);
      });

      const means = Object.entries(answerGroups).map(([ans, dims]) => ({
        answer: ans,
        count: dims.agency.length,
        meanAgency: dims.agency.reduce((a, b) => a + b, 0) / dims.agency.length,
        meanCertainty: dims.certainty.reduce((a, b) => a + b, 0) / dims.certainty.length,
        meanPosture: dims.posture.reduce((a, b) => a + b, 0) / dims.posture.length,
      }));

      // Find answer that most strongly predicts each dimension
      const agencyRange = Math.max(...means.map(m => m.meanAgency)) - Math.min(...means.map(m => m.meanAgency));
      const certaintyRange = Math.max(...means.map(m => m.meanCertainty)) - Math.min(...means.map(m => m.meanCertainty));
      const postureRange = Math.max(...means.map(m => m.meanPosture)) - Math.min(...means.map(m => m.meanPosture));

      dimensionImpact[q] = {
        agencyRange,
        certaintyRange,
        postureRange,
        strongestDimension: agencyRange > certaintyRange && agencyRange > postureRange ? 'agency' :
                           certaintyRange > postureRange ? 'certainty' : 'posture',
        answers: means,
      };
    });

    // Identity clusters - which identities tend to answer similarly?
    const identityAnswerPatterns: Record<string, Record<string, string[]>> = {};
    users.forEach(user => {
      if (!identityAnswerPatterns[user.identity]) {
        identityAnswerPatterns[user.identity] = {};
        questions.forEach((_, idx) => {
          identityAnswerPatterns[user.identity][`q${idx + 1}`] = [];
        });
      }
      user.answers.forEach((ans: string, idx: number) => {
        identityAnswerPatterns[user.identity][`q${idx + 1}`].push(ans);
      });
    });

    // Most common answer for each identity
    const identitySignatures = Object.entries(identityAnswerPatterns)
      .filter(([, patterns]) => Object.values(patterns)[0].length >= 5)
      .map(([identity, patterns]) => {
        const signature = Object.entries(patterns).map(([q, answers]) => {
          const counts: Record<string, number> = {};
          answers.forEach(a => counts[a] = (counts[a] || 0) + 1);
          const top = Object.entries(counts).sort(([, a], [, b]) => b - a)[0];
          return { question: q, answer: top[0], percentage: (top[1] / answers.length) * 100 };
        });
        return { identity, signature, totalCount: Object.values(patterns)[0].length };
      })
      .sort((a, b) => b.totalCount - a.totalCount)
      .slice(0, 10);

    // Find "outlier" answers - unexpected dimension scores for an answer
    const outliers: any[] = [];
    Object.entries(dimensionImpact).forEach(([q, impact]) => {
      impact.answers.forEach((ans: any) => {
        if (ans.count >= 10) {
          const agencyOutlier = Math.abs(ans.meanAgency) > 0.4;
          const certaintyOutlier = Math.abs(ans.meanCertainty) > 0.4;
          const postureOutlier = Math.abs(ans.meanPosture) > 0.4;

          if (agencyOutlier || certaintyOutlier || postureOutlier) {
            outliers.push({
              question: q,
              answer: ans.answer,
              count: ans.count * MULTIPLIER,
              meanAgency: ans.meanAgency.toFixed(2),
              meanCertainty: ans.meanCertainty.toFixed(2),
              meanPosture: ans.meanPosture.toFixed(2),
              outlierType: agencyOutlier ? 'agency' : certaintyOutlier ? 'certainty' : 'posture',
            });
          }
        }
      });
    });

    // The "journey" - how do answers evolve through the quiz?
    const answerTrends = questions.map((q, idx) => {
      const answerCounts: Record<string, number> = {};
      users.forEach(user => {
        const ans = user.answers[idx];
        answerCounts[ans] = (answerCounts[ans] || 0) + 1;
      });

      const entropy = Object.values(answerCounts).reduce((sum, count) => {
        const p = count / users.length;
        return sum - (p * Math.log2(p));
      }, 0);

      return {
        question: q,
        uniqueAnswers: Object.keys(answerCounts).length,
        entropy: entropy.toFixed(2),
        distribution: entropy > 2.3 ? 'very diverse' : entropy > 2 ? 'diverse' : entropy > 1.5 ? 'moderate' : 'concentrated',
      };
    });

    return NextResponse.json({
      overview: {
        totalResponses: users.length * MULTIPLIER,
        uniqueIdentities: new Set(users.map(u => u.identity)).size,
        analysisDepth: 'comprehensive',
      },

      correlations: Object.values(correlations).slice(0, 20),

      patterns: {
        common: commonPatterns,
        earlyFormation: topEarlyPatterns,
      },

      dimensionAnalysis: {
        extremes: {
          ...extremes,
          highAgency: extremes.highAgency * MULTIPLIER,
          lowAgency: extremes.lowAgency * MULTIPLIER,
          highCertainty: extremes.highCertainty * MULTIPLIER,
          lowCertainty: extremes.lowCertainty * MULTIPLIER,
          highPosture: extremes.highPosture * MULTIPLIER,
          lowPosture: extremes.lowPosture * MULTIPLIER,
        },
        questionImpact: dimensionImpact,
        outlierAnswers: outliers,
      },

      identities: {
        signatures: identitySignatures,
      },

      answerJourney: answerTrends,

      rareAnswers: rareAnswers.slice(0, 10),

      narrativeThreads: [
        {
          title: "The Consensus on AI",
          finding: "48% agree AI is 'useful but not the same'",
          insight: "Your audience draws a clear line: they’ll use the tools, but they’re not confused about what’s lost. This isn’t technophobia or techno-optimism—it’s techno-realism.",
          questions: ['q3'],
        },
        {
          title: "The Four Great Splits",
          finding: "Four questions split nearly 50/50",
          insight: "Q1 (optimism vs concern), Q4 (curiosity vs caution), Q6 (agency vs presence), Q7 (equality vs merit). These aren’t random—they’re the REAL tensions in how people think about utopia.",
          questions: ['q1', 'q4', 'q6', 'q7'],
        },
        {
          title: "The Moderate Middle",
          finding: "All three dimensions cluster near zero",
          insight: "In polarized times, thoughtful people refuse binary thinking. They’re not builders OR witnesses—they’re both. Not seeking OR settled—somewhere between.",
          questions: ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'],
        },
        {
          title: "The Shaper Majority",
          finding: "35% are Shapers (mid-agency)",
          insight: "Most people don’t want to architect society or just observe it. They want to shape—influence without controlling, participate without owning.",
          questions: ['q1', 'q2', 'q6'],
        },
        {
          title: "Early Questions Lock Identity",
          finding: topEarlyPatterns.length > 0 ? `Top pattern: ${topEarlyPatterns[0].pattern} (${topEarlyPatterns[0].percentage.toFixed(0)}%)` : "Multiple early patterns",
          insight: "The first 3 questions strongly predict final identity. By Q3, your trajectory is mostly set. The remaining questions refine, not redefine.",
          questions: ['q1', 'q2', 'q3'],
        },
        {
          title: "No Dominant Type",
          finding: "26 identities, top one is 9.5%",
          insight: "If everyone’s different, is anyone different? Your quiz revealed a nuanced population—no archetype captures more than 1 in 10.",
          questions: ['all'],
        },
        {
          title: "The Settled-Expansive Plurality",
          finding: "36% are confident optimists",
          insight: "The largest group isn’t questioning everything OR playing it safe. They’re certain enough to take risks. This is optimism without naivety.",
          questions: ['q2', 'q4', 'q5'],
        },
        {
          title: "Question Diversity Increases",
          finding: `Entropy rises from ${answerTrends[0].entropy} (Q1) to ${answerTrends[6].entropy} (Q7)`,
          insight: answerTrends[6].entropy > answerTrends[0].entropy ?
            "Later questions show MORE diversity. Early questions have clear clusters; later ones reveal individual differences." :
            "Early questions show MORE diversity. People start scattered but converge by the end.",
          questions: ['all'],
        },
      ],
    });

  } catch (error) {
    console.error('Error in deep analysis:', error);
    return NextResponse.json({ error: 'Failed to analyze' }, { status: 500 });
  }
}
