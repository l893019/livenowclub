#!/usr/bin/env node
/**
 * Weekly/monthly marketing snapshot for livenowclub.com.
 *
 * Usage: node scripts/marketing-report.mjs [--days 7]
 *
 * Reads the site's stats API with the admin key from
 * ~/.livenowclub-admin-key. Pair with manual checks: Substack dashboard
 * (confirmed subscribers) and Google Search Console (query impressions).
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const days = process.argv.includes("--days")
  ? parseInt(process.argv[process.argv.indexOf("--days") + 1])
  : 7;

const keyPath = path.join(os.homedir(), ".livenowclub-admin-key");
if (!fs.existsSync(keyPath)) {
  console.error(`Missing admin key at ${keyPath}`);
  process.exit(1);
}
const KEY = fs.readFileSync(keyPath, "utf-8").trim();

const res = await fetch(`https://livenowclub.com/api/stats?days=${days}`, {
  headers: { Authorization: `Bearer ${KEY}` },
});
if (!res.ok) {
  console.error(`stats API returned ${res.status}`);
  process.exit(1);
}
const s = await res.json();

const sum = (o) => Object.values(o || {}).reduce((a, b) => a + b, 0);
const top = (o, n = 8) =>
  Object.entries(o || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);

console.log(`\n=== livenowclub marketing report: last ${days} days ===\n`);
console.log(`Visitors:        ${sum(s.visitors)}`);
console.log(`Pageviews:       ${sum(s.pageviews)}`);
console.log(`Email signups:   ${sum(s.emails?.byDate || {})} (site handoffs; confirm real subs in Substack dashboard)`);

console.log(`\nTop referrers:`);
for (const [ref, n] of top(s.referrers)) console.log(`  ${String(n).padStart(5)}  ${ref}`);

console.log(`\nTop pages:`);
for (const p of (s.topPages || []).slice(0, 10)) console.log(`  ${String(p.views).padStart(5)}  ${p.page}`);

const guidePages = (s.topPages || []).filter((p) => p.page.startsWith("/navigate/cancer"));
console.log(`\nGuide pages (SEO spokes):`);
if (guidePages.length === 0) console.log(`  no guide pageviews recorded in this window`);
for (const p of guidePages) console.log(`  ${String(p.views).padStart(5)}  ${p.page}`);

console.log(`\nManual checklist:`);
console.log(`  [ ] Substack dashboard: confirmed subscriber count`);
console.log(`  [ ] Search Console: impressions/clicks for guide queries`);
console.log(`  [ ] ~/livenowclub-outreach-drafts.md: replies and listings won`);
console.log(`  [ ] Notes posted this week: target 2-3\n`);
