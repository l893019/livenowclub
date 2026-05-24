# Reader Analytics Design

**Goal:** Understand where readers drop off and why they don't continue to the next essay, so we can convert more readers into binge readers (10+ essays per session).

**Context:** Currently ~10% of readers become "binge readers" who read 10+ essays in one session. We want to increase this percentage by improving the organic "Related Essays" experience, but we don't know where or why readers stop.

**Approach:** Add client-side analytics tracking to capture session behavior, exit points, and engagement with Related Essays sections.

---

## What We'll Track

### 1. Exit Pages (Session End)
Track the last page a reader visits before leaving the site.

**Why:** Identifies which essays readers stop at. Are certain essays dead-ends? Do readers leave after heavy grief essays vs lighter ones?

**Implementation:** Track page views with timestamps, identify last page in session when user leaves (no activity for 30+ minutes).

### 2. Time on Page
Track how long readers spend on each individual essay page.

**Why:** Distinguishes between "skim and leave" vs "deep read and leave". If they spent 8 minutes on an essay, they actually read it. If they spent 30 seconds, they bounced.

**Implementation:** Record timestamp on page load, calculate duration on page unload/visibility change.

### 3. Scroll Depth
Track how far down each essay page the reader scrolls (percentage completion).

**Why:** Identifies incomplete reads vs complete reads. Did they read the whole essay then leave? Or did they stop halfway and bounce?

**Implementation:** Track scroll position, calculate percentage of total page height. Record max scroll depth reached.

### 4. Related Essays Engagement
Track impressions (was section visible?) and clicks (did they click any related essay?).

**Why:** Tests whether Related Essays section is actually working. Is it invisible? Are the recommendations irrelevant? Do readers not see it?

**Implementation:** Use Intersection Observer to detect when Related Essays section enters viewport (impression). Track clicks on related essay links.

---

## Data Structure

### Event Types

```typescript
// Page view with session tracking
{
  event: 'page_view',
  session_id: string,      // Unique per browser session
  timestamp: number,
  page: string,            // Essay slug or page path
  referrer: string         // Previous page or external
}

// Scroll tracking (periodic updates)
{
  event: 'scroll_depth',
  session_id: string,
  timestamp: number,
  page: string,
  max_depth: number        // Percentage (0-100)
}

// Related essays impression
{
  event: 'related_essays_impression',
  session_id: string,
  timestamp: number,
  page: string,            // Current essay
  related: string[]        // Slugs of related essays shown
}

// Related essays click
{
  event: 'related_essays_click',
  session_id: string,
  timestamp: number,
  from_page: string,       // Current essay
  to_page: string          // Clicked related essay
}

// Session end (calculated)
{
  event: 'session_end',
  session_id: string,
  timestamp: number,
  exit_page: string,       // Last page before leaving
  total_pages: number,     // Essays read in session
  total_time: number       // Total session duration (ms)
}
```

---

## Storage

**Short term:** Vercel Analytics (already enabled)
- Use existing `/api/track` endpoint
- Store events in Vercel Analytics dashboard
- Query via Vercel Analytics API

**Long term consideration:** If Vercel Analytics doesn't support custom events well, could add:
- Tinybird (fast analytics)
- PostHog (product analytics)
- Simple SQLite database

**For now:** Start with Vercel Analytics and existing `/api/track` endpoint. We can migrate later if needed.

---

## Privacy

- No PII collected (no names, emails, IPs stored)
- Session ID is random UUID, not linked to identity
- No cross-site tracking
- Analytics purely for understanding behavior to improve experience
- Could add simple notice in footer: "We use anonymous analytics to improve your reading experience"

---

## Success Criteria

After implementing, we should be able to answer:

1. **Where do readers stop?**
   - Which essays are most common exit pages?
   - Are certain pathways (grief-loss, finding-joy) more likely to end sessions?

2. **Why do they leave?**
   - Low scroll depth = didn't finish essay, content didn't hook them
   - High scroll depth + no related click = related essays not compelling
   - Related essays not visible = UX issue (need to scroll up?)

3. **What converts readers to binge readers?**
   - What's different about sessions with 10+ essays?
   - Which entry points lead to longer sessions?
   - Which related essay recommendations work best?

---

## Implementation Plan

Will be detailed in separate implementation plan, but high-level:

1. Create analytics tracking utilities (session ID, event tracking)
2. Add page view tracking to essay pages
3. Add scroll depth tracking with throttling
4. Add Related Essays impression/click tracking
5. Create analytics dashboard/queries to visualize data
6. Run for 2-4 weeks to gather data
7. Analyze and design improvements based on findings

---

## Next Steps

1. Create detailed implementation plan with task breakdown
2. Set up git worktree for isolated development
3. Implement analytics tracking
4. Deploy and monitor data collection
5. Analyze after 2-4 weeks and design improvements
