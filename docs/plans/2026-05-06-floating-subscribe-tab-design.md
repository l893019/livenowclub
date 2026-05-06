# Floating Subscribe Tab Design

**Goal:** Improve newsletter subscription conversion rate by adding a smart, non-intrusive floating subscribe tab that appears across all pages.

**Date:** 2026-05-06

---

## Overview

A persistent subscribe tab mounted on the right edge of the screen that slides open a panel containing the email subscription form. The tab appears after user engagement signals (time or scroll depth), respects dismissals for 7 days, and adapts elegantly to mobile devices.

---

## User Experience Flow

### Desktop Experience

1. **User lands on any page**
   - Tab is not visible initially
   - System tracks two signals: time on page + scroll depth

2. **Trigger conditions** (whichever comes first):
   - 30 seconds on page, OR
   - 50% scroll depth reached

3. **Tab appears**
   - Smooth fade + slide in from right edge
   - Shows "✉️ Subscribe" vertically on edge
   - Subtle pulse animation every 5 seconds

4. **User clicks tab**
   - Panel slides in from right (350px wide)
   - Semi-transparent backdrop dims rest of page
   - Shows full email capture form inside

5. **User subscribes or dismisses**
   - **Subscribe:** Success state shown, then auto-collapse with confetti
   - **Dismiss (✕):** Panel closes, tab hidden for 7 days (localStorage)

### Mobile Experience

1. **Tab position:** Bottom-right corner (not edge-mounted)
2. **Tab display:** Icon only "✉️" (no "Subscribe" text)
3. **Panel behavior:** Slides up from bottom (sheet-style), 90vh height
4. **Close button:** Larger for thumb accessibility

---

## Visual Design

### The Tab

**Positioning:**
- Fixed position, right edge, vertically centered
- Desktop: 120px tall × 40px wide, rotated 90° text
- Mobile: Bottom-right corner, 56px × 56px circle

