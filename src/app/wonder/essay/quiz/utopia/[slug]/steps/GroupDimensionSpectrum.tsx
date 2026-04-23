"use client";

import { useMemo } from "react";
import {
  arrayToQuizAnswers,
  calculateDimensions,
  type Dimensions,
} from "@/lib/dimensions";
import type { UtopiaMember } from "@/lib/utopia";
import styles from "./GroupDimensionSpectrum.module.css";

type GroupDimensionSpectrumProps = {
  members: UtopiaMember[];
  onMemberClick?: (memberId: string) => void;
  currentUserId?: string | null;
  compact?: boolean;
};

type MemberDimension = {
  id: string;
  name: string;
  dimensions: Dimensions;
  color: string;
  isYou: boolean;
};

// Simple color palette for members without archetype colors
const MEMBER_COLORS = [
  "#e8178a", // pink
  "#4A90D9", // blue
  "#50C878", // green
  "#9B59B6", // purple
  "#F39C12", // orange
  "#1ABC9C", // teal
  "#E74C3C", // red
  "#3498DB", // light blue
];

export function GroupDimensionSpectrum({
  members,
  onMemberClick,
  currentUserId,
  compact = false,
}: GroupDimensionSpectrumProps) {
  // Calculate dimensions for each member
  const memberDimensions = useMemo<MemberDimension[]>(() => {
    return members
      .filter((m) => m.answers && m.answers.length === 7)
      .map((m, index) => {
        const quizAnswers = arrayToQuizAnswers(m.answers!);
        if (!quizAnswers) return null;

        const dimensions = calculateDimensions(quizAnswers);
        return {
          id: m.id,
          name: m.name || "Anonymous",
          dimensions,
          color: MEMBER_COLORS[index % MEMBER_COLORS.length],
          isYou: m.id === currentUserId,
        };
      })
      .filter((m): m is MemberDimension => m !== null);
  }, [members, currentUserId]);

  // Calculate group averages
  const groupAverages = useMemo<Dimensions | null>(() => {
    if (memberDimensions.length === 0) return null;

    const totals = memberDimensions.reduce(
      (acc, m) => ({
        agency: acc.agency + m.dimensions.agency,
        certainty: acc.certainty + m.dimensions.certainty,
        posture: acc.posture + m.dimensions.posture,
      }),
      { agency: 0, certainty: 0, posture: 0 }
    );

    return {
      agency: totals.agency / memberDimensions.length,
      certainty: totals.certainty / memberDimensions.length,
      posture: totals.posture / memberDimensions.length,
    };
  }, [memberDimensions]);

  // Convert -1 to 1 range to 0 to 100 percentage
  const toPercent = (value: number) => ((value + 1) / 2) * 100;

  if (memberDimensions.length === 0) {
    return (
      <div className={styles.container}>
        <p className={styles.emptyState}>
          Members need to complete the quiz to see the group spectrum.
        </p>
      </div>
    );
  }

  const spectrums = [
    {
      key: "agency" as const,
      name: "Agency",
      lowLabel: "Witness",
      highLabel: "Builder",
    },
    {
      key: "certainty" as const,
      name: "Certainty",
      lowLabel: "Seeking",
      highLabel: "Settled",
    },
    {
      key: "posture" as const,
      name: "Posture",
      lowLabel: "Protective",
      highLabel: "Expansive",
    },
  ];

  return (
    <div className={`${styles.container} ${compact ? styles.compact : ""}`}>
      {spectrums.map((spectrum) => (
        <div key={spectrum.key} className={styles.spectrum}>
          <div className={styles.labels}>
            <span className={styles.lowLabel}>{spectrum.lowLabel}</span>
            <span className={styles.dimensionName}>{spectrum.name}</span>
            <span className={styles.highLabel}>{spectrum.highLabel}</span>
          </div>
          <div className={styles.track}>
            {/* Individual member markers */}
            {memberDimensions.map((member) => (
              <button
                key={member.id}
                className={`${styles.memberMarker} ${member.isYou ? styles.youMarker : ""}`}
                style={{
                  left: `${toPercent(member.dimensions[spectrum.key])}%`,
                  backgroundColor: member.color,
                }}
                onClick={() => onMemberClick?.(member.id)}
                title={member.isYou ? "You" : member.name}
                aria-label={`${member.isYou ? "You" : member.name}: ${spectrum.name}`}
              />
            ))}

            {/* Group average marker */}
            {groupAverages && (
              <div
                className={styles.averageMarker}
                style={{
                  left: `${toPercent(groupAverages[spectrum.key])}%`,
                }}
                title="Group average"
              />
            )}
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className={styles.legend}>
        {memberDimensions.map((member) => (
          <button
            key={member.id}
            className={`${styles.legendItem} ${member.isYou ? styles.legendItemYou : ""}`}
            onClick={() => onMemberClick?.(member.id)}
          >
            <span
              className={styles.legendDot}
              style={{ backgroundColor: member.color }}
            />
            <span className={styles.legendName}>
              {member.isYou ? "You" : member.name}
            </span>
          </button>
        ))}
        <div className={styles.legendItem}>
          <span className={styles.legendAverage} />
          <span className={styles.legendName}>Group Average</span>
        </div>
      </div>

      {!compact && (
        <p className={styles.tapHint}>Tap anyone to compare worldviews</p>
      )}
    </div>
  );
}
