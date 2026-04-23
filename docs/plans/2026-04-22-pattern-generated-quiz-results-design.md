# Pattern-Generated Quiz Results Design

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace archetype-based quiz results with fully pattern-generated readings that feel personalized to each individual, pair, and group.

**Architecture:** Every result is generated from the specific combination of 7 answers. No fixed archetypes. Identity, readings, and relationship dynamics all emerge from answer patterns.

**Tech Stack:** Next.js, TypeScript, existing quiz infrastructure

---

## Core Principle

Nothing is pre-written except the logic that generates it. Each person's 7 answers create a unique fingerprint. Readings describe observable patterns and their implications — not assumed psychology.

---

## Three Dimensions

Detected from answer patterns across all 7 questions:

| Dimension | Low Pole | High Pole |
|-----------|----------|-----------|
| **Agency** | Witness | Builder |
| **Certainty** | Seeking | Settled |
| **Posture** | Protective | Expansive |

Each question contributes signal to one or more dimensions. A person's position on each dimension comes from their answer pattern, not any single question.

---

## Identity Generation

Format: `[Adjective] + [Noun]`

- **Noun** from Agency: Builder, Maker, Architect, Observer, Witness, Noticer
- **Adjective** from Certainty × Posture combination:
  - Settled + Protective → Steady, Grounded, Anchored
  - Settled + Expansive → Confident, Assured, Bold
  - Seeking + Protective → Careful, Cautious, Measured
  - Seeking + Expansive → Adaptive, Curious, Open

Examples: "Confident Builder", "Careful Observer", "Adaptive Maker", "Steady Witness"

Professional enough for enterprises. Human enough to remember.

---

## Individual Reading Structure

Four sections, all generated from the specific answer pattern:

### 1. Your Pattern
What showed up consistently across your answers. Observable, not interpreted.

> You chose "build something that lasts" over "experience everything." You chose "meaningful work" over "financial security." You chose "stay close to what I know" over "keep expanding."
>
> You're optimizing for depth. One thing, done well, for a long time.

### 2. What This Gives You
The gifts of this orientation, grounded in daily life.

> At work, you're the one who actually finishes things. When a friend is spiraling, you're steady. When you have a free Saturday, you don't wonder what to do — you already know.

### 3. How You'll Move
How this pattern engages with the future.

> You'll build slowly and stay longer than most. You won't pivot at the first sign of difficulty. The risk isn't that you'll quit too early — it's that you'll stay too long.

### 4. The Tradeoff
What any strong version of this pattern trades away. Only included if the pattern is pronounced.

> The long game trades away spontaneity. You might miss the side door because you're focused on the main entrance.

---

## Pair Reading Structure

Eight sections, generated from how two answer patterns interact:

### 1. Your Combined Pattern
What emerges when these two patterns overlap.

### 2. What You Give Each Other
Specific to each direction: what A gives B, what B gives A.

> **A → B:** You give them permission to slow down. They're always reaching — you remind them that where they are is also good.
>
> **B → A:** You give them motion. They're steady, sometimes stuck. You show them that movement doesn't mean abandoning what they've built.

### 3. What Emerges Together
Something neither would create alone.

### 4. Your Shared Strength
Where your patterns reinforce each other.

### 5. How You'll Make Decisions
The dynamic when choices need to be made.

### 6. Where You'll Create Friction
The predictable collision points.

### 7. What to Watch For
The pattern that might become problematic if unexamined.

### 8. What You'd Build Together
The natural output of this combination.

---

## Group Reading Structure

Synthesized narrative, not templated sections. Generated from the specific combination of all members' answers.

**What it covers:**
- What kind of group this is (finishers, starters, questioners, etc.)
- How they move together
- What's missing from the group (no one chose X)
- Where the fault lines are
- What they'd build together

**Example:**

> You're a group that finishes things. High commitment, low drift. You'd build the same thing three times before trying something different — not because you're afraid of new, but because you trust iteration over reinvention.
>
> You'll move slow until you're sure, then fast once you've decided. Outsiders will think you're stuck. You're not. You're loading.
>
> When it breaks — and it will — everyone reaches for tools. No one sits. That's your strength and your blind spot. Sometimes the right move is to wait, and none of you will suggest it.
>
> Taylor will get restless before anyone else notices the groove has become a rut.
>
> The real tension: half of you protect, half of you expand. When money gets tight or stakes get high, that split will surface. Name it early or it becomes personal.
>
> Your best work happens when someone drags the group somewhere uncomfortable and the rest of you make it solid.

---

## Writing Guidelines

**Do:**
- Ground patterns in daily life ("At work...", "When a friend is spiraling...", "When you have a free Saturday...")
- Describe observable behavior, not assumed psychology
- Write directly — no hedging ("That said...", "Of course...")
- Use "you" not "people like you"

**Don't:**
- Explain why someone chose what they chose
- Add defensive qualifiers ("That's not a flaw...")
- Use AI-isms ("It's worth noting...", "Interestingly...")
- Write poetically when direct is clearer

---

## Implementation Notes

### What Gets Replaced
- The 14 fixed archetypes (The Abundant, The Guardian, etc.)
- Pre-written archetype descriptions
- Primary/Shadow pairing system
- Static combination-content.ts taglines

### What Gets Built
- Dimension scoring from answers
- Identity generation from dimension positions
- Reading generation logic for individuals
- Pair reading generation from answer comparison
- Group reading synthesis

### Data Model
```typescript
type QuizResult = {
  answers: Answer[]; // 7 answers
  dimensions: {
    agency: number;      // -1 (Witness) to 1 (Builder)
    certainty: number;   // -1 (Seeking) to 1 (Settled)
    posture: number;     // -1 (Protective) to 1 (Expansive)
  };
  identity: {
    adjective: string;
    noun: string;
    full: string; // "Confident Builder"
  };
};

type PairReading = {
  personA: QuizResult;
  personB: QuizResult;
  sections: GeneratedSection[];
};

type GroupReading = {
  members: QuizResult[];
  narrative: string; // Synthesized, not sectioned
};
```

---

## Open Questions

1. **How much content is generated vs. assembled?** Could use LLM generation for readings, or build combinatorial content library.

2. **Caching strategy?** Same 7 answers should produce same reading. Cache by answer hash?

3. **Enterprise customization?** Should teams be able to add their own questions or modify dimensions?
