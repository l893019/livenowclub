/**
 * Dimension Scoring for Utopia Quiz
 *
 * Three dimensions measure how someone orients toward a post-scarcity future:
 * - Agency: Witness (-1) vs Builder (+1) — observe/appreciate vs create/shape
 * - Certainty: Seeking (-1) vs Settled (+1) — questioning/exploring vs confident/decided
 * - Posture: Protective (-1) vs Expansive (+1) — guard/preserve vs grow/risk
 */

// Quiz has 7 questions, each answered with a letter
export type QuizAnswers = {
  q1: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  q2: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  q3: 'A' | 'B' | 'C' | 'D' | 'E'
  q4: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  q5: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  q6: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
  q7: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
}

// Each dimension normalized to -1 (low pole) to +1 (high pole)
export type Dimensions = {
  agency: number // -1 = Witness, +1 = Builder
  certainty: number // -1 = Seeking, +1 = Settled
  posture: number // -1 = Protective, +1 = Expansive
}

// Raw scoring before normalization
type RawScores = {
  agency: number
  certainty: number
  posture: number
}

// Scoring map: each answer's effect on dimensions
// Format: [agency, certainty, posture] where each is -1, 0, or +1
const SCORING: Record<string, Record<string, [number, number, number]>> = {
  q1: {
    A: [1, 0, 1], // "What do we build now?" → Agency+1, Posture+1
    B: [-1, 0, -1], // "Who controls the system?" → Agency-1, Posture-1
    C: [-1, 0, -1], // "Did we lose something?" → Agency-1, Posture-1
    D: [0, -1, 0], // "Do we even need purpose?" → Certainty-1
    E: [-1, 1, 0], // "Can we just be present?" → Agency-1, Certainty+1
    F: [1, 0, -1], // "What's still broken?" → Agency+1, Posture-1
  },
  q2: {
    A: [1, 1, 0], // "Build something new" → Agency+1, Certainty+1
    B: [-1, 1, 0], // "Find my people" → Agency-1, Certainty+1
    C: [-1, -1, 0], // "Reflect first" → Agency-1, Certainty-1
    D: [0, -1, 1], // "Keep exploring" → Certainty-1, Posture+1
    E: [-1, 0, 1], // "Dissolve into experience" → Agency-1, Posture+1
    F: [1, 0, -1], // "Find what's unjust" → Agency+1, Posture-1
  },
  q3: {
    A: [-1, 0, 0], // "Useful but not the same" → Agency-1
    B: [0, 0, -1], // "Most dangerous invention" → Posture-1
    C: [0, 0, 1], // "Let us love better?" → Posture+1
    D: [0, -1, 0], // "Wonder what we'll learn" → Certainty-1
    E: [-1, 1, 0], // "Don't need to perform" → Agency-1, Certainty+1
  },
  q4: {
    A: [0, -1, 0], // "Need to find out" → Certainty-1
    B: [1, 0, 1], // "Ask publicly" → Agency+1, Posture+1
    C: [-1, 0, -1], // "Quietly protect" → Agency-1, Posture-1
    D: [0, 1, 0], // "Trust it was worth it" → Certainty+1
    E: [0, -1, 1], // "Live with not knowing" → Certainty-1, Posture+1
    F: [1, 0, 1], // "Test the system" → Agency+1, Posture+1
  },
  q5: {
    A: [0, 0, 1], // "Yes, more experience" → Posture+1
    B: [1, 0, 0], // "Yes, if I can choose" → Agency+1
    C: [-1, 0, 0], // "Yes, to witness" → Agency-1
    D: [0, -1, 0], // "Not sure, sit with it" → Certainty-1
    E: [0, 0, 1], // "No, leave body behind" → Posture+1
    F: [0, 1, -1], // "No, death gives meaning" → Posture-1, Certainty+1
  },
  q6: {
    A: [1, 1, 0], // "Building something" → Agency+1, Certainty+1
    B: [-1, 1, 0], // "With family/friends" → Agency-1, Certainty+1
    C: [-1, -1, 0], // "Reading, thinking" → Agency-1, Certainty-1
    D: [0, 0, -1], // "Tending to things" → Posture-1
    E: [-1, 0, 0], // "Feel everything intensely" → Agency-1
    F: [1, 0, 0], // "Helping someone" → Agency+1
    G: [0, -1, 0], // "Don't know what to do" → Certainty-1
  },
  q7: {
    A: [1, 1, 1], // "Build something amazing" → Agency+1, Certainty+1, Posture+1
    B: [0, 0, -1], // "If we're careful" → Posture-1
    C: [-1, 1, 0], // "Being present matters" → Agency-1, Certainty+1
    D: [0, -1, 0], // "I don't know" → Certainty-1
    E: [0, -1, 1], // "Already okay" → Certainty-1, Posture+1
    F: [0, 0, 1], // "Becoming something new" → Posture+1
    G: [1, 0, 1], // "People like you will heal" → Agency+1, Posture+1
  },
}

