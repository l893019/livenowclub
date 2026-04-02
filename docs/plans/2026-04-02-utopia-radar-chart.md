# Utopia Radar Chart Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add radar chart visualization to utopia quiz showing archetype positions, individual dot placement, and group center of gravity.

**Architecture:** Radar chart component using canvas/SVG, archetype coordinates as data, weighted dot positioning from quiz scores.

**Tech Stack:** Next.js, React, TypeScript, CSS animations

---

## Phase 1: Dramatic Individual Reveal

**Files:**
- Create: `src/app/wonder/essay/quiz/result/RevealAnimation.tsx`
- Create: `src/app/wonder/essay/quiz/result/RevealAnimation.module.css`
- Modify: `src/app/wonder/essay/quiz/result/page.tsx`

### Task 1.1: Create RevealAnimation Component

```typescript
// src/app/wonder/essay/quiz/result/RevealAnimation.tsx
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
  const [phase, setPhase] = useState<"name" | "image" | "text" | "done">("name");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("image"), 1500),
      setTimeout(() => setPhase("text"), 3000),
      setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div className={styles.overlay}>
      <div className={`${styles.name} ${phase !== "name" ? styles.nameUp : ""}`}>
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

      <button className={styles.skip} onClick={onComplete}>
        Skip
      </button>
    </div>
  );
}
```

### Task 1.2: Create RevealAnimation Styles

```css
/* src/app/wonder/essay/quiz/result/RevealAnimation.module.css */

.overlay {
  position: fixed;
  inset: 0;
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.name {
  font-size: clamp(1.8rem, 6vw, 3rem);
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  opacity: 0;
  animation: fadeIn 1s ease forwards;
  transition: transform 0.8s ease, font-size 0.8s ease;
}

.nameUp {
  transform: translateY(-30vh);
  font-size: clamp(1.2rem, 3vw, 1.5rem);
}

.image {
  width: 280px;
  height: 280px;
  object-fit: contain;
  opacity: 0;
  animation: fadeIn 1s ease forwards;
  transition: transform 0.8s ease, width 0.8s ease, height 0.8s ease;
}

.imageShrink {
  transform: translateY(-10vh);
  width: 200px;
  height: 200px;
}

.utopia {
  font-size: 1.3rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  max-width: 400px;
  padding: 0 24px;
  opacity: 0;
  animation: fadeIn 1s ease forwards;
  line-height: 1.6;
}

.skip {
  position: absolute;
  bottom: 40px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  padding: 12px 24px;
}

.skip:hover {
  color: rgba(255, 255, 255, 0.7);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Task 1.3: Integrate Reveal into Result Page

Modify `src/app/wonder/essay/quiz/result/page.tsx` to show RevealAnimation before the main content. Add state to track if reveal is complete. Pass archetype data to the reveal component.

---

## Phase 2: Radar Chart Component

**Files:**
- Create: `src/lib/radar-positions.ts`
- Create: `src/components/RadarChart.tsx`
- Create: `src/components/RadarChart.module.css`

### Task 2.1: Create Radar Positions Data

```typescript
// src/lib/radar-positions.ts

// X axis: -1 (Witness) to +1 (Build)
// Y axis: -1 (Root) to +1 (Transcend)
// Radius from center = conviction/commitment

export type RadarPosition = {
  x: number;
  y: number;
};

export const archetypePositions: Record<string, RadarPosition> = {
  citizen:    { x:  0.4, y:  0.3 },  // moderate build, moderate transcend
  shaper:     { x:  0.7, y:  0.4 },  // strong build, moderate transcend
  architect:  { x:  0.5, y: -0.3 },  // strong build, moderate root
  presence:   { x: -0.2, y: -0.2 },  // inner ring, slight witness, slight root
  swimmer:    { x: -0.5, y:  0.5 },  // moderate witness, moderate transcend
  rooted:     { x: -0.3, y: -0.7 },  // slight witness, strong root
  conscience: { x: -0.7, y: -0.2 },  // strong witness, slight root, outer ring
  embers:     { x: -0.5, y: -0.6 },  // moderate witness, strong root
  friction:   { x:  0.6, y:  0.5 },  // strong build, moderate transcend
  unbound:    { x:  0.3, y:  0.8 },  // slight build, strong transcend, outer ring
  alive:      { x:  0.2, y:  0.6 },  // slight build, moderate transcend
  mender:     { x:  0.3, y: -0.3 },  // inner ring, slight build, slight root
  cleareyed:  { x: -0.7, y:  0.1 },  // strong witness, slight transcend, outer ring
  between:    { x:  0.0, y:  0.0 },  // center
};

