# Quiz Relationship Content System

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Expand relationship content from 26 thin pair dynamics to 35+ rich, handcrafted readings that make users say "whoa, this is accurate."

**Architecture:** Single source of truth in `/src/lib/archetypes.ts` with expanded content structure and improved fallback generation.

**Tech Stack:** TypeScript, existing archetype system

---

## Context

The quiz relationship view shows two people their dynamic based on their archetypes. Currently:
- Only 26 of 91 possible pairs have handcrafted content
- Content is thin: 1 bullet for align, 1 for clash, 1 sentence for give
- Fallback generator produces generic content
- Archetype data is duplicated in 3 places

## Content Structure

### Current (thin)
```typescript
{
  align: ["One bullet"],
  clash: ["One bullet"],
  give: "One sentence"
}
```

### New (rich)
```typescript
type PairDynamic = {
  thesis: string;           // One poetic sentence capturing the essence
  align: [string, string];  // Shared value + how it shows in practice
  clash: [string, string];  // Fundamental tension + day-to-day manifestation
  give: {
    youToThem: string;      // What first archetype offers
    themToYou: string;      // What second archetype offers
  };
  question: string;         // Specific reflection for this pair
  warning?: string;         // Optional: what to watch out for (high-tension pairs)
}
```

## Priority Tiers

### Tier 1: High-traffic pairs (write first) — 32 pairs

**Same-archetype pairs (14):**
- citizen+citizen
- shaper+shaper
- architect+architect
- presence+presence
- swimmer+swimmer
- rooted+rooted
- conscience+conscience
- embers+embers
- friction+friction
- unbound+unbound
- alive+alive
- mender+mender
- cleareyed+cleareyed
- between+between

**Opposite pairs (8) — distance > 1.0:**
- shaper+embers (future vs. past)
- shaper+rooted (movement vs. stillness)
- friction+rooted (difficulty vs. peace)
- unbound+embers (transcendence vs. memory)
- conscience+citizen (suspicion vs. trust)
- alive+conscience (feeling vs. watching)
- friction+conscience (action vs. vigilance)
- unbound+rooted (leaving vs. staying)

**Adjacent pairs (10) — distance < 0.4:**
- citizen+shaper (both builders)
- citizen+friction (both embrace challenge)
- alive+unbound (both reaching beyond)
- alive+friction (both seek intensity)
- presence+mender (both grounded in care)
- presence+rooted (both value stillness)
- embers+rooted (both honor what is)
- swimmer+cleareyed (both observers)
- swimmer+unbound (both question boundaries)
- architect+mender (both fix systems)

### Tier 2: Fill gaps based on usage data (future)

### Tier 3: Improved fallback generator
- Use blind spots, not just superpowers
- Pair-specific question bank
- Better thesis generation

---

## Tasks

### Task 1: Consolidate archetype data architecture

**Files:**
- Modify: `/src/lib/archetypes.ts`
- Modify: `/src/app/wonder/essay/quiz/result/page.tsx`
- Reference only: `/public/wonder/essay/quiz/index.html` (keep scoring data, remove display data)

**Step 1: Define new types in archetypes.ts**

Add to `/src/lib/archetypes.ts`:
```typescript
export type PairDynamic = {
  thesis: string;
  align: [string, string];
  clash: [string, string];
  give: {
    youToThem: string;
    themToYou: string;
  };
  question: string;
  warning?: string;
};
```

**Step 2: Add books data to archetypes.ts**

Currently books are only in `result/page.tsx`. Move them into the main archetype definitions so each archetype has:
```typescript
{
  name, color, description, utopia, superpower, blindSpot,
  book: { title, author },  // Already exists
  books: [                   // Add full list
    { title, author, reason },
    { title, author, reason },
    { title, author, reason }
  ],
  compatibility: { ally, tension, need }
}
```

**Step 3: Update result/page.tsx to import from archetypes.ts**

Replace the 250-line archetype object with:
```typescript
import { archetypes } from "@/lib/archetypes";
```

Update the page to use the imported data.

**Step 4: Verify build passes**

Run: `npm run build`

**Step 5: Commit**

```bash
git add -A
git commit -m "refactor: consolidate archetype data into single source"
```

---

### Task 2: Expand pair dynamics data structure

**Files:**
- Modify: `/src/lib/archetypes.ts`

**Step 1: Create new pairDynamics object**

Replace existing `detailedPairDynamics` with expanded structure:

```typescript
export const pairDynamics: Record<string, PairDynamic> = {
  // Same-archetype pairs
  "citizen+citizen": {
    thesis: "Two people at peace with abundance — but who notices when peace becomes complacency?",
    align: [
      "You both trust that the world can provide",
      "You give each other permission to enjoy what you have"
    ],
    clash: [
      "Neither of you is naturally inclined to question the system",
      "You may enable each other's blind spots about who gets left out"
    ],
    give: {
      youToThem: "Validation that comfort isn't a moral failing",
      themToYou: "A companion who doesn't need you to justify your ease"
    },
    question: "What would it take to make you uncomfortable? Should anything?",
  },

  // ... more pairs
};
```

**Step 2: Update getPairDynamic function**

```typescript
export function getPairDynamic(a: string, b: string): PairDynamic {
  const key = [a, b].sort().join("+");
  return pairDynamics[key] || generateFallbackDynamic(a, b);
}
```

**Step 3: Update generateFallbackDynamic**

Improve fallback to use blind spots and generate better content:

```typescript
function generateFallbackDynamic(a: string, b: string): PairDynamic {
  const archA = archetypes[a];
  const archB = archetypes[b];
  const { category } = getPairDistance(a, b);

  return {
    thesis: generateThesis(a, b, category),
    align: [
      `You both bring conviction to how you move through the world`,
      `${archA.superpower} meets ${archB.superpower}`
    ],
    clash: [
      `${archA.blindSpot.split('.')[0]}. ${archB.blindSpot.split('.')[0]}.`,
      category === 'far'
        ? "Your worldviews may feel incompatible at first"
        : "Your similarities may hide important differences"
    ],
    give: {
      youToThem: `Your ${archA.superpower.toLowerCase()}`,
      themToYou: `Their ${archB.superpower.toLowerCase()}`
    },
    question: getRelationshipQuestion(a, b),
  };
}
```

**Step 4: Verify build passes**

Run: `npm run build`

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: expand pair dynamics data structure"
```

---

### Task 3: Update RelationshipStep to use new structure

**Files:**
- Modify: `/src/app/wonder/essay/quiz/utopia/[slug]/steps/RelationshipStep.tsx`

**Step 1: Update imports**

```typescript
import {
  archetypes,
  getPairDynamic,
  getPairDistance,
  distanceDescriptions,
  getOpeningThesis
} from "@/lib/archetypes";
```

**Step 2: Use new give structure**

Replace:
```typescript
<p className={styles.giveText}>{dynamic.give}</p>
```

With:
```typescript
<div className={styles.giveCards}>
  <div className={styles.giveCard}>
    <span className={styles.giveName}>{you.name || "You"} gives:</span>
    <p className={styles.giveText}>{dynamic.give.youToThem}</p>
  </div>
  <div className={styles.giveCard}>
    <span className={styles.giveName}>{them.name || "Them"} gives:</span>
    <p className={styles.giveText}>{dynamic.give.themToYou}</p>
  </div>
</div>
```

**Step 3: Add warning section for high-tension pairs**

```typescript
{dynamic.warning && (
  <section className={styles.warningSection}>
    <h3 className={styles.sectionLabel}>Watch Out For</h3>
    <p className={styles.warningText}>{dynamic.warning}</p>
  </section>
)}
```

**Step 4: Update CSS for new sections**

Add to RelationshipStep.module.css:
```css
.giveCards {
  display: flex;
  gap: 12px;
}

.giveCard {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 14px 16px;
}

.giveName {
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(45, 42, 38, 0.5);
  margin-bottom: 6px;
}

.warningSection {
  background: #fff5f5;
  border-radius: 16px;
  padding: 20px 24px;
  margin-bottom: 28px;
  border-left: 3px solid #d64545;
}

.warningText {
  font-size: 1rem;
  color: rgba(45, 42, 38, 0.85);
  line-height: 1.6;
  margin: 0;
}
```

**Step 5: Verify build passes**

Run: `npm run build`

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: update RelationshipStep for rich content structure"
```

---

### Task 4: Write same-archetype pair dynamics (14 pairs)

**Files:**
- Modify: `/src/lib/archetypes.ts`

Write all 14 same-archetype pairs. These explore what happens when two people share the same worldview — echo chambers, competition, deep recognition, or stagnation.

**Content guidelines for same-archetype pairs:**
- Thesis: Capture the doubling effect — amplification or blind spot
- Align: What you deeply understand about each other
- Clash: How sameness creates friction (competition, boredom, codependency)
- Give: What you offer vs. what you mirror back
- Question: Forces self-reflection about the archetype's shadow side

**Example: shaper+shaper**
```typescript
"shaper+shaper": {
  thesis: "Two builders in the same room. The question isn't whether something will get built — it's whose vision wins.",
  align: [
    "You both believe the future is made, not inherited",
    "You give each other permission to tear things down"
  ],
  clash: [
    "You may compete for the same territory without realizing it",
    "Neither of you is naturally inclined to preserve what's working"
  ],
  give: {
    youToThem: "A co-conspirator who matches your pace",
    themToYou: "Someone who won't slow you down with caution"
  },
  question: "What are you building that the other person isn't? What does that tell you?",
  warning: "You may accelerate each other past the point of wisdom."
}
```

