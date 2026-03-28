import fs from "fs";
import path from "path";

export type EssayType = "essay" | "poem" | "guide" | "meditation";

export type Essay = {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  type: EssayType;
  excerpt: string;
  content: string;
  image?: string;
  substackUrl?: string;
  color: "pink" | "coral" | "gold" | "teal" | "lavender";
  tags: string[];
};

export type Pathway = {
  id: string;
  title: string;
  subtitle: string;
  essays: string[]; // slugs
};

const COLORS: Essay["color"][] = ["pink", "coral", "gold", "teal", "lavender"];

const CONTENT_DIR = path.join(process.cwd(), "content/essays");
const IMAGES_DIR = "/images";

// Map titles to images
const IMAGE_MAP: Record<string, string> = {
  "and-still-the-figs-ripen": "and-still-the-figs-ripen.jpg",
  "august-triptych": "august-triptych.jpg",
  "catch-pull-release": "catch-pull-release.jpg",
  "consider-the-hospital-ceiling": "consider-the-hospital-ceiling.jpg",
  "dry-lightning": "dry-lightning.jpg",
  "expecting-the-unexpected": "expecting-the-unexpected.jpg",
  "fixing-the-unfixable": "fixing-the-unfixable.jpg",
  "the-other-side-of-grief": "the-other-side-of-grief.jpg",
  "the-case-for-magical-thinking": "the-case-for-magical-thinking.jpg",
  "the-purge": "the-purge.jpg",
  "i-wrote-this-with-my-eyes": "i-wrote-this-with-my-eyes.jpg",
  "if-a-tree-falls-in-the-forest": "if-a-tree-falls-in-the-forest.png",
  "if-you-love-something-let-it-go": "if-you-love-something-let-it-go.jpg",
  "in-case-you-forget": "in-case-you-forget.png",
  "if-you-can-keep-your-head-about-you": "keep-your-head.jpg",
  "soulmd": "soulmd.jpg",
  "life-is-not-empty": "life-is-not-empty.jpg",
  "maybe": "maybe.jpg",
  "now-that-you-no-longer-have-to-be-perfect-you-can-just-be-good": "now-that-you-no-longer-have-to-be-perfect.jpg",
  "the-butterfly-dream": "the-butterfly-dream.jpg",
  "the-ebb": "the-ebb.jpg",
  "the-starting-line": "the-starting-line.jpg",
  "when-it-all-falls-out": "when-it-all-falls-out.png",
  // New images from Substack
  "sea-glass": "sea-glass.jpg",
  "cancer-meditations": "cancer-meditations.jpg",
  "cancer-meditations-ii": "cancer-meditations.jpg",
  "cancer-meditations-iii": "cancer-meditations.jpg",
  "cancer-meditations-iv": "cancer-meditations.jpg",
  "cancer-meditations-v": "cancer-meditations.jpg",
  "cancer-meditations-vi": "cancer-meditations.jpg",
  "the-river-van": "the-river-van.jpg",
  "threads-of-survival": "threads-of-survival.jpg",
  "i-need-you-to-hold-my-hand": "i-need-you-to-hold-my-hand.jpg",
  "the-in-between": "the-in-between.jpg",
  "the-crack-is-where-the-light-enters": "the-crack-is-where-the-light-enters.png",
  "the-forest-path": "the-forest-path.jpg",
  "the-live-now-club": "the-live-now-club.gif",
  "all-i-want-for-my-birthday-is-another-shot-at-life": "all-i-want-for-my-birthday.jpg",
  "embracing-free-fall": "embracing-free-fall.jpg",
  "you-cant-always-get-what-you-want": "you-cant-always-get-what-you-want.png",
  "it-takes-a-village": "it-takes-a-village.jpg",
  "how-to-travel-alone": "how-to-travel-alone.jpg",
  "i-love-lou": "i-love-lou.jpg",
  "reset-rebirth": "reset-rebirth.jpg",
  "on-safety-and-security": "on-safety-and-security.jpg",
  "the-way-of-the-parrot": "the-way-of-the-parrot.jpg",
  "things-ive-learned-lately": "things-ive-learned-lately.png",
  "how-to-reset-your-nervous-system": "how-to-reset-your-nervous-system.jpg",
  "how-are-you-after-it-all-falls-down": "how-are-you-after-it-all-falls-down.jpg",
  "in-any-given-moment-the-strongest-dream-in-that-moment-wins": "in-any-given-moment.jpg",
  "on-friendship-and-couches": "on-friendship-and-couches.jpg",
  "manifesto": "hero-playa-faded.png",
};

