# Utopia Readings Redesign

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace shallow group/relationship readings with rich, specific, poetic analysis that helps people understand roles, tensions, and dynamics.

**Architecture:** Two reading types — Group Reading (3+ people) and Relationship Reading (any 2 people). Relationship reading is accessible both as a standalone 2-person group AND by clicking any pair within a larger group.

**Tech Stack:** Next.js, TypeScript, existing archetype system in `src/lib/archetypes.ts`

---

## Group Reading (3+ people)

Replaces current "What You'd Build Together" with four sections:

### Section 1: Your Group at a Glance

Poetic group composite + what's missing.

**Example:**

> Your group lives in the space between PERCEIVING and GROUNDING — you see what's true and stay rooted in what is.
>
> You're strong at: honest observation, patience, presence
>
> You may struggle with: momentum, making the leap, tolerating imperfection
>
> What's missing: No one here is pulling toward REACH — the transcendent, the visionary, the "what if we became something entirely new?" You're grounded. Make sure that doesn't become stuck.

**Generation logic:**
- Calculate group's center of gravity on radar
- Identify dominant quadrant(s) and empty quadrant(s)
- Pull from pre-written copy blocks for each orientation combo

---

### Section 2: Who Plays What Role

Each member's unique contribution in THIS group's context.

**Example:**

> **Louise — THE PRESENT**
> You're the one who notices when the group is rushing past something important. When others want to solve, you ask: "Are we actually feeling this?" You slow things down — not to stall, but to arrive.
>
> **Sarah — THE BUILDER**
> You're the engine. When the group is still weighing options, you're already prototyping. In a group of perceivers, you're the one who turns insight into artifact. Without you, nothing ships.

**Generation logic:**
- Each archetype has base description
- Modifier based on group composition: "In a group of perceivers, you're the one who..." / "You're the only Builder here, which means..."

---

### Section 3: Where You'll Click / Where You'll Push Each Other

Synergies and productive tensions between specific pairs.

**Example:**

> **WHERE YOU'LL CLICK**
>
> *Louise + Marcus*
> You both stay grounded. When the group gets swept up, you two will find each other's eyes across the room. Trust that instinct.
>
> **WHERE YOU'LL PUSH EACH OTHER**
>
> *Sarah + Louise*
> Builder wants momentum. Present wants pause. This is your creative friction — neither is wrong, and you need both.

**Generation logic:**
- Pre-written pair dynamics for each archetype combo
- Select top 2-3 synergies and tensions based on who's in the group
- Prioritize pairs that involve the current viewer

---

### Section 4: What Your Group Might Overdo / Underdo

Tendencies, not prescriptions.

**Example:**

> Your group might:
> - Overdo: Observing, waiting, grounding
> - Underdo: Leaping, building before ready, vision
>
> Watch for the moment when patience becomes avoidance.

**Generation logic:**
- Based on quadrant distribution
- Groups heavy in one area get specific warnings

---

*[End — no closing section]*

---

## Relationship Reading (any 2 people)

Used for:
- Standalone 2-person groups (this IS the main reading)
- Clicking any pair within a larger group

### Header

> **Louise × Sarah**
> *The Present & The Builder*

### Section 1: What You Share

**Example:**

> You're both allergic to theory that doesn't touch ground. Louise makes things real by staying with them; Sarah makes things real by building them. Different moves, same root: neither of you trusts abstraction. You'll find each other in rooms full of people still debating while you've both already decided something needs to exist.

---

### Section 2: Where You'll Push Each Other

**Example:**

> Sarah moves before Louise feels ready. Louise pauses when Sarah wants to ship. This will frustrate both of you — Sarah will read Louise as hesitant, Louise will read Sarah as rushing. Neither is true. Sarah learns by doing; Louise learns by attending. Name this out loud or it becomes silent resentment.

---

### Section 3: What You Create Together

**Example:**

> Work that ships and breathes. Sarah gives it form; Louise makes sure the form holds something true. Alone, Sarah risks building fast but hollow. Alone, Louise risks presence without artifact. Together: things that exist AND matter.

---

### Section 4: What's Missing Between You

**Contextual — adapts based on whether this is standalone or within a group.**

**In a group (with Tom as Questioner):**

> Neither of you pokes holes. You'll build something beautiful and miss the crack in the foundation. Tom's your stress-tester — bring him in before you ship, not after.

**Standalone (2-person group):**

> Neither of you pokes holes. You'll build something beautiful and miss the crack in the foundation. Who in your life asks "what could go wrong?" Find them.

---

*[End — no closing section]*

---

## Content Requirements

### Pair Combinations

14 archetypes × 14 = 196 pair combinations.

Each pair needs:
- What You Share (~4 sentences)
- Where You'll Push Each Other (~4 sentences)
- What You Create Together (~3 sentences)
- What's Missing Between You (~2 sentences, with group/standalone variants)

**Approach:** Write modular content blocks that can combine, rather than 196 fully bespoke readings. Each archetype has:
- Core traits
- What it offers to others
- What it lacks
- How it reads other archetypes

Pair content is generated from combining these blocks with connecting prose.

### Group Composite Combinations

4 quadrants (Reach, Ground, Build, Perceive) × various coverage patterns.

Need copy for:
- All quadrants covered
- Missing 1 quadrant (4 variants)
- Missing 2 quadrants (6 variants)
- Heavy in 1 quadrant (4 variants)

---

## Implementation Notes

### Files to modify

- `src/app/wonder/essay/quiz/utopia/[slug]/steps/GroupReadingStep.tsx` — replace with new structure
- `src/app/wonder/essay/quiz/utopia/[slug]/steps/RelationshipStep.tsx` — upgrade to richer format
- `src/lib/archetypes.ts` — may need additional content fields
- New: `src/lib/group-dynamics.ts` — generation logic for readings
- New: `src/lib/pair-dynamics.ts` — content and generation for pair readings

### Progressive disclosure

- 2 people: Relationship reading only
- 3+ people: Full group reading with clickable pairs

### Tone guidelines

- Poetic, evocative — matches the essay voice
- Specific to THIS group, not generic
- Observational, not prescriptive
- "Push each other" not "clash"
- No therapy-speak
- No cheesy closings
- Clean endings

---

## Open Questions

1. **Viral loop** — This redesign improves depth but doesn't solve "people take quiz and don't share." Address separately?

2. **Content authoring** — Who writes the 196 pair combinations? Claude generates drafts, Louise edits?

3. **Retention** — Reading is richer but still one-time. Future: weekly prompts, new dynamics as group grows?
