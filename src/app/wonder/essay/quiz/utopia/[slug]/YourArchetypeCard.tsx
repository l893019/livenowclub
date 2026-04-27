"use client";

import Link from "next/link";
import { archetypes } from "@/lib/archetypes";
import { getMemberIdentity } from "@/lib/identities";
import type { UtopiaMember } from "@/lib/utopia";
import styles from "./UtopiaPageClient.module.css";

type YourArchetypeCardProps = {
  member: UtopiaMember;
  onClick: () => void;
};

export function YourArchetypeCard({ member, onClick }: YourArchetypeCardProps) {
  const arch = archetypes[member.archetype];
  const identity = getMemberIdentity(member.answers, member.archetype);

  const displayName = identity?.name || arch?.name || member.archetype;
  const displayColor = identity?.color || arch?.color || "#e8178a";
  const utopiaText = identity?.utopia || arch?.utopia || "";

  return (
    <button className={styles.yourCard} onClick={onClick}>
      <div className={styles.yourCardDot} style={{ backgroundColor: displayColor }} />
      <div className={styles.yourCardContent}>
        <span className={styles.yourCardLabel}>{displayName}</span>
        <p className={styles.yourCardQuote}>{utopiaText.replace(/^Their/, "Your")}</p>
        <span className={styles.yourCardLink}>See your profile →</span>
      </div>
    </button>
  );
}

type JoinUtopiaCardProps = {
  slug: string;
  utopiaName: string;
  memberCount: number;
};

export function JoinUtopiaCard({ slug, utopiaName, memberCount }: JoinUtopiaCardProps) {
  return (
    <div className={styles.joinCard}>
      <p className={styles.joinCardText}>
        Take the quiz to join {utopiaName} and see how you fit with {memberCount} other{memberCount === 1 ? "" : "s"}.
      </p>
      <Link href={`/wonder/essay/quiz/utopia/${slug}/join`} className={styles.btnPrimary}>
        Join This Utopia
      </Link>
    </div>
  );
}