Write all 14, then:

**Step: Commit**
```bash
git add -A
git commit -m "feat: add same-archetype pair dynamics (14 pairs)"
```

---

### Task 5: Write opposite pair dynamics (8 pairs)

**Files:**
- Modify: `/src/lib/archetypes.ts`

Write the 8 highest-tension pairs (distance > 1.0). These are the most interesting relationships — maximum creative tension, potential for transformation or conflict.

**Pairs:**
1. shaper+embers
2. shaper+rooted
3. friction+rooted
4. unbound+embers
5. conscience+citizen
6. alive+conscience
7. friction+conscience
8. unbound+rooted

**Content guidelines for opposite pairs:**
- Thesis: Capture the fundamental polarity
- Align: Find the unexpected common ground (there always is some)
- Clash: Be honest about the real tension
- Give: What each genuinely offers the other (not just "balance")
- Question: Something that requires both perspectives to answer
- Warning: Required for these pairs — what to watch out for

**Example: shaper+embers**
```typescript
"shaper+embers": {
  thesis: "One builds the future by racing toward it. The other by refusing to let go of the past.",
  align: [
    "You both believe the present moment is insufficient",
    "You both hold strong convictions about what matters"
  ],
  clash: [
    "The Shaper sees the past as raw material. The Keeper sees it as sacred.",
    "One wants to move fast. The other wants to move carefully."
  ],
  give: {
    youToThem: "You show them that some things deserve to be torn down and rebuilt",
    themToYou: "They show you what gets lost when you move too fast to notice"
  },
  question: "What from the past would you fight to protect? What would you let burn?",
  warning: "You may mistake each other for enemies when you're actually asking the same question from different ends."
}
```

Write all 8, then:

**Step: Commit**
```bash
git add -A
git commit -m "feat: add opposite pair dynamics (8 pairs)"
```

---

### Task 6: Write adjacent pair dynamics (10 pairs)

**Files:**
- Modify: `/src/lib/archetypes.ts`

Write the 10 closest pairs (distance < 0.4). These are natural allies — they understand each other easily but may enable blind spots.

**Pairs:**
1. citizen+shaper
2. citizen+friction
3. alive+unbound
4. alive+friction
5. presence+mender
6. presence+rooted
7. embers+rooted
8. swimmer+cleareyed
9. swimmer+unbound
10. architect+mender

**Content guidelines for adjacent pairs:**
- Thesis: Capture the natural affinity
- Align: What makes you click instantly
- Clash: The subtle friction that emerges over time
- Give: How you complement (not just agree with) each other
- Question: Something that reveals your small differences
- Warning: Optional — only if there's a real risk of enabling blind spots

**Example: presence+mender**
```typescript
"presence+mender": {
  thesis: "One heals by showing up. The other by fixing what's broken. Together, you might actually help.",
  align: [
    "You both believe the work is here, not somewhere else",
    "You both value the specific over the abstract"
  ],
  clash: [
    "The Keeper wants to be with the problem. The Mender wants to solve it.",
    "One may feel the other is too passive — or too impatient"
  ],
  give: {
    youToThem: "You remind them that some things don't need fixing, just witnessing",
    themToYou: "They show you that presence without action can become avoidance"
  },
  question: "When does staying with something become refusing to change it?",
}
```

Write all 10, then:

**Step: Commit**
```bash
git add -A
git commit -m "feat: add adjacent pair dynamics (10 pairs)"
```

---

### Task 7: Test and verify all changes

**Step 1: Run build**
```bash
npm run build
```

**Step 2: Test locally**
```bash
npm run dev
```

Test the following:
1. View a relationship between two archetypes with new content
2. View a relationship that falls back to generated content
3. Verify the "gives" section shows two cards
4. Verify warnings appear for opposite pairs
5. Check that result page still works with imported archetype data

**Step 3: Push and verify on Vercel**
```bash
git push
```

---

## Success Criteria

- [ ] Single source of truth for archetype data in `/src/lib/archetypes.ts`
- [ ] 32 handcrafted pair dynamics with rich content
- [ ] RelationshipStep shows directional "gives" and optional warnings
- [ ] Fallback generator produces better content using blind spots
- [ ] All existing functionality still works
- [ ] Build passes with no TypeScript errors

## Future Work (not in this plan)

- Track which pairs users actually view → prioritize writing those
- Add "Your group's blind spot" to group reading
- Add archetype rarity statistics
- Consider secondary archetype in relationship analysis
