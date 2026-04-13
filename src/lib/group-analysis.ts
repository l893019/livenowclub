// src/lib/group-analysis.ts
// Group composition analysis algorithms for Group Reading feature

import {
  archetypes,
  archetypeKeys,
  Archetype,
  getPairDistance,
  getPairDynamicExpanded,
  PairDynamic,
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

export type GroupUtopia = {
  whatYoudBuild: string;
  whatWouldBeStrong: string;
  whatWouldBeMissing: string;
  questionYoureAnswering: string;
};

export type GroupAnalysis = {
  centerOfGravity: GroupCenterOfGravity;
  composition: CompositionAnalysis;
  groupUtopia: GroupUtopia;
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

  // Abundant + others
  if (powerSet.has("trusting abundance") && powerSet.has("feeling everything")) return "Generous Aliveness";
  if (powerSet.has("trusting abundance") && powerSet.has("building from scratch")) return "Abundant Creation";
  if (powerSet.has("trusting abundance") && powerSet.has("thinking in systems")) return "Systems of Plenty";
  if (powerSet.has("trusting abundance") && powerSet.has("showing up fully")) return "Present Generosity";
  if (powerSet.has("trusting abundance") && powerSet.has("fixing what's broken")) return "Restorative Abundance";
  if (powerSet.has("trusting abundance") && powerSet.has("spotting what's hidden")) return "Vigilant Optimism";

  // Builder + others
  if (powerSet.has("building from scratch") && powerSet.has("thinking in systems")) return "Architectural Vision";
  if (powerSet.has("building from scratch") && powerSet.has("embracing difficulty")) return "Constructive Friction";
  if (powerSet.has("building from scratch") && powerSet.has("imagining beyond limits")) return "Transcendent Construction";
  if (powerSet.has("building from scratch") && powerSet.has("fixing what's broken")) return "Build and Mend";
  if (powerSet.has("building from scratch") && powerSet.has("remembering what matters")) return "Building from Memory";
  if (powerSet.has("building from scratch") && powerSet.has("spotting what's hidden")) return "Watchful Building";

  // Architect + others
  if (powerSet.has("thinking in systems") && powerSet.has("fixing what's broken")) return "Systemic Repair";
  if (powerSet.has("thinking in systems") && powerSet.has("showing up fully")) return "Present Architecture";
  if (powerSet.has("thinking in systems") && powerSet.has("remembering what matters")) return "Enduring Systems";
  if (powerSet.has("thinking in systems") && powerSet.has("spotting what's hidden")) return "Structural Vigilance";

  // Present + others
  if (powerSet.has("showing up fully") && powerSet.has("sitting with hard questions")) return "Present Inquiry";
  if (powerSet.has("showing up fully") && powerSet.has("knowing when to stop")) return "Rooted Presence";
  if (powerSet.has("showing up fully") && powerSet.has("feeling everything")) return "Embodied Attention";
  if (powerSet.has("showing up fully") && powerSet.has("telling hard truths")) return "Truth in Presence";

  // Questioner + others
  if (powerSet.has("sitting with hard questions") && powerSet.has("holding uncertainty")) return "Comfortable Mystery";
  if (powerSet.has("sitting with hard questions") && powerSet.has("imagining beyond limits")) return "Questioning Beyond";
  if (powerSet.has("sitting with hard questions") && powerSet.has("spotting what's hidden")) return "Investigative Depth";
  if (powerSet.has("sitting with hard questions") && powerSet.has("feeling everything")) return "Felt Inquiry";

  // Rooted + others
  if (powerSet.has("knowing when to stop") && powerSet.has("holding uncertainty")) return "Grounded Openness";
  if (powerSet.has("knowing when to stop") && powerSet.has("remembering what matters")) return "Rooted Memory";
  if (powerSet.has("knowing when to stop") && powerSet.has("fixing what's broken")) return "Patient Repair";

  // Witness + others
  if (powerSet.has("spotting what's hidden") && powerSet.has("telling hard truths")) return "Unflinching Clarity";
  if (powerSet.has("spotting what's hidden") && powerSet.has("fixing what's broken")) return "Seeing to Mend";
  if (powerSet.has("spotting what's hidden") && powerSet.has("remembering what matters")) return "Vigilant Memory";

  // Keeper + others
  if (powerSet.has("remembering what matters") && powerSet.has("fixing what's broken")) return "Restorative Memory";
  if (powerSet.has("remembering what matters") && powerSet.has("holding uncertainty")) return "Memory in Motion";
  if (powerSet.has("remembering what matters") && powerSet.has("feeling everything")) return "Felt History";

  // Challenger + others
  if (powerSet.has("embracing difficulty") && powerSet.has("imagining beyond limits")) return "Transcendent Struggle";
  if (powerSet.has("embracing difficulty") && powerSet.has("feeling everything")) return "Difficult Joy";
  if (powerSet.has("embracing difficulty") && powerSet.has("telling hard truths")) return "Unflinching Challenge";
  if (powerSet.has("embracing difficulty") && powerSet.has("fixing what's broken")) return "Hard Repair";

  // Transcendent + others
  if (powerSet.has("imagining beyond limits") && powerSet.has("feeling everything")) return "Boundless Sensation";
  if (powerSet.has("imagining beyond limits") && powerSet.has("holding uncertainty")) return "Open Transcendence";
  if (powerSet.has("imagining beyond limits") && powerSet.has("telling hard truths")) return "Truth Beyond";

  // Feeler + others
  if (powerSet.has("feeling everything") && powerSet.has("fixing what's broken")) return "Healing Touch";
  if (powerSet.has("feeling everything") && powerSet.has("telling hard truths")) return "Felt Truth";
  if (powerSet.has("feeling everything") && powerSet.has("holding uncertainty")) return "Feeling Through";

  // Mender + others
  if (powerSet.has("fixing what's broken") && powerSet.has("telling hard truths")) return "Honest Repair";
  if (powerSet.has("fixing what's broken") && powerSet.has("holding uncertainty")) return "Uncertain Mending";

  // Truth-Teller + others
  if (powerSet.has("telling hard truths") && powerSet.has("holding uncertainty")) return "Honest Uncertainty";

  // Default: combine the first two powers meaningfully
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
  citizen: `The Abundant would bring trust in possibility to this group. They would remind you that scarcity is often manufactured, that systems can work for everyone, and that optimism is not naivety but a position argued and defended. In discussions that drift toward zero-sum thinking, they would ask: why are we assuming there isn't enough?`,
  shaper: `The Builder would bring momentum to this group. They would push when others settle, question when others accept, and remind you that everything is raw material for what comes next. In moments of stagnation, they would ask: what are we waiting for?`,
  architect: `The Architect would bring systems thinking to this group. They would see the invisible structures that shape your interactions, question who the current arrangement serves, and propose designs that distribute power rather than concentrate it. In discussions that get stuck on individuals, they would ask: what structure is creating this pattern?`,
  presence: `The Present would bring attention to this group. They would slow the conversation when it races past what matters, hold space when others fill silence with noise, and remind you that the quality of your attention shapes the quality of your outcomes. In moments of distraction, they would ask: are we actually here?`,
  swimmer: `The Questioner would bring philosophical depth to this group. They would sit with questions others rush past, notice the assumptions beneath your certainties, and remind you that not-knowing can be its own form of wisdom. In moments of premature closure, they would ask: what are we still not seeing?`,
  rooted: `The Rooted would bring groundedness to this group. They would question the assumption that more and faster are always better, hold space for doing nothing when others reach for action, and remind you that stopping can be the most radical choice. In moments of acceleration, they would ask: do we actually need to do this?`,
  conscience: `The Witness would bring vigilance to this group. They would see the costs others prefer to ignore, question systems that seem too convenient, and remind you that dystopia always arrives disguised as efficiency. In moments of comfortable agreement, they would ask: what are we not seeing?`,
  embers: `The Keeper would bring memory to this group. They would recall what worked before, what was lost and shouldn't have been, and what wisdom already exists in human history. In moments of reinvention, they would ask: have we already solved this?`,
  friction: `The Challenger would bring challenge to this group. They would question whether ease is always good, seek difficulty when others seek comfort, and remind you that growth requires resistance. In moments of consensus, they would ask: is this too easy?`,
  unbound: `The Transcendent would bring expansiveness to this group. They would question the boundaries you take for granted, imagine possibilities beyond current constraints, and remind you that what seems fixed can be transcended. In moments of limitation, they would ask: what if we're thinking too small?`,
  alive: `The Feeler would bring sensation to this group. They would notice what others think past, feel what others analyze, and remind you that experience is the point. In moments of abstraction, they would ask: what does this actually feel like?`,
  mender: `The Mender would bring repair to this group. They would focus on fixing what exists rather than building new, value maintenance over innovation, and remind you that the most advanced engineering is making what exists work again. In moments of abandonment, they would ask: can this be saved?`,
  cleareyed: `The Truth-Teller would bring honesty to this group. They would say what others soften, see what others prefer to ignore, and remind you that truth matters more than comfort. In moments of pleasant fiction, they would ask: what's actually true here?`,
  between: `The Liminal would bring uncertainty to this group. They would question fixed positions, hold space for not-knowing, and remind you that the threshold is a valid place to stand. In moments of forced choice, they would ask: what if neither option is right?`,
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
      const { value } = getPairDistance(a, b);

      // Only surface tensions for pairs with distance > 0.8
      if (value > 0.8) {
        const tensionLevel: "high" | "medium" = value > 1.2 ? "high" : "medium";
        const pairDynamic = getPairDynamicExpanded(a, b);

        tensions.push({
          archetypeA: a,
          archetypeB: b,
          tensionLevel,
          thesis: pairDynamic.thesis,
          howToNavigate: generateNavigationAdvice(a, b, pairDynamic, tensionLevel),
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
  pairDynamic: PairDynamic,
  tensionLevel: "high" | "medium"
): string {
  const archA = archetypes[a];
  const archB = archetypes[b];

  // Use the specific clash points from pair dynamics
  const clashDescription = pairDynamic.clash.join(" ");

  // Build navigation advice from specific content
  let advice = `${clashDescription} `;

  if (pairDynamic.warning) {
    advice += `${pairDynamic.warning} `;
  }

  // Add what they give each other as resolution path
  advice += `The key to navigating this: ${archA?.name || a} offers ${pairDynamic.give.youToThem.toLowerCase()}. ${archB?.name || b} offers ${pairDynamic.give.themToYou.toLowerCase()}. `;

  // Add the reflection question
  advice += `When you disagree, ask yourselves: ${pairDynamic.question}`;

  return advice;
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
// 8. GROUP UTOPIA (What You'd Build Together)
// =============================================================================

// Quadrant descriptions for what groups build
const quadrantBuilds: Record<Quadrant, { build: string; strong: string }> = {
  "build-transcend": {
    build: `This group reaches upward while making things happen. You're not content with what exists—you build toward what could be. Together, you'd create ventures, projects, or practices that push past current limits while actually shipping.

Your shared orientation: make something that matters AND make it real. Neither pure vision nor pure execution satisfies you. You want both.`,
    strong: `Momentum toward the new. This group doesn't get stuck in either endless planning or mindless action. You'd move quickly toward things worth moving toward.

You'd be good at starting things that seem impossible, at convincing others something unprecedented is worth attempting, at maintaining energy when the work is hard.`
  },
  "build-root": {
    build: `This group builds from what's proven. You're makers who respect foundations—creating from stability rather than disruption. Together, you'd create things that last because they're built on solid ground.

Your shared orientation: make something real AND make it endure. You're not interested in novelty for its own sake. You want to build what will still be standing.`,
    strong: `Durability. This group creates things that survive because you take foundations seriously. You'd be good at building institutions, practices, or relationships that improve over time rather than flash and fade.

You'd also be good at saying no to things that seem exciting but aren't worth the instability they'd introduce.`
  },
  "witness-transcend": {
    build: `This group sees further than most. You're oriented toward understanding what others miss, toward perceiving beyond the obvious. Together, you'd create insight—frameworks, teachings, or art that reveals what's hidden.

Your shared orientation: see clearly AND see beyond. You're not satisfied with surface truth or with staying within known limits. You want to understand the edges.`,
    strong: `Vision. This group perceives what others don't. You'd be good at asking questions no one else thinks to ask, at noticing patterns others miss, at articulating truths that haven't been spoken yet.

You'd also be good at holding complexity—seeing multiple layers at once without needing to resolve them prematurely.`
  },
  "witness-root": {
    build: `This group stays present to what's actually here. You're not reaching for the transcendent or rushing to build—you're seeing clearly what exists right now. Together, you'd create presence, attention, and honest observation.

Your shared orientation: see clearly AND stay grounded. You're the ones who notice when the emperor has no clothes, who ask whether the obvious solution actually addresses the real problem.`,
    strong: `Groundedness. This group doesn't get swept up in enthusiasm or urgency. You'd be good at slowing things down when speed serves no one, at asking whether action is actually needed, at being honest about what's working and what isn't.

You'd also be good at maintenance—valuing what exists rather than always chasing what's next.`
  }
};

// What different composition distributions create
function getCompositionNarrative(composition: CompositionAnalysis): string {
  const { buildVsWitness, rootVsTranscend, dominantArchetypes } = composition;

  let narrative = "";

  // Axis balance narrative
  if (Math.abs(buildVsWitness.build - buildVsWitness.witness) < 20) {
    narrative += "Your group balances action and observation—you make things happen AND you watch carefully to see what's actually happening. ";
  } else if (buildVsWitness.build > 60) {
    narrative += "Your group leans toward action—you're more likely to build, create, and intervene than to step back and observe. ";
  } else {
    narrative += "Your group leans toward observation—you're more likely to watch, question, and understand than to jump into action. ";
  }

  if (Math.abs(rootVsTranscend.root - rootVsTranscend.transcend) < 20) {
    narrative += "You also balance between grounding and reaching—staying present to what is while remaining open to what could be.";
  } else if (rootVsTranscend.transcend > 60) {
    narrative += "You also lean toward transcendence—more interested in what lies beyond than in what's established.";
  } else {
    narrative += "You also lean toward grounding—more interested in what's proven than in what's possible.";
  }

  return narrative;
}

// Generate what perspectives would expand the group (reframed from "missing")
function getExpandingPerspectives(
  missingArchetypes: string[],
  presentArchetypes: string[]
): string {
  if (missingArchetypes.length === 0) {
    return "Your group includes every worldview. The question isn't what's missing—it's how to give space to each perspective when decisions need to be made.";
  }

  // Get the names of missing archetypes (max 3)
  const missingNames = missingArchetypes
    .slice(0, 3)
    .map(k => archetypes[k]?.name || k);

  let text = `Perspectives that would expand what you build: ${missingNames.join(", ")}. `;

  // Add what those perspectives would contribute
  const contributions: string[] = [];
  for (const key of missingArchetypes.slice(0, 2)) {
    const arch = archetypes[key];
    if (arch) {
      const superpower = arch.superpower;
      contributions.push(`${arch.name}'s gift of ${superpower.toLowerCase()}`);
    }
  }

  if (contributions.length > 0) {
    text += `These worldviews would bring ${contributions.join(" and ")}—questions and instincts your current mix doesn't naturally generate.`;
  }

  return text;
}

/**
 * Generate the complete group utopia content
 */
export function generateGroupUtopia(
  members: GroupMember[],
  centerOfGravity: GroupCenterOfGravity,
  composition: CompositionAnalysis,
  groupQuestion: GroupQuestion
): GroupUtopia {
  const presentArchetypes = getPresentArchetypes(members);
  const missingArchetypes = archetypeKeys.filter(k => !presentArchetypes.includes(k));

  // Get quadrant-based content
  const quadrantContent = quadrantBuilds[centerOfGravity.dominantQuadrant];

  // Build "What You'd Build Together"
  const compositionNarrative = getCompositionNarrative(composition);
  const whatYoudBuild = `${quadrantContent.build}\n\n${compositionNarrative}`;

  // "What Would Be Strong" - from quadrant + collective superpower elements
  const whatWouldBeStrong = quadrantContent.strong;

  // "What Would Be Missing" - reframed as invitation to expand
  const expandingPerspectives = getExpandingPerspectives(missingArchetypes, presentArchetypes);

  // Get shared blind spots (present archetypes' common blindspots)
  const blindSpotCounts: Record<string, number> = {};
  for (const arch of presentArchetypes) {
    const blindSpot = archetypes[arch]?.blindSpot;
    if (blindSpot) {
      blindSpotCounts[blindSpot] = (blindSpotCounts[blindSpot] || 0) + 1;
    }
  }

  // Find most shared blind spot
  let sharedBlindSpot = "";
  let maxCount = 0;
  for (const [spot, count] of Object.entries(blindSpotCounts)) {
    if (count > maxCount) {
      maxCount = count;
      sharedBlindSpot = spot;
    }
  }

  let whatWouldBeMissing = expandingPerspectives;
  if (sharedBlindSpot && maxCount >= 2) {
    whatWouldBeMissing += `\n\nA pattern to watch: ${sharedBlindSpot.charAt(0).toLowerCase()}${sharedBlindSpot.slice(1)} This shows up in multiple members—which means it's easy for the whole group to miss.`;
  }

  // "The Question You're Answering"
  const questionYoureAnswering = groupQuestion.question;

  return {
    whatYoudBuild,
    whatWouldBeStrong,
    whatWouldBeMissing,
    questionYoureAnswering
  };
}

// =============================================================================
// 9. RECOMMENDED INVITE
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

  // 9. Generate group utopia (what you'd build together)
  const groupUtopia = generateGroupUtopia(
    members,
    centerOfGravity,
    composition,
    groupQuestion
  );

  return {
    centerOfGravity,
    composition,
    groupUtopia,
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
