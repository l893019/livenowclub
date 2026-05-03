import type { Metadata } from "next";
import { ResultPageClient } from "./ResultPageClient";
import { archetypes } from "@/lib/archetypes";
import { identities } from "@/lib/identities"; // Used in generateMetadata for OG

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const identityKey = typeof params.i === 'string' ? params.i : null;
  const archetypeKey = typeof params.a === 'string' ? params.a : 'citizen';
  const shadowKey = typeof params.s === 'string' ? params.s : null;
  const userName = typeof params.n === 'string' ? params.n : null;

  // Try identity first, fall back to archetype
  const identity = identityKey ? identities[identityKey] : null;
  const archetype = archetypes[archetypeKey] || archetypes.citizen;

  // Use identity name/description if available, else archetype
  const displayName = identity?.name || archetype.name;
  const displayDescription = identity?.utopia || archetype.utopia;

  // Personalized title for shared results
  const ogTitle = userName
    ? `${userName} is ${displayName}. What are you?`
    : "What's your post-scarcity worldview?";

  // Use OG API - prefer identity if available
  const ogImage = identityKey
    ? `https://livenowclub.vercel.app/api/og?identity=${identityKey}${userName ? `&name=${encodeURIComponent(userName)}` : ''}`
    : userName
      ? `https://livenowclub.vercel.app/api/og?archetype=${archetypeKey}&name=${encodeURIComponent(userName)}`
      : `https://livenowclub.vercel.app/api/og?archetype=${archetypeKey}`;

  // Build page URL with all params
  const urlParams = new URLSearchParams();
  if (identityKey) urlParams.set('i', identityKey);
  urlParams.set('a', archetypeKey);
  if (shadowKey) urlParams.set('s', shadowKey);
  if (userName) urlParams.set('n', userName);
  const pageUrl = `https://livenowclub.vercel.app/wonder/essay/quiz/result?${urlParams.toString()}`;

  return {
    title: `${displayName} | Sci-Fi Worldview Quiz`,
    description: displayDescription,
    openGraph: {
      title: ogTitle,
      description: displayDescription,
      images: [ogImage],
      url: pageUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: displayDescription,
      images: [ogImage],
    },
  };
}

export default async function QuizResultPage({ searchParams }: Props) {
  const params = await searchParams;
  const archetypeKey = typeof params.a === 'string' ? params.a : 'citizen';
  const compareUserId = typeof params.compare === 'string' ? params.compare : undefined;

  // NOTE: We intentionally do NOT pass identityKey to the client.
  // The client will recalculate identity from localStorage to ensure
  // consistency with /me page. URL ?i= is only for OG metadata (above).
  const archetype = archetypes[archetypeKey] || archetypes.citizen;

  return (
    <ResultPageClient
      archetypeKey={archetypeKey}
      archetypeColor={archetype.color}
      compareUserId={compareUserId}
    />
  );
}
