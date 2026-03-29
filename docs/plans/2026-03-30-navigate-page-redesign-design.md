# Navigate Page Redesign

**Date:** 2026-03-30
**Status:** Approved
**Goal:** Soften Navigate page styling to match Wonder/Connect editorial vibe

## Problem

The Navigate page has a "technical guide" aesthetic that feels disconnected from the rest of the site:
- Heavy typography (font-weight 500)
- Monospace fonts throughout
- Dramatic section backgrounds (dark charcoal, pink gradient)
- Missing standard footer

## Design Changes

### 1. Hero & Labels

| Element | Current | New |
|---------|---------|-----|
| `.navigate-label` | Mono font, pill badge with border | Sans-serif, 11px, 0.3em spacing, simple uppercase |
| `.navigate-hero h1` | font-weight: 500 | font-weight: 300 |
| `.navigate-hero` | padding: 160px top | padding: 120px top |
| `.navigate-container` | No padding defined | padding: 120px 24px 80px |

### 2. Section Backgrounds

| Section | Current | New |
|---------|---------|-----|
| `.guide-section` (base) | cream | cream (unchanged) |
| `.guide-section--white` | white | white (unchanged) |
| `.guide-section--dark` | charcoal background, white text | cream-dark (#F0EDE6) with subtle top border |
| `.guide-section--warm` | pink gradient | cream-light (#FFFBF7) |

### 3. Typography & Fonts

| Element | Current | New |
|---------|---------|-----|
| Section numbers | Mono font, heavy | Sans-serif, 11px, 0.3em spacing, pink |
| Card headings | font-weight: 500 | font-weight: 400 |
| Card type labels | Mono, 0.65rem | Sans-serif, 10px, 0.3em spacing |
| Quick-link numbers | Mono, 1.5rem, 600 weight | Sans-serif, 1.25rem, 400 weight |
| Quick-link subtitles | Mono, 0.65rem | Sans-serif, 11px, 0.2em spacing |

### 4. Footer & Misc

| Element | Change |
|---------|--------|
| `.guide-footer-cta` | Keep but soften — remove heavy top border |
| Standard footer | Add after CTA (matches Wonder/Connect) |
| `.subscribe-float` | Remove (inconsistent with other pages) |

## Files to Modify

1. `src/app/globals.css` — Update navigate-specific styles
2. `src/app/navigate/page.tsx` — Add standard footer, remove floating subscribe

## Implementation Notes

- Keep all structural elements (quick-links grid, numbered sections, card layouts)
- Only change visual styling (fonts, weights, colors, backgrounds)
- Test on mobile — ensure responsive behavior still works
