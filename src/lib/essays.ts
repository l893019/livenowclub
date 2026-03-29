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
  pullQuote?: string; // Compelling line for quote wall
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

// Compelling pull quotes for the quote wall - actual paragraphs from Louise's essays
const PULL_QUOTES: Record<string, string> = {
  "the-live-now-club": "Most people in your situation are focused on living not to die, I think what you're trying to say is that you're living to live. The words rearranged the air in my lungs. It was as if the ground shifted beneath me. The difference between survival and existence. Between holding on and inhabiting.",
  "fixing-the-unfixable": "There is nothing you can say that will solve it. But, there is much you can say that will keep someone company inside of it. You say: I'm not going anywhere. You say: You don't have to be strong with me. You say: I don't know what to say, but I'm here.",
  "the-other-side-of-grief": "I wept from the strangeness of return. From the terror of starting anew. From the defiant choice to love this life anyway, knowing how quickly it could disappear again. Cancer hasn't shrunk my life. It has skimmed it.",
  "embracing-free-fall": "I'm learning to stop grasping for control and lean back into complete free fall. I don't believe in coincidences; I believe deeply that this diagnosis is another step on a path I started walking three years ago toward living my best life.",
  "cancer-meditations": "I am not dying from this. But it's given me some peace to think that we are all on a path toward death, that we build beautiful lives that dissolve into beautiful nothingness. And in that path, I don't want to die with my art still in me.",
  "threads-of-survival": "I think about that spider's resiliency. I think every day about it hiding from the water and gingerly sticking its leg out to make a move. Every day, I return to this moment, wrestling with the humbling truth that binds us together - both small and scared, both fighting fiercely against the tide.",
  "i-love-lou": "I met her on February 13, 2022. Like any good meet-cute, I had this feeling I had met her long ago, maybe in another lifetime. I realized I couldn't mess it up. This was going to be a very special person in my life - arguably the most special. Her name is Lou.",
};

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

// Curated pathways - Updated 2026-03-29 per Memoirist essay mapping
export const PATHWAYS: Pathway[] = [
  {
    id: "manifesto",
    title: "The Manifesto",
    subtitle: "What is The Live Now Club? Start here.",
    essays: ["the-live-now-club", "manifesto"],
  },
  {
    id: "start-here",
    title: "Start Here",
    subtitle: "The heart of The Live Now Club. Begin here.",
    essays: [
      "the-live-now-club", // THE manifesto - living to live
      "fixing-the-unfixable", // Core philosophy - what to say when nothing helps
      "expecting-the-unexpected", // THE practical guide
      "i-love-lou", // Pre-cancer foundation - who Louise was becoming
    ],
  },
  {
    id: "cancer-meditations",
    title: "Cancer Meditations",
    subtitle: "A series written during treatment. Read in order.",
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
    id: "cancer-journey",
    title: "My Cancer Story",
    subtitle: "The diagnosis, treatment, and what came after.",
    essays: [
      "embracing-free-fall", // The diagnosis moment
      "cancer-meditations", // Series start
      "threads-of-survival",
      "the-other-side-of-grief", // Post-treatment
      "life-is-not-empty", // Recovery and creation
      "how-to-reset-your-nervous-system",
      "consider-the-hospital-ceiling",
      "it-takes-a-village",
    ],
  },
  {
    id: "grief-loss",
    title: "On Grief & Loss",
    subtitle: "For when you're carrying something heavy.",
    essays: [
      "the-other-side-of-grief", // Primary grief essay
      "the-ebb",
      "when-it-all-falls-out",
      "if-you-love-something-let-it-go",
      "catch-pull-release",
      "how-are-you-after-it-all-falls-down",
      // NOTE: "fixing-the-unfixable" removed - it's foundational philosophy, not grief
    ],
  },
  {
    id: "finding-joy",
    title: "Finding Joy Anyway",
    subtitle: "Because life is also beautiful.",
    essays: [
      "the-case-for-magical-thinking",
      "life-is-not-empty",
      "and-still-the-figs-ripen",
      "august-triptych",
      "the-river-van",
      "maybe",
      "the-forest-path",
      "if-a-tree-falls-in-the-forest",
    ],
  },
  {
    id: "wonder",
    title: "Wonder",
    subtitle: "AI, philosophy, dreams, and the deeper questions.",
    essays: [
      "soulmd", // AI, meaning, productivity
      "the-butterfly-dream", // Dreams, Jung, symbols
      "life-is-not-empty", // Languages, poetry, creation
      "the-case-for-magical-thinking",
      "in-any-given-moment-the-strongest-dream-in-that-moment-wins",
    ],
  },
  {
    id: "wisdom",
    title: "Wisdom & Philosophy",
    subtitle: "The deeper questions about meaning, identity, and being.",
    essays: [
      "fixing-the-unfixable", // Core philosophy
      "the-live-now-club", // Manifesto
      "soulmd",
      "all-i-want-for-my-birthday-is-another-shot-at-life",
      "i-wrote-this-with-my-eyes",
      "things-ive-learned-lately",
      "the-way-of-the-parrot",
      "now-that-you-no-longer-have-to-be-perfect-you-can-just-be-good",
      "the-starting-line",
    ],
  },
  {
    id: "poems",
    title: "Poems",
    subtitle: "Brief meditations. Beauty in a breath.",
    essays: [
      "and-still-the-figs-ripen",
      "sea-glass",
      "dry-lightning",
      "the-ebb",
      "the-in-between",
      "the-forest-path",
      "in-case-you-forget",
    ],
  },
  {
    id: "self-love",
    title: "Falling in Love with Yourself",
    subtitle: "The most important relationship you'll ever have.",
    essays: [
      "i-love-lou", // The 10 Commandments of Lou
      "how-to-travel-alone",
      "on-friendship-and-couches",
      "reset-rebirth",
      "on-safety-and-security",
      "i-need-you-to-hold-my-hand",
      "the-starting-line",
    ],
  },
];

