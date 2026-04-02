"use client";

import Link from "next/link";
import { archetypes, getMissingVoices, getSuperpowers, getGroupBook } from "@/lib/archetypes";
import type { UtopiaMember } from "@/lib/utopia";
import styles from "./GroupReadingStep.module.css";

type GroupReadingStepProps = {
  members: UtopiaMember[];
};

export function GroupReadingStep({ members }: GroupReadingStepProps) {
  const archetypeKeys = members.map((m) => m.archetype);
  const uniqueKeys = [...new Set(archetypeKeys)];

  // Count archetypes for weighting
  const counts: Record<string, number> = {};
  archetypeKeys.forEach((k) => {
    counts[k] = (counts[k] || 0) + 1;
  });

  const superpowers = getSuperpowers(uniqueKeys, counts);
  const missingVoices = getMissingVoices(uniqueKeys, 3);
  const groupBook = getGroupBook(uniqueKeys, counts);

  // Generate blind spot based on what's overrepresented or missing
  let blindSpot = "";
  const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  if (sortedCounts.length > 0 && sortedCounts[0][1] >= 3) {
    const dominantKey = sortedCounts[0][0];
    blindSpot = `Heavy on ${archetypes[dominantKey]?.superpower || dominantKey}. Watch for groupthink.`;
  } else if (missingVoices.length > 0) {
    blindSpot = missingVoices[0].insight;
  } else {
    blindSpot = "Diverse perspectives. Stay curious about your differences.";
  }

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h3 className={styles.sectionLabel}>Your Strengths</h3>
        <div className={styles.strengthsCard}>
          {superpowers.length > 0 ? (
            <p className={styles.strengthsText}>
              {superpowers.join(". ")}.
            </p>
          ) : (
            <p className={styles.strengthsText}>A unique combination still taking shape.</p>
          )}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionLabel}>Your Blind Spot</h3>
        <div className={styles.blindSpotCard}>
          <p className={styles.blindSpotText}>{blindSpot}</p>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionLabel}>Missing Voices</h3>
        <div className={styles.missingList}>
          {missingVoices.map((voice) => (
            <div key={voice.key} className={styles.missingItem}>
              <Link
                href={`/wonder/essay/quiz/explore/#${voice.key}`}
                className={styles.missingName}
                style={{ color: voice.color }}
              >
                {voice.name}
              </Link>
              <p className={styles.missingInsight}>{voice.insight}</p>
            </div>
          ))}
        </div>
      </section>

      {groupBook && (
        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>Read Together</h3>
          <div className={styles.bookCard}>
            <p className={styles.bookTitle}>
              <span className={styles.bookTitleText}>{groupBook.title}</span>
              <span className={styles.bookAuthor}> ({groupBook.author})</span>
            </p>
            <a
              href={`https://bookshop.org/search?keywords=${encodeURIComponent(groupBook.title + ' ' + groupBook.author)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bookLink}
            >
              Find on Bookshop.org →
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
