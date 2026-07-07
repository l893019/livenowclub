#!/usr/bin/env node
/**
 * Sync new Substack essays into content/essays/.
 *
 * Fetches the RSS feed, finds posts not yet in content/essays/, converts
 * their HTML to the site's markdown format, downloads images into
 * public/images/, and writes the essay files.
 *
 * Usage:
 *   node scripts/sync-substack.mjs            # sync missing essays
 *   node scripts/sync-substack.mjs --dry-run  # report + convert, write nothing
 *   node scripts/sync-substack.mjs --force <slug> --out <dir>  # regenerate one post into <dir>
 *
 * After a sync, still needed by hand (the script prints reminders):
 *   - IMAGE_MAP entry in src/lib/essays.ts (card thumbnails)
 *   - SUBSTACK_SLUG_OVERRIDES entry if the site slug differs from Substack's
 *   - Pathway / pull-quote curation
 */

import fs from "node:fs";
import path from "node:path";

const FEED_URL = "https://louiseireland.substack.com/feed";
const REPO_ROOT = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const ESSAYS_DIR = path.join(REPO_ROOT, "content/essays");
const IMAGES_DIR = path.join(REPO_ROOT, "public/images");

// Posts that should never be synced (e.g. announcements of the site itself)
const SKIP_SLUGS = new Set(["when-purpose-is-all-we-have-left"]);

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const FORCE_SLUG = args.includes("--force") ? args[args.indexOf("--force") + 1] : null;
const OUT_DIR = args.includes("--out") ? args[args.indexOf("--out") + 1] : null;

// --- helpers -----------------------------------------------------------

// Must match slugify() in src/lib/essays.ts
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function decodeEntities(s) {
  const named = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, n) => named[n]);
}

function existingSlugs() {
  return new Set(
    fs
      .readdirSync(ESSAYS_DIR)
      .filter((f) => f.endsWith(".md"))
      .map((f) => {
        const m = f.match(/^\d{4}-\d{2}-\d{2}\s+(.+)\.md$/);
        return slugify(m ? m[1] : f.replace(/\.md$/, ""));
      })
  );
}

// --- HTML -> markdown ---------------------------------------------------

// Trailing Substack boilerplate to strip (matched against whole blocks, from the end)
const BOILERPLATE = [
  /^thank you for reading/i,
  /^thanks for reading/i,
  /^\[?subscribe now\]?/i,
  /^\[?share the live now club\]?/i,
  /^\[?share\]?\(/i,
  /^more of my writing can be found/i,
  /^love,\s*$/i,
  /^lou\s*$/i,
  /^love,\s*lou\s*$/i,
  /^---$/,
];

function htmlToBlocks(html) {
  // Strip whole elements we never want
  html = html
    .replace(/<(button|svg|form|style|script|input)[\s\S]*?<\/\1>/gi, "")
    .replace(/<(input|source)[^>]*\/?>/gi, "");

  const blocks = [];
  const seenImages = new Set();
  let buf = "";
  let inBlockquote = false;
  let linkHref = null;

  const flush = () => {
    const t = buf.trim().replace(/\s+\n/g, "\n");
    if (t) blocks.push(inBlockquote ? "> " + t : t);
    buf = "";
  };

  const tokens = html.split(/(<[^>]+>)/);
  let heading = null;
  for (const tok of tokens) {
    if (!tok) continue;
    if (tok[0] !== "<") {
      buf += decodeEntities(tok);
      continue;
    }
    const m = tok.match(/^<\/?([a-zA-Z0-9]+)/);
    if (!m) continue;
    const tag = m[1].toLowerCase();
    const closing = tok[1] === "/";

    if (tag === "p") {
      if (closing) flush();
      else buf = "";
    } else if (tag === "br") {
      buf += "\n";
    } else if (tag === "hr") {
      flush();
      blocks.push("---");
    } else if (tag === "em" || tag === "i") {
      buf += "*";
    } else if (tag === "strong" || tag === "b") {
      buf += "**";
    } else if (tag === "h2" || tag === "h3") {
      if (closing) {
        const t = buf.trim();
        if (t) blocks.push((heading === "h3" ? "### " : "## ") + t);
        buf = "";
        heading = null;
      } else {
        flush();
        heading = tag;
        buf = "";
      }
    } else if (tag === "blockquote") {
      flush();
      inBlockquote = !closing;
    } else if (tag === "img") {
      const src = tok.match(/src="([^"]+)"/)?.[1];
      // Substack emits multiple sizes; keep the first (largest fetch URL) per image
      const key = src?.replace(/,w_\d+/, "");
      if (src && key && !seenImages.has(key)) {
        seenImages.add(key);
        flush();
        blocks.push(`IMG::${src}`);
      }
    } else if (tag === "a") {
      if (closing) {
        if (linkHref) {
          buf += `](${linkHref})`;
          linkHref = null;
        }
      } else {
        const href = tok.match(/href="([^"]+)"/)?.[1];
        const isImageLink = /image-link|substackcdn\.com\/image/.test(tok) || /substackcdn\.com\/image/.test(href ?? "");
        if (href && !isImageLink) {
          linkHref = decodeEntities(href);
          buf += "[";
        }
      }
    }
  }
  flush();

  // Strip trailing boilerplate blocks
  while (blocks.length) {
    const last = blocks[blocks.length - 1].replace(/[*_]/g, "").trim();
    if (BOILERPLATE.some((re) => re.test(last))) blocks.pop();
    else break;
  }
  return blocks;
}

