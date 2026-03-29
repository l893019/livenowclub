# Curator Content Architecture - The Live Now Club V2

*Updated 2026-03-29*

## Changes Made

Based on Memoirist essay mapping and Strategist section definitions, I've reorganized the content architecture in `src/lib/essays.ts`.

### Key Fixes

1. **"Fixing the Unfixable" removed from Grief & Loss**
   - It's foundational philosophy, not a grief essay
   - Now in: Start Here, Wisdom, For Caregivers

2. **Cancer Meditations treated as series**
   - Created dedicated `cancer-meditations` pathway
   - Always presented together, in order

3. **Created "Wonder" pathway**
   - For: Soul.md, The Butterfly Dream, Life is not empty
   - Shows Louise is more than cancer

4. **Created "Survivorship" section in Cancer Guide**
   - For post-treatment essays
   - The other side of grief, Life is not empty

5. **Updated MOODS for soft entry points**
   - Added: "I'm supporting someone I love" → For caregivers
   - Added: "I'm curious who you are" → For new visitors
   - Added: `primary` field for the lead essay

### Pathway Structure

| Pathway | Purpose | Lead Essay |
|---------|---------|------------|
| start-here | Foundation, orient new visitors | the-live-now-club |
| cancer-meditations | Treatment series, read in order | cancer-meditations |
| cancer-journey | Full story arc | embracing-free-fall |
| grief-loss | Processing loss | the-other-side-of-grief |
| finding-joy | Beauty despite | the-case-for-magical-thinking |
| wonder | AI, philosophy, dreams | soulmd |
| wisdom | Deeper questions | fixing-the-unfixable |
| poems | Short form, verse | and-still-the-figs-ripen |
| self-love | Inner work | i-love-lou |

### Cancer Guide Structure (Navigate page)

| Section | Purpose | Primary Audience |
|---------|---------|------------------|
| just-diagnosed | Practical guide | Newly diagnosed |
| cancer-meditations | Treatment series | Anyone on the journey |
| during-treatment | Day-to-day survival | Patients |
| for-caregivers | What to say/do | Support people |
| survivorship | After treatment | Recovery |
| finding-meaning | Philosophy | Everyone |

### Soft Entry Points (Homepage)

| Prompt | Target Essay | Audience |
|--------|--------------|----------|
| "I just got a diagnosis" | Expecting the Unexpected | Newly diagnosed |
| "I'm grieving" | The other side of grief | Grieving visitors |
| "I'm supporting someone I love" | Fixing the Unfixable | Caregivers |
| "I need to feel less alone" | The Live Now Club | Anyone isolated |
| "I'm curious who you are" | The Live Now Club | New visitors |
| "I want to think deeply" | Soul.md | Intellectuals |
| "I want something beautiful" | and still the figs ripen | Peace seekers |

## Curator Sign-Off

Content is now organized by:
- User intent (not just topic)
- Reading journey (essays link to related essays)
- Persona needs (each persona has a clear entry point)

**Reviewed by Curator, 2026-03-29**
