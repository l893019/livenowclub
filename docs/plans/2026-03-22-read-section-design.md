# /read Section Design — Immersive Essay Cards

*Created March 22, 2026*

## Overview

Transform the `/read` section from a Substack redirect into an immersive, swipeable card experience showcasing all Live Now Club essays and poems.

## Design Principles

- **Immersive**: Full-viewport cards that feel like flipping through a beautiful magazine
- **Consistent**: Match After Abundance typography and color palette
- **Dual-platform**: Content lives here AND on Substack (Substack for growth, site for experience)

## Typography (from After Abundance)

```css
--sans: 'Space Grotesk', system-ui, sans-serif;
--mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;

--bg-deep: #faf6f1;
--bg: #fffbf7;
--text: #2d2a26;
--text-dim: rgba(45,42,38,0.7);
--accent-pink: #e8178a;
--accent-coral: #ff6b6b;
--accent-gold: #f4a03f;
--accent-teal: #3db9a4;
--accent-lavender: #9b8fef;
```

## Card Design

Each essay card is full-viewport and contains:

1. **Background**: Full-bleed image OR solid accent color (coral, gold, teal, lavender, pink)
2. **Type label**: JetBrains Mono, 11px, uppercase, letter-spaced (`ESSAY` / `POEM` / `GUIDE`)
3. **Title**: Space Grotesk, ~48px mobile / ~72px desktop, bold
4. **Pull quote**: First line or subtitle, Space Grotesk, 18px, italic
5. **Date**: JetBrains Mono, 12px, muted
6. **Tap target**: Entire card is clickable → opens full essay

## Navigation

- **Mobile**: Horizontal swipe (touch gestures)
- **Desktop**: Arrow keys, scroll wheel, or click arrows
- **Position indicator**: Dot navigation at bottom
- **Filters**: Optional pill buttons at top (All / Essays / Poems / Guides)

## Full Essay View

- Same styling as After Abundance essay
- Back arrow → returns to card deck at same position
- Footer: "Continue the conversation on Substack →" link

## Content Source

- 52 essays in `content/essays/*.md`
- Images in `public/images/`
- Frontmatter for metadata (title, date, type, image, substackUrl)

## Technical Approach

- React component with touch/swipe handling (use existing CSS scroll-snap or Framer Motion)
- Static generation from markdown files at build time
- Dynamic routes: `/read/[slug]` for individual essays
- Shared layout with After Abundance styling

## File Structure

```
src/app/read/
  page.tsx          # Card deck view
  [slug]/
    page.tsx        # Individual essay view
  components/
    EssayCard.tsx   # Single card component
    CardDeck.tsx    # Swipe container
    EssayContent.tsx # Full essay renderer

content/essays/
  *.md              # Essay markdown files (already exist)

public/images/
  *.jpg             # Essay images (already exist)
```
