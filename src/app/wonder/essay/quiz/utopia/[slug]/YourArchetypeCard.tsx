"use client";

import Link from "next/link";
import { archetypes } from "@/lib/archetypes";
import type { UtopiaMember } from "@/lib/utopia";
import styles from "./UtopiaPageClient.module.css";

type YourArchetypeCardProps = {
  member: UtopiaMember;
  onClick: () => void;
};

export function YourArchetypeCard({ member, onClick }: YourArchetypeCardProps) {
  const arch = archetypes[member.archetype];
  if (!arch) return null;

  return (
    <button className={styles.yourCard} onClick={onClick}>
      <div className={styles.yourCardDot} style={{ backgroundColor: arch.color }} />
      <div className={styles.yourCardContent}>
        <span className={styles.yourCardLabel}>{arch.name}</span>
        <p className={styles.yourCardQuote}>{arch.utopia.replace(/^Their/, "Your")}</p>
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