// Soft entry points - Updated 2026-03-29 per roundtable
// These are the "What do you need?" prompts on the homepage
export const MOODS: { mood: string; prompt: string; essays: string[]; primary?: string }[] = [
  {
    mood: "diagnosis",
    prompt: "I just got a diagnosis",
    primary: "expecting-the-unexpected", // Lead with THE guide
    essays: ["expecting-the-unexpected", "embracing-free-fall", "i-need-you-to-hold-my-hand"],
  },
  {
    mood: "grieving",
    prompt: "I'm grieving",
    primary: "the-other-side-of-grief",
    essays: ["the-other-side-of-grief", "and-still-the-figs-ripen", "the-ebb"],
  },
  {
    mood: "caregiver",
    prompt: "I'm supporting someone I love",
    primary: "fixing-the-unfixable", // THE essay on what to say
    essays: ["fixing-the-unfixable", "it-takes-a-village", "expecting-the-unexpected"],
  },
  {
    mood: "hope",
    prompt: "I need to feel less alone",
    primary: "the-live-now-club",
    essays: ["the-live-now-club", "fixing-the-unfixable", "i-love-lou"],
  },
  {
    mood: "curious",
    prompt: "I'm curious who you are",
    primary: "the-live-now-club",
    essays: ["the-live-now-club", "soulmd", "i-love-lou"],
  },
  {
    mood: "wonder",
    prompt: "I want to think deeply",
    primary: "soulmd",
    essays: ["soulmd", "the-butterfly-dream", "the-case-for-magical-thinking"],
  },
  {
    mood: "peace",
    prompt: "I want something beautiful",
    primary: "and-still-the-figs-ripen",
    essays: ["and-still-the-figs-ripen", "sea-glass", "the-forest-path"],
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
      if (l.startsWith(">")) return false; // Skip blockquotes/epigraphs
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
      pullQuote: PULL_QUOTES[slug],
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

// Cancer Guide pathways for /navigate - Updated 2026-03-29 per Memoirist mapping
export const CANCER_GUIDE: Pathway[] = [
  {
    id: "just-diagnosed",
    title: "Just Diagnosed",
    subtitle: "Everything I wish someone had told me at the start.",
    essays: [
      "expecting-the-unexpected", // THE practical guide - always first
      "embracing-free-fall", // Louise's diagnosis moment
      "i-need-you-to-hold-my-hand",
    ],
  },
  {
    id: "cancer-meditations",
    title: "Cancer Meditations",
    subtitle: "A series written during treatment. Read in order.",
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
      "threads-of-survival",
    ],
  },
  {
    id: "for-caregivers",
    title: "For Caregivers",
    subtitle: "How to support someone you love through this.",
    essays: [
      "fixing-the-unfixable", // THE essay on what to say - first for caregivers
      "expecting-the-unexpected", // Has caregiver section at the end
      "it-takes-a-village",
    ],
  },
  {
    id: "survivorship",
    title: "After Treatment",
    subtitle: "What comes next. Recovery, grief, and rebuilding.",
    essays: [
      "the-other-side-of-grief", // Post-treatment processing
      "life-is-not-empty", // Collapse, creation, recovery
      "the-starting-line",
    ],
  },
  {
    id: "finding-meaning",
    title: "Finding Meaning",
    subtitle: "Making sense of it all.",
    essays: [
      "the-live-now-club", // The core philosophy
      "the-crack-is-where-the-light-enters",
      "the-case-for-magical-thinking",
      "and-still-the-figs-ripen",
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

// Get essays with pull quotes for the quote wall
export function getQuoteWallEssays(limit = 8): Essay[] {
  return getAllEssays()
    .filter((e) => e.pullQuote)
    .slice(0, limit);
}

// Get essays for timeline view (ordered chronologically for cancer journey story)
export function getTimelineEssays(): Essay[] {
  const timelineOrder = [
    "i-love-lou", // Pre-cancer: who Louise was
    "embracing-free-fall", // The diagnosis
    "expecting-the-unexpected", // Early navigation
    "cancer-meditations", // Treatment begins
    "cancer-meditations-ii",
    "cancer-meditations-iii",
    "when-it-all-falls-out", // Hair loss
    "cancer-meditations-iv",
    "cancer-meditations-v",
    "threads-of-survival",
    "cancer-meditations-vi",
    "the-other-side-of-grief", // Post-treatment
    "life-is-not-empty", // Recovery
    "the-live-now-club", // The transformation
  ];
  const allEssays = getAllEssays();
  return timelineOrder
    .map((slug) => allEssays.find((e) => e.slug === slug))
    .filter(Boolean) as Essay[];
}
