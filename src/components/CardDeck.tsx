"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import type { Essay, EssayType } from "@/lib/essays";

type CardDeckProps = {
  essays: Essay[];
};

const FILTERS: { label: string; value: EssayType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Essays", value: "essay" },
  { label: "Poems", value: "poem" },
  { label: "Guides", value: "guide" },
];

export default function CardDeck({ essays }: CardDeckProps) {
  const deckRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<EssayType | "all">("all");

  const filteredEssays = filter === "all" ? essays : essays.filter((e) => e.type === filter);

  const scrollToIndex = useCallback((index: number) => {
    if (!deckRef.current) return;
    const card = deckRef.current.children[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: "smooth", inline: "start" });
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (!deckRef.current) return;
    const scrollLeft = deckRef.current.scrollLeft;
    const cardWidth = window.innerWidth;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(newIndex);
  }, []);

  const goNext = useCallback(() => {
    if (currentIndex < filteredEssays.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  }, [currentIndex, filteredEssays.length, scrollToIndex]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  }, [currentIndex, scrollToIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // Reset to first card when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    if (deckRef.current) {
      deckRef.current.scrollLeft = 0;
    }
  }, [filter]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <div className="read-deck">
      {/* Filter Pills */}
      <div className="deck-filters">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`deck-filter ${filter === f.value ? "active" : ""}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Card Deck */}
      <div className="card-deck" ref={deckRef} onScroll={handleScroll}>
        {filteredEssays.map((essay) => (
          <Link
            key={essay.slug}
            href={`/read/${essay.slug}`}
            className={`essay-card essay-card--${essay.color}`}
            style={essay.image ? { "--card-bg": `url(${essay.image})` } as React.CSSProperties : undefined}
            data-image={essay.image ? "true" : undefined}
          >
            <div className="essay-card-inner">
              <span className="essay-card-type">{essay.type}</span>
              <h2 className="essay-card-title">{essay.title}</h2>
              {essay.excerpt && <p className="essay-card-quote">{essay.excerpt}</p>}
              <span className="essay-card-date">{formatDate(essay.date)}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Arrow Navigation */}
      {currentIndex > 0 && (
        <button className="deck-arrow deck-arrow--prev" onClick={goPrev} aria-label="Previous">
          ←
        </button>
      )}
      {currentIndex < filteredEssays.length - 1 && (
        <button className="deck-arrow deck-arrow--next" onClick={goNext} aria-label="Next">
          →
        </button>
      )}

      {/* Dot Navigation */}
      <nav className="deck-nav" aria-label="Essay navigation">
        {filteredEssays.slice(0, 20).map((essay, index) => (
          <button
            key={essay.slug}
            className={`deck-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to ${essay.title}`}
            aria-current={index === currentIndex ? "true" : undefined}
          />
        ))}
        {filteredEssays.length > 20 && (
          <span style={{ fontSize: "10px", color: "var(--aa-text-muted)" }}>+{filteredEssays.length - 20}</span>
        )}
      </nav>
    </div>
  );
}
