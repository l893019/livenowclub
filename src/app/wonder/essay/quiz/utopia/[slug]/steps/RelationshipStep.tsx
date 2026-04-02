"use client";

import { RadarChart } from "@/components/RadarChart";
import { archetypePositions } from "@/lib/radar-positions";
import {
  archetypes,
  getDetailedPairDynamic,
  generateFallbackDynamic,
  getPairDistance,
  distanceDescriptions,
  getRelationshipQuestion,
  getOpeningThesis,
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

  // Get dynamic content
  const dynamic =
    getDetailedPairDynamic(you.archetype, them.archetype) ||
    generateFallbackDynamic(you.archetype, them.archetype);

  // Get new content
  const thesis = getOpeningThesis(you.archetype, them.archetype);
  const { category: distanceCategory } = getPairDistance(you.archetype, them.archetype);
  const distanceText = distanceDescriptions[distanceCategory];
  const question = getRelationshipQuestion(you.archetype, them.archetype);

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

      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          <span style={{ color: yourArchetype?.color }}>{you.name || "You"}</span>
          <span className={styles.times}>×</span>
          <span style={{ color: theirArchetype?.color }}>{them.name || "Anonymous"}</span>
        </h2>
        <p className={styles.subtitle}>
          {yourArchetype?.name} & {theirArchetype?.name}
        </p>
      </div>

      {/* Radar Card */}
      <div className={styles.radarCard}>
        <RadarChart
          size={280}
          userDots={userDots}
          showAllArchetypes={false}
        />
      </div>

      {/* Opening Thesis */}
      <p className={styles.thesis}>"{thesis}"</p>

      {/* Content Sections */}
      <div className={styles.content}>
        {/* The Distance */}
        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>The Distance</h3>
          <p className={styles.sectionText}>{distanceText}</p>
        </section>

        {/* Superpowers */}
        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>Your Superpowers</h3>
          <div className={styles.superpowerCards}>
            <div className={styles.superpowerCard} style={{ borderLeftColor: yourArchetype?.color }}>
              <span className={styles.superpowerName}>{you.name || "You"}</span>
              <span className={styles.superpowerText}>{yourArchetype?.superpower}</span>
            </div>
            <div className={styles.superpowerCard} style={{ borderLeftColor: theirArchetype?.color }}>
              <span className={styles.superpowerName}>{them.name || "Them"}</span>
              <span className={styles.superpowerText}>{theirArchetype?.superpower}</span>
            </div>
          </div>
        </section>

        {/* Where You Align */}
        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>Where You Align</h3>
          <ul className={styles.bulletList}>
            {dynamic.align.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </section>

        {/* Where You'll Clash */}
        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>Where You'll Clash</h3>
          <ul className={styles.bulletList}>
            {dynamic.clash.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </section>

        {/* What You Give Each Other */}
        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>What You Give Each Other</h3>
          <p className={styles.giveText}>{dynamic.give}</p>
        </section>

        {/* A Question for You Both */}
        <section className={styles.questionSection}>
          <h3 className={styles.sectionLabel}>A Question for You Both</h3>
          <p className={styles.questionText}>"{question}"</p>
        </section>
      </div>

      {/* Share button */}
      <button className={styles.shareButton} onClick={handleShare}>
        Share This Relationship
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
