# Reader Analytics Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Add client-side analytics tracking for scroll depth, Related Essays impressions, and Related Essays clicks to understand where readers drop off and why they don't continue to the next essay.

**Architecture:** Extend existing `/api/track` endpoint (already tracks sessions and events) with new event types. Add client-side React hooks for tracking scroll depth and Related Essays engagement. Store events in Redis with existing session data.

**Tech Stack:** Next.js 16, React hooks (useEffect, useCallback), Intersection Observer API, existing Redis analytics infrastructure

---

## Context

**Existing infrastructure:**
- `/api/track` endpoint already exists (src/app/api/track/route.ts)
- Already tracks: sessions, page views, custom events, referrers, countries
- Uses Redis for storage with 90-day retention
- Session tracking already implemented (sessionId, pageCount, page history)

**What we're adding:**
- Scroll depth tracking (percentage of page scrolled)
- Related Essays impression tracking (when section becomes visible)
- Related Essays click tracking (which related essay was clicked)

**Files we'll work with:**
- Create: `src/lib/analytics.ts` - Session ID generation and tracking utilities
- Create: `src/hooks/useScrollDepth.ts` - Scroll depth tracking hook
- Create: `src/hooks/useRelatedEssaysTracking.ts` - Related Essays tracking hook
- Modify: `src/components/EssayContent.tsx` - Integrate tracking hooks

---

## Task 1: Session ID Utilities

**Files:**
- Create: `src/lib/analytics.ts`

**Step 1: Create analytics utilities file**

Create file with session ID generation and persistence functions:

```typescript
// src/lib/analytics.ts

/**
 * Generate a unique session ID
 */
export function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Get or create session ID from localStorage
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  const storageKey = 'reader_session_id';
  const expiryKey = 'reader_session_expiry';

  // Check existing session
  const existingId = localStorage.getItem(storageKey);
  const expiry = localStorage.getItem(expiryKey);

  // If session exists and hasn't expired (30 min), reuse it
  if (existingId && expiry && Date.now() < parseInt(expiry)) {
    // Extend expiry
    const newExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes
    localStorage.setItem(expiryKey, newExpiry.toString());
    return existingId;
  }

  // Create new session
  const newId = generateSessionId();
  const newExpiry = Date.now() + 30 * 60 * 1000;
  localStorage.setItem(storageKey, newId);
  localStorage.setItem(expiryKey, newExpiry.toString());

  return newId;
}

/**
 * Track an analytics event
 */
export async function trackEvent(data: {
  event: string;
  page?: string;
  metadata?: Record<string, any>;
}): Promise<void> {
  try {
    const sessionId = getSessionId();
    const page = data.page || window.location.pathname;

    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: data.event,
        page,
        sessionId,
        metadata: data.metadata,
        referrer: document.referrer,
      }),
    });
  } catch (error) {
    // Silently fail - don't break user experience
    console.error('Analytics error:', error);
  }
}
```

**Step 2: Verify file was created**

Run: `ls -la src/lib/analytics.ts`
Expected: File exists

**Step 3: Commit**

```bash
git add src/lib/analytics.ts
git commit -m "feat: add session ID utilities for analytics tracking"
```

---

## Task 2: Scroll Depth Tracking Hook

**Files:**
- Create: `src/hooks/useScrollDepth.ts`

**Step 1: Create scroll depth hook**

Create hook that tracks maximum scroll depth and reports periodically:

```typescript
// src/hooks/useScrollDepth.ts
'use client';

import { useEffect, useRef, useCallback } from 'react';
import { trackEvent } from '@/lib/analytics';

export function useScrollDepth(page: string) {
  const maxDepthRef = useRef(0);
  const lastReportedRef = useRef(0);
  const reportedRef = useRef(false);

  const calculateScrollDepth = useCallback(() => {
    // Calculate how far down the page the user has scrolled (0-100%)
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    const scrollableHeight = documentHeight - windowHeight;
    const scrollPercentage = scrollableHeight > 0
      ? Math.round((scrollTop / scrollableHeight) * 100)
      : 100;

    return Math.min(scrollPercentage, 100);
  }, []);

  const handleScroll = useCallback(() => {
    const currentDepth = calculateScrollDepth();

    // Update max depth
    if (currentDepth > maxDepthRef.current) {
      maxDepthRef.current = currentDepth;
    }

    // Report every 25% milestone (25, 50, 75, 100)
    const milestone = Math.floor(currentDepth / 25) * 25;
    if (milestone > lastReportedRef.current && milestone > 0) {
      lastReportedRef.current = milestone;

      trackEvent({
        event: 'scroll_depth',
        page,
        metadata: { depth: milestone },
      });
    }
  }, [calculateScrollDepth, page]);

  const reportFinalDepth = useCallback(() => {
    // Report final depth on unmount if not already reported
    if (!reportedRef.current && maxDepthRef.current > 0) {
      reportedRef.current = true;
      trackEvent({
        event: 'scroll_depth_final',
        page,
        metadata: { depth: maxDepthRef.current },
      });
    }
  }, [page]);

  useEffect(() => {
    // Throttle scroll events
    let timeoutId: NodeJS.Timeout;
    const throttledScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Report initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
      reportFinalDepth();
    };
  }, [handleScroll, reportFinalDepth]);
}
```

