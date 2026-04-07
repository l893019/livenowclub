"use client";

import { useState, useEffect, useMemo } from "react";
import { archetypes } from "@/lib/archetypes";
import { RadarChart } from "@/components/RadarChart";
import {
  archetypePositions,
  getGroupCenterOfGravity,
  toSvgCoords,
  type RadarPosition,
} from "@/lib/radar-positions";
import type { UtopiaMember } from "@/lib/utopia";
import styles from "./GroupRadarStep.module.css";

type GroupRadarStepProps = {
  members: UtopiaMember[];
  utopiaName: string;
  onMemberClick: (memberId: string) => void;
  highlightMemberId?: string;
  currentUserId?: string | null;
};

// Quadrant definitions based on radar-positions.ts axes
// X: -1 (Witness) to +1 (Build)
// Y: -1 (Root) to +1 (Transcend)
type Quadrant = "Transcend" | "Root" | "Build" | "Witness";

function getQuadrant(pos: RadarPosition): Quadrant {
  // Determine dominant axis
  const absX = Math.abs(pos.x);
  const absY = Math.abs(pos.y);

  if (absY >= absX) {
    return pos.y >= 0 ? "Transcend" : "Root";
  } else {
    return pos.x >= 0 ? "Build" : "Witness";
  }
}

function generateGroupSummary(members: UtopiaMember[]): string {
  if (members.length === 0) return "";

  // Count unique worldviews (archetypes)
  const uniqueArchetypes = new Set(members.map((m) => m.archetype));
  const worldviewCount = uniqueArchetypes.size;

  // Check quadrant representation
  const quadrantsPresent = new Set<Quadrant>();
  members.forEach((m) => {
    const pos = archetypePositions[m.archetype];
    if (pos) {
      quadrantsPresent.add(getQuadrant(pos));
    }
  });

  const allQuadrants: Quadrant[] = ["Transcend", "Root", "Build", "Witness"];
  const missingQuadrants = allQuadrants.filter((q) => !quadrantsPresent.has(q));

  // Build summary
  const worldviewText =
    worldviewCount === 1
      ? "1 worldview"
      : `${worldviewCount} worldviews`;

  if (missingQuadrants.length === 0) {
    return `${worldviewText}. All quadrants represented.`;
  } else if (missingQuadrants.length === 1) {
    return `${worldviewText}. No one's holding the ${missingQuadrants[0]}.`;
  } else if (missingQuadrants.length === 2) {
    return `${worldviewText}. Missing ${missingQuadrants[0]} and ${missingQuadrants[1]}.`;
  } else {
    return `${worldviewText}. Concentrated in ${allQuadrants.find((q) => quadrantsPresent.has(q)) || "the center"}.`;
  }
}

