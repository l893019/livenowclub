// Radar/Compass chart positions for utopia archetypes
// X axis: -1 (Witness) to +1 (Build)
// Y axis: -1 (Root) to +1 (Transcend)
// Center (0, 0) = uncertain/between

export type RadarPosition = {
  x: number;
  y: number;
};

export const archetypePositions: Record<string, RadarPosition> = {
  citizen: { x: 0.4, y: 0.3 },
  shaper: { x: 0.7, y: 0.4 },
  architect: { x: 0.5, y: -0.3 },
  presence: { x: -0.2, y: -0.2 },
  swimmer: { x: -0.5, y: 0.5 },
  rooted: { x: -0.3, y: -0.7 },
  conscience: { x: -0.7, y: -0.2 },
  embers: { x: -0.5, y: -0.6 },
  friction: { x: 0.6, y: 0.5 },
  unbound: { x: 0.3, y: 0.8 },
  alive: { x: 0.2, y: 0.6 },
  mender: { x: 0.3, y: -0.3 },
  cleareyed: { x: -0.7, y: 0.1 },
  between: { x: 0.0, y: 0.0 },
};

// Axis labels for the compass (primary = larger, secondary = smaller/muted)
export const axisLabels = {
  north: { primary: "what could be", secondary: "reach" },
  south: { primary: "what is", secondary: "ground" },
  east: { primary: "what's next", secondary: "build" },
  west: { primary: "what's true", secondary: "perceive" },
};

// Axis descriptions (for the explanation step)
export const axisDescriptions = {
  north: "reaching beyond",
  south: "staying grounded",
  east: "creating change",
  west: "seeing clearly",
};

// Position one-liners for each archetype
export const positionDescriptions: Record<string, string> = {
  citizen: "You trust that abundance, properly shared, tends toward good.",
  shaper: "You can't stop building. The future is raw material.",
  architect: "You focus on the structures that make freedom possible.",
  presence: "You know that undivided attention changes everything.",
  swimmer: "You live in the questions. Wisdom is in the uncertainty.",
  rooted: "You've arrived at something most people spend their lives running from.",
  conscience: "You see what others prefer to ignore.",
  embers: "You keep looking back, because we've already figured most of this out.",
  friction: "Something in you requires resistance. Ease is more dangerous than difficulty.",
  unbound: "The boundary of the self is simply not where you stop.",
  alive: "The universe gave you everything. The least you can do is feel it.",
  mender: "While everyone else is building arks, you're fixing what's in front of you.",
  cleareyed: "You have one job: to see what's actually happening and say it out loud.",
  between: "Everyone else has a position. You have a question.",
};

// Calculate weighted position from top 2 archetype scores
export function getWeightedPosition(
  archetype1: string,
  score1: number,
  archetype2: string,
  score2: number
): RadarPosition {
  const pos1 = archetypePositions[archetype1];
  const pos2 = archetypePositions[archetype2];

  if (!pos1 || !pos2) {
    return { x: 0, y: 0 };
  }

  const totalScore = score1 + score2;
  if (totalScore === 0) {
    return { x: 0, y: 0 };
  }

  return {
    x: (score1 * pos1.x + score2 * pos2.x) / totalScore,
    y: (score1 * pos1.y + score2 * pos2.y) / totalScore,
  };
}

// Calculate center of gravity for a group of positions
export function getGroupCenterOfGravity(
  positions: RadarPosition[]
): RadarPosition {
  if (positions.length === 0) {
    return { x: 0, y: 0 };
  }

  const sumX = positions.reduce((sum, pos) => sum + pos.x, 0);
  const sumY = positions.reduce((sum, pos) => sum + pos.y, 0);

  return {
    x: sumX / positions.length,
    y: sumY / positions.length,
  };
}

// Convert normalized (-1 to 1) coordinates to SVG coordinates
export function toSvgCoords(
  pos: RadarPosition,
  size: number,
  padding: number = 40
): { cx: number; cy: number } {
  const usableSize = size - padding * 2;
  const center = size / 2;

  return {
    cx: center + pos.x * (usableSize / 2),
    cy: center - pos.y * (usableSize / 2), // Flip Y for SVG (Y increases downward)
  };
}

// Calculate axis percentages from radar position
// x axis: -1 = 100% perceive, +1 = 100% build, 0 = 50/50
// y axis: -1 = 100% ground, +1 = 100% reach, 0 = 50/50
export type AxisPercentages = {
  perceivePercent: number;
  buildPercent: number;
  groundPercent: number;
  reachPercent: number;
};

export function getAxisPercentages(pos: RadarPosition): AxisPercentages {
  // Convert x from [-1, 1] to perceive/build percentages
  // x = -1 means 100% perceive, 0% build
  // x = 0 means 50% perceive, 50% build
  // x = 1 means 0% perceive, 100% build
  const buildPercent = Math.round(((pos.x + 1) / 2) * 100);
  const perceivePercent = 100 - buildPercent;

  // Convert y from [-1, 1] to ground/reach percentages
  // y = -1 means 100% ground, 0% reach
  // y = 0 means 50% ground, 50% reach
  // y = 1 means 0% ground, 100% reach
  const reachPercent = Math.round(((pos.y + 1) / 2) * 100);
  const groundPercent = 100 - reachPercent;

  return {
    perceivePercent,
    buildPercent,
    groundPercent,
    reachPercent,
  };
}
