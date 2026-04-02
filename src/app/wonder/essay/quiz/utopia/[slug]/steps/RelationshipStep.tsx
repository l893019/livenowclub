"use client";

import { RadarChart } from "@/components/RadarChart";
import { archetypePositions } from "@/lib/radar-positions";
import {
  archetypes,
  getDetailedPairDynamic,
  generateFallbackDynamic,
} from "@/lib/archetypes";
import type { UtopiaMember } from "@/lib/utopia";
import styles from "./RelationshipStep.module.css";

type RelationshipStepProps = {
  you: UtopiaMember;
  them: UtopiaMember;
  utopiaSlug: string;
  onBack: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
};

export function RelationshipStep({
  you,
  them,
  utopiaSlug,
  onBack,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
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

  // Get dynamic (detailed or fallback)
  const dynamic =
    getDetailedPairDynamic(you.archetype, them.archetype) ||
    generateFallbackDynamic(you.archetype, them.archetype);

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
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onBack}>
        ← Back to group
      </button>

      <div className={styles.header}>
        <h2 className={styles.title}>
          <span style={{ color: yourArchetype?.color }}>You</span>
          {" × "}
          <span style={{ color: theirArchetype?.color }}>{them.name || "Anonymous"}</span>
        </h2>
        <p className={styles.subtitle}>
          {yourArchetype?.name?.split(" ")[0]} × {theirArchetype?.name?.split(" ")[0]}
        </p>
      </div>

      <div className={styles.radarWrapper}>
        <RadarChart
          size={240}
          userDots={userDots}
          showAllArchetypes={false}
        />
      </div>

      <div className={styles.reading}>
        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>Where you align</h3>
          <ul className={styles.bulletList}>
            {dynamic.align.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>Where you'll clash</h3>
          <ul className={styles.bulletList}>
            {dynamic.clash.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>What you give each other</h3>
          <p className={styles.giveText}>{dynamic.give}</p>
        </section>
      </div>

      {/* Share button */}
      <button className={styles.shareButton} onClick={handleShare}>
        Share this relationship
      </button>

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
          <span className={styles.swipeHint}>Swipe for other members</span>
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
