# Utopia Flow Redesign

## Overview

Transform the quiz result experience from individual results with an optional "shared utopia" feature into a cohesive flow where every quiz-taker creates a named utopia they can grow by inviting others.

---

## User Flows

### Flow A: Creating a New Utopia (Person 1)

```
1. Take quiz
   └─> Answer questions (existing flow)

2. See result
   └─> "You are: Citizen of Abundance"
   └─> Archetype card, description, blind spot

3. Name your utopia (NEW - on same page)
   └─> Input field with suggested name pre-filled
   └─> "Name your utopia: [The Abundant Commons]"
   └─> [Create Utopia] button

4. Your utopia page (NEW)
   └─> Shows utopia name, founder, population: 1
   └─> Invite link prominent
   └─> Your archetype details
   └─> "What this utopia is missing" (other archetypes)
```

### Flow B: Joining an Existing Utopia (Person 2+)

```
1. Click invite link
   └─> /utopia/[slug]/join

2. See invite landing (NEW)
   └─> "You've been invited to The Abundant Commons"
   └─> "Founded by Louise, a Citizen of Abundance"
   └─> [Take the Quiz to Enter]

3. Take quiz
   └─> Same questions, but context is "joining"

4. See combined utopia (NEW)
   └─> Shows all members + archetypes
   └─> Group dynamics (align, clash, missing)
   └─> Can invite more people
```

### Flow C: Returning to Your Utopia

```
1. Direct URL: /utopia/[slug]
   └─> Shows current state
   └─> All members
   └─> Group dynamics
   └─> Invite link
```

---

## Pages

### 1. Quiz Result Page (Modified)
**Path:** `/wonder/essay/quiz/result?a=[archetype]&s=[shadow]`

**Changes:**
- Add "Name your utopia" section below the result
- Pre-fill with suggested name based on archetype
- [Create Utopia] button creates the utopia and redirects

**New section (after Share button):**
```
┌─────────────────────────────────────────────┐
│  Create Your Utopia                         │
│                                             │
│  Name it:                                   │
│  ┌─────────────────────────────────────┐   │
│  │ The Abundant Commons                 │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  [Create Utopia →]                          │
│                                             │
│  Invite others to see how your              │
│  worldviews combine.                        │
└─────────────────────────────────────────────┘
```

### 2. Utopia Page (New)
**Path:** `/wonder/essay/quiz/utopia/[slug]`

**States:**

**Solo (1 person):**
```
The Abundant Commons
────────────────────
Founded by Louise

Population: 1

┌─────────────────────────────────────────────┐
│ 👤 Louise · Citizen of Abundance (founder)  │
│    [archetype card with image]              │
└─────────────────────────────────────────────┘

What this utopia is missing:
Someone who grounds you in stillness.
Someone who sees what you might overlook.
Someone who challenges your comfort.

────────────────────

Invite someone in:
┌─────────────────────────────────────────────┐
│ livenowclub.com/utopia/abc123/join     [📋] │
└─────────────────────────────────────────────┘
```

**Duo (2 people):**
```
The Abundant Commons
────────────────────
Population: 2

┌──────────────────┐  ┌──────────────────┐
│ Louise           │  │ Alex             │
│ Citizen of       │  │ Keeper of        │
│ Abundance        │  │ Presence         │
│ (founder)        │  │                  │
└──────────────────┘  └──────────────────┘

Where you align:
You both believe in the power of showing up.

Where you'll clash:
Louise optimizes for freedom; Alex optimizes for attention.
One of you may feel unseen.

What you're both missing:
Someone who questions whether this is working.
Someone who remembers what came before.

Books for this utopia:
- The Diamond Age (Stephenson) — speaks to both of you
- Klara and the Sun (Ishiguro) — for the presence you share

────────────────────

Invite someone else:
┌─────────────────────────────────────────────┐
│ livenowclub.com/utopia/abc123/join     [📋] │
└─────────────────────────────────────────────┘
```

