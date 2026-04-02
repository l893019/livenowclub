# Utopia Quiz Journey Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the utopia quiz experience into a visual journey with screenshot-worthy moments at each step, following Personal → Group → Relationship flow inspired by The Pattern app.

**Architecture:** Multi-step journey using React state machine to track current step. Each step is a separate component with its own animation/transition. Navigation via forward/back gestures. Share generates 1080x1920 image.

**Tech Stack:** Next.js 14, React, CSS Modules, html-to-image (for share artifacts), Framer Motion (optional for polish)

---

## Phase 1: Individual Journey

### Task 1: Update RevealAnimation with "You are a..." phrasing

**Files:**
- Modify: `src/app/wonder/essay/quiz/result/RevealAnimation.tsx`
- Modify: `src/app/wonder/essay/quiz/result/RevealAnimation.module.css`

**Step 1: Update RevealAnimation component**

Edit `src/app/wonder/essay/quiz/result/RevealAnimation.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import styles from "./RevealAnimation.module.css";

type RevealAnimationProps = {
  archetypeName: string;
  archetypeColor: string;
  utopiaText: string;
  imageUrl: string;
  onComplete: () => void;
};

export function RevealAnimation({
  archetypeName,
  archetypeColor,
  utopiaText,
  imageUrl,
  onComplete,
}: RevealAnimationProps) {
  const [phase, setPhase] = useState<"youAre" | "name" | "image" | "text" | "done">("youAre");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("name"), 800),
      setTimeout(() => setPhase("image"), 2500),
      setTimeout(() => setPhase("text"), 4000),
      setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 6500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={`${styles.youAre} ${phase !== "youAre" ? styles.youAreVisible : ""}`}>
          You are
        </div>
        <div className={`${styles.name} ${phase !== "youAre" && phase !== "name" ? styles.nameUp : ""}`}>
          <span style={{ color: archetypeColor }}>{archetypeName}</span>
        </div>

        {(phase === "image" || phase === "text") && (
          <img
            src={imageUrl}
            alt={archetypeName}
            className={`${styles.image} ${phase === "text" ? styles.imageShrink : ""}`}
          />
        )}

        {phase === "text" && (
          <p className={styles.utopia}>{utopiaText}</p>
        )}
      </div>

      <button className={styles.tapToContinue} onClick={onComplete}>
        Tap to continue
      </button>
    </div>
  );
}
```

**Step 2: Update the CSS**

Edit `src/app/wonder/essay/quiz/result/RevealAnimation.module.css`:

```css
.overlay {
  position: fixed;
  inset: 0;
  background: #0a0a0a;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 520px;
}

.youAre {
  font-size: 1.2rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 8px;
  opacity: 0;
  animation: fadeIn 0.8s ease forwards;
}

.youAreVisible {
  opacity: 1;
}

.name {
  font-size: clamp(2rem, 8vw, 3.5rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  opacity: 0;
  animation: fadeIn 0.8s ease 0.8s forwards;
  transition: transform 0.8s ease, margin 0.8s ease;
}

.nameUp {
  transform: translateY(-40px);
  margin-bottom: 24px;
}

.image {
  width: 280px;
  height: auto;
  border-radius: 16px;
  opacity: 0;
  animation: riseIn 1s ease forwards;
  transition: transform 0.6s ease, width 0.6s ease;
}

.imageShrink {
  width: 200px;
  transform: translateY(-20px);
}

.utopia {
  font-size: 1.15rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  margin-top: 24px;
  max-width: 440px;
  opacity: 0;
  animation: fadeIn 0.8s ease forwards;
}

.tapToContinue {
  position: absolute;
  bottom: 48px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
  font-family: inherit;
  cursor: pointer;
  letter-spacing: 0.05em;
  transition: color 0.2s;
}

.tapToContinue:hover {
  color: rgba(255, 255, 255, 0.7);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes riseIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Step 3: Verify changes**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/app/wonder/essay/quiz/result/RevealAnimation.tsx src/app/wonder/essay/quiz/result/RevealAnimation.module.css
git commit -m "feat(quiz): update reveal with 'You are a...' phrasing and improved timing"
```

---

### Task 2: Create Journey Container with Step Navigation

**Files:**
- Create: `src/app/wonder/essay/quiz/result/JourneyContainer.tsx`
- Create: `src/app/wonder/essay/quiz/result/JourneyContainer.module.css`

**Step 1: Create JourneyContainer component**

Create `src/app/wonder/essay/quiz/result/JourneyContainer.tsx`:

```tsx
"use client";

import { useState, useCallback, useEffect, ReactNode } from "react";
import styles from "./JourneyContainer.module.css";

type Step = {
  id: string;
  component: ReactNode;
};

type JourneyContainerProps = {
  steps: Step[];
  initialStep?: number;
  onStepChange?: (stepIndex: number, stepId: string) => void;
};

export function JourneyContainer({
  steps,
  initialStep = 0,
  onStepChange,
}: JourneyContainerProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const canGoBack = currentStep > 0;
  const canGoForward = currentStep < steps.length - 1;

  const goToStep = useCallback((index: number) => {
    if (index >= 0 && index < steps.length) {
      setDirection(index > currentStep ? "forward" : "back");
      setCurrentStep(index);
      onStepChange?.(index, steps[index].id);
    }
  }, [currentStep, steps, onStepChange]);

  const goBack = useCallback(() => {
    if (canGoBack) goToStep(currentStep - 1);
  }, [canGoBack, currentStep, goToStep]);

  const goForward = useCallback(() => {
    if (canGoForward) goToStep(currentStep + 1);
  }, [canGoForward, currentStep, goToStep]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goBack();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        goForward();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goBack, goForward]);

  return (
    <div className={styles.container}>
      {/* Progress dots */}
      <div className={styles.progress}>
        {steps.map((step, i) => (
          <button
            key={step.id}
            className={`${styles.dot} ${i === currentStep ? styles.dotActive : ""} ${i < currentStep ? styles.dotComplete : ""}`}
            onClick={() => goToStep(i)}
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
      </div>

      {/* Step content */}
      <div
        className={`${styles.stepContent} ${styles[direction]}`}
        key={currentStep}
      >
        {steps[currentStep]?.component}
      </div>

      {/* Navigation buttons */}
      <div className={styles.navigation}>
        <button
          className={`${styles.navButton} ${styles.navBack}`}
          onClick={goBack}
          disabled={!canGoBack}
          aria-label="Previous step"
        >
          ←
        </button>
        <button
          className={`${styles.navButton} ${styles.navForward}`}
          onClick={goForward}
          disabled={!canGoForward}
          aria-label="Next step"
        >
          →
        </button>
      </div>
    </div>
  );
}

// Export navigation context for child components to use
export type JourneyNavigation = {
  goBack: () => void;
  goForward: () => void;
  goToStep: (index: number) => void;
  currentStep: number;
  totalSteps: number;
};
```

**Step 2: Create CSS module**

Create `src/app/wonder/essay/quiz/result/JourneyContainer.module.css`:

