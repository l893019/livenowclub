import type { Metadata } from "next";
import { ResultPageClient } from "./ResultPageClient";
import { archetypes } from "@/lib/archetypes";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const archetypeKey = typeof params.a === 'string' ? params.a : 'citizen';
  const shadowKey = typeof params.s === 'string' ? params.s : null;
  const userName = typeof params.n === 'string' ? params.n : null;
  const data = archetypes[archetypeKey] || archetypes.citizen;

  // Personalized title for shared results: "[Name] is a Swimmer in Deep Water. What are you?"
  // Falls back to generic title if no name provided
  const ogTitle = userName
    ? `${userName} is a ${data.name}. What are you?`
    : "What's your post-scarcity worldview?";

  // Use OG API for dynamic image generation with name if provided
  const ogImage = userName
    ? `https://livenowclub.vercel.app/api/og?archetype=${archetypeKey}&name=${encodeURIComponent(userName)}`
    : `https://livenowclub.vercel.app/api/og?archetype=${archetypeKey}`;

  // Build page URL with all params
  const urlParams = new URLSearchParams();
  urlParams.set('a', archetypeKey);
  if (shadowKey) urlParams.set('s', shadowKey);
  if (userName) urlParams.set('n', userName);
  const pageUrl = `https://livenowclub.vercel.app/wonder/essay/quiz/result?${urlParams.toString()}`;

  return {
    title: `${data.name} | Sci-Fi Worldview Quiz`,
    description: data.utopia,
    openGraph: {
      title: ogTitle,
      description: data.utopia,
      images: [ogImage],
      url: pageUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: data.utopia,
      images: [ogImage],
    },
  };
}

export default async function QuizResultPage({ searchParams }: Props) {
  const params = await searchParams;
  const archetypeKey = typeof params.a === 'string' ? params.a : 'citizen';
  const data = archetypes[archetypeKey] || archetypes.citizen;

  const imageUrl = `/wonder/essay/quiz/images/utopia-${archetypeKey}.png`;

  return (
    <ResultPageClient
      archetypeName={data.name}
      archetypeKey={archetypeKey}
      archetypeColor={data.color}
      utopiaText={data.utopia}
      imageUrl={imageUrl}
      blindSpot={data.blindSpot}
      compatibility={data.compatibility}
      books={data.books}
    />
  );
}
