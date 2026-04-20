"use client";

import { RadarChart } from "@/components/RadarChart";
import { archetypePositions } from "@/lib/radar-positions";
import { archetypes } from "@/lib/archetypes";
import { getPairReading } from "@/lib/pair-dynamics";
import { useSwipe } from "@/hooks/useSwipe";
import type { UtopiaMember } from "@/lib/utopia";
import { QuizCTA } from "@/app/wonder/essay/quiz/result/QuizCTA";
import styles from "./RelationshipStep.module.css";

type RelationshipStepProps = {
  you: UtopiaMember;
  them: UtopiaMember;
  utopiaSlug: string;
  utopiaName: string;
  onBack: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
  /** Callback when user wants to see the other person's full reading */
  onViewTheirReading?: () => void;
  /** If true, the current viewer hasn't taken the quiz - show CTA */
  viewerHasNotTakenQuiz?: boolean;
  /** Array of all group members - for contextual "what's missing" section */
  groupMembers?: UtopiaMember[];
};

export function RelationshipStep({
  you,
  them,
  utopiaSlug,
  utopiaName,
  onBack,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  onViewTheirReading,
  viewerHasNotTakenQuiz,
  groupMembers,
}: RelationshipStepProps) {
  const yourArchetype = archetypes[you.archetype];
  const theirArchetype = archetypes[them.archetype];

  // Get pair reading content for this pairing
  const pairReading = getPairReading(you.archetype, them.archetype);

  // Determine if this is a standalone 2-person view or within a group
  const isStandalone = !groupMembers || groupMembers.length <= 2;

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/wonder/essay/quiz/utopia/${utopiaSlug}?view=relationship&you=${you.id}&them=${them.id}`;
    const shareText = `${yourArchetype?.name} × ${theirArchetype?.name} — What we'd build together`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${you.name || "You"} × ${them.name || "Them"}`,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  const userDots = [
    {
      id: you.id,
      name: you.name || "You",
      position: archetypePositions[you.archetype] || { x: 0, y: 0 },
      color: yourArchetype?.color || "#888",
      isYou: true,
    },
    {
      id: them.id,
      name: them.name || "Them",
      position: archetypePositions[them.archetype] || { x: 0, y: 0 },
      color: theirArchetype?.color || "#888",
    },
  ];

  // Swipe gestures for navigating between members
  const { onTouchStart, onTouchEnd } = useSwipe(
    hasNext ? onNext : undefined,
    hasPrev ? onPrev : undefined
  );

  return (
    <div
      className={styles.reading}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button className={styles.backButton} onClick={onBack}>
        ← Back to group
      </button>

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span style={{ color: yourArchetype?.color }}>{you.name || "You"}</span>
          <span className={styles.times}>×</span>
          <span style={{ color: theirArchetype?.color }}>{them.name || "Anonymous"}</span>
        </h1>
        <p className={styles.subtitle}>
          {yourArchetype?.name} & {theirArchetype?.name}
        </p>
      </header>

      {/* Radar Card */}
      <div className={styles.radarContainer}>
        <div className={styles.radarCard}>
          <RadarChart
            size={280}
            userDots={userDots}
            showAllArchetypes={false}
          />
        </div>
      </div>

      {/* CTA for viewers who haven't taken the quiz */}
      {viewerHasNotTakenQuiz && (
        <QuizCTA
          variant="relationship"
          personName={you.name || "them"}
          compareUserId={you.id}
        />
      )}

      {pairReading ? (
        <>
          {/* SECTION 1: WHAT YOU SHARE */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What You Share</h2>
            <div className={styles.bodyText}>
              {pairReading.whatYouShare.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <div className={styles.divider} />

          {/* SECTION 2: WHERE YOU'LL PUSH EACH OTHER */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Where You'll Push Each Other</h2>
            <div className={styles.bodyText}>
              {pairReading.whereYouPush.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <div className={styles.divider} />

          {/* SECTION 3: WHAT YOU CREATE TOGETHER */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What You Create Together</h2>
            <div className={styles.bodyText}>
              {pairReading.whatYouCreate.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <div className={styles.divider} />

          {/* SECTION 4: WHAT'S MISSING BETWEEN YOU */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What's Missing Between You</h2>
            <div className={styles.bodyText}>
              <p>{pairReading.whatsMissing}</p>
              <p className={styles.missingAdvice}>
                {isStandalone ? pairReading.missingStandalone : pairReading.missingInGroup}
              </p>
            </div>
          </section>
        </>
      ) : (
        <section className={styles.section}>
          <p className={styles.bodyText}>
            Content for this pairing is coming soon.
          </p>
        </section>
      )}

      {/* Share Button */}
      <div className={styles.ctaSection}>
        <button className={styles.shareButton} onClick={handleShare}>
          Share This Reading
        </button>
      </div>

      {/* Link to their full reading */}
      {onViewTheirReading && (
        <div className={styles.theirReadingSection}>
          <p className={styles.theirReadingPrompt}>
            Want to understand {them.name || "them"} better?
          </p>
          <button
            className={styles.theirReadingLink}
            onClick={onViewTheirReading}
          >
            See their full reading →
          </button>
        </div>
      )}

      {/* Swipe navigation */}
      {(hasNext || hasPrev) && (
        <div className={styles.swipeNav}>
          <button
            className={styles.swipeButton}
            onClick={onPrev}
            disabled={!hasPrev}
          >
            ←
          </button>
          <span className={styles.swipeHint}>Other members</span>
          <button
            className={styles.swipeButton}
            onClick={onNext}
            disabled={!hasNext}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