// Calculate weighted position from top 2 archetype scores
export function calculateDotPosition(
  scores: Record<string, number>
): RadarPosition {
  // Get top 2 scores
  const sorted = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2);

  if (sorted.length === 0) return { x: 0, y: 0 };
  if (sorted.length === 1) {
    const pos = archetypePositions[sorted[0][0]];
    return pos || { x: 0, y: 0 };
  }

  const [primary, secondary] = sorted;
  const [primaryKey, primaryScore] = primary;
  const [secondaryKey, secondaryScore] = secondary;

  const primaryPos = archetypePositions[primaryKey] || { x: 0, y: 0 };
  const secondaryPos = archetypePositions[secondaryKey] || { x: 0, y: 0 };

  const totalScore = primaryScore + secondaryScore;

  return {
    x: (primaryScore * primaryPos.x + secondaryScore * secondaryPos.x) / totalScore,
    y: (primaryScore * primaryPos.y + secondaryScore * secondaryPos.y) / totalScore,
  };
}

// Calculate center of gravity for a group
export function calculateCenterOfGravity(
  memberPositions: RadarPosition[]
): RadarPosition {
  if (memberPositions.length === 0) return { x: 0, y: 0 };

  const sum = memberPositions.reduce(
    (acc, pos) => ({ x: acc.x + pos.x, y: acc.y + pos.y }),
    { x: 0, y: 0 }
  );

  return {
    x: sum.x / memberPositions.length,
    y: sum.y / memberPositions.length,
  };
}

// Get quadrant label
export function getQuadrant(pos: RadarPosition): string {
  const { x, y } = pos;

  if (Math.abs(x) < 0.15 && Math.abs(y) < 0.15) {
    return "Center";
  }

  const horizontal = x > 0.15 ? "Build" : x < -0.15 ? "Witness" : "";
  const vertical = y > 0.15 ? "Transcend" : y < -0.15 ? "Root" : "";

  if (horizontal && vertical) {
    return `${vertical} + ${horizontal}`;
  }
  return horizontal || vertical || "Center";
}
```

### Task 2.2: Create RadarChart Component

```typescript
// src/components/RadarChart.tsx
"use client";

import { useMemo } from "react";
import { archetypes } from "@/lib/archetypes";
import { archetypePositions, type RadarPosition } from "@/lib/radar-positions";
import styles from "./RadarChart.module.css";

type Dot = {
  id: string;
  name: string;
  archetype: string;
  position: RadarPosition;
  isYou?: boolean;
};

type RadarChartProps = {
  dots: Dot[];
  centerOfGravity?: RadarPosition;
  size?: number;
  showLabels?: boolean;
  onDotClick?: (dot: Dot) => void;
};

