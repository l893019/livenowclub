"use client";

import { archetypes } from "@/lib/archetypes";
import {
  archetypePositions,
  axisLabels,
  toSvgCoords,
  type RadarPosition,
} from "@/lib/radar-positions";
import styles from "./RadarChart.module.css";

type UserDot = {
  id: string;
  name: string;
  position: RadarPosition;
  color: string;
  isYou?: boolean;
};

type RadarChartProps = {
  size?: number;
  userDots?: UserDot[];
  centerOfGravity?: RadarPosition;
  highlightArchetype?: string;
  showAllArchetypes?: boolean;
  onDotClick?: (dotId: string) => void;
};

export function RadarChart({
  size = 300,
  userDots = [],
  centerOfGravity,
  highlightArchetype,
  showAllArchetypes = true,
  onDotClick,
}: RadarChartProps) {
  const padding = 40;
  const center = size / 2;
  const innerRadius = (size - padding * 2) / 2;

  // Draw concentric circles for conviction rings
  const rings = [0.33, 0.66, 1.0];

  return (
    <div className={styles.container} style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className={styles.svg}
        aria-label="Worldview compass showing archetype positions"
      >
        {/* Background circles for conviction levels */}
        {rings.map((ring, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={innerRadius * ring}
            className={styles.ring}
          />
        ))}

        {/* Axis lines */}
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

        {/* All archetype positions (background dots) */}
        {showAllArchetypes &&
          Object.entries(archetypePositions).map(([key, pos]) => {
            const { cx, cy } = toSvgCoords(pos, size, padding);
            const isHighlighted = key === highlightArchetype;
            const color = archetypes[key]?.color || "#888";

            return (
              <g key={key}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHighlighted ? 8 : 5}
                  fill={color}
                  opacity={isHighlighted ? 1 : 0.25}
                  className={styles.archetypeDot}
                />
                {isHighlighted && (
                  <text
                    x={cx}
                    y={cy - 14}
                    textAnchor="middle"
                    className={styles.archetypeLabel}
                    fill={color}
                  >
                    {archetypes[key]?.name || key}
                  </text>
                )}
              </g>
            );
          })}

        {/* User dots */}
        {userDots.map((dot) => {
          const { cx, cy } = toSvgCoords(dot.position, size, padding);
          const isClickable = !!onDotClick;
          return (
            <g
              key={dot.id}
              onClick={isClickable ? () => onDotClick(dot.id) : undefined}
              className={isClickable ? styles.clickableDot : undefined}
            >
              <circle
                cx={cx}
                cy={cy}
                r={dot.isYou ? 10 : 7}
                fill={dot.color}
                className={styles.userDot}
              />
              {dot.isYou && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={14}
                  fill="none"
                  stroke={dot.color}
                  strokeWidth={2}
                  opacity={0.4}
                />
              )}
            </g>
          );
        })}

        {/* Center of gravity for groups */}
        {centerOfGravity && (
          <g>
            <circle
              cx={toSvgCoords(centerOfGravity, size, padding).cx}
              cy={toSvgCoords(centerOfGravity, size, padding).cy}
              r={6}
              fill="none"
              stroke="#e8178a"
              strokeWidth={2}
              className={styles.centerOfGravity}
            />
            <circle
              cx={toSvgCoords(centerOfGravity, size, padding).cx}
              cy={toSvgCoords(centerOfGravity, size, padding).cy}
              r={12}
              fill="none"
              stroke="#e8178a"
              strokeWidth={1}
              opacity={0.3}
              strokeDasharray="4 2"
            />
          </g>
        )}
      </svg>

      {/* Axis labels */}
      <div className={`${styles.labelGroup} ${styles.labelNorth}`}>
        <span className={styles.labelPrimary}>{axisLabels.north.primary}</span>
        <span className={styles.labelSecondary}>
          {axisLabels.north.secondary}
        </span>
      </div>
      <div className={`${styles.labelGroup} ${styles.labelSouth}`}>
        <span className={styles.labelPrimary}>{axisLabels.south.primary}</span>
        <span className={styles.labelSecondary}>
          {axisLabels.south.secondary}
        </span>
      </div>
      <div className={`${styles.labelGroup} ${styles.labelEast}`}>
        <span className={styles.labelPrimary}>{axisLabels.east.primary}</span>
        <span className={styles.labelSecondary}>
          {axisLabels.east.secondary}
        </span>
      </div>
      <div className={`${styles.labelGroup} ${styles.labelWest}`}>
        <span className={styles.labelPrimary}>{axisLabels.west.primary}</span>
        <span className={styles.labelSecondary}>
          {axisLabels.west.secondary}
        </span>
      </div>
    </div>
  );
}
