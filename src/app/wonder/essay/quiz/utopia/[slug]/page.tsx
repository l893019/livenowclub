import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getUtopia } from "@/lib/utopia";
import { archetypes } from "@/lib/archetypes";
import { UtopiaPageClient } from "./UtopiaPageClient";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ view?: string; you?: string; them?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { view, you: youId, them: themId } = await searchParams;
  const room = await getUtopia(slug);

  if (!room) {
    return { title: "Utopia Not Found" };
  }

  // Check if this is a relationship share
  if (view === "relationship" && youId && themId) {
    const youMember = room.members.find((m) => m.id === youId);
    const themMember = room.members.find((m) => m.id === themId);

    if (youMember && themMember) {
      const yourArch = archetypes[youMember.archetype];
      const theirArch = archetypes[themMember.archetype];
      const title = `${youMember.name || "You"} × ${themMember.name || "Them"} — Relationship`;
      const description = `${yourArch?.name?.split(" ")[0]} × ${theirArch?.name?.split(" ")[0]} — See how these two worldviews interact.`;
      const ogImage = `https://livenowclub.com/api/og/relationship?arch1=${youMember.archetype}&arch2=${themMember.archetype}&name1=${encodeURIComponent(youMember.name || "You")}&name2=${encodeURIComponent(themMember.name || "Them")}`;

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          url: `https://livenowclub.com/wonder/essay/quiz/utopia/${slug}?view=relationship&you=${youId}&them=${themId}`,
          type: "website",
          images: [ogImage],
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: [ogImage],
        },
      };
    }
  }

  // Default utopia metadata
  const memberCount = room.members.length;
  const title = `${room.name} — A Utopia of ${memberCount}`;
  const description = `Build a utopia with me. ${memberCount} ${memberCount === 1 ? "person has" : "people have"} joined ${room.name}.`;
  const ogImage = `https://livenowclub.com/api/og/utopia/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title: `Join ${room.name}`,
      description,
      url: `https://livenowclub.com/wonder/essay/quiz/utopia/${slug}`,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `Join ${room.name}`,
      description,
      images: [ogImage],
    },
  };
}

export default async function UtopiaPage({ params }: Props) {
  const { slug } = await params;
  const room = await getUtopia(slug);

  if (!room) {
    notFound();
  }

  // Get current host for share URL
  const headersList = await headers();
  const host = headersList.get("host") || "livenowclub.com";
  const protocol = host.includes("localhost") ? "http" : "https";
  const shareUrl = `${protocol}://${host}/wonder/essay/quiz/utopia/${slug}/join`;

  return (
    <>
      <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400&display=swap" rel="stylesheet" />

      <UtopiaPageClient
        slug={slug}
        utopiaName={room.name}
        members={room.members}
        shareUrl={shareUrl}
      />
    </>
  );
}