**Group (3+ people):**
```
The Abundant Commons
────────────────────
Population: 4

┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│Louise  │ │Alex    │ │Sam     │ │Jordan  │
│Citizen │ │Presence│ │Shaper  │ │Mender  │
│founder │ │        │ │        │ │        │
└────────┘ └────────┘ └────────┘ └────────┘

This utopia's character:
Builders and caretakers. You'll create things and tend to them.
The energy is forward-moving but grounded.

The dominant voices:
Citizen of Abundance (1), Keeper of Presence (1),
Shaper of Change (1), Mender of What Remains (1)

Potential fault lines:
The Shaper wants to tear down; the Mender wants to repair.
Watch for tension between movement and maintenance.

What you're all missing:
No one here is watching for what could go wrong.
Consider inviting a Conscience or Clear-Eyed voice.

────────────────────

Invite someone else:
┌─────────────────────────────────────────────┐
│ livenowclub.com/utopia/abc123/join     [📋] │
└─────────────────────────────────────────────┘
```

### 3. Join Page (New)
**Path:** `/wonder/essay/quiz/utopia/[slug]/join`

```
You've been invited to

The Abundant Commons
────────────────────

Founded by Louise, a Citizen of Abundance

Population: 1 — you'll be the second to enter.

┌─────────────────────────────────────────────┐
│  [Join This Utopia →]                       │
│                                             │
│  Take the quiz and see how your             │
│  worldviews combine with Louise's.          │
└─────────────────────────────────────────────┘

or

┌─────────────────────────────────────────────┐
│  [Build Your Own →]                         │
│                                             │
│  Take the quiz and create your own          │
│  utopia to invite others into.              │
└─────────────────────────────────────────────┘
```

If population > 1:
```
Population: 3 — join Louise, Alex, and Sam.
```

**After quiz completion:**
- If they chose "Join This Utopia" → redirect to combined utopia page
- If they chose "Build Your Own" → redirect to result page with "Name your utopia" prompt

### 4. Quiz Page (Modified)
**Path:** `/wonder/essay/quiz` or `/wonder/essay/quiz?join=[slug]`

**Changes:**
- If `?join=[slug]` param exists, store it in sessionStorage
- After quiz completion:
  - If join param exists → redirect to utopia page, save result to that utopia
  - If no join param → redirect to result page with "Name your utopia" prompt

**Flow from join page:**
```
Join page → user clicks "Join This Utopia"
  → /wonder/essay/quiz?join=abc123
  → complete quiz
  → POST /api/utopia/abc123/join
  → redirect to /wonder/essay/quiz/utopia/abc123

Join page → user clicks "Build Your Own"
  → /wonder/essay/quiz (no param)
  → complete quiz
  → redirect to /wonder/essay/quiz/result?a=X&s=Y
  → they name and create their own utopia
```

---

## Data Model

### Utopia
```typescript
type Utopia = {
  id: string;           // uuid
  slug: string;         // url-friendly, e.g., "abc123"
  name: string;         // "The Abundant Commons"
  createdAt: Date;
  founderId: string;    // first person's userId
  members: UtopiaMember[];
};
```

### UtopiaMember
```typescript
type UtopiaMember = {
userId: string;       // localStorage userId
  userName: string | null; // optional display name
  archetype: string;    // "citizen", "presence", etc.
  shadow: string | null;
  joinedAt: Date;
  isFounder: boolean;
};
```

---

## API Endpoints

### POST /api/utopia/create
Create a new utopia.

**Request:**
```json
{
  "name": "The Abundant Commons",
  "userId": "uuid-from-localstorage",
  "userName": "Louise",
  "archetype": "citizen",
  "shadow": "presence"
}
```

**Response:**
```json
{
  "success": true,
  "utopia": {
    "id": "...",
    "slug": "abc123",
    "name": "The Abundant Commons",
    "members": [...]
  }
}
```