**Step 2: Verify file was created**

Run: `ls -la src/hooks/useScrollDepth.ts`
Expected: File exists

**Step 3: Commit**

```bash
git add src/hooks/useScrollDepth.ts
git commit -m "feat: add scroll depth tracking hook"
```

---

## Task 3: Related Essays Tracking Hook

**Files:**
- Create: `src/hooks/useRelatedEssaysTracking.ts`

**Step 1: Create Related Essays tracking hook**

Create hook that tracks impressions (visibility) and clicks:

```typescript
// src/hooks/useRelatedEssaysTracking.ts
'use client';

import { useEffect, useRef, useCallback } from 'react';
import { trackEvent } from '@/lib/analytics';

interface RelatedEssay {
  slug: string;
  title: string;
}

export function useRelatedEssaysTracking(
  currentPage: string,
  relatedEssays: RelatedEssay[]
) {
  const impressionTrackedRef = useRef(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Track impression when Related Essays section becomes visible
  useEffect(() => {
    if (impressionTrackedRef.current || relatedEssays.length === 0) return;

    // Find the Related Essays section
    const findSection = () => {
      // Look for section with related essays content
      const sections = document.querySelectorAll('section');
      for (const section of sections) {
        const heading = section.querySelector('h3, h2');
        if (heading?.textContent?.includes('Related') ||
            heading?.textContent?.includes('Continue')) {
          return section;
        }
      }
      return null;
    };

    const section = findSection();
    if (!section) return;

    sectionRef.current = section;

    // Use Intersection Observer to detect when section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !impressionTrackedRef.current) {
            impressionTrackedRef.current = true;

            trackEvent({
              event: 'related_essays_impression',
              page: currentPage,
              metadata: {
                related_essays: relatedEssays.map(e => e.slug),
                count: relatedEssays.length,
              },
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 } // Section is 50% visible
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [currentPage, relatedEssays]);

  // Return click handler for related essay links
  const trackClick = useCallback((clickedSlug: string) => {
    trackEvent({
      event: 'related_essays_click',
      page: currentPage,
      metadata: {
        from_essay: currentPage,
        to_essay: clickedSlug,
      },
    });
  }, [currentPage]);

  return { trackClick };
}
```

**Step 2: Verify file was created**

Run: `ls -la src/hooks/useRelatedEssaysTracking.ts`
Expected: File exists

**Step 3: Commit**

```bash
git add src/hooks/useRelatedEssaysTracking.ts
git commit -m "feat: add Related Essays impression and click tracking hook"
```

---

## Task 4: Integrate Tracking into EssayContent

**Files:**
- Modify: `src/components/EssayContent.tsx`

**Step 1: Add imports at top of file**

Add after existing imports (around line 6):

```typescript
import { useScrollDepth } from '@/hooks/useScrollDepth';
import { useRelatedEssaysTracking } from '@/hooks/useRelatedEssaysTracking';
import { trackEvent } from '@/lib/analytics';
```

**Step 2: Add tracking hooks in EssayContent component**

Add after the component declaration, before existing logic (around line 20):

```typescript
// Analytics tracking
useScrollDepth(`/read/${essay.slug}`);
const { trackClick } = useRelatedEssaysTracking(
  `/read/${essay.slug}`,
  relatedEssays
);

// Track page view on mount
useEffect(() => {
  trackEvent({
    event: 'pageview',
    page: `/read/${essay.slug}`,
  });
}, [essay.slug]);
```

**Step 3: Add click tracking to Related Essays links**

Find the Related Essays section (search for "Continue Reading" or "Related Essays").
Wrap each related essay link with click handler:

```typescript
<Link
  href={`/read/${related.slug}`}
  onClick={() => trackClick(related.slug)}
  className="related-essay-card"
>
```

**Step 4: Verify changes**

Run: `grep -n "useScrollDepth\|useRelatedEssaysTracking" src/components/EssayContent.tsx`
Expected: Should show import and usage lines

**Step 5: Test build**

Run: `npm run build`
Expected: Build succeeds without errors

**Step 6: Commit**

```bash
git add src/components/EssayContent.tsx
git commit -m "feat: integrate analytics tracking into essay pages

- Track scroll depth every 25% and final depth on exit
- Track Related Essays section impressions
- Track Related Essays clicks
- Track page views"
```

---

## Task 5: Add TypeScript for Missing useEffect Import

**Files:**
- Modify: `src/components/EssayContent.tsx`

