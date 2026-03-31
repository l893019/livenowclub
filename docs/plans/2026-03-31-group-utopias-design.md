# Group Utopias Design

**Status:** Final
**Date:** 2026-03-31
**Project:** Live Now Club Quiz Enhancement

---

## Overview

Extend the sci-fi worldview quiz to support group utopias — collaborative spaces where friends can compare archetypes, see what's missing from their collective worldview, and visualize their shared utopia as a procedurally generated planet.

## Design Principles

- **Playful entry, depth as reward** — easy to join, meaningful to explore
- **Direct voice, like a friend** — not precious, not literary
- **The people are the point** — planet is visual payoff, but comparison/conversation is the purpose

---

## Core Decisions

### Naming
- **Random star name** assigned on creation: Vega, Arcturus, Sirius, Fomalhaut...
- Editable if they want something else
- Display names can repeat; slugs are unique (vega-x7k9, vega-m2p4)
- ~200 curated star names in the pool

### Utopia Page Structure
1. **Planet** (hero) — top-down view, layered illustrated elements
2. **One-liner** — generated description, direct voice
3. **Analysis** — what's present, missing, tensions
4. **Member list** — grouped by archetype

### One-liner Voice
Direct, like a friend telling you what they see:
> "You're heavy on builders, light on preservers. This group moves fast and doesn't look back."

### Member List Format
Grouped by archetype, names within each:
```
SHAPERS OF CHANGE
Sarah, Mike, Jenna

KEEPERS OF PRESENCE
Tom, Lisa
```

### Share Message
"Build a utopia with me" + link

### Join Flow
1. Click shared link
2. See banner: "Sarah invited you to join Vega"
3. Take quiz
4. Auto-added after completion → land on utopia page

### Individual Share Card
**Planet seed** — mini planet with just their archetype's features
- Lonely little world, incomplete, waiting for others
- "My utopia. Come build with me."

### Dashboard
Dedicated page: /wonder/essay/quiz/my-utopias
- Simple grid of mini planets
- Star name + member count
- Click to enter

---

## Planet Visualization

### Approach
- **Flat/top-down view** — circular planet
- **Layered illustrated elements** — match essay's surrealist sci-fi aesthetic
- Each archetype has visual features (transparent PNGs)
- Composited based on group composition
- Missing archetypes = dark unexplored regions

### Archetype Visual Elements

| Archetype | Visual Feature |
|-----------|----------------|
| Citizen | Parklands, leisure domes |
| Shaper | Construction cranes, scaffolding |
| Architect | Circular amphitheaters, civic halls |
| Presence | Warm glowing windows, small dwellings |
| Swimmer | Reflective pools, deep ocean regions |
| Rooted | Gardens, green zones, ivy |
| Conscience | Glass watchtowers |
| Embers | Archive building, library spire |
| Friction | Jagged mountains, storm clouds |
| Unbound | Abstract glowing geometry |
| Alive | Multicolored light regions |
| Mender | Workshop structures, visible repairs |
| Clear-Eyed | Solitary tower |
| Between | Raw unformed terrain |
| (Missing) | Dark unexplored patches |

---

## Generated Copy

### Pair Dynamics (2 people, same archetype)

| Both are... | Copy |
|-------------|------|
| Citizen | "Two at ease. This utopia floats. Who drops anchor?" |
| Shaper | "Two builders. You'll create something—if you stop redesigning it." |
| Architect | "Two systems thinkers. Great structures. Who lives in them?" |
| Presence | "Two keepers. So much holding space. Who makes the first move?" |
| Swimmer | "Two in deep water. You'll question everything. Even this." |
| Rooted | "Two in stillness. Peaceful—but the tea isn't going to make itself." |
| Conscience | "Two watchmen. Nothing escapes you. Exhausting, but safe." |
| Embers | "Two archivists. The past is very well preserved here." |
| Friction | "Two who crave difficulty. This should be interesting." |
| Unbound | "Two transcenders. You've both left the building." |
| Alive | "Two sensation-seekers. Buckle up." |
| Mender | "Two fixers. Everything here will work. Eventually." |
| Clear-Eyed | "Two truth-tellers. No one's getting away with anything." |
| Between | "Two still figuring it out. At least you're not alone." |

### Pair Dynamics (2 people, different archetypes)
Use compatibility data to generate:
> "A Shaper and a Rooted. One can't stop building, one chose stillness. You'll either balance each other or drive each other crazy."

### Overrepresentation (3+ of same)

| Overrep | Copy |
|---------|------|
| Citizen | "Three at ease. But who's watching the edges?" |
| Shaper | "Three builders. Does anyone here sit down?" |
| Architect | "Three systems thinkers. The meeting about the meeting is scheduled." |
| Presence | "Three keepers. So much presence. Who takes action?" |
| Swimmer | "Three philosophers. Beautiful questions. Any answers?" |
| Rooted | "Three in stillness. Peaceful—but does anything happen?" |
| Conscience | "Three watchmen. Nothing gets past you. Maybe lighten up?" |
| Embers | "Three archivists. The past is safe. What about tomorrow?" |
| Friction | "Three who crave difficulty. Everything's a mountain." |
| Unbound | "Three transcenders. Don't forget you still have bodies." |
| Alive | "Three sensation-seekers. Who's driving?" |
| Mender | "Three fixers. You'll repair anything—even what should stay broken." |
| Clear-Eyed | "Three truth-tellers. Brutal honesty in stereo." |
| Between | "Three still figuring it out. Take your time. Really." |

