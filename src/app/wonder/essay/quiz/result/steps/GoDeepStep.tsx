"use client";

import Link from "next/link";
import { archetypes } from "@/lib/archetypes";
import styles from "./GoDeepStep.module.css";

type GoDeepStepProps = {
  archetypeKey: string;
  imageUrl: string;
  compatibility: { ally: string; tension: string; need: string };
  books: { title: string; author: string; reason: string }[];
  blindSpot: string;
};

// Map compatibility descriptions to archetype keys
const compatibilityMap: Record<string, string> = {
  "the one who wants to feel everything": "alive",
  "the one who's watching for what's being hidden": "conscience",
  "the one who craves difficulty": "friction",
  "the one who chose stillness": "rooted",
  "the one who guards what came before": "embers",
  "the one who fixes what's broken": "mender",
  "the one who left the body behind": "unbound",
  "the one who lives in questions": "swimmer",
  "the one who values presence above all": "presence",
  "the one who builds collective structures": "architect",
  "the one who can't stop building": "shaper",
  "the one who tells the truth": "cleareyed",
  "the one who's made peace with abundance": "citizen",
  "the one still figuring it out": "between",
};

export function GoDeepStep({
  archetypeKey,
  imageUrl,
  compatibility,
  books,
  blindSpot,
}: GoDeepStepProps) {
  const archetype = archetypes[archetypeKey];

  if (!archetype) {
    return null;
  }

  const allyKey = compatibilityMap[compatibility.ally];
  const tensionKey = compatibilityMap[compatibility.tension];
  const needKey = compatibilityMap[compatibility.need];

  const allyArchetype = allyKey ? archetypes[allyKey] : undefined;
  const tensionArchetype = tensionKey ? archetypes[tensionKey] : undefined;
  const needArchetype = needKey ? archetypes[needKey] : undefined;

  // Helper to render compatibility link - only links if we have a valid key
  const renderCompatibilityLink = (
    key: string | undefined,
    archetype: (typeof archetypes)[string] | undefined,
    fallbackText: string
  ) => {
    if (key && archetype) {
      return (
        <Link
          href={`/wonder/essay/quiz/result?a=${key}`}
          className={styles.compatibilityLink}
          style={{ color: archetype.color }}
        >
          {archetype.name}
        </Link>
      );
    }
    // Fallback: render as plain text when mapping is undefined
    return <span className={styles.compatibilityLink}>{fallbackText}</span>;
  };

  return (
    <div className={styles.container}>
      {/* Blind Spot Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionLabel}>Your Blind Spot</h2>
        <div className={styles.blindSpotCard}>
          <p className={styles.blindSpotText}>{blindSpot}</p>
        </div>
      </section>

      {/* Your People Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionLabel}>Your People</h2>
        <div className={styles.compatibilityList}>
          <div className={styles.compatibilityItem}>
            <span className={styles.compatibilityType}>You'll click with</span>
            {renderCompatibilityLink(allyKey, allyArchetype, compatibility.ally)}
          </div>
          <div className={styles.compatibilityItem}>
            <span className={styles.compatibilityType}>You'll clash with</span>
            {renderCompatibilityLink(
              tensionKey,
              tensionArchetype,
              compatibility.tension
            )}
          </div>
          <div className={styles.compatibilityItem}>
            <span className={styles.compatibilityType}>You secretly need</span>
            {renderCompatibilityLink(needKey, needArchetype, compatibility.need)}
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionLabel}>Books for You</h2>
        <div className={styles.booksList}>
          {books.map((book, index) => (
            <div key={index} className={styles.bookCard}>
              <div className={styles.bookHeader}>
                <span className={styles.bookTitle}>{book.title}</span>
                <span className={styles.bookAuthor}> by {book.author}</span>
              </div>
              <p className={styles.bookReason}>{book.reason}</p>
              <a
                href={`https://bookshop.org/search?keywords=${encodeURIComponent(
                  book.title + " " + book.author
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bookLink}
              >
                Find on Bookshop.org
                <span className={styles.srOnly}>(opens in new tab)</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Island Image Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionLabel}>Your Island</h2>
        <div className={styles.islandContainer}>
          <img
            src={imageUrl}
            alt={`${archetype.name} utopia illustration`}
            className={styles.islandImage}
          />
        </div>
      </section>

      {/* Essay Link */}
      <div className={styles.essayLink}>
        <Link href="/wonder/essay" className={styles.essayLinkText}>
          This quiz is from an essay on post-scarcity futures. Read it &rarr;
        </Link>
      </div>
    </div>
  );
}