```css
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.progress {
  position: fixed;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 100;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(45, 42, 38, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.dot:hover {
  background: rgba(45, 42, 38, 0.4);
  transform: scale(1.2);
}

.dotActive {
  background: #e8178a;
  transform: scale(1.3);
}

.dotComplete {
  background: rgba(232, 23, 138, 0.4);
}

.stepContent {
  flex: 1;
  animation: slideIn 0.4s ease;
}

.forward {
  animation: slideInForward 0.4s ease;
}

.back {
  animation: slideInBack 0.4s ease;
}

@keyframes slideInForward {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInBack {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.navigation {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16px;
  z-index: 100;
}

.navButton {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(45, 42, 38, 0.2);
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  font-size: 18px;
  color: rgba(45, 42, 38, 0.7);
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);
}

.navButton:hover:not(:disabled) {
  border-color: #e8178a;
  color: #e8178a;
  transform: scale(1.05);
}

.navButton:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .progress {
    top: auto;
    bottom: 100px;
    right: 50%;
    transform: translateX(50%);
    flex-direction: row;
  }

  .navigation {
    bottom: 24px;
  }

  .navButton {
    width: 44px;
    height: 44px;
  }
}
```

**Step 3: Verify changes**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/app/wonder/essay/quiz/result/JourneyContainer.tsx src/app/wonder/essay/quiz/result/JourneyContainer.module.css
git commit -m "feat(quiz): add JourneyContainer with step navigation"
```

---

### Task 3: Create Radar Explanation Step

**Files:**
- Create: `src/app/wonder/essay/quiz/result/steps/RadarExplainStep.tsx`
- Create: `src/app/wonder/essay/quiz/result/steps/RadarExplainStep.module.css`
- Modify: `src/lib/radar-positions.ts` (add quadrant descriptions)

**Step 1: Add quadrant and position descriptions to radar-positions.ts**

Edit `src/lib/radar-positions.ts` to add after `axisLabels`:

```typescript
// Quadrant descriptions
export const quadrantDescriptions = {
  transcendBuild: "You want to create new futures",
  transcendWitness: "You see beyond, but don't rush to act",
  rootBuild: "You build on solid ground",
  rootWitness: "You hold what others forget",
};

// Axis descriptions (for the explanation step)
export const axisDescriptions = {
  north: "reaching beyond",
  south: "staying grounded",
  east: "creating change",
  west: "seeing clearly",
};

// Position one-liners for each archetype
export const positionDescriptions: Record<string, string> = {
  citizen: "You trust that abundance, properly shared, tends toward good.",
  shaper: "You can't stop building. The future is raw material.",
  architect: "You focus on the structures that make freedom possible.",
  presence: "You know that undivided attention changes everything.",
  swimmer: "You live in the questions. Wisdom is in the uncertainty.",
  rooted: "You've arrived at something most people spend their lives running from.",
  conscience: "You see what others prefer to ignore.",
  embers: "You keep looking back, because we've already figured most of this out.",
  friction: "Something in you requires resistance. Ease is more dangerous than difficulty.",
  unbound: "The boundary of the self is simply not where you stop.",
  alive: "The universe gave you everything. The least you can do is feel it.",
  mender: "While everyone else is building arks, you're fixing what's in front of you.",
  cleareyed: "You have one job: to see what's actually happening and say it out loud.",
  between: "Everyone else has a position. You have a question.",
};
```

**Step 2: Create RadarExplainStep component**

Create `src/app/wonder/essay/quiz/result/steps/RadarExplainStep.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { RadarChart } from "@/components/RadarChart";
import {
  axisLabels,
  axisDescriptions,
  positionDescriptions,
  archetypePositions,
} from "@/lib/radar-positions";
import { archetypes } from "@/lib/archetypes";
import styles from "./RadarExplainStep.module.css";

type RadarExplainStepProps = {
  archetypeKey: string;
  imageUrl: string;
};

export function RadarExplainStep({ archetypeKey, imageUrl }: RadarExplainStepProps) {
  const [phase, setPhase] = useState(0);
  const archetype = archetypes[archetypeKey];
  const position = archetypePositions[archetypeKey];
  const positionDescription = positionDescriptions[archetypeKey];

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),   // Show axes
      setTimeout(() => setPhase(2), 1500),  // Show labels
      setTimeout(() => setPhase(3), 3000),  // Show user dot
      setTimeout(() => setPhase(4), 4000),  // Show description
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className={styles.container}>
      {/* Mini island at top */}
      <div className={`${styles.miniIsland} ${phase >= 0 ? styles.visible : ""}`}>
        <img src={imageUrl} alt="" className={styles.islandImage} />
      </div>

      {/* Radar with animated elements */}
      <div className={`${styles.radarWrapper} ${phase >= 1 ? styles.visible : ""}`}>
        <RadarChart
          size={300}
          highlightArchetype={phase >= 3 ? archetypeKey : undefined}
          showAllArchetypes={phase >= 3}
        />

        {/* Axis labels that fade in */}
        {phase >= 2 && (
          <div className={styles.axisLabels}>
            <div className={`${styles.axisLabel} ${styles.north}`}>
              <span className={styles.axisName}>{axisLabels.north}</span>
              <span className={styles.axisDesc}>{axisDescriptions.north}</span>
            </div>
            <div className={`${styles.axisLabel} ${styles.south}`}>
              <span className={styles.axisName}>{axisLabels.south}</span>
              <span className={styles.axisDesc}>{axisDescriptions.south}</span>
            </div>
            <div className={`${styles.axisLabel} ${styles.east}`}>
              <span className={styles.axisName}>{axisLabels.east}</span>
              <span className={styles.axisDesc}>{axisDescriptions.east}</span>
            </div>
            <div className={`${styles.axisLabel} ${styles.west}`}>
              <span className={styles.axisName}>{axisLabels.west}</span>
              <span className={styles.axisDesc}>{axisDescriptions.west}</span>
            </div>
          </div>
        )}
      </div>

      {/* Position description */}
      {phase >= 4 && (
        <p className={styles.positionDescription} style={{ color: archetype?.color }}>
          {positionDescription}
        </p>
      )}

      <p className={styles.hint}>The map of you</p>
    </div>
  );
}
```

**Step 3: Create CSS module**

Create `src/app/wonder/essay/quiz/result/steps/RadarExplainStep.module.css`:

```css
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  background: #0a0a0a;
  color: white;
}

.miniIsland {
  width: 80px;
  height: 80px;
  margin-bottom: 32px;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.6s ease;
}

.miniIsland.visible {
  opacity: 1;
  transform: translateY(0);
}

.islandImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.radarWrapper {
  position: relative;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.radarWrapper.visible {
  opacity: 1;
}

.axisLabels {
  position: absolute;
  inset: -60px;
  pointer-events: none;
}

.axisLabel {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.6s ease forwards;
}

.axisName {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.9);
}

.axisDesc {
  font-size: 10px;
  font-style: italic;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
}

