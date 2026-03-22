import { getAllEssays } from "@/lib/essays";
import { NextResponse } from "next/server";

export async function GET() {
  const essays = getAllEssays();

  // Return simplified essay data for the homepage
  const simplified = essays.map((e) => ({
    slug: e.slug,
    title: e.title,
    excerpt: e.excerpt,
    type: e.type,
    image: e.image,
  }));

  return NextResponse.json(simplified);
}