export function RadarChart({
  dots,
  centerOfGravity,
  size = 300,
  showLabels = true,
  onDotClick,
}: RadarChartProps) {
  const center = size / 2;
  const radius = (size / 2) - 40; // padding for labels

  // Convert normalized coords (-1 to 1) to SVG coords
  const toSvg = (pos: RadarPosition) => ({
    x: center + pos.x * radius,
    y: center - pos.y * radius, // flip Y for SVG
  });

  return (
    <div className={styles.container} style={{ width: size, height: size }}>
      <svg width={size} height={size} className={styles.svg}>
        {/* Background circles */}
        <circle cx={center} cy={center} r={radius} className={styles.ring} />
        <circle cx={center} cy={center} r={radius * 0.66} className={styles.ring} />
        <circle cx={center} cy={center} r={radius * 0.33} className={styles.ring} />

        {/* Axes */}
        <line x1={center} y1={40} x2={center} y2={size - 40} className={styles.axis} />
        <line x1={40} y1={center} x2={size - 40} y2={center} className={styles.axis} />

        {/* Axis labels */}
        {showLabels && (
          <>
            <text x={center} y={20} className={styles.label}>TRANSCEND</text>
            <text x={center} y={size - 8} className={styles.label}>ROOT</text>
            <text x={12} y={center} className={styles.labelVertical}>WITNESS</text>
            <text x={size - 12} y={center} className={styles.labelVertical}>BUILD</text>
          </>
        )}

        {/* Center of gravity */}
        {centerOfGravity && (
          <circle
            cx={toSvg(centerOfGravity).x}
            cy={toSvg(centerOfGravity).y}
            r={8}
            className={styles.centerOfGravity}
          />
        )}

        {/* Member dots */}
        {dots.map((dot) => {
          const pos = toSvg(dot.position);
          const color = archetypes[dot.archetype]?.color || "#666";
          return (
            <g key={dot.id} onClick={() => onDotClick?.(dot)} style={{ cursor: onDotClick ? "pointer" : "default" }}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={dot.isYou ? 10 : 7}
                fill={color}
                className={dot.isYou ? styles.dotYou : styles.dot}
              />
              {dot.isYou && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={14}
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                  opacity={0.5}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
```

### Task 2.3: Create RadarChart Styles

```css
/* src/components/RadarChart.module.css */

.container {
  position: relative;
  margin: 0 auto;
}

.svg {
  display: block;
}

.ring {
  fill: none;
  stroke: rgba(45, 42, 38, 0.1);
  stroke-width: 1;
}

.axis {
  stroke: rgba(45, 42, 38, 0.15);
  stroke-width: 1;
  stroke-dasharray: 4 4;
}

.label {
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  fill: rgba(45, 42, 38, 0.4);
  text-anchor: middle;
}

.labelVertical {
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  fill: rgba(45, 42, 38, 0.4);
  text-anchor: middle;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  transform-origin: center;
}

.dot {
  transition: r 0.2s ease;
}

.dot:hover {
  r: 10;
}

.dotYou {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.centerOfGravity {
  fill: none;
  stroke: #e8178a;
  stroke-width: 2;
  stroke-dasharray: 4 4;
}
```

---

## Phase 3: Radar on Individual Result Page

**Files:**
- Modify: `src/app/wonder/essay/quiz/result/page.tsx`

### Task 3.1: Add Radar Chart to Individual Result

After the archetype description section, add the radar chart showing just the user's dot. Include a section explaining their quadrant position.

```tsx
<section className="radar-section">
  <h3 className="section-label">Your Position</h3>
  <RadarChart
    dots={[{
      id: "you",
      name: userName,
      archetype: result.archetype,
      position: calculateDotPosition(result.scores),
      isYou: true,
    }]}
    size={280}
  />
  <p className="quadrant-text">
    You're in the {getQuadrant(calculateDotPosition(result.scores))} quadrant.
    {/* Add quadrant description */}
  </p>
</section>
```

---

## Phase 4: Radar on Group Page

**Files:**
- Modify: `src/app/wonder/essay/quiz/utopia/[slug]/page.tsx`
- Modify: `src/app/wonder/essay/quiz/utopia/[slug]/UtopiaCards.tsx`

### Task 4.1: Add Radar Chart Above Planet Carousel

In the group page, add the RadarChart component above the existing planet visualization. Show all member dots and the center of gravity.

```tsx
<section className="radar-section">
  <h2 className="section-title">Your Group</h2>
  <RadarChart
    dots={members.map(m => ({
      id: m.id,
      name: m.name,
      archetype: m.archetype,
      position: calculateDotPosition(m.scores || { [m.archetype]: 100 }),
      isYou: m.id === currentUserId,
    }))}
    centerOfGravity={calculateCenterOfGravity(memberPositions)}
    size={320}
    onDotClick={(dot) => scrollToMemberCard(dot.id)}
  />

  <div className="group-analysis">
    <p className="center-of-gravity">
      <span className="label">Center of Gravity:</span>
      {getQuadrant(centerOfGravity)}
    </p>
    <p className="strongest-quadrant">
      <span className="label">Strongest Quadrant:</span>
      {/* Calculate from member positions */}
    </p>
    <p className="empty-quadrant">
      <span className="label">Empty Quadrant:</span>
      {/* Calculate missing quadrants */}
    </p>
  </div>
</section>
```

### Task 4.2: Store Quiz Scores in Database

Currently we only store the primary archetype. To calculate weighted dot positions, we need to store the full scores object. Update the save-result API to include scores.

---

## Phase 5: Join Animation

**Files:**
- Create: `src/app/wonder/essay/quiz/utopia/[slug]/JoinAnimation.tsx`
- Modify: `src/app/wonder/essay/quiz/utopia/[slug]/join/page.tsx`

### Task 5.1: Create Join Animation Component

Animate the user's dot appearing on the radar chart and the center of gravity shifting.

```typescript
// Animate from old center of gravity to new
// Use requestAnimationFrame or CSS transitions
// Show the dot appearing with a scale-up animation
// Shift the center of gravity marker smoothly
```

---

## Phase 6: Two-Person Layout

**Files:**
- Create: `src/app/wonder/essay/quiz/utopia/[slug]/TwoPersonView.tsx`
- Modify: `src/app/wonder/essay/quiz/utopia/[slug]/page.tsx`

### Task 6.1: Create Two-Person Special View

When group has exactly 2 members, show:
- Radar chart with 2 dots and a line between them
- "ARCHETYPE × ARCHETYPE" header
- Where you align analysis
- Where you clash analysis
- What you need together

---

## Phase 7: Dashboard with Mini Charts

**Files:**
- Create: `src/components/MiniRadarChart.tsx`
- Modify: `src/app/wonder/essay/quiz/my-utopias/page.tsx`

### Task 7.1: Create Mini Radar Chart

Simplified version of RadarChart for dashboard thumbnails. No labels, smaller size, just dots.

---

## Archetype Coordinates Reference

| Archetype | Key | X | Y | Quadrant |
|-----------|-----|---|---|----------|
| Citizen of Abundance | citizen | 0.4 | 0.3 | Build + Transcend |
| Shaper of Change | shaper | 0.7 | 0.4 | Build + Transcend |
| Architect of the Commons | architect | 0.5 | -0.3 | Build + Root |
| Keeper of Presence | presence | -0.2 | -0.2 | Inner ring |
| Swimmer in Deep Water | swimmer | -0.5 | 0.5 | Witness + Transcend |
| Rooted in Stillness | rooted | -0.3 | -0.7 | Witness + Root |
| Conscience Before Comfort | conscience | -0.7 | -0.2 | Witness (outer) |
| Keeper of Embers | embers | -0.5 | -0.6 | Witness + Root |
| Alive in the Friction | friction | 0.6 | 0.5 | Build + Transcend |
| Unbound from Form | unbound | 0.3 | 0.8 | Transcend (outer) |
| Alive to Everything | alive | 0.2 | 0.6 | Transcend |
| Mender of What Remains | mender | 0.3 | -0.3 | Inner ring |
| Clear-Eyed in the Storm | cleareyed | -0.7 | 0.1 | Witness (outer) |
| In the Space Between | between | 0.0 | 0.0 | Center |

---

## Success Criteria

1. Individual reveal feels dramatic and memorable
2. Radar chart clearly shows quadrant positions
3. Dot positions reflect weighted archetype scores
4. Group center of gravity updates when members join
5. Two-person view feels like relationship analysis
6. Dashboard gives instant visual summary of each utopia
