# Utopia Quiz Journey Redesign

> **For Claude:** Use superpowers:writing-plans to create implementation plan from this design.

**Goal:** Restructure the utopia quiz experience as a visual journey with screenshot-worthy moments at each step. Personal → Group → Relationship dynamics, inspired by The Pattern.

**Core Principles:**
- Every step is screenshottable and beautiful
- The radar is the consistent mental model throughout
- Personal first, then group context, then relationship depth
- Forward/back navigation - it's a journey you control

---

## The Individual Journey

### Step 1: The Reveal

**Screen:** Black background, centered content

**Sequence:**
1. Archetype name fades in, in its color: **"You are a Swimmer in Deep Water"**
2. Pause 2 seconds
3. Island image rises from below
4. Utopia quote fades in: *"Your utopia is a civilization of philosophers. Their single ambition is to reach the deepest level of questioning ever achieved."*

**Screenshot moment:** Archetype name + island + quote. Clean, vertical, shareable.

**Navigation:** Tap or swipe to continue. Back not available (this is the start).

**Duration:** ~5 seconds of animation, then waits for user input.

---

### Step 2: Your Position (The Radar Explained)

**Screen:** Dark background, radar centered

**Sequence:**
1. Island shrinks and moves up
2. Empty radar fades in (just the axes, no dots)
3. Axis labels appear one by one with brief descriptions:
   - Top: **TRANSCEND** - *"reaching beyond"*
   - Bottom: **ROOT** - *"staying grounded"*
   - Right: **BUILD** - *"creating change"*
   - Left: **WITNESS** - *"seeing clearly"*
4. Your dot appears with gentle pulse, in archetype color
5. Position description: *"You live in the questions. While others rush to solve, you stay in the uncertainty—and find wisdom there."*

**Screenshot moment:** Radar with your single dot + position description. "The map of me."

**Navigation:** Back to reveal, forward to card.

**Data needed:**
- Quadrant descriptions for each archetype position
- Position one-liner for each archetype

---

### Step 3: Your Card (The Shareable Artifact)

**Screen:** Light background, card centered

**Layout:**
- Archetype name in color: **"Swimmer in Deep Water"**
- Utopia quote in italics
- Mini radar thumbnail showing your dot position
- Subtle archetype glyph/symbol (optional)
- Small branding: "livenowclub.com/quiz"

**Actions:**
- **Share** - Native share sheet (Stories, Messages, etc.)
- **Continue** - Go deeper or create utopia

**Screenshot moment:** This IS the screenshot. Designed for Instagram Stories - vertical, beautiful, self-contained.

**Navigation:** Back to radar, forward to Go Deeper.

---

### Step 4: Go Deeper (Full Profile)

**Screen:** Scrollable page, light background

**Sections:**
1. **Your Blind Spot**
   - Quote: *"You can sit with a question so long it becomes an excuse to never act."*
   - Shareable on its own

2. **Your People**
   - You'll click with: [Archetype name, tappable]
   - You'll clash with: [Archetype name, tappable]
   - You secretly need: [Archetype name, tappable]

3. **Books for You**
   - 3 recommendations with one-line reasons
   - Link to Bookshop.org

4. **Your Island**
   - Full-size island image

**Screenshot moment:** Blind spot quote is the "ouch, that's accurate" share.

**Navigation:** Back to card, forward to Create/Join.

---

### Step 5: Create or Join

**Screen:** Simple choice, minimal

**Options:**
- **"Build a Utopia"** - Name it, become founder
- **"Join a Utopia"** - Only shows if they have an invite link

**If creating:**
- Text input for utopia name
- Suggested name based on archetype: "The Deep End" for Swimmer
- Create button

**Navigation:** Back to profile, forward to group view.

---

## The Group Journey

### Step 6: Your Group (Populated Radar)

**Screen:** Radar centered, dark or light background option

**Sequence (on first load or when new member joins):**
1. Your dot is already there
2. Other dots appear one by one, each pulsing briefly
3. Names appear next to dots (or on tap for mobile)
4. Center of gravity marker fades in (subtle ring)
5. Group summary appears below: *"5 worldviews. You lean toward Transcend. No one's holding the Root."*

**Interactions:**
- **Tap any dot** → Go to relationship view with that person
- **Scroll down** → Group reading

**Screenshot moment:** The populated radar. "This is us."

**Navigation:** Back to personal card (if just joined), forward to group reading.

---

### Step 7: The Group Reading

**Screen:** Scrollable, below radar (or separate screen)

**Sections:**

1. **Your Strengths**
   - Based on which archetypes are present
   - *"Deep questioners. Builders. You won't settle for easy answers."*

2. **Your Blind Spot**
   - Based on what's overrepresented or missing
   - *"No one here is rooted. When things get hard, who stays?"*

3. **Missing Voices**
   - Top 2-3 archetypes not represented
   - What each would bring: *"A Keeper of Embers would remember why you started."*

4. **Read Together**
   - Book recommendation for the group based on composition

**Screenshot moment:** Group blind spot. "Here's what we're missing."

**Navigation:** Back to radar, tap any member for relationship view.

---

### Step 8: You + Them (Relationship View)

**Screen:** Focused radar with just two dots

**Layout:**
- Header: **"You × Louise"** (names) or **"Swimmer × Shaper"** (archetypes)
- Radar showing just two dots with subtle line between
- Relationship reading below