.north {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.south {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.east {
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  text-align: left;
}

.west {
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  text-align: right;
}

.positionDescription {
  font-size: 1.15rem;
  font-style: italic;
  line-height: 1.7;
  max-width: 400px;
  text-align: center;
  margin-top: 40px;
  animation: fadeIn 0.8s ease forwards;
}

.hint {
  position: absolute;
  bottom: 48px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.05em;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Step 4: Verify changes**

Run: `npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/lib/radar-positions.ts src/app/wonder/essay/quiz/result/steps/RadarExplainStep.tsx src/app/wonder/essay/quiz/result/steps/RadarExplainStep.module.css
git commit -m "feat(quiz): add radar explanation step with axis descriptions"
```

---

### Task 4: Create Shareable Card Step

**Files:**
- Create: `src/app/wonder/essay/quiz/result/steps/CardStep.tsx`
- Create: `src/app/wonder/essay/quiz/result/steps/CardStep.module.css`

**Step 1: Create CardStep component**

Create `src/app/wonder/essay/quiz/result/steps/CardStep.tsx`:

```tsx
"use client";

import { useRef, useState } from "react";
import { MiniRadarChart } from "@/components/MiniRadarChart";
import { archetypes } from "@/lib/archetypes";
import styles from "./CardStep.module.css";

type CardStepProps = {
  archetypeKey: string;
  imageUrl: string;
  onContinue: () => void;
};

export function CardStep({ archetypeKey, imageUrl, onContinue }: CardStepProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [sharing, setSharing] = useState(false);
  const archetype = archetypes[archetypeKey];

  const handleShare = async () => {
    setSharing(true);

    // Copy link to clipboard as backup
    const shareUrl = `${window.location.origin}/wonder/essay/quiz/result?a=${archetypeKey}`;
    await navigator.clipboard.writeText(shareUrl);

    // Try native share
    if (navigator.share) {
      try {
        await navigator.share({
          title: `I'm a ${archetype?.name}`,
          text: archetype?.utopia,
          url: shareUrl,
        });
      } catch (e) {
        // User cancelled or share failed
      }
    }

    setSharing(false);
  };

  return (
    <div className={styles.container}>
      {/* The shareable card */}
      <div
        ref={cardRef}
        className={styles.card}
        style={{ "--accent-color": archetype?.color } as React.CSSProperties}
      >
        <h2 className={styles.archetypeName} style={{ color: archetype?.color }}>
          {archetype?.name}
        </h2>

        <img src={imageUrl} alt="" className={styles.islandImage} />

        <p className={styles.utopiaQuote}>{archetype?.utopia}</p>

        <div className={styles.radarThumbnail}>
          <MiniRadarChart members={[{ archetype: archetypeKey }]} size={60} />
        </div>

        <span className={styles.branding}>livenowclub.com/quiz</span>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button
          className={styles.shareButton}
          onClick={handleShare}
          disabled={sharing}
        >
          {sharing ? "Sharing..." : "Share"}
        </button>
        <button className={styles.continueButton} onClick={onContinue}>
          Go Deeper →
        </button>
      </div>
    </div>
  );
}
```

**Step 2: Create CSS module**

Create `src/app/wonder/essay/quiz/result/steps/CardStep.module.css`:

```css
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  background: #faf6f1;
}

.card {
  background: white;
  border-radius: 20px;
  padding: 32px;
  max-width: 340px;
  width: 100%;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.archetypeName {
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  margin-bottom: 20px;
}

.islandImage {
  width: 200px;
  height: auto;
  border-radius: 12px;
  margin-bottom: 20px;
}

.utopiaQuote {
  font-size: 1rem;
  font-style: italic;
  color: rgba(45, 42, 38, 0.8);
  line-height: 1.7;
  margin-bottom: 20px;
}

.radarThumbnail {
  margin-bottom: 16px;
}

.branding {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(45, 42, 38, 0.4);
}

.actions {
  display: flex;
  gap: 16px;
  margin-top: 32px;
}

.shareButton,
.continueButton {
  padding: 14px 28px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.shareButton {
  background: #e8178a;
  color: white;
  border: none;
}

.shareButton:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(232, 23, 138, 0.3);
}

.shareButton:disabled {
  opacity: 0.6;
}

.continueButton {
  background: transparent;
  color: rgba(45, 42, 38, 0.7);
  border: 1px solid rgba(45, 42, 38, 0.2);
}

.continueButton:hover {
  border-color: #e8178a;
  color: #e8178a;
}
```

**Step 3: Verify changes**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/app/wonder/essay/quiz/result/steps/CardStep.tsx src/app/wonder/essay/quiz/result/steps/CardStep.module.css
git commit -m "feat(quiz): add shareable card step with mini radar"
```

---

### Task 5: Create Go Deeper (Full Profile) Step

**Files:**
- Create: `src/app/wonder/essay/quiz/result/steps/GoDeepStep.tsx`
- Create: `src/app/wonder/essay/quiz/result/steps/GoDeepStep.module.css`

**Step 1: Create GoDeepStep component**

Create `src/app/wonder/essay/quiz/result/steps/GoDeepStep.tsx`:

```tsx
"use client";

import Link from "next/link";
import { archetypes } from "@/lib/archetypes";
import styles from "./GoDeepStep.module.css";

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

type GoDeepStepProps = {
  archetypeKey: string;
  imageUrl: string;
  compatibility: { ally: string; tension: string; need: string };
  books: { title: string; author: string; reason: string }[];
  blindSpot: string;
};

export function GoDeepStep({
  archetypeKey,
  imageUrl,
  compatibility,
  books,
  blindSpot,
}: GoDeepStepProps) {
  const archetype = archetypes[archetypeKey];

  const getCompatArchetype = (description: string) => {
    const key = compatibilityMap[description];
    return key ? archetypes[key] : null;
  };

  return (
    <div className={styles.container}>
      {/* Blind Spot Section */}
      <section className={styles.section}>
        <h3 className={styles.sectionLabel}>Your Blind Spot</h3>
        <div className={styles.blindSpotCard}>
          <p className={styles.blindSpotText}>{blindSpot}</p>
        </div>
      </section>

      {/* Your People Section */}
      <section className={styles.section}>
        <h3 className={styles.sectionLabel}>Your People</h3>
        <div className={styles.compatibilityList}>
          <div className={styles.compatItem}>
            <span className={styles.compatType}>You'll click with</span>
            <Link
              href={`/wonder/essay/quiz/result?a=${compatibilityMap[compatibility.ally]}`}
              className={styles.compatLink}
              style={{ color: getCompatArchetype(compatibility.ally)?.color }}
            >
              {getCompatArchetype(compatibility.ally)?.name || compatibility.ally}
            </Link>
          </div>
          <div className={styles.compatItem}>
            <span className={styles.compatType}>You'll clash with</span>
            <Link
              href={`/wonder/essay/quiz/result?a=${compatibilityMap[compatibility.tension]}`}
              className={styles.compatLink}
              style={{ color: getCompatArchetype(compatibility.tension)?.color }}
            >
              {getCompatArchetype(compatibility.tension)?.name || compatibility.tension}
            </Link>
          </div>
          <div className={styles.compatItem}>
            <span className={styles.compatType}>You secretly need</span>
            <Link
              href={`/wonder/essay/quiz/result?a=${compatibilityMap[compatibility.need]}`}
              className={styles.compatLink}
              style={{ color: getCompatArchetype(compatibility.need)?.color }}
            >
              {getCompatArchetype(compatibility.need)?.name || compatibility.need}
            </Link>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className={styles.section}>
        <h3 className={styles.sectionLabel}>Books for You</h3>
        <div className={styles.booksList}>
          {books.map((book, i) => (
            <div key={i} className={styles.bookItem}>
              <div className={styles.bookHeader}>
                <span className={styles.bookTitle}>{book.title}</span>
                <span className={styles.bookAuthor}>({book.author})</span>
              </div>
              <p className={styles.bookReason}>{book.reason}</p>
              <a
                href={`https://bookshop.org/search?keywords=${encodeURIComponent(book.title + ' ' + book.author)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bookLink}
              >
                Find on Bookshop.org →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Island Section */}
      <section className={styles.section}>
        <h3 className={styles.sectionLabel}>Your Island</h3>
        <img src={imageUrl} alt={archetype?.name} className={styles.islandFull} />
      </section>

      {/* Essay Link */}
      <div className={styles.essayLink}>
        <Link href="/wonder/essay">
          This quiz is from an essay on post-scarcity futures. Read it →
        </Link>
      </div>
    </div>
  );
}
```

**Step 2: Create CSS module**

Create `src/app/wonder/essay/quiz/result/steps/GoDeepStep.module.css`:

```css
.container {
  min-height: 100vh;
  padding: 100px 24px 120px;
  background: #faf6f1;
  max-width: 600px;
  margin: 0 auto;
}

