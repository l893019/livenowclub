import { getAllEssays } from "@/lib/essays";
import HomeClient, { HomeFeatured, HomeRecentItem } from "@/components/HomeClient";

// Regenerate daily so the weekly hero rotation and recent list stay fresh
// without needing a new deploy.
export const revalidate = 86400;

const FALLBACK_IMAGE = "/images/hero-playa-faded.png";

// Hero rotation - curated, hero-worthy pieces with editorial taglines.
// One is featured per week, cycling through the list.
const HERO_ROTATION: { slug: string; subtitle: string; excerpt: string }[] = [
  {
    slug: "the-live-now-club",
    subtitle: "Because now is all we have",
    excerpt: "Living to live, not living not to die.",
  },
  {
    slug: "holy-shit-im-alive",
    subtitle: "We take this aliveness for granted",
    excerpt: "Dancing in a cloud of bubbles on the Fourth of July, overwhelmed by the joyousness of being here at all.",
  },
  {
    slug: "fixing-the-unfixable",
    subtitle: "For the people standing beside someone in it",
    excerpt: "What to say when there’s nothing you can say.",
  },
  {
    slug: "how-do-you-know-what-happens-to-you-isnt-good",
    subtitle: "Notes on randomness, beauty, and the next wave",
    excerpt: "Would you go through this all again for what you’ve gained?",
  },
  {
    slug: "the-other-side-of-grief",
    subtitle: "On coming back",
    excerpt: "Cancer hasn’t shrunk my life. It has skimmed it.",
  },
  {
    slug: "expecting-the-unexpected",
    subtitle: "The practical guide",
    excerpt: "Everything I wish someone had told me at the start.",
  },
  {
    slug: "a-dream-unborn",
    subtitle: "For a life that was never lived",
    excerpt: "The hardest grief I have ever known is for a life that was never lived.",
  },
];

export default function HomePage() {
  const essays = getAllEssays();

  const week = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  const pick = HERO_ROTATION[week % HERO_ROTATION.length];
  const heroEssay = essays.find((e) => e.slug === pick.slug);

  const featured: HomeFeatured = {
    slug: pick.slug,
    title: heroEssay?.title ?? pick.slug,
    subtitle: pick.subtitle,
    excerpt: pick.excerpt,
    image: heroEssay?.image ?? FALLBACK_IMAGE,
  };

  const recent: HomeRecentItem[] = essays.slice(0, 4).map((e) => ({
    slug: e.slug,
    title: e.title,
    type: e.type,
    image: e.image ?? FALLBACK_IMAGE,
  }));

  return <HomeClient featured={featured} recent={recent} />;
}
