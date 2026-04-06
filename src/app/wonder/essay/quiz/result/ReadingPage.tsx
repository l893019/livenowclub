"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { archetypes, type Archetype } from "@/lib/archetypes";
import { RadarChart } from "@/components/RadarChart";
import { CreateJoinStep } from "./steps/CreateJoinStep";
import { QuizCTA } from "./QuizCTA";
import { RelationshipComparison } from "./RelationshipComparison";
import styles from "./ReadingPage.module.css";

type CreatedUtopia = {
  slug: string;
  name: string;
};

type GroupContext = {
  utopiaSlug: string;
  utopiaName: string;
};

type ReadingPageProps = {
  archetypeKey: string;
  /** If provided, renders a back button instead of navigating away */
  onBack?: () => void;
  /** If provided, changes CTAs to be group-aware */
  groupContext?: GroupContext;
  /** Optional: whose reading this is (for displaying "their" reading) */
  personName?: string;
  /** Optional: user ID to show relationship comparison with (viral loop) */
  compareUserId?: string;
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

export function ReadingPage({ archetypeKey, onBack, groupContext, personName, compareUserId }: ReadingPageProps) {
  const [showCreateUtopia, setShowCreateUtopia] = useState(false);
  const [existingUtopia, setExistingUtopia] = useState<CreatedUtopia | null>(null);
  const [hasQuizUserId, setHasQuizUserId] = useState<boolean | null>(null);
  const [isSharedLink, setIsSharedLink] = useState(false);
  const archetype = archetypes[archetypeKey];

  // Check if user has taken the quiz AND if this is a shared link
  useEffect(() => {
    const userId = localStorage.getItem("quiz-user-id");
    setHasQuizUserId(!!userId);

    // Check for ?n= param which indicates a shared link with someone's name
    const urlParams = new URLSearchParams(window.location.search);
    setIsSharedLink(!!urlParams.get("n"));
  }, []);

  // Check if utopia was already created (user named it before quiz)
  useEffect(() => {
    const stored = sessionStorage.getItem("created-utopia");
    if (stored) {
      try {
        setExistingUtopia(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse created-utopia:", e);
      }
    }
  }, []);

  if (!archetype) {
    return (
      <div className={styles.reading}>
        <p>Archetype not found.</p>
      </div>
    );
  }

  // Show utopia creation flow (only if no existing utopia)
  if (showCreateUtopia && !existingUtopia) {
    return <CreateJoinStep archetypeKey={archetypeKey} />;
  }

  // Get ally, tension, and need archetypes
  const allyKey = compatibilityMap[archetype.compatibility.ally];
  const tensionKey = compatibilityMap[archetype.compatibility.tension];
  const needKey = compatibilityMap[archetype.compatibility.need];

  const allyArchetype = allyKey ? archetypes[allyKey] : undefined;
  const tensionArchetype = tensionKey ? archetypes[tensionKey] : undefined;
  const needArchetype = needKey ? archetypes[needKey] : undefined;

  // Determine if this is viewing someone else's reading
  const isViewingOther = !!personName;
  const labelText = isViewingOther ? `${personName} is` : "You are";

  return (
    <div className={styles.reading}>
      {/* Back button when in inline context */}
      {onBack && (
        <button className={styles.backButton} onClick={onBack}>
          ← Back
        </button>
      )}

      {/* Header */}
      <header className={styles.header}>
        <p className={styles.label}>{labelText}</p>
        <h1 className={styles.name} style={{ color: archetype.color }}>
          {archetype.name}
        </h1>
        <p className={styles.tagline}>{archetype.utopia}</p>
      </header>

      {/* Core Description */}
      <section className={styles.section}>
        <p className={styles.description}>{archetype.description}</p>
      </section>

      {/* Relationship comparison for viral loop (when ?compare= is present) */}
      {compareUserId && hasQuizUserId && (
        <RelationshipComparison
          yourArchetypeKey={archetypeKey}
          compareUserId={compareUserId}
        />
      )}

      {/* Quiz CTA for non-quiz-takers (after first section, not buried at bottom) */}
      {/* Only show CTA if viewing a shared link (has ?n= param) AND haven't taken quiz */}
      {hasQuizUserId === false && (isSharedLink || personName) && <QuizCTA />}

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

      {/* Compare Worldviews CTA */}
      <section className={styles.ctaSection}>
        <h2 className={styles.sectionTitle}>Compare Worldviews</h2>
        <p className={styles.ctaDescription}>
          See how your worldview fits with friends, family, and coworkers.
          {groupContext
            ? ` Invite others to join ${groupContext.utopiaName}.`
            : " Create a group and invite others to take the quiz."}
        </p>
        <div className={styles.ctaButtons}>
          {groupContext ? (
            <button
              className={styles.primaryBtn}
              onClick={() => {
                const shareUrl = `${window.location.origin}/wonder/essay/quiz/utopia/${groupContext.utopiaSlug}/join`;
                if (navigator.share) {
                  navigator.share({
                    title: `Join ${groupContext.utopiaName}`,
                    text: `I'm a ${archetype.name}. What are you? Join my group and find out.`,
                    url: shareUrl,
                  });
                } else {
                  navigator.clipboard.writeText(shareUrl);
                  alert("Invite link copied to clipboard!");
                }
              }}
            >
              Invite to {groupContext.utopiaName}
            </button>
          ) : existingUtopia ? (
            <Link
              href={`/wonder/essay/quiz/utopia/${existingUtopia.slug}`}
              className={styles.primaryBtn}
            >
              Go to Your Group
            </Link>
          ) : (
            <button
              className={styles.primaryBtn}
              onClick={() => setShowCreateUtopia(true)}
            >
              Create a Group
            </button>
          )}
          <button
            className={styles.secondaryBtn}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `${isViewingOther ? `${personName} is` : "I'm"} ${archetype.name}`,
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
        </div>
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
