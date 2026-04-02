"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { RevealAnimation } from "./RevealAnimation";
import { JourneyContainer } from "./JourneyContainer";
import { RadarExplainStep } from "./steps/RadarExplainStep";
import { CardStep } from "./steps/CardStep";
import { GoDeepStep } from "./steps/GoDeepStep";
import { CreateJoinStep } from "./steps/CreateJoinStep";

type ResultPageClientProps = {
  archetypeName: string;
  archetypeKey: string;
  archetypeColor: string;
  utopiaText: string;
  imageUrl: string;
  blindSpot: string;
  compatibility: { ally: string; tension: string; need: string };
  books: { title: string; author: string; reason: string }[];
};

export function ResultPageClient({
  archetypeName,
  archetypeKey,
  archetypeColor,
  utopiaText,
  imageUrl,
  blindSpot,
  compatibility,
  books,
}: ResultPageClientProps) {
  const [showReveal, setShowReveal] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const journeyKey = useRef(0);

  // Callback for CardStep's "Go Deeper" button - jumps to step 2 (GoDeepStep)
  const handleGoDeeper = useCallback(() => {
    setCurrentStep(2);
    journeyKey.current += 1; // Force remount to respect new initialStep
  }, []);

  // Callback for GoDeepStep's "Build Your Utopia" button - jumps to step 3 (CreateJoinStep)
  const handleBuildUtopia = useCallback(() => {
    setCurrentStep(3);
    journeyKey.current += 1;
  }, []);

  const handleStepChange = useCallback((stepIndex: number) => {
    setCurrentStep(stepIndex);
  }, []);

  const steps = useMemo(() => [
    {
      id: "radar",
      component: <RadarExplainStep archetypeKey={archetypeKey} imageUrl={imageUrl} />,
    },
    {
      id: "card",
      component: <CardStep archetypeKey={archetypeKey} imageUrl={imageUrl} onContinue={handleGoDeeper} onBuildUtopia={handleBuildUtopia} />,
    },
    {
      id: "deeper",
      component: <GoDeepStep archetypeKey={archetypeKey} imageUrl={imageUrl} compatibility={compatibility} books={books} blindSpot={blindSpot} onContinue={handleBuildUtopia} />,
    },
    {
      id: "create",
      component: <CreateJoinStep archetypeKey={archetypeKey} />,
    },
  ], [archetypeKey, imageUrl, handleGoDeeper, handleBuildUtopia, compatibility, books, blindSpot]);

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
          onComplete={() => setShowReveal(false)}
        />
      )}

      {!showReveal && (
        <JourneyContainer
          key={journeyKey.current}
          steps={steps}
          initialStep={currentStep}
          onStepChange={handleStepChange}
        />
      )}
    </>
  );
}