### GET /api/utopia/[slug]
Get utopia details.

**Response:**
```json
{
  "success": true,
  "utopia": {
    "id": "...",
    "slug": "abc123",
    "name": "The Abundant Commons",
    "members": [
      {
        "userId": "...",
        "userName": "Louise",
        "archetype": "citizen",
        "shadow": "presence",
        "isFounder": true,
        "joinedAt": "..."
      }
    ]
  }
}
```

### POST /api/utopia/[slug]/join
Add a member to the utopia.

**Request:**
```json
{
  "userId": "uuid-from-localstorage",
  "userName": "Alex",
  "archetype": "presence",
  "shadow": "rooted"
}
```

**Response:**
```json
{
  "success": true,
  "utopia": { ... }
}
```

---

## Suggested Names by Archetype

```typescript
const suggestedNames: Record<string, string> = {
  citizen: "The Abundant Commons",
  shaper: "The Unfinished City",
  architect: "The People's House",
  presence: "The Gathering Place",
  swimmer: "The Deep End",
  rooted: "The Still Garden",
  conscience: "The Watchtower",
  embers: "The Memory Palace",
  friction: "The Proving Ground",
  unbound: "The Infinite Edge",
  alive: "The Feeling World",
  mender: "The Repair Shop",
  cleareyed: "The Clear View",
  between: "The Threshold"
};
```

---

## Group Dynamics Logic

### Alignment Detection
Check if archetypes share compatible values:
- Citizen + Alive = both embrace abundance
- Presence + Rooted = both value stillness
- Architect + Mender = both focus on collective care

### Clash Detection
Check for known tensions:
- Shaper vs Rooted (movement vs stillness)
- Conscience vs Citizen (suspicion vs trust)
- Unbound vs Presence (transcendence vs embodiment)

### Missing Voices
Identify which archetype categories are absent:
- No "watchdog" (Conscience, Cleareyed)
- No "grounding" (Rooted, Presence)
- No "forward energy" (Shaper, Friction)

---

## Implementation Steps

### Phase 1: Core Flow
1. [ ] Create utopia data model and storage
2. [ ] Build POST /api/utopia/create endpoint
3. [ ] Build GET /api/utopia/[slug] endpoint
4. [ ] Build POST /api/utopia/[slug]/join endpoint
5. [ ] Add "Name your utopia" section to result page
6. [ ] Create utopia page (solo state)
7. [ ] Create join page

### Phase 2: Quiz Integration
8. [ ] Modify quiz to accept ?join=[slug] param
9. [ ] After quiz with join param, redirect to utopia page
10. [ ] Save result to utopia on completion

### Phase 3: Group Dynamics
11. [ ] Implement alignment detection logic
12. [ ] Implement clash detection logic
13. [ ] Implement missing voices logic
14. [ ] Build duo state UI
15. [ ] Build group state UI

### Phase 4: Polish
16. [ ] Add copy link button with feedback
17. [ ] Add OG image generation for utopia pages
18. [ ] Add "Your role in this utopia" for each member
19. [ ] Mobile responsive testing
20. [ ] Remove old "Build Shared Utopia" flow

---

## Migration

### What to Remove
- `BuildUtopiaButton.tsx` component
- Old `/api/utopia/create` logic (replace with new)
- "Build a Shared Utopia" CTA from result page

### What to Keep
- Existing utopia page structure (refactor)
- User ID localStorage pattern
- Archetype data

---

## Open Questions

1. **Do users need accounts?**
   No — continue using localStorage userId. Accept that people on new devices won't be linked.

2. **Can someone join multiple utopias?**
   Yes — their archetype gets added to each.

3. **Can someone leave a utopia?**
   Future feature — not in v1.

4. **What if someone retakes the quiz?**
   Their archetype updates in all utopias they're part of.

5. **Name collisions?**
   Allow duplicate names — the slug is unique.

6. **Name editing?**
   Future feature — founder can rename.