### Missing Archetypes

| Missing | Copy |
|---------|------|
| Citizen | "No one here is at ease. You're all still fighting for something." |
| Shaper | "No one is building. Are you too comfortable with how things are?" |
| Architect | "No one is thinking about structures. Who decides how decisions get made?" |
| Presence | "No one is just... here. Everyone's somewhere else." |
| Swimmer | "No one sits with questions. You might solve the wrong problems efficiently." |
| Rooted | "No one has stopped. When does this group rest?" |
| Conscience | "No one is watching. What might you miss?" |
| Embers | "No one guards the past. You might build something incredible and forget why." |
| Friction | "No one craves difficulty. Comfort might be your blind spot." |
| Unbound | "No one is reaching past the edges. Too earthbound." |
| Alive | "No one is here just to feel. Don't forget to enjoy this." |
| Mender | "No one fixes things. When it breaks, you'll just build new." |
| Clear-Eyed | "No one tells the hard truth. Who calls out the elephant?" |
| Between | "Everyone knows what they believe. You might lack beginner's mind." |

---

## User Flows

### Flow 1: Complete Quiz → Save Result
1. User completes quiz
2. Prompt: "What should we call you?" (name required)
3. Optional: "Get updates when someone joins your utopias?" (email)
4. Generate uuid, save to localStorage + Vercel KV
5. Show result page with "Build a Utopia" button

### Flow 2: Create Utopia
1. Click "Build a Utopia"
2. Assign random star name, show: "Your utopia is called **Vega**. Keep it or change it."
3. Create room in KV, creator as first member
4. Show shareable link + "Build a utopia with me"
5. Redirect to group utopia page

### Flow 3: Join Utopia
1. Click shared link
2. Banner: "Sarah invited you to join Vega"
3. Take quiz (or use existing result if in localStorage)
4. Auto-added to room
5. Land on group utopia page

### Flow 4: View Group Utopia
1. Load room from KV
2. Display: planet, one-liner, analysis, members
3. Share link always visible

---

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| Retake quiz | Auto-update archetype in all utopias |
| Clear cookies | Fresh start, no recovery in v1 |
| Leave utopia | Yes, remove from member list |
| Delete utopia | No, not in v1 |
| Star name collision | Display names can repeat, slugs unique |

---

## Technical Architecture

### Storage: Vercel KV

```
Keys:
  user:{id}           → UserResult
  utopia:{slug}       → UtopiaRoom
  user:{id}:utopias   → string[] (room slugs)
```

### Data Types

```typescript
type UserResult = {
  id: string;
  name: string;
  email: string | null;
  archetype: string;
  secondaryArchetype: string;
  scores: Record<string, number>;
  answers: string[];
  createdAt: string;
};

type UtopiaRoom = {
  slug: string;
  name: string;
  createdBy: string;
  members: UtopiaMember[];
  createdAt: string;
};

type UtopiaMember = {
  id: string;
  name: string;
  archetype: string;
  joinedAt: string;
};
```

### API Routes

```
POST /api/utopia/save-result   — save user result
POST /api/utopia/create        — create utopia
POST /api/utopia/join          — join utopia
POST /api/utopia/leave         — leave utopia
GET  /api/utopia/[slug]        — get utopia data
GET  /api/utopia/user/[id]     — get user's utopias
```

### Client Storage

```
localStorage:
  'quiz-user-id'      → uuid
  'quiz-user-result'  → UserResult
```

---

## Pages

```
/wonder/essay/quiz/                    — Quiz (existing, add name prompt)
/wonder/essay/quiz/result              — Result (existing, add "Build a Utopia")
/wonder/essay/quiz/utopia/[slug]       — Group utopia page (new)
/wonder/essay/quiz/my-utopias          — Dashboard (new)
```

---

## Implementation Phases

### Phase 1: Storage & Identity
- Set up Vercel KV
- Add name/email prompt after quiz
- Save result to localStorage + KV
- Load existing result on page load

### Phase 2: Create & Join
- API routes
- "Build a Utopia" button
- Star name assignment
- Create modal
- Join flow with invite banner

### Phase 3: Group Page
- Page layout (planet placeholder + content)
- One-liner generation
- Analysis (overrep, missing, pairs)
- Member list grouped by archetype
- Share functionality

### Phase 4: Planet Visualization
- Illustrated elements for each archetype
- Canvas compositing
- Individual planet seed for share cards

### Phase 5: Dashboard & Polish
- My utopias page
- Mini planet previews
- OG tags for sharing
- Mobile optimization

---

## Assets Needed

- 14 illustrated archetype elements (transparent PNGs)
- Star names list (~200)
- Planet base/atmosphere artwork
- Share card template

---

## Ready for Implementation

Design complete. Next: Set up Vercel KV, begin Phase 1.
