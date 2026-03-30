# Good to Excellent Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix all broken functionality, add accessibility, and systematize CSS to achieve design excellence.

**Architecture:** Four phases - (1) fix critical broken items, (2) add accessibility focus states, (3) consolidate CSS into design tokens, (4) polish micro-interactions. Each phase can be deployed independently.

**Tech Stack:** Next.js 14, CSS custom properties, Formspree for forms

---

## Phase 1: Fix Broken Things (Trust)

### Task 1: Fix Featured Essay Link on Homepage

**Files:**
- Modify: `src/app/page.tsx:230`

**Context:**
The homepage featured section links to `/${FEATURED.slug}` which resolves to `/the-live-now-club`. This route doesn't exist - essays live at `/read/[slug]`.

**Step 1: Fix the link path**

In `src/app/page.tsx`, line 230, change:
```tsx
<Link href={`/${FEATURED.slug}`} className="featured-link">
```
to:
```tsx
<Link href={`/read/${FEATURED.slug}`} className="featured-link">
```

**Step 2: Verify the fix**

Run: `pnpm dev`
Navigate to homepage, click featured essay card.
Expected: Navigates to `/read/the-live-now-club` and displays essay.

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "fix: correct featured essay link path on homepage

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

### Task 2: Fix or Remove Wonder Featured Essay Link

**Files:**
- Modify: `src/app/wonder/page.tsx:11-18, 42`

**Context:**
The Wonder page features "After Abundance" linking to `/wonder/essay`. This route has no page.tsx - only a `/wonder/essay/quiz/result` page exists. The interactive essay isn't built yet.

**Option A (Quick Fix):** Change link to external content or remove featured section
**Option B (Proper):** Create placeholder page explaining essay is coming soon

We'll do Option B - create a simple coming soon page.

**Step 1: Create the essay page**

Create file `src/app/wonder/essay/page.tsx`:

```tsx
import Link from "next/link";
import Header from "@/components/Header";

export const metadata = {
  title: "After Abundance | The Live Now Club",
  description: "An interactive exploration of human purpose when scarcity ends. Coming soon.",
};

export default function AfterAbundanceEssay() {
  return (
    <>
      <Header />
      <div className="wonder-container" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "100px 24px" }}>
        <span className="wonder-label" style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 400, letterSpacing: "0.3em", textTransform: "uppercase", color: "#E8178A", marginBottom: "24px" }}>Coming Soon</span>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 300, lineHeight: 1.2, letterSpacing: "-0.02em", color: "var(--charcoal)", marginBottom: "16px" }}>After Abundance</h1>
        <p style={{ fontSize: "1.125rem", color: "var(--text-dim)", lineHeight: 1.6, maxWidth: "500px", marginBottom: "32px" }}>
          An interactive exploration of what more than 200 science fiction books reveal about human purpose when scarcity ends.
        </p>
        <Link href="/wonder" style={{ color: "var(--pink)", textDecoration: "none" }}>← Back to Wonder</Link>
      </div>
      <footer className="footer">
        <p className="footer-quote">What if now is all we have?</p>
        <nav className="footer-nav">
          <Link href="/read">Read</Link>
          <Link href="/navigate">Navigate</Link>
          <Link href="/wonder">Wonder</Link>
          <Link href="/connect">Connect</Link>
        </nav>
        <p className="footer-copy">&copy; 2026 Louise Ireland</p>
      </footer>
    </>
  );
}
```

**Step 2: Verify**

Run: `pnpm dev`
Navigate to /wonder, click "After Abundance" card.
Expected: Displays coming soon page with back link.

**Step 3: Commit**

