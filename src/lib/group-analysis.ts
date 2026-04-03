// src/lib/group-analysis.ts
// Group composition analysis algorithms for Group Reading feature

import {
  archetypes,
  archetypeKeys,
  Archetype,
  getPairDistance,
  getAnalyticalPairDynamic,
  AnalyticalPairDynamic,
} from "@/lib/archetypes";
import {
  archetypePositions,
  RadarPosition,
  getGroupCenterOfGravity,
} from "@/lib/radar-positions";

// =============================================================================
// TYPES
// =============================================================================

export type Position = { x: number; y: number };

export type Quadrant =
  | "build-root"
  | "build-transcend"
  | "witness-root"
  | "witness-transcend";

export type GroupCenterOfGravity = {
  position: Position;
  dominantQuadrant: Quadrant;
};

export type ArchetypeFrequency = {
  archetype: string;
  count: number;
  percentage: number;
};

export type CompositionAnalysis = {
  frequencies: ArchetypeFrequency[];
  dominantArchetypes: string[]; // Most common (can be multiple ties)
  buildVsWitness: { build: number; witness: number }; // Percentage split
  rootVsTranscend: { root: number; transcend: number }; // Percentage split
};

export type CollectiveSuperpower = {
  title: string; // Synthesized name
  description: string; // 2-3 paragraphs
  contributingPowers: string[]; // Which individual powers combine
};

export type CollectiveBlindSpot = {
  description: string; // 2-3 paragraphs
  compoundedBlindSpots: string[]; // Multiple members share
  missingPerspectives: string[]; // Absent archetypes
};

export type MissingVoice = {
  archetype: string;
  whatTheyWouldAdd: string; // 1-2 paragraphs
  questionsTheyWouldAsk: string[];
};

export type InternalTension = {
  archetypeA: string;
  archetypeB: string;
  tensionLevel: "high" | "medium"; // Based on distance
  thesis: string;
  howToNavigate: string;
};

export type GroupQuestion = {
  question: string;
  context: string;
};

export type GroupMember = {
  id: string;
  name: string;
  archetype: string;
};