**Styling:**
- Background: Brand pink (#e8178a) with subtle gradient
- Text: White, sans-serif (site font)
- Border radius: Rounded left edge (desktop) or full circle (mobile)
- Shadow: Subtle elevation shadow
- Animation: Gentle pulse every 5 seconds

**States:**
- Default: Standard appearance
- Hover: Scale 105%, deeper shadow
- After subscribe: "✓ Subscribed" with confetti animation

### The Panel

**Layout:**
- Width: 400px (desktop), 100% (mobile)
- Height: Full viewport height (desktop), 90vh (mobile)
- Padding: 40px generous spacing

**Styling:**
- Background: White with subtle warm gradient
- Shadow: Deep, soft shadow for elevation
- Animation: 0.3s ease-out slide transition

**Content:**
- Reuses existing `EmailCapture` component
- Title: "Subscribe" (large, brand pink)
- Description: "Essays on living now. Delivered occasionally."
- Form: Email input + Subscribe button (existing styles)
- Privacy: "No spam. Unsubscribe anytime."

**Backdrop:**
- Semi-transparent black overlay (rgba(0,0,0,0.5))
- Clicks backdrop → closes panel
- ESC key → closes panel

---

## Technical Implementation

### New Components

**File:** `src/components/SubscribeTab.tsx`

**Responsibilities:**
- Track scroll depth and time on page
- Check localStorage for 7-day dismissal
- Manage tab visibility and panel open/close state
- Render tab button and slide-in panel
- Wrap existing `EmailCapture` component

**State:**
```typescript
const [isVisible, setIsVisible] = useState(false)        // Tab visibility
const [isPanelOpen, setIsPanelOpen] = useState(false)    // Panel open/closed
const [isDismissed, setIsDismissed] = useState(false)    // 7-day dismissal check
```

**Effects:**
- Scroll listener: Track scroll depth percentage
- Timer: Track seconds on page
- Cleanup: Remove listeners on unmount
- localStorage: Check/set dismissal timestamp

**File:** `src/components/SubscribeTab.module.css`

**Includes:**
- Tab positioning and rotation (desktop/mobile)
- Panel slide-in animations
- Backdrop overlay styles
- Pulse animation keyframes
- Mobile responsive breakpoints

### Integration Points

**Root Layout:** `src/app/layout.tsx`
- Add `<SubscribeTab />` to render on all pages
- Optional: Add exclusion logic for admin/stats pages

**Existing Components:**
- Reuses `EmailCapture` component (no changes needed)
- Reuses `/api/subscribe` endpoint
- Shares email capture dismissed localStorage logic

**Analytics:**
- Already tracks `email_signup` event (existing)
- Consider adding `subscribe_tab_shown` event
- Consider adding `subscribe_tab_dismissed` event

### localStorage Keys

**New key:** `subscribe-tab-dismissed-until`
- Stores timestamp (Date.now() + 7 days)
- Checked on mount to determine initial visibility
- Cleared after successful subscription

**Existing key:** `email-capture-dismissed`
- Keep existing behavior for inline EmailCapture components
- Don't conflict with tab dismissal logic

---

## Behavior Logic

### Trigger Conditions

```
Show tab when:
  - NOT dismissed in last 7 days AND
  - (30 seconds elapsed OR 50% scroll depth reached)
```

### Dismissal Behavior

**User clicks ✕ button:**
1. Close panel
2. Hide tab
3. Set localStorage: `subscribe-tab-dismissed-until` = now + 7 days
4. Tab won't show again for 7 days

**User subscribes:**
1. Show success state
2. After 2 seconds, collapse panel
3. Show confetti animation on tab
4. Clear dismissal timestamp (allow showing again)
5. Tab shows "✓ Subscribed" for remainder of session

**User clicks backdrop or ESC:**
1. Close panel
2. Keep tab visible (not a full dismissal)

### Mobile Adaptations

**Tab position:** Bottom-right corner (fixed)
**Tab size:** 56px × 56px circular button
**Tab content:** Icon only "✉️"
**Panel animation:** Slide up from bottom (not right)
**Panel height:** 90vh
**Close button:** Larger (44px × 44px minimum tap target)

---

## Testing Considerations

**Desktop:**
- Tab appears after 30s on static page
- Tab appears after scrolling 50% on long page
- Tab click opens panel smoothly
- Backdrop click closes panel
- ESC key closes panel
- Dismiss hides tab for 7 days
- Subscribe shows success → confetti

**Mobile:**
- Tab renders in bottom-right corner
- Icon-only display is clear
- Panel slides up from bottom
- Touch gestures work smoothly
- Close button is thumb-accessible

**Edge cases:**
- Very short pages (< 50% scrollable)
- Quick scroll to 50% in < 1 second
- Multiple tabs open (localStorage sync)
- Dismissal expiration at exactly 7 days

---

## Performance Considerations

- **Scroll listener:** Throttled to avoid jank (max 1 check per 100ms)
- **localStorage:** Read once on mount, write only on dismiss/subscribe
- **Animation:** Use CSS transforms (GPU accelerated)
- **Component lazy loading:** Not needed (small component)

---

## Accessibility

- **Tab:** Clear label "Subscribe" (visible text or aria-label)
- **Panel:** Focus trap when open (tab cycles within panel)
- **Close button:** Accessible name "Close subscribe panel"
- **ESC key:** Standard escape behavior
- **Screen readers:** Announce panel open/close states
- **Keyboard navigation:** All interactive elements focusable

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
- CSS features: transforms, transitions, fixed positioning
- JS features: localStorage, addEventListener, requestAnimationFrame
- Graceful degradation: If JS disabled, inline forms still work

---

## Success Metrics

**Track these to measure improvement:**
- Subscribe tab impressions (how many times shown)
- Subscribe tab clicks (click-through rate)
- Subscribe conversions from tab (conversion rate)
- Dismissal rate (how many dismiss vs subscribe)
- Compare: tab conversions vs inline form conversions

**Target:** Increase overall newsletter signups by 20-30% within first month

---

## Future Enhancements (Not in v1)

- A/B test different trigger timings (20s vs 30s, 40% vs 50%)
- Personalized copy based on quiz identity
- Show recent subscriber count ("Join 847 readers")
- Different messaging for returning visitors
- Tab color variations based on page context
- Mobile swipe-down gesture to close panel
