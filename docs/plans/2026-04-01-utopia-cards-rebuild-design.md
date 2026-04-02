# Utopia Cards Rebuild Design

**Date:** 2026-04-01
**Status:** Approved
**Project:** livenowclub quiz utopia feature

## Problem

The current `SwipeableMembers.tsx` has several issues:

1. **Content is mechanical** — Blended vision does naive string concatenation. Tensions only cover 6 hardcoded pairs. Book recommendation just picks the most common archetype's book.

2. **Interaction feels basic** — Swipe doesn't follow finger, no drag on desktop, no momentum or spring physics.

3. **Code is messy** — 250+ lines of inline CSS, data duplicated across files, unused props.

## Solution

Full rebuild with three layers:

1. **Data layer** — Single source of truth with handcrafted pair dynamics
2. **Interaction layer** — Embla Carousel for physics
3. **Presentation layer** — Focused components with extracted CSS

## Architecture

### File Structure

```
src/
├── lib/
│   └── archetypes.ts          # All archetype data + content generation
├── app/wonder/essay/quiz/utopia/[slug]/
│   ├── page.tsx               # Server component (imports from archetypes.ts)
│   ├── UtopiaCards.tsx        # Client component (replaces SwipeableMembers)
│   ├── UtopiaCards.module.css # Extracted styles
│   ├── CombinedCard.tsx       # Combined view card
│   ├── ArchetypeCard.tsx      # Individual archetype card
│   └── useCarousel.ts         # Embla wrapper hook
```

### Data Layer (`src/lib/archetypes.ts`)

```typescript
// Core archetype data
export const archetypes = {
  shaper: {
    key: "shaper",
    name: "Shaper of Change",
    color: "#f4a03f",
    utopia: "Their utopia is never finished. Everything is always changing.",
    description: "The moment you stop adapting, you start calcifying...",
    blindSpot: "They sometimes mistake movement for progress...",
    superpower: "building from scratch",
    book: { title: "Parable of the Sower", author: "Butler" },
  },
  // ... all 14 archetypes
} as const;

// Handcrafted pair dynamics (~40 key pairings)
export const pairDynamics: Record<string, string> = {
  "shaper+rooted": "The Shapers want to tear it down and rebuild. The Rooted ask: what was wrong with it?",
  "shaper+embers": "One races toward tomorrow. The other holds yesterday close. Between them, the present gets attention.",
  "conscience+citizen": "The Citizen trusts the architecture. The Conscience tests the walls for cracks.",
  // ... more pairings
};

// Content generation functions
export function getBlendedVision(keys: string[]): string;
export function getGroupDynamic(keys: string[]): string | null;
export function getSuperpowers(keys: string[]): string[];
export function getMissingVoices(keys: string[], limit?: number): Array<{key: string, insight: string}>;
export function getGroupBook(keys: string[]): { title: string; author: string };
```

**Key design decisions:**

- Pair dynamics use `"archA+archB"` keys (alphabetically sorted) so `shaper+rooted` and `rooted+shaper` map to the same entry
- Not all 91 pairs need entries — only the ~40 interesting ones. Others fall back to template.
- Functions return computed content; components just render it.

### Interaction Layer (`useCarousel.ts`)

```typescript
import useEmblaCarousel from 'embla-carousel-react';

export function useCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: false,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Sync state with Embla on select
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') emblaApi?.scrollPrev();
      if (e.key === 'ArrowRight') emblaApi?.scrollNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [emblaApi]);

  return {
    emblaRef,
    currentIndex,
    totalSlides: emblaApi?.scrollSnapList().length ?? 0,
    canScrollPrev,
    canScrollNext,
    scrollPrev: () => emblaApi?.scrollPrev(),
    scrollNext: () => emblaApi?.scrollNext(),
    scrollTo: (i: number) => emblaApi?.scrollTo(i),
  };
}
```

**What Embla provides:**
- Finger-following swipe with momentum
- Click-and-drag on desktop
- Smooth snap animations
- Edge resistance

**What we add:**
- Keyboard navigation (arrow keys)
- State exposure for our UI (current index, can scroll prev/next)

### Presentation Layer

**UtopiaCards.tsx** — Orchestrates carousel and renders cards:

```typescript
export function UtopiaCards({ members, createdBy, utopiaName }) {
  const { emblaRef, currentIndex, scrollPrev, scrollNext, canScrollPrev, canScrollNext, scrollTo, totalSlides } = useCarousel();
  const grouped = groupByArchetype(members);
  const presentKeys = Object.keys(grouped).sort((a, b) => grouped[b].length - grouped[a].length);

  return (
    <div className={styles.container}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.track}>
          <CombinedCard
            utopiaName={utopiaName}
            presentKeys={presentKeys}
            grouped={grouped}
          />
          {presentKeys.map(key => (
            <ArchetypeCard
              key={key}
              archetypeKey={key}
              members={grouped[key]}
              createdBy={createdBy}
            />
          ))}
        </div>
      </div>
      <Navigation
        currentIndex={currentIndex}
        totalSlides={totalSlides}
        canScrollPrev={canScrollPrev}
        canScrollNext={canScrollNext}
        onPrev={scrollPrev}
        onNext={scrollNext}
        onDotClick={scrollTo}
        presentKeys={presentKeys}
      />
    </div>
  );
}
```

**CombinedCard.tsx** — Renders the combined utopia view:

```typescript
export function CombinedCard({ utopiaName, presentKeys, grouped }) {
  const blendedVision = getBlendedVision(presentKeys);
  const dynamic = getGroupDynamic(presentKeys);
  const superpowers = getSuperpowers(presentKeys);
  const missingVoices = getMissingVoices(presentKeys, 2);
  const book = getGroupBook(presentKeys);

  return (
    <article className={styles.card}>
      <span className={styles.label}>Your Utopia</span>
      <h3 className={styles.title}>{utopiaName}</h3>
      <p className={styles.vision}>{blendedVision}</p>
      {dynamic && <p className={styles.dynamic}>{dynamic}</p>}
      <Composition grouped={grouped} />
      {superpowers.length > 0 && <Superpowers powers={superpowers} />}
      {missingVoices.length > 0 && <MissingVoices voices={missingVoices} />}
      {book && <BookRecommendation book={book} />}
    </article>
  );
}
```

**ArchetypeCard.tsx** — Renders individual archetype cards:

```typescript
export function ArchetypeCard({ archetypeKey, members, createdBy }) {
  const data = archetypes[archetypeKey];
  const currentUserId = useCurrentUserId(); // Custom hook for localStorage

  return (
    <article className={styles.card}>
      <img
        src={`/wonder/essay/quiz/images/utopia-${archetypeKey}.png`}
        alt={data.name}
        className={styles.cardImage}
      />
      <span className={styles.label} style={{ color: data.color }}>{data.name}</span>
      <MemberList members={members} createdBy={createdBy} currentUserId={currentUserId} />
      <section>
        <span className={styles.sectionLabel}>Their utopia</span>
        <p className={styles.utopia}>{data.utopia}</p>
      </section>
      <p className={styles.description}>{data.description}</p>
      <section>
        <span className={styles.sectionLabel}>Blind spot</span>
        <p className={styles.blindspot}>{data.blindSpot}</p>
      </section>
    </article>
  );
}
```

### CSS Module (`UtopiaCards.module.css`)

Extracted from inline styles. Key sections:

- `.container`, `.viewport`, `.track` — Carousel structure
- `.card`, `.cardImage` — Card styling
- `.label`, `.sectionLabel`, `.title` — Typography
- `.vision`, `.dynamic`, `.utopia`, `.description`, `.blindspot` — Content blocks
- `.nav`, `.arrow`, `.dots`, `.dot` — Navigation
- `@media (min-width: 640px)` — Desktop adjustments

~100 lines vs the current 250+ inline.

## Deletions

- `SwipeableMembers.tsx` — Replaced by new components
- `EditableMemberList.tsx` — Unused after SwipeableMembers was added
- Inline `archetypeData` in `page.tsx` — Replaced by import from `archetypes.ts`

## New Dependencies

- `embla-carousel-react` (~3kb gzipped)

## Content Work Required

The bulk of the effort is writing quality copy for:

1. **~40 pair dynamics** — Handcrafted sentences for interesting archetype combinations
2. **Blended vision templates** — How to combine 2, 3, 4+ archetypes gracefully
3. **Missing voice insights** — One sentence per archetype explaining the gap
4. **Group book logic** — How to pick a book that represents the whole group

## Success Criteria

1. Swipe follows finger on mobile
2. Click-and-drag works on desktop
3. Blended vision reads naturally, not mechanically
4. Pair dynamics feel insightful, not templated
5. CSS is maintainable
6. No data duplication
