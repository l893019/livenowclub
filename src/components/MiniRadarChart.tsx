"use client";

import { archetypes } from "@/lib/archetypes";
import {
  archetypePositions,
  getGroupCenterOfGravity,
  toSvgCoords,
  type RadarPosition,
} from "@/lib/radar-positions";
import styles from "./MiniRadarChart.module.css";

type MiniRadarChartProps = {
  members: { archetype: string }[];
  size?: number;
};

export function MiniRadarChart({ members, size = 80 }: MiniRadarChartProps) {
  const padding = 8;
  const center = size / 2;
  const innerRadius = (size - padding * 2) / 2;

  // Get positions for all members
  const positions = members.map(
    (m) => archetypePositions[m.archetype] || { x: 0, y: 0 }
  );
  const centerOfGravity = getGroupCenterOfGravity(positions);

  return (
    <div className={styles.container} style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className={styles.svg}
        aria-label="Mini radar chart"
      >
        {/* Single background ring */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          className={styles.ring}
        />

        {/* Crosshairs */}
        <line
          x1={padding}
          y1={center}
          x2={size - padding}
          y2={center}
          className={styles.axis}
        />
        <line
          x1={center}
          y1={padding}
          x2={center}
          y2={size - padding}
          className={styles.axis}
        />

        {/* Member dots */}
        {members.map((m, i) => {
          const pos = archetypePositions[m.archetype] || { x: 0, y: 0 };
          const { cx, cy } = toSvgCoords(pos, size, padding);
          const color = archetypes[m.archetype]?.color || "#888";
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={3}
              fill={color}
              className={styles.dot}
            />
          );
        })}

        {/* Center of gravity */}
        {members.length > 1 && (
          <circle
            cx={toSvgCoords(centerOfGravity, size, padding).cx}
            cy={toSvgCoords(centerOfGravity, size, padding).cy}
            r={4}
            fill="none"
            stroke="#e8178a"
            strokeWidth={1.5}
            className={styles.center}
          />
        )}
      </svg>
    </div>
  );
}
