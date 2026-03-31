# Group Utopias Design

**Status:** Draft
**Date:** 2026-03-31
**Project:** Live Now Club Quiz Enhancement

---

## Overview

Extend the sci-fi worldview quiz to support group utopias - collaborative spaces where friends can compare archetypes, see what's missing from their collective worldview, and visualize their shared utopia as a procedurally generated planet.

## Current State

The quiz is fully functional:
- 7 questions with scoring matrix
- 14 archetypes with descriptions, blind spots, compatibility, books
- Result page with primary + secondary archetype
- Basic share (copies URL with params)

## What We're Building

### Phase 1: Individual Persistence
Save quiz results locally so users can rejoin utopias later.

### Phase 2: Group Utopias
Create and join shared utopia rooms with friends.

### Phase 3: Planet Visualization
Procedurally generated planet reflecting group composition.

---

## Technical Architecture

### Storage: Vercel KV

```
Keys:
  user:{id}           → UserResult (their quiz result)
  utopia:{slug}       → UtopiaRoom (room data + members)
  user:{id}:utopias   → string[] (slugs of rooms they belong to)
```

### Data Types

```typescript
type UserResult = {
  id: string;                    // uuid
  name: string;                  // display name
  email: string | null;          // optional, for notifications
  archetype: string;             // primary archetype key
  secondaryArchetype: string;    // shadow archetype key
  scores: Record<string, number>; // raw scores for all 14
  answers: string[];             // ['A', 'C', 'B', ...] for 7 questions
  createdAt: string;             // ISO date
};

type UtopiaRoom = {
  slug: string;                  // url-safe slug
  name: string;                  // "The Builders" etc
  createdBy: string;             // user id
  members: UtopiaMemember[];
  createdAt: string;
};

type UtopiaMember = {
  id: string;                    // user id
  name: string;                  // display name
  archetype: string;             // primary archetype
  joinedAt: string;
};
```

### Client-Side Storage

```typescript
// localStorage keys
'quiz-user-id'      → string (uuid, created on first quiz completion)
'quiz-user-result'  → UserResult (full result object)
```

---

## User Flows

### Flow 1: Take Quiz → Save Result

```
1. User completes quiz
2. Generate uuid if not exists
3. Prompt for name (required) and email (optional)
4. Save to localStorage
5. Save to Vercel KV: user:{id}
6. Show result page with "Build a Utopia" button
```

### Flow 2: Create Utopia

```
1. Click "Build a Utopia" on result page
2. Enter utopia name
3. Generate slug from name (slugify + random suffix)
4. Create room in KV with creator as first member
5. Add room slug to user's utopia list
6. Show shareable link
7. Redirect to group utopia page
```

### Flow 3: Join Utopia (New User)

```
1. Click shared link: /wonder/essay/quiz/utopia/[slug]
2. If no local result:
   a. Show "Take the quiz first" with link
   b. After quiz, redirect back to utopia page
3. If has local result but not in room:
   a. Show room preview (name, member count)
   b. "Join this utopia" button
   c. Add to room, redirect to group page
```

### Flow 4: Join Utopia (Existing User)

```
1. Click shared link
2. Has local result, check if already member
3. If member: show group page
4. If not: show join prompt, add on confirm
```

### Flow 5: View Group Utopia

```
1. Load room from KV
2. Display:
   - Planet visualization (canvas)
   - Member list with archetypes
   - Archetype distribution chart
   - Group axes position (averages)
   - Generated group description
   - What's overrepresented
   - What's missing
   - Share link
```

---

## API Routes

All routes under `/api/utopia/`:

### POST /api/utopia/save-result
Save user result to KV after quiz completion.

```typescript
Request: { result: UserResult }
Response: { success: true }
```

### POST /api/utopia/create
Create new utopia room.

```typescript
Request: { name: string, userId: string }
Response: { slug: string, shareUrl: string }
```

### POST /api/utopia/join
Join existing utopia room.

```typescript
Request: { slug: string, userId: string }
Response: { success: true, room: UtopiaRoom }
```

### GET /api/utopia/[slug]
Get utopia room data.

```typescript
Response: { room: UtopiaRoom } | { error: 'not_found' }
```

### GET /api/utopia/user/[userId]/rooms
Get all rooms a user belongs to.

```typescript
Response: { rooms: UtopiaRoom[] }
```

---

## Group Analysis Logic

### Archetype Distribution

```typescript
function getDistribution(members: UtopiaMember[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const m of members) {
    counts[m.archetype] = (counts[m.archetype] || 0) + 1;
  }
  return counts;
}
```

### Overrepresentation (3+ of same)

```typescript
const overrepTemplates: Record<string, string> = {
  shaper: "You have {count} Shapers. This utopia never stops rebuilding. Does anyone here sleep?",
  presence: "You have {count} Keepers of Presence. This utopia runs on tea and eye contact.",
  conscience: "You have {count} Consciences. Nothing gets past this group. Nothing.",
  friction: "You have {count} Friction-seekers. Your utopia has a climbing wall in every room.",
  // ... all 14
};
```

### Missing Archetypes

