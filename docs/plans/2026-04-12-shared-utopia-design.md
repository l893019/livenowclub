# Shared Utopia: Relationship View Redesign

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the analytical relationship view with a focused "what you'd build together" frame that extends the quiz's core premise about worldviews and futures.

**Architecture:** The relationship view becomes about the shared utopia two (or more) worldviews would create together. Same question as the individual quiz ("what future would you build?"), asked collectively.

**Tech Stack:** React components, existing archetype data, new content generation for pair/group dynamics.

---

## Design Summary

### Core Concept

The quiz asks: what do you believe humanity should become?

The relationship view asks: what do you and this person believe it should become *together*?

Individual result = your utopia. Relationship view = your *shared* utopia.

Not compatibility analysis. Capability—what you'd create together.

---

## Structure: Pairs (2 people)

### Header
- Both names
- Both archetype names
- Radar chart showing positions (keep)

### 1. What You'd Build Together
The future these worldviews create when combined. Patterns and tendencies, not specific scenarios. 2-3 paragraphs.

**Tone:** Substantive like Myers-Briggs or DISC. Language broad enough to apply to relationships, companies, friendships, family decisions.

**Example (Questioner × Builder):**
> What you create would have both momentum and meaning. Things wouldn't just exist—they'd matter. And things that matter wouldn't stay ideas—they'd become real.
>
> The Builder brings things into existence. The Questioner ensures they're worth existing. Together: things that are both real and right.

### 2. What Would Be Strong
What the combination protects or enables. What you'd be good at together.

**Example:**
> You'd avoid the two most common failures: endless deliberation that never becomes anything, and rushed action that misses the point.
>
> You'd have both traction and direction.

### 3. What Would Be Missing
The blind spot. Worldviews or qualities not represented. What you'd need to watch or bring in from elsewhere.

**Example:**
> You might undervalue maintenance, rest, preservation. The people who just want to keep things as they are, or who aren't building or questioning anything—they might feel invisible to you.
>
> Not everything needs to be built. Not everything needs to be questioned.

### 4. The Question You're Answering
The central tension the partnership holds. One line.

**Example:**
> Can something be both urgent and considered?

---

## Structure: Groups (3+ people)

Same four sections, collective version:

1. **What This Group Would Build** — The future this combination creates
2. **What Would Be Strong** — What your mix protects or enables
3. **What Would Be Missing** — Ties to "missing voices" / invite recommendations
4. **The Question Your Group Is Answering** — Central tension of the collective

---

## When Someone Joins

Show how what you'd build *shifts* when a new worldview enters.

Not: "Welcome, new member!"

But: "Before [name], you'd build X. With them, you'd build Y."

The new person changes the future, not just the headcount.

---

## Content Cuts

Remove entirely from relationship view:
- ~~Compatibility percentage~~ (already removed)
- ~~The Distance~~
- ~~The Dynamic~~
- ~~Where You Align~~
- ~~Where You'll Clash~~
- ~~What You Exchange~~
- ~~The Risk~~

Keep:
- Header (names, archetypes)
- Radar chart
- "A Question for You Both" → becomes "The Question You're Answering"
- Share button
- Navigation

---

## Content Generation

### For Pairs
Need content for each unique pairing. With 14 archetypes:
- 91 unique pairs (A×B where A≠B)
- 14 same-archetype pairs (A×A)
- **Total: 105 unique combinations**

Each combination needs:
- What you'd build together (2-3 paragraphs)
- What would be strong (1-2 paragraphs)
- What would be missing (1-2 paragraphs)
- The question you're answering (1 sentence)

### For Groups
Dynamically generated based on:
- Archetypes present
- Distribution across the radar
- Missing quadrants/orientations

Can leverage existing `group-analysis.ts` logic, reframed around "what you'd build."

---

## Implementation Notes

### Files to Modify
- `src/app/wonder/essay/quiz/utopia/[slug]/steps/RelationshipStep.tsx` — Replace content structure
- `src/app/wonder/essay/quiz/utopia/[slug]/steps/GroupReadingStep.tsx` — Reframe around "what you'd build"
- `src/lib/archetypes.ts` or new file — Add pair content
- `src/lib/group-analysis.ts` — Reframe outputs

### Files to Remove/Deprecate
- Analytical pair dynamic generation (if exists separately)
- Compatibility percentage calculation (already removed from import)

---

## Open Questions

1. **Content authoring:** Write all 105 pair combinations manually, or generate programmatically from archetype attributes?
2. **Same-archetype pairs:** What do two Questioners build together? (Interesting edge case)
3. **Visual design:** Any changes to radar or layout beyond content swap?
4. **"When someone joins" view:** New component or integrated into existing join animation?

---

## Success Criteria

- Relationship view feels substantive and useful across contexts (romantic, professional, family, friends)
- Users understand what they'd create together, not just whether they're "compatible"
- Frame extends naturally from individual quiz result (your utopia → shared utopia)
- Content is shareable and memorable
