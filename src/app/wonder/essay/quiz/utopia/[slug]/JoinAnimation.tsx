"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { archetypes } from "@/lib/archetypes";
import { getMemberIdentity } from "@/lib/identities";
import {
  archetypePositions,
  getGroupCenterOfGravity,
  toSvgCoords,
} from "@/lib/radar-positions";
import { generateJoinShiftNarrative, type GroupMember } from "@/lib/group-analysis";
import styles from "./JoinAnimation.module.css";

type Member = {
  id: string;
  name: string;
  archetype: string;
  answers?: string[];
};

type JoinAnimationProps = {
  existingMembers: Member[];
  newMember: Member;
  utopiaName: string;
  onComplete: () => void;
};

export function JoinAnimation({
  existingMembers,
  newMember,
  utopiaName,
  onComplete,
}: JoinAnimationProps) {
  const [phase, setPhase] = useState<"setup" | "dot" | "gravity" | "welcome" | "done">("setup");

  const size = 300;
  const padding = 40;

  // Calculate positions
  const existingPositions = existingMembers.map(
    (m) => archetypePositions[m.archetype] || { x: 0, y: 0 }
  );
  const newPosition = archetypePositions[newMember.archetype] || { x: 0, y: 0 };

  const oldCenter = getGroupCenterOfGravity(existingPositions);
  const allPositions = [...existingPositions, newPosition];
  const newCenter = getGroupCenterOfGravity(allPositions);

  const newIdentity = getMemberIdentity(newMember.answers, newMember.archetype);
  const newColor = newIdentity?.color || archetypes[newMember.archetype]?.color || "#888";
  const newIdentityName = newIdentity?.name || archetypes[newMember.archetype]?.name || newMember.archetype;

  // Generate shift narrative
  const shiftNarrative = useMemo(() => {
    const existingGroupMembers: GroupMember[] = existingMembers.map(m => ({
      id: m.id,
      name: m.name,
      archetype: m.archetype
    }));
    const newGroupMember: GroupMember = {
      id: newMember.id,
      name: newMember.name,
      archetype: newMember.archetype
    };
    return generateJoinShiftNarrative(existingGroupMembers, newGroupMember);
  }, [existingMembers, newMember]);

  // Animation timing
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("dot"), 500),
      setTimeout(() => setPhase("gravity"), 2000),
      setTimeout(() => setPhase("welcome"), 3500),
      setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 5500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    setPhase("done");
    onComplete();
  }, [onComplete]);

  if (phase === "done") return null;

  const newDotSvg = toSvgCoords(newPosition, size, padding);
  const oldCenterSvg = toSvgCoords(oldCenter, size, padding);
  const newCenterSvg = toSvgCoords(newCenter, size, padding);

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.label}>Entering {utopiaName}</div>

        <svg
          width={size}
          height={size}
          className={styles.chart}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background rings */}
          {[0.33, 0.66, 1.0].map((ring, i) => (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={((size - padding * 2) / 2) * ring}
              className={styles.ring}
            />
          ))}

          {/* Axes */}
          <line
            x1={padding}
            y1={size / 2}
            x2={size - padding}
            y2={size / 2}
            className={styles.axis}
          />
          <line
            x1={size / 2}
            y1={padding}
            x2={size / 2}
            y2={size - padding}
            className={styles.axis}
          />

          {/* Existing member dots */}
          {existingMembers.map((m) => {
            const pos = archetypePositions[m.archetype] || { x: 0, y: 0 };
            const svg = toSvgCoords(pos, size, padding);
            const color = archetypes[m.archetype]?.color || "#888";
            return (
              <circle
                key={m.id}
                cx={svg.cx}
                cy={svg.cy}
                r={6}
                fill={color}
                opacity={0.6}
              />
            );
          })}

          {/* Old center of gravity (fading out) */}
          {existingMembers.length > 0 && (phase === "setup" || phase === "dot") && (
            <circle
              cx={oldCenterSvg.cx}
              cy={oldCenterSvg.cy}
              r={8}
              fill="none"
              stroke="#e8178a"
              strokeWidth={2}
              strokeDasharray="4 2"
              className={phase === "dot" ? styles.fadeOut : ""}
            />
          )}

          {/* New member dot (appearing) */}
          {(phase === "dot" || phase === "gravity" || phase === "welcome") && (
            <circle
              cx={newDotSvg.cx}
              cy={newDotSvg.cy}
              r={10}
              fill={newColor}
              className={styles.newDot}
            />
          )}

          {/* New center of gravity (appearing) */}
          {(phase === "gravity" || phase === "welcome") && (
            <g className={styles.newCenter}>
              <circle
                cx={newCenterSvg.cx}
                cy={newCenterSvg.cy}
                r={8}
                fill="none"
                stroke="#e8178a"
                strokeWidth={2}
              />
              <circle
                cx={newCenterSvg.cx}
                cy={newCenterSvg.cy}
                r={14}
                fill="none"
                stroke="#e8178a"
                strokeWidth={1}
                opacity={0.3}
                strokeDasharray="4 2"
              />
            </g>
          )}
        </svg>

        {/* Shift narrative */}
        {phase === "welcome" && (
          <div className={styles.welcome}>
            <div className={styles.shiftNarrative}>
              <div className={styles.yourName} style={{ color: newColor }}>
                {newMember.name || "You"}
              </div>
              <div className={styles.yourArchetype}>
                joined as <span style={{ color: newColor }}>{newIdentityName}</span>
              </div>
              <div className={styles.shiftText}>
                {shiftNarrative.shift}
              </div>
            </div>
          </div>
        )}
      </div>

      <button className={styles.skip} onClick={handleSkip}>
        Skip
      </button>
    </div>
  );
}