/**
 * Calculate dimension scores from quiz answers.
 * Sums raw scores then normalizes to -1 to +1 range.
 */
export function calculateDimensions(answers: QuizAnswers): Dimensions {
  const raw: RawScores = { agency: 0, certainty: 0, posture: 0 }

  // Track max possible scores for normalization
  let maxAgency = 0
  let maxCertainty = 0
  let maxPosture = 0

  // Sum up scores from each answer
  for (const [question, answer] of Object.entries(answers)) {
    const scores = SCORING[question]?.[answer]
    if (scores) {
      raw.agency += scores[0]
      raw.certainty += scores[1]
      raw.posture += scores[2]
    }

    // Calculate max possible magnitude for each dimension
    // by finding the max absolute value any answer could contribute
    const questionScores = Object.values(SCORING[question] || {})
    maxAgency += Math.max(...questionScores.map((s) => Math.abs(s[0])))
    maxCertainty += Math.max(...questionScores.map((s) => Math.abs(s[1])))
    maxPosture += Math.max(...questionScores.map((s) => Math.abs(s[2])))
  }

  // Normalize to -1 to +1 range
  // Each dimension could theoretically range from -maxDimension to +maxDimension
  return {
    agency: maxAgency > 0 ? raw.agency / maxAgency : 0,
    certainty: maxCertainty > 0 ? raw.certainty / maxCertainty : 0,
    posture: maxPosture > 0 ? raw.posture / maxPosture : 0,
  }
}

/**
 * Get dimension labels based on scores.
 * Returns the pole name for each dimension.
 */
export function getDimensionLabels(dimensions: Dimensions): {
  agency: 'Witness' | 'Builder'
  certainty: 'Seeking' | 'Settled'
  posture: 'Protective' | 'Expansive'
} {
  return {
    agency: dimensions.agency >= 0 ? 'Builder' : 'Witness',
    certainty: dimensions.certainty >= 0 ? 'Settled' : 'Seeking',
    posture: dimensions.posture >= 0 ? 'Expansive' : 'Protective',
  }
}

// IdentityLabel type for generated identity labels (simple format)
// Note: The full Identity type with all 22 fields lives in identities.ts
export type IdentityLabel = {
  adjective: string
  noun: string
  full: string
}

// Noun pools based on agency score thresholds
const NOUN_POOLS: { threshold: number; nouns: string[] }[] = [
  { threshold: 0.5, nouns: ['Builder', 'Maker', 'Architect'] },
  { threshold: 0, nouns: ['Maker', 'Shaper'] },
  { threshold: -0.5, nouns: ['Observer', 'Noticer'] },
  { threshold: -Infinity, nouns: ['Witness', 'Observer'] },
]

// Adjective pools based on certainty × posture quadrant
const ADJECTIVE_POOLS: {
  certainty: 'settled' | 'seeking'
  posture: 'expansive' | 'protective'
  adjectives: string[]
}[] = [
  { certainty: 'settled', posture: 'expansive', adjectives: ['Visionary', 'Driven', 'Poised'] },
  { certainty: 'settled', posture: 'protective', adjectives: ['Rooted', 'Steady', 'Grounded'] },
  { certainty: 'seeking', posture: 'expansive', adjectives: ['Adventurous', 'Curious', 'Open'] },
  { certainty: 'seeking', posture: 'protective', adjectives: ['Watchful', 'Careful', 'Thoughtful'] },
]

/**
 * Pick from an array based on intensity.
 * Higher intensity favors earlier (stronger) items.
 */
function pickByIntensity(items: string[], intensity: number): string {
  // intensity 0-1, higher = more extreme
  // Deterministic: map intensity to index (no randomness)
  const normalized = Math.min(Math.max(intensity, 0), 1)

  // Higher intensity → lower index (stronger word)
  // Thresholds aligned with getAdjectiveIndex: >0.7 → 0, >0.4 → 1, else → 2
  if (items.length === 1) return items[0]
  if (items.length === 2) {
    return normalized > 0.5 ? items[0] : items[1]
  }
  // 3+ items
  if (normalized > 0.7) return items[0]
  if (normalized > 0.4) return items[1]
  return items[Math.min(2, items.length - 1)]
}

