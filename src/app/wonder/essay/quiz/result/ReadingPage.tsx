"use client";

import Link from "next/link";
import { archetypes, type Archetype } from "@/lib/archetypes";
import { RadarChart } from "@/components/RadarChart";
import styles from "./ReadingPage.module.css";

type ReadingPageProps = {
  archetypeKey: string;
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

export function ReadingPage({ archetypeKey }: ReadingPageProps) {
  const archetype = archetypes[archetypeKey];

  if (!archetype) {
    return (
      <div className={styles.reading}>
        <p>Archetype not found.</p>
      </div>
    );
  }

  // Get ally, tension, and need archetypes
  const allyKey = compatibilityMap[archetype.compatibility.ally];
  const tensionKey = compatibilityMap[archetype.compatibility.tension];
  const needKey = compatibilityMap[archetype.compatibility.need];

  const allyArchetype = allyKey ? archetypes[allyKey] : undefined;
  const tensionArchetype = tensionKey ? archetypes[tensionKey] : undefined;
  const needArchetype = needKey ? archetypes[needKey] : undefined;

  return (
    <div className={styles.reading}>
      {/* Header */}
      <header className={styles.header}>
        <p className={styles.label}>You are</p>
        <h1 className={styles.name} style={{ color: archetype.color }}>
          {archetype.name}
        </h1>
        <p className={styles.tagline}>{archetype.utopia}</p>
      </header>

      {/* Core Description */}
      <section className={styles.section}>
        <p className={styles.description}>{archetype.description}</p>
      </section>

      <div className={styles.divider} />

      {/* How You Got Here */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>How You Got Here</h2>
        <p className={styles.bodyText}>{archetype.howYouGotHere}</p>
      </section>

      <div className={styles.divider} />

      {/* The Worldview */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Worldview</h2>
        <p className={styles.bodyText}>You likely believe:</p>
        <ul className={styles.beliefs}>
          {archetype.coreBeliefs.map((belief, i) => (
            <li key={i}>{belief}</li>
          ))}
        </ul>
      </section>

      <div className={styles.divider} />

      {/* Your Superpower */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Superpower</h2>
        <h3 className={styles.highlight} style={{ color: archetype.color }}>
          {archetype.superpower}
        </h3>
        <div className={styles.expandedContent}>
          {archetype.superpowerExpanded.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <div className={styles.divider} />

      {/* Your Blind Spot */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Blind Spot</h2>
        <div className={styles.expandedContent}>
          {archetype.blindSpotExpanded.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <div className={styles.divider} />

      {/* Position on Map */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Position on the Map</h2>
        <div className={styles.radarContainer}>
          <RadarChart size={280} highlightArchetype={archetypeKey} />
        </div>

        <div className={styles.relationships}>
          {allyArchetype && (
            <div className={styles.relationshipCard}>
              <h4 className={styles.relationshipLabel}>You'll recognize</h4>
              <Link
                href={`/wonder/essay/quiz/result?a=${allyKey}`}
                className={styles.archName}
                style={{ color: allyArchetype.color }}
              >
                {allyArchetype.name}
              </Link>
              <p className={styles.relationshipDesc}>
                {archetype.allyDescription}
              </p>
            </div>
          )}

          {tensionArchetype && (
            <div className={styles.relationshipCard}>
              <h4 className={styles.relationshipLabel}>You'll clash with</h4>
              <Link
                href={`/wonder/essay/quiz/result?a=${tensionKey}`}
                className={styles.archName}
                style={{ color: tensionArchetype.color }}
              >
                {tensionArchetype.name}
              </Link>
              <p className={styles.relationshipDesc}>
                {archetype.tensionDescription}
              </p>
            </div>
          )}

          {needArchetype && (
            <div className={styles.relationshipCard}>
              <h4 className={styles.relationshipLabel}>You might need</h4>
              <Link
                href={`/wonder/essay/quiz/result?a=${needKey}`}
                className={styles.archName}
                style={{ color: needArchetype.color }}
              >
                {needArchetype.name}
              </Link>
              <p className={styles.relationshipDesc}>
                {archetype.needDescription}
              </p>
            </div>
          )}
        </div>
      </section>

      <div className={styles.divider} />

      {/* Books */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Books for Your Worldview</h2>
        <div className={styles.books}>
          {archetype.books.map((book, i) => (
            <div key={i} className={styles.bookCard}>
              <h4 className={styles.bookTitle}>{book.title}</h4>
              <p className={styles.bookAuthor}>by {book.author}</p>
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
              </a>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.divider} />

      {/* CTA */}
      <section className={styles.ctaSection}>
        <Link
          href={`/wonder/essay/quiz/utopia/${archetypeKey}`}
          className={styles.primaryBtn}
        >
          Create Your Utopia
        </Link>
        <button
          className={styles.secondaryBtn}
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: `I'm ${archetype.name}`,
                text: archetype.utopia,
                url: window.location.href,
              });
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }
          }}
        >
          Share Result
        </button>
      </section>

      {/* Essay Link */}
      <div className={styles.essayLink}>
        <Link href="/wonder/essay" className={styles.essayLinkText}>
          Read <em>When Purpose Is All We Have Left</em> &rarr;
        </Link>
      </div>
    </div>
  );
}