```typescript
const missingInsights: Record<string, string> = {
  embers: "No one is guarding what came before. You might build something incredible and forget why.",
  mender: "No one wants to fix things. When something breaks, you'll all just build a new one.",
  swimmer: "No one sits with questions. You might solve the wrong problems very efficiently.",
  // ... all 14
};
```

### Group Axes (Average Position)

Each archetype has implicit positions on three axes:
- **Tech orientation:** embrace ↔ skeptical
- **Meaning source:** internal ↔ collective
- **Change orientation:** build ↔ preserve

Average members' positions to get group position.

---

## Planet Visualization

### Approach: Canvas-based procedural generation

Circular planet viewed from above. Base sphere with atmosphere glow. Features layered based on archetype presence.

### Feature Mapping

| Archetype | Visual Feature |
|-----------|----------------|
| Citizen | Parklands, leisure domes |
| Shaper | Construction cranes, scaffolding |
| Architect | Circular amphitheaters, civic structures |
| Presence | Warm light clusters, small dwellings |
| Swimmer | Ocean/water regions |
| Rooted | Gardens, green zones, ivy |
| Conscience | Glass/transparent watchtowers |
| Embers | Archive building, library |
| Friction | Mountain ranges, storm clouds |
| Unbound | Abstract glowing geometry |
| Alive | Multicolored light regions |
| Mender | Workshop structures, visible repairs |
| Clear-Eyed | Solitary tower |
| Between | Raw unformed terrain |
| (Missing) | Dark unexplored patches |

### Rendering Logic

```typescript
function renderPlanet(ctx: CanvasRenderingContext2D, distribution: Record<string, number>, total: number) {
  // 1. Draw base planet (circle with gradient)
  drawBasePlanet(ctx);

  // 2. Draw atmosphere glow
  drawAtmosphere(ctx);

  // 3. For each archetype present, draw features
  for (const [archetype, count] of Object.entries(distribution)) {
    const weight = count / total;
    const feature = archetypeFeatures[archetype];
    drawFeature(ctx, feature, weight);
  }

  // 4. Draw dark patches for missing archetypes
  const missing = allArchetypes.filter(a => !distribution[a]);
  for (const archetype of missing) {
    drawDarkPatch(ctx, archetype);
  }
}
```

### Individual Utopia Illustration

Small version of their archetype's feature, used on result page and share card.

---

## Pages Structure

```
/wonder/essay/quiz/                    # Quiz (existing)
/wonder/essay/quiz/result              # Result page (existing, enhance)
/wonder/essay/quiz/utopia/[slug]       # Group utopia page (new)
/wonder/essay/quiz/my-utopias          # User's utopia dashboard (new)
```

---

## Implementation Phases

### Phase 1: Storage & Persistence (2-3 hours)
- [ ] Set up Vercel KV
- [ ] Add name/email prompt after quiz
- [ ] Save result to localStorage + KV
- [ ] Load existing result on page load

### Phase 2: Create & Join Utopias (3-4 hours)
- [ ] API routes for create/join/get
- [ ] "Build a Utopia" button on result page
- [ ] Create utopia modal (name input)
- [ ] Join flow on utopia page
- [ ] Share link generation

### Phase 3: Group Utopia Page (3-4 hours)
- [ ] Page layout with member list
- [ ] Archetype distribution display
- [ ] Group description generation
- [ ] Overrep/missing analysis
- [ ] Share functionality

### Phase 4: Planet Visualization (4-5 hours)
- [ ] Canvas setup and base planet
- [ ] Feature rendering for each archetype
- [ ] Animation/interactivity
- [ ] Individual archetype illustrations

### Phase 5: Dashboard & Polish (2-3 hours)
- [ ] My utopias page
- [ ] Email capture for notifications
- [ ] OG tags for sharing
- [ ] Mobile optimization

---

## Open Questions

1. **Slug generation:** Use name-based slugs (readable but possible collisions) or random IDs (ugly but unique)?
   - **Recommendation:** Name + 4 random chars, e.g., `the-builders-x7k9`

2. **Room limits:** Max members per room?
   - **Recommendation:** No limit initially, revisit if performance issues

3. **Room deletion:** Can creators delete rooms?
   - **Recommendation:** Not in v1, add later if needed

4. **Email notifications:** Send when someone joins?
   - **Recommendation:** v1 just captures email, v2 adds actual notifications

---

## Files to Create/Modify

```
New files:
  src/app/api/utopia/save-result/route.ts
  src/app/api/utopia/create/route.ts
  src/app/api/utopia/join/route.ts
  src/app/api/utopia/[slug]/route.ts
  src/app/api/utopia/user/[userId]/rooms/route.ts
  src/app/wonder/essay/quiz/utopia/[slug]/page.tsx
  src/app/wonder/essay/quiz/my-utopias/page.tsx
  src/lib/utopia.ts (KV helpers)
  src/lib/planet.ts (canvas rendering)
  src/components/PlanetCanvas.tsx

Modified files:
  public/wonder/essay/quiz/index.html (add name prompt, save to KV)
  src/app/wonder/essay/quiz/result/page.tsx (add "Build a Utopia" button)
```

---

## Ready for Implementation

This design is complete. Next step: Set up Vercel KV and begin Phase 1.
