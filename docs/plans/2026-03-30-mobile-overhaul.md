# Mobile Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the Live Now Club into a mobile-first experience with proper navigation, readable typography, and modern mobile patterns.

**Architecture:** Progressive enhancement approach - improve mobile CSS first, then add interactive components (hamburger menu, bottom nav). Dark mode via CSS custom properties and prefers-color-scheme.

**Tech Stack:** Next.js, React, CSS custom properties, localStorage for theme persistence

---

## Phase 1: Mobile Navigation

### Task 1: Create Mobile Menu Component

**Files:**
- Create: `src/components/MobileMenu.tsx`
- Modify: `src/components/Header.tsx`
- Modify: `src/app/globals.css`

**Step 1: Create the MobileMenu component**

```tsx
// src/components/MobileMenu.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="mobile-menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <span className={`hamburger ${isOpen ? "hamburger--open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {isOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsOpen(false)}>
          <nav className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <Link href="/read" onClick={() => setIsOpen(false)}>Read</Link>
            <Link href="/navigate" onClick={() => setIsOpen(false)}>Navigate</Link>
            <Link href="/wonder" onClick={() => setIsOpen(false)}>Wonder</Link>
            <Link href="/connect" onClick={() => setIsOpen(false)}>Connect</Link>
          </nav>
        </div>
      )}
    </>
  );
}
```

**Step 2: Add mobile menu CSS**

Add to `src/app/globals.css`:

```css
/* ========================================
   MOBILE MENU
   ======================================== */

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  z-index: 200;
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
}

.hamburger span {
  display: block;
  height: 2px;
  background: var(--charcoal);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger--open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger--open span:nth-child(2) {
  opacity: 0;
}

.hamburger--open span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 150;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.mobile-menu {
  position: absolute;
  top: 0;
  right: 0;
  width: 280px;
  height: 100%;
  background: var(--cream);
  padding: 80px var(--space-lg) var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.mobile-menu a {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--charcoal);
  padding: var(--space-sm) 0;
  border-bottom: 1px solid var(--border);
}

.mobile-menu a:hover {
  color: var(--pink);
}

@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: block;
  }
}
```

**Step 3: Update Header to include MobileMenu**

Modify `src/components/Header.tsx` to import and render `<MobileMenu />` alongside the desktop nav.

**Step 4: Verify mobile menu works**

Run: `npm run dev`
Test: Resize browser to mobile width, tap hamburger, verify menu slides in.

**Step 5: Commit**

```bash
git add src/components/MobileMenu.tsx src/components/Header.tsx src/app/globals.css
git commit -m "feat: add mobile hamburger menu"
```

---

### Task 2: Add Bottom Navigation Bar

**Files:**
- Create: `src/components/BottomNav.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Step 1: Create BottomNav component**

```tsx
// src/components/BottomNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <nav className="bottom-nav">
      <Link href="/" className={isActive("/") ? "active" : ""}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        </svg>
        <span>Home</span>
      </Link>
      <Link href="/read" className={isActive("/read") ? "active" : ""}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
        <span>Read</span>
      </Link>
      <Link href="/navigate" className={isActive("/navigate") ? "active" : ""}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
        <span>Navigate</span>
      </Link>
      <Link href="/connect" className={isActive("/connect") ? "active" : ""}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        <span>Connect</span>
      </Link>
    </nav>
  );
}
```

**Step 2: Add bottom nav CSS**

```css
/* ========================================
   BOTTOM NAVIGATION (Mobile)
   ======================================== */

.bottom-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--cream);
  border-top: 1px solid var(--border);
  padding: var(--space-xs) 0;
  padding-bottom: env(safe-area-inset-bottom, 8px);
  z-index: 100;
}

.bottom-nav a {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px;
  color: var(--text-muted);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.bottom-nav a svg {
  width: 24px;
  height: 24px;
}

.bottom-nav a.active {
  color: var(--pink);
}

@media (max-width: 768px) {
  .bottom-nav {
    display: flex;
  }

  /* Add padding to body so content isn't hidden behind bottom nav */
  body {
    padding-bottom: 70px;
  }

  /* Hide footer nav on mobile since we have bottom nav */
  .footer-nav {
    display: none;
  }
}
```

**Step 3: Add BottomNav to layout**

Add `<BottomNav />` before the closing `</body>` in `src/app/layout.tsx`.

**Step 4: Verify bottom nav works**

Run: `npm run dev`
Test: View on mobile, verify bottom nav appears, active states work.

**Step 5: Commit**

```bash
git add src/components/BottomNav.tsx src/app/layout.tsx src/app/globals.css
git commit -m "feat: add mobile bottom navigation bar"
```

---

## Phase 2: Typography & Touch Targets

### Task 3: Increase Mobile Font Sizes

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Add mobile typography overrides**

