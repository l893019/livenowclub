# The Live Now Club: Digital Marketing Plan

Written 2026-07-08. Based on actual site analytics (30 days: ~360 visitors,
~770 pageviews), current assets, and the funnel work shipped this week.

## Goal

Grow the newsletter and get the cancer guide to the people who need it.
Primary metric: confirmed Substack subscribers. Secondary: guide pageviews,
org listings/backlinks, search impressions on guide queries.

## The Google Ads question, answered

**No paid ads right now.** The math, using our own numbers:

- Cancer-adjacent keywords cost $1-3 per click (per our own ads doc).
  $500/month buys roughly 200-400 visitors.
- Our site-wide visitor-to-signup rate has been under 1%. Even at an
  optimistic 3% on a dedicated landing page, $500 buys 6-12 subscribers.
  That is $40-80 per subscriber with no revenue behind it.
- One free Not Boring mention drove 64 visitors. Organic channels beat
  paid on every axis at this size.
- Constraint most people miss: Google restricts personalized targeting
  for health conditions. Cancer-keyword ads run without the targeting
  that makes ads efficient, and approval friction is real for personal
  sites in health topics.

**The gate to revisit:** run a paid probe only when BOTH are true:
1. A guide page demonstrably converts (3%+ of visitors click through to
   Substack confirmation), measured after Search Console is live.
2. There's $150 to spend as pure mission money (reach, not return).
Then: 2-week probe, exact-match long-tails only ("what to say to someone
with cancer" etc.), pointed at the matching guide page. Kill it if cost
per subscriber exceeds $15.

## Channels, ranked by expected return

### 1. Substack ecosystem (highest priority, free)
The recommendation engine is how small newsletters actually grow.
- **Recommendation swaps:** engage genuinely with 20 adjacent writers,
  then ask a handful directly. Seed list from writers already cited on
  the site: Charlie Warzel, The Convivial Society (L.M. Sacasas),
  Max Read. Expand: illness/mortality memoir writers (Suleika Jaouad's
  The Isolation Journals is the flagship of the genre), AI-and-meaning
  writers, poetry newsletters.
- **Notes, 2-3x per week:** quote cards already written
  (`~/Documents/quote-cards-for-substack-notes.md`, 15 cards) and an
  image generator exists (`scripts/generate-instagram-quotes.py`).
  Batch-generate once a month, schedule as Notes.

### 2. SEO (built this week, now measure)
Four guide pages live targeting real queries. The one required setup:
**Google Search Console** (needs Louise's Google account, ~5 minutes,
verify via Vercel DNS). Without it we are flying blind on the whole
channel. Check impressions at 2 and 4 weeks; build the next three pages
(telling people, hair loss, fertility preservation) only if the first
four earn impressions.

### 3. Partnerships and backlinks (drafts ready)
Seven personalized emails sit in `~/livenowclub-outreach-drafts.md`
(Imerman Angels, CaringBridge, Cervivor, Stupid Cancer, CancerCare,
Cancer Support Community, Patient Advocate Foundation). Send 2-3 per
week from Gmail. Each listing is distribution AND the authority signal
Google needs for health content. Follow up once after 2 weeks.

### 4. Publication pitches (templates ready)
`~/Documents/essay-by-essay-pitch-templates.md` covers all essays.
One placement is worth months of everything else. Priority pitches:
- "Fixing the Unfixable" → The Cut, The Atlantic (family/health), Longreads
- "I wrote this with my eyes" → Modern Love adjacent, The Guardian's
  first-person desk
- "All I want for my birthday..." → Oldster, The Isolation Journals guest post
Cadence: one pitch per week. Expect silence; it only takes one.

### 5. Podcasts
The story (D1 rower, tech founder, stage IV at 34, writing through it,
now building interactive essays about AI and purpose) fits three
different podcast categories: cancer/survivorship, tech/AI-and-meaning,
and writing/creativity. One application or cold email per week.
Podcast listeners convert to subscribers far better than web traffic.

### 6. Instagram (existing channel, low lift)
IG already sends ~50 visitors/month. Reuse the same quote cards as
Notes. Link in bio → /navigate/cancer (the guide converts strangers
better than the homepage). No new platform investment beyond this.

### 7. Paid ads
Not now. See gate above.

## Weekly rhythm (2-3 hours beyond the writing itself)

- **Publish day:** essay goes out (already weekly). Post one quote Note
  the same day linking it.
- **Midweek (30 min):** send 2 partnership emails + 1 pitch or podcast
  application. Track replies in the outreach file.
- **Friday (30 min):** 1-2 quote Notes. Spend 15 minutes genuinely
  engaging with target writers' work (comments, restacks).
- **Monthly (30 min):** run `node scripts/marketing-report.mjs`, review
  numbers, decide next batch of SEO pages, adjust.

## Measurement

Run `node scripts/marketing-report.mjs` (reads the site's stats API with
the admin key) for: visitors, signups, top referrers, guide pageviews.
Manual checks: Substack dashboard for confirmed subscribers,
Search Console for query impressions, outreach file for listings won.

Decision gates:
- SEO pages earn impressions by week 4 → build next 3 pages.
- An org lists the guide → cite it in the Tier 4 hospital submissions.
- A guide page converts 3%+ → consider the $150 ads probe.
- A recommendation swap lands → prioritize that writer's adjacent network.

## What this plan deliberately skips

Paid ads (for now), new social platforms (TikTok/YouTube: real potential,
wrong stage; revisit at 1,000 subscribers), SEO content farms, and anything
that requires posting daily. The writing is the product; marketing is
90 minutes of distribution stapled to a publishing habit that already exists.
