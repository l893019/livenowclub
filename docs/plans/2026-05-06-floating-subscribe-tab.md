# Floating Subscribe Tab Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a smart floating subscribe tab that slides in from the right edge after user engagement, improving newsletter conversion rates.

**Architecture:** New SubscribeTab component wraps existing EmailCapture component. Uses React hooks for scroll/timer tracking, localStorage for 7-day dismissal memory, and CSS transforms for smooth animations. Renders in root layout to appear across all pages.

**Tech Stack:** React, TypeScript, Next.js 14 App Router, CSS Modules

---

## Task 1: Create Base SubscribeTab Component

**Files:**
- Create: `src/components/SubscribeTab.tsx`
- Create: `src/components/SubscribeTab.module.css`

**Step 1: Create component file with basic structure**

Create `src/components/SubscribeTab.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import styles from './SubscribeTab.module.css';
import EmailCapture from './EmailCapture';

export default function SubscribeTab() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  return null; // Will implement render in next steps
}
```

**Step 2: Create CSS module with basic structure**

Create `src/components/SubscribeTab.module.css`:

```css
/* Tab button on edge */
.tab {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9998;
}

/* Panel that slides in */
.panel {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 400px;
  background: white;
  z-index: 9999;
}

/* Backdrop overlay */
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9997;
}
```

**Step 3: Commit base structure**

```bash
git add src/components/SubscribeTab.tsx src/components/SubscribeTab.module.css
git commit -m "feat: add base SubscribeTab component structure"
```

---

## Task 2: Add Trigger Logic (Scroll + Timer)

**Files:**
- Modify: `src/components/SubscribeTab.tsx`

**Step 1: Add scroll depth tracking**

Add to `SubscribeTab.tsx` inside component:

```typescript
// Track scroll depth
useEffect(() => {
  if (isDismissed) return;

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const scrollPercent = ((scrollTop + windowHeight) / documentHeight) * 100;

    // Show tab if scrolled 50% or more
    if (scrollPercent >= 50) {
      setIsVisible(true);
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial state

  return () => window.removeEventListener('scroll', handleScroll);
}, [isDismissed]);
```

**Step 2: Add time-on-page tracking**

Add below scroll effect:

```typescript
// Track time on page
useEffect(() => {
  if (isDismissed) return;

  const timer = setTimeout(() => {
    setIsVisible(true);
  }, 30000); // 30 seconds

  return () => clearTimeout(timer);
}, [isDismissed]);
```

**Step 3: Test triggers manually**

Run dev server:
```bash
npm run dev
```

Expected: Component ready but not rendering yet (returns null)

**Step 4: Commit trigger logic**

```bash
git add src/components/SubscribeTab.tsx
git commit -m "feat: add scroll and timer trigger logic"
```

---

## Task 3: Add localStorage Dismissal Logic

**Files:**
- Modify: `src/components/SubscribeTab.tsx`

**Step 1: Check dismissal on mount**

Add effect at top of component:

```typescript
// Check if dismissed in last 7 days
useEffect(() => {
  const dismissedUntil = localStorage.getItem('subscribe-tab-dismissed-until');
  if (dismissedUntil) {
    const timestamp = parseInt(dismissedUntil, 10);
    if (Date.now() < timestamp) {
      setIsDismissed(true);
    } else {
      // Expired, clear it
      localStorage.removeItem('subscribe-tab-dismissed-until');
    }
  }
}, []);
```

**Step 2: Add dismiss handler**

Add function inside component:

```typescript
const handleDismiss = () => {
  setIsPanelOpen(false);
  setIsVisible(false);

  // Set dismissal for 7 days
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  const dismissedUntil = Date.now() + sevenDays;
  localStorage.setItem('subscribe-tab-dismissed-until', dismissedUntil.toString());

  setIsDismissed(true);
};
```

**Step 3: Add panel close handler (no dismissal)**

Add function:

```typescript
const handleClosePanel = () => {
  setIsPanelOpen(false);
};
```

