// "Expecting the Unexpected" (Lou's Guide to Cancer) rendered as chapters.
// Single source: the essay markdown in content/essays. This module splits
// it on its top-level parts; nothing is duplicated.
import { getEssayBySlug } from "./essays";
import { headingId, unescapeMarkdown } from "./render-markdown";

/** "1. YOU NEED AN ADVOCATE" -> "1. You need an advocate" for nav lists. */
function sentenceCase(s: string): string {
  if (/[a-z]/.test(s)) return s;
  return s.toLowerCase().replace(/^(\d+\.\s*)?([a-z])/, (_, n, c) => (n ?? "") + c.toUpperCase());
}

export const GUIDE_ESSAY_SLUG = "expecting-the-unexpected";
export { GUIDE_BASE, GUIDE_PDF } from "./cancer-guide-paths";

export type GuideSection = { id: string; title: string };
export type GuidePart = {
  slug: string;
  number: number;
  title: string;
  body: string; // markdown
  sections: GuideSection[];
};
export type CancerGuide = {
  title: string;
  subtitle: string;
  intro: string; // markdown, without the Substack quick links
  image?: string;
  date: string;
  parts: GuidePart[];
};

export function getCancerGuide(): CancerGuide | null {
  const essay = getEssayBySlug(GUIDE_ESSAY_SLUG);
  if (!essay) return null;
  const lines = essay.content.split("\n");

  let title = essay.title;
  let subtitle = essay.subtitle ?? "";
  const intro: string[] = [];
  const parts: GuidePart[] = [];
  let current: GuidePart | null = null;
  let seenTitle = false;
  let skippingQuickLinks = false;

  for (const line of lines) {
    if (line.startsWith("# ")) {
      const text = line.slice(2).trim();
      if (!seenTitle) {
        seenTitle = true;
        title = text;
        continue;
      }
      skippingQuickLinks = false;
      current = { slug: headingId(text), number: parts.length + 1, title: text, body: "", sections: [] };
      parts.push(current);
      continue;
    }
    if (!current) {
      if (line.startsWith("## ")) {
        const text = line.slice(3).trim();
        if (/^quick links$/i.test(text)) { skippingQuickLinks = true; continue; }
        if (!subtitle || intro.length === 0) { subtitle = text; continue; }
      }
      if (skippingQuickLinks) continue;
      intro.push(line);
      continue;
    }
    if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      current.sections.push({ id: headingId(text), title: text });
    } else {
      const bold = line.trim().match(/^\*\*(.+?)\*\*$/);
      if (bold) {
        const text = unescapeMarkdown(bold[1]).trim();
        if (/^\d+\.\s/.test(text)) current.sections.push({ id: headingId(text), title: sentenceCase(text) });
      }
    }
    current.body += line + "\n";
  }

  return { title, subtitle, intro: intro.join("\n").trim(), image: essay.image, date: essay.date, parts };
}

export function getGuidePart(slug: string): { guide: CancerGuide; part: GuidePart; prev: GuidePart | null; next: GuidePart | null } | null {
  const guide = getCancerGuide();
  if (!guide) return null;
  const i = guide.parts.findIndex((p) => p.slug === slug);
  if (i < 0) return null;
  return { guide, part: guide.parts[i], prev: guide.parts[i - 1] ?? null, next: guide.parts[i + 1] ?? null };
}