export type GroupAnalysis = {
  centerOfGravity: GroupCenterOfGravity;
  composition: CompositionAnalysis;
  collectiveSuperpower: CollectiveSuperpower;
  collectiveBlindSpot: CollectiveBlindSpot;
  missingVoices: MissingVoice[];
  internalTensions: InternalTension[];
  groupQuestion: GroupQuestion;
  recommendedInvite: string; // Archetype that would shift composition most
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Determine which quadrant a position falls into
 */
function getQuadrant(position: Position): Quadrant {
  const { x, y } = position;
  // X > 0 = Build, X < 0 = Witness
  // Y > 0 = Transcend, Y < 0 = Root
  if (x >= 0 && y >= 0) return "build-transcend";
  if (x >= 0 && y < 0) return "build-root";
  if (x < 0 && y >= 0) return "witness-transcend";
  return "witness-root";
}

/**
 * Count archetype frequencies in a group
 */
function countArchetypes(members: GroupMember[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const member of members) {
    counts[member.archetype] = (counts[member.archetype] || 0) + 1;
  }
  return counts;
}

/**
 * Get the set of unique archetypes present in the group
 */
function getPresentArchetypes(members: GroupMember[]): string[] {
  return [...new Set(members.map((m) => m.archetype))];
}

/**
 * Calculate the Euclidean distance between two positions
 */
function positionDistance(a: Position, b: Position): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// =============================================================================
// 1. CENTER OF GRAVITY
// =============================================================================

/**
 * Calculate the center of gravity for a group
 * Averages all member positions on the 2D radar
 */
export function calculateCenterOfGravity(
  members: GroupMember[]
): GroupCenterOfGravity {
  const positions: RadarPosition[] = members
    .map((m) => archetypePositions[m.archetype])
    .filter((p): p is RadarPosition => p !== undefined);

  if (positions.length === 0) {
    return {
      position: { x: 0, y: 0 },
      dominantQuadrant: "build-transcend",
    };
  }

  const center = getGroupCenterOfGravity(positions);
  const dominantQuadrant = getQuadrant(center);

  return {
    position: center,
    dominantQuadrant,
  };
}

// =============================================================================
// 2. ARCHETYPE FREQUENCY ANALYSIS
// =============================================================================

/**
 * Analyze the composition of archetypes in the group
 */
export function analyzeComposition(members: GroupMember[]): CompositionAnalysis {
  const counts = countArchetypes(members);
  const total = members.length;

  // Build frequency list
  const frequencies: ArchetypeFrequency[] = Object.entries(counts)
    .map(([archetype, count]) => ({
      archetype,
      count,
      percentage: (count / total) * 100,
    }))
    .sort((a, b) => b.count - a.count);

  // Find dominant archetypes (handle ties)
  const maxCount = frequencies[0]?.count || 0;
  const dominantArchetypes = frequencies
    .filter((f) => f.count === maxCount)
    .map((f) => f.archetype);

  // Calculate axis splits based on positions
  let buildCount = 0;
  let witnessCount = 0;
  let rootCount = 0;
  let transcendCount = 0;

  for (const member of members) {
    const pos = archetypePositions[member.archetype];
    if (pos) {
      if (pos.x >= 0) buildCount++;
      else witnessCount++;
      if (pos.y >= 0) transcendCount++;
      else rootCount++;
    }
  }

  const buildVsWitness = {
    build: total > 0 ? (buildCount / total) * 100 : 50,
    witness: total > 0 ? (witnessCount / total) * 100 : 50,
  };

  const rootVsTranscend = {
    root: total > 0 ? (rootCount / total) * 100 : 50,
    transcend: total > 0 ? (transcendCount / total) * 100 : 50,
  };

  return {
    frequencies,
    dominantArchetypes,
    buildVsWitness,
    rootVsTranscend,
  };
}

// =============================================================================
// 3. COLLECTIVE SUPERPOWER GENERATION
// =============================================================================

/**
 * Generate the collective superpower for a group
 */
export function generateCollectiveSuperpower(
  members: GroupMember[]
): CollectiveSuperpower {
  const counts = countArchetypes(members);
  const presentArchetypes = getPresentArchetypes(members);

  // Get superpowers weighted by frequency
  const superpowerCounts: Array<{ archetype: string; power: string; count: number }> =
    presentArchetypes
      .map((key) => ({
        archetype: key,
        power: archetypes[key]?.superpower || "",
        count: counts[key] || 1,
      }))
      .filter((s) => s.power)
      .sort((a, b) => b.count - a.count);

  const contributingPowers = superpowerCounts.map((s) => s.power);
  const topPowers = superpowerCounts.slice(0, 3);

  // Generate synthesized title based on mix
  const title = generateSuperpowerTitle(topPowers.map((p) => p.power));

  // Generate description
  const description = generateSuperpowerDescription(
    superpowerCounts,
    members.length
  );

  return {
    title,
    description,
    contributingPowers,
  };
}

function generateSuperpowerTitle(powers: string[]): string {
  if (powers.length === 0) return "Emergent Clarity";
  if (powers.length === 1) return `The Gift of ${capitalize(powers[0])}`;

  // Create synthesized names based on power combinations
  const powerSet = new Set(powers.map((p) => p.toLowerCase()));

  if (powerSet.has("trusting abundance") && powerSet.has("feeling everything")) {
    return "Generous Aliveness";
  }
  if (powerSet.has("building from scratch") && powerSet.has("thinking in systems")) {
    return "Architectural Vision";
  }
  if (powerSet.has("spotting what's hidden") && powerSet.has("telling hard truths")) {
    return "Unflinching Clarity";
  }
  if (powerSet.has("showing up fully") && powerSet.has("sitting with hard questions")) {
    return "Present Inquiry";
  }
  if (powerSet.has("remembering what matters") && powerSet.has("fixing what's broken")) {
    return "Restorative Memory";
  }
  if (powerSet.has("embracing difficulty") && powerSet.has("imagining beyond limits")) {
    return "Transcendent Struggle";
  }
  if (powerSet.has("knowing when to stop") && powerSet.has("holding uncertainty")) {
    return "Grounded Openness";
  }

  // Default: combine the first two powers
  const first = powers[0].split(" ").pop() || powers[0];
  const second = powers[1]?.split(" ").pop() || "";
  return `${capitalize(first)}${second ? ` and ${capitalize(second)}` : ""}`;
}

function generateSuperpowerDescription(
  superpowerCounts: Array<{ archetype: string; power: string; count: number }>,
  totalMembers: number
): string {
  if (superpowerCounts.length === 0) {
    return "This group's collective strength is still emerging.";
  }

  const topPower = superpowerCounts[0];
  const topArch = archetypes[topPower.archetype];
  const secondPower = superpowerCounts[1];
  const secondArch = secondPower ? archetypes[secondPower.archetype] : null;

  let para1 = `This group's dominant gift is ${topPower.power}. `;
  if (topPower.count > 1) {
    para1 += `With ${topPower.count} out of ${totalMembers} members sharing this orientation, it forms the core of your collective identity. `;
  }
  para1 += topArch?.superpowerExpanded?.split("\n\n")[0] || "";

  let para2 = "";
  if (secondArch && secondPower) {
    para2 = `This is complemented by ${secondPower.power}. ${
      secondArch?.superpowerExpanded?.split("\n\n")[0] || ""
    }`;
  }

  let para3 = "";
  if (superpowerCounts.length >= 2) {
    para3 = `Together, these capacities create something greater than any individual contribution. The group can ${topPower.power.replace("trusting", "trust").replace("embracing", "embrace").replace("building", "build").replace("showing", "show")} while simultaneously ${
      secondPower?.power.replace("sitting", "sit").replace("telling", "tell").replace("fixing", "fix") || "bringing other perspectives"
    }. This combination is rare and valuable.`;
  }

  return [para1, para2, para3].filter(Boolean).join("\n\n");
}

// =============================================================================
// 4. COLLECTIVE BLIND SPOT GENERATION
// =============================================================================

/**
 * Generate the collective blind spot analysis for a group
 */
export function generateCollectiveBlindSpot(
  members: GroupMember[]
): CollectiveBlindSpot {
  const counts = countArchetypes(members);
  const presentArchetypes = getPresentArchetypes(members);
  const missingArchetypes = archetypeKeys.filter(
    (k) => !presentArchetypes.includes(k)
  );

  // Find blind spots that compound (multiple members share)
  const compoundedBlindSpots: string[] = [];
  const blindSpotCounts: Record<string, number> = {};

  for (const [archetype, count] of Object.entries(counts)) {
    if (count > 1) {
      const blindSpot = archetypes[archetype]?.blindSpot;
      if (blindSpot) {
        blindSpotCounts[blindSpot] = (blindSpotCounts[blindSpot] || 0) + count;
      }
    }
  }

  // Add blind spots shared by multiple members
  for (const [blindSpot, count] of Object.entries(blindSpotCounts)) {
    if (count >= 2) {
      compoundedBlindSpots.push(blindSpot);
    }
  }

  // Get missing perspectives (absent archetypes)
  const missingPerspectives = missingArchetypes.slice(0, 5).map((key) => {
    const arch = archetypes[key];
    return arch?.name || key;
  });

  // Generate description
  const description = generateBlindSpotDescription(
    compoundedBlindSpots,
    missingArchetypes,
    presentArchetypes,
    members.length
  );

  return {
    description,
    compoundedBlindSpots,
    missingPerspectives,
  };
}

function generateBlindSpotDescription(
  compoundedBlindSpots: string[],
  missingArchetypes: string[],
  presentArchetypes: string[],
  totalMembers: number
): string {
  const paragraphs: string[] = [];

  // First paragraph: compounded blind spots
  if (compoundedBlindSpots.length > 0) {
    const firstBlindSpot = compoundedBlindSpots[0];
    paragraphs.push(
      `The most significant risk for this group is a shared blind spot: ${firstBlindSpot.toLowerCase()} This pattern appears in multiple members, meaning no one in the group naturally sees past it. When everyone shares the same limitation, it becomes invisible through mutual confirmation.`
    );
  } else if (presentArchetypes.length > 0) {
    // Find the most common archetype's blind spot
    const topArchetype = presentArchetypes[0];
    const topBlindSpot = archetypes[topArchetype]?.blindSpot;
    if (topBlindSpot) {
      paragraphs.push(
        `The primary blind spot to watch for: ${topBlindSpot.toLowerCase()} While this affects individuals differently, as a group pattern it can shape decisions and discussions without anyone noticing.`
      );
    }
  }

  // Second paragraph: missing perspectives
  if (missingArchetypes.length > 0) {
    const missingNames = missingArchetypes
      .slice(0, 3)
      .map((k) => archetypes[k]?.name || k);

    paragraphs.push(
      `The group is also missing certain perspectives entirely. There is no ${missingNames.join(
        ", no "
      )} in this group. These absent voices would naturally ask questions and raise concerns that your current composition overlooks. Without them, certain considerations will need to be deliberately sought out rather than emerging organically from your discussions.`
    );
  }

  // Third paragraph: risk narrative
  if (totalMembers >= 3) {
    paragraphs.push(
      `In group decisions, watch for moments when everyone agrees too quickly. Shared blind spots create comfortable consensus where challenge is actually needed. Consider appointing a rotating devil's advocate, or explicitly inviting the perspective of missing archetypes when making important decisions.`
    );
  }

  return paragraphs.join("\n\n");
}

// =============================================================================
// 5. MISSING VOICES
// =============================================================================

// What each archetype would add to a group
const missingVoiceAdditions: Record<string, string> = {
  citizen: `A Citizen of Abundance would bring trust in possibility to this group. They would remind you that scarcity is often manufactured, that systems can work for everyone, and that optimism is not naivety but a position argued and defended. In discussions that drift toward zero-sum thinking, they would ask: why are we assuming there isn't enough?`,
  shaper: `A Shaper of Change would bring momentum to this group. They would push when others settle, question when others accept, and remind you that everything is raw material for what comes next. In moments of stagnation, they would ask: what are we waiting for?`,
  architect: `An Architect of the Commons would bring systems thinking to this group. They would see the invisible structures that shape your interactions, question who the current arrangement serves, and propose designs that distribute power rather than concentrate it. In discussions that get stuck on individuals, they would ask: what structure is creating this pattern?`,
  presence: `A Keeper of Presence would bring attention to this group. They would slow the conversation when it races past what matters, hold space when others fill silence with noise, and remind you that the quality of your attention shapes the quality of your outcomes. In moments of distraction, they would ask: are we actually here?`,
  swimmer: `A Swimmer in Deep Water would bring philosophical depth to this group. They would sit with questions others rush past, notice the assumptions beneath your certainties, and remind you that not-knowing can be its own form of wisdom. In moments of premature closure, they would ask: what are we still not seeing?`,
  rooted: `Rooted in Stillness would bring groundedness to this group. They would question the assumption that more and faster are always better, hold space for doing nothing when others reach for action, and remind you that stopping can be the most radical choice. In moments of acceleration, they would ask: do we actually need to do this?`,
  conscience: `Conscience Before Comfort would bring vigilance to this group. They would see the costs others prefer to ignore, question systems that seem too convenient, and remind you that dystopia always arrives disguised as efficiency. In moments of comfortable agreement, they would ask: what are we not seeing?`,
  embers: `A Keeper of Embers would bring memory to this group. They would recall what worked before, what was lost and shouldn't have been, and what wisdom already exists in human history. In moments of reinvention, they would ask: have we already solved this?`,
  friction: `Alive in the Friction would bring challenge to this group. They would question whether ease is always good, seek difficulty when others seek comfort, and remind you that growth requires resistance. In moments of consensus, they would ask: is this too easy?`,
  unbound: `Unbound from Form would bring expansiveness to this group. They would question the boundaries you take for granted, imagine possibilities beyond current constraints, and remind you that what seems fixed can be transcended. In moments of limitation, they would ask: what if we're thinking too small?`,
  alive: `Alive to Everything would bring sensation to this group. They would notice what others think past, feel what others analyze, and remind you that experience is the point. In moments of abstraction, they would ask: what does this actually feel like?`,
  mender: `A Mender of What Remains would bring repair to this group. They would focus on fixing what exists rather than building new, value maintenance over innovation, and remind you that the most advanced engineering is making what exists work again. In moments of abandonment, they would ask: can this be saved?`,
  cleareyed: `Clear-Eyed in the Storm would bring honesty to this group. They would say what others soften, see what others prefer to ignore, and remind you that truth matters more than comfort. In moments of pleasant fiction, they would ask: what's actually true here?`,
  between: `In the Space Between would bring uncertainty to this group. They would question fixed positions, hold space for not-knowing, and remind you that the threshold is a valid place to stand. In moments of forced choice, they would ask: what if neither option is right?`,
};

// Questions each archetype would ask
const missingVoiceQuestions: Record<string, string[]> = {
  citizen: [
    "Why are we assuming there isn't enough?",
    "What would this look like if we trusted abundance?",
    "Who benefits from us thinking in scarcity terms?",
  ],
  shaper: [
    "What are we waiting for?",
    "What would we build if we started from scratch?",
    "Is our hesitation wisdom or fear?",
  ],
  architect: [
    "What structure is creating this pattern?",
    "Who does the current arrangement serve?",
    "How could we redesign this to serve everyone?",
  ],
  presence: [
    "Are we actually here right now?",
    "What would change if we gave this our full attention?",
    "Who needs to be heard before we move on?",
  ],
  swimmer: [
    "What are we still not seeing?",
    "What question are we avoiding?",
    "What would happen if we stayed with this uncertainty longer?",
  ],
  rooted: [
    "Do we actually need to do this?",
    "What would be lost if we stopped?",
    "Is our movement toward something or away from something?",
  ],
  conscience: [
    "What's the hidden cost here?",
    "Who is being served by this comfortable agreement?",
    "What would a critic say that we're dismissing too quickly?",
  ],
  embers: [
    "Have we already solved this before?",
    "What are we forgetting?",
    "What wisdom are we abandoning in our rush forward?",
  ],
  friction: [
    "Is this too easy?",
    "What difficulty are we avoiding?",
    "Would this decision feel different if it were harder?",
  ],
  unbound: [
    "What if we're thinking too small?",
    "What boundaries are we assuming that don't have to exist?",
    "What becomes possible if we transcend these limits?",
  ],
  alive: [
    "What does this actually feel like?",
    "What are we not letting ourselves experience?",
    "Have we felt this decision in our bodies or only in our heads?",
  ],
  mender: [
    "Can this be saved?",
    "What would repair look like here?",
    "Are we abandoning something worth fixing?",
  ],
  cleareyed: [
    "What's actually true here?",
    "What are we not saying to each other?",
    "What would change if we stopped being polite about this?",
  ],
  between: [
    "What if neither option is right?",
    "Are we rushing to certainty because uncertainty is uncomfortable?",
    "What would it mean to stay in the question longer?",
  ],
};

/**
 * Generate missing voices analysis
 * Prioritizes by how much they'd balance the composition
 */
export function generateMissingVoices(
  members: GroupMember[],
  centerOfGravity: Position,
  limit: number = 3
): MissingVoice[] {
  const presentArchetypes = new Set(members.map((m) => m.archetype));
  const missingArchetypes = archetypeKeys.filter(
    (k) => !presentArchetypes.has(k)
  );

  // Score missing archetypes by how much they'd balance the composition
  const scored = missingArchetypes.map((key) => {
    const pos = archetypePositions[key];
    if (!pos) return { key, balanceScore: 0 };

    // Calculate how much this archetype would pull toward center
    // Higher score = more balance (opposite quadrant from center of gravity)
    const oppositeX = -centerOfGravity.x;
    const oppositeY = -centerOfGravity.y;

    // Distance from the archetype to the "ideal balancing position"
    const dx = pos.x - oppositeX;
    const dy = pos.y - oppositeY;
    const distanceFromIdeal = Math.sqrt(dx * dx + dy * dy);

    // Closer to ideal = higher balance score
    const balanceScore = 2 - distanceFromIdeal; // Max possible is 2 (at ideal position)

    return { key, balanceScore };
  });

  // Sort by balance score (highest first) and take top N
  scored.sort((a, b) => b.balanceScore - a.balanceScore);
  const topMissing = scored.slice(0, limit);

  return topMissing.map(({ key }) => ({
    archetype: key,
    whatTheyWouldAdd:
      missingVoiceAdditions[key] ||
      `A ${archetypes[key]?.name || key} would bring a different perspective to this group.`,
    questionsTheyWouldAsk: missingVoiceQuestions[key] || [
      "What are we missing?",
    ],
  }));
}

// =============================================================================
// 6. INTERNAL TENSIONS
// =============================================================================

/**
 * Generate analysis of internal tensions between archetypes in the group
 */
export function generateInternalTensions(
  members: GroupMember[]
): InternalTension[] {
  const presentArchetypes = getPresentArchetypes(members);
  const tensions: InternalTension[] = [];

  // Check all pairs for high-tension relationships
  for (let i = 0; i < presentArchetypes.length; i++) {
    for (let j = i + 1; j < presentArchetypes.length; j++) {
      const a = presentArchetypes[i];
      const b = presentArchetypes[j];
      const { category, value } = getPairDistance(a, b);

      // Only surface tensions for pairs with distance > 0.8
      if (value > 0.8) {
        const tensionLevel: "high" | "medium" = value > 1.2 ? "high" : "medium";
        const analytical = getAnalyticalPairDynamic(a, b);

        tensions.push({
          archetypeA: a,
          archetypeB: b,
          tensionLevel,
          thesis: analytical.thesis,
          howToNavigate: generateNavigationAdvice(a, b, analytical, tensionLevel),
        });
      }
    }
  }

  // Sort by tension level (high first) and distance
  tensions.sort((t1, t2) => {
    if (t1.tensionLevel === "high" && t2.tensionLevel === "medium") return -1;
    if (t1.tensionLevel === "medium" && t2.tensionLevel === "high") return 1;
    return 0;
  });

  return tensions;
}

function generateNavigationAdvice(
  a: string,
  b: string,
  analytical: AnalyticalPairDynamic,
  tensionLevel: "high" | "medium"
): string {
  const archA = archetypes[a];
  const archB = archetypes[b];

  if (tensionLevel === "high") {
    return `This is a significant tension in your group. ${archA?.name || a} and ${archB?.name || b} see the world differently enough that misunderstanding is likely. The key is treating your differences as data rather than defects. What ${archA?.name || a} sees that ${archB?.name || b} misses, and vice versa, creates a more complete picture than either holds alone. When disagreements arise, try naming the underlying values at stake rather than arguing about the specific decision.`;
  }

  return `This tension is productive rather than destructive, but it requires attention. ${archA?.name || a} and ${archB?.name || b} will regularly see things differently. Use this as an asset: before making decisions, deliberately seek both perspectives. The friction between you generates insight that comfort would miss.`;
}

// =============================================================================
// 7. GROUP QUESTION
// =============================================================================

// Questions based on dominant quadrant
const quadrantQuestions: Record<Quadrant, Array<{ question: string; context: string }>> =
  {
    "build-transcend": [
      {
        question:
          "You're building toward something beyond the current horizon. What will you have to leave behind to get there?",
        context:
          "This group clusters in the build-transcend quadrant: oriented toward action and reaching beyond current limits. Your collective energy pushes outward and upward. The question invites you to consider what the pursuit of the extraordinary might cost.",
      },
      {
        question:
          "What would be worth building if you knew it would outlast all of you?",
        context:
          "Your group combines the drive to create with the capacity to imagine beyond current constraints. This question asks you to channel that combination toward legacy rather than personal achievement.",
      },
    ],
    "build-root": [
      {
        question:
          "You're building from solid ground. What foundation is strong enough to build on, and what merely feels solid?",
        context:
          "This group clusters in the build-root quadrant: oriented toward action grounded in what's proven. Your collective energy seeks to create from stability. The question invites you to examine whether your foundations are as secure as they seem.",
      },
      {
        question:
          "What are you maintaining because it works, and what are you maintaining because change feels risky?",
        context:
          "Your group combines the drive to create with commitment to what endures. This question asks you to distinguish between wisdom and fear in your attachment to the established.",
      },
    ],
    "witness-transcend": [
      {
        question:
          "You see beyond the obvious. What truth are you glimpsing that others aren't ready to hear?",
        context:
          "This group clusters in the witness-transcend quadrant: oriented toward seeing clearly while reaching beyond current understanding. Your collective energy perceives what others miss. The question invites you to consider the responsibility that comes with unusual sight.",
      },
      {
        question:
          "What would it cost you to fully articulate what you're beginning to see?",
        context:
          "Your group combines the capacity for deep observation with willingness to transcend conventional understanding. This question asks about the price of translating vision into communication.",
      },
    ],
    "witness-root": [
      {
        question:
          "You see what's actually here. What truth about the present moment is everyone else rushing past?",
        context:
          "This group clusters in the witness-root quadrant: oriented toward seeing clearly while remaining grounded in what is. Your collective energy stays present. The question invites you to articulate what your presence reveals that urgency obscures.",
      },
      {
        question:
          "What would change if everyone paused long enough to see what you see?",
        context:
          "Your group combines the capacity for deep observation with commitment to the present moment. This question asks you to imagine the impact of your particular form of attention spreading outward.",
      },
    ],
  };

/**
 * Generate the philosophical question that this group embodies
 */
export function generateGroupQuestion(
  centerOfGravity: GroupCenterOfGravity,
  composition: CompositionAnalysis
): GroupQuestion {
  const { dominantQuadrant } = centerOfGravity;
  const questions = quadrantQuestions[dominantQuadrant];

  // Select question based on composition characteristics
  const questionIndex =
    composition.dominantArchetypes.length > 1
      ? 1 // Multiple dominant archetypes = more complex question
      : 0;

  const selected = questions[questionIndex] || questions[0];

  return {
    question: selected.question,
    context: selected.context,
  };
}

// =============================================================================
// 8. RECOMMENDED INVITE
// =============================================================================

/**
 * Determine which archetype would shift the composition most beneficially
 */
export function getRecommendedInvite(
  members: GroupMember[],
  centerOfGravity: Position
): string {
  const presentArchetypes = new Set(members.map((m) => m.archetype));
  const missingArchetypes = archetypeKeys.filter(
    (k) => !presentArchetypes.has(k)
  );

  if (missingArchetypes.length === 0) {
    // All archetypes present - recommend the least represented
    const counts = countArchetypes(members);
    const minCount = Math.min(...Object.values(counts));
    const leastRepresented = Object.entries(counts)
      .filter(([, count]) => count === minCount)
      .map(([arch]) => arch);
    return leastRepresented[0];
  }

  // Find the archetype most opposite to the center of gravity
  let bestCandidate = missingArchetypes[0];
  let bestScore = -Infinity;

  for (const key of missingArchetypes) {
    const pos = archetypePositions[key];
    if (!pos) continue;

    // Score by how opposite it is to the center of gravity
    // We want someone who pulls the group toward balance
    const oppositeScore = -(pos.x * centerOfGravity.x + pos.y * centerOfGravity.y);

    if (oppositeScore > bestScore) {
      bestScore = oppositeScore;
      bestCandidate = key;
    }
  }

  return bestCandidate;
}

// =============================================================================
// MAIN FUNCTION
// =============================================================================

/**
 * Analyze a group's composition and generate comprehensive insights
 */
export function analyzeGroup(members: GroupMember[]): GroupAnalysis {
  if (members.length < 3) {
    throw new Error("Group analysis requires at least 3 members");
  }

  // 1. Calculate center of gravity
  const centerOfGravity = calculateCenterOfGravity(members);

  // 2. Analyze composition
  const composition = analyzeComposition(members);

  // 3. Generate collective superpower
  const collectiveSuperpower = generateCollectiveSuperpower(members);

  // 4. Generate collective blind spot
  const collectiveBlindSpot = generateCollectiveBlindSpot(members);

  // 5. Generate missing voices
  const missingVoices = generateMissingVoices(
    members,
    centerOfGravity.position,
    3
  );

  // 6. Generate internal tensions
  const internalTensions = generateInternalTensions(members);

  // 7. Generate group question
  const groupQuestion = generateGroupQuestion(centerOfGravity, composition);

  // 8. Determine recommended invite
  const recommendedInvite = getRecommendedInvite(
    members,
    centerOfGravity.position
  );

  return {
    centerOfGravity,
    composition,
    collectiveSuperpower,
    collectiveBlindSpot,
    missingVoices,
    internalTensions,
    groupQuestion,
    recommendedInvite,
  };
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