/**
 * Generate an identity label from dimension scores.
 * Format: "[Adjective] [Noun]" — e.g., "Visionary Builder", "Watchful Observer"
 */
/**
 * Convert array-format answers to QuizAnswers object format.
 * The quiz originally stores answers as ['A', 'B', ...] in localStorage.
 */
export function arrayToQuizAnswers(answers: string[]): QuizAnswers | null {
  if (answers.length !== 7) return null

  return {
    q1: answers[0] as QuizAnswers['q1'],
    q2: answers[1] as QuizAnswers['q2'],
    q3: answers[2] as QuizAnswers['q3'],
    q4: answers[3] as QuizAnswers['q4'],
    q5: answers[4] as QuizAnswers['q5'],
    q6: answers[5] as QuizAnswers['q6'],
    q7: answers[6] as QuizAnswers['q7'],
  }
}

export function generateIdentity(dimensions: Dimensions): IdentityLabel {
  // Select noun based on agency
  const nounPool = NOUN_POOLS.find((p) => dimensions.agency >= p.threshold)?.nouns ?? ['Observer']
  const agencyIntensity = Math.abs(dimensions.agency)
  const noun = pickByIntensity(nounPool, agencyIntensity)

  // Select adjective based on certainty × posture quadrant
  const certaintyPole = dimensions.certainty >= 0 ? 'settled' : 'seeking'
  const posturePole = dimensions.posture >= 0 ? 'expansive' : 'protective'

  const adjectivePool =
    ADJECTIVE_POOLS.find((p) => p.certainty === certaintyPole && p.posture === posturePole)
      ?.adjectives ?? ['Open']

  // Combined intensity from both dimensions
  const combinedIntensity = (Math.abs(dimensions.certainty) + Math.abs(dimensions.posture)) / 2
  const adjective = pickByIntensity(adjectivePool, combinedIntensity)

  return {
    adjective,
    noun,
    full: `${adjective} ${noun}`,
  }
}

/**
 * Map dimensions to one of 8 landscape images.
 * Each combination of Agency (Builder/Witness), Certainty (Settled/Seeking),
 * and Posture (Expansive/Protective) maps to a unique image.
 */
export type LandscapeKey =
  | 'builder-settled-expansive'    // City being built, dawn
  | 'builder-settled-protective'   // Fortified workshop
  | 'builder-seeking-expansive'    // Frontier, uncharted
  | 'builder-seeking-protective'   // Laboratory, careful experimentation
  | 'witness-settled-expansive'    // Observatory, vast view
  | 'witness-settled-protective'   // Library, preserved knowledge
  | 'witness-seeking-expansive'    // Ocean, horizon
  | 'witness-seeking-protective'   // Garden, quiet tending

export function getLandscapeKey(dimensions: Dimensions): LandscapeKey {
  const agency = dimensions.agency >= 0 ? 'builder' : 'witness'
  const certainty = dimensions.certainty >= 0 ? 'settled' : 'seeking'
  const posture = dimensions.posture >= 0 ? 'expansive' : 'protective'

  return `${agency}-${certainty}-${posture}` as LandscapeKey
}

/**
 * Get the path to the landscape image for given dimensions.
 */
export function getLandscapeImagePath(dimensions: Dimensions): string {
  const key = getLandscapeKey(dimensions)
  return `/wonder/essay/quiz/images/landscape-${key}.jpg`
}

/**
 * Human-readable description of each landscape for alt text and prompts.
 */
export const LANDSCAPE_DESCRIPTIONS: Record<LandscapeKey, string> = {
  'builder-settled-expansive': 'A city being built at dawn, cranes and scaffolding against a bright horizon',
  'builder-settled-protective': 'A fortified workshop, tools organized, warm light through small windows',
  'builder-seeking-expansive': 'An uncharted frontier, paths diverging into wild terrain',
  'builder-seeking-protective': 'A careful laboratory, experiments in progress, measured precision',
  'witness-settled-expansive': 'An observatory on a mountain, vast starfield above',
  'witness-settled-protective': 'An ancient library, preserved knowledge in towering shelves',
  'witness-seeking-expansive': 'An endless ocean, the horizon line between sky and water',
  'witness-seeking-protective': 'A quiet garden at dusk, careful tending, soft growth',
}