**Step 1: Check if useEffect is imported**

Run: `grep -n "^import.*useEffect" src/components/EssayContent.tsx`

**Step 2: If missing, add useEffect to imports**

If useEffect is not already imported from React, add it to the existing React import:

```typescript
"use client";

import { useEffect } from "react";
```

**Step 3: Verify build still works**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit if changed**

```bash
git add src/components/EssayContent.tsx
git commit -m "fix: add useEffect import for analytics tracking"
```

---

## Task 6: Update API Route to Handle New Event Types

**Files:**
- Modify: `src/app/api/track/route.ts`

**Step 1: Verify new event types are handled**

The existing `/api/track` route already handles arbitrary event types via the `event` parameter. No changes needed - it will automatically store:
- `scroll_depth` events with `metadata.depth`
- `scroll_depth_final` events with `metadata.depth`
- `related_essays_impression` events with `metadata.related_essays` and `metadata.count`
- `related_essays_click` events with `metadata.from_essay` and `metadata.to_essay`

Run: `grep -A 10 "if (event)" src/app/api/track/route.ts`
Expected: Shows existing event tracking logic that handles any event type

**Step 2: Add comment documenting new event types**

Add comment at top of file after imports:

```typescript
/**
 * Analytics tracking endpoint
 *
 * Tracked events:
 * - pageview: Page views (automatic)
 * - scroll_depth: Scroll milestones (25%, 50%, 75%, 100%)
 * - scroll_depth_final: Final scroll position on page exit
 * - related_essays_impression: Related Essays section became visible
 * - related_essays_click: User clicked a related essay
 */
```

**Step 3: Commit**

```bash
git add src/app/api/track/route.ts
git commit -m "docs: document new analytics event types"
```

---

## Task 7: Test Analytics Tracking in Development

**Files:**
- None (manual testing)

**Step 1: Start development server**

Run: `npm run dev`
Expected: Server starts on http://localhost:3000

**Step 2: Open an essay page**

Navigate to: http://localhost:3000/read/life-is-not-empty

**Step 3: Verify scroll tracking**

Open browser DevTools Network tab. Scroll down the essay page slowly.
Expected: See POST requests to `/api/track` with:
- `event: "scroll_depth"`
- `metadata.depth: 25`, then 50, then 75, etc.

**Step 4: Verify Related Essays impression**

Scroll down to the Related Essays section (near bottom).
Expected: See POST request to `/api/track` with:
- `event: "related_essays_impression"`
- `metadata.related_essays: [array of slugs]`

**Step 5: Verify Related Essays click**

Click on a related essay link.
Expected: See POST request to `/api/track` with:
- `event: "related_essays_click"`
- `metadata.from_essay` and `metadata.to_essay`

**Step 6: Stop development server**

Press Ctrl+C to stop the server.

**Step 7: Document test results**

Create file: `docs/testing/2026-05-24-analytics-manual-test.md`

```markdown
# Analytics Manual Testing - 2026-05-24

## Test Results

### Scroll Depth Tracking
- ✅ Tracks at 25% intervals
- ✅ Tracks final depth on page exit
- ✅ Throttles events correctly (not firing too often)

### Related Essays Impression
- ✅ Fires when section becomes 50% visible
- ✅ Only fires once per page
- ✅ Includes array of related essay slugs

### Related Essays Click
- ✅ Fires on link click
- ✅ Includes from_essay and to_essay metadata
- ✅ Doesn't break navigation

### Session Tracking
- ✅ Session ID persists across pages
- ✅ Session extends on activity (30 min expiry)
- ✅ New session created after expiry

## Issues Found
[None / List any issues]

## Browser Tested
- Chrome [version]
```

**Step 8: Commit test documentation**

```bash
git add docs/testing/2026-05-24-analytics-manual-test.md
git commit -m "docs: add manual testing results for analytics tracking"
```

---

## Success Criteria

After implementation, we should have:

✅ Session ID generation and persistence (30-minute expiry)
✅ Scroll depth tracking (25%, 50%, 75%, 100% milestones)
✅ Final scroll depth on page exit
✅ Related Essays impression tracking (when section visible)
✅ Related Essays click tracking (which essay clicked)
✅ All events stored in Redis via existing `/api/track` endpoint
✅ No breaking changes to essay page functionality
✅ Clean build with no TypeScript errors
✅ Manual testing confirms all events fire correctly

---

## Next Steps (After Implementation)

1. Let analytics run for 2-4 weeks to gather data
2. Query Redis to analyze:
   - Most common exit pages (last page before session end)
   - Average scroll depth per essay (are people finishing?)
   - Related Essays impression rate (do people see the section?)
   - Related Essays click rate (do people click related essays?)
   - Session length by entry point (which pages lead to binge reading?)
3. Use insights to improve Related Essays recommendations
4. Consider adding more prominent Related Essays CTA if impression rate is low
