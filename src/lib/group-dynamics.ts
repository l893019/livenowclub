// src/lib/group-dynamics.ts
// Rich group readings for 3+ people - new 4-section structure
// Section 1: Your Group at a Glance
// Section 2: Who Plays What Role
// Section 3: Where You'll Click / Where You'll Push Each Other
// Section 4: What Your Group Might Overdo / Underdo

import { archetypes } from "@/lib/archetypes";
import {
  archetypePositions,
  RadarPosition,
  getGroupCenterOfGravity,
} from "@/lib/radar-positions";
import { getPairReading } from "@/lib/pair-dynamics";

// =============================================================================
// TYPES
// =============================================================================

export type GroupMember = {
  id: string;
  name: string;
  archetype: string;
};

export type Quadrant = "reach" | "ground" | "build" | "perceive";

export type GroupAtGlance = {
  poeticOpening: string;
  strengths: string[];
  struggles: string[];
  whatsMissing: string;
};

export type MemberRole = {
  memberId: string;
  memberName: string;
  archetype: string;
  roleName: string;
  roleDescription: string;
};

export type PairDynamic = {
  memberAId: string;
  memberAName: string;
  memberBId: string;
  memberBName: string;
  type: "click" | "push";
  description: string;
};

export type GroupTendencies = {
  overdo: string[];
  underdo: string[];
  warning: string;
};

export type GroupReading = {
  atGlance: GroupAtGlance;
  roles: MemberRole[];
  pairDynamics: {
    clicks: PairDynamic[];
    pushes: PairDynamic[];
  };
  tendencies: GroupTendencies;
};

// =============================================================================
// QUADRANT HELPERS
// =============================================================================

function getQuadrants(archetype: string): Quadrant[] {
  const pos = archetypePositions[archetype];
  if (!pos) return [];

  const quadrants: Quadrant[] = [];

  // Y axis: positive = reach, negative = ground
  if (pos.y > 0.2) quadrants.push("reach");
  if (pos.y < -0.2) quadrants.push("ground");

  // X axis: positive = build, negative = perceive
  if (pos.x > 0.2) quadrants.push("build");
  if (pos.x < -0.2) quadrants.push("perceive");

  return quadrants;
}

function getDominantQuadrants(members: GroupMember[]): Record<Quadrant, number> {
  const counts: Record<Quadrant, number> = {
    reach: 0,
    ground: 0,
    build: 0,
    perceive: 0,
  };

  for (const member of members) {
    const quadrants = getQuadrants(member.archetype);
    for (const q of quadrants) {
      counts[q]++;
    }
  }

  return counts;
}

function getEmptyQuadrants(members: GroupMember[]): Quadrant[] {
  const counts = getDominantQuadrants(members);
  const empty: Quadrant[] = [];

  for (const [quadrant, count] of Object.entries(counts)) {
    if (count === 0) {
      empty.push(quadrant as Quadrant);
    }
  }

  return empty;
}

// =============================================================================
// SECTION 1: YOUR GROUP AT A GLANCE
// =============================================================================

const quadrantNames: Record<Quadrant, string> = {
  reach: "REACHING",
  ground: "GROUNDING",
  build: "BUILDING",
  perceive: "PERCEIVING",
};

const quadrantStrengths: Record<Quadrant, string[]> = {
  reach: ["vision", "transcendence", "possibility"],
  ground: ["presence", "stability", "what is"],
  build: ["action", "momentum", "making things real"],
  perceive: ["honest observation", "questions", "seeing clearly"],
};

const quadrantStruggles: Record<Quadrant, string[]> = {
  reach: ["staying grounded", "patience with what is", "the slow work"],
  ground: ["dreaming big", "letting go", "transcendence"],
  build: ["pausing", "sitting with questions", "not-knowing"],
  perceive: ["acting", "building", "making the leap"],
};

const quadrantMissing: Record<Quadrant, string> = {
  reach: "No one here is pulling toward REACH — the transcendent, the visionary, the \"what if we became something entirely new?\" You're grounded. Make sure that doesn't become stuck.",
  ground: "No one here is pulling toward GROUND — the rooted, the present, the \"what's actually here right now?\" You're reaching and building. Make sure you stay tethered.",
  build: "No one here is pulling toward BUILD — the maker, the shaper, the \"let's make this real.\" You perceive and question. Make sure something gets made.",
  perceive: "No one here is pulling toward PERCEIVE — the observer, the questioner, the \"what are we not seeing?\" You're all action. Make sure you don't miss what's hidden.",
};