**Step 4: Commit dismissal logic**

```bash
git add src/components/SubscribeTab.tsx
git commit -m "feat: add 7-day dismissal localStorage logic"
```

---

## Task 4: Implement Tab Button Rendering

**Files:**
- Modify: `src/components/SubscribeTab.tsx`
- Modify: `src/components/SubscribeTab.module.css`

**Step 1: Add tab button JSX**

Replace `return null` with:

```typescript
if (!isVisible || isDismissed) {
  return null;
}

return (
  <>
    <button
      onClick={() => setIsPanelOpen(true)}
      className={styles.tab}
      aria-label="Subscribe to newsletter"
    >
      <span className={styles.tabIcon}>✉️</span>
      <span className={styles.tabText}>Subscribe</span>
    </button>
  </>
);
```

**Step 2: Style tab button**

Update `SubscribeTab.module.css` `.tab` section:

```css
.tab {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  transform-origin: right center;

  background: linear-gradient(135deg, #e8178a 0%, #f4407d 100%);
  color: white;
  border: none;
  border-radius: 8px 8px 0 0;
  padding: 12px 20px;

  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;

  cursor: pointer;
  box-shadow: -2px 2px 12px rgba(232, 23, 138, 0.3);

  display: flex;
  align-items: center;
  gap: 8px;

  transition: all 0.3s ease;
  z-index: 9998;
}

.tab:hover {
  transform: translateY(-50%) rotate(-90deg) scale(1.05);
  box-shadow: -3px 3px 16px rgba(232, 23, 138, 0.4);
}

.tabIcon {
  font-size: 18px;
}

.tabText {
  white-space: nowrap;
}
```

**Step 3: Test tab appearance**

Run: `npm run dev`
Open browser, scroll 50% or wait 30s
Expected: Pink tab appears on right edge with "✉️ Subscribe"

**Step 4: Commit tab rendering**

```bash
git add src/components/SubscribeTab.tsx src/components/SubscribeTab.module.css
git commit -m "feat: implement tab button with styling"
```

---

## Task 5: Implement Slide-in Panel

**Files:**
- Modify: `src/components/SubscribeTab.tsx`
- Modify: `src/components/SubscribeTab.module.css`

**Step 1: Add panel JSX**

Update return statement to include panel:

```typescript
return (
  <>
    <button
      onClick={() => setIsPanelOpen(true)}
      className={styles.tab}
      aria-label="Subscribe to newsletter"
    >
      <span className={styles.tabIcon}>✉️</span>
      <span className={styles.tabText}>Subscribe</span>
    </button>

    {isPanelOpen && (
      <>
        <div
          className={styles.backdrop}
          onClick={handleClosePanel}
        />
        <div className={styles.panel}>
          <button
            onClick={handleDismiss}
            className={styles.closeButton}
            aria-label="Dismiss subscribe panel"
          >
            ✕
          </button>
          <div className={styles.panelContent}>
            <EmailCapture
              context="floating-tab"
              title="Subscribe"
              description="Essays on living now. Delivered occasionally."
            />
          </div>
        </div>
      </>
    )}
  </>
);
```

**Step 2: Style panel and backdrop**

Update CSS module:

```css
.panel {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 400px;
  max-width: 100%;

  background: linear-gradient(135deg, #ffffff 0%, #fffbf8 100%);
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);

  animation: slideIn 0.3s ease-out;
  z-index: 9999;

  overflow-y: auto;
}

.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.3s ease-out;
  z-index: 9997;
}

.closeButton {
  position: absolute;
  top: 20px;
  right: 20px;

  background: transparent;
  border: none;
  color: #999;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  padding: 8px;

  transition: color 0.2s;
  z-index: 10;
}

.closeButton:hover {
  color: #333;
}

.panelContent {
  padding: 60px 40px 40px;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

**Step 3: Test panel opening**

Run: `npm run dev`
Click tab
Expected: Panel slides in from right, backdrop appears, close button works

**Step 4: Commit panel implementation**

```bash
git add src/components/SubscribeTab.tsx src/components/SubscribeTab.module.css
git commit -m "feat: implement slide-in panel with EmailCapture"
```

---

## Task 6: Add ESC Key and Focus Management

**Files:**
- Modify: `src/components/SubscribeTab.tsx`

**Step 1: Add ESC key handler**

Add effect:

```typescript
// ESC key closes panel
useEffect(() => {
  if (!isPanelOpen) return;

  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClosePanel();
    }
  };

  window.addEventListener('keydown', handleEsc);
  return () => window.removeEventListener('keydown', handleEsc);
}, [isPanelOpen]);
```

**Step 2: Add body scroll lock when panel open**

Add effect:

```typescript
// Lock body scroll when panel open
useEffect(() => {
  if (isPanelOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  return () => {
    document.body.style.overflow = '';
  };
}, [isPanelOpen]);
```

**Step 3: Test keyboard interaction**

Run: `npm run dev`
Open panel, press ESC
Expected: Panel closes, body scroll unlocks

**Step 4: Commit interaction improvements**

```bash
git add src/components/SubscribeTab.tsx
git commit -m "feat: add ESC key handler and scroll lock"
```

---

## Task 7: Add Mobile Responsive Styles

**Files:**
- Modify: `src/components/SubscribeTab.module.css`

**Step 1: Add mobile tab styles**

Add to CSS module:

```css
/* Mobile: Bottom-right circular button */
@media (max-width: 768px) {
  .tab {
    top: auto;
    bottom: 20px;
    right: 20px;
    transform: none;
    transform-origin: center;

    width: 56px;
    height: 56px;
    border-radius: 50%;
    padding: 0;

    flex-direction: column;
    justify-content: center;
    gap: 0;
  }

  .tab:hover {
    transform: scale(1.1);
  }

  .tabText {
    display: none; /* Icon only on mobile */
  }

  .tabIcon {
    font-size: 24px;
  }
}
```

**Step 2: Add mobile panel styles**

Add to CSS:

```css
@media (max-width: 768px) {
  .panel {
    width: 100%;
    height: 90vh;
    top: auto;
    bottom: 0;
    border-radius: 16px 16px 0 0;

    animation: slideUp 0.3s ease-out;
  }

  .panelContent {
    padding: 40px 24px 24px;
  }

  .closeButton {
    top: 16px;
    right: 16px;
    font-size: 32px;
    padding: 12px;
    /* Larger tap target */
    min-width: 44px;
    min-height: 44px;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
```

**Step 3: Test mobile responsiveness**

Run: `npm run dev`
Resize browser to mobile width
Expected: Circular icon button in bottom-right, panel slides up from bottom

**Step 4: Commit mobile styles**

```bash
git add src/components/SubscribeTab.module.css
git commit -m "feat: add mobile responsive styles"
```

---

## Task 8: Add Pulse Animation

**Files:**
- Modify: `src/components/SubscribeTab.module.css`

**Step 1: Add pulse keyframes**

Add to CSS:

```css
@keyframes pulse {
  0%, 100% {
    box-shadow: -2px 2px 12px rgba(232, 23, 138, 0.3);
  }
  50% {
    box-shadow: -2px 2px 20px rgba(232, 23, 138, 0.6);
  }
}

@media (max-width: 768px) {
  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 4px 12px rgba(232, 23, 138, 0.3);
    }
    50% {
      box-shadow: 0 4px 20px rgba(232, 23, 138, 0.6);
    }
  }
}
```

**Step 2: Apply pulse animation to tab**

Update `.tab` style:

```css
.tab {
  /* ... existing styles ... */
  animation: pulse 3s ease-in-out infinite;
}
```

**Step 3: Test pulse effect**

Run: `npm run dev`
Watch tab
Expected: Subtle pulsing shadow effect every 3 seconds

**Step 4: Commit pulse animation**

```bash
git add src/components/SubscribeTab.module.css
git commit -m "feat: add pulse animation to tab"
```

---

## Task 9: Integrate into Root Layout

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Import SubscribeTab**

Add to imports in `src/app/layout.tsx`:

```typescript
import SubscribeTab from '@/components/SubscribeTab';
```

**Step 2: Add to layout body**

Find the `<body>` tag and add SubscribeTab:

```typescript
<body className={geistSans.className}>
  <Analytics />
  <Navigation />
  {children}
  <SubscribeTab />
</body>
```

**Step 3: Test on all pages**

Run: `npm run dev`
Visit multiple pages (home, quiz, essays, etc.)
Expected: Tab appears on all pages after engagement triggers

**Step 4: Commit integration**

```bash
git add src/app/layout.tsx
git commit -m "feat: integrate SubscribeTab into root layout"
```

---

## Task 10: Add Success State Handling

**Files:**
- Modify: `src/components/SubscribeTab.tsx`

**Step 1: Add subscription success handler**

Add state and handler:

```typescript
const [isSubscribed, setIsSubscribed] = useState(false);

const handleSubscribeSuccess = () => {
  setIsSubscribed(true);

  // Clear dismissal - allow showing again later
  localStorage.removeItem('subscribe-tab-dismissed-until');

  // Close panel after 2 seconds
  setTimeout(() => {
    setIsPanelOpen(false);
  }, 2000);
};
```

**Step 2: Pass success handler to EmailCapture**

Update EmailCapture component usage:

```typescript
<EmailCapture
  context="floating-tab"
  title="Subscribe"
  description="Essays on living now. Delivered occasionally."
  onSuccess={handleSubscribeSuccess}
/>
```

Note: This requires adding onSuccess prop to EmailCapture component

**Step 3: Update tab text when subscribed**

Update tab JSX:

```typescript
<button
  onClick={() => setIsPanelOpen(true)}
  className={styles.tab}
  aria-label="Subscribe to newsletter"
>
  <span className={styles.tabIcon}>{isSubscribed ? '✓' : '✉️'}</span>
  <span className={styles.tabText}>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
</button>
```

**Step 4: Add onSuccess prop to EmailCapture**

Modify `src/components/EmailCapture.tsx` type:

```typescript
type EmailCaptureProps = {
  identity?: string;
  quizAnswers?: string[];
  context?: 'quiz-result' | 'exit-intent' | 'essay' | 'floating-tab';
  title?: string;
  description?: string;
  onSuccess?: () => void; // Add this
};
```

**Step 5: Call onSuccess in EmailCapture**

In `handleSubmit` function after success:

```typescript
if (data.success) {
  setStatus('success');
  setMessage(data.message);
  if (data.substackUrl) {
    setSubstackUrl(data.substackUrl);
  }

  // Call onSuccess callback if provided
  if (onSuccess) {
    onSuccess();
  }

  // ... rest of tracking code
}
```

**Step 6: Commit success handling**

```bash
git add src/components/SubscribeTab.tsx src/components/EmailCapture.tsx
git commit -m "feat: add subscription success state handling"
```

---

## Task 11: Polish and Edge Cases

**Files:**
- Modify: `src/components/SubscribeTab.tsx`

**Step 1: Prevent tab showing on admin pages**

Add check at top of component:

```typescript
export default function SubscribeTab() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  // Don't show on admin/stats pages
  if (pathname.startsWith('/stats') || pathname.startsWith('/api')) {
    return null;
  }

  // ... rest of component
}
```

**Step 2: Add throttling to scroll handler**

Update scroll effect:

```typescript
useEffect(() => {
  if (isDismissed) return;

  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const scrollPercent = ((scrollTop + windowHeight) / documentHeight) * 100;

        if (scrollPercent >= 50) {
          setIsVisible(true);
        }

        ticking = false;
      });

      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  return () => window.removeEventListener('scroll', handleScroll);
}, [isDismissed]);
```

**Step 3: Test edge cases**

- Very short pages (< scrollable)
- Multiple tabs open (localStorage sync)
- Quick scroll to bottom
- Subscribe then revisit

Expected: Graceful handling of all cases

**Step 4: Commit polish**

```bash
git add src/components/SubscribeTab.tsx
git commit -m "feat: add path exclusions and scroll throttling"
```

---

## Task 12: Final Testing and Documentation

**Files:**
- Create: `src/components/SubscribeTab.README.md`

**Step 1: Create component documentation**

Create `src/components/SubscribeTab.README.md`:

```markdown
# SubscribeTab Component

