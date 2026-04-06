"use client";

import { useState, useEffect, useCallback } from "react";
import { RevealAnimation } from "./RevealAnimation";
import { ReadingPage } from "./ReadingPage";

type ResultPageClientProps = {
  archetypeName: string;
  archetypeKey: string;
  archetypeColor: string;
  utopiaText: string;
  imageUrl: string;
  blindSpot: string;
  compatibility: { ally: string; tension: string; need: string };
  books: { title: string; author: string; reason: string }[];
  compareUserId?: string;
};

export function ResultPageClient({
  archetypeName,
  archetypeKey,
  archetypeColor,
  utopiaText,
  imageUrl,
  compareUserId,
}: ResultPageClientProps) {
  const [showReveal, setShowReveal] = useState(true);

  // Auto-advance reveal after 4 seconds, or tap to continue
  useEffect(() => {
    if (!showReveal) return;

    const timer = setTimeout(() => {
      setShowReveal(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [showReveal]);

  const handleRevealComplete = useCallback(() => {
    setShowReveal(false);
  }, []);

  return (
    <>
      {/* Global styles for fonts and CSS variables */}
      <style>{`
        :root {
          --bg-deep: #faf6f1;
          --bg: #fffbf7;
          --text: #2d2a26;
          --text-dim: rgba(45,42,38,0.7);
          --text-muted: rgba(45,42,38,0.45);
          --accent-pink: #e8178a;
          --accent-color: ${archetypeColor};
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          background: var(--bg-deep);
          color: var(--text);
          font-family: 'Satoshi', system-ui, sans-serif;
          font-size: 17px;
          line-height: 1.75;
          font-weight: 300;
          min-height: 100vh;
        }
      `}</style>

      <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet" />

      {showReveal && (
        <RevealAnimation
          archetypeName={archetypeName}
          archetypeColor={archetypeColor}
          utopiaText={utopiaText}
          imageUrl={imageUrl}
          onComplete={handleRevealComplete}
        />
      )}

      {!showReveal && <ReadingPage archetypeKey={archetypeKey} compareUserId={compareUserId} />}
    </>
  );
}
