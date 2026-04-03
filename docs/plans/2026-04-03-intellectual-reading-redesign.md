# Intellectual Reading Redesign

> **For Claude:** This is a significant UX and content overhaul. Use superpowers:subagent-driven-development to implement task-by-task.

**Goal:** Transform the quiz result, relationship view, and group experience from shallow flash-card style into substantial analytical readings that appeal to rational, tech-minded users.

**Core Insight:** The current experience treats personality insights like horoscopes — vague, brief, mystical. The redesign treats them like analyses — specific, substantial, rational. "Here's what we observe and why it matters."

---

## Design Principles

1. **Analytical, not mystical.** Explain the reasoning. Show the framework. Reference the source material (208 sci-fi books, radar positions, response patterns).

2. **Substantial content.** Each section has real depth — paragraphs that reward reading, not one-liners.

3. **Rational tone.** Clear, direct prose. No fluff. Appeals to people who want to understand the why.

4. **Scrollable, not tap-through.** This is a reading, not a slideshow. Users consume at their own pace.

5. **Shareable sections.** Each major section can be shared independently.

---

## Visual Language

- **Background:** Warm cream (#faf6f1) — existing brand
- **Typography:** Clean, readable. Serif for quotes/poetic lines, sans-serif for analysis.
- **Section breaks:** Thin lines or generous whitespace
- **Color:** Archetype colors as accents only (names, highlights)
- **Visualizations:** Radar charts where relevant, minimal and clean
- **Share buttons:** Per-section, not just end-of-page

---

## Reading Type 1: Quiz Result

### Structure

```
─────────────────────────────────────
[ARCHETYPE NAME]

[Core description — 2-3 sentences capturing the worldview]
─────────────────────────────────────

HOW YOU GOT HERE

[Analysis of their specific answers]
- Which questions they answered distinctively
- What pattern emerged
- What % of respondents share this pattern
- Connection to the 208 sci-fi book framework

─────────────────────────────────────

THE WORLDVIEW

[Deep explanation of what this archetype believes]
- 3-4 core beliefs as bullet points
- Examples from sci-fi literature
- What distinguishes this from adjacent archetypes

─────────────────────────────────────

YOUR SUPERPOWER

[Superpower name]

[2-3 paragraphs explaining what this means in practice,
why it's valuable, how it manifests]

─────────────────────────────────────

YOUR BLIND SPOT

[Blind spot description]

[2-3 paragraphs on the shadow side — specific,
honest, not softened. Explains the failure mode.]

─────────────────────────────────────

YOUR POSITION ON THE MAP

[Radar visualization with user's position highlighted]

[Explanation of the two axes: Build↔Witness, Root↔Transcend]
[Where they sit and what it means]

Adjacent archetypes (natural allies):
• [Archetype] — [one line on why you click]
• [Archetype] — [one line on why you click]

Opposite archetypes (productive tension):
• [Archetype] — [one line on the challenge]
• [Archetype] — [one line on the challenge]

─────────────────────────────────────

BOOKS FOR YOUR WORLDVIEW

[3 books, each with:]
• Title and author
• 2-3 sentences on why this book speaks to the archetype
• Specific connection to the worldview's tensions

─────────────────────────────────────

[ Create Your Utopia ]    [ Share Result ]
─────────────────────────────────────
```

### Content Requirements

- Rewrite all 14 archetype descriptions in analytical tone
- Add "How You Got Here" section (requires mapping answers to insights)
- Expand superpower/blind spot from single sentences to 2-3 paragraphs each
- Write ally/tension explanations for each archetype

---

## Reading Type 2: Relationship

### Structure

```
─────────────────────────────────────
[NAME] × [NAME]

[Archetype A] & [Archetype B]
─────────────────────────────────────

THE DISTANCE

[Mini radar showing both positions]

[1-2 paragraphs on what their distance means]
- Are they close, medium, or far?
- What does the research say about pairs at this distance?
- What to expect from this dynamic

─────────────────────────────────────

THE DYNAMIC

[2-3 paragraphs on the fundamental relationship]
- How Person A sees the world vs Person B
- The core tension this creates
- Why the tension is productive (or risky)

─────────────────────────────────────

WHERE YOU ALIGN

[2-3 bullet points, each expanded into a full paragraph]
- Shared belief or value
- How it manifests in practice
- Why this alignment matters

─────────────────────────────────────

WHERE YOU'LL CLASH

[2-3 bullet points, each expanded]
- The specific friction point
- How it shows up day-to-day
- Whether/how it can be navigated

─────────────────────────────────────

WHAT YOU EXCHANGE

What [Person A] gives [Person B]:
[Full paragraph on the gift — specific, not generic]

What [Person B] gives [Person A]:
[Full paragraph on the gift — specific, not generic]

─────────────────────────────────────

THE RISK

[1-2 paragraphs on the failure mode]
- What happens if this pair stops working
- The specific trap they might fall into
- How to avoid it

─────────────────────────────────────

A QUESTION FOR YOU BOTH

"[Specific question that requires both perspectives]"

[1-2 sentences framing why this question matters for this pair]

─────────────────────────────────────

[ Share This Reading ]
─────────────────────────────────────
```

### Content Requirements

This is the biggest content lift. Each pair needs ~600-800 words of analytical content.

**Priority pairs (write first):**

Tier 1 — Same archetype (14 pairs):
- What happens when two of the same meet?
- Echo chamber risks, competition, deep recognition

Tier 2 — Opposite pairs (8 pairs, distance > 1.0):
- shaper+embers, shaper+rooted, friction+rooted, unbound+embers
- conscience+citizen, alive+conscience, friction+conscience, unbound+rooted

Tier 3 — Adjacent pairs (10 pairs, distance < 0.4):
- citizen+shaper, citizen+friction, alive+unbound, alive+friction
- presence+mender, presence+rooted, embers+rooted, swimmer+cleareyed
- swimmer+unbound, architect+mender

**Fallback content:**
For pairs without handcrafted content, generate analytically using:
- Distance category and what it implies
- Each archetype's superpower and blind spot
- Axis positions (Build/Witness, Root/Transcend)

---

## Reading Type 3: Group (3+ members)

### Structure

```
─────────────────────────────────────
[UTOPIA NAME]

A utopia of [N] worldviews
─────────────────────────────────────

YOUR COMPOSITION

[Radar visualization with all members + center of gravity]

[Breakdown of archetypes present]
• [Archetype] — [count] ([percentage])
• [Archetype] — [count] ([percentage])
...

[1-2 paragraphs analyzing the composition]
- Where does the center of gravity sit?
- Is this a build-heavy or witness-heavy group?
- What's the dominant orientation?

─────────────────────────────────────

YOUR COLLECTIVE SUPERPOWER

[2-3 paragraphs synthesizing what this specific
combination of archetypes enables]
- What can this group do that others can't?
- How do the pieces fit together?
- What emerges from this particular mix?

─────────────────────────────────────

YOUR COLLECTIVE BLIND SPOT

[2-3 paragraphs on what's missing]
- Which perspectives are underrepresented?
- What failure modes does this create?
- Specific risks for this composition

─────────────────────────────────────

MISSING VOICES

[For each archetype not represented:]

[ARCHETYPE NAME]
"[The tagline]"

[1-2 paragraphs on what this voice would add,
what questions they would ask, what the group
is missing without them]

─────────────────────────────────────

INTERNAL TENSIONS

[For each high-tension pair within the group:]

[ARCHETYPE A] × [ARCHETYPE B] — [tension level]
"[One-line thesis]"

[1 paragraph on how this tension will manifest
and how to navigate it productively]

─────────────────────────────────────

THE QUESTION YOUR UTOPIA IS ASKING

[1 paragraph framing what question this
group composition implies]

"[The question itself — specific to this group]"

[1-2 sentences on why this question matters]

─────────────────────────────────────

INVITE SOMEONE

Your utopia would shift most with:

[ARCHETYPE NAME]

[2 paragraphs on why this archetype would
complement the current composition — specific,
not generic]

[ Invite Someone ]    [ Share This Reading ]
─────────────────────────────────────
```

### Algorithm Requirements

**Center of gravity:**
- Average of all member positions on radar
- Determine dominant quadrant

**Collective superpower:**
- Synthesize based on which superpowers are present
- Weight by frequency
- Generate coherent narrative

**Collective blind spot:**
- Identify which blind spots compound (multiple members share)
- Identify which perspectives are completely absent
- Generate specific risk narrative

**Missing voices:**
- List archetypes with 0 members
- Prioritize by how much they'd balance the composition

**Internal tensions:**
- Calculate distance between all pairs
- Surface pairs with distance > 0.8
- Generate tension narrative for each

**The question:**
- Based on the mix of archetypes present
- What philosophical question does this group embody?

---

## Implementation Tasks

### Phase 1: Result Reading Redesign

**Task 1.1:** Rewrite archetype content
- Expand each archetype's description, superpower, blind spot
- Add "How You Got Here" content templates
- Write ally/tension explanations
- Analytical tone throughout

**Task 1.2:** Rebuild result page UI
- Remove step-through navigation
- Single scrollable reading format
- Section-based layout with clear breaks
- Per-section share buttons

**Task 1.3:** Add answer analysis
- Track which answers led to result
- Generate "How You Got Here" dynamically
- Show distinctive answer patterns

### Phase 2: Relationship Reading Redesign

**Task 2.1:** Expand pair content structure
- New data structure for full analytical content
- ~600-800 words per pair
- Dynamic, align, clash, exchange, risk, question

**Task 2.2:** Write priority pair content
- 14 same-archetype pairs
- 8 opposite pairs
- 10 adjacent pairs
- Total: 32 pairs × 700 words = ~22,000 words

**Task 2.3:** Improve fallback generator
- Analytical tone
- Uses distance, superpowers, blind spots, axes
- Generates full reading structure

**Task 2.4:** Rebuild relationship view UI
- Remove card-based sections
- Single scrollable reading
- Mini radar visualization
- Per-section sharing

### Phase 3: Group Reading (New Feature)

**Task 3.1:** Build composition analysis
- Center of gravity calculation
- Archetype frequency analysis
- Dominant orientation detection

**Task 3.2:** Build synthesis algorithms
- Collective superpower generation
- Collective blind spot generation
- Missing voices identification
- Internal tensions detection
- Group question generation

**Task 3.3:** Write group content templates
- Templates for superpower synthesis
- Templates for blind spot warnings
- Templates for missing voice descriptions
- Tension narratives

**Task 3.4:** Build group reading UI
- Full reading layout
- Radar with all members
- Composition breakdown
- All sections from design

### Phase 4: Polish

**Task 4.1:** Section-level sharing
- Share any section as image/link
- Open graph images per section type

**Task 4.2:** Mobile optimization
- Reading format works on mobile
- Appropriate typography scaling
- Touch-friendly interactions

**Task 4.3:** Performance
- Lazy load sections below fold
- Optimize radar rendering
- Fast initial paint

---

## Success Criteria

- [ ] Result reading feels like a substantial personality analysis, not a horoscope
- [ ] Relationship reading gives pairs something specific to discuss
- [ ] Group reading surfaces non-obvious insights about composition
- [ ] Tech-minded users find the analysis credible and interesting
- [ ] Each section is independently shareable
- [ ] Content is specific enough that similar archetypes feel different
- [ ] Readings reference the sci-fi framework credibly

---

## Content Tone Guidelines

**Do:**
- "Your answers clustered around a consistent pattern"
- "Pairs at this distance report higher initial friction"
- "This creates a specific failure mode"
- "In our framework, this maps to..."

**Don't:**
- "The stars suggest..."
- "You might be..."
- "Perhaps you feel..."
- Hedge words, mystical language, horoscope tone

**Voice:** A smart friend who's analyzed the data and is explaining what they found. Direct, clear, specific. Confident but not arrogant.

---

## Open Questions

1. **How much "How You Got Here" detail?** Do we show exact answers or just patterns?

2. **Fallback quality bar:** At what point is generated content good enough vs. needs handcrafted?

3. **Group reading trigger:** 3+ members, or different threshold?

4. **Reading length:** Are these too long? Test with users.

---

## Estimated Effort

| Phase | Effort | Notes |
|-------|--------|-------|
| Phase 1: Result | Medium | Mostly content rewrite + UI refactor |
| Phase 2: Relationship | Large | 22k words of content + UI rebuild |
| Phase 3: Group | Large | New feature, algorithms, content |
| Phase 4: Polish | Small | Sharing, mobile, performance |

The content writing (Phase 2 especially) is the long pole.
