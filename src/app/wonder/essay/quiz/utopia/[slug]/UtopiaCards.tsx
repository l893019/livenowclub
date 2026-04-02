// src/app/wonder/essay/quiz/utopia/[slug]/UtopiaCards.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useCarousel } from "./useCarousel";
import { CombinedCard } from "./CombinedCard";
import { ArchetypeCard } from "./ArchetypeCard";
import { archetypes } from "@/lib/archetypes";
import styles from "./UtopiaCards.module.css";

type Member = {
  id: string;
  name: string;
  archetype: string;
};

type UtopiaCardsProps = {
  members: Member[];
  createdBy: string;
  utopiaName: string;
};

export function UtopiaCards({ members, createdBy, utopiaName }: UtopiaCardsProps) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    setCurrentUserId(localStorage.getItem("quiz-user-id"));
  }, []);

  // Group members by archetype
  const grouped = useMemo(() => {
    const g: Record<string, Member[]> = {};
    members.forEach((member) => {
      if (!g[member.archetype]) {
        g[member.archetype] = [];
      }
      g[member.archetype].push(member);
    });
    return g;
  }, [members]);

  // Sort by count (most members first)
  const presentKeys = useMemo(() => {
    return Object.entries(grouped)
      .sort((a, b) => b[1].length - a[1].length)
      .map(([k]) => k);
  }, [grouped]);

  const {
    emblaRef,
    currentIndex,
    totalSlides,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    scrollTo,
  } = useCarousel();

  return (
    <div className={styles.container}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.track}>
          <CombinedCard
            utopiaName={utopiaName}
            presentKeys={presentKeys}
            grouped={grouped}
          />
          {presentKeys.map((key) => (
            <ArchetypeCard
              key={key}
              archetypeKey={key}
              members={grouped[key]}
              createdBy={createdBy}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className={styles.nav}>
        <button
          className={styles.arrow}
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={styles.dots}>
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ""}`}
              onClick={() => scrollTo(i)}
              aria-label={i === 0 ? "Combined view" : archetypes[presentKeys[i - 1]]?.name || "Card"}
              style={
                i > 0 && i === currentIndex
                  ? { backgroundColor: archetypes[presentKeys[i - 1]]?.color }
                  : undefined
              }
            />
          ))}
        </div>

        <button
          className={styles.arrow}
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className={styles.counter}>
        {currentIndex + 1} of {totalSlides}
      </div>
    </div>
  );
}