// --- feed parsing --------------------------------------------------------

function parseFeed(xml) {
  const items = [];
  for (const chunk of xml.split("<item>").slice(1)) {
    const body = chunk.split("</item>")[0];
    const get = (tag) => {
      const m = body.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`));
      return m ? m[1].trim() : "";
    };
    items.push({
      title: decodeEntities(get("title")),
      link: get("link"),
      description: decodeEntities(get("description")),
      pubDate: get("pubDate"),
      html: get("content:encoded"),
    });
  }
  return items;
}

// --- image download ------------------------------------------------------

async function downloadImage(url, baseName) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`image fetch ${res.status}: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  // CDN's f_auto often returns JPEG even for .png source URLs, so sniff bytes
  let ext = "jpeg";
  if (buf[0] === 0x89 && buf[1] === 0x50) ext = "png";
  else if (buf[0] === 0x47 && buf[1] === 0x49) ext = "gif";
  else if (buf.slice(8, 12).toString() === "WEBP") ext = "webp";
  const filename = `${baseName}.${ext}`;
  const dir = OUT_DIR ?? IMAGES_DIR;
  if (!DRY_RUN) fs.writeFileSync(path.join(dir, filename), buf);
  return filename;
}

// --- main ---------------------------------------------------------------

async function convertPost(item) {
  const slug = slugify(item.title);
  const date = new Date(item.pubDate).toISOString().slice(0, 10);
  const blocks = htmlToBlocks(item.html);

  // Download images; first one is the header
  let imgIndex = 0;
  const out = [];
  for (const block of blocks) {
    if (block.startsWith("IMG::")) {
      imgIndex += 1;
      const baseName = imgIndex === 1 ? `${slug}-header` : `${slug}-${imgIndex}`;
      const filename = await downloadImage(block.slice(5), baseName);
      out.push(`![${imgIndex === 1 ? item.title : ""}](/images/${filename})`);
    } else {
      out.push(block);
    }
  }

  // Substack's description is the subtitle when one exists; otherwise it
  // echoes the first line of the post.
  const firstText = out.find((b) => !b.startsWith("!["))?.replace(/[*_>]/g, "").trim() ?? "";
  const desc = item.description.replace(/[*_]/g, "").trim();
  const hasSubtitle = desc && !firstText.startsWith(desc.replace(/\.*$/, ""));

  // Drop a leading header image duplicate position: header image goes right after title
  const headerImg = out.find((b) => b.startsWith("!["));
  const bodyBlocks = out.filter((b) => b !== headerImg);

  const md = [
    `# ${item.title}`,
    ...(hasSubtitle ? [`## ${item.description}`] : []),
    ...(headerImg ? [headerImg] : []),
    ...bodyBlocks,
  ].join("\n\n") + "\n";

  const safeTitle = item.title.replace(/[/:]/g, "-").replace(/’/g, "'");
  const filename = `${date} ${safeTitle}.md`;
  return { slug, filename, md };
}

async function main() {
  console.log(`Fetching ${FEED_URL} ...`);
  const xml = await (await fetch(FEED_URL)).text();
  const items = parseFeed(xml);
  const existing = existingSlugs();

  let synced = 0;
  for (const item of items) {
    const slug = slugify(item.title);
    if (FORCE_SLUG && slug !== FORCE_SLUG) continue;
    if (!FORCE_SLUG) {
      if (existing.has(slug)) continue;
      if (SKIP_SLUGS.has(slug)) {
        console.log(`skip (SKIP_SLUGS): ${item.title}`);
        continue;
      }
    }

    console.log(`converting: ${item.title}`);
    const { filename, md } = await convertPost(item);
    const dir = OUT_DIR ?? ESSAYS_DIR;
    if (DRY_RUN) {
      console.log(`--- would write ${filename} ---\n${md}`);
    } else {
      fs.writeFileSync(path.join(dir, filename), md);
      console.log(`wrote ${path.join(dir, filename)}`);
    }
    synced += 1;

    // Sanity checks the human/agent should follow up on
    const substackSlug = item.link.split("/p/")[1];
    if (substackSlug && substackSlug !== slug) {
      console.log(`  ⚠ slug mismatch: site "${slug}" vs Substack "${substackSlug}" — add to SUBSTACK_SLUG_OVERRIDES in src/lib/essays.ts`);
    }
    console.log(`  → add IMAGE_MAP entry in src/lib/essays.ts: "${slug}": "${slug}-header.jpeg" (check actual extension)`);
    console.log(`  → consider adding "${slug}" to PATHWAYS / PULL_QUOTES in src/lib/essays.ts`);
  }

  if (synced === 0) console.log("Nothing new to sync — site is up to date with Substack.");
  else console.log(`\nSynced ${synced} post(s). Review, update essays.ts curation, then build + commit + push.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
