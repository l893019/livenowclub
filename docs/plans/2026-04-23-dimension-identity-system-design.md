# Dimension-Based Identity System Design

> **For Claude:** Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Replace the 14 fixed archetypes with 84 dimension-generated identities, providing more nuanced personalization while maintaining the same depth of content.

**Architecture:** Identities are generated from 3 continuous dimensions (Agency, Certainty, Posture). Each identity has pre-written content for instant display, while LLM readings provide hyper-personalized depth based on exact answer patterns.

---

## 1. The Identity Grid

### Dimensions

| Dimension | Low Pole (-1) | High Pole (+1) | What it measures |
|-----------|---------------|----------------|------------------|
| **Agency** | Witness | Builder | Observe/appreciate vs create/shape |
| **Certainty** | Seeking | Settled | Questioning/exploring vs confident/decided |
| **Posture** | Protective | Expansive | Guard/preserve vs grow/risk |

### Identity Components

**Noun** (from Agency score — 7 options):
| Agency Range | Nouns |
|--------------|-------|
| ≥ 0.6 | Architect |
| ≥ 0.3 | Builder |
| ≥ 0.0 | Maker |
| ≥ -0.3 | Shaper |
| ≥ -0.5 | Observer |
| ≥ -0.7 | Noticer |
| < -0.7 | Witness |

**Adjective** (from Certainty × Posture quadrant — 12 options):
| Quadrant | Adjectives (by intensity) |
|----------|---------------------------|
| Settled + Expansive | Confident, Assured, Bold |
| Settled + Protective | Steady, Grounded, Anchored |
| Seeking + Expansive | Adaptive, Curious, Open |
| Seeking + Protective | Careful, Cautious, Measured |

**Total: 7 nouns × 12 adjectives = 84 identities**

### The Full Grid

```
                    PROTECTIVE ←――――――――――――――――――→ EXPANSIVE

                    Careful   Cautious  Measured │ Adaptive  Curious   Open
                    Steady    Grounded  Anchored │ Confident Assured   Bold
        ┌───────────────────────────────────────┼───────────────────────────────┐
        │                                       │                               │
BUILDER │ Careful    Cautious   Measured       │ Adaptive   Curious    Open    │ HIGH
        │ Builder    Builder    Builder        │ Builder    Builder    Builder │ AGENCY
        │                                       │                               │
        │ Steady     Grounded   Anchored       │ Confident  Assured    Bold    │
        │ Builder    Builder    Builder        │ Builder    Builder    Builder │
        ├───────────────────────────────────────┼───────────────────────────────┤
        │                                       │                               │
MAKER   │ Careful    Cautious   Measured       │ Adaptive   Curious    Open    │
        │ Maker      Maker      Maker          │ Maker      Maker      Maker   │
        │                                       │                               │
        │ Steady     Grounded   Anchored       │ Confident  Assured    Bold    │
        │ Maker      Maker      Maker          │ Maker      Maker      Maker   │
        ├───────────────────────────────────────┼───────────────────────────────┤
        │                                       │                               │
OBSERVER│ Careful    Cautious   Measured       │ Adaptive   Curious    Open    │
        │ Observer   Observer   Observer       │ Observer   Observer   Observer│
        │                                       │                               │
        │ Steady     Grounded   Anchored       │ Confident  Assured    Bold    │
        │ Observer   Observer   Observer       │ Observer   Observer   Observer│
        ├───────────────────────────────────────┼───────────────────────────────┤
        │                                       │                               │
WITNESS │ Careful    Cautious   Measured       │ Adaptive   Curious    Open    │ LOW
        │ Witness    Witness    Witness        │ Witness    Witness    Witness │ AGENCY
        │                                       │                               │
        │ Steady     Grounded   Anchored       │ Confident  Assured    Bold    │
        │ Witness    Witness    Witness        │ Witness    Witness    Witness │
        └───────────────────────────────────────┴───────────────────────────────┘
                           SEEKING                         SETTLED
```

---

## 2. Identity Data Format

