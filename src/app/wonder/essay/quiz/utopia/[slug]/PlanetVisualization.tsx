"use client";

import { useMemo } from "react";

type PlanetVisualizationProps = {
  archetypes: string[];
  size?: number;
};

// Archetype visual data
const archetypeVisuals: Record<
  string,
  {
    color: string;
    pattern: "dots" | "lines" | "waves" | "grid" | "circles" | "spikes" | "glow";
    label: string;
  }
> = {
  citizen: { color: "#3db9a4", pattern: "dots", label: "Parklands" },
  shaper: { color: "#f4a03f", pattern: "lines", label: "Construction" },
  architect: { color: "#9b8fef", pattern: "grid", label: "Civic halls" },
  presence: { color: "#e8178a", pattern: "dots", label: "Dwellings" },
  swimmer: { color: "#6b8fef", pattern: "waves", label: "Deep waters" },
  rooted: { color: "#7ed6a4", pattern: "circles", label: "Gardens" },
  conscience: { color: "#d64545", pattern: "lines", label: "Watchtowers" },
  embers: { color: "#c97d3a", pattern: "dots", label: "Archives" },
  friction: { color: "#ff6b35", pattern: "spikes", label: "Mountains" },
  unbound: { color: "#a855f7", pattern: "glow", label: "Abstract" },
  alive: { color: "#f472b6", pattern: "glow", label: "Light regions" },
  mender: { color: "#10b981", pattern: "grid", label: "Workshops" },
  cleareyed: { color: "#64748b", pattern: "lines", label: "Tower" },
  between: { color: "#8b8b8b", pattern: "waves", label: "Unformed" },
};

export default function PlanetVisualization({
  archetypes,
  size = 280,
}: PlanetVisualizationProps) {
  // Get unique archetypes and their positions
  const segments = useMemo(() => {
    const unique = [...new Set(archetypes)];
    const count = unique.length;
    if (count === 0) return [];

    return unique.map((arch, i) => {
      const angle = (360 / count) * i;
      const visual = archetypeVisuals[arch];
      return {
        archetype: arch,
        angle,
        color: visual?.color || "#666",
        pattern: visual?.pattern || "dots",
      };
    });
  }, [archetypes]);

  // Calculate how "complete" the planet is
  const completeness = Math.min(segments.length / 14, 1);
  const baseOpacity = 0.3 + completeness * 0.4;

  return (
    <div
      className="planet-container"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Gradient for planet base */}
          <radialGradient id="planetBase" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#2a2a3e" />
            <stop offset="100%" stopColor="#1a1a2e" />
          </radialGradient>

          {/* Atmosphere glow */}
          <radialGradient id="atmosphere" cx="50%" cy="50%">
            <stop offset="70%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(232, 23, 138, 0.15)" />
          </radialGradient>

          {/* Pattern definitions */}
          <pattern id="patternDots" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="1.5" fill="currentColor" opacity="0.6" />
          </pattern>

          <pattern id="patternLines" width="6" height="6" patternUnits="userSpaceOnUse">
            <line x1="0" y1="3" x2="6" y2="3" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          </pattern>

          <pattern id="patternWaves" width="12" height="6" patternUnits="userSpaceOnUse">
            <path d="M0 3 Q3 0 6 3 T12 3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          </pattern>

          <pattern id="patternGrid" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          </pattern>

          <pattern id="patternCircles" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
          </pattern>

          {/* Clip path for planet */}
          <clipPath id="planetClip">
            <circle cx="100" cy="100" r="90" />
          </clipPath>
        </defs>

        {/* Planet base - dark unexplored */}
        <circle cx="100" cy="100" r="90" fill="url(#planetBase)" />

        {/* Archetype segments */}
        <g clipPath="url(#planetClip)">
          {segments.map((segment, i) => {
            const segmentAngle = 360 / segments.length;
            const startAngle = segment.angle - 90;
            const endAngle = startAngle + segmentAngle;

            // Calculate arc path
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;
            const x1 = 100 + 90 * Math.cos(startRad);
            const y1 = 100 + 90 * Math.sin(startRad);
            const x2 = 100 + 90 * Math.cos(endRad);
            const y2 = 100 + 90 * Math.sin(endRad);
            const largeArc = segmentAngle > 180 ? 1 : 0;

            const pathD = `M100,100 L${x1},${y1} A90,90 0 ${largeArc},1 ${x2},${y2} Z`;

            return (
              <g key={segment.archetype}>
                {/* Colored segment */}
                <path
                  d={pathD}
                  fill={segment.color}
                  opacity={baseOpacity}
                />

                {/* Pattern overlay */}
                {segment.pattern === "glow" ? (
                  <path
                    d={pathD}
                    fill={segment.color}
                    opacity={0.3}
                    filter="blur(8px)"
                  />
                ) : (
                  <path
                    d={pathD}
                    fill={`url(#pattern${segment.pattern.charAt(0).toUpperCase() + segment.pattern.slice(1)})`}
                    style={{ color: segment.color }}
                    opacity={0.8}
                  />
                )}

                {/* Subtle feature markers */}
                {segments.length <= 6 && (
                  <circle
                    cx={100 + 50 * Math.cos(((startAngle + segmentAngle / 2) * Math.PI) / 180)}
                    cy={100 + 50 * Math.sin(((startAngle + segmentAngle / 2) * Math.PI) / 180)}
                    r={segment.pattern === "spikes" ? 8 : 5}
                    fill={segment.color}
                    opacity={0.6}
                  />
                )}
              </g>
            );
          })}
        </g>

        {/* Ring effect for larger groups */}
        {segments.length >= 5 && (
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="none"
            stroke="rgba(232, 23, 138, 0.2)"
            strokeWidth="2"
          />
        )}

        {/* Atmosphere */}
        <circle cx="100" cy="100" r="90" fill="url(#atmosphere)" />

        {/* Highlight */}
        <ellipse
          cx="70"
          cy="70"
          rx="30"
          ry="20"
          fill="white"
          opacity="0.08"
        />
      </svg>

      <style jsx>{`
        .planet-container {
          position: relative;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
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
