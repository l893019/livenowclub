import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUtopia } from "@/lib/utopia";
import { getMemberIdentity } from "@/lib/identities";
import { archetypes } from "@/lib/archetypes";
import { InviterDimensionPreview } from "./InviterDimensionPreview";
import Header from "@/components/Header";
import styles from "./JoinUtopia.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = await getUtopia(slug);

  if (!room) {
    return { title: "Group Not Found" };
  }

  const founder = room.members.find(m => m.id === room.createdBy);
  const founderName = founder?.name || "Someone";
  const founderIdentity = founder ? getMemberIdentity(founder.answers, founder.archetype) : null;
  const founderIdentityName = founderIdentity?.name || "a fellow explorer";

  const ogImage = `https://livenowclub.com/api/og/utopia/${slug}`;

  return {
    title: `${founderName} invited you | ${room.name}`,
    description: `${founderName} is a ${founderIdentityName}. Take the quiz to see how your worldviews fit together.`,
    openGraph: {
      title: `${founderName} invited you to compare worldviews`,
      description: `They're a ${founderIdentityName}. Take the quiz to see how your worldviews fit together.`,
      url: `https://livenowclub.com/wonder/essay/quiz/utopia/${slug}/join`,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${founderName} invited you to compare worldviews`,
      description: `They're a ${founderIdentityName}. Take the quiz to see how your worldviews fit together.`,
      images: [ogImage],
    },
  };
}

export default async function JoinUtopiaPage({ params }: Props) {
  const { slug } = await params;
  const room = await getUtopia(slug);

  if (!room) {
    notFound();
  }

  const founder = room.members.find(m => m.id === room.createdBy);
  const founderName = founder?.name || "Someone";
  const founderArchetype = founder?.archetype || "citizen";
  const founderIdentity = founder ? getMemberIdentity(founder.answers, founderArchetype) : null;
  const founderIdentityName = founderIdentity?.name || "a fellow explorer";
  const founderColor = founderIdentity?.color || archetypes[founderArchetype]?.color || "#e8178a";
  const founderId = founder?.id || room.createdBy;

  return (
    <>
      <style>{`
        :root {
          --bg-deep: #faf6f1;
          --bg: #fffbf7;
          --text: #2d2a26;
          --text-dim: rgba(45,42,38,0.7);
          --text-muted: rgba(45,42,38,0.45);
          --accent-pink: #e8178a;
          --founder-color: ${founderColor};
        }
      `}</style>

      <Header />

      <main className={styles.container}>
        <div className={styles.inviterSection}>
          <h1 className={styles.inviterName}>{founderName} invited you</h1>
          <p className={styles.inviterArchetype}>They&apos;re a {founderIdentityName}.</p>
          <p className={styles.inviterPrompt}>
            Take the quiz to see how your worldviews fit together.
          </p>
        </div>

        <div className={styles.radarPreview}>
          <InviterDimensionPreview
            inviterAnswers={founder?.answers}
            inviterColor={founderColor}
            inviterName={founderName}
          />
        </div>

        <p className={styles.groupName}>
          Joining <span className={styles.groupNameHighlight}>{room.name}</span>
        </p>

        <Link
          href={`/wonder/essay/quiz?join=${slug}&inviter=${founderId}`}
          className={styles.ctaButton}
        >
          Take the Quiz & Join
        </Link>

        <Link href="/wonder/essay/quiz" className={styles.secondaryLink}>
          or create your own group →
        </Link>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerCopy}>&copy; 2026 Louise Ireland</p>
      </footer>
    </>
  );
}
