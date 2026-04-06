"use client";

import {
  archetypePositions,
  axisLabels,
  toSvgCoords,
} from "@/lib/radar-positions";

type InviterRadarPreviewProps = {
  inviterArchetype: string;
  inviterColor: string;
  inviterName: string;
  size?: number;
};

export function InviterRadarPreview({
  inviterArchetype,
  inviterColor,
  inviterName,
  size = 220,
}: InviterRadarPreviewProps) {
  const padding = 32;
  const center = size / 2;
  const innerRadius = (size - padding * 2) / 2;

  // Get inviter's position
  const inviterPos = archetypePositions[inviterArchetype] || { x: 0, y: 0 };
  const inviterCoords = toSvgCoords(inviterPos, size, padding);

  // "You?" placeholder in opposite quadrant for visual interest
  // If inviter is top-right, show "you?" bottom-left, etc.
  const youX = -inviterPos.x * 0.5; // Opposite direction, closer to center
  const youY = -inviterPos.y * 0.5;
  const youCoords = toSvgCoords({ x: youX, y: youY }, size, padding);

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        margin: "0 auto",
      }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
        aria-label={`Radar preview showing ${inviterName}'s position and placeholder for you`}
      >
        {/* Background rings */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="none"
          stroke="rgba(45, 42, 38, 0.08)"
          strokeWidth={1}
        />
        <circle
          cx={center}
          cy={center}
          r={innerRadius * 0.66}
          fill="none"
          stroke="rgba(45, 42, 38, 0.06)"
          strokeWidth={1}
        />
        <circle
          cx={center}
          cy={center}
          r={innerRadius * 0.33}
          fill="none"
          stroke="rgba(45, 42, 38, 0.04)"
          strokeWidth={1}
        />

        {/* Axis lines */}
        <line
          x1={padding}
          y1={center}
          x2={size - padding}
          y2={center}
          stroke="rgba(45, 42, 38, 0.12)"
          strokeWidth={1}
        />
        <line
          x1={center}
          y1={padding}
          x2={center}
          y2={size - padding}
          stroke="rgba(45, 42, 38, 0.12)"
          strokeWidth={1}
        />

        {/* "You?" placeholder - dashed circle */}
        <circle
          cx={youCoords.cx}
          cy={youCoords.cy}
          r={10}
          fill="none"
          stroke="rgba(45, 42, 38, 0.3)"
          strokeWidth={2}
          strokeDasharray="4 3"
        />
        <text
          x={youCoords.cx}
          y={youCoords.cy + 24}
          textAnchor="middle"
          style={{
            fontSize: "11px",
            fontWeight: 500,
            fill: "rgba(45, 42, 38, 0.5)",
            fontFamily: "'Satoshi', system-ui, sans-serif",
          }}
        >
          you?
        </text>

        {/* Inviter's dot */}
        <circle
          cx={inviterCoords.cx}
          cy={inviterCoords.cy}
          r={10}
          fill={inviterColor}
          style={{
            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
          }}
        />
        {/* Inviter's name label */}
        <text
          x={inviterCoords.cx}
          y={inviterCoords.cy - 16}
          textAnchor="middle"
          style={{
            fontSize: "11px",
            fontWeight: 500,
            fill: inviterColor,
            fontFamily: "'Satoshi', system-ui, sans-serif",
          }}
        >
          {inviterName}
        </text>
      </svg>

      {/* Axis labels positioned outside SVG */}
      <div
        style={{
          position: "absolute",
          top: 4,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: "9px",
            fontWeight: 500,
            color: "#2d2a26",
            letterSpacing: "0.02em",
            display: "block",
          }}
        >
          {axisLabels.north.primary}
        </span>
        <span
          style={{
            fontSize: "7px",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "rgba(45, 42, 38, 0.4)",
          }}
        >
          {axisLabels.north.secondary}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 4,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: "9px",
            fontWeight: 500,
            color: "#2d2a26",
            letterSpacing: "0.02em",
            display: "block",
          }}
        >
          {axisLabels.south.primary}
        </span>
        <span
          style={{
            fontSize: "7px",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "rgba(45, 42, 38, 0.4)",
          }}
        >
          {axisLabels.south.secondary}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          right: 2,
          top: "50%",
          transform: "translateY(-50%)",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontSize: "9px",
            fontWeight: 500,
            color: "#2d2a26",
            letterSpacing: "0.02em",
            display: "block",
          }}
        >
          {axisLabels.east.primary}
        </span>
        <span
          style={{
            fontSize: "7px",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "rgba(45, 42, 38, 0.4)",
          }}
        >
          {axisLabels.east.secondary}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          left: 2,
          top: "50%",
          transform: "translateY(-50%)",
          textAlign: "right",
        }}
      >
        <span
          style={{
            fontSize: "9px",
            fontWeight: 500,
            color: "#2d2a26",
            letterSpacing: "0.02em",
            display: "block",
          }}
        >
          {axisLabels.west.primary}
        </span>
        <span
          style={{
            fontSize: "7px",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "rgba(45, 42, 38, 0.4)",
          }}
        >
          {axisLabels.west.secondary}
        </span>
      </div>
    </div>
  );
}
