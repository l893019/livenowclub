export type Essay = {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  section: "cancer" | "guides" | "life" | "philosophy";
  featured?: boolean;
};

export const essays: Essay[] = [
  // Cancer Meditations series
  {
    slug: "cancer-meditations",
    title: "Cancer Meditations",
    subtitle: "The descent into the liminal space",
    date: "2025-03-05",
    section: "cancer",
  },
  {
    slug: "cancer-meditations-ii",
    title: "Cancer Meditations II",
    subtitle: "Into the Wilderness",
    date: "2025-03-15",
    section: "cancer",
  },
  {
    slug: "cancer-meditations-iii",
    title: "Cancer Meditations III",
    subtitle: "Diving to Darkness",
    date: "2025-03-28",
    section: "cancer",
  },
  {
    slug: "cancer-meditations-iv",
    title: "Cancer Meditations IV",
    subtitle: "On the Battlefield",
    date: "2025-04-05",
    section: "cancer",
  },
  {
    slug: "cancer-meditations-v",
    title: "Cancer Meditations V",
    date: "2025-04-25",
    section: "cancer",
  },
  {
    slug: "cancer-meditations-vi",
    title: "Cancer Meditations VI",
    date: "2025-05-10",
    section: "cancer",
  },
  // Key cancer essays
  {
    slug: "embracing-free-fall",
    title: "Embracing Free Fall",
    subtitle: "The diagnosis announcement",
    date: "2025-02-14",
    section: "cancer",
    featured: true,
  },
  {
    slug: "i-need-you-to-hold-my-hand",
    title: "I need you to hold my hand",
    date: "2025-02-20",
    section: "cancer",
  },
  {
    slug: "threads-of-survival",
    title: "Threads of Survival",
    date: "2025-03-20",
    section: "cancer",
  },
  {
    slug: "the-crack-is-where-the-light-enters",
    title: "The crack is where the light enters",
    date: "2025-04-10",
    section: "cancer",
  },
  {
    slug: "it-takes-a-village",
    title: "It takes a village",
    date: "2025-04-18",
    section: "cancer",
  },
  {
    slug: "the-in-between",
    title: "the in-between",
    date: "2025-05-28",
    section: "cancer",
  },
  {
    slug: "how-are-you-after-it-all-falls-down",
    title: "How are you (after it all falls down)?",
    date: "2025-05-20",
    section: "cancer",
  },
  {
    slug: "the-other-side-of-grief",
    title: "The other side of grief",
    date: "2025-05-28",
    section: "cancer",
  },
  {
    slug: "the-live-now-club",
    title: "The Live Now Club",
    date: "2025-09-05",
    section: "cancer",
    featured: true,
  },
  {
    slug: "when-it-all-falls-out",
    title: "When it all falls out",
    date: "2025-09-28",
    section: "cancer",
  },
  {
    slug: "the-starting-line",
    title: "The starting line",
    date: "2025-11-20",
    section: "cancer",
  },
  // Guides
  {
    slug: "how-to-reset-your-nervous-system",
    title: "How to reset your nervous system",
    date: "2025-03-10",
    section: "guides",
  },
  {
    slug: "fixing-the-unfixable",
    title: "Fixing the Unfixable",
    subtitle: "For those supporting someone with cancer",
    date: "2025-11-28",
    section: "guides",
    featured: true,
  },
  {
    slug: "how-to-travel-alone",
    title: "How to travel alone",
    date: "2025-01-28",
    section: "guides",
  },
  // Life essays
  {
    slug: "i-love-lou",
    title: "I Love Lou",
    date: "2024-12-15",
    section: "life",
    featured: true,
  },
  {
    slug: "the-way-of-the-parrot",
    title: "The way of the parrot",
    subtitle: "(This is a cult)",
    date: "2025-01-20",
    section: "life",
  },
  {
    slug: "in-any-given-moment-the-strongest-dream-wins",
    title: "In any given moment, the strongest dream in that moment wins",
    date: "2025-02-05",
    section: "life",
  },
  {
    slug: "the-butterfly-dream",
    title: "The butterfly dream",
    date: "2025-10-28",
    section: "life",
  },
  // Philosophy
  {
    slug: "on-safety-and-security",
    title: "On safety and security",
    date: "2025-01-10",
    section: "philosophy",
  },
  {
    slug: "reset-rebirth",
    title: "Reset / rebirth",
    date: "2024-12-28",
    section: "philosophy",
  },
  {
    slug: "on-friendship-and-couches",
    title: "On friendship & couches",
    date: "2024-12-01",
    section: "philosophy",
  },
  {
    slug: "manifesto",
    title: "Manifesto",
    date: "2024-11-01",
    section: "philosophy",
  },
  // More life/poetry essays
  {
    slug: "maybe",
    title: "Maybe",
    date: "2025-06-11",
    section: "life",
  },
  {
    slug: "if-you-can-keep-your-head-about-you",
    title: "If you can keep your head about you",
    date: "2025-06-05",
    section: "life",
  },
  {
    slug: "the-case-for-magical-thinking",
    title: "The case for magical thinking",
    date: "2025-05-20",
    section: "philosophy",
  },
  {
    slug: "the-river-van",
    title: "The River Van",
    date: "2025-06-05",
    section: "life",
  },
  {
    slug: "sea-glass",
    title: "sea glass",
    date: "2025-06-10",
    section: "life",
  },
  {
    slug: "the-forest-path",
    title: "the forest path",
    date: "2025-06-18",
    section: "life",
  },
  {
    slug: "things-ive-learned-lately",
    title: "Things I've Learned Lately",
    date: "2025-06-22",
    section: "life",
  },
  {
    slug: "consider-the-hospital-ceiling",
    title: "Consider the hospital ceiling",
    date: "2025-06-28",
    section: "cancer",
  },
  {
    slug: "in-case-you-forget",
    title: "in case you forget",
    date: "2025-07-05",
    section: "life",
  },
  {
    slug: "dry-lightning",
    title: "dry lightning",
    date: "2025-07-15",
    section: "life",
  },
  {
    slug: "you-cant-always-get-what-you-want",
    title: "You can't always get what you want",
    date: "2025-07-25",
    section: "life",
  },
  {
    slug: "if-you-love-something-let-it-go",
    title: "If you love something, let it go",
    date: "2025-08-01",
    section: "life",
  },
  {
    slug: "if-a-tree-falls-in-the-forest",
    title: "If a tree falls in the forest",
    date: "2025-08-10",
    section: "life",
  },
  {
    slug: "august-triptych",
    title: "august triptych",
    date: "2025-08-18",
    section: "life",
  },
  {
    slug: "and-still-the-figs-ripen",
    title: "and still the figs ripen",
    date: "2025-08-25",
    section: "life",
  },
  {
    slug: "all-i-want-for-my-birthday",
    title: "All I want for my birthday is another shot at life",
    date: "2025-09-18",
    section: "cancer",
  },
  {
    slug: "the-ebb",
    title: "the ebb",
    date: "2025-09-20",
    section: "life",
  },
  {
    slug: "now-that-you-no-longer-have-to-be-perfect",
    title: "Now that you no longer have to be perfect, you can just be good",
    date: "2025-10-08",
    section: "life",
  },
  {
    slug: "i-wrote-this-with-my-eyes",
    title: "I wrote this with my eyes",
    date: "2025-10-18",
    section: "life",
  },
  {
    slug: "catch-pull-release",
    title: "Catch, pull, release",
    date: "2025-11-10",
    section: "life",
  },
  {
    slug: "expecting-the-unexpected",
    title: "Expecting the Unexpected",
    date: "2025-12-05",
    section: "life",
  },
  {
    slug: "life-is-not-empty",
    title: "Life is not empty",
    date: "2025-12-15",
    section: "life",
  },
  {
    slug: "the-purge",
    title: "The Purge",
    date: "2025-12-27",
    section: "life",
  },
];

export function getEssaysBySection(section: Essay["section"]): Essay[] {
  return essays
    .filter((essay) => essay.section === section)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedEssays(): Essay[] {
  return essays.filter((essay) => essay.featured);
}

export function getAllEssays(): Essay[] {
  return essays.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getEssayBySlug(slug: string): Essay | undefined {
  return essays.find((essay) => essay.slug === slug);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
