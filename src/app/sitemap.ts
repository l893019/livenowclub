import { getAllEssays } from "@/lib/essays";
import { getCancerGuide, GUIDE_BASE, GUIDE_ESSAY_SLUG } from "@/lib/cancer-guide";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://livenowclub.com";
  const essays = getAllEssays().filter((e) => e.slug !== GUIDE_ESSAY_SLUG); // served as the guide chapters
  const guide = getCancerGuide();
  const guideUrls = [
    { url: `${baseUrl}${GUIDE_BASE}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    ...(guide?.parts ?? []).map((p) => ({
      url: `${baseUrl}${GUIDE_BASE}/${p.slug}`,
      lastModified: new Date(guide!.date),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];

  const essayUrls = essays.map((essay) => ({
    url: `${baseUrl}/read/${essay.slug}`,
    lastModified: new Date(essay.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/read`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/navigate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/navigate/cancer`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    ...guideUrls,
    { url: `${baseUrl}/wonder`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/connect`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/philosophy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...essayUrls,
  ];
}
