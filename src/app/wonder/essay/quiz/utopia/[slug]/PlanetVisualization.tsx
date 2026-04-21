"use client";

import { useMemo, useState } from "react";

type PlanetVisualizationProps = {
  archetypes: string[];
  size?: number;
};

// Archetype colors and names
const archetypeInfo: Record<string, { color: string; name: string }> = {
  citizen: { color: "#3db9a4", name: "The Abundant" },
  shaper: { color: "#f4a03f", name: "The Builder" },
  architect: { color: "#9b8fef", name: "The Architect" },
  presence: { color: "#e8178a", name: "The Present" },
  swimmer: { color: "#6b8fef", name: "The Deep" },
  rooted: { color: "#7ed6a4", name: "The Rooted" },
  conscience: { color: "#d64545", name: "The Guardian" },
  embers: { color: "#c97d3a", name: "The Keeper" },
  friction: { color: "#ff6b35", name: "The Challenger" },
  unbound: { color: "#a855f7", name: "The Transcendent" },
  alive: { color: "#f472b6", name: "The Alive" },
  mender: { color: "#10b981", name: "The Mender" },
  cleareyed: { color: "#64748b", name: "The Truth-Teller" },
  between: { color: "#8b8b8b", name: "The Liminal" },
};

const allArchetypes = Object.keys(archetypeInfo);

export default function PlanetVisualization({
  archetypes,
  size = 280,
}: PlanetVisualizationProps) {
  const [hoveredArch, setHoveredArch] = useState<string | null>(null);
  const memberCount = archetypes.length;

  // Count each archetype
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const arch of archetypes) {
      c[arch] = (c[arch] || 0) + 1;
    }
    return c;
  }, [archetypes]);

  // Find missing archetypes
  const missing = useMemo(() => {
    return allArchetypes.filter((arch) => !counts[arch]);
  }, [counts]);

  // Build ring segments - present archetypes get proportional space, missing get equal tiny slices
  const segments = useMemo(() => {
    if (memberCount === 0) {
      // All missing - equal distribution
      return allArchetypes.map((arch, i) => ({
        arch,
        count: 0,
        isMissing: true,
        startAngle: -90 + (360 / allArchetypes.length) * i,
        endAngle: -90 + (360 / allArchetypes.length) * (i + 1),
        color: archetypeInfo[arch]?.color || "#666",
      }));
    }

    // Present archetypes take 85% of the ring, missing take 15%
    const presentPercent = 0.85;
    const missingPercent = 0.15;

    const presentArchetypes = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const missingCount = missing.length;

    const result: {
      arch: string;
      count: number;
      isMissing: boolean;
      startAngle: number;
      endAngle: number;
      color: string;
    }[] = [];

    let currentAngle = -90;

    // Add present archetypes
    for (const [arch, count] of presentArchetypes) {
      const percentage = (count / memberCount) * presentPercent;
      const angle = percentage * 360;
      result.push({
        arch,
        count,
        isMissing: false,
        startAngle: currentAngle,
        endAngle: currentAngle + angle,
        color: archetypeInfo[arch]?.color || "#666",
      });
      currentAngle += angle;
    }

    // Add missing archetypes (equal small slices)
    if (missingCount > 0) {
      const missingAngle = (missingPercent * 360) / missingCount;
      for (const arch of missing) {
        result.push({
          arch,
          count: 0,
          isMissing: true,
          startAngle: currentAngle,
          endAngle: currentAngle + missingAngle,
          color: archetypeInfo[arch]?.color || "#666",
        });
        currentAngle += missingAngle;
      }
    }

    return result;
  }, [counts, memberCount, missing]);

  // Choose planet image based on group size
  const planetImage = useMemo(() => {
    if (memberCount <= 1) return "/wonder/essay/quiz/images/planet-solo.png";
    if (memberCount <= 4) return "/wonder/essay/quiz/images/planet-group.png";
    return "/wonder/essay/quiz/images/planet-full.png";
  }, [memberCount]);

  // SVG arc path helper
  const describeArc = (
    cx: number,
    cy: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ) => {
    const start = polarToCartesian(cx, cy, radius, endAngle);
    const end = polarToCartesian(cx, cy, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    ].join(" ");
  };

  const polarToCartesian = (
    cx: number,
    cy: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: cx + radius * Math.cos(angleInRadians),
      y: cy + radius * Math.sin(angleInRadians),
    };
  };

  // Get midpoint of arc for label positioning
  const getArcMidpoint = (startAngle: number, endAngle: number, radius: number, cx: number, cy: number) => {
    const midAngle = (startAngle + endAngle) / 2;
    return polarToCartesian(cx, cy, radius, midAngle);
  };

  const ringRadius = size / 2 + 20;
  const ringWidth = 10;
  const svgSize = size + 80;
  const center = svgSize / 2;

  // Get hovered segment info
  const hoveredSegment = segments.find((s) => s.arch === hoveredArch);

  return (
    <div className="planet-container" style={{ width: svgSize, height: svgSize }}>
      {/* Composition ring */}
      <svg
        width={svgSize}
        height={svgSize}
        className="composition-ring"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {segments.map((seg) => {
          const isHovered = hoveredArch === seg.arch;
          const gap = 1.5;
          const adjustedStart = seg.startAngle + gap / 2;
          const adjustedEnd = seg.endAngle - gap / 2;

          if (adjustedEnd <= adjustedStart) return null;

          // For very small segments, just return null
          if (adjustedEnd - adjustedStart < 2) return null;

          return (
            <path
              key={seg.arch}
              d={describeArc(center, center, ringRadius, adjustedStart, adjustedEnd)}
              fill="none"
              stroke={seg.color}
              strokeWidth={isHovered ? ringWidth + 4 : ringWidth}
              strokeLinecap="round"
              opacity={seg.isMissing ? 0.2 : 1}
              style={{
                filter: isHovered ? `drop-shadow(0 0 8px ${seg.color})` :
                        seg.isMissing ? "none" : `drop-shadow(0 0 4px ${seg.color}40)`,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={() => setHoveredArch(seg.arch)}
              onMouseLeave={() => setHoveredArch(null)}
            />
          );
        })}
      </svg>

      {/* Planet image */}
      <img
        src={planetImage}
        alt="Utopia planet"
        className="planet-image"
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          position: "absolute",
          top: (svgSize - size) / 2,
          left: (svgSize - size) / 2,
        }}
      />

      {/* Hover tooltip */}
      {hoveredSegment && (
        <div
          className="hover-tooltip"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(255, 255, 255, 0.95)",
            padding: "12px 16px",
            borderRadius: "8px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            textAlign: "center",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: hoveredSegment.color,
              marginBottom: "4px",
            }}
          >
            {archetypeInfo[hoveredSegment.arch]?.name || hoveredSegment.arch}
          </div>
          <div style={{ fontSize: "14px", color: "#2d2a26" }}>
            {hoveredSegment.isMissing ? (
              <span style={{ fontStyle: "italic", color: "rgba(45,42,38,0.5)" }}>
                No one yet
              </span>
            ) : (
              `${hoveredSegment.count} ${hoveredSegment.count === 1 ? "person" : "people"}`
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .planet-container {
          position: relative;
          animation: float 6s ease-in-out infinite;
        }

        .planet-image {
          display: block;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15),
            0 0 60px rgba(232, 23, 138, 0.1);
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
}