Smart floating subscribe button that appears after user engagement.

## Features

- Appears after 30s OR 50% scroll (whichever first)
- Slides in from right edge (desktop) or bottom-right (mobile)
- 7-day dismissal memory with localStorage
- Wraps existing EmailCapture component
- Responsive design with mobile optimizations

## Usage

```tsx
import SubscribeTab from '@/components/SubscribeTab';

// In layout
<SubscribeTab />
```

## Behavior

**Triggers:**
- Time: Shows after 30 seconds on page
- Scroll: Shows after scrolling 50% down page

**Dismissal:**
- Close button (✕): Hides for 7 days
- Backdrop/ESC: Closes panel but keeps tab visible
- After subscribe: Clears dismissal, shows "Subscribed" state

**localStorage Keys:**
- `subscribe-tab-dismissed-until`: Timestamp for 7-day dismissal

## Styling

Customize via `SubscribeTab.module.css`:
- `.tab`: Main button styles
- `.panel`: Slide-in panel styles
- `.backdrop`: Overlay backdrop
```

**Step 2: Full manual test checklist**

Test on dev server:

Desktop:
- [ ] Tab appears after 30s on static page
- [ ] Tab appears after 50% scroll on long page
- [ ] Tab click opens panel from right
- [ ] Close button dismisses for 7 days
- [ ] Backdrop click closes panel (keeps tab)
- [ ] ESC key closes panel
- [ ] Subscribe shows success → "Subscribed" state
- [ ] Pulse animation visible

Mobile (< 768px):
- [ ] Circular button bottom-right
- [ ] Icon only (no text)
- [ ] Panel slides up from bottom
- [ ] Close button tap works
- [ ] Full width panel

**Step 3: Check accessibility**

- [ ] Tab has aria-label
- [ ] Close button has aria-label
- [ ] Keyboard navigation works
- [ ] Focus trapped in panel when open

**Step 4: Commit documentation**

```bash
git add src/components/SubscribeTab.README.md
git commit -m "docs: add SubscribeTab component documentation"
```

---

## Task 13: Merge to Main

**Files:**
- N/A (git operations only)

**Step 1: Push feature branch**

```bash
git push origin feature/floating-subscribe-tab
```

**Step 2: Switch back to main directory**

```bash
cd /Users/louiseireland/Projects/livenowclub
```

**Step 3: Create pull request (optional)**

Option A: Merge directly
```bash
git checkout main
git merge feature/floating-subscribe-tab
git push origin main
```

Option B: Use gh CLI for PR
```bash
gh pr create --title "Add floating subscribe tab" --body "Implements smart subscribe tab that appears after engagement. See docs/plans/2026-05-06-floating-subscribe-tab-design.md for details."
```

**Step 4: Clean up worktree**

```bash
git worktree remove .worktrees/feature/floating-subscribe-tab
git branch -d feature/floating-subscribe-tab
```

---

## Success Criteria

- [ ] Tab appears on all pages after trigger conditions
- [ ] Smooth animations on desktop and mobile
- [ ] 7-day dismissal works correctly
- [ ] Subscribe flow completes successfully
- [ ] No console errors
- [ ] Responsive on all screen sizes
- [ ] Keyboard accessible

## Notes

- This feature reuses EmailCapture component (no duplication)
- Uses existing `/api/subscribe` endpoint
- localStorage key separate from inline email capture
- Can be disabled per-page by checking pathname
- No tests added (visual/manual testing sufficient for UI component)