// Curated pathways
export const PATHWAYS: Pathway[] = [
  {
    id: "manifesto",
    title: "The Manifesto",
    subtitle: "What is The Live Now Club? Start here.",
    essays: ["the-live-now-club"],
  },
  {
    id: "start-here",
    title: "Start Here",
    subtitle: "New to The Live Now Club? Begin with these.",
    essays: ["expecting-the-unexpected", "fixing-the-unfixable", "and-still-the-figs-ripen"],
  },
  {
    id: "cancer-journey",
    title: "The Cancer Journey",
    subtitle: "A series of meditations written during treatment.",
    essays: [
      "cancer-meditations",
      "cancer-meditations-ii",
      "cancer-meditations-iii",
      "cancer-meditations-iv",
      "cancer-meditations-v",
      "cancer-meditations-vi",
      "the-crack-is-where-the-light-enters",
      "threads-of-survival",
    ],
  },
  {
    id: "grief-loss",
    title: "On Grief & Loss",
    subtitle: "For when you're carrying something heavy.",
    essays: ["the-other-side-of-grief", "the-ebb", "when-it-all-falls-out", "if-you-love-something-let-it-go"],
  },
  {
    id: "finding-joy",
    title: "Finding Joy Anyway",
    subtitle: "Because life is also beautiful.",
    essays: ["the-case-for-magical-thinking", "the-butterfly-dream", "life-is-not-empty", "august-triptych"],
  },
  {
    id: "wisdom",
    title: "Wisdom & Philosophy",
    subtitle: "The deeper questions about meaning, identity, and being.",
    essays: ["soulmd", "all-i-want-for-my-birthday-is-another-shot-at-life", "i-wrote-this-with-my-eyes", "catch-pull-release", "things-ive-learned-lately"],
  },
  {
    id: "poems",
    title: "Poems",
    subtitle: "Brief meditations. Beauty in a breath.",
    essays: ["sea-glass", "dry-lightning", "the-ebb", "august-triptych", "in-case-you-forget", "the-in-between"],
  },
  {
    id: "self-love",
    title: "Falling in Love with Yourself",
    subtitle: "The most important relationship you'll ever have.",
    essays: ["i-love-lou", "how-to-travel-alone", "on-friendship-and-couches", "reset-rebirth"],
  },
];

// Mood-based recommendations
export const MOODS: { mood: string; prompt: string; essays: string[] }[] = [
  {
    mood: "scared",
    prompt: "I just got a diagnosis",
    essays: ["expecting-the-unexpected", "cancer-meditations", "i-need-you-to-hold-my-hand"],
  },
  {
    mood: "grieving",
    prompt: "I'm grieving",
    essays: ["the-other-side-of-grief", "the-ebb", "fixing-the-unfixable"],
  },
  {
    mood: "hope",
    prompt: "I need hope",
    essays: ["the-case-for-magical-thinking", "life-is-not-empty", "and-still-the-figs-ripen"],
  },
  {
    mood: "angry",
    prompt: "I'm angry at the world",
    essays: ["the-purge", "when-it-all-falls-out", "you-cant-always-get-what-you-want"],
  },
  {
    mood: "peace",
    prompt: "I want to feel peace",
    essays: ["the-butterfly-dream", "sea-glass", "in-case-you-forget"],
  },
];