```typescript
export type Identity = {
  // Core
  key: string;                    // "curious-architect"
  name: string;                   // "Curious Architect"
  color: string;                  // "#7c3aed"

  // Position
  noun: "architect" | "builder" | "maker" | "shaper" | "observer" | "noticer" | "witness";
  adjective: string;              // One of 12 adjectives
  quadrant: "settled-expansive" | "settled-protective" | "seeking-expansive" | "seeking-protective";

  // One-liners
  utopia: string;                 // "Their utopia is an experiment..."
  description: string;            // 2-3 sentences
  pull: string;                   // "toward undiscovered structure"
  edge: string;                   // "you see systems others haven't imagined"
  oneSentence: string;            // Tweetable summary

  // Depth
  superpower: string;             // "building as exploration"
  superpowerExpanded: string;     // 3 paragraphs
  blindSpot: string;              // Short version
  blindSpotExpanded: string;      // 3 paragraphs
  coreBeliefs: string[];          // 4 beliefs
  howYouGotHere: string;          // Paragraph explaining the mapping

  // Dimension-based compatibility (NEW)
  alignsWith: string;             // "other Seekers—you share..."
  tensionWith: string;            // "Settled types—their certainty..."
  growsWith: string;              // "higher-Agency types—they push..."

  // Recommendations
  books: {
    title: string;
    author: string;
    reason: string;
  }[];                            // 3 books

  famousFigures: {
    real: string[];               // 3 real people
    fictional: string[];          // 3 fictional characters
  };
};
```

**Estimated size: ~650 words per identity × 84 = ~55,000 words total**

---

## 3. Image System

### Pattern
`landscape-{noun}-{quadrant}.jpg`

### Required Images (28 total)

| Noun | settled-expansive | settled-protective | seeking-expansive | seeking-protective |
|------|-------------------|--------------------|--------------------|---------------------|
| architect | ◯ | ◯ | ◯ | ◯ |
| builder | ✓ exists | ✓ exists | ✓ exists | ✓ exists |
| maker | ◯ | ◯ | ◯ | ◯ |
| shaper | ◯ | ◯ | ◯ | ◯ |
| observer | ◯ | ◯ | ◯ | ◯ |
| noticer | ◯ | ◯ | ◯ | ◯ |
| witness | ✓ exists | ✓ exists | ✓ exists | ✓ exists |

**Status: 8 exist, 20 needed**

### Image Generation Prompts

**Base style:** Surreal landscape, painterly, dreamlike, no text, 16:9 aspect ratio

**Noun modifiers:**
- Architect: geometric structures, grand scale, designed environments
- Builder: construction in progress, tools, emerging forms
- Maker: workshops, crafted objects, intimate scale
- Shaper: transformation mid-process, clay/fluid forms
- Observer: vantage points, windows, frames within frames
- Noticer: details emphasized, macro perspectives, hidden things revealed
- Witness: vast vistas, solitary figures, timeless moments

**Quadrant modifiers:**
- Settled + Expansive: bright, open horizons, confident colors, gold/orange tones
- Settled + Protective: enclosed but warm, amber light, sanctuary feeling
- Seeking + Expansive: liminal spaces, dawn/dusk, paths leading outward, purple/blue
- Seeking + Protective: misty, cautious, sheltered observation points, cool greens

---

## 4. Color System

Each identity needs a unique-enough color. Strategy: base color on quadrant, vary by noun.

### Quadrant Base Colors
| Quadrant | Base Hue | Feeling |
|----------|----------|---------|
| Settled + Expansive | Orange/Gold | Confident warmth |
| Settled + Protective | Teal/Green | Grounded calm |
| Seeking + Expansive | Violet/Purple | Curious exploration |
| Seeking + Protective | Indigo/Blue | Thoughtful depth |

### Noun Variations
Within each quadrant, vary saturation/lightness by agency level:
- High agency (Architect, Builder): More saturated, brighter
- Mid agency (Maker, Shaper): Medium saturation
- Low agency (Observer, Noticer, Witness): Softer, more muted

---

## 5. Generation Plan

### Phase 1: Content Generation (~3 hours)

Generate all 84 identities using Claude with systematic prompts:

```
For identity: {adjective} {noun}
Position: Agency={noun_level}, Quadrant={quadrant}

Generate:
- utopia (one evocative sentence about their ideal world)
- description (2-3 sentences capturing their orientation)
- superpower + superpowerExpanded (what this combination gives them)
- blindSpot + blindSpotExpanded (the shadow of this combination)
- coreBeliefs (4 beliefs that follow from this position)
- howYouGotHere (explain how quiz answers map to this identity)
- alignsWith, tensionWith, growsWith (dimension-based)
- pull, edge, oneSentence
- books (3 with reasons, matching their orientation)
- famousFigures (3 real, 3 fictional)
```

Process:
1. Generate by quadrant (21 identities per quadrant)
2. Review each batch for voice consistency
3. Edit as needed
4. Compile into `src/lib/identities.ts`

### Phase 2: Image Generation (~2 hours)

