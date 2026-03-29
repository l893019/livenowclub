import { notFound } from "next/navigation";
import { getAllEssays, getEssayBySlug, getRelatedEssays } from "@/lib/essays";
import EssayContent from "@/components/EssayContent";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const essays = getAllEssays();
  return essays.map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  if (!essay) return { title: "Essay Not Found" };

  return {
    title: `${essay.title} | The Live Now Club`,
    description: essay.excerpt,
  };
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);

  if (!essay) {
    notFound();
  }

  const relatedEssays = getRelatedEssays(essay, 3);

  return <EssayContent essay={essay} relatedEssays={relatedEssays} baseUrl="/library" />;
}