**The Reading:**
1. **Where you align**
   - 1-2 bullet points
   - *"You both believe the easy answer is usually wrong."*

2. **Where you'll clash**
   - 1-2 bullet points
   - *"You want to sit with it. She wants to build now."*

3. **What you give each other**
   - The gift in the tension
   - *"She'll push you to act. You'll make her question why."*

**Screenshot moment:** Two-dot radar with dynamic summary. "This is us."

**Navigation:** Back to group radar. Swipe left/right for other members.

---

### Step 9: Pair Utopia (Two-Person Special Case)

**When group has exactly 2 members:**

**Screen:** Relationship view becomes the main group view

**Enhanced treatment:**
- Header: **"A Utopia of Two"**
- Subhead: **"Shaper × Swimmer"**
- More prominent radar with the two dots
- Deeper reading (more sections than standard relationship view):
  - Where you align
  - Where you'll clash
  - What you give each other
  - What this pair needs
  - A book for both of you

**Screenshot moment:** The pair card. Designed for couples, close friends, collaborators.

**Navigation:** Back to individual profiles. Invite to add more.

---

## Visual Design Notes

**Color:**
- Dark backgrounds for dramatic moments (reveal, radar explanation)
- Light backgrounds for readable content (profile, group reading)
- Archetype colors are the accent throughout

**Typography:**
- Large, confident type for archetype names
- Italic for utopia quotes
- Small caps for labels (TRANSCEND, ROOT, etc.)

**Animation:**
- Subtle, purposeful - never flashy
- Fade ins, gentle pulses, smooth transitions
- Each element earns its entrance

**Radar consistency:**
- Same visual treatment everywhere it appears
- Mini version on cards, full version on dedicated screens
- Always shows axes labels when there's room

---

## Data Requirements

**New data needed:**

1. **Quadrant descriptions** - What each area of the radar means
   - Transcend + Build: "You want to create new futures"
   - Transcend + Witness: "You see beyond, but don't rush to act"
   - Root + Build: "You build on solid ground"
   - Root + Witness: "You hold what others forget"

2. **Position one-liners** - Personalized for each archetype's radar position
   - Swimmer: "You live in the questions..."
   - Shaper: "You can't stop building..."

3. **Pair dynamics** - For all 91 archetype combinations (14 choose 2, plus 14 same-pairs)
   - Where you align (1-2 points)
   - Where you clash (1-2 points)
   - What you give each other (1 point)

4. **Group analysis logic**
   - Quadrant dominance detection
   - Missing quadrant detection
   - Strength/blind spot copy for each pattern

---

## Success Criteria

1. Every step works as a standalone screenshot
2. The radar becomes intuitive after one viewing
3. Pair dynamics feel like The Pattern - specific, insightful, personal
4. Group readings feel like analysis, not just a list
5. The journey can be completed in under 2 minutes
6. Each share drives curiosity to take the quiz

---

## Additional Design Details

### Returning Users

**First visit:** Full journey (Reveal → Radar → Card → etc.)

**Return visit:**
- Land directly on your Card
- Subtle "Replay intro" link for those who want it again
- If you have utopias: "Your Utopias" pill/badge visible

---

### Share Artifact

**What gets shared:** A generated image, not just a link

**Image specs:**
- 1080x1920px (Instagram Stories format)
- Contains: archetype name, island image, utopia quote, mini radar, subtle branding
- Also copies link to clipboard as backup

**OG images:** Generate for every result URL so link previews look good in Messages/Twitter

---

### Invite Flow

**When someone clicks an invite link:**
1. See the inviter's card first: *"Louise is a Swimmer in Deep Water"*
2. Below: *"She started The Unfinished City. Take the quiz to join."*
3. After completing quiz → Their reveal plays
4. Then group view with their dot appearing among existing members

---

### My Utopias Dashboard

**Access:** Profile icon in corner, or "My Utopias" link at end of journey

**Layout:**
- Simple list of utopias you're in
- Each shows: Mini radar thumbnail, utopia name, member count
- Tap → Goes to that group's radar view

**Philosophy:** Dashboard is utility, not the main experience. Keep it out of the way.

---

### Large Groups (10+ people)

**Radar behavior:**
- Show all dots but cluster overlapping ones
- Your dot always highlighted/on top
- Member count label: "12 people"
- Tap count → Full member list

**Relationships:** Still work via tap on dot or selecting from list

---

### Essay Connection

**Placement:** End of the individual journey (after Card or Go Deeper)

**Treatment:**
- Subtle link: *"This quiz is from an essay on post-scarcity futures. Read it →"*
- Not forced into the main flow
- The quiz stands alone; the essay is for those who want the full context

---

## Implementation Priority

**Phase 1: Individual Journey**
1. Redesign reveal with "You are a..." phrasing
2. Add radar explanation step with axis labels
3. Create shareable card component
4. Restructure profile as scrollable Go Deeper

**Phase 2: Group Radar**
5. Animated dot population on group view
6. Group reading with strengths/blind spots
7. Tap-to-view relationship navigation

**Phase 3: Relationships**
8. Two-person focused view with line between dots
9. Pair dynamics data and copy
10. Enhanced pair utopia treatment

**Phase 4: Polish**
11. Transitions and animations
12. Dark/light mode consistency
13. Share functionality optimization
