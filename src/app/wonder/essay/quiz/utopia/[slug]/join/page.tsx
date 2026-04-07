import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUtopia } from "@/lib/utopia";
import { InviterRadarPreview } from "./InviterRadarPreview";
import Header from "@/components/Header";

const archetypeData: Record<string, { name: string; color: string }> = {
  citizen: { name: "The Abundant", color: "#3db9a4" },
  shaper: { name: "The Builder", color: "#f4a03f" },
  architect: { name: "The Architect", color: "#9b8fef" },
  presence: { name: "The Present", color: "#e8178a" },
  swimmer: { name: "The Questioner", color: "#6b8fef" },
  rooted: { name: "The Rooted", color: "#7ed6a4" },
  conscience: { name: "The Witness", color: "#d64545" },
  embers: { name: "The Keeper", color: "#c97d3a" },
  friction: { name: "The Challenger", color: "#ff6b35" },
  unbound: { name: "The Transcendent", color: "#a855f7" },
  alive: { name: "The Feeler", color: "#f472b6" },
  mender: { name: "The Mender", color: "#10b981" },
  cleareyed: { name: "The Truth-Teller", color: "#64748b" },
  between: { name: "The Liminal", color: "#8b8b8b" },
};

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
  const founderArchetype = founder?.archetype ? archetypeData[founder.archetype]?.name : "";

  const ogImage = `https://livenowclub.com/api/og/utopia/${slug}`;

  return {
    title: `${founderName} invited you | ${room.name}`,
    description: `${founderName} is ${founderArchetype}. Take the quiz to see how your worldviews fit together.`,
    openGraph: {
      title: `${founderName} invited you to compare worldviews`,
      description: `They're ${founderArchetype}. Take the quiz to see how your worldviews fit together.`,
      url: `https://livenowclub.com/wonder/essay/quiz/utopia/${slug}/join`,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${founderName} invited you to compare worldviews`,
      description: `They're ${founderArchetype}. Take the quiz to see how your worldviews fit together.`,
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
  const founderArchetypeName = archetypeData[founderArchetype]?.name || founderArchetype;
  const founderColor = archetypeData[founderArchetype]?.color || "#e8178a";
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
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          background: var(--bg-deep);
          color: var(--text);
          font-family: 'Satoshi', system-ui, sans-serif;
          font-size: 17px;
          line-height: 1.75;
          font-weight: 300;
          min-height: 100vh;
        }
        .join-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 100px 24px 80px;
          text-align: center;
        }

        .inviter-section {
          margin-bottom: 24px;
        }

        .inviter-name {
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 400;
          letter-spacing: -0.01em;
          margin-bottom: 8px;
        }

        .inviter-archetype {
          font-size: 1.2rem;
          color: var(--founder-color);
          font-style: italic;
          margin-bottom: 12px;
        }

        .inviter-prompt {
          font-size: 1rem;
          color: var(--text-dim);
          max-width: 320px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .radar-preview {
          margin: 32px 0;
        }

        .group-name {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 32px;
        }

        .group-name-link {
          color: var(--text-muted);
          text-decoration: none;
          border-bottom: 1px solid var(--text-muted);
          transition: color 0.2s, border-color 0.2s;
        }

        .group-name-link:hover {
          color: var(--accent-pink);
          border-color: var(--accent-pink);
        }

        .cta-button {
          display: inline-block;
          background: var(--accent-pink);
          color: white;
          font-size: 1.1rem;
          font-weight: 500;
          padding: 18px 40px;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s;
          box-shadow: 0 4px 20px rgba(232,23,138,0.25);
        }

        .cta-button:hover {
          background: #d01579;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(232,23,138,0.35);
        }

        .secondary-link {
          display: block;
          margin-top: 24px;
          font-size: 0.9rem;
          color: var(--text-dim);
          text-decoration: none;
        }

        .secondary-link:hover {
          color: var(--accent-pink);
        }

        .footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 16px 24px;
          text-align: center;
        }

        .footer-copy {
          font-size: 12px;
          color: var(--text-muted);
        }

        @media (max-width: 640px) {
          .inviter-name { font-size: 1.5rem; }
          .cta-button {
            padding: 16px 32px;
            font-size: 1rem;
          }
        }
      `}</style>

      <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet" />

      <Header />

      <main className="join-container">
        <div className="inviter-section">
          <h1 className="inviter-name">{founderName} invited you</h1>
          <p className="inviter-archetype">They&apos;re a {founderArchetypeName}.</p>
          <p className="inviter-prompt">
            Take the quiz to see how your worldviews fit together.
          </p>
        </div>

        <div className="radar-preview">
          <InviterRadarPreview
            inviterArchetype={founderArchetype}
            inviterColor={founderColor}
            inviterName={founderName}
          />
        </div>

        <p className="group-name">
          Joining <span className="group-name-link">{room.name}</span>
        </p>

        <Link
          href={`/wonder/essay/quiz?join=${slug}&inviter=${founderId}`}
          className="cta-button"
        >
          Take the Quiz & Join
        </Link>

        <Link href="/wonder/essay/quiz" className="secondary-link">
          or create your own group →
        </Link>
      </main>

      <footer className="footer">
        <p className="footer-copy">&copy; 2026 Louise Ireland</p>
      </footer>
    </>
  );
}
