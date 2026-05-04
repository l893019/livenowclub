# Quiz Name Entry Design

**Date:** 2026-05-03
**Status:** Approved

## Overview

Add an optional name entry field on the quiz results page that allows users to save their name and generate a shareable link. The field appears in the share section, only prompting when needed, maintaining a low-friction experience.

## Goals

- Users can enter their name on the results page
- Names appear in connections list (instead of "Someone")
- No added friction to the core quiz experience
- Contextual - tied to the share action

## UI Structure & States

**Location:** Quiz result page (`/wonder/essay/quiz/result` - static HTML in `public/wonder/essay/quiz/index.html`)

### State 1: No Name Yet
```
┌─────────────────────────────────────┐
│ Share Your Worldview                │
│                                     │
│ Enter your name to create your      │
│ shareable link                      │
│                                     │
│ [Name input field         ]         │
│ [Email (optional)         ]         │
│                                     │
│ [ Save & Get Link ]                 │
└─────────────────────────────────────┘
```

### State 2: Saving (Loading)
```
┌─────────────────────────────────────┐
│ Share Your Worldview                │
│                                     │
│ [ ⟳ Saving... ]                     │
└─────────────────────────────────────┘
```

### State 3: Has Name (Saved)
```
┌─────────────────────────────────────┐
│ Share Your Worldview                │
│                                     │
│ livenowclub.com/meet/your-slug      │
│                                     │
│ [ Share ] [ Copy Link ]             │
└─────────────────────────────────────┘
```

The section transitions smoothly between states without page reloads.

## Data Flow

### Existing Infrastructure (Reused)

- `userResult` object with `id`, `name`, `email`, `answers`
- `/api/utopia/save-result` endpoint that saves to database and returns `slug`
- `localStorage` for persisting user data
- `shareResult()` function for native/clipboard share

### The Flow

1. **Page load**
   - Check `userResult.name` in localStorage
   - If empty: Show State 1 (name input)
   - If exists: Show State 3 (share buttons)

2. **User enters name & clicks "Save & Get Link"**
   - Update `userResult.name` and `userResult.email` in memory
   - Save to localStorage
   - Call `/api/utopia/save-result` → get back `slug`
   - Store `slug` in localStorage as `userSlug`
   - Transition to State 3

3. **Share button clicked**
   - Use stored `slug` to build link: `/meet/{slug}`
   - Copy to clipboard or trigger native share

### Database

- User record saved with: name, email, answers, slug
- Creates the `/meet/{slug}` page automatically
- Connections can now display real names

## Implementation

### File to Modify

`public/wonder/essay/quiz/index.html` - Add to results screen (around line 1300-1400)

### HTML Structure

```html
<div id="share-section" class="share-section">
  <!-- State 1: No name -->
  <div id="share-no-name" style="display: none;">
    <h3>Share Your Worldview</h3>
    <p class="share-prompt">Enter your name to create your shareable link</p>
    <form id="share-name-form">
      <input type="text" id="share-name" placeholder="Your name" required />
      <input type="email" id="share-email" placeholder="Email (optional)" />
      <button type="submit" class="btn btn--primary">Save & Get Link</button>
    </form>
  </div>

  <!-- State 2: Saving -->
  <div id="share-saving" style="display: none;">
    <button class="btn btn--primary" disabled>⟳ Saving...</button>
  </div>

  <!-- State 3: Has name -->
  <div id="share-ready" style="display: none;">
    <h3>Share Your Worldview</h3>
    <p class="share-link" id="share-link-display"></p>
    <div class="share-buttons">
      <button class="btn btn--primary" onclick="shareResult()">Share</button>
      <button class="btn" onclick="copyShareLink()">Copy Link</button>
    </div>
  </div>
</div>
```

### JavaScript Functions

**New functions needed:**
- `initShareSection()` - Check state on page load, show appropriate view
- `handleShareNameSubmit()` - Save name and get slug
- `copyShareLink()` - Copy link to clipboard

**Existing functions reused:**
- `shareResult()` - Already handles native/clipboard share

### CSS

- Reuse existing `.btn`, `.btn--primary` classes
- Add simple layout styles for `.share-section`, `.share-prompt`, `.share-link`, `.share-buttons`
- Keep minimal and consistent with site design

## Success Criteria

- Users can optionally enter their name on results page
- Name saves to database and generates slug
- Shareable `/meet/{slug}` link works immediately
- Connections list shows real names instead of "Someone"
- No disruption to users who want to skip name entry
- Smooth transitions between states

## Notes

- This reuses the exact same backend flow as the existing share functionality
- No new API endpoints needed
- Maintains low-friction quiz experience
- Progressive disclosure - only shows when relevant