function generateAtGlance(members: GroupMember[]): GroupAtGlance {
  const counts = getDominantQuadrants(members);
  const empty = getEmptyQuadrants(members);

  // Find dominant quadrants (highest counts)
  const sortedQuadrants = Object.entries(counts)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  // Build poetic opening based on dominant orientation
  let poeticOpening = "";
  if (sortedQuadrants.length >= 2) {
    const top = sortedQuadrants[0][0] as Quadrant;
    const second = sortedQuadrants[1][0] as Quadrant;
    poeticOpening = `Your group lives in the space between ${quadrantNames[top]} and ${quadrantNames[second]} — you ${getQuadrantVerb(top)} and ${getQuadrantVerb(second)}.`;
  } else if (sortedQuadrants.length === 1) {
    const top = sortedQuadrants[0][0] as Quadrant;
    poeticOpening = `Your group clusters around ${quadrantNames[top]} — you ${getQuadrantVerb(top)} together.`;
  } else {
    poeticOpening = "Your group is balanced across all orientations — a rare and complex composition.";
  }

  // Gather strengths from dominant quadrants
  const strengths: string[] = [];
  for (const [quadrant, count] of sortedQuadrants.slice(0, 2)) {
    if (count > 0) {
      const qStrengths = quadrantStrengths[quadrant as Quadrant];
      strengths.push(...qStrengths.slice(0, 2));
    }
  }

  // Gather struggles based on dominant quadrants
  const struggles: string[] = [];
  for (const [quadrant, count] of sortedQuadrants.slice(0, 2)) {
    if (count > 0) {
      const qStruggles = quadrantStruggles[quadrant as Quadrant];
      struggles.push(qStruggles[0]);
    }
  }

  // What's missing - based on empty quadrants
  let whatsMissing = "";
  if (empty.length > 0) {
    whatsMissing = quadrantMissing[empty[0]];
  } else {
    whatsMissing = "Every orientation is represented. The work now is making sure each voice gets airtime.";
  }

  return {
    poeticOpening,
    strengths,
    struggles,
    whatsMissing,
  };
}

function getQuadrantVerb(quadrant: Quadrant): string {
  switch (quadrant) {
    case "reach": return "see what's possible and reach for it";
    case "ground": return "stay rooted in what is";
    case "build": return "make things real";
    case "perceive": return "see what's true";
  }
}

// =============================================================================
// SECTION 2: WHO PLAYS WHAT ROLE
// =============================================================================

// Role names for each archetype
const archetypeRoles: Record<string, string> = {
  citizen: "THE AMPLIFIER",
  shaper: "THE ENGINE",
  architect: "THE SYSTEMS THINKER",
  presence: "THE PRESENT",
  swimmer: "THE DEPTH",
  rooted: "THE ANCHOR",
  conscience: "THE WATCHFUL",
  embers: "THE MEMORY",
  friction: "THE EDGE",
  unbound: "THE BEYOND",
  alive: "THE SENSATION",
  mender: "THE REPAIR",
  cleareyed: "THE TRUTH",
  between: "THE QUESTION",
};

// Base descriptions for each archetype's role
const archetypeBaseDescriptions: Record<string, string> = {
  citizen: "You expand what's possible. When others see limits, you see opportunities to make the pie bigger. You remind the group that scarcity is usually a design choice.",
  shaper: "You're the engine. When the group is still weighing options, you're already prototyping. You turn insight into artifact. Without you, nothing ships.",
  architect: "You see the invisible architecture. You're the one asking who this serves and how it could serve everyone. You design for collective ownership.",
  presence: "You're the one who notices when the group is rushing past something important. When others want to solve, you ask: \"Are we actually feeling this?\" You slow things down — not to stall, but to arrive.",
  swimmer: "You hold the questions. When others reach for answers, you stay in uncertainty. You remind the group that not-knowing is sometimes the most honest position.",
  rooted: "You're the anchor. When the group gets swept up in momentum, you're the one asking whether we need to move at all. You embody the radical act of staying still.",
  conscience: "You see what others prefer to ignore. You're the one watching for cracks, costs, who's being left out. In a room of optimists, you're the stress test.",
  embers: "You carry the memory. When the group rushes toward the new, you remember what worked, what was lost, what deserves to be carried forward.",
  friction: "You're the edge. You challenge comfort, question ease, push back when things get too smooth. The group needs your productive resistance.",
  unbound: "You see beyond boundaries. When the group accepts limits, you question them. You remind everyone that what seems fixed can be transcended.",
  alive: "You feel what others analyze. You're the one asking \"what does this actually feel like?\" You ground the group in sensation and experience.",
  mender: "You repair what's broken. When others want to build new, you see what's worth fixing. You're the one who says \"wait, this can be saved.\"",
  cleareyed: "You tell the truth. When others soften their words, you say what's actually happening. The group needs your uncomfortable honesty.",
  between: "You hold the threshold. When others demand positions, you stay in the question. You remind the group that neither/both is a valid answer.",
};

