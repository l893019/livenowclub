// src/lib/personalization.ts
// Personalization utilities for quiz results

import { archetypes } from "./archetypes";

export type QuizResult = {
  archetype: string;
  secondaryArchetype: string;
  scores: Record<string, number>;
  answers: string[];
};

// Scoring matrix (must match index.html)
const scoring: Record<number, Record<string, Record<string, number>>> = {
  1: {
    A: { shaper: 2, citizen: 1 },
    B: { conscience: 2, architect: 1 },
    C: { embers: 2, cleareyed: 1 },
    D: { swimmer: 2, between: 1 },
    E: { presence: 2, alive: 1 },
    F: { friction: 2, mender: 1 },
  },
  2: {
    A: { shaper: 2, friction: 1 },
    B: { architect: 2, presence: 1 },
    C: { swimmer: 2, rooted: 1 },
    D: { between: 2, alive: 1 },
    E: { unbound: 2, citizen: 1 },
    F: { conscience: 2, mender: 1 },
  },
  3: {
    A: { presence: 2, mender: 1 },
    B: { conscience: 2, cleareyed: 1 },
    C: { citizen: 2, alive: 1, unbound: 1 },
    D: { swimmer: 2, architect: 1, cleareyed: 1 },
    E: { rooted: 2, between: 1 },
  },
  4: {
    A: { swimmer: 2, cleareyed: 1 },
    B: { conscience: 2, friction: 1 },
    C: { conscience: 2, embers: 1 },
    D: { citizen: 2, alive: 1 },
    E: { between: 2, presence: 1 },
    F: { friction: 2, unbound: 1 },
  },
  5: {
    A: { alive: 2, citizen: 1 },
    B: { shaper: 2, friction: 1 },
    C: { presence: 2, rooted: 1 },
    D: { swimmer: 2, between: 1 },
    E: { unbound: 2 },
    F: { conscience: 2, cleareyed: 1 },
  },
  6: {
    A: { shaper: 2, friction: 1 },
    B: { presence: 2, architect: 1 },
    C: { swimmer: 2, unbound: 1 },
    D: { embers: 2, cleareyed: 1 },
    E: { alive: 2, rooted: 1 },
    F: { mender: 2, architect: 1 },
    G: { between: 2 },
  },
  7: {
    A: { shaper: 2, architect: 1 },
    B: { conscience: 2, embers: 1 },
    C: { presence: 2, mender: 1 },
    D: { between: 2, swimmer: 1 },
    E: { between: 2, presence: 1 },
    F: { unbound: 2, swimmer: 1 },
    G: { alive: 2, mender: 1 },
  },
};

// Question summaries for the "revealing question" feature
const questionSummaries: Record<number, string> = {
  1: "what you prioritize when chaos hits",
  2: "how you see your role in transformation",
  3: "your relationship with comfort and challenge",
  4: "how you respond to hidden costs of utopia",
  5: "what you'd do if you never had to work",
  6: "how you'd spend your last day",
  7: "what you tell a child about the future",
};

// Calculate conviction strength (0-100)
// Higher = clearer type identity, Lower = more distributed
export function getConvictionStrength(scores: Record<string, number>): {
  strength: number;
  label: string;
  description: string;
} {
  const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);
  const primaryScore = sorted[0][1];
  const secondScore = sorted[1][1];
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  // Gap between primary and second, normalized
  const gap = primaryScore - secondScore;
  const maxPossibleGap = totalScore; // Theoretical max
  const strength = Math.round((gap / (maxPossibleGap / 4)) * 100);
  const normalizedStrength = Math.min(100, Math.max(0, strength));

  let label: string;
  let description: string;

  if (normalizedStrength >= 70) {
    label = "Clear Conviction";
    description =
      "Your worldview is sharply defined. You know what you believe.";
  } else if (normalizedStrength >= 40) {
    label = "Balanced Perspective";
    description =
      "You hold your primary worldview while remaining open to others.";
  } else {
    label = "Integrative Mind";
    description =
      "You draw from multiple worldviews. This is rare—and valuable.";
  }

  return { strength: normalizedStrength, label, description };
}

// Find the question that most revealed the primary archetype
export function getRevealingQuestion(
  answers: string[],
  primaryArchetype: string
): {
  questionNumber: number;
  summary: string;
  points: number;
} | null {
  let maxPoints = 0;
  let revealingQuestion = 0;

  answers.forEach((answer, index) => {
    const questionNum = index + 1;
    const questionScoring = scoring[questionNum];
    if (!questionScoring || !answer) return;

    const answerScoring = questionScoring[answer];
    if (!answerScoring) return;

    const points = answerScoring[primaryArchetype] || 0;
    if (points > maxPoints) {
      maxPoints = points;
      revealingQuestion = questionNum;
    }
  });

  if (revealingQuestion === 0) return null;

  return {
    questionNumber: revealingQuestion,
    summary: questionSummaries[revealingQuestion],
    points: maxPoints,
  };
}

