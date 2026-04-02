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

// Axis labels for the compass
export const axisLabels = {
  north: "Transcend",
  south: "Root",
  east: "Build",
  west: "Witness",
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
