# Connections Model Design

> **Goal:** Replace upfront utopia creation with a simpler flow: share your personal link → accumulate connections → curate groups from connections.

## The Problem

Current flow has friction at every step:
1. Create a utopia (name it) ← commitment before value
2. Share specific utopia link ← one link per group
3. Hope people complete quiz ← no solo value
4. See group dynamics ← requires multiple people

**Result:** People don't create utopias because it feels like too much upfront.

## The New Model

```
Take quiz
    ↓
Get your identity + personal link
    ↓
Share link anywhere (broadcast)
    ↓
People take quiz → become your "connections"
    ↓
You see 1:1 compatibility with each
    ↓
Curate connections into groups
    ↓
See group dynamics
```

**Key shifts:**
- One permanent link (not per-group)
- Connections are 1:1 relationships
- Groups are curated from connections
- Same person can be in multiple groups

---

## Core Concepts

### Personal Link
Every person gets a permanent link: `/c/[userId]`

When someone clicks:
1. "See your compatibility with [Name]"
2. Take quiz (or already have)
3. See 1:1 reading
4. Get their own link to share

### Connections
A connection is created when either person takes the other's link. It's mutual — both people see each other in their connections list.

**Connections are:**
- Flat (no hierarchy)
- Mutual (automatic both ways)
- Independent of groups

### Groups
Groups are curated subsets of your connections.

**Creating a group:**
1. Select connections from your list
2. Name the group (optional? or required?)
3. See group dynamics

**Groups are:**
- Visible to all members
- Created by any member
- Can overlap (same person in multiple groups)

---

## User Flows

### Flow 1: First-time user (organic)
1. Land on Live Now Club homepage
2. Take quiz
3. See identity result
4. Prompt: "Enter email to save your result" (soft, skippable)
5. See personal link: "Share to see compatibility with friends"
6. Copy/share link

### Flow 2: Clicking someone's link
1. Click `/c/sarah`
2. See: "See your compatibility with Sarah"
3. Take quiz (7 questions)
4. See: 1:1 reading with Sarah
5. Connection created (mutual)
6. Prompt: Save your result + get your own link

### Flow 3: Returning user
1. Click magic link from email
2. See: Your connections (list)
3. See: Your groups
4. Can create new group from connections

### Flow 4: Creating a group
1. Go to "Your Connections"
2. Select 2+ people
3. "Create Group"
4. Name it (e.g., "Book Club")
5. See group dynamics reading

---

## Data Model

### Users
```
users:
  id: string (uuid)
  email: string (nullable, for persistence)
  name: string (nullable)
  answers: string[] (7 answers)
  identity_key: string (e.g., "curious-architect")
  created_at: timestamp
  updated_at: timestamp
```

### Connections
```
connections:
  id: string
  user_a_id: string (FK users)
  user_b_id: string (FK users)
  created_at: timestamp
```

Note: Connections are bidirectional. Query with `WHERE user_a_id = ? OR user_b_id = ?`

### Groups
```
groups:
  id: string
  name: string
  created_by: string (FK users)
  created_at: timestamp
```

### Group Members
```
group_members:
  group_id: string (FK groups)
  user_id: string (FK users)
  added_at: timestamp
```

### Magic Links (for auth)
```
magic_links:
  id: string
  email: string
  token: string (unique)
  expires_at: timestamp
  used: boolean
```

---

## Pages / Routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage, start quiz |
| `/quiz` | Take the quiz |
| `/result` | Your identity result (after quiz) |
| `/c/[userId]` | Someone's compatibility link |
| `/connections` | Your connections list |
| `/groups` | Your groups list |
| `/groups/[groupId]` | Group view with dynamics |
| `/groups/new` | Create group (select connections) |
| `/auth/magic` | Magic link landing |

---

## UI Components

### New Components Needed

**Personal Link Card**
- Shows your link
- Copy button
- Share buttons (native share sheet)

