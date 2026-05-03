import type { Metadata } from "next";
import { ResultPageClient } from "./ResultPageClient";
import { identities, getIdentityColor } from "@/lib/identities";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const identityKey = typeof params.i === 'string' ? params.i : null;
  const userName = typeof params.n === 'string' ? params.n : null;

  // Get identity from key
  const identity = identityKey ? identities[identityKey] : null;

  // Use identity for metadata (fallback to generic if not found)
  const displayName = identity?.name || "Your Identity";
  const displayDescription = identity?.utopia || "Discover the version of the future you're building.";

  // Personalized title for shared results
  const ogTitle = userName
    ? `${userName} is ${displayName}. What are you?`
    : "What's your post-scarcity worldview?";

  // Use OG API with identity
  const ogImage = identityKey
    ? `https://livenowclub.vercel.app/api/og?identity=${identityKey}${userName ? `&name=${encodeURIComponent(userName)}` : ''}`
    : 'https://livenowclub.vercel.app/wonder/assets/landscapes/optimized/1.jpg';

  // Build page URL
  const urlParams = new URLSearchParams();
  if (identityKey) urlParams.set('i', identityKey);
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
  const identityKey = typeof params.i === 'string' ? params.i : null;
  const compareUserId = typeof params.compare === 'string' ? params.compare : undefined;

  return (
    <ResultPageClient
      identityKey={identityKey}
      compareUserId={compareUserId}
    />
  );
}