// Detect outlier answers (answers that don't match the user's type)
export function getOutlierAnswers(
  answers: string[],
  primaryArchetype: string,
  scores: Record<string, number>
): Array<{
  questionNumber: number;
  summary: string;
  contributedTo: string;
  contributedToName: string;
}> {
  const outliers: Array<{
    questionNumber: number;
    summary: string;
    contributedTo: string;
    contributedToName: string;
  }> = [];

  // Get the bottom 3 archetypes by score
  const sorted = Object.entries(scores).sort(([, a], [, b]) => a - b);
  const bottomArchetypes = sorted.slice(0, 4).map(([key]) => key);

  answers.forEach((answer, index) => {
    const questionNum = index + 1;
    const questionScoring = scoring[questionNum];
    if (!questionScoring || !answer) return;

    const answerScoring = questionScoring[answer];
    if (!answerScoring) return;

    // Check if this answer gave 2 points to a bottom archetype
    for (const [archetype, points] of Object.entries(answerScoring)) {
      if (points === 2 && bottomArchetypes.includes(archetype)) {
        const arch = archetypes[archetype];
        outliers.push({
          questionNumber: questionNum,
          summary: questionSummaries[questionNum],
          contributedTo: archetype,
          contributedToName: arch?.name || archetype,
        });
        break; // Only one outlier per question
      }
    }
  });

  return outliers.slice(0, 2); // Max 2 outliers to show
}

// Get tertiary type (third-highest score)
export function getTertiaryType(scores: Record<string, number>): {
  key: string;
  name: string;
  score: number;
} | null {
  const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);
  if (sorted.length < 3) return null;

  const [tertiaryKey, tertiaryScore] = sorted[2];
  const arch = archetypes[tertiaryKey];

  // Only show if score is meaningful (at least 2 points)
  if (tertiaryScore < 2) return null;

  return {
    key: tertiaryKey,
    name: arch?.name || tertiaryKey,
    score: tertiaryScore,
  };
}

// Estimated rarity percentages (based on archetype distribution patterns)
const rarityEstimates: Record<string, number> = {
  between: 18, // Most common - people in transition
  swimmer: 12,
  alive: 11,
  presence: 10,
  citizen: 9,
  conscience: 8,
  shaper: 7,
  architect: 6,
  mender: 5,
  embers: 4,
  friction: 4,
  cleareyed: 3,
  rooted: 2,
  unbound: 1, // Rarest
};

export function getRaritySignal(primaryArchetype: string): {
  percentage: number;
  description: string;
} {
  const percentage = rarityEstimates[primaryArchetype] || 10;

  let description: string;
  if (percentage <= 3) {
    description = `Only ${percentage}% share your worldview. You see something most people miss.`;
  } else if (percentage <= 8) {
    description = `${percentage}% share your worldview. You're part of a distinct minority.`;
  } else if (percentage <= 15) {
    description = `${percentage}% share your worldview. Common enough to find your people.`;
  } else {
    description = `${percentage}% share your worldview. Many are on this journey with you.`;
  }

  return { percentage, description };
}

// Generate fingerprint data for visualization
export function getWorldviewFingerprint(
  scores: Record<string, number>
): Array<{
  key: string;
  name: string;
  score: number;
  percentage: number;
  color: string;
}> {
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);

  return Object.entries(scores)
    .map(([key, score]) => {
      const arch = archetypes[key];
      return {
        key,
        name: arch?.name || key,
        score,
        percentage: totalScore > 0 ? Math.round((score / totalScore) * 100) : 0,
        color: arch?.color || "#888",
      };
    })
    .sort((a, b) => b.score - a.score);
}

// Map answers to their archetype contributions for journey visualization
export function getAnswerJourney(answers: string[]): Array<{
  questionNumber: number;
  summary: string;
  answer: string;
  contributions: Array<{ archetype: string; name: string; points: number }>;
}> {
  return answers
    .map((answer, index) => {
      const questionNum = index + 1;
      const questionScoring = scoring[questionNum];
      if (!questionScoring || !answer) return null;

      const answerScoring = questionScoring[answer];
      if (!answerScoring) return null;

      const contributions = Object.entries(answerScoring)
        .map(([archetype, points]) => ({
          archetype,
          name: archetypes[archetype]?.name || archetype,
          points,
        }))
        .sort((a, b) => b.points - a.points);

      return {
        questionNumber: questionNum,
        summary: questionSummaries[questionNum],
        answer,
        contributions,
      };
    })
    .filter(Boolean) as Array<{
    questionNumber: number;
    summary: string;
    answer: string;
    contributions: Array<{ archetype: string; name: string; points: number }>;
  }>;
}
