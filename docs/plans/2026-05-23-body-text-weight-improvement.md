# Body Text Weight Improvement

**Goal:** Improve body text readability on mobile by increasing font weight from 300 (light) to 400 (normal).

**Problem:** Current body text uses font-weight: 300 with 75% opacity, making it difficult to read on mobile devices, especially in bright light.

**Solution:** Increase font weight to 400 globally while preserving the subtle aesthetic through unchanged opacity.

---

## Scope

**What we're changing:**
- Essay body text: 300 → 400 weight
- Homepage body text: 300 → 400 weight
- General paragraph text across site: 300 → 400 weight
- Keep all opacity values unchanged (subtle 75% stays)

**What we're NOT changing:**
- Headings (intentionally lighter at 300 for contrast)
- UI labels and captions (already 400)
- Monospace/code text
- Font size or line-height (already well-tuned)

## Implementation

### Files to Update

**1. src/components/EssayContent.tsx**
- Line 488-489: `.essay-content` font-weight: 300 → 400

**2. src/app/globals.css**
Core body text patterns to audit and update where needed:
- `.essay-content` → 400 (if duplicated in global)
- Homepage intro text (`.intro-body`)
- Connect page subtitle (`.connect-subtitle`)
- Navigate cancer guide descriptions
- Any `.text-body` or paragraph classes using font-weight: 300

### Approach

Apply font-weight: 400 globally (not just mobile-specific) because:
- Consistency across devices
- 400 is still elegant, just more readable
- Simpler CSS (one change vs. media query logic)

### Changes

```css
/* Before */
.essay-content {
  font-weight: 300;
}

/* After */
.essay-content {
  font-weight: 400;
}
```

Apply this pattern to all body text across the site that currently uses 300.

## Testing

Verify on actual mobile devices (iPhone/Android) in bright light:
- /read/a-dream-unborn (newest essay)
- Homepage intro section
- /navigate/cancer guide descriptions
- /connect page

## Success Criteria

- Body text noticeably easier to read on mobile
- Maintains elegant, literary aesthetic
- No visual regression on desktop
- Consistent weight across all body text