Generate 20 remaining landscape images:
1. Write prompts for each noun × quadrant combination
2. Generate via Midjourney/DALL-E/Stable Diffusion
3. Optimize images (WebP, appropriate sizing)
4. Save to `public/wonder/essay/quiz/images/`

### Phase 3: Code Migration

#### 3a. Create new identity system
- Create `src/lib/identities.ts` with all 84 identities
- Create `getIdentityFromDimensions(dimensions: Dimensions): Identity`
- Create `getIdentityImage(identity: Identity): string`

#### 3b. Update quiz result flow
- Replace archetype lookup with identity lookup
- Update `ReadingPage.tsx` to use new identity format
- Update OG image generation to use new identities

#### 3c. Update group features
- Update `TwoPersonView.tsx` to use identities
- Update `RelationshipStep.tsx` to use identities
- Update group dynamics to use dimension-based compatibility

#### 3d. Clean up old system
- Remove old archetype data (keep as reference initially)
- Remove archetype-specific components
- Update any remaining archetype references

---

## 6. Migration Strategy

### Backward Compatibility

Users have localStorage data with old archetype keys. Migration approach:

```typescript
// Map old archetype keys to approximate identities
const ARCHETYPE_TO_IDENTITY: Record<string, string> = {
  "citizen": "confident-builder",      // The Abundant → high agency, settled, expansive
  "shaper": "bold-maker",              // The Builder → mid agency, settled, expansive
  "architect": "curious-architect",    // The Architect → high agency, seeking, expansive
  // ... etc for all 14
};

// On load, if user has old archetype but answers exist:
// 1. Recalculate dimensions from answers
// 2. Get new identity from dimensions
// 3. Update localStorage
```

### URL Compatibility

Old URLs: `/quiz/result?a=citizen`
New URLs: `/quiz/result?i=curious-architect` (or derive from stored answers)

Redirect old URLs to recalculated identity.

---

## 7. Integration with LLM Readings

The pre-written identity content handles **instant display**:
- User finishes quiz → immediately sees their identity name, description, superpower
- No API call needed for basic result

The LLM readings handle **deep personalization**:
- Generated from exact answer patterns (not just identity bucket)
- Used for: pair dynamics, group readings, "go deeper" content
- Cached in Redis by answer hash

**Flow:**
```
Quiz Complete
    ↓
Calculate dimensions from answers
    ↓
Look up identity from dimensions (instant)
    ↓
Display identity card + basic content
    ↓
[Background] Request LLM reading
    ↓
Display personalized depth content when ready
```

---

## 8. File Structure

```
src/lib/
├── identities.ts           # All 84 identities + lookup functions
├── dimensions.ts           # Dimension calculation (exists)
├── reading-prompts.ts      # LLM prompts (exists)
└── archetypes.ts           # OLD - remove after migration

public/wonder/essay/quiz/images/
├── landscape-architect-settled-expansive.jpg
├── landscape-architect-settled-protective.jpg
├── landscape-architect-seeking-expansive.jpg
├── landscape-architect-seeking-protective.jpg
├── landscape-builder-*.jpg      # (4 exist)
├── landscape-maker-*.jpg        # (4 new)
├── landscape-shaper-*.jpg       # (4 new)
├── landscape-observer-*.jpg     # (4 new)
├── landscape-noticer-*.jpg      # (4 new)
└── landscape-witness-*.jpg      # (4 exist)
```

---

## 9. Success Criteria

- [ ] All 84 identities written with consistent voice
- [ ] All 28 images generated and optimized
- [ ] Quiz result shows new identity instantly
- [ ] LLM readings still work for deep personalization
- [ ] Old archetype URLs redirect correctly
- [ ] Group/pair features use new identity system
- [ ] No references to old archetype system in active code

---

## 10. Estimated Effort

| Phase | Task | Time |
|-------|------|------|
| 1 | Generate 84 identity contents | 3 hours |
| 2 | Generate 20 images | 2 hours |
| 3a | Create identity system code | 2 hours |
| 3b | Update quiz result flow | 2 hours |
| 3c | Update group features | 2 hours |
| 3d | Clean up old system | 1 hour |
| 4 | Testing & polish | 2 hours |
| **Total** | | **~14 hours** |

---

## Appendix: Sample Identities

See `docs/plans/sample-identities.md` for 4 complete examples:
- Curious Architect (high agency, seeking/expansive)
- Steady Witness (low agency, settled/protective)
- Bold Shaper (mid agency, settled/expansive)
- Careful Observer (low-mid agency, seeking/protective)
