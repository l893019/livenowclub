# Utopia Cards Rebuild Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the utopia cards with handcrafted content, Embla carousel, and clean architecture.

**Architecture:** Three layers — data (`archetypes.ts`), interaction (`useCarousel.ts` wrapping Embla), presentation (focused components with CSS module).

**Tech Stack:** Next.js 16, React, TypeScript, Embla Carousel, CSS Modules

---

## Task 1: Install Embla Carousel

**Files:**
- Modify: `package.json`

**Step 1: Install dependency**

```bash
cd /Users/louiseireland/Projects/livenowclub && pnpm add embla-carousel-react
```

**Step 2: Verify installation**

```bash
pnpm list embla-carousel-react
```

Expected: `embla-carousel-react` appears in output

**Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add embla-carousel-react"
```

---

## Task 2: Create Archetypes Data Module

**Files:**
- Create: `src/lib/archetypes.ts`

**Step 1: Create the archetypes data file**

```typescript
// src/lib/archetypes.ts

export type Book = {
  title: string;
  author: string;
};

export type Archetype = {
  key: string;
  name: string;
  color: string;
  utopia: string;
  description: string;
  blindSpot: string;
  superpower: string;
  book: Book;
};

export const archetypes: Record<string, Archetype> = {
  citizen: {
    key: "citizen",
    name: "Citizen of Abundance",
    color: "#3db9a4",
    utopia: "Their utopia has no word for \"job.\" It fell out of the language three centuries ago.",
    description: "They trust that intelligence, properly distributed, tends toward good. Too much freedom will always be preferable to too little.",
    blindSpot: "They sometimes mistake access for equity. Everyone having options is not the same as everyone being free.",
    superpower: "trusting abundance",
    book: { title: "The Player of Games", author: "Banks" },
  },
  shaper: {
    key: "shaper",
    name: "Shaper of Change",
    color: "#f4a03f",
    utopia: "Their utopia is never finished. Everything is always changing.",
    description: "The moment you stop adapting, you start calcifying. The future is something you build with whatever is at hand, including the wreckage.",
    blindSpot: "They sometimes mistake movement for progress. Tearing something down can be its own form of running away.",
    superpower: "building from scratch",
    book: { title: "Parable of the Sower", author: "Butler" },
  },
  architect: {
    key: "architect",
    name: "Architect of the Commons",
    color: "#9b8fef",
    utopia: "Their utopia belongs to everyone and answers to no one.",
    description: "They'd rather build something imperfect and collectively owned than something elegant and controlled by a few.",
    blindSpot: "They can love the system more than the people inside it. The meeting can become more important than what the meeting was for.",
    superpower: "thinking in systems",
    book: { title: "The Dispossessed", author: "Le Guin" },
  },
  presence: {
    key: "presence",
    name: "Keeper of Presence",
    color: "#e8178a",
    utopia: "Their utopia decided that undivided attention is the most valuable thing in the universe.",
    description: "They know the difference between capability and care, and they've never confused the two.",
    blindSpot: "They sometimes use care as a way to avoid confrontation. Staying in the room is not always the brave choice.",
    superpower: "showing up fully",
    book: { title: "Klara and the Sun", author: "Ishiguro" },
  },
  swimmer: {
    key: "swimmer",
    name: "Swimmer in Deep Water",
    color: "#6b8fef",
    utopia: "Their utopia is a civilization of philosophers whose single ambition is the deepest level of questioning.",
    description: "Most people see a problem and want to solve it. They see a question and want to live inside it.",
    blindSpot: "They can sit with a question so long it becomes an excuse to never act. Not-knowing can become its own cowardice.",
    superpower: "sitting with hard questions",
    book: { title: "Solaris", author: "Lem" },
  },
  rooted: {
    key: "rooted",
    name: "Rooted in Stillness",
    color: "#7ed6a4",
    utopia: "Their utopia returned to a simpler way of life, on purpose, knowing what it gave up.",
    description: "The most radical thing you can do in a world optimized for output is to stop, and mean it.",
    blindSpot: "Their stillness can look like withdrawal to the people who need them. Choosing to stop is a luxury not everyone can afford.",
    superpower: "knowing when to stop",
    book: { title: "A Psalm for the Wild-Built", author: "Chambers" },
  },
  conscience: {
    key: "conscience",
    name: "Conscience Before Comfort",
    color: "#d64545",
    utopia: "Their utopia built accountability into the architecture. Every leader's decisions are projected onto the sky.",
    description: "They see what others prefer to ignore. Someone has to watch the watchers.",
    blindSpot: "They can become so focused on what's wrong that they forget to notice what's working. Permanent suspicion is its own kind of prison.",
    superpower: "spotting what's hidden",
    book: { title: "1984", author: "Orwell" },
  },
  embers: {
    key: "embers",
    name: "Keeper of Embers",
    color: "#c97d3a",
    utopia: "Their utopia's most protected resource is not water or energy. It's memory.",
    description: "The most dangerous thing about acceleration is amnesia. The answers aren't in the next technology—they're in the last ten thousand years.",
    blindSpot: "They can love what was so deeply that they become hostile to what could be. The archive becomes a fortress.",
    superpower: "remembering what matters",
    book: { title: "A Canticle for Leibowitz", author: "Miller" },
  },
  friction: {
    key: "friction",
    name: "Alive in the Friction",
    color: "#ff6b35",
    utopia: "Their utopia kept one part of the world deliberately dangerous, because too much safety kills something essential.",
    description: "Ease is more dangerous than difficulty. Something in us requires resistance.",
    blindSpot: "They can mistake difficulty for meaning. Not everything hard is worth doing. Sometimes the easy path is the right one.",
    superpower: "embracing difficulty",
    book: { title: "The Stars My Destination", author: "Bester" },
  },
  unbound: {
    key: "unbound",
    name: "Unbound from Form",
    color: "#a855f7",
    utopia: "Their utopia transcended the physical. They exist as pure consciousness now.",
    description: "The boundary of the self is simply not where they stop. Most people find this frightening. They find it the most interesting question there is.",
    blindSpot: "They left so much behind that they may not recognize what was worth keeping until it's too late.",
    superpower: "imagining beyond limits",
    book: { title: "Childhood's End", author: "Clarke" },
  },
  alive: {
    key: "alive",
    name: "Alive to Everything",
    color: "#f472b6",
    utopia: "Their utopia engineered twelve new senses and a sunset that lasts all day.",
    description: "Change your form, change your perspective, taste every experience. The universe gave you everything. The least you can do is feel it.",
    blindSpot: "Sensation can become consumption. Feeling everything is not the same as understanding anything.",
    superpower: "feeling everything",
    book: { title: "Surface Detail", author: "Banks" },
  },
  mender: {
    key: "mender",
    name: "Mender of What Remains",
    color: "#10b981",
    utopia: "Their utopia decided the most advanced engineering was making what already exists work again.",
    description: "While everyone else is building arks and uploading consciousness, they're fixing the thing in front of them.",
    blindSpot: "They can become so focused on repair that they miss when something needs to die. Not everything should be saved.",
    superpower: "fixing what's broken",
    book: { title: "The Ministry for the Future", author: "Robinson" },
  },
  cleareyed: {
    key: "cleareyed",
    name: "Clear-Eyed in the Storm",
    color: "#64748b",
    utopia: "Their utopia has one person whose only job is to tell the truth. They answer to no one.",
    description: "They have one job: to see what is actually happening and say it out loud. The version that's true.",
    blindSpot: "Honesty without tenderness is cruelty. They can see everything clearly and still miss how their truth lands.",
    superpower: "telling hard truths",
    book: { title: "Slaughterhouse-Five", author: "Vonnegut" },
  },
  between: {
    key: "between",
    name: "In the Space Between",
    color: "#8b8b8b",
    utopia: "Their utopia just started to exist. Nothing is built yet. It's the beginning of an idea.",
    description: "Everyone else has a position. They have a question. And they're still here, which might be the bravest thing on this list.",
    blindSpot: "The space between can become a permanent address. Not knowing what you are can become a way of avoiding the risk of choosing.",
    superpower: "holding uncertainty",
    book: { title: "Never Let Me Go", author: "Ishiguro" },
  },
};

