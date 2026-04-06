"use client";

import { RadarChart } from "@/components/RadarChart";
import { archetypePositions } from "@/lib/radar-positions";
import {
  archetypes,
  getAnalyticalPairDynamic,
} from "@/lib/archetypes";
import type { UtopiaMember } from "@/lib/utopia";
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
}: RelationshipStepProps) {
  const yourArchetype = archetypes[you.archetype];
  const theirArchetype = archetypes[them.archetype];

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/wonder/essay/quiz/utopia/${utopiaSlug}?view=relationship&you=${you.id}&them=${them.id}`;
    const shareText = `${yourArchetype?.name?.split(" ")[0]} × ${theirArchetype?.name?.split(" ")[0]} — See our relationship`;

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

  // Get analytical dynamic content
  const dynamic = getAnalyticalPairDynamic(you.archetype, them.archetype);

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

  return (
    <div className={styles.reading}>
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

      {/* Opening Thesis */}
      <p className={styles.thesis}>"{dynamic.thesis}"</p>

      <div className={styles.divider} />

      {/* THE DISTANCE */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Distance</h2>
        <div className={styles.bodyText}>
          {dynamic.distanceAnalysis.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <div className={styles.divider} />

      {/* THE DYNAMIC */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Dynamic</h2>
        <div className={styles.bodyText}>
          {dynamic.dynamic.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <div className={styles.divider} />

      {/* WHERE YOU ALIGN */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Where You Align</h2>
        {dynamic.align.map((item, i) => (
          <div key={i} className={styles.expandedPoint}>
            <h3 className={styles.pointHeading}>{item.point}</h3>
            <p className={styles.bodyTextBlock}>{item.explanation}</p>
          </div>
        ))}
      </section>

      <div className={styles.divider} />

      {/* WHERE YOU'LL CLASH */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Where You'll Clash</h2>
        {dynamic.clash.map((item, i) => (
          <div key={i} className={styles.expandedPoint}>
            <h3 className={styles.pointHeading}>{item.point}</h3>
            <p className={styles.bodyTextBlock}>{item.explanation}</p>
          </div>
        ))}
      </section>

      <div className={styles.divider} />

      {/* WHAT YOU EXCHANGE */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What You Exchange</h2>

        <div className={styles.exchangeBlock}>
          <h4 className={styles.exchangeName} style={{ color: yourArchetype?.color }}>
            What {you.name || "You"} gives {them.name || "Them"}
          </h4>
          <p className={styles.bodyTextBlock}>{dynamic.give.youToThem}</p>
        </div>

        <div className={styles.exchangeBlock}>
          <h4 className={styles.exchangeName} style={{ color: theirArchetype?.color }}>
            What {them.name || "Them"} gives {you.name || "You"}
          </h4>
          <p className={styles.bodyTextBlock}>{dynamic.give.themToYou}</p>
        </div>
      </section>

      <div className={styles.divider} />

      {/* THE RISK */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>The Risk</h2>
        <div className={styles.bodyText}>
          {dynamic.risk.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <div className={styles.divider} />

      {/* A QUESTION FOR YOU BOTH */}
      <section className={styles.questionSection}>
        <h2 className={styles.sectionTitle}>A Question for You Both</h2>
        <p className={styles.questionText}>"{dynamic.question.text}"</p>
        <p className={styles.questionFraming}>{dynamic.question.framing}</p>
      </section>

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
