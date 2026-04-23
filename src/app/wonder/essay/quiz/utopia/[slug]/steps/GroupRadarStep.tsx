"use client";

import { GroupDimensionSpectrum } from "./GroupDimensionSpectrum";
import type { UtopiaMember } from "@/lib/utopia";
import styles from "./GroupRadarStep.module.css";

type GroupRadarStepProps = {
  members: UtopiaMember[];
  utopiaName: string;
  onMemberClick: (memberId: string) => void;
  highlightMemberId?: string;
  currentUserId?: string | null;
  compact?: boolean;
};

export function GroupRadarStep({
  members,
  utopiaName,
  onMemberClick,
  currentUserId,
  compact = false,
}: GroupRadarStepProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = utopiaName; // Keep prop for API compatibility

  return (
    <div className={`${styles.container} ${compact ? styles.compact : ""}`}>
      <GroupDimensionSpectrum
        members={members}
        onMemberClick={onMemberClick}
        currentUserId={currentUserId}
        compact={compact}
      />
    </div>
  );
}