Add a new section at the end of globals.css:

```css
/* ========================================
   MOBILE TYPOGRAPHY OVERRIDES
   ======================================== */

@media (max-width: 768px) {
  /* Base text - minimum 16px for readability */
  body {
    font-size: 16px;
  }

  /* Headings - scale down but stay readable */
  h1 {
    font-size: 2rem !important;
  }

  h2 {
    font-size: 1.5rem !important;
  }

  h3 {
    font-size: 1.25rem !important;
  }

  /* Paragraphs and body text */
  p, li, blockquote {
    font-size: 1rem;
    line-height: 1.7;
  }

  /* Labels and small text - never below 12px */
  .read-list-type,
  .guide-card-type,
  .journey-item-date,
  .recent-item-type,
  .pick-label,
  .section-label,
  [class*="-type"],
  [class*="-label"] {
    font-size: 12px !important;
  }

  /* Navigation text */
  .nav a,
  .mobile-menu a,
  .bottom-nav a {
    font-size: 14px;
  }

  /* Buttons - larger for touch */
  .btn {
    font-size: 16px;
    padding: 14px 28px;
    min-height: 48px;
  }
}
```

**Step 2: Verify typography changes**

Run: `npm run dev`
Test: Check /read, /navigate/cancer, homepage on mobile - text should be larger and more readable.

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: increase mobile font sizes for readability"
```

---

### Task 4: Improve Touch Targets

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Add touch target improvements**

```css
/* ========================================
   TOUCH TARGET IMPROVEMENTS (Mobile)
   ======================================== */

@media (max-width: 768px) {
  /* All clickable elements - minimum 44x44px touch target */
  a, button {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }

  /* Card links - larger tap area */
  .read-list-item,
  .guide-card,
  .journey-item,
  .journey-milestone,
  .recent-item {
    min-height: 60px;
  }

  /* List items with more padding */
  .journey-item {
    padding: 12px 0;
  }

  /* Quick links - bigger touch targets */
  .quick-link-card,
  .soft-entry,
  .navigate-option {
    padding: 20px;
    min-height: 80px;
  }

  /* Increase spacing between tappable items */
  .read-list {
    gap: var(--space-md);
  }

  .journey-timeline {
    gap: var(--space-xs);
  }
}
```

**Step 2: Verify touch targets**

Test: On mobile, verify links/buttons are easy to tap without mis-tapping adjacent elements.

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: improve mobile touch targets (44px minimum)"
```

---

## Phase 3: Reading Experience

### Task 5: Add Reading Progress Bar

**Files:**
- Create: `src/components/ReadingProgress.tsx`
- Modify: `src/app/read/[slug]/page.tsx`
- Modify: `src/app/globals.css`

**Step 1: Create ReadingProgress component**

```tsx
// src/components/ReadingProgress.tsx
"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="reading-progress" style={{ width: `${progress}%` }} />
  );
}
```

**Step 2: Add reading progress CSS**

```css
/* ========================================
   READING PROGRESS BAR
   ======================================== */

.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--pink), var(--coral));
  z-index: 200;
  transition: width 0.1s ease-out;
}
```

**Step 3: Add ReadingProgress to essay pages**

Import and add `<ReadingProgress />` at the top of the essay page component in `src/app/read/[slug]/page.tsx`.

**Step 4: Verify progress bar**

Test: Open any essay, scroll down - progress bar should fill from left to right.

**Step 5: Commit**

```bash
git add src/components/ReadingProgress.tsx src/app/read/[slug]/page.tsx src/app/globals.css
git commit -m "feat: add reading progress bar for essays"
```

---

### Task 6: Improve Mobile Essay Layout

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Add mobile essay improvements**

```css
/* ========================================
   MOBILE ESSAY READING EXPERIENCE
   ======================================== */

@media (max-width: 768px) {
  /* Essay container - full width with comfortable margins */
  .essay-container,
  .prose {
    padding: 0 var(--space-md);
    max-width: 100%;
  }

  /* Essay content - optimal reading width */
  .essay-content {
    font-size: 18px;
    line-height: 1.8;
  }

  .essay-content p {
    margin-bottom: 1.5em;
  }

  /* Blockquotes - indented but not too cramped */
  .essay-content blockquote {
    margin: 1.5em 0;
    padding: 1em 1.25em;
    font-size: 1rem;
    border-left-width: 3px;
  }

  /* Images in essays - full bleed */
  .essay-content img {
    width: calc(100% + var(--space-md) * 2);
    margin-left: calc(var(--space-md) * -1);
    margin-right: calc(var(--space-md) * -1);
    max-width: none;
  }

  /* Essay header */
  .essay-header {
    padding: var(--space-lg) var(--space-md);
  }

  .essay-header h1 {
    font-size: 1.75rem;
    line-height: 1.2;
  }

  /* Related essays at bottom */
  .related-essays {
    padding: var(--space-lg) var(--space-md);
  }
}
```