**Connections List**
- List of all your connections
- Each shows: name, identity, 1:1 compatibility preview
- Click → see full 1:1 reading
- Checkbox for multi-select (when creating group)

**Group Creation Flow**
- Multi-select from connections
- Name input
- Create button
- Preview of who's included

**Save Prompt**
- "Enter email to save your connections"
- Email input
- "Save" button
- Skip option

**Magic Link Email**
- "Return to Live Now Club"
- Single button/link

### Existing Components (Keep)
- Quiz flow (7 questions)
- Identity result page
- Dimension spectrums
- 1:1 reading (TwoPersonView)
- Group reading (GroupReadingStep)

---

## Persistence Strategy

**Before email:**
- localStorage stores current user's answers + identity
- Can take quiz, see result, get link
- Can do 1:1 compatibility
- Connections don't persist across devices

**After email:**
- User record created in database
- Connections persist
- Can return via magic link
- Same experience, but durable

**The prompt:**
After seeing result, soft prompt: "Enter email to save your connections and return anytime."

Not a gate — just an upgrade.

---

## What Stays

- Quiz (7 questions, same content)
- Identity system (84 identities from dimensions)
- Dimension calculations
- LLM readings (pair + group prompts)
- TwoPersonView component
- GroupDimensionSpectrum component
- All the identity content (descriptions, shadows, etc.)

## What Goes

- Utopia creation flow
- Named utopia invite links
- Current `/utopia/[slug]` structure
- Current Supabase utopia tables

## What's New

- Personal link (`/c/[userId]`)
- Connections model
- Groups (curated from connections)
- Email-based persistence
- Magic link auth
- Connections list UI
- Group creation UI

---

## Migration

**For existing utopia members:**
- Could migrate utopia members → connections + group
- Or: start fresh, existing utopias become read-only

**Recommendation:** Start fresh. Existing utopias are demo/test data. Clean slate.

---

## Group Visibility

**Groups auto-appear for all members.**

When you create a group with Sarah and Tom:
- It immediately shows in Sarah's "Your Groups"
- It immediately shows in Tom's "Your Groups"
- No invitation or acceptance needed

**Anyone can leave anytime.**
- Leave button on group page
- You disappear from the group
- Group persists for others (unless empty)

**Groups are private — no shareable links.**
- Only members see the group
- To add someone, they must be your connection first
- Different from old utopia model (which had public invite links)

---

## Open Questions

1. **Can you remove a connection?**
   - Yes. Unilateral (you remove them from YOUR list).
   - Doesn't affect their connections or groups.

2. **What if someone doesn't save email?**
   - They can still share link (link is in URL, not account-dependent).
   - But if they clear browser, they lose their identity.
   - Could prompt again later.

3. **Group naming — required or optional?**
   - Lean: optional. Default to member names ("Sarah, Tom & You").

4. **Notifications?**
   - "Sarah checked compatibility with you"
   - "You were added to a group: Book Club"
   - Requires email. Only for users who saved.

---

## Implementation Phases

### Phase 1: Personal Links + Connections
- New route: `/c/[userId]`
- Create user on quiz completion
- Create connection when someone takes your link
- Show 1:1 reading
- Basic connections list

### Phase 2: Email Persistence
- Save email prompt
- Magic link generation/sending
- Magic link auth flow
- Persist user across devices

### Phase 3: Groups
- Group creation from connections
- Group view with dynamics
- Group list

### Phase 4: Polish
- Share buttons
- Notifications (email)
- Connection removal
- Group leaving

---

## Success Metrics

- **Completion rate:** % who finish quiz after clicking someone's link
- **Connection rate:** % who create mutual connection
- **Share rate:** % who share their own link after getting result
- **Return rate:** % who save email and return
- **Group creation rate:** % who create at least one group

---

## Summary

**Before:** Create group → invite → hope they join → see dynamics

**After:** Share link → they connect → you curate groups → see dynamics

Lower friction at every step. Groups emerge from relationships, not speculation.
