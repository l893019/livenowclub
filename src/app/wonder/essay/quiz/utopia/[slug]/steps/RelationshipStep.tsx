"use client";

import { useState, useEffect, useMemo } from "react";
import { archetypes } from "@/lib/archetypes";
import { arrayToQuizAnswers, calculateDimensions } from "@/lib/dimensions";
import {
  getIdentityFromDimensions,
  getAdjectiveIndex,
} from "@/lib/identities";
import { getPairReading } from "@/lib/pair-dynamics";
import { useSwipe } from "@/hooks/useSwipe";
import type { UtopiaMember } from "@/lib/utopia";
import type { PairReading as LLMPairReading } from "@/lib/reading-prompts";
import { QuizCTA } from "@/app/wonder/essay/quiz/result/QuizCTA";
import { DimensionSpectrum } from "@/app/wonder/essay/quiz/result/DimensionSpectrum";
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
  const [llmReading, setLlmReading] = useState<LLMPairReading | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const yourArchetype = archetypes[you.archetype];
  const theirArchetype = archetypes[them.archetype];

  // Get archetype-based pair reading as fallback
  const archetypePairReading = getPairReading(you.archetype, them.archetype);

  // Determine if this is a standalone 2-person view or within a group
  const isStandalone = !groupMembers || groupMembers.length <= 2;

  // Fetch LLM pair reading when both have answers
  useEffect(() => {
    if (you.answers?.length === 7 && them.answers?.length === 7) {
      const answersYou = arrayToQuizAnswers(you.answers);
      const answersThem = arrayToQuizAnswers(them.answers);

      if (answersYou && answersThem) {
        setIsLoading(true);
        fetch('/api/reading/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'pair',
            members: [
              { name: you.name || 'You', answers: answersYou },
              { name: them.name || 'Them', answers: answersThem },
            ]
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data.reading) setLlmReading(data.reading);
            setIsLoading(false);
          })
          .catch(() => setIsLoading(false));
      }
    }
  }, [you.answers, them.answers, you.name, them.name]);

  // Calculate dimensions and identities for both people
  const { dimensions: dimensionsYou, identity: identityYou } = useMemo(() => {
    if (you.answers?.length === 7) {
      const answers = arrayToQuizAnswers(you.answers);
      if (answers) {
        const dims = calculateDimensions(answers);
        const adjIdx = getAdjectiveIndex(dims.certainty, dims.posture);
        const id = getIdentityFromDimensions(dims.agency, dims.certainty, dims.posture, adjIdx);
        return { dimensions: dims, identity: id };
      }
    }
    return { dimensions: null, identity: null };
  }, [you.answers]);

  const { dimensions: dimensionsThem, identity: identityThem } = useMemo(() => {
    if (them.answers?.length === 7) {
      const answers = arrayToQuizAnswers(them.answers);
      if (answers) {
        const dims = calculateDimensions(answers);
        const adjIdx = getAdjectiveIndex(dims.certainty, dims.posture);
        const id = getIdentityFromDimensions(dims.agency, dims.certainty, dims.posture, adjIdx);
        return { dimensions: dims, identity: id };
      }
    }
    return { dimensions: null, identity: null };
  }, [them.answers]);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/wonder/essay/quiz/utopia/${utopiaSlug}?view=relationship&you=${you.id}&them=${them.id}`;
    const yourName = identityYou?.name || yourArchetype?.name;
    const theirName = identityThem?.name || theirArchetype?.name;
    const shareText = `${yourName} × ${theirName} — What we'd build together`;

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
          <span style={{ color: identityYou?.color || yourArchetype?.color }}>{you.name || "You"}</span>
          <span className={styles.times}>×</span>
          <span style={{ color: identityThem?.color || theirArchetype?.color }}>{them.name || "Anonymous"}</span>
        </h1>
        <p className={styles.subtitle}>
          {identityYou?.name || yourArchetype?.name} & {identityThem?.name || theirArchetype?.name}
        </p>
      </header>

      {/* Dimension Spectrums */}
      <div className={styles.spectrums}>
        {dimensionsYou && (
          <div className={styles.spectrumCard}>
            <h4 className={styles.spectrumLabel} style={{ color: identityYou?.color || yourArchetype?.color }}>
              {you.name || "You"}
            </h4>
            <DimensionSpectrum dimensions={dimensionsYou} />
          </div>
        )}
        {dimensionsThem && (
          <div className={styles.spectrumCard}>
            <h4 className={styles.spectrumLabel} style={{ color: identityThem?.color || theirArchetype?.color }}>
              {them.name || "Them"}
            </h4>
            <DimensionSpectrum dimensions={dimensionsThem} />
          </div>
        )}
        {!dimensionsYou && !dimensionsThem && (
          <p className={styles.spectrumEmpty}>Both people need to complete the quiz to see dimensions.</p>
        )}
      </div>

      {/* CTA for viewers who haven't taken the quiz */}
      {viewerHasNotTakenQuiz && (
        <QuizCTA
          variant="relationship"
          personName={you.name || "them"}
          compareUserId={you.id}
        />
      )}

      {isLoading ? (
        <div className={styles.loading}>
          Generating your relationship reading...
        </div>
      ) : llmReading ? (
        <>
          {/* LLM-GENERATED PAIR READING */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Your Combined Pattern</h2>
            <div className={styles.bodyText}>
              <p>{llmReading.combinedPattern}</p>
            </div>
          </section>

          <div className={styles.divider} />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What You Give Each Other</h2>
            <div className={styles.giveCards}>
              <div className={styles.giveCard}>
                <span className={styles.giveName} style={{ color: identityYou?.color || yourArchetype?.color }}>
                  {you.name || "You"}
                </span>
                <span className={styles.giveArrow}>→</span>
                <p className={styles.giveText}>{llmReading.whatAGivesB}</p>
              </div>
              <div className={styles.giveCard}>
                <span className={styles.giveName} style={{ color: identityThem?.color || theirArchetype?.color }}>
                  {them.name || "Them"}
                </span>
                <span className={styles.giveArrow}>→</span>
                <p className={styles.giveText}>{llmReading.whatBGivesA}</p>
              </div>
            </div>
          </section>

          <div className={styles.divider} />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What Emerges Together</h2>
            <div className={styles.bodyText}>
              <p>{llmReading.whatEmerges}</p>
            </div>
          </section>

          <div className={styles.divider} />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Your Shared Strength</h2>
            <div className={styles.bodyText}>
              <p>{llmReading.sharedStrength}</p>
            </div>
          </section>

          <div className={styles.divider} />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>How You'll Make Decisions</h2>
            <div className={styles.bodyText}>
              <p>{llmReading.howDecisions}</p>
            </div>
          </section>

          <div className={styles.divider} />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Where You'll Create Friction</h2>
            <div className={styles.bodyText}>
              <p>{llmReading.friction}</p>
            </div>
          </section>

          <div className={styles.divider} />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What to Watch For</h2>
            <div className={styles.bodyText}>
              <p>{llmReading.watchFor}</p>
            </div>
          </section>

          <div className={styles.divider} />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What You'd Build Together</h2>
            <div className={styles.bodyText}>
              <p>{llmReading.whatYoudBuild}</p>
            </div>
          </section>
        </>
      ) : archetypePairReading ? (
        <>
          {/* ARCHETYPE-BASED FALLBACK */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What You Share</h2>
            <div className={styles.bodyText}>
              {archetypePairReading.whatYouShare.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <div className={styles.divider} />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Where You'll Push Each Other</h2>
            <div className={styles.bodyText}>
              {archetypePairReading.whereYouPush.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <div className={styles.divider} />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What You Create Together</h2>
            <div className={styles.bodyText}>
              {archetypePairReading.whatYouCreate.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <div className={styles.divider} />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What's Missing Between You</h2>
            <div className={styles.bodyText}>
              <p>{archetypePairReading.whatsMissing}</p>
              <p className={styles.missingAdvice}>
                {isStandalone ? archetypePairReading.missingStandalone : archetypePairReading.missingInGroup}
              </p>
            </div>
          </section>
        </>
      ) : (
        <section className={styles.section}>
          <p className={styles.bodyText}>
            Both people need to complete the quiz to see the relationship reading.
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
