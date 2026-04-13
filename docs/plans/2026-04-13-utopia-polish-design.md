# Utopia Visual Polish & Mobile UX

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the utopia feature feel fluid, responsive, and native on mobile.

**Architecture:** CSS-first approach using CSS transitions/animations where possible, minimal JS for swipe gestures. No heavy animation libraries.

**Tech Stack:** CSS modules, CSS custom properties for timing, touch-event handling for swipe.

---

## Task 1: View Transitions

**Problem:** Switching between views (radar → relationship → profile → their-reading) is instant and jarring.

**Solution:** Wrap view content in transition containers with fade + subtle slide.

**Files:**
- Modify: `src/app/wonder/essay/quiz/utopia/[slug]/UtopiaPageClient.tsx`
- Modify: `src/app/wonder/essay/quiz/utopia/[slug]/UtopiaPageClient.module.css`

**Approach:**
1. Add a `viewTransition` wrapper div around each view's content
2. Use CSS transitions with opacity and transform
3. Track previous view to determine slide direction (left/right)

**CSS to add:**
```css
.viewContainer {
  animation: fadeSlideIn 0.3s ease-out;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Acceptance criteria:**
- Views fade in with subtle upward slide
- No jarring instant switches
- Animation completes in 300ms (fast enough to not feel slow)

---

## Task 2: Content Entrance Animations

**Problem:** Sections within views appear all at once. No visual hierarchy or flow.

**Solution:** Stagger section appearances using CSS animation-delay.

**Files:**
- Modify: `src/app/wonder/essay/quiz/utopia/[slug]/TwoPersonView.module.css`
- Modify: `src/app/wonder/essay/quiz/utopia/[slug]/TwoPersonView.tsx`
- Modify: `src/app/wonder/essay/quiz/utopia/[slug]/steps/RelationshipStep.module.css`
- Modify: `src/app/wonder/essay/quiz/utopia/[slug]/steps/RelationshipStep.tsx`

**Approach:**
1. Add `.stagger` class to sections
2. Use CSS custom property `--stagger-index` for delay calculation
3. Apply via inline style: `style={{ '--stagger-index': index }}`

**CSS to add:**
```css
.stagger {
  opacity: 0;
  animation: staggerIn 0.4s ease-out forwards;
  animation-delay: calc(var(--stagger-index, 0) * 0.08s);
}

@keyframes staggerIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Acceptance criteria:**
- Sections fade in sequentially (80ms apart)
- Header appears first, then radar, then content sections
- Total stagger time under 600ms for typical content

---

## Task 3: Radar Dot Hover Enhancement

**Problem:** Dots in the SVG radar don't give visual feedback when hovered (only the invisible overlay buttons do).

**Solution:** Add CSS hover state to the SVG dots themselves, coordinated with overlay button hover.

**Files:**
- Modify: `src/components/RadarChart.tsx`
- Modify: `src/components/RadarChart.module.css`

**Approach:**
1. Add `data-hovered` attribute to dot circles based on parent hover state
2. Add CSS transition for radius and glow effect
3. Coordinate with existing overlay button hover state

**CSS to add:**
```css
.userDot {
  transition: r 0.2s ease, filter 0.2s ease;
}

.userDotHovered {
  filter: drop-shadow(0 0 8px currentColor);
}
```

**Acceptance criteria:**
- Dots visually respond to hover with subtle glow
- Transition is smooth (200ms)
- Works on both direct SVG hover and overlay button hover

---

## Task 4: Swipe Gestures for Relationship Navigation

**Problem:** Relationship view has prev/next buttons but no touch swipe support.

**Solution:** Add touch swipe detection to navigate between relationships.

**Files:**
- Modify: `src/app/wonder/essay/quiz/utopia/[slug]/steps/RelationshipStep.tsx`
- Create: `src/hooks/useSwipe.ts`

**Approach:**
1. Create a simple `useSwipe` hook that detects horizontal swipe
2. Hook returns `onTouchStart`, `onTouchEnd` handlers
3. Threshold: 50px horizontal movement, <30deg from horizontal
4. Call `onNext`/`onPrev` on successful swipe

**Hook implementation:**
```typescript
export function useSwipe(onSwipeLeft?: () => void, onSwipeRight?: () => void) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;

    if (Math.abs(dx) > 50 && Math.abs(dy) < Math.abs(dx)) {
      if (dx > 0 && onSwipeRight) onSwipeRight();
      if (dx < 0 && onSwipeLeft) onSwipeLeft();
    }
    touchStart.current = null;
  };

  return { onTouchStart, onTouchEnd };
}
```

**Acceptance criteria:**
- Swipe left → next member
- Swipe right → previous member
- Only triggers on clear horizontal swipes (not scrolling)
- Works on iOS Safari and Chrome Android

---

## Task 5: Smooth Scroll Behavior

**Problem:** No smooth scrolling when navigating within long content.

**Solution:** Add CSS smooth scroll and scroll-margin for fixed headers.

**Files:**
- Modify: `src/app/wonder/essay/quiz/utopia/[slug]/UtopiaPageClient.module.css`
- Modify: `src/app/wonder/essay/quiz/utopia/[slug]/steps/RelationshipStep.module.css`

**CSS to add:**
```css
html {
  scroll-behavior: smooth;
}

.section {
  scroll-margin-top: 80px; /* Account for fixed header */
}
```

**Acceptance criteria:**
- Page scrolls smoothly when using anchor links
- Sections have proper scroll margin for fixed header
- Doesn't interfere with normal scrolling

---

## Task 6: Button Active States

**Problem:** Buttons don't give tactile feedback on tap (especially important for mobile).

**Solution:** Add :active states with scale transform for immediate feedback.

**Files:**
- Modify: `src/app/wonder/essay/quiz/utopia/[slug]/UtopiaPageClient.module.css`
- Modify: `src/app/wonder/essay/quiz/utopia/[slug]/steps/RelationshipStep.module.css`

**CSS to add:**
```css
.btnPrimary:active {
  transform: scale(0.97);
}

.btnSecondary:active {
  transform: scale(0.97);
}

.swipeButton:active:not(:disabled) {
  transform: scale(0.92);
  background: rgba(232, 23, 138, 0.1);
}
```

**Acceptance criteria:**
- All buttons show immediate visual feedback on tap
- Scale down is subtle (3-8%)
- Feedback is instant (no delay)

---

## Implementation Order

1. **Task 6: Button Active States** — Quick win, immediate feel improvement
2. **Task 5: Smooth Scroll** — Quick win, simple CSS
3. **Task 1: View Transitions** — Medium effort, big impact
4. **Task 2: Content Entrance** — Medium effort, adds polish
5. **Task 3: Radar Dot Hover** — Small enhancement
6. **Task 4: Swipe Gestures** — More effort, nice-to-have

---

## Testing Checklist

- [ ] Test on iOS Safari (most restrictive for touch/animation)
- [ ] Test on Chrome Android
- [ ] Test view transitions don't cause layout shift
- [ ] Test swipe doesn't interfere with scroll
- [ ] Test animations respect prefers-reduced-motion
- [ ] Verify all touch targets remain 44px minimum
