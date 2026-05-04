import type { Metadata } from "next";
import { getUserBySlug } from "@/lib/utopia";
import { MeetPageClient } from "./MeetPageClient";
import { notFound } from "next/navigation";
import { arrayToQuizAnswers, calculateDimensions } from "@/lib/dimensions";
import { getIdentityFromDimensions, getAdjectiveIndex } from "@/lib/identities";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const user = await getUserBySlug(slug);

  if (!user) {
    return { title: "User Not Found" };
  }

  // Calculate identity for OG metadata
  let identityName = "their worldview";
  if (user.answers?.length === 7) {
    const quizAnswers = arrayToQuizAnswers(user.answers);
    if (quizAnswers) {
      const dims = calculateDimensions(quizAnswers);
      const adjIdx = getAdjectiveIndex(dims.certainty, dims.posture);
      const identity = getIdentityFromDimensions(dims.agency, dims.certainty, dims.posture, adjIdx);
      if (identity) {
        identityName = `a ${identity.name}`;
      }
    }
  }

  const displayName = user.name === "Anonymous" ? "Someone" : user.name;

  return {
    title: `${displayName} shared their worldview with you | Live Now Club`,
    description: `${displayName} is ${identityName}. Take the quiz to discover yours and see where your worldviews intersect.`,
    openGraph: {
      title: `${displayName} shared their worldview with you`,
      description: `Take the worldview quiz to discover yours and see where you intersect.`,
      images: ["/wonder/assets/landscapes/optimized/1.jpg"],
    },
  };
}

export default async function MeetPage({ params }: Props) {
  const { slug } = await params;
  const user = await getUserBySlug(slug);

  if (!user) {
    notFound();
  }

  // Calculate identity from answers
  let identityName: string | null = null;
  let identityDescription: string | null = null;

  if (user.answers?.length === 7) {
    const quizAnswers = arrayToQuizAnswers(user.answers);
    if (quizAnswers) {
      const dims = calculateDimensions(quizAnswers);
      const adjIdx = getAdjectiveIndex(dims.certainty, dims.posture);
      const identity = getIdentityFromDimensions(dims.agency, dims.certainty, dims.posture, adjIdx);
      if (identity) {
        identityName = identity.name;
        identityDescription = identity.oneSentence;
      }
    }
  }

  return (
    <MeetPageClient
      targetUser={{
        id: user.id,
        name: user.name,
        slug: user.slug || slug,
        identityName,
        identityDescription,
      }}
    />
  );
}