// Modifiers based on group composition
function getRoleModifier(archetype: string, members: GroupMember[]): string {
  const counts = countArchetypes(members);
  const myCount = counts[archetype] || 0;

  // Get quadrant distribution
  const quadrantCounts = getDominantQuadrants(members);
  const myQuadrants = getQuadrants(archetype);

  // Check if only one of this archetype
  if (myCount === 1) {
    // Check if in minority quadrant
    for (const q of myQuadrants) {
      const total = members.length;
      const qCount = quadrantCounts[q];
      if (qCount <= total * 0.25) {
        return getMinorityModifier(archetype, q);
      }
    }
    return "You're the only one here with this orientation. Your perspective is rare in this group — make sure it gets heard.";
  }

  // Multiple of same archetype
  if (myCount > 1) {
    return `There are ${myCount} of you sharing this orientation. You reinforce each other — which can be powerful or an echo chamber. Make sure you're still questioning your shared assumptions.`;
  }

  return "";
}

function getMinorityModifier(archetype: string, minorityQuadrant: Quadrant): string {
  switch (minorityQuadrant) {
    case "reach":
      return "In a group of grounders and perceivers, you're the one pulling toward possibility. They need your vision. Don't let them pull you down too far.";
    case "ground":
      return "In a group of reachers and builders, you're the one keeping feet on earth. They need your anchor. Don't let them make you feel stuck.";
    case "build":
      return "In a group of perceivers and questioners, you're the one who makes things real. They need your momentum. Don't let their questions stop you from acting.";
    case "perceive":
      return "In a group of builders and doers, you're the one who sees what's true. They need your observation. Don't let their momentum rush you past what matters.";
  }
}

function generateRoles(members: GroupMember[]): MemberRole[] {
  return members.map((member) => {
    const arch = archetypes[member.archetype];
    const roleName = archetypeRoles[member.archetype] || "THE UNKNOWN";
    const baseDescription = archetypeBaseDescriptions[member.archetype] || "";
    const modifier = getRoleModifier(member.archetype, members);

    const roleDescription = modifier
      ? `${baseDescription}\n\n${modifier}`
      : baseDescription;

    return {
      memberId: member.id,
      memberName: member.name || "Anonymous",
      archetype: member.archetype,
      roleName,
      roleDescription,
    };
  });
}

// =============================================================================
// SECTION 3: WHERE YOU'LL CLICK / WHERE YOU'LL PUSH
// =============================================================================

function generatePairDynamics(
  members: GroupMember[],
  currentUserId?: string
): { clicks: PairDynamic[]; pushes: PairDynamic[] } {
  const clicks: PairDynamic[] = [];
  const pushes: PairDynamic[] = [];

  // Generate all unique pairs
  for (let i = 0; i < members.length; i++) {
    for (let j = i + 1; j < members.length; j++) {
      const memberA = members[i];
      const memberB = members[j];

      // Get pair reading from pair-dynamics
      const pairReading = getPairReading(memberA.archetype, memberB.archetype);
      if (!pairReading) continue;

      // Calculate distance to determine if it's a click or push
      const posA = archetypePositions[memberA.archetype];
      const posB = archetypePositions[memberB.archetype];

      if (!posA || !posB) continue;

      const distance = Math.sqrt(
        Math.pow(posA.x - posB.x, 2) + Math.pow(posA.y - posB.y, 2)
      );

      // Create short version of the dynamic for group context
      const clickDescription = extractClickPhrase(pairReading.whatYouShare, memberA.name, memberB.name);
      const pushDescription = extractPushPhrase(pairReading.whereYouPush, memberA.name, memberB.name);

      // Close positions = click, far positions = push
      // But every pair has both! We just prioritize
      if (distance < 0.7) {
        // Primarily a click
        clicks.push({
          memberAId: memberA.id,
          memberAName: memberA.name || "Anonymous",
          memberBId: memberB.id,
          memberBName: memberB.name || "Anonymous",
          type: "click",
          description: clickDescription,
        });
      } else {
        // Primarily a push
        pushes.push({
          memberAId: memberA.id,
          memberAName: memberA.name || "Anonymous",
          memberBId: memberB.id,
          memberBName: memberB.name || "Anonymous",
          type: "push",
          description: pushDescription,
        });
      }
    }
  }

  // Sort to prioritize pairs involving current user
  if (currentUserId) {
    const sortByCurrentUser = (a: PairDynamic, b: PairDynamic) => {
      const aInvolves = a.memberAId === currentUserId || a.memberBId === currentUserId;
      const bInvolves = b.memberAId === currentUserId || b.memberBId === currentUserId;
      if (aInvolves && !bInvolves) return -1;
      if (!aInvolves && bInvolves) return 1;
      return 0;
    };
    clicks.sort(sortByCurrentUser);
    pushes.sort(sortByCurrentUser);
  }

  // Limit to top 2-3 each
  return {
    clicks: clicks.slice(0, 3),
    pushes: pushes.slice(0, 3),
  };
}

