// src/app/wonder/essay/quiz/utopia/[slug]/CombinedCard.tsx
"use client";

import {
  archetypes,
  getBlendedVision,
  getGroupDynamic,
  getSuperpowers,
  getMissingVoices,
  getGroupBook,
} from "@/lib/archetypes";
import styles from "./UtopiaCards.module.css";

type Member = {
  id: string;
  name: string;
  archetype: string;
};

type CombinedCardProps = {
  utopiaName: string;
  presentKeys: string[];
  grouped: Record<string, Member[]>;
};

export function CombinedCard({ utopiaName, presentKeys, grouped }: CombinedCardProps) {
  const counts = Object.fromEntries(
    Object.entries(grouped).map(([k, v]) => [k, v.length])
  );

  const blendedVision = getBlendedVision(presentKeys);
  const dynamic = getGroupDynamic(presentKeys);
  const superpowers = getSuperpowers(presentKeys, counts);
  const missingVoices = getMissingVoices(presentKeys, 2);
  const book = getGroupBook(presentKeys, counts);

  return (
    <article className={styles.card}>
      <span className={styles.label}>Your Utopia</span>
      <h3 className={styles.title}>{utopiaName}</h3>

      <p className={styles.vision}>{blendedVision}</p>

      {dynamic && <p className={styles.dynamic}>{dynamic}</p>}

      {/* Composition */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Who&apos;s here</span>
        {presentKeys.map((key) => {
          const data = archetypes[key];
          const count = grouped[key]?.length || 0;
          return (
            <div key={key} className={styles.compositionItem}>
              <div
                className={styles.compositionDot}
                style={{ backgroundColor: data?.color || "#666" }}
              />
              <span className={styles.compositionName}>{data?.name}</span>
              <span className={styles.compositionCount}>({count})</span>
            </div>
          );
        })}
      </div>

      {/* Superpowers */}
      {superpowers.length > 0 && (
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Your strengths</span>
          <p className={styles.sectionText}>
            {superpowers.length === 1
              ? superpowers[0]
              : superpowers.length === 2
                ? `${superpowers[0]} and ${superpowers[1]}`
                : `${superpowers[0]}, ${superpowers[1]}, and ${superpowers[2]}`
            }
          </p>
        </div>
      )}

      {/* Missing voices */}
      {missingVoices.length > 0 && (
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Missing voices</span>
          {missingVoices.map((voice) => (
            <div key={voice.key} className={styles.missingVoice}>
              <span className={styles.missingName} style={{ color: voice.color }}>
                {voice.name}
              </span>
              <span className={styles.missingInsight}> — {voice.insight}</span>
            </div>
          ))}
        </div>
      )}

      {/* Book recommendation */}
      {book && (
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Read together</span>
          <p className={styles.bookText}>
            <em>{book.title}</em> by {book.author}
          </p>
        </div>
      )}
    </article>
  );
}
