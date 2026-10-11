import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CancerGuideShell from "@/components/CancerGuideShell";
import { getCancerGuide, getGuidePart, GUIDE_BASE } from "@/lib/cancer-guide";
import { renderEssayMarkdown, plainExcerpt } from "@/lib/render-markdown";

type Params = { part: string };

export function generateStaticParams(): Params[] {
  return (getCancerGuide()?.parts ?? []).map((p) => ({ part: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { part: slug } = await params;
  const found = getGuidePart(slug);
  if (!found) return {};
  const { guide, part } = found;
  const title = `${part.title} | ${guide.title}`;
  const description = plainExcerpt(part.body) || `Part ${part.number} of ${guide.title}, Lou’s Guide to Cancer.`;
  const url = `https://livenowclub.com${GUIDE_BASE}/${part.slug}`;
  return {
    title: `${title} | The Live Now Club`,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", images: [{ url: "https://livenowclub.com/images/og-cancer-guide.png", width: 1200, height: 630 }] },
  };
}

export default async function CancerGuidePartPage({ params }: { params: Promise<Params> }) {
  const { part: slug } = await params;
  const found = getGuidePart(slug);
  if (!found) notFound();
  const { guide, part, prev, next } = found;
  const { html } = renderEssayMarkdown(part.body, { detectPoem: false, headingIds: true, guide: true });
  return (
    <CancerGuideShell
      page={`${GUIDE_BASE}/${part.slug}`}
      label={`${guide.title} · Part ${part.number} of ${guide.parts.length}`}
      title={part.title}
      bodyHtml={html}
      parts={guide.parts}
      currentSlug={part.slug}
      prev={prev}
      next={next}
    />
  );
}
