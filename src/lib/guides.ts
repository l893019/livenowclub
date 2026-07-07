// Practical guide pages (SEO spokes) under /navigate/cancer/.
//
// These are deliberately a separate content type from essays in /read:
// each page is rewritten in plain, searchable language for one query,
// distilled from the essays but never excerpted from them. Essays are
// the writing; guides are reference pages. Register new guides here so
// the hub listing and sitemap stay in sync.

export type GuideInfo = {
  slug: string;
  title: string; // page H1 and headline
  shortTitle: string; // hub cards and quick links
  targetQuery: string; // the search this page exists to answer
  tagline: string; // hero line under the H1
  description: string; // meta description
  datePublished: string;
  dateModified: string;
};

export const GUIDES: GuideInfo[] = [
  {
    slug: "what-to-say",
    title: "What to Say to Someone With Cancer",
    shortTitle: "What to Say",
    targetQuery: "what to say to someone with cancer",
    tagline:
      "The phrases that help, the ones that hurt, and what to do when there are no words. From someone who has been on the receiving end of all of them.",
    description:
      "What to say to someone with cancer, what not to say, and what to do when words fail. Practical guidance from a cancer survivor: real phrases that help, the common sayings that hurt, and why showing up matters more than finding perfect words.",
    datePublished: "2026-07-07",
    dateModified: "2026-07-07",
  },
  {
    slug: "how-to-prepare-for-chemo",
    title: "How to Prepare for Chemotherapy",
    shortTitle: "Preparing for Chemo",
    targetQuery: "how to prepare for chemotherapy",
    tagline:
      "The practical checklist I wish I'd had: what to set up at home, what to wear, what to pack, and the decisions to make before your first infusion.",
    description:
      "How to prepare for chemotherapy, from a survivor of two rounds: setting up your home, the port decision, ice booties for neuropathy, preparing for hair loss, the ER go-bag, and the logistics that make treatment survivable.",
    datePublished: "2026-07-07",
    dateModified: "2026-07-07",
  },
  {
    slug: "just-diagnosed",
    title: "Just Diagnosed With Cancer: What to Do First",
    shortTitle: "Just Diagnosed",
    targetQuery: "just diagnosed with cancer what to do",
    tagline:
      "The first moves that matter: building your care team, protecting your mind from the internet, and setting up the support you'll need later.",
    description:
      "Just diagnosed with cancer and don't know where to start? A survivor's guide to the first steps: choosing your hospital, designating an advocate, second opinions, finding a mentor, and staying out of the Google rabbit hole.",
    datePublished: "2026-07-07",
    dateModified: "2026-07-07",
  },
  {
    slug: "how-to-help-someone-with-cancer",
    title: "How to Help Someone With Cancer",
    shortTitle: "How to Help",
    targetQuery: "how to help someone with cancer",
    tagline:
      "What actually helps, from someone on the receiving end: specific offers, consistency over grand gestures, and showing up after everyone else moves on.",
    description:
      "How to help someone with cancer: what a patient actually needs from friends and family. Specific offers instead of open-ended ones, meal trains, rides, the weekly no-response-needed text, and support that lasts past the diagnosis.",
    datePublished: "2026-07-07",
    dateModified: "2026-07-07",
  },
];

export function getGuide(slug: string): GuideInfo {
  const g = GUIDES.find((g) => g.slug === slug);
  if (!g) throw new Error(`Unknown guide: ${slug}`);
  return g;
}

export type GuideFaq = { question: string; answer: string };

const BASE = "https://livenowclub.com";

export function guideMetadata(g: GuideInfo) {
  const url = `${BASE}/navigate/cancer/${g.slug}`;
  const image = `${BASE}/images/og-cancer-guide.png`;
  return {
    title: `${g.title} (From a Survivor) | The Live Now Club`,
    description: g.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${g.title} (From a Survivor)`,
      description: g.tagline,
      type: "article",
      url,
      siteName: "The Live Now Club",
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${g.title} (From a Survivor)`,
      description: g.tagline,
      images: [image],
    },
  };
}

export function guideJsonLd(g: GuideInfo, faqs: GuideFaq[]) {
  const url = `${BASE}/navigate/cancer/${g.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${g.title} (From a Survivor)`,
      description: g.description,
      url,
      datePublished: g.datePublished,
      dateModified: g.dateModified,
      author: {
        "@type": "Person",
        name: "Louise Ireland",
        description: "Cancer survivor and author of The Live Now Club",
        url: `${BASE}/about`,
      },
      publisher: { "@type": "Organization", name: "The Live Now Club", url: BASE },
      image: `${BASE}/images/og-cancer-guide.png`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Cancer Guide", item: `${BASE}/navigate/cancer` },
        { "@type": "ListItem", position: 2, name: g.title, item: url },
      ],
    },
  ];
}