// Tag inference from content
function inferTags(title: string, content: string): string[] {
  const tags: string[] = [];
  const text = (title + " " + content).toLowerCase();

  if (text.includes("cancer") || text.includes("chemo") || text.includes("treatment") || text.includes("diagnosis"))
    tags.push("cancer");
  if (text.includes("grief") || text.includes("loss") || text.includes("death") || text.includes("dying"))
    tags.push("grief");
  if (text.includes("joy") || text.includes("hope") || text.includes("beautiful") || text.includes("magic"))
    tags.push("joy");
  if (text.includes("travel") || text.includes("journey") || text.includes("road")) tags.push("travel");
  if (text.includes("love") || text.includes("heart") || text.includes("friend")) tags.push("love");
  if (text.includes("meditation") || text.includes("reflect") || text.includes("peace")) tags.push("reflection");

  return tags;
}

function slugify(filename: string): string {
  const match = filename.match(/^\d{4}-\d{2}-\d{2}\s+(.+)\.md$/);
  if (!match) return filename.replace(/\.md$/, "").toLowerCase().replace(/\s+/g, "-");
  return match[1]
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function extractDate(filename: string): string {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : "2025-01-01";
}

function detectType(title: string, content: string): EssayType {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("meditation")) return "meditation";
  if (lowerTitle.includes("guide") || lowerTitle.includes("expecting the unexpected")) return "guide";
  const lines = content.split("\n").filter((l) => l.trim());
  const avgLineLength = content.length / lines.length;
  if (avgLineLength < 50 && lines.length < 30) return "poem";
  return "essay";
}

