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
  const [visibleCount, setVisibleCount] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  // Animate dots appearing one by one
  useEffect(() => {
    if (visibleCount < members.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    } else if (visibleCount === members.length && members.length > 0) {
      // Show summary after all dots appear
      const timer = setTimeout(() => {
        setShowSummary(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, members.length]);

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

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.label}>Your Utopia</span>
        <h2 className={styles.title}>{utopiaName}</h2>
        <p className={styles.memberCount}>
          {members.length} {members.length === 1 ? "member" : "members"}
        </p>
      </div>

      {/* Radar with clickable overlays */}
      <div className={styles.radarSection}>
        <div className={styles.radarContainer}>
          <RadarChart
            size={radarSize}
            userDots={userDots}
            centerOfGravity={centerOfGravity}
            showAllArchetypes={false}
          />

          {/* Clickable overlay buttons for each member with name labels */}
          {visibleMembers.map((member, index) => {
            const pos = archetypePositions[member.archetype] || { x: 0, y: 0 };
            const svgCoords = toSvgCoords(pos, radarSize, padding);
            const isNewest = index === newestMemberIndex;
            const isCurrentUser = member.id === currentUserId;
            const arch = archetypes[member.archetype];

            // Position label to avoid overlap with radar edges
            const labelOnLeft = svgCoords.cx > radarSize / 2;

            // Show "You" for current user, otherwise show name
            const displayName = isCurrentUser ? "You" : (member.name || "Anonymous");

            return (
              <button
                key={member.id}
                className={`${styles.dotButton} ${isNewest ? styles.pulseIn : ""} ${isCurrentUser ? styles.youDot : ""}`}
                style={{
                  left: svgCoords.cx - 15,
                  top: svgCoords.cy - 15,
                }}
                onClick={() => onMemberClick(member.id)}
                aria-label={isCurrentUser ? "Your position" : `View ${member.name}'s profile`}
              >
                <span
                  className={`${styles.dotLabel} ${labelOnLeft ? styles.labelLeft : styles.labelRight} ${isCurrentUser ? styles.youLabel : ""}`}
                  style={{ color: arch?.color || "#fff" }}
                >
                  {displayName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary text */}
      <div className={`${styles.summary} ${showSummary ? styles.visible : ""}`}>
        <p className={styles.summaryText}>{summary}</p>
      </div>

      {/* Hint */}
      <div className={`${styles.hint} ${showSummary ? styles.visible : ""}`}>
        <p>Tap a dot to see your relationship</p>
      </div>
    </div>
  );
}
