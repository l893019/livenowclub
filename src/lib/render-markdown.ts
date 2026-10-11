// Shared markdown-to-HTML renderer for essay content.
// Extracted from EssayContent so other pages (the cancer guide chapters)
// render the same way the essays do.

const BOILERPLATE_PATTERNS = [
  /thanks for reading komorebi/i,
  /subscribe for free to receive/i,
  /subscribe for free to follow along/i,
  /subscribe here \(free\)/i,
  /join me on my neverending quest/i,
  /please leave me a heart or pass along/i,
  /I would greatly appreciate it if you could share my words/i,
];

const isBoilerplate = (line: string) => BOILERPLATE_PATTERNS.some((p) => p.test(line));

export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’'"“”]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function processInlineFormatting(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/_([^_]+)_/g, "<em>$1</em>");
}

export type RenderOptions = {
  /** Hero image already rendered above the body; a matching body image is skipped. */
  heroImage?: string;
  /** Add id attributes to h2/h3 so they can be linked to. */
  headingIds?: boolean;
  /** Detect poems (short lines) and render stanza breaks. Default true. */
  detectPoem?: boolean;
};

export type RenderResult = {
  html: string;
  psContent: string[];
  isPoem: boolean;
};

export function renderEssayMarkdown(content: string, opts: RenderOptions = {}): RenderResult {
  const detectPoem = opts.detectPoem ?? true;
  const contentLines = content.split("\n").filter((l) => l.trim() && !l.startsWith("#"));
  const avgLineLength = contentLines.reduce((a, l) => a + l.length, 0) / Math.max(1, contentLines.length);
  const isPoem = detectPoem && avgLineLength < 50 && contentLines.length < 40;

  const lines = content.split("\n");
  const result: string[] = [];
  const psContent: string[] = [];
  let blockquoteBuffer: string[] = [];
  let listBuffer: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let inOrbitsSection = false;
  let inPsSection = false;

  const flushBlockquote = () => {
    if (blockquoteBuffer.length > 0) {
      result.push(`<blockquote>${blockquoteBuffer.join("<br />")}</blockquote>`);
      blockquoteBuffer = [];
    }
  };

  const flushList = () => {
    if (listBuffer.length > 0 && listType) {
      result.push(`<${listType}>${listBuffer.join("")}</${listType}>`);
      listBuffer = [];
      listType = null;
    }
  };

  const heading = (tag: "h2" | "h3", text: string) => {
    const id = opts.headingIds ? ` id="${headingId(text)}"` : "";
    return `<${tag}${id}>${processInlineFormatting(text)}</${tag}>`;
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    // The header image is already rendered as the hero; don't repeat it in the body
    const soloImage = trimmedLine.match(/^!\[[^\]]*\]\(([^)]+)\)$/);
    if (soloImage && opts.heroImage && soloImage[1] === opts.heroImage) continue;

    // Detect ORBITS section - stop processing main content
    if (
      trimmedLine.includes("**ORBITS") ||
      trimmedLine.includes("**SIGNALS") ||
      trimmedLine.includes("**RESONANCES") ||
      trimmedLine.includes("**GROUNDS") ||
      trimmedLine === "ORBITS" ||
      /^\*\*\s*ORBITS/i.test(trimmedLine)
    ) {
      inOrbitsSection = true;
      flushBlockquote();
      continue;
    }
    if (inOrbitsSection) continue;
    if (isBoilerplate(line)) continue;

    // PS section - capture meaningful PS notes
    if (/^PS\.?\s/i.test(trimmedLine)) {
      const isMeaningfulPs =
        /thank you|thanks|love|<3|heart/i.test(line) && !/share|subscribe|pass along|leave.*heart/i.test(line);
      if (isMeaningfulPs) {
        inPsSection = true;
        psContent.push(line.replace(/^PS\.?\s*/i, "").trim());
      }
      continue;
    }
    if (inPsSection) {
      if (trimmedLine === "") inPsSection = false;
      else psContent.push(trimmedLine);
      continue;
    }

    if (line.startsWith("# ") || line.includes("Originally published")) {
      flushBlockquote();
      continue;
    }
    if (line.startsWith("## ")) {
      flushBlockquote();
      result.push(heading("h2", line.slice(3)));
      continue;
    }
    if (line.startsWith("### ")) {
      flushBlockquote();
      result.push(heading("h3", line.slice(4)));
      continue;
    }
    if (trimmedLine === "---") {
      flushBlockquote();
      result.push("<hr />");
      continue;
    }
    if (line.startsWith("> ")) {
      blockquoteBuffer.push(processInlineFormatting(line.slice(2)));
      continue;
    }
    flushBlockquote();

    const ulMatch = line.match(/^(\s*)[*\-+]\s+(.+)$/);
    if (ulMatch) {
      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }
      listBuffer.push(`<li>${processInlineFormatting(ulMatch[2])}</li>`);
      continue;
    }
    const olMatch = line.match(/^(\s*)\d+\.\s+(.+)$/);
    if (olMatch) {
      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }
      listBuffer.push(`<li>${processInlineFormatting(olMatch[2])}</li>`);
      continue;
    }
    flushList();

    if (trimmedLine === "") {
      result.push(isPoem ? '</p><p class="stanza">' : "</p><p>");
      continue;
    }

    let processed = line
      .replace(/\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)/g, '<a href="$3" target="_blank"><img src="$2" alt="$1" /></a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
    processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    processed = processed
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/_([^_]+)_/g, "<em>$1</em>");

    if (isPoem && !line.startsWith("**") && !line.startsWith(" **")) {
      result.push(processed + "<br />");
    } else {
      result.push(processed);
    }
  }

  flushBlockquote();
  flushList();
  return { html: result.join("\n"), psContent, isPoem };
}

/** Plain-text teaser from a markdown block: first paragraph over 50 chars. */
export function plainExcerpt(md: string, max = 160): string {
  const line = md
    .split("\n")
    .map((l) => l.trim())
    .find((l) => l && !l.startsWith("#") && !l.startsWith(">") && !l.startsWith("!") && l.replace(/[*_`]/g, "").length > 50);
  if (!line) return "";
  const clean = line.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_`\\]/g, "").trim();
  return clean.length > max ? clean.slice(0, max - 3).trimEnd() + "..." : clean;
}
