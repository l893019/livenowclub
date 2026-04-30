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

  const url = `https://livenowclub.com/read/${slug}`;
  const image = essay.image
    ? `https://livenowclub.com${essay.image}`
    : "https://livenowclub.com/images/og-default.jpg";

  return {
    title: `${essay.title} | The Live Now Club`,
    description: essay.excerpt,
    openGraph: {
      title: essay.title,
      description: essay.excerpt,
      url,
      type: "article",
      images: [{ url: image, width: 1200, height: 630 }],
      siteName: "The Live Now Club",
    },
    twitter: {
      card: "summary_large_image",
      title: essay.title,
      description: essay.excerpt,
      images: [image],
    },
  };
}

export default async function EssayPage({ params }: Props) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);

  if (!essay) {
    notFound();
  }

  const relatedEssays = getRelatedEssays(essay, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: essay.title,
    description: essay.excerpt,
    image: essay.image ? `https://livenowclub.vercel.app${essay.image}` : undefined,
    datePublished: essay.date,
    author: {
      "@type": "Person",
      name: "Louise Ireland",
      url: "https://livenowclub.vercel.app/about",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EssayContent essay={essay} relatedEssays={relatedEssays} />
    </>
  );
}