export const archetypeKeys = Object.keys(archetypes);
```

**Step 2: Verify it compiles**

```bash
cd /Users/louiseireland/Projects/livenowclub && pnpm exec tsc src/lib/archetypes.ts --noEmit --skipLibCheck
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/lib/archetypes.ts
git commit -m "feat: add archetypes data module"
```

---

## Task 3: Add Pair Dynamics Content

**Files:**
- Modify: `src/lib/archetypes.ts`

**Step 1: Add pair dynamics object and helper**

Append to `src/lib/archetypes.ts`:

```typescript
// Handcrafted pair dynamics - key format: "archA+archB" (alphabetical)
export const pairDynamics: Record<string, string> = {
  // Shaper tensions
  "embers+shaper": "One races toward tomorrow. The other holds yesterday close. Between them, the present gets attention.",
  "rooted+shaper": "The Shapers want to tear it down and rebuild. The Rooted ask: what was wrong with it?",

  // Conscience tensions
  "citizen+conscience": "The Citizen trusts the architecture. The Conscience tests the walls for cracks.",
  "alive+conscience": "One wants to feel everything. The other keeps asking: but should we?",

  // Presence tensions
  "presence+unbound": "The Keeper stays embodied. The Unbound wants to transcend. They're arguing about what it means to be here.",

  // Swimmer tensions
  "mender+swimmer": "The Swimmer lives in questions. The Mender needs to fix things. One pauses, the other acts.",

  // Friction tensions
  "friction+rooted": "One craves difficulty. One chose stillness. They don't understand each other at all.",

  // Architect dynamics
  "architect+shaper": "Both builders, different blueprints. The Architect wants consensus. The Shaper wants to start over.",
  "architect+mender": "Systems thinkers both. One designs new ones, one fixes old ones. They probably need each other.",

  // Citizen dynamics
  "alive+citizen": "Both believe in abundance. One wants access, the other wants experience. A generous worldview.",
  "citizen+swimmer": "The Citizen builds. The Swimmer questions. Both necessary, both frustrated with each other.",

  // Embers dynamics
  "between+embers": "The archive and the threshold. One knows where we came from. The other isn't sure where we're going.",
  "embers+mender": "Keepers both. One preserves memory, one preserves function. The museum and the workshop.",

  // Unbound dynamics
  "swimmer+unbound": "Both comfortable with ambiguity. They might talk for hours and enjoy every minute.",
  "alive+unbound": "Sensation-seekers, different methods. One through the body, one past it.",

  // Cleareyed dynamics
  "cleareyed+conscience": "Truth-tellers both. The Conscience watches systems. Clear-Eyed watches everything.",
  "cleareyed+swimmer": "Both live in clarity, different kinds. Facts vs. questions. They respect each other.",

  // Rooted dynamics
  "presence+rooted": "Stillness and attention. They understand something the others don't.",
  "mender+rooted": "The patient ones. They'll be here when the dust settles.",

  // Between dynamics
  "between+swimmer": "Uncertainty specialists. Neither one is sure, and they're fine with that.",

  // Same-archetype dynamics
  "shaper+shaper": "Two builders. You'll create something—if you stop redesigning it.",
  "rooted+rooted": "Two in stillness. Peaceful—but who makes the first move?",
  "conscience+conscience": "Two watchmen. Nothing escapes you. Exhausting, but safe.",
  "citizen+citizen": "Two at ease. This utopia floats. Who drops anchor?",
  "swimmer+swimmer": "Two in deep water. You'll question everything. Even this.",
  "architect+architect": "Two systems thinkers. Great structures. Who lives in them?",
  "presence+presence": "Two keepers. So much holding space. Who acts?",
  "embers+embers": "Two archivists. The past is very well preserved here.",
  "friction+friction": "Two who crave difficulty. This should be interesting.",
  "unbound+unbound": "Two transcenders. You've both left the building.",
  "alive+alive": "Two sensation-seekers. Buckle up.",
  "mender+mender": "Two fixers. Everything here will work. Eventually.",
  "cleareyed+cleareyed": "Two truth-tellers. No one's getting away with anything.",
  "between+between": "Two still figuring it out. At least you're not alone.",
};