```bash
git add src/app/wonder/essay/page.tsx
git commit -m "feat: add placeholder page for After Abundance essay

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

### Task 3: Fix Contact Forms with Real Formspree Endpoints

**Files:**
- Modify: `src/app/connect/page.tsx:18, 36`

**Context:**
The contact forms have placeholder endpoints `YOUR_STORY_FORM_ID` and `YOUR_MESSAGE_FORM_ID`. Louise needs to create Formspree forms and provide the IDs.

**Step 1: Ask Louise for Formspree form IDs**

This task requires user input. Louise needs to:
1. Go to https://formspree.io
2. Create two forms: "Story Submissions" and "Contact Messages"
3. Provide the form IDs (format: `f/xxxxxxxx`)

**Step 2: Update the endpoints**

In `src/app/connect/page.tsx`:

Line 18 - replace:
```tsx
const response = await fetch("https://formspree.io/f/YOUR_STORY_FORM_ID", {
```
with the actual Story form ID.

Line 36 - replace:
```tsx
const response = await fetch("https://formspree.io/f/YOUR_MESSAGE_FORM_ID", {
```
with the actual Message form ID.

**Step 3: Add error handling**

After line 27, add error state handling:
```tsx
if (!response.ok) {
  // Silently fail for now - could add error state later
  console.error("Form submission failed");
  return;
}
```

Same for the message form after line 45.

**Step 4: Test submission**

Run: `pnpm dev`
Navigate to /connect, fill out a test form, submit.
Expected: Shows success message, form data appears in Formspree dashboard.

**Step 5: Commit**

```bash
git add src/app/connect/page.tsx
git commit -m "feat: connect contact forms to Formspree endpoints

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

### Task 4: Fix Soul.md Double Extension

**Files:**
- Rename: `content/essays/2026-03-22 Soul.md.md` → `content/essays/2026-03-22 Soul.md`

**Context:**
File has double `.md.md` extension which may cause rendering issues.

**Step 1: Rename the file**

```bash
mv "content/essays/2026-03-22 Soul.md.md" "content/essays/2026-03-22 Soul.md"
```

**Step 2: Verify essay still loads**

Run: `pnpm dev`
Navigate to /read/soulmd (or however slug is generated).
Expected: Essay renders correctly.

**Step 3: Commit**

```bash
git add -A content/essays/
git commit -m "fix: remove double .md extension from Soul essay

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Phase 2: Accessibility

### Task 5: Add Global Focus-Visible Styles

**Files:**
- Modify: `src/app/globals.css` (after reset section, ~line 200)

**Context:**
The site has zero focus-visible states. Keyboard users get no visual feedback when tabbing through interactive elements. This is both a usability and legal compliance issue.

**Step 1: Add focus-visible base styles**

Add after the reset section in globals.css:

```css
/* ============================================
   FOCUS STATES - Accessibility
   ============================================ */

/* Base focus-visible for all interactive elements */
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible,
[tabindex]:focus-visible {
  outline: 2px solid var(--pink);
  outline-offset: 2px;
}

/* Remove default focus ring (we're using focus-visible instead) */
a:focus:not(:focus-visible),
button:focus:not(:focus-visible) {
  outline: none;
}

/* Cards and larger clickable areas - inset ring */
.carousel-card:focus-visible,
.soft-entry:focus-visible,
.read-list-item:focus-visible,
.guide-card:focus-visible,
.pick:focus-visible,
.recent-item:focus-visible,
.wonder-essay-card:focus-visible,
.wonder-list-item:focus-visible {
  outline: 2px solid var(--pink);
  outline-offset: -2px;
}

/* Dark mode focus adjustments */
@media (prefers-color-scheme: dark) {
  a:focus-visible,
  button:focus-visible,
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible,
  [tabindex]:focus-visible {
    outline-color: var(--coral);
  }
}

:root.dark a:focus-visible,
:root.dark button:focus-visible,
:root.dark input:focus-visible,
:root.dark textarea:focus-visible,
:root.dark select:focus-visible,
:root.dark [tabindex]:focus-visible {
  outline-color: var(--coral);
}
```

**Step 2: Test with keyboard navigation**

Run: `pnpm dev`
Navigate to homepage, press Tab repeatedly.
Expected: Each focusable element shows pink outline as you tab through.

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add focus-visible states for keyboard accessibility

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Phase 3: Design Token Consolidation

### Task 6: Define Spacing Design Tokens

**Files:**
- Modify: `src/app/globals.css:29-34`

**Context:**
The audit found 105 hardcoded px values. We need a systematic spacing scale. Current tokens exist but aren't comprehensive enough.

**Step 1: Expand spacing tokens in :root**

Replace the current spacing section (lines 29-34) with:

```css
/* Spacing - 4px base unit */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */

/* Legacy aliases (for gradual migration) */
--space-xs: var(--space-1);
--space-sm: var(--space-3);
--space-md: var(--space-4);
--space-lg: var(--space-6);
--space-xl: var(--space-12);
```

**Step 2: Commit tokens**

```bash
git add src/app/globals.css
git commit -m "feat: expand spacing design tokens with 4px base unit

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

### Task 7: Define Border Radius Tokens

**Files:**
- Modify: `src/app/globals.css` (add after spacing section)

**Context:**
The audit found 52 different border-radius values. We need 4-5 standardized values.

**Step 1: Add border radius tokens**

Add after spacing section in :root:

```css
/* Border Radius */
--radius-sm: 2px;     /* Subtle rounding */
--radius-md: 4px;     /* Default for buttons, inputs */
--radius-lg: 8px;     /* Cards, larger elements */
--radius-xl: 16px;    /* Feature cards, modals */
--radius-full: 9999px; /* Pills, avatars */
```

**Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add border-radius design tokens

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

### Task 8: Define Typography Line Height Tokens

**Files:**
- Modify: `src/app/globals.css` (add after border radius)

**Context:**
The audit found 12 different line-height values. Consolidate to 4-5 semantic values.

**Step 1: Add line height tokens**

Add to :root:

```css
/* Line Heights */
--leading-none: 1;        /* Headings, display text */
--leading-tight: 1.2;     /* Large headings */
--leading-snug: 1.4;      /* Small headings, UI text */
--leading-normal: 1.6;    /* Body copy */
--leading-relaxed: 1.75;  /* Long-form reading */
```

**Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add line-height design tokens

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

### Task 9: Migrate Header Component to Design Tokens

**Files:**
- Modify: `src/app/globals.css` (header section)

**Context:**
Start migrating existing CSS to use tokens. Begin with the header as it's high-visibility.

**Step 1: Find header styles in globals.css**

Search for `.header` in globals.css and update hardcoded values:

Replace patterns like:
- `padding: 16px 24px` → `padding: var(--space-4) var(--space-6)`
- `height: 60px` → `height: var(--space-16)` (close enough) or keep as-is if intentional
- `gap: 32px` → `gap: var(--space-8)`

**Step 2: Test header appearance**

Run: `pnpm dev`
Navigate across pages, verify header looks identical.
Expected: No visual change.

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "refactor: migrate header CSS to design tokens

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

### Task 10: Migrate Button Styles to Design Tokens

**Files:**
- Modify: `src/app/globals.css` (button section)

**Context:**
Buttons are repeated across the site. Standardize with tokens.

**Step 1: Update .btn and .btn--primary**

Replace hardcoded values:
- `padding: 14px 28px` → `padding: var(--space-3) var(--space-6)` (adjust to 12px 24px)
- `border-radius: 0` → `border-radius: var(--radius-sm)` or keep 0 if intentional
- `letter-spacing: 0.2em` → keep (intentional design choice)

**Step 2: Test buttons**

Navigate to homepage, verify "Join the Newsletter" button appearance.
Expected: No visual change.

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "refactor: migrate button CSS to design tokens

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

### Task 11: Migrate Card Styles to Design Tokens

**Files:**
- Modify: `src/app/globals.css` (various card classes)

**Context:**
Cards (.guide-card, .read-list-item, .carousel-card, etc.) should share consistent spacing and radii.

**Step 1: Update card padding and gaps**

For each card class, replace:
- `padding: 24px` → `padding: var(--space-6)`
- `padding: 20px` → `padding: var(--space-5)`
- `gap: 16px` → `gap: var(--space-4)`
- `margin-bottom: 32px` → `margin-bottom: var(--space-8)`
- `border-radius: 8px` → `border-radius: var(--radius-lg)`

**Step 2: Test card appearance**

Navigate to /read page, verify cards look identical.
Expected: No visual change.

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "refactor: migrate card CSS to design tokens

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

### Task 12: Migrate Typography to Line Height Tokens

**Files:**
- Modify: `src/app/globals.css`

**Context:**
Consolidate the 12 different line-heights to use semantic tokens.

**Step 1: Find and replace line-heights**

Search for `line-height:` in globals.css and categorize:
- `line-height: 1` or `1.1` → `line-height: var(--leading-none)`
- `line-height: 1.2` → `line-height: var(--leading-tight)`
- `line-height: 1.3` to `1.5` → `line-height: var(--leading-snug)`
- `line-height: 1.5` to `1.65` → `line-height: var(--leading-normal)`
- `line-height: 1.7` or higher → `line-height: var(--leading-relaxed)`

**Step 2: Test typography**

Navigate to an essay page, verify text readability unchanged.
Expected: No visual change.

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "refactor: migrate line-heights to design tokens

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Phase 4: Polish

### Task 13: Add Consistent Hover Transitions

**Files:**
- Modify: `src/app/globals.css`

**Context:**
Some elements have hover effects, others don't. Standardize transition timing.

**Step 1: Add transition token to :root**

```css
/* Transitions */
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
```

**Step 2: Add base transitions to interactive elements**

```css
/* Base transitions for all interactive elements */
a, button, .btn,
.carousel-card, .soft-entry, .read-list-item,
.guide-card, .pick, .recent-item {
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    transform var(--transition-fast),
    box-shadow var(--transition-fast),
    opacity var(--transition-fast);
}
```

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add consistent transition timing to interactive elements

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

### Task 14: Build and Deploy

**Files:** None (verification only)

**Step 1: Run production build**

```bash
pnpm build
```

Expected: Build completes without errors.

**Step 2: Test production build locally**

```bash
pnpm start
```

Navigate through all pages:
- Homepage (/)
- Read (/read)
- Navigate (/navigate)
- Wonder (/wonder)
- Connect (/connect)
- An essay (/read/the-live-now-club)

Expected: All pages load, no console errors, forms work, links work.

**Step 3: Deploy**

```bash
git push origin main
```

Vercel will auto-deploy.

**Step 4: Verify production**

Visit https://livenowclub.com and spot-check:
- Featured essay link works
- After Abundance shows coming soon
- Contact forms submit (if Formspree configured)
- Tab navigation shows focus rings
- Dark mode toggle works

---

## Summary

| Phase | Tasks | Impact |
|-------|-------|--------|
| 1. Fix Broken | 4 tasks | Trust - nothing broken |
| 2. Accessibility | 1 task | Inclusion - keyboard users served |
| 3. Design Tokens | 7 tasks | Consistency - unified DNA |
| 4. Polish | 2 tasks | Delight - smooth interactions |

**Total: 14 tasks**

**Note:** Task 3 (Formspree) requires Louise to provide form IDs before it can be completed.
