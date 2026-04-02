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
  const data = archetypes[archetypeKey] || archetypes.citizen;

  const title = "What's your post-scarcity worldview?";
  const ogImage = `https://livenowclub.vercel.app/wonder/essay/quiz/images/utopia-${archetypeKey}.png`;

  const pageUrl = shadowKey
    ? `https://livenowclub.vercel.app/wonder/essay/quiz/result?a=${archetypeKey}&s=${shadowKey}`
    : `https://livenowclub.vercel.app/wonder/essay/quiz/result?a=${archetypeKey}`;

  return {
    title: `${data.name} | Sci-Fi Worldview Quiz`,
    description: data.utopia,
    openGraph: {
      title,
      description: data.utopia,
      images: [ogImage],
      url: pageUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
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
