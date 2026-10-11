import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CancerGuideShell from "@/components/CancerGuideShell";
import { getCancerGuide, GUIDE_BASE } from "@/lib/cancer-guide";
import { renderEssayMarkdown } from "@/lib/render-markdown";

const DESCRIPTION = "Lou’s Guide to Cancer, in six chapters: core principles, before treatment, treatment, supporting your body, survivorship, and how to support a friend. Free PDF.";

export const metadata: Metadata = {
  title: "Expecting the Unexpected: Lou’s Guide to Cancer | The Live Now Club",
  description: DESCRIPTION,
  alternates: { canonical: `https://livenowclub.com${GUIDE_BASE}` },
  openGraph: {
    title: "Expecting the Unexpected: Lou’s Guide to Cancer",
    description: DESCRIPTION,
    url: `https://livenowclub.com${GUIDE_BASE}`,
    type: "article",
    images: [{ url: "https://livenowclub.com/images/og-cancer-guide.png", width: 1200, height: 630 }],
  },
};

export default function CancerGuideIndex() {
  const guide = getCancerGuide();
  if (!guide) notFound();
  const { html } = renderEssayMarkdown(guide.intro, { detectPoem: false, headingIds: true, guide: true });
  return (
    <CancerGuideShell
      page={GUIDE_BASE}
      label={guide.subtitle}
      title={guide.title}
      bodyHtml={html}
      parts={guide.parts}
    />
  );
}