// Helper to get pair key (alphabetically sorted)
function getPairKey(a: string, b: string): string {
  return [a, b].sort().join("+");
}

// Get dynamic for a pair of archetypes
export function getPairDynamic(a: string, b: string): string | null {
  const key = getPairKey(a, b);
  return pairDynamics[key] || null;
}
```

**Step 2: Verify it compiles**

```bash
cd /Users/louiseireland/Projects/livenowclub && pnpm exec tsc src/lib/archetypes.ts --noEmit --skipLibCheck
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/lib/archetypes.ts
git commit -m "feat: add handcrafted pair dynamics"
```

---

## Task 4: Add Content Generation Functions

**Files:**
- Modify: `src/lib/archetypes.ts`

**Step 1: Add content generation functions**

Append to `src/lib/archetypes.ts`:

```typescript
// Get the most applicable group dynamic
export function getGroupDynamic(keys: string[]): string | null {
  if (keys.length === 0) return null;
  if (keys.length === 1) return null;

  // For pairs, use exact match
  if (keys.length === 2) {
    return getPairDynamic(keys[0], keys[1]);
  }

  // For larger groups, find the first matching pair (sorted by how interesting)
  // Prioritize tension pairs over harmony pairs
  const tensionPairs = [
    ["shaper", "rooted"],
    ["shaper", "embers"],
    ["conscience", "citizen"],
    ["presence", "unbound"],
    ["swimmer", "mender"],
    ["friction", "rooted"],
  ];

  for (const [a, b] of tensionPairs) {
    if (keys.includes(a) && keys.includes(b)) {
      return getPairDynamic(a, b);
    }
  }

  // Fall back to any matching pair
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      const dynamic = getPairDynamic(keys[i], keys[j]);
      if (dynamic) return dynamic;
    }
  }

  return null;
}