export function GroupRadarStep({
  members,
  utopiaName,
  onMemberClick,
  highlightMemberId,
  currentUserId,
}: GroupRadarStepProps) {
  // Skip animation on revisit - show all dots immediately
  const [visibleCount, setVisibleCount] = useState(members.length);
  const [showSummary, setShowSummary] = useState(true);
  const [hoveredMemberId, setHoveredMemberId] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = utopiaName; // Keep prop for API compatibility

  // Visible members based on animation state
  const visibleMembers = members.slice(0, visibleCount);

  // Calculate positions and user dots
  const { userDots, positions, centerOfGravity } = useMemo(() => {
    const dots = visibleMembers.map((m) => {
      const pos = archetypePositions[m.archetype] || { x: 0, y: 0 };
      const arch = archetypes[m.archetype];
      return {
        id: m.id,
        name: m.name,
        position: pos,
        color: arch?.color || "#888",
        isYou: m.id === highlightMemberId,
      };
    });

    const allPositions = dots.map((d) => d.position);
    const cog = allPositions.length >= 2 ? getGroupCenterOfGravity(allPositions) : undefined;

    return {
      userDots: dots,
      positions: allPositions,
      centerOfGravity: cog,
    };
  }, [visibleMembers, highlightMemberId]);

  // Get the newest visible member for pulse animation
  const newestMemberIndex = visibleCount - 1;

  // Summary text
  const summary = generateGroupSummary(members);

  const radarSize = 320;
  const padding = 40;

  // Calculate label positions with collision detection
  const labelData = useMemo(() => {
    const labels = visibleMembers.map((member) => {
      const pos = archetypePositions[member.archetype] || { x: 0, y: 0 };
      const svgCoords = toSvgCoords(pos, radarSize, padding);
      const labelOnLeft = svgCoords.cx > radarSize / 2;
      const isCurrentUser = member.id === currentUserId;
      const displayName = isCurrentUser ? "You" : (member.name || "Anonymous");

      return {
        id: member.id,
        cx: svgCoords.cx,
        cy: svgCoords.cy,
        labelOnLeft,
        displayName,
        yOffset: 0, // Will be adjusted for collisions
      };
    });

    // Sort by Y position to detect overlaps
    const sorted = [...labels].sort((a, b) => a.cy - b.cy);

    // Check for collisions and offset labels
    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1];
      const curr = sorted[i];

      // If same side and Y positions are within 20px, offset
      if (prev.labelOnLeft === curr.labelOnLeft && Math.abs(curr.cy - prev.cy) < 20) {
        // Also check X proximity
        if (Math.abs(curr.cx - prev.cx) < 60) {
          curr.yOffset = (prev.yOffset || 0) + 18;
        }
      }
    }

    // Convert back to map for easy lookup
    const labelMap = new Map<string, { yOffset: number }>();
    labels.forEach((l) => labelMap.set(l.id, { yOffset: l.yOffset }));
    return labelMap;
  }, [visibleMembers, currentUserId]);

  return (
    <div className={styles.container}>
      {/* Radar with clickable overlays */}
      <div className={styles.radarSection}>
        <div className={styles.radarContainer}>
          <RadarChart
            size={radarSize}
            userDots={userDots}
            centerOfGravity={centerOfGravity}
            showAllArchetypes={false}
          />

          {/* Center of gravity indicator */}
          {centerOfGravity && (
            <div
              className={styles.cogLabel}
              style={{
                left: toSvgCoords(centerOfGravity, radarSize, padding).cx,
                top: toSvgCoords(centerOfGravity, radarSize, padding).cy + 20,
              }}
            >
              center
            </div>
          )}

          {/* Clickable overlay buttons for each member with name labels */}
          {visibleMembers.map((member, index) => {
            const pos = archetypePositions[member.archetype] || { x: 0, y: 0 };
            const svgCoords = toSvgCoords(pos, radarSize, padding);
            const isNewest = index === newestMemberIndex;
            const isCurrentUser = member.id === currentUserId;
            const isHovered = member.id === hoveredMemberId;
            const arch = archetypes[member.archetype];

            // Position label to avoid overlap with radar edges
            const labelOnLeft = svgCoords.cx > radarSize / 2;

            // Show "You" for current user, otherwise show name
            const displayName = isCurrentUser ? "You" : (member.name || "Anonymous");

            // Get collision offset
            const labelInfo = labelData.get(member.id);
            const yOffset = labelInfo?.yOffset || 0;

            return (
              <button
                key={member.id}
                className={`${styles.dotButton} ${isNewest ? styles.pulseIn : ""} ${isCurrentUser ? styles.youDot : ""} ${isHovered ? styles.dotHovered : ""}`}
                style={{
                  left: svgCoords.cx - 20,
                  top: svgCoords.cy - 20,
                }}
                onClick={() => onMemberClick(member.id)}
                onMouseEnter={() => setHoveredMemberId(member.id)}
                onMouseLeave={() => setHoveredMemberId(null)}
                aria-label={isCurrentUser ? "Your position" : `View ${member.name}'s profile`}
              >
                <span
                  className={`${styles.dotLabel} ${labelOnLeft ? styles.labelLeft : styles.labelRight} ${isCurrentUser ? styles.youLabel : ""} ${isHovered ? styles.labelHovered : ""}`}
                  style={{
                    color: arch?.color || "#fff",
                    transform: `translateY(${yOffset}px)`,
                  }}
                >
                  {displayName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive member legend */}
      <div className={styles.legend}>
        {members.map((member) => {
          const arch = archetypes[member.archetype];
          const isCurrentUser = member.id === currentUserId;
          const isHovered = member.id === hoveredMemberId;
          const displayName = isCurrentUser ? "You" : (member.name || "Anonymous");
          const shortArchName = arch?.name?.replace(/^The /, "") || member.archetype;

          return (
            <button
              key={member.id}
              className={`${styles.legendItem} ${isCurrentUser ? styles.legendItemYou : ""} ${isHovered ? styles.legendItemHovered : ""}`}
              onClick={() => onMemberClick(member.id)}
              onMouseEnter={() => setHoveredMemberId(member.id)}
              onMouseLeave={() => setHoveredMemberId(null)}
            >
              <span
                className={styles.legendDot}
                style={{ backgroundColor: arch?.color || "#888" }}
              />
              <span className={styles.legendName}>{displayName}</span>
              <span className={styles.legendArchetype} style={{ color: arch?.color }}>
                {shortArchName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Summary text */}
      <div className={`${styles.summary} ${showSummary ? styles.visible : ""}`}>
        <p className={styles.summaryText}>{summary}</p>
      </div>

      {/* Tap hint */}
      <p className={styles.tapHint}>Tap anyone to compare worldviews</p>
    </div>
  );
}