function extractClickPhrase(whatYouShare: string, nameA: string, nameB: string): string {
  // Take first sentence or two and personalize
  const sentences = whatYouShare.split(/\. /).slice(0, 2).join(". ");
  if (sentences.length > 150) {
    return sentences.slice(0, 147) + "...";
  }
  return sentences + ".";
}

function extractPushPhrase(whereYouPush: string, nameA: string, nameB: string): string {
  // Take first sentence or two and personalize
  const sentences = whereYouPush.split(/\. /).slice(0, 2).join(". ");
  if (sentences.length > 150) {
    return sentences.slice(0, 147) + "...";
  }
  return sentences + ".";
}

// =============================================================================
// SECTION 4: WHAT YOUR GROUP MIGHT OVERDO / UNDERDO
// =============================================================================

const quadrantOverdo: Record<Quadrant, string[]> = {
  reach: ["dreaming without grounding", "transcending without building", "possibility without presence"],
  ground: ["staying when you should move", "accepting when you should challenge", "roots as excuse for stuckness"],
  build: ["shipping before thinking", "action without reflection", "speed without direction"],
  perceive: ["watching without acting", "questioning without concluding", "seeing without making"],
};

const quadrantUnderdo: Record<Quadrant, string[]> = {
  reach: ["vision", "transcendence", "the leap"],
  ground: ["stillness", "presence", "enough"],
  build: ["action", "shipping", "making things real"],
  perceive: ["observation", "questions", "truth-telling"],
};

const quadrantWarnings: Record<Quadrant, string> = {
  reach: "Watch for the moment when vision becomes escape from the present.",
  ground: "Watch for the moment when patience becomes avoidance.",
  build: "Watch for the moment when momentum becomes running from yourself.",
  perceive: "Watch for the moment when observation becomes paralysis.",
};

function generateTendencies(members: GroupMember[]): GroupTendencies {
  const counts = getDominantQuadrants(members);
  const total = members.length;

  // Find heavy and light quadrants
  const sortedQuadrants = Object.entries(counts)
    .sort((a, b) => b[1] - a[1]);

  const heavyQuadrants = sortedQuadrants
    .filter(([, count]) => count >= total * 0.4)
    .map(([q]) => q as Quadrant);

  const lightQuadrants = sortedQuadrants
    .filter(([, count]) => count <= total * 0.1)
    .map(([q]) => q as Quadrant);

  // Build overdo list from heavy quadrants
  const overdo: string[] = [];
  for (const q of heavyQuadrants) {
    overdo.push(...quadrantOverdo[q].slice(0, 2));
  }

  // Build underdo list from light quadrants
  const underdo: string[] = [];
  for (const q of lightQuadrants) {
    underdo.push(...quadrantUnderdo[q].slice(0, 2));
  }

  // Default if no clear pattern
  if (overdo.length === 0) {
    overdo.push("comfortable consensus", "avoiding productive conflict");
  }
  if (underdo.length === 0) {
    underdo.push("productive tension", "challenging each other");
  }

  // Warning from most heavy quadrant
  const warning = heavyQuadrants.length > 0
    ? quadrantWarnings[heavyQuadrants[0]]
    : "Watch for the moment when agreement becomes avoidance.";

  return {
    overdo: overdo.slice(0, 4),
    underdo: underdo.slice(0, 4),
    warning,
  };
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function countArchetypes(members: GroupMember[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const member of members) {
    counts[member.archetype] = (counts[member.archetype] || 0) + 1;
  }
  return counts;
}

// =============================================================================
// MAIN FUNCTION
// =============================================================================

export function generateGroupReading(
  members: GroupMember[],
  currentUserId?: string
): GroupReading {
  if (members.length < 3) {
    throw new Error("Group reading requires at least 3 members");
  }

  return {
    atGlance: generateAtGlance(members),
    roles: generateRoles(members),
    pairDynamics: generatePairDynamics(members, currentUserId),
    tendencies: generateTendencies(members),
  };
}

// =============================================================================
// EXPORTS FOR USE IN COMPONENTS
// =============================================================================

export { getQuadrants, getDominantQuadrants, getEmptyQuadrants };