// Generate blended vision from present archetypes
export function getBlendedVision(keys: string[]): string {
  if (keys.length === 0) return "";
  if (keys.length === 1) {
    return archetypes[keys[0]]?.utopia || "";
  }

  // For 2-3 archetypes, combine their core concepts
  const concepts = keys.slice(0, 3).map(k => {
    const utopia = archetypes[k]?.utopia || "";
    // Extract the distinctive part after "Their utopia"
    const match = utopia.match(/Their utopia[^.]*?([a-z].*)/i);
    if (match) return match[1].replace(/\.$/, "");
    return utopia.replace(/^Their utopia /, "").replace(/\.$/, "");
  });

  if (concepts.length === 2) {
    return `A place where ${concepts[0]}, and where ${concepts[1]}.`;
  }

  return `A place where ${concepts[0]}, where ${concepts[1]}, and where ${concepts[2]}.`;
}

// Get superpowers weighted by representation
export function getSuperpowers(keys: string[], counts?: Record<string, number>): string[] {
  const powers = keys
    .map(k => ({ key: k, power: archetypes[k]?.superpower, count: counts?.[k] || 1 }))
    .filter(p => p.power)
    .sort((a, b) => b.count - a.count)
    .map(p => p.power as string);

  return powers.slice(0, 3);
}

// Get missing voice insights
export type MissingVoice = { key: string; name: string; color: string; insight: string };

const missingInsights: Record<string, string> = {
  citizen: "No one here trusts abundance yet.",
  shaper: "No one is pushing for change.",
  architect: "No one is thinking about structures.",
  presence: "No one is fully here.",
  swimmer: "No one sits with questions.",
  rooted: "No one has stopped moving.",
  conscience: "No one is watching the watchers.",
  embers: "No one guards the memory.",
  friction: "No one craves difficulty.",
  unbound: "No one is reaching past the edges.",
  alive: "No one is here just to feel.",
  mender: "No one fixes what's broken.",
  cleareyed: "No one tells the hard truth.",
  between: "Everyone already knows what they believe.",
};

