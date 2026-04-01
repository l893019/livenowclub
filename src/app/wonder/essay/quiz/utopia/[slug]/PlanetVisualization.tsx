"use client";

import { useMemo } from "react";

type PlanetVisualizationProps = {
  archetypes: string[];
  size?: number;
};

// Archetype colors for indicators
const archetypeColors: Record<string, string> = {
  citizen: "#3db9a4",
  shaper: "#f4a03f",
  architect: "#9b8fef",
  presence: "#e8178a",
  swimmer: "#6b8fef",
  rooted: "#7ed6a4",
  conscience: "#d64545",
  embers: "#c97d3a",
  friction: "#ff6b35",
  unbound: "#a855f7",
  alive: "#f472b6",
  mender: "#10b981",
  cleareyed: "#64748b",
  between: "#8b8b8b",
};

export default function PlanetVisualization({
  archetypes,
  size = 280,
}: PlanetVisualizationProps) {
  // Get unique archetypes
  const unique = useMemo(() => [...new Set(archetypes)], [archetypes]);
  const memberCount = archetypes.length;

  // Choose planet image based on group size
  const planetImage = useMemo(() => {
    if (memberCount <= 1) return "/wonder/essay/quiz/images/planet-solo.png";
    if (memberCount <= 4) return "/wonder/essay/quiz/images/planet-group.png";
    return "/wonder/essay/quiz/images/planet-full.png";
  }, [memberCount]);

  return (
    <div className="planet-container" style={{ width: size, height: size }}>
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
        }}
      />

      {/* Archetype indicators around the edge */}
      <div className="archetype-indicators">
        {unique.map((arch, i) => {
          const angle = (360 / unique.length) * i - 90;
          const rad = (angle * Math.PI) / 180;
          const radius = size / 2 + 16;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          return (
            <div
              key={arch}
              className="archetype-dot"
              style={{
                backgroundColor: archetypeColors[arch] || "#666",
                transform: `translate(${x}px, ${y}px)`,
                boxShadow: `0 0 12px ${archetypeColors[arch] || "#666"}`,
              }}
            />
          );
        })}
      </div>

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

        .archetype-indicators {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
        }

        .archetype-dot {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-left: -6px;
          margin-top: -6px;
          border: 2px solid rgba(255, 255, 255, 0.9);
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
