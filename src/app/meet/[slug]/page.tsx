import type { Metadata } from "next";
import { getUserBySlug } from "@/lib/utopia";
import { MeetPageClient } from "./MeetPageClient";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const user = await getUserBySlug(slug);

  if (!user) {
    return { title: "User Not Found" };
  }

  return {
    title: `See your compatibility with ${user.name} | Live Now Club`,
    description: `Take the worldview quiz to see how compatible you are with ${user.name}`,
    openGraph: {
      title: `See your compatibility with ${user.name}`,
      description: `Take the worldview quiz to see how compatible you are with ${user.name}`,
    },
  };
}

export default async function MeetPage({ params }: Props) {
  const { slug } = await params;
  const user = await getUserBySlug(slug);

  if (!user) {
    notFound();
  }

  return (
    <MeetPageClient
      targetUser={{
        id: user.id,
        name: user.name,
        slug: user.slug || slug,
      }}
    />
  );
}