**Step 2: Verify essay reading experience**

Test: Read a long essay on mobile - should feel comfortable and immersive.

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: improve mobile essay reading experience"
```

---

## Phase 4: Dark Mode

### Task 7: Add Dark Mode CSS Variables

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Add dark mode color scheme**

Add at the top of globals.css, after the `:root` variables:

```css
/* ========================================
   DARK MODE
   ======================================== */

@media (prefers-color-scheme: dark) {
  :root {
    --cream: #1a1a1a;
    --cream-dark: #242424;
    --charcoal: #f5f5f5;
    --charcoal-light: #e0e0e0;
    --text-muted: #a0a0a0;
    --text-dim: #888888;
    --border: #333333;
    --pink: #ff9eb5;
    --coral: #ffb4a2;
    --gold: #ffd700;
  }

  body {
    background: #1a1a1a;
    color: #f5f5f5;
  }

  /* Cards and surfaces */
  .guide-card,
  .read-list-item,
  .recent-item,
  .journey-milestone {
    background: #242424;
    border-color: #333;
  }

  /* Header */
  .header {
    background: rgba(26, 26, 26, 0.95);
  }

  .header.scrolled {
    background: rgba(26, 26, 26, 0.98);
  }

  /* Mobile menu */
  .mobile-menu {
    background: #1a1a1a;
  }

  /* Bottom nav */
  .bottom-nav {
    background: #1a1a1a;
    border-top-color: #333;
  }

  /* Images - slight brightness reduction */
  img {
    filter: brightness(0.9);
  }

  /* Invert logo for dark mode */
  .logo-img {
    filter: invert(1) brightness(0.9);
  }
}
```

**Step 2: Verify dark mode**

Test: Enable dark mode in system preferences, reload site - colors should invert appropriately.

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add automatic dark mode support"
```

---

### Task 8: Add Manual Dark Mode Toggle (Optional)

**Files:**
- Create: `src/components/ThemeToggle.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/components/Header.tsx`

**Step 1: Create ThemeToggle component**

```tsx
// src/components/ThemeToggle.tsx
"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    if (saved) {
      setTheme(saved);
      applyTheme(saved);
    }
  }, []);

  const applyTheme = (newTheme: "light" | "dark" | "system") => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (newTheme === "system") {
      // Let CSS prefers-color-scheme handle it
      return;
    }

    root.classList.add(newTheme);
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "light" && "☀️"}
      {theme === "dark" && "🌙"}
      {theme === "system" && "🌓"}
    </button>
  );
}
```

**Step 2: Add theme toggle CSS and class-based dark mode**

```css
/* Theme toggle button */
.theme-toggle {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 8px;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.theme-toggle:hover {
  opacity: 1;
}

/* Class-based dark mode (for manual toggle) */
:root.dark {
  --cream: #1a1a1a;
  --cream-dark: #242424;
  --charcoal: #f5f5f5;
  --charcoal-light: #e0e0e0;
  --text-muted: #a0a0a0;
  --text-dim: #888888;
  --border: #333333;
  --pink: #ff9eb5;
  --coral: #ffb4a2;
}

:root.dark body {
  background: #1a1a1a;
  color: #f5f5f5;
}
```

**Step 3: Add ThemeToggle to Header**

Add `<ThemeToggle />` to the header, visible on both mobile and desktop.

**Step 4: Verify theme toggle**

Test: Click toggle - should cycle through light, dark, system modes.

**Step 5: Commit**

```bash
git add src/components/ThemeToggle.tsx src/components/Header.tsx src/app/globals.css
git commit -m "feat: add manual dark mode toggle"
```

---

## Phase 5: Final Polish

### Task 9: Build and Test

**Step 1: Run production build**

```bash
npm run build
```

**Step 2: Test on real device**

```bash
npm run start
```

Open on phone via local network IP. Test:
- [ ] Hamburger menu opens/closes
- [ ] Bottom nav works and shows active state
- [ ] Text is readable without zooming
- [ ] Touch targets are easy to tap
- [ ] Progress bar works on essays
- [ ] Dark mode works (system + manual toggle)

**Step 3: Final commit**

```bash
git add -A
git commit -m "chore: mobile overhaul complete"
git push origin main
```

---

## Summary

| Phase | Tasks | Est. Time |
|-------|-------|-----------|
| 1. Navigation | Hamburger menu, bottom nav | 45 min |
| 2. Typography | Font sizes, touch targets | 30 min |
| 3. Reading | Progress bar, essay layout | 30 min |
| 4. Dark Mode | Auto + manual toggle | 45 min |
| 5. Polish | Build, test, deploy | 30 min |

**Total: ~3 hours**
