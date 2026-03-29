import { redirect } from "next/navigation";
import { getAllEssays } from "@/lib/essays";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const essays = getAllEssays();
  return essays.map((essay) => ({ slug: essay.slug }));
}

export default async function ReadSlugPage({ params }: Props) {
  const { slug } = await params;
  redirect(`/library/${slug}`);
}