export function getMissingVoices(presentKeys: string[], limit = 2): MissingVoice[] {
  const missing = archetypeKeys.filter(k => !presentKeys.includes(k));

  return missing.slice(0, limit).map(key => ({
    key,
    name: archetypes[key].name,
    color: archetypes[key].color,
    insight: missingInsights[key] || "This perspective is missing.",
  }));
}

// Get a group book recommendation
export function getGroupBook(keys: string[], counts?: Record<string, number>): Book | null {
  if (keys.length === 0) return null;

  // Pick from the most represented archetype
  const sorted = [...keys].sort((a, b) => (counts?.[b] || 1) - (counts?.[a] || 1));
  return archetypes[sorted[0]]?.book || null;
}
```

**Step 2: Verify it compiles**

```bash
cd /Users/louiseireland/Projects/livenowclub && pnpm exec tsc src/lib/archetypes.ts --noEmit --skipLibCheck
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/lib/archetypes.ts
git commit -m "feat: add content generation functions"
```

---

## Task 5: Create Carousel Hook

**Files:**
- Create: `src/app/wonder/essay/quiz/utopia/[slug]/useCarousel.ts`

**Step 1: Create the hook**

```typescript
// src/app/wonder/essay/quiz/utopia/[slug]/useCarousel.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

export function useCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: false,
    containScroll: "trimSnaps",
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [totalSlides, setTotalSlides] = useState(0);

  const updateState = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setTotalSlides(emblaApi.scrollSnapList().length);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateState();
    emblaApi.on("select", updateState);
    emblaApi.on("reInit", updateState);

    return () => {
      emblaApi.off("select", updateState);
      emblaApi.off("reInit", updateState);
    };
  }, [emblaApi, updateState]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        emblaApi?.scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        emblaApi?.scrollNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  return {
    emblaRef,
    currentIndex,
    totalSlides,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    scrollTo,
  };
}
```

**Step 2: Verify it compiles**

```bash
cd /Users/louiseireland/Projects/livenowclub && pnpm exec tsc --noEmit
```

Expected: No errors (or only pre-existing errors)

**Step 3: Commit**

```bash
git add src/app/wonder/essay/quiz/utopia/[slug]/useCarousel.ts
git commit -m "feat: add carousel hook with Embla"
```

---

## Task 6: Create CSS Module

**Files:**
- Create: `src/app/wonder/essay/quiz/utopia/[slug]/UtopiaCards.module.css`

**Step 1: Create the CSS module**

```css
/* src/app/wonder/essay/quiz/utopia/[slug]/UtopiaCards.module.css */

/* Container */
.container {
  position: relative;
}

.viewport {
  overflow: hidden;
}

.track {
  display: flex;
  touch-action: pan-y pinch-zoom;
}

/* Cards */
.card {
  flex: 0 0 100%;
  min-width: 0;
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin-right: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.cardImage {
  width: calc(100% + 48px);
  margin: -24px -24px 16px;
  border-radius: 20px 20px 0 0;
  display: block;
}

/* Typography */
.label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(45, 42, 38, 0.5);
  margin-bottom: 6px;
}

.sectionLabel {
  display: block;
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(45, 42, 38, 0.45);
  margin-bottom: 8px;
}

.title {
  font-size: 1.4rem;
  font-weight: 400;
  margin: 0 0 16px;
  color: #2d2a26;
}

/* Content sections */
.vision {
  font-size: 1.1rem;
  font-style: italic;
  color: #2d2a26;
  line-height: 1.5;
  margin: 0 0 12px;
}