function extractExcerpt(content: string): string {
  const lines = content
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => {
      if (!l) return false;
      if (l.startsWith("#")) return false;
      if (l.startsWith("*Originally")) return false;
      if (l === "---") return false;
      return true;
    });

  const avgLineLength = lines.slice(0, 5).reduce((sum, l) => sum + l.length, 0) / Math.min(5, lines.length);

  if (avgLineLength < 40) {
    const excerpt = lines
      .slice(0, 4)
      .join(" / ")
      .replace(/[*_`]/g, "")
      .trim();
    return excerpt.length > 120 ? excerpt.slice(0, 117) + "..." : excerpt;
  }

  let excerpt = "";
  for (const line of lines) {
    const clean = line.replace(/[*_`]/g, "").trim();
    if (clean.length > 50) {
      excerpt = clean;
      break;
    }
  }

  if (!excerpt) {
    excerpt = lines.slice(0, 2).join(" ").replace(/[*_`]/g, "").trim();
  }

  if (excerpt.length > 140) {
    const sentenceEnd = excerpt.slice(0, 140).lastIndexOf(". ");
    if (sentenceEnd > 80) {
      return excerpt.slice(0, sentenceEnd + 1);
    }
    const wordEnd = excerpt.slice(0, 137).lastIndexOf(" ");
    return excerpt.slice(0, wordEnd) + "...";
  }

  return excerpt;
}

function extractTitle(content: string, filename: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  if (match) return match[1];
  const filenameMatch = filename.match(/^\d{4}-\d{2}-\d{2}\s+(.+)\.md$/);
  return filenameMatch ? filenameMatch[1] : filename.replace(/\.md$/, "");
}

function extractSubtitle(content: string): string | undefined {
  const match = content.match(/^#.+\n+\*(.+)\*$/m);
  return match ? match[1] : undefined;
}

export function getAllEssays(): Essay[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  const essays: Essay[] = files.map((filename, index) => {
    const filepath = path.join(CONTENT_DIR, filename);
    const content = fs.readFileSync(filepath, "utf-8");
    const slug = slugify(filename);
    const title = extractTitle(content, filename);
    const image = IMAGE_MAP[slug] ? `${IMAGES_DIR}/${IMAGE_MAP[slug]}` : undefined;

    return {
      slug,
      title,
      subtitle: extractSubtitle(content),
      date: extractDate(filename),
      type: detectType(title, content),
      excerpt: extractExcerpt(content),
      content,
      image,
      color: COLORS[index % COLORS.length],
      tags: inferTags(title, content),
    };
  });

  return essays.sort((a, b) => b.date.localeCompare(a.date));
}

export function getEssayBySlug(slug: string): Essay | null {
  const essays = getAllEssays();
  return essays.find((e) => e.slug === slug) || null;
}

export function getEssaysByType(type: EssayType): Essay[] {
  return getAllEssays().filter((e) => e.type === type);
}

export function getRelatedEssays(essay: Essay, limit = 3): Essay[] {
  const allEssays = getAllEssays().filter((e) => e.slug !== essay.slug);

  // Score by shared tags
  const scored = allEssays.map((e) => {
    const sharedTags = e.tags.filter((t) => essay.tags.includes(t)).length;
    const sameType = e.type === essay.type ? 1 : 0;
    return { essay: e, score: sharedTags * 2 + sameType };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.essay);
}

export function getPathwayEssays(pathwayId: string): Essay[] {
  const pathway = PATHWAYS.find((p) => p.id === pathwayId);
  if (!pathway) return [];

  const allEssays = getAllEssays();
  return pathway.essays.map((slug) => allEssays.find((e) => e.slug === slug)).filter(Boolean) as Essay[];
}

export function getFeaturedEssay(): Essay | null {
  // Return the most impactful essay as the hero
  const essays = getAllEssays();
  return essays.find((e) => e.slug === "fixing-the-unfixable") || essays[0] || null;
}

export function getLatestEssays(limit = 4): Essay[] {
  // Return the most recent essays by date
  return getAllEssays().slice(0, limit);
}

export function getManifestoEssay(): Essay | null {
  const essays = getAllEssays();
  return essays.find((e) => e.slug === "the-live-now-club") || null;
}

// Cancer Guide pathways for /navigate
export const CANCER_GUIDE: Pathway[] = [
  {
    id: "just-diagnosed",
    title: "Just Diagnosed",
    subtitle: "Everything I wish someone had told me at the start.",
    essays: ["expecting-the-unexpected", "i-need-you-to-hold-my-hand", "embracing-free-fall"],
  },
  {
    id: "cancer-meditations",
    title: "Cancer Meditations",
    subtitle: "A series written during treatment.",
    essays: [
      "cancer-meditations",
      "cancer-meditations-ii",
      "cancer-meditations-iii",
      "cancer-meditations-iv",
      "cancer-meditations-v",
      "cancer-meditations-vi",
    ],
  },
  {
    id: "during-treatment",
    title: "During Treatment",
    subtitle: "Practical guidance for the hardest days.",
    essays: [
      "how-to-reset-your-nervous-system",
      "consider-the-hospital-ceiling",
      "when-it-all-falls-out",
      "if-you-can-keep-your-head-about-you",
    ],
  },
  {
    id: "for-caregivers",
    title: "For Caregivers",
    subtitle: "How to support someone you love through this.",
    essays: ["it-takes-a-village", "fixing-the-unfixable", "threads-of-survival"],
  },
  {
    id: "finding-meaning",
    title: "Finding Meaning",
    subtitle: "Making sense of it all.",
    essays: [
      "the-crack-is-where-the-light-enters",
      "the-case-for-magical-thinking",
      "life-is-not-empty",
      "the-starting-line",
    ],
  },
];

export function getCancerGuideEssays(pathwayId: string): Essay[] {
  const pathway = CANCER_GUIDE.find((p) => p.id === pathwayId);
  if (!pathway) return [];

  const allEssays = getAllEssays();
  return pathway.essays.map((slug) => allEssays.find((e) => e.slug === slug)).filter(Boolean) as Essay[];
}

export function getCancerEssays(): Essay[] {
  return getAllEssays().filter((e) => e.tags.includes("cancer"));
}
