# Viral Sharing & Chart Redesign

> **For Claude:** Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Make the quiz results shareable and viral by creating a clear visual identity (the chart) and optimizing all sharing loops.

**Core Insight:** The radar chart IS the identity — like an astrology birth chart. The axes need to be immediately understandable while having insider language for depth.

---

## Part 1: New Axis Labels

**Apply everywhere the chart appears:** result page, group radar, relationship view, share cards, join page preview.

```
           what could be
               reach
                 ↑

what's true ←————●————→ what's next
 perceive                  build

                 ↓
            what is
              ground
```

**The four orientations:**
| Primary Label | Insider Term | Meaning |
|---------------|--------------|---------|
| what could be | reach | Aspiration, possibility, transcendence |
| what is | ground | Present reality, rootedness, stability |
| what's true | perceive | Observation, understanding, witnessing |
| what's next | build | Action, creation, change-making |

**Language examples:**
- Accessible: "I lean toward *what's true* over *what's next*"
- Insider: "I'm perceive-dominant, reach-leaning"

---

## Part 2: Screenshot Moment (Share Card)

The chart becomes the shareable visual — like a birth chart.

**Share card layout:**

```
┌─────────────────────────────────┐
│                                 │
│        what could be            │
│            reach                │
│              ↑                  │
│                                 │
│ what's true ←—●—→ what's next   │
│  perceive          build        │
│              ↓                  │
│           what is               │
│            ground               │
│                                 │
│  ─────────────────────────────  │
│                                 │
│     SWIMMER IN DEEP WATER       │
│                                 │
│   Perceive 78%  ·  Reach 84%    │
│                                 │
│   Your pull: toward questions   │
│   Your edge: you see what       │
│              builders miss      │
│                                 │
│     livenowclub.com/quiz        │
│                                 │
└─────────────────────────────────┘
```

**Key elements:**
- Chart with labeled axes (your dot highlighted)
- Archetype name
- Percentages for each axis (makes it feel precise/personal)
- "Your pull" + "Your edge" — specific insights
- URL for attribution/virality

**Actions:**
- [ Save Image ] — generates downloadable image
- [ Share ] — native share or copy link

---

## Part 3: Navigation Fixes

### 3.1: Inline Full Reading

**Current:** Tap your card → profile summary → "See Full Result" → separate page (can't get back)

**New:** Tap your card → full reading inline within group view → back button returns to radar

- Remove the intermediate "profile" view entirely
- Reuse `ReadingPage` component with `onBack` callback
- When in group context, change "Create a Group" CTA to "Invite to [Group Name]"

### 3.2: Link to Other's Reading from Relationship View

At bottom of relationship view, after "Share This Reading":

```
Want to understand [Name] better?
[See their full reading →]
```

Tapping shows their full reading inline. Back returns to relationship view.

**Navigation stack:**
Radar → Relationship with Sam → Sam's reading → Back → Relationship → Back → Radar

---

## Part 4: Viral Loops

### Loop 1: Result → Quiz

**Trigger:** Someone views a shared result link without having taken the quiz.

**Detection:** No `quiz-user-id` in localStorage.

**Show CTA card** (after first section, not buried at bottom):

```
What's your worldview?
7 questions. 2 minutes.
[Take the Quiz]
```

**OG metadata:**
- Title: "[Name] is a Swimmer in Deep Water. What are you?"
- Image: Their share card with chart

### Loop 2: Relationship → Quiz

**Trigger:** Someone views a shared relationship without having taken the quiz.

**Show CTA:**

```
See how you relate to [Name]
Take the quiz to discover your dynamic.
[Take the Quiz]
```

**After quiz:** Redirect back to show their relationship with the person who shared.

**Implementation:** Pass `?compare=[userId]` to quiz, store in sessionStorage, redirect after result.

**OG metadata:**
- Title: "[Name] and [Name]: allies with one tension. How would you fit?"
- Image: Relationship share card

### Loop 3: Group Growth

**Join page reframe:**

Instead of abstract "Compare worldviews with [Group]", show:

```
[Name] invited you

They're a Swimmer in Deep Water.
Take the quiz to see how your worldviews fit together.

[radar preview with their dot + empty spot for "you?"]

[Take the Quiz & Join]
```

**After joining:** Auto-show relationship with inviter (immediate payoff).

**Share text includes archetype:**
"I'm a Swimmer in Deep Water. What are you? Take the quiz and join my group."

---

## Part 5: Data Requirements

**New fields needed for share card:**

For each user's result, calculate and store:
- `perceivePercent`: 0-100 position on what's true ↔ what's next axis
- `reachPercent`: 0-100 position on what is ↔ what could be axis

These come from the radar position coordinates, normalized to percentages.

**"Your pull" and "Your edge":**
- Can be derived from archetype data
- Or: add `pull` and `edge` fields to each archetype definition

---

## Implementation Tasks

### Phase 1: Axis Labels
- [ ] Update `RadarChart` component with new axis labels
- [ ] Apply to all instances: result page, group radar, relationship view
- [ ] Ensure labels are readable at all chart sizes

### Phase 2: Share Card
- [ ] Create `ShareCard` component with chart + stats layout
- [ ] Add axis percentage calculation from radar position
- [ ] Add "Save Image" functionality (canvas → PNG download)
- [ ] Add "Your pull" and "Your edge" content to archetypes
- [ ] Style for mobile-first (vertical, screenshot-friendly)

### Phase 3: Navigation Fixes
- [ ] Modify `ReadingPage` to accept `onBack` and `groupContext` props
- [ ] Remove "profile" view from `UtopiaPageClient`
- [ ] Wire tap-your-card to show inline full reading
- [ ] Add "See their full reading" link to `RelationshipStep`

### Phase 4: Viral Loop 1 (Result → Quiz)
- [ ] Detect non-quiz-taker on result page
- [ ] Add CTA card component (positioned after first section)
- [ ] Update OG metadata for shared results

### Phase 5: Viral Loop 2 (Relationship → Quiz)
- [ ] Detect non-quiz-taker on relationship view
- [ ] Add CTA component
- [ ] Implement `?compare=` flow through quiz
- [ ] Auto-redirect after quiz completion

### Phase 6: Viral Loop 3 (Group Growth)
- [ ] Redesign join page with inviter's archetype featured
- [ ] Add radar preview with "you?" placeholder
- [ ] Auto-show relationship with inviter after joining
- [ ] Update share text to include archetype

---

## Success Criteria

- [ ] Every chart shows the new axis labels consistently
- [ ] Share card is screenshot-worthy and generates curiosity
- [ ] Non-quiz-takers see clear CTAs on shared links
- [ ] Navigation within group view never leaves the page (back always works)
- [ ] Each viral loop has a clear path: see content → take quiz → see your version