.dynamic {
  font-size: 0.95rem;
  color: rgba(45, 42, 38, 0.7);
  line-height: 1.5;
  margin: 0 0 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.section {
  margin-bottom: 16px;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.sectionText {
  font-size: 0.95rem;
  color: #2d2a26;
  line-height: 1.5;
  margin: 0;
}

.utopia {
  font-size: 1rem;
  font-style: italic;
  color: #2d2a26;
  line-height: 1.6;
  margin: 0 0 16px;
}

.description {
  font-size: 0.95rem;
  color: rgba(45, 42, 38, 0.7);
  line-height: 1.6;
  margin: 0 0 16px;
}

.blindspot {
  font-size: 0.9rem;
  color: rgba(45, 42, 38, 0.6);
  line-height: 1.5;
  font-style: italic;
  margin: 0;
}

/* Composition list */
.compositionItem {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
}

.compositionDot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.compositionName {
  font-size: 0.9rem;
  color: #2d2a26;
}

.compositionCount {
  font-size: 0.8rem;
  color: rgba(45, 42, 38, 0.5);
}

/* Members */
.membersList {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.memberName {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.95rem;
  color: #2d2a26;
  background: #faf6f1;
  padding: 6px 12px;
  border-radius: 20px;
}

.memberTag {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #e8178a;
  font-weight: 500;
}

/* Missing voices */
.missingVoice {
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 8px;
}

.missingVoice:last-child {
  margin-bottom: 0;
}

.missingName {
  font-weight: 500;
}

.missingInsight {
  color: rgba(45, 42, 38, 0.7);
}

/* Book */
.bookText {
  font-size: 0.95rem;
  color: #2d2a26;
  line-height: 1.5;
  margin: 0;
}

/* Navigation */
.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 20px 0 8px;
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 1px solid rgba(45, 42, 38, 0.15);
  cursor: pointer;
  transition: all 0.2s;
  color: #2d2a26;
}

.arrow:hover:not(:disabled) {
  border-color: #e8178a;
  color: #e8178a;
  transform: scale(1.05);
}

.arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.dots {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(45, 42, 38, 0.2);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s;
}

.dot:hover {
  background: rgba(45, 42, 38, 0.4);
}

.dotActive {
  width: 24px;
  border-radius: 4px;
  background: #e8178a;
}

.counter {
  text-align: center;
  font-size: 0.75rem;
  color: rgba(45, 42, 38, 0.4);
  padding-bottom: 8px;
}

/* Responsive */
@media (min-width: 640px) {
  .card {
    padding: 28px;
  }

  .cardImage {
    width: calc(100% + 56px);
    margin: -28px -28px 20px;
  }

  .arrow {
    width: 44px;
    height: 44px;
  }
}
```

**Step 2: Commit**

```bash
git add src/app/wonder/essay/quiz/utopia/[slug]/UtopiaCards.module.css
git commit -m "feat: add CSS module for utopia cards"
```

---

## Task 7: Create ArchetypeCard Component

**Files:**
- Create: `src/app/wonder/essay/quiz/utopia/[slug]/ArchetypeCard.tsx`

**Step 1: Create the component**

```typescript
// src/app/wonder/essay/quiz/utopia/[slug]/ArchetypeCard.tsx
"use client";

import { archetypes } from "@/lib/archetypes";
import styles from "./UtopiaCards.module.css";

type Member = {
  id: string;
  name: string;
  archetype: string;
};

type ArchetypeCardProps = {
  archetypeKey: string;
  members: Member[];
  createdBy: string;
  currentUserId: string | null;
};

export function ArchetypeCard({
  archetypeKey,
  members,
  createdBy,
  currentUserId,
}: ArchetypeCardProps) {
  const data = archetypes[archetypeKey];

  if (!data) return null;

  return (
    <article className={styles.card}>
      <img
        src={`/wonder/essay/quiz/images/utopia-${archetypeKey}.png`}
        alt={data.name}
        className={styles.cardImage}
      />

      <span className={styles.label} style={{ color: data.color }}>
        {data.name}
      </span>

      <div className={styles.membersList}>
        {members.map((member) => {
          const isFounder = member.id === createdBy;
          const isYou = member.id === currentUserId;
          return (
            <span key={member.id} className={styles.memberName}>
              {member.name || "Anonymous"}
              {isFounder && <span className={styles.memberTag}>founder</span>}
              {isYou && !isFounder && <span className={styles.memberTag}>you</span>}
            </span>
          );
        })}
      </div>

      <div>
        <span className={styles.sectionLabel}>Their utopia</span>
        <p className={styles.utopia}>{data.utopia}</p>
      </div>

      <p className={styles.description}>{data.description}</p>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Blind spot</span>
        <p className={styles.blindspot}>{data.blindSpot}</p>
      </div>
    </article>
  );
}
```

**Step 2: Verify it compiles**

```bash
cd /Users/louiseireland/Projects/livenowclub && pnpm exec tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/app/wonder/essay/quiz/utopia/[slug]/ArchetypeCard.tsx
git commit -m "feat: add ArchetypeCard component"
```

---

## Task 8: Create CombinedCard Component

**Files:**
- Create: `src/app/wonder/essay/quiz/utopia/[slug]/CombinedCard.tsx`

**Step 1: Create the component**

```typescript
// src/app/wonder/essay/quiz/utopia/[slug]/CombinedCard.tsx
"use client";

import {
  archetypes,
  getBlendedVision,
  getGroupDynamic,
  getSuperpowers,
  getMissingVoices,
  getGroupBook,
} from "@/lib/archetypes";
import styles from "./UtopiaCards.module.css";

type Member = {
  id: string;
  name: string;
  archetype: string;
};

type CombinedCardProps = {
  utopiaName: string;
  presentKeys: string[];
  grouped: Record<string, Member[]>;
};

export function CombinedCard({ utopiaName, presentKeys, grouped }: CombinedCardProps) {
  const counts = Object.fromEntries(
    Object.entries(grouped).map(([k, v]) => [k, v.length])
  );

  const blendedVision = getBlendedVision(presentKeys);
  const dynamic = getGroupDynamic(presentKeys);
  const superpowers = getSuperpowers(presentKeys, counts);
  const missingVoices = getMissingVoices(presentKeys, 2);
  const book = getGroupBook(presentKeys, counts);

  return (
    <article className={styles.card}>
      <span className={styles.label}>Your Utopia</span>
      <h3 className={styles.title}>{utopiaName}</h3>

      <p className={styles.vision}>{blendedVision}</p>

      {dynamic && <p className={styles.dynamic}>{dynamic}</p>}

      {/* Composition */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Who&apos;s here</span>
        {presentKeys.map((key) => {
          const data = archetypes[key];
          const count = grouped[key]?.length || 0;
          return (
            <div key={key} className={styles.compositionItem}>
              <div
                className={styles.compositionDot}
                style={{ backgroundColor: data?.color || "#666" }}
              />
              <span className={styles.compositionName}>{data?.name}</span>
              <span className={styles.compositionCount}>({count})</span>
            </div>
          );
        })}
      </div>

      {/* Superpowers */}
      {superpowers.length > 0 && (
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Your strengths</span>
          <p className={styles.sectionText}>{superpowers.join(", ")}</p>
        </div>
      )}

      {/* Missing voices */}
      {missingVoices.length > 0 && (
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Missing voices</span>
          {missingVoices.map((voice) => (
            <div key={voice.key} className={styles.missingVoice}>
              <span className={styles.missingName} style={{ color: voice.color }}>
                {voice.name}
              </span>
              <span className={styles.missingInsight}> — {voice.insight}</span>
            </div>
          ))}
        </div>
      )}

      {/* Book recommendation */}
      {book && (
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Read together</span>
          <p className={styles.bookText}>
            <em>{book.title}</em> by {book.author}
          </p>
        </div>
      )}
    </article>
  );
}
```

**Step 2: Verify it compiles**

```bash
cd /Users/louiseireland/Projects/livenowclub && pnpm exec tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/app/wonder/essay/quiz/utopia/[slug]/CombinedCard.tsx
git commit -m "feat: add CombinedCard component"
```

---

## Task 9: Create UtopiaCards Component

**Files:**
- Create: `src/app/wonder/essay/quiz/utopia/[slug]/UtopiaCards.tsx`

**Step 1: Create the main component**

```typescript
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
```

**Step 2: Verify it compiles**

```bash
cd /Users/louiseireland/Projects/livenowclub && pnpm exec tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/app/wonder/essay/quiz/utopia/[slug]/UtopiaCards.tsx
git commit -m "feat: add UtopiaCards orchestration component"
```

---

## Task 10: Update Page to Use New Components

**Files:**
- Modify: `src/app/wonder/essay/quiz/utopia/[slug]/page.tsx`

**Step 1: Update imports and remove old archetypeData**

In `page.tsx`, replace the old imports and archetypeData with:

```typescript
import { UtopiaCards } from "./UtopiaCards";
import { archetypes } from "@/lib/archetypes";
```

**Step 2: Remove the inline archetypeData object**

Delete the entire `const archetypeData: Record<string, {...}> = {...};` block (lines ~11-161).

**Step 3: Update the SwipeableMembers usage**

Replace:
```typescript
<SwipeableMembers
  members={room.members}
  createdBy={room.createdBy}
  slug={slug}
  archetypeData={archetypeData}
  utopiaName={room.name}
  oneLiner={oneLiner}
/>
```

With:
```typescript
<UtopiaCards
  members={room.members}
  createdBy={room.createdBy}
  utopiaName={room.name}
/>
```

**Step 4: Update analyzeGroup to use imported archetypes**

Change any reference to `archetypeData` to use `archetypes` from the import.

**Step 5: Update missing archetypes section**

Update the "What's Missing" section to use the imported `archetypes` object instead of `archetypeData`.

**Step 6: Verify build**

```bash
cd /Users/louiseireland/Projects/livenowclub && pnpm build
```

Expected: Build succeeds

**Step 7: Commit**

```bash
git add src/app/wonder/essay/quiz/utopia/[slug]/page.tsx
git commit -m "refactor: use new UtopiaCards and archetypes module"
```

---

## Task 11: Delete Old Files

**Files:**
- Delete: `src/app/wonder/essay/quiz/utopia/[slug]/SwipeableMembers.tsx`
- Delete: `src/app/wonder/essay/quiz/utopia/[slug]/EditableMemberList.tsx`

**Step 1: Remove old files**

```bash
cd /Users/louiseireland/Projects/livenowclub
rm src/app/wonder/essay/quiz/utopia/[slug]/SwipeableMembers.tsx
rm src/app/wonder/essay/quiz/utopia/[slug]/EditableMemberList.tsx
```

**Step 2: Verify build still works**

```bash
pnpm build
```

Expected: Build succeeds

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old SwipeableMembers and EditableMemberList"
```

---

## Task 12: Test and Deploy

**Step 1: Run dev server and test**

```bash
cd /Users/louiseireland/Projects/livenowclub && pnpm dev
```

Test manually:
- Visit a utopia page
- Verify carousel swipe works on mobile (or emulated)
- Verify drag works on desktop
- Verify arrow buttons work
- Verify keyboard arrows work
- Verify content looks correct

**Step 2: Deploy**

```bash
npx vercel --prod
```

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: utopia cards rebuild complete"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Install Embla | package.json |
| 2 | Create archetypes data | src/lib/archetypes.ts |
| 3 | Add pair dynamics | src/lib/archetypes.ts |
| 4 | Add content functions | src/lib/archetypes.ts |
| 5 | Create carousel hook | useCarousel.ts |
| 6 | Create CSS module | UtopiaCards.module.css |
| 7 | Create ArchetypeCard | ArchetypeCard.tsx |
| 8 | Create CombinedCard | CombinedCard.tsx |
| 9 | Create UtopiaCards | UtopiaCards.tsx |
| 10 | Update page | page.tsx |
| 11 | Delete old files | SwipeableMembers.tsx, EditableMemberList.tsx |
| 12 | Test and deploy | — |