.section {
  margin-bottom: 48px;
}

.sectionLabel {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(45, 42, 38, 0.45);
  margin-bottom: 16px;
  text-align: center;
}

.blindSpotCard {
  background: rgba(0, 0, 0, 0.03);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
}

.blindSpotText {
  font-size: 1.05rem;
  font-style: italic;
  color: rgba(45, 42, 38, 0.8);
  line-height: 1.7;
}

.compatibilityList {
  background: white;
  border-radius: 12px;
  padding: 8px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.compatItem {
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.compatItem:last-child {
  border-bottom: none;
}

.compatType {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(45, 42, 38, 0.45);
}

.compatLink {
  font-size: 1rem;
  text-decoration: none;
  transition: opacity 0.2s;
}

.compatLink:hover {
  opacity: 0.7;
}

.booksList {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.bookItem {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.bookHeader {
  font-size: 1rem;
  margin-bottom: 8px;
}

.bookTitle {
  font-style: italic;
  color: #2d2a26;
}

.bookAuthor {
  color: rgba(45, 42, 38, 0.6);
}

.bookReason {
  font-size: 0.9rem;
  color: rgba(45, 42, 38, 0.7);
  line-height: 1.6;
  margin-bottom: 8px;
}

.bookLink {
  font-size: 0.85rem;
  color: #e8178a;
  text-decoration: none;
  transition: opacity 0.2s;
}

.bookLink:hover {
  opacity: 0.7;
}

.islandFull {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 16px;
  display: block;
  margin: 0 auto;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
}

.essayLink {
  text-align: center;
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.essayLink a {
  font-size: 0.9rem;
  color: rgba(45, 42, 38, 0.6);
  text-decoration: none;
  transition: color 0.2s;
}

.essayLink a:hover {
  color: #e8178a;
}
```

**Step 3: Verify changes**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/app/wonder/essay/quiz/result/steps/GoDeepStep.tsx src/app/wonder/essay/quiz/result/steps/GoDeepStep.module.css
git commit -m "feat(quiz): add Go Deeper step with blind spot, compatibility, books"
```

---

### Task 6: Create Create/Join Utopia Step

**Files:**
- Create: `src/app/wonder/essay/quiz/result/steps/CreateJoinStep.tsx`
- Create: `src/app/wonder/essay/quiz/result/steps/CreateJoinStep.module.css`

**Step 1: Create CreateJoinStep component**

Create `src/app/wonder/essay/quiz/result/steps/CreateJoinStep.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { archetypes } from "@/lib/archetypes";
import styles from "./CreateJoinStep.module.css";

// Suggested utopia names by archetype
const suggestedNames: Record<string, string> = {
  citizen: "The Commons",
  shaper: "The Workshop",
  architect: "The Assembly",
  presence: "The Clearing",
  swimmer: "The Deep End",
  rooted: "The Grove",
  conscience: "The Watchtower",
  embers: "The Archive",
  friction: "The Proving Ground",
  unbound: "The Threshold",
  alive: "The Sensation",
  mender: "The Repair Shop",
  cleareyed: "The Mirror",
  between: "The Liminal",
};

type CreateJoinStepProps = {
  archetypeKey: string;
  inviteSlug?: string | null; // If coming from invite link
};

export function CreateJoinStep({ archetypeKey, inviteSlug }: CreateJoinStepProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"choose" | "create">(inviteSlug ? "choose" : "choose");
  const [utopiaName, setUtopiaName] = useState(suggestedNames[archetypeKey] || "My Utopia");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const archetype = archetypes[archetypeKey];

  const handleCreate = async () => {
    setCreating(true);
    setError(null);

    try {
      const userId = localStorage.getItem("quiz-user-id");
      if (!userId) {
        setError("Please complete the quiz first.");
        setCreating(false);
        return;
      }

      const res = await fetch("/api/utopia/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: utopiaName, userId }),
      });

      const data = await res.json();
      if (data.slug) {
        router.push(`/wonder/essay/quiz/utopia/${data.slug}`);
      } else {
        setError(data.error || "Failed to create utopia");
      }
    } catch (e) {
      setError("Something went wrong. Please try again.");
    }

    setCreating(false);
  };

  const handleJoin = () => {
    if (inviteSlug) {
      router.push(`/wonder/essay/quiz/utopia/${inviteSlug}/join`);
    }
  };

  if (mode === "choose") {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>What happens next?</h2>

        <div className={styles.options}>
          <button className={styles.optionCard} onClick={() => setMode("create")}>
            <span className={styles.optionIcon}>🌍</span>
            <span className={styles.optionTitle}>Build a Utopia</span>
            <span className={styles.optionDesc}>
              Name it, become founder, invite others
            </span>
          </button>

          {inviteSlug && (
            <button className={styles.optionCard} onClick={handleJoin}>
              <span className={styles.optionIcon}>🤝</span>
              <span className={styles.optionTitle}>Join a Utopia</span>
              <span className={styles.optionDesc}>
                You've been invited to join
              </span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Name your utopia</h2>

      <div className={styles.createForm}>
        <input
          type="text"
          value={utopiaName}
          onChange={(e) => setUtopiaName(e.target.value)}
          className={styles.nameInput}
          placeholder="Enter a name..."
          maxLength={50}
        />

        <p className={styles.suggestion}>
          Suggested for a {archetype?.name}:
          <button
            className={styles.suggestionBtn}
            onClick={() => setUtopiaName(suggestedNames[archetypeKey] || "My Utopia")}
          >
            {suggestedNames[archetypeKey]}
          </button>
        </p>

        {error && <p className={styles.error}>{error}</p>}

        <button
          className={styles.createButton}
          onClick={handleCreate}
          disabled={creating || !utopiaName.trim()}
        >
          {creating ? "Creating..." : "Create Utopia"}
        </button>

        <button className={styles.backButton} onClick={() => setMode("choose")}>
          ← Back
        </button>
      </div>
    </div>
  );
}
```

**Step 2: Create CSS module**

Create `src/app/wonder/essay/quiz/result/steps/CreateJoinStep.module.css`:

```css
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  background: #faf6f1;
}

.title {
  font-size: 1.8rem;
  font-weight: 300;
  color: #2d2a26;
  margin-bottom: 40px;
  text-align: center;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 340px;
  width: 100%;
}

.optionCard {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.optionCard:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-color: #e8178a;
}

.optionIcon {
  font-size: 2rem;
}

.optionTitle {
  font-size: 1.1rem;
  font-weight: 500;
  color: #2d2a26;
}

.optionDesc {
  font-size: 0.9rem;
  color: rgba(45, 42, 38, 0.6);
}

.createForm {
  max-width: 340px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.nameInput {
  width: 100%;
  padding: 16px 20px;
  font-size: 1.1rem;
  font-family: inherit;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background: white;
  text-align: center;
  transition: border-color 0.2s;
}

.nameInput:focus {
  outline: none;
  border-color: #e8178a;
}

.suggestion {
  font-size: 0.85rem;
  color: rgba(45, 42, 38, 0.6);
}

.suggestionBtn {
  background: none;
  border: none;
  color: #e8178a;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
  margin-left: 4px;
}

.suggestionBtn:hover {
  opacity: 0.7;
}

.error {
  color: #d64545;
  font-size: 0.9rem;
}

.createButton {
  width: 100%;
  padding: 16px 28px;
  font-size: 1rem;
  font-weight: 500;
  background: #e8178a;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.createButton:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(232, 23, 138, 0.3);
}

.createButton:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.backButton {
  background: none;
  border: none;
  color: rgba(45, 42, 38, 0.6);
  font-size: 0.9rem;
  cursor: pointer;
  font-family: inherit;
  transition: color 0.2s;
}

.backButton:hover {
  color: #e8178a;
}
```

**Step 3: Verify changes**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/app/wonder/essay/quiz/result/steps/CreateJoinStep.tsx src/app/wonder/essay/quiz/result/steps/CreateJoinStep.module.css
git commit -m "feat(quiz): add Create/Join utopia step with suggested names"
```

---

### Task 7: Wire Up Journey Steps in Result Page

**Files:**
- Modify: `src/app/wonder/essay/quiz/result/page.tsx`
- Modify: `src/app/wonder/essay/quiz/result/ResultPageClient.tsx`

**Step 1: Update ResultPageClient to use JourneyContainer**

Edit `src/app/wonder/essay/quiz/result/ResultPageClient.tsx`:

```tsx
"use client";

import { useState, useCallback, ReactNode } from "react";
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
  children?: ReactNode;
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
  children,
}: ResultPageClientProps) {
  const [showReveal, setShowReveal] = useState(true);
  const [journeyStep, setJourneyStep] = useState(0);

  const handleRevealComplete = useCallback(() => {
    setShowReveal(false);
  }, []);

  const handleGoDeeper = useCallback(() => {
    setJourneyStep(2); // Go to Go Deeper step
  }, []);

  if (showReveal) {
    return (
      <RevealAnimation
        archetypeName={archetypeName}
        archetypeColor={archetypeColor}
        utopiaText={utopiaText}
        imageUrl={imageUrl}
        onComplete={handleRevealComplete}
      />
    );
  }

  const steps = [
    {
      id: "radar",
      component: <RadarExplainStep archetypeKey={archetypeKey} imageUrl={imageUrl} />,
    },
    {
      id: "card",
      component: (
        <CardStep
          archetypeKey={archetypeKey}
          imageUrl={imageUrl}
          onContinue={handleGoDeeper}
        />
      ),
    },
    {
      id: "deeper",
      component: (
        <GoDeepStep
          archetypeKey={archetypeKey}
          imageUrl={imageUrl}
          compatibility={compatibility}
          books={books}
          blindSpot={blindSpot}
        />
      ),
    },
    {
      id: "create",
      component: <CreateJoinStep archetypeKey={archetypeKey} />,
    },
  ];

  return (
    <>
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
          font-family: 'Satoshi', system-ui, sans-serif;
          font-size: 17px;
          line-height: 1.75;
          font-weight: 300;
        }
      `}</style>

      <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet" />

      <JourneyContainer steps={steps} initialStep={journeyStep} />
    </>
  );
}
```

**Step 2: Update page.tsx to pass additional props**

Edit the `QuizResultPage` component in `src/app/wonder/essay/quiz/result/page.tsx` to pass additional props:

Find the `<ResultPageClient>` usage and update it:

```tsx
<ResultPageClient
  archetypeName={data.name}
  archetypeKey={archetypeKey}
  archetypeColor={data.color}
  utopiaText={data.utopia}
  imageUrl={imageUrl}
  blindSpot={data.blindSpot}
  compatibility={data.compatibility}
  books={data.books}
>
  {/* Remove children - no longer using old layout */}
</ResultPageClient>
```

Also remove or comment out the old page content that was inside `<ResultPageClient>`.

**Step 3: Verify changes**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Test locally**

Run: `npm run dev`
Navigate to `/wonder/essay/quiz/result?a=swimmer`
Expected: See reveal animation, then journey steps with navigation

**Step 5: Commit**

```bash
git add src/app/wonder/essay/quiz/result/page.tsx src/app/wonder/essay/quiz/result/ResultPageClient.tsx
git commit -m "feat(quiz): wire up journey steps in result page"
```

---

## Phase 2: Group Radar

### Task 8: Create Animated Group Radar Step

**Files:**
- Create: `src/app/wonder/essay/quiz/utopia/[slug]/steps/GroupRadarStep.tsx`
- Create: `src/app/wonder/essay/quiz/utopia/[slug]/steps/GroupRadarStep.module.css`

**Step 1: Create GroupRadarStep component**

Create `src/app/wonder/essay/quiz/utopia/[slug]/steps/GroupRadarStep.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { RadarChart } from "@/components/RadarChart";
import { archetypePositions, getGroupCenterOfGravity } from "@/lib/radar-positions";
import { archetypes } from "@/lib/archetypes";
import type { UtopiaMember } from "@/lib/utopia";
import styles from "./GroupRadarStep.module.css";

type GroupRadarStepProps = {
  members: UtopiaMember[];
  utopiaName: string;
  onMemberClick: (memberId: string) => void;
  highlightMemberId?: string;
};

export function GroupRadarStep({
  members,
  utopiaName,
  onMemberClick,
  highlightMemberId,
}: GroupRadarStepProps) {
  const [visibleDots, setVisibleDots] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  // Animate dots appearing one by one
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    members.forEach((member, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleDots((prev) => [...prev, member.id]);
        }, i * 400)
      );
    });

    // Show summary after all dots
    timers.push(
      setTimeout(() => {
        setShowSummary(true);
      }, members.length * 400 + 500)
    );

    return () => timers.forEach(clearTimeout);
  }, [members]);

  const visibleMembers = members.filter((m) => visibleDots.includes(m.id));
  const positions = visibleMembers.map((m) => archetypePositions[m.archetype] || { x: 0, y: 0 });
  const centerOfGravity = positions.length > 1 ? getGroupCenterOfGravity(positions) : undefined;

  // Generate group summary
  const archetypeCounts: Record<string, number> = {};
  members.forEach((m) => {
    archetypeCounts[m.archetype] = (archetypeCounts[m.archetype] || 0) + 1;
  });

  const uniqueArchetypes = Object.keys(archetypeCounts).length;
  const missingQuadrants: string[] = [];

  // Check quadrant representation
  const hasTranscend = members.some((m) => (archetypePositions[m.archetype]?.y || 0) > 0.3);
  const hasRoot = members.some((m) => (archetypePositions[m.archetype]?.y || 0) < -0.3);
  const hasBuild = members.some((m) => (archetypePositions[m.archetype]?.x || 0) > 0.3);
  const hasWitness = members.some((m) => (archetypePositions[m.archetype]?.x || 0) < -0.3);

  if (!hasTranscend) missingQuadrants.push("Transcend");
  if (!hasRoot) missingQuadrants.push("Root");
  if (!hasBuild) missingQuadrants.push("Build");
  if (!hasWitness) missingQuadrants.push("Witness");

  let summaryText = `${uniqueArchetypes} worldview${uniqueArchetypes !== 1 ? "s" : ""}.`;
  if (missingQuadrants.length > 0 && missingQuadrants.length <= 2) {
    summaryText += ` No one's holding the ${missingQuadrants.join(" or ")}.`;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.label}>Your Utopia</span>
        <h1 className={styles.name}>{utopiaName}</h1>
        <span className={styles.count}>
          {members.length} {members.length === 1 ? "person" : "people"}
        </span>
      </div>

      <div className={styles.radarWrapper}>
        <RadarChart
          size={320}
          userDots={visibleMembers.map((m) => ({
            id: m.id,
            name: m.name || "Anonymous",
            position: archetypePositions[m.archetype] || { x: 0, y: 0 },
            color: archetypes[m.archetype]?.color || "#888",
            isYou: m.id === highlightMemberId,
          }))}
          centerOfGravity={centerOfGravity}
          showAllArchetypes={false}
        />

        {/* Clickable overlays for each member dot */}
        {visibleMembers.map((m) => {
          const pos = archetypePositions[m.archetype] || { x: 0, y: 0 };
          const cx = 160 + pos.x * 120; // Approximate position in 320px chart
          const cy = 160 - pos.y * 120;
          return (
            <button
              key={m.id}
              className={styles.dotOverlay}
              style={{ left: cx - 15, top: cy - 15 }}
              onClick={() => onMemberClick(m.id)}
              aria-label={`View relationship with ${m.name}`}
            />
          );
        })}
      </div>

      {showSummary && (
        <p className={styles.summary}>{summaryText}</p>
      )}

      <p className={styles.hint}>Tap a dot to see your relationship</p>
    </div>
  );
}
```

**Step 2: Create CSS module**

Create `src/app/wonder/essay/quiz/utopia/[slug]/steps/GroupRadarStep.module.css`:

```css
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  background: #0a0a0a;
  color: white;
  position: relative;
}

.header {
  text-align: center;
  margin-bottom: 32px;
}

.label {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #e8178a;
  display: block;
  margin-bottom: 8px;
}

.name {
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}

.count {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
}

.radarWrapper {
  position: relative;
}

.dotOverlay {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10;
}

.dotOverlay:hover {
  background: rgba(255, 255, 255, 0.1);
}

.summary {
  font-size: 1.1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-top: 24px;
  max-width: 400px;
  animation: fadeIn 0.6s ease forwards;
}

.hint {
  position: absolute;
  bottom: 48px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.05em;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Step 3: Verify changes**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/app/wonder/essay/quiz/utopia/[slug]/steps/GroupRadarStep.tsx src/app/wonder/essay/quiz/utopia/[slug]/steps/GroupRadarStep.module.css
git commit -m "feat(quiz): add animated group radar step"
```

---

### Task 9: Create Group Reading Step

**Files:**
- Create: `src/app/wonder/essay/quiz/utopia/[slug]/steps/GroupReadingStep.tsx`
- Create: `src/app/wonder/essay/quiz/utopia/[slug]/steps/GroupReadingStep.module.css`

**Step 1: Create GroupReadingStep component**

Create `src/app/wonder/essay/quiz/utopia/[slug]/steps/GroupReadingStep.tsx`:

```tsx
"use client";

import Link from "next/link";
import { archetypes, getMissingVoices, getSuperpowers, getGroupBook } from "@/lib/archetypes";
import { archetypePositions } from "@/lib/radar-positions";
import type { UtopiaMember } from "@/lib/utopia";
import styles from "./GroupReadingStep.module.css";

type GroupReadingStepProps = {
  members: UtopiaMember[];
};

export function GroupReadingStep({ members }: GroupReadingStepProps) {
  const archetypeKeys = members.map((m) => m.archetype);
  const uniqueKeys = [...new Set(archetypeKeys)];

  // Count archetypes for weighting
  const counts: Record<string, number> = {};
  archetypeKeys.forEach((k) => {
    counts[k] = (counts[k] || 0) + 1;
  });

  const superpowers = getSuperpowers(uniqueKeys, counts);
  const missingVoices = getMissingVoices(uniqueKeys, 3);
  const groupBook = getGroupBook(uniqueKeys, counts);

  // Generate blind spot based on what's overrepresented or missing
  let blindSpot = "";
  const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  if (sortedCounts.length > 0 && sortedCounts[0][1] >= 3) {
    const dominantKey = sortedCounts[0][0];
    blindSpot = `Heavy on ${archetypes[dominantKey]?.superpower || dominantKey}. Watch for groupthink.`;
  } else if (missingVoices.length > 0) {
    blindSpot = missingVoices[0].insight;
  } else {
    blindSpot = "Diverse perspectives. Stay curious about your differences.";
  }

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h3 className={styles.sectionLabel}>Your Strengths</h3>
        <div className={styles.strengthsCard}>
          {superpowers.length > 0 ? (
            <p className={styles.strengthsText}>
              {superpowers.join(". ")}.
            </p>
          ) : (
            <p className={styles.strengthsText}>A unique combination still taking shape.</p>
          )}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionLabel}>Your Blind Spot</h3>
        <div className={styles.blindSpotCard}>
          <p className={styles.blindSpotText}>{blindSpot}</p>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionLabel}>Missing Voices</h3>
        <div className={styles.missingList}>
          {missingVoices.map((voice) => (
            <div key={voice.key} className={styles.missingItem}>
              <Link
                href={`/wonder/essay/quiz/explore/#${voice.key}`}
                className={styles.missingName}
                style={{ color: voice.color }}
              >
                {voice.name}
              </Link>
              <p className={styles.missingInsight}>{voice.insight}</p>
            </div>
          ))}
        </div>
      </section>

      {groupBook && (
        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>Read Together</h3>
          <div className={styles.bookCard}>
            <p className={styles.bookTitle}>
              <span className={styles.bookTitleText}>{groupBook.title}</span>
              <span className={styles.bookAuthor}> ({groupBook.author})</span>
            </p>
            <a
              href={`https://bookshop.org/search?keywords=${encodeURIComponent(groupBook.title + ' ' + groupBook.author)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bookLink}
            >
              Find on Bookshop.org →
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
```

**Step 2: Create CSS module**

Create `src/app/wonder/essay/quiz/utopia/[slug]/steps/GroupReadingStep.module.css`:

```css
.container {
  min-height: 100vh;
  padding: 100px 24px 120px;
  background: #faf6f1;
  max-width: 600px;
  margin: 0 auto;
}

.section {
  margin-bottom: 40px;
}

.sectionLabel {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(45, 42, 38, 0.45);
  margin-bottom: 12px;
  text-align: center;
}

.strengthsCard,
.blindSpotCard,
.bookCard {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  text-align: center;
}

.strengthsText {
  font-size: 1.1rem;
  color: #2d2a26;
  line-height: 1.7;
  text-transform: capitalize;
}

.blindSpotCard {
  background: rgba(0, 0, 0, 0.03);
}

.blindSpotText {
  font-size: 1.05rem;
  font-style: italic;
  color: rgba(45, 42, 38, 0.8);
  line-height: 1.7;
}

.missingList {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.missingItem {
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.missingName {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none;
  transition: opacity 0.2s;
}

.missingName:hover {
  opacity: 0.7;
}

.missingInsight {
  font-size: 0.95rem;
  color: rgba(45, 42, 38, 0.7);
  margin-top: 4px;
  line-height: 1.6;
}

.bookTitle {
  font-size: 1rem;
  margin-bottom: 8px;
}

.bookTitleText {
  font-style: italic;
  color: #2d2a26;
}

.bookAuthor {
  color: rgba(45, 42, 38, 0.6);
}

.bookLink {
  font-size: 0.85rem;
  color: #e8178a;
  text-decoration: none;
  transition: opacity 0.2s;
}

.bookLink:hover {
  opacity: 0.7;
}
```

**Step 3: Verify changes**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/app/wonder/essay/quiz/utopia/[slug]/steps/GroupReadingStep.tsx src/app/wonder/essay/quiz/utopia/[slug]/steps/GroupReadingStep.module.css
git commit -m "feat(quiz): add group reading step with strengths, blind spots, missing voices"
```

---

## Phase 3: Relationships

### Task 10: Create Relationship View Step

**Files:**
- Create: `src/app/wonder/essay/quiz/utopia/[slug]/steps/RelationshipStep.tsx`
- Create: `src/app/wonder/essay/quiz/utopia/[slug]/steps/RelationshipStep.module.css`
- Modify: `src/lib/archetypes.ts` (add detailed pair dynamics)

**Step 1: Expand pair dynamics in archetypes.ts**

Add to `src/lib/archetypes.ts` after existing `pairDynamics`:

```typescript
// Detailed pair dynamics for relationship view
export type DetailedPairDynamic = {
  align: string[];
  clash: string[];
  give: string;
};

export const detailedPairDynamics: Record<string, DetailedPairDynamic> = {
  "embers+shaper": {
    align: ["You both care deeply about what gets built"],
    clash: ["One races forward, the other holds back"],
    give: "They remind you what you're building toward. You remind them what to carry forward.",
  },
  "rooted+shaper": {
    align: ["You both have strong convictions"],
    clash: ["One wants to tear it down. One wants to sit with it."],
    give: "They keep you grounded. You keep them moving.",
  },
  "citizen+conscience": {
    align: ["You both believe in good systems"],
    clash: ["One trusts the architecture. One tests it for cracks."],
    give: "They keep you honest. You keep them hopeful.",
  },
  "presence+unbound": {
    align: ["You both seek truth beyond the surface"],
    clash: ["One stays embodied. One wants to transcend."],
    give: "They remind you of what's here. You remind them of what's possible.",
  },
  "mender+swimmer": {
    align: ["You both see what needs attention"],
    clash: ["One acts. One questions."],
    give: "They push you to decide. You help them understand why.",
  },
  "shaper+swimmer": {
    align: ["You both reject easy answers"],
    clash: ["One builds. One questions."],
    give: "They make you examine your creations. You make them bring ideas to life.",
  },
  // Add more as needed...
};

// Helper to get detailed pair dynamic
export function getDetailedPairDynamic(a: string, b: string): DetailedPairDynamic | null {
  const key = [a, b].sort().join("+");
  return detailedPairDynamics[key] || null;
}

// Generate a fallback dynamic based on archetype positions
export function generateFallbackDynamic(a: string, b: string): DetailedPairDynamic {
  const posA = archetypePositions[a];
  const posB = archetypePositions[b];
  const archA = archetypes[a];
  const archB = archetypes[b];

  // Calculate distance and angle
  const dx = (posB?.x || 0) - (posA?.x || 0);
  const dy = (posB?.y || 0) - (posA?.y || 0);
  const distance = Math.sqrt(dx * dx + dy * dy);

  let align: string[];
  let clash: string[];
  let give: string;

  if (distance < 0.4) {
    // Close together - similar worldviews
    align = ["You see the world similarly", "Shared values come naturally"];
    clash = ["You might reinforce each other's blind spots"];
    give = "Comfort in being understood. The risk of an echo chamber.";
  } else if (distance > 1.0) {
    // Far apart - opposite worldviews
    align = ["You cover each other's blind spots"];
    clash = ["Your instincts pull in opposite directions", "What feels obvious to you puzzles them"];
    give = `They bring ${archB?.superpower || "their perspective"}. You bring ${archA?.superpower || "yours"}.`;
  } else {
    // Medium distance
    align = ["Different approaches to similar questions"];
    clash = ["Your methods differ even when your goals align"];
    give = `Together, you see more than either would alone.`;
  }

  return { align, clash, give };
}
```

**Step 2: Create RelationshipStep component**

Create `src/app/wonder/essay/quiz/utopia/[slug]/steps/RelationshipStep.tsx`:

```tsx
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
  onBack: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
};

export function RelationshipStep({
  you,
  them,
  onBack,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: RelationshipStepProps) {
  const yourArchetype = archetypes[you.archetype];
  const theirArchetype = archetypes[them.archetype];

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
        {/* Line between dots would be drawn in SVG */}
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
```

**Step 3: Create CSS module**

Create `src/app/wonder/essay/quiz/utopia/[slug]/steps/RelationshipStep.module.css`:

```css
.container {
  min-height: 100vh;
  padding: 80px 24px;
  background: #0a0a0a;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.backButton {
  position: absolute;
  top: 24px;
  left: 24px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  cursor: pointer;
  font-family: inherit;
  transition: color 0.2s;
}

.backButton:hover {
  color: white;
}

.header {
  text-align: center;
  margin-bottom: 24px;
}

.title {
  font-size: 1.8rem;
  font-weight: 300;
  margin-bottom: 4px;
}

.subtitle {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
}

.radarWrapper {
  margin-bottom: 32px;
}

.reading {
  max-width: 400px;
  width: 100%;
}

.section {
  margin-bottom: 28px;
}

.sectionLabel {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 12px;
}

.bulletList {
  list-style: none;
  padding: 0;
}

.bulletList li {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  padding-left: 16px;
  position: relative;
  margin-bottom: 8px;
}

.bulletList li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #e8178a;
}

.giveText {
  font-size: 1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
}

.swipeNav {
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 16px;
}

.swipeHint {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
}

.swipeButton {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
}

.swipeButton:hover:not(:disabled) {
  border-color: #e8178a;
  background: rgba(232, 23, 138, 0.1);
}

.swipeButton:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
```

**Step 4: Verify changes**

Run: `npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/lib/archetypes.ts src/app/wonder/essay/quiz/utopia/[slug]/steps/RelationshipStep.tsx src/app/wonder/essay/quiz/utopia/[slug]/steps/RelationshipStep.module.css
git commit -m "feat(quiz): add relationship view step with pair dynamics"
```

---

### Task 11: Create Enhanced Pair Utopia View

**Files:**
- Modify: `src/app/wonder/essay/quiz/utopia/[slug]/TwoPersonView.tsx`
- Modify: `src/app/wonder/essay/quiz/utopia/[slug]/TwoPersonView.module.css`

**Step 1: Enhance TwoPersonView component**

Update `src/app/wonder/essay/quiz/utopia/[slug]/TwoPersonView.tsx` to use the new detailed pair dynamics:

```tsx
"use client";

import Link from "next/link";
import { RadarChart } from "@/components/RadarChart";
import { archetypePositions, getGroupCenterOfGravity } from "@/lib/radar-positions";
import {
  archetypes,
  getDetailedPairDynamic,
  generateFallbackDynamic,
  getGroupBook,
} from "@/lib/archetypes";
import type { UtopiaMember } from "@/lib/utopia";
import styles from "./TwoPersonView.module.css";

type TwoPersonViewProps = {
  members: UtopiaMember[];
  utopiaName: string;
};

export function TwoPersonView({ members, utopiaName }: TwoPersonViewProps) {
  if (members.length !== 2) return null;

  const [personA, personB] = members;
  const archA = archetypes[personA.archetype];
  const archB = archetypes[personB.archetype];

  const dynamic =
    getDetailedPairDynamic(personA.archetype, personB.archetype) ||
    generateFallbackDynamic(personA.archetype, personB.archetype);

  const book = getGroupBook([personA.archetype, personB.archetype]);

  const userDots = members.map((m) => ({
    id: m.id,
    name: m.name || "Anonymous",
    position: archetypePositions[m.archetype] || { x: 0, y: 0 },
    color: archetypes[m.archetype]?.color || "#888",
  }));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.label}>A Utopia of Two</span>
        <h2 className={styles.names}>
          <span style={{ color: archA?.color }}>{archA?.name?.split(" ")[0]}</span>
          {" × "}
          <span style={{ color: archB?.color }}>{archB?.name?.split(" ")[0]}</span>
        </h2>
        <p className={styles.people}>
          {personA.name || "Anonymous"} & {personB.name || "Anonymous"}
        </p>
      </div>

      <div className={styles.radar}>
        <RadarChart
          size={280}
          userDots={userDots}
          centerOfGravity={getGroupCenterOfGravity(
            userDots.map((d) => d.position)
          )}
          showAllArchetypes={false}
        />
      </div>

      <div className={styles.reading}>
        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>Where you align</h3>
          <ul className={styles.list}>
            {dynamic.align.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>Where you'll clash</h3>
          <ul className={styles.list}>
            {dynamic.clash.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>What you give each other</h3>
          <p className={styles.giveText}>{dynamic.give}</p>
        </section>

        {/* What this pair needs */}
        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>What this pair needs</h3>
          <p className={styles.needText}>
            Someone to challenge both of you. A third perspective to break the loop.
          </p>
        </section>

        {/* Book for both */}
        {book && (
          <section className={styles.section}>
            <h3 className={styles.sectionLabel}>A book for both of you</h3>
            <div className={styles.bookCard}>
              <span className={styles.bookTitle}>{book.title}</span>
              <span className={styles.bookAuthor}> ({book.author})</span>
              <a
                href={`https://bookshop.org/search?keywords=${encodeURIComponent(book.title + ' ' + book.author)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bookLink}
              >
                Find on Bookshop.org →
              </a>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Update CSS module**

Update `src/app/wonder/essay/quiz/utopia/[slug]/TwoPersonView.module.css`:

```css
.container {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

.header {
  text-align: center;
  margin-bottom: 24px;
}

.label {
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #e8178a;
  display: block;
  margin-bottom: 8px;
}

.names {
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  margin-bottom: 4px;
}

.people {
  font-size: 0.9rem;
  color: rgba(45, 42, 38, 0.6);
}

.radar {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
}

.reading {
  max-width: 400px;
  margin: 0 auto;
}

.section {
  margin-bottom: 24px;
}

.sectionLabel {
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(45, 42, 38, 0.45);
  margin-bottom: 8px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list li {
  font-size: 0.95rem;
  color: rgba(45, 42, 38, 0.8);
  line-height: 1.6;
  padding-left: 16px;
  position: relative;
  margin-bottom: 6px;
}

.list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #e8178a;
}

.giveText,
.needText {
  font-size: 0.95rem;
  font-style: italic;
  color: rgba(45, 42, 38, 0.8);
  line-height: 1.7;
}

.bookCard {
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  padding: 16px;
}

.bookTitle {
  font-style: italic;
  color: #2d2a26;
}

.bookAuthor {
  color: rgba(45, 42, 38, 0.6);
}

.bookLink {
  display: block;
  margin-top: 8px;
  font-size: 0.85rem;
  color: #e8178a;
  text-decoration: none;
  transition: opacity 0.2s;
}

.bookLink:hover {
  opacity: 0.7;
}
```

**Step 3: Verify changes**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add src/app/wonder/essay/quiz/utopia/[slug]/TwoPersonView.tsx src/app/wonder/essay/quiz/utopia/[slug]/TwoPersonView.module.css
git commit -m "feat(quiz): enhance pair utopia view with detailed dynamics"
```

---

## Phase 4: Polish

### Task 12: Add More Pair Dynamics Data

**Files:**
- Modify: `src/lib/archetypes.ts`

This task involves adding detailed pair dynamics for more archetype combinations. The data structure is already in place from Task 10.

**Step 1: Add more pair dynamics**

Add to the `detailedPairDynamics` object in `src/lib/archetypes.ts`. For the 91 combinations, prioritize the most common/interesting pairings:

```typescript
// Add these to detailedPairDynamics
"alive+conscience": {
  align: ["You both feel things deeply"],
  clash: ["One wants to feel. One wants to watch."],
  give: "They keep you grounded. You remind them to live.",
},
"architect+swimmer": {
  align: ["You both care about getting it right"],
  clash: ["One builds systems. One questions them."],
  give: "They push you to structure your questions. You keep their systems honest.",
},
"citizen+shaper": {
  align: ["You both believe in what's possible"],
  clash: ["One trusts the system. One wants to rebuild it."],
  give: "They bring stability. You bring change.",
},
"embers+presence": {
  align: ["You both value what endures"],
  clash: ["One looks back. One stays present."],
  give: "They remind you where you came from. You remind them where you are.",
},
"friction+unbound": {
  align: ["You both reject easy comfort"],
  clash: ["One craves resistance. One transcends it."],
  give: "They ground your transcendence. You expand their friction.",
},
"alive+rooted": {
  align: ["You both know what matters"],
  clash: ["One moves constantly. One stays still."],
  give: "They slow you down. You wake them up.",
},
"cleareyed+presence": {
  align: ["You both see what's really there"],
  clash: ["One speaks the truth. One holds the space."],
  give: "They make space for your truth. You help them speak it.",
},
"architect+mender": {
  align: ["You both think in systems"],
  clash: ["One designs new. One fixes old."],
  give: "They repair what you build. You give their repairs a home.",
},
"conscience+embers": {
  align: ["You both guard what matters"],
  clash: ["One watches the present. One guards the past."],
  give: "They remember why you watch. You help them watch what happens now.",
},
"between+cleareyed": {
  align: ["You both live with uncertainty"],
  clash: ["One sees clearly. One is still looking."],
  give: "They help you see. You remind them that seeing isn't everything.",
},
// Continue adding more combinations...
```

**Step 2: Verify changes**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/lib/archetypes.ts
git commit -m "feat(quiz): add detailed pair dynamics for more archetype combinations"
```

---

### Task 13: Final Integration and Testing

**Files:**
- Modify: `src/app/wonder/essay/quiz/utopia/[slug]/page.tsx`

**Step 1: Wire up group journey steps**

Update the utopia page to use the new group journey components (GroupRadarStep, GroupReadingStep, RelationshipStep) with the JourneyContainer.

This is a larger integration task - the page should:
1. Show GroupRadarStep as the main view
2. Allow scrolling to GroupReadingStep
3. Handle tap on member dot to show RelationshipStep
4. Support back navigation to return to group view

**Step 2: Test all flows**

Run: `npm run dev`

Test cases:
1. Complete quiz → See reveal → Navigate through journey steps
2. Create utopia → See group radar with single dot
3. Invite someone → They see inviter card → Complete quiz → Join animation
4. Two-person utopia → See enhanced pair view
5. 3+ person utopia → See group radar with animated dots → Tap to see relationships

**Step 3: Build and verify**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat(quiz): complete utopia journey redesign integration"
```

---

## Success Criteria Checklist

- [ ] Every step works as a standalone screenshot
- [ ] The radar becomes intuitive after one viewing
- [ ] Pair dynamics feel specific, insightful, personal
- [ ] Group readings feel like analysis, not just a list
- [ ] The journey can be completed in under 2 minutes
- [ ] Each share drives curiosity to take the quiz

---

## Data Requirements Summary

**Completed:**
- Quadrant descriptions for each area of the radar
- Position one-liners for each archetype's radar position
- Axis labels with descriptions

**Needs expansion:**
- Pair dynamics for all 91 archetype combinations (14 choose 2 + 14 same-pairs)
- Current: ~20 detailed, rest use fallback generation

---

## Notes for Implementer

1. **Start with Phase 1** - Get the individual journey working first
2. **Test on mobile** - Most users will be on phones (Instagram Stories)
3. **Dark/light modes** - Reveal and radar steps are dark, others are light
4. **Animations** - Keep subtle, purposeful. Use CSS transitions first.
5. **Share functionality** - Native share API with clipboard fallback
6. **Navigation** - Arrow keys, tap, swipe all should work
