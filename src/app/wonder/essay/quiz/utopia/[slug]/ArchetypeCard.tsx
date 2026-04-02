// src/app/wonder/essay/quiz/utopia/[slug]/ArchetypeCard.tsx
"use client";

import { archetypes } from "@/lib/archetypes";
import styles from "./UtopiaCards.module.css";

type Member = {
  id: string;
  name: string;
  archetype: string;
};

type ArchetypeCardProps = {
  archetypeKey: string;
  members: Member[];
  createdBy: string;
  currentUserId: string | null;
};

export function ArchetypeCard({
  archetypeKey,
  members,
  createdBy,
  currentUserId,
}: ArchetypeCardProps) {
  const data = archetypes[archetypeKey];

  if (!data) return null;

  return (
    <article className={styles.card}>
      <img
        src={`/wonder/essay/quiz/images/utopia-${archetypeKey}.png`}
        alt={data.name}
        className={styles.cardImage}
      />

      <span className={styles.label} style={{ color: data.color }}>
        {data.name}
      </span>

      <div className={styles.membersList}>
        {members.map((member) => {
          const isFounder = member.id === createdBy;
          const isYou = member.id === currentUserId;
          return (
            <span key={member.id} className={styles.memberName}>
              {member.name || "Anonymous"}
              {isFounder && <span className={styles.memberTag}>founder</span>}
              {isYou && !isFounder && <span className={styles.memberTag}>you</span>}
            </span>
          );
        })}
      </div>

      <div>
        <span className={styles.sectionLabel}>Their utopia</span>
        <p className={styles.utopia}>{data.utopia}</p>
      </div>

      <p className={styles.description}>{data.description}</p>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Blind spot</span>
        <p className={styles.blindspot}>{data.blindSpot}</p>
      </div>

      {data.book && (
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Read this</span>
          <p className={styles.bookText}>
            <em>{data.book.title}</em> by {data.book.author}
          </p>
        </div>
      )}
    </article>
  );
}
