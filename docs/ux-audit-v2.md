# UX AUDIT: The Live Now Club V2

### Audit Date: 2026-03-29
### Scope: Full site after V2 updates
### Auditor: UX Auditor (L2)

---

## User Journeys Tested

| Persona | Goal | Entry Point | Success? | Notes |
|---------|------|-------------|----------|-------|
| **Newly Diagnosed** | Find practical help | Homepage | YES | Soft entry "I just got a diagnosis" → Expecting the Unexpected |
| **Grieving** | Feel less alone | Homepage | YES | Soft entry "I'm grieving" → The other side of grief |
| **Caregiver** | Know what to say | Homepage | YES | Soft entry "I'm supporting someone" → Fixing the Unfixable |
| **Curious** | Learn who Louise is | Homepage | YES | Soft entry "I'm curious who you are" → The Live Now Club |
| **Returning** | Browse essays | Homepage | YES | "Keep Reading" section has curated essays |
| **Wonder Seeker** | Intellectual content | Homepage | YES | Soft entry "I want to think deeply" → Soul.md |

### Journey Details

#### Journey 1: Newly Diagnosed

```
Homepage → See soft entries → Click "I just got a diagnosis"
→ Lands on: Expecting the Unexpected
→ Result: SUCCESS - immediate practical help
```

**No friction points.** The soft entry point leads directly to the right essay.

#### Journey 2: Grieving

```
Homepage → See soft entries → Click "I'm grieving"
→ Lands on: The other side of grief
→ Result: SUCCESS - emotional resonance
```

**No friction points.** Direct path to relevant content.

#### Journey 3: Caregiver (Supporting Someone)

```
Homepage → See soft entries → Click "I'm supporting someone I love"
→ Lands on: Fixing the Unfixable
→ Result: SUCCESS - exactly what they need
```

**No friction points.** The essay directly addresses "what to say."

#### Journey 4: Curious / First-Time Visitor

```
Homepage → See handwritten question (strong hook)
→ See soft entries → Click "I'm curious who you are"
→ Lands on: The Live Now Club (manifesto)
→ Result: SUCCESS - understands who Louise is
```

**Minor observation:** Could also benefit from visible "About" link. Currently in navigation is not prominent.

#### Journey 5: Want to Browse by Topic

```
Homepage → Click "Read" in nav → Lands on /read
→ Sees: Latest, Start Here, Cancer Journey, Grief & Loss, etc.
→ Result: SUCCESS - well-organized by theme
```

**No friction points.** Pathways are clear and well-labeled.

#### Journey 6: Looking for Cancer Guide Specifically

```
Homepage → Click "Navigate" in nav → Lands on /navigate
→ Sees: Quick links to Just Diagnosed, During Treatment, For Caregivers, Finding Meaning
→ Result: SUCCESS - comprehensive guide structure
```

**No friction points.** Very clear navigation within the guide.

---

## Friction Inventory (Priority Order)

### Critical (Users Give Up)
*None found.* The V2 structure addresses the V1 navigation issues.

### High (Users Confused)
*None found.* Soft entry points provide clear emotional pathways.

### Medium (Suboptimal but Workable)

1. **Wonder page is thin**
   - Location: /wonder
   - Issue: Only shows "After Abundance" essay. Says "More explorations coming soon."
   - Impact: Users clicking "Wonder" may feel there's not much content
   - Recommended fix: Add the Wonder essays from essays.ts (Soul.md, Butterfly Dream, etc.) or hide the nav item until more content exists

2. **About page not prominent**
   - Location: Header nav
   - Issue: No visible "About" or "Who is Louise?" link in main nav
   - Impact: Curious visitors have to infer from essays
   - Recommended fix: Consider adding About to nav OR ensure soft entry "I'm curious who you are" is sufficient

3. **Subscribe button placement**
   - Location: Floating subscribe button
   - Issue: Floating button may be unexpected; CTA in hero might be more natural
   - Impact: Minor - subscription is available but not seamlessly integrated

### Low (Nice to Have)

1. **Essay read time not shown**
   - Impact: Users don't know commitment before clicking

2. **No search functionality**
   - Impact: Power users can't search across essays

---

## Navigation Assessment

- **Primary nav:** GOOD - Read, Navigate, Wonder, Connect is clear hierarchy
- **Wayfinding:** GOOD - Each page has consistent header with active state
- **Breadcrumbs:** N/A - Single-level navigation doesn't need breadcrumbs
- **Dead ends:** NONE FOUND - Every page has nav and next steps
- **Entry points:** GOOD - Soft entries on homepage address main emotional states

---

## The Stranger Test Results

| Test | Homepage | /read | /navigate | /wonder | /connect |
|------|----------|-------|-----------|---------|----------|
| Clear where I am | YES | YES | YES | YES | YES |
| Clear what to do | YES | YES | YES | YES | YES |
| Can find what came for | YES | YES | YES | PARTIAL* | YES |
| Easy to recover if lost | YES | YES | YES | YES | YES |

*Wonder shows limited content but is clear about what it is.

---

## Top 3 Recommendations

1. **Add more content to Wonder page OR link to existing essays**
   - Soul.md, Butterfly Dream, Life is not empty all fit the "Wonder" theme
   - Currently only shows After Abundance

2. **Consider mobile testing**
   - Soft entry points should wrap gracefully
   - Haven't verified on actual mobile

3. **Add read time to essay cards**
   - Helps users gauge commitment
   - Minor quality-of-life improvement

---

## Hand-offs Needed

### To Designer
- Consider adding Wonder essays to /wonder page
- Verify mobile responsiveness of soft entry pills

### To Curator
- Content is well-organized. No IA issues found.

### To Strategist
- Wonder page positioning: Is it about AI only, or broader philosophy? Current content suggests AI focus but Soul.md would fit.

---

## Comparison to V1

| Issue | V1 Status | V2 Status |
|-------|-----------|-----------|
| Users get lost after landing on essay | PROBLEM | FIXED - Soft entries guide them |
| Essays miscategorized | PROBLEM | FIXED - Memoirist reviewed |
| No caregiver-specific entry | PROBLEM | FIXED - "I'm supporting someone I love" |
| Navigation too abstract | PROBLEM | FIXED - Emotional prompts, not categories |
| Handwritten hero removed | PROBLEM | FIXED - Hero preserved |
| Soul stripped from design | PROBLEM | FIXED - Brand Guardian will verify |

---

## Overall Assessment

**V2 is a significant improvement.** The soft entry points solve the core V1 problem of users not knowing where to start. Each persona has a clear path. Navigation is consistent. Content is well-organized.

**Remaining work:**
- Wonder page content consolidation
- Mobile verification
- Brand Guardian review for soul preservation

**UX Auditor Sign-Off: PASS** (with minor recommendations above)

---

*Audit completed 2026-03-29 by UX Auditor (L2)*
