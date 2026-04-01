import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUtopia } from "@/lib/utopia";

const archetypeData: Record<string, { name: string; color: string }> = {
  citizen: { name: "Citizen of Abundance", color: "#3db9a4" },
  shaper: { name: "Shaper of Change", color: "#f4a03f" },
  architect: { name: "Architect of the Commons", color: "#9b8fef" },
  presence: { name: "Keeper of Presence", color: "#e8178a" },
  swimmer: { name: "Swimmer in Deep Water", color: "#6b8fef" },
  rooted: { name: "Rooted in Stillness", color: "#7ed6a4" },
  conscience: { name: "Conscience Before Comfort", color: "#d64545" },
  embers: { name: "Keeper of Embers", color: "#c97d3a" },
  friction: { name: "Alive in the Friction", color: "#ff6b35" },
  unbound: { name: "Unbound from Form", color: "#a855f7" },
  alive: { name: "Alive to Everything", color: "#f472b6" },
  mender: { name: "Mender of What Remains", color: "#10b981" },
  cleareyed: { name: "Clear-Eyed in the Storm", color: "#64748b" },
  between: { name: "In the Space Between", color: "#8b8b8b" },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = await getUtopia(slug);

  if (!room) {
    return { title: "Utopia Not Found" };
  }

  const founder = room.members.find(m => m.id === room.createdBy);
  const founderName = founder?.name || "Someone";
  const founderArchetype = founder?.archetype ? archetypeData[founder.archetype]?.name : "";

  return {
    title: `Join ${room.name}`,
    description: `${founderName} invited you to join ${room.name}. Take the quiz to enter.`,
    openGraph: {
      title: `Join ${room.name}`,
      description: `${founderName}, a ${founderArchetype}, invited you to join their utopia.`,
      url: `https://livenowclub.com/wonder/essay/quiz/utopia/${slug}/join`,
      type: "website",
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

  const population = room.members.length;
  const otherMembers = room.members.filter(m => m.id !== room.createdBy);

  let populationText = "";
  if (population === 1) {
    populationText = "You'll be the second to enter.";
  } else if (population === 2) {
    populationText = `Join ${founderName} and ${otherMembers[0]?.name || "another"}.`;
  } else {
    const names = otherMembers.slice(0, 2).map(m => m.name).join(", ");
    const remaining = population - 3;
    if (remaining > 0) {
      populationText = `Join ${founderName}, ${names}, and ${remaining} ${remaining === 1 ? "other" : "others"}.`;
    } else {
      populationText = `Join ${founderName} and ${names}.`;
    }
  }

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
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 32px;
          background: rgba(250, 247, 242, 0.95);
          backdrop-filter: blur(20px);
        }
        .logo-img { height: 40px; width: auto; }
        .nav { display: flex; gap: 24px; }
        .nav a {
          font-size: 12px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-dim);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav a:hover { color: var(--accent-pink); }

        .join-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 120px 24px 80px;
          text-align: center;
        }

        .join-label {
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .utopia-name {
          font-size: clamp(2rem, 6vw, 3rem);
          font-weight: 300;
          letter-spacing: -0.02em;
          margin-bottom: 24px;
        }

        .founder-info {
          font-size: 1.1rem;
          color: var(--text-dim);
          margin-bottom: 8px;
        }

        .founder-archetype {
          color: var(--founder-color);
          font-style: italic;
        }

        .population {
          font-size: 1rem;
          color: var(--text-muted);
          margin-bottom: 48px;
        }

        .options {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 400px;
          width: 100%;
        }

        .option-card {
          display: block;
          background: white;
          border: 2px solid transparent;
          border-radius: 16px;
          padding: 28px 24px;
          text-decoration: none;
          transition: all 0.3s;
          text-align: center;
        }

        .option-card:hover {
          border-color: var(--accent-pink);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(232,23,138,0.15);
        }

        .option-card.primary {
          background: var(--accent-pink);
          color: white;
        }

        .option-card.primary:hover {
          background: #d01579;
          border-color: #d01579;
        }

        .option-title {
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .option-card.primary .option-title {
          color: white;
        }

        .option-desc {
          font-size: 0.95rem;
          color: var(--text-dim);
          line-height: 1.5;
        }

        .option-card.primary .option-desc {
          color: rgba(255,255,255,0.85);
        }

        .divider {
          font-size: 0.9rem;
          color: var(--text-muted);
          text-transform: lowercase;
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
          .header { padding: 12px 16px; }
          .nav { gap: 16px; }
          .nav a { font-size: 10px; }
          .utopia-name { font-size: 1.8rem; }
          .options { padding: 0 16px; }
        }
      `}</style>

      <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet" />

      <header className="header">
        <Link href="/" className="logo">
          <img src="/images/logo-handwritten.png" alt="The Live Now Club" className="logo-img" />
        </Link>
        <nav className="nav">
          <Link href="/read">Read</Link>
          <Link href="/navigate">Navigate</Link>
          <Link href="/wonder">Wonder</Link>
          <Link href="/connect">Connect</Link>
        </nav>
      </header>

      <main className="join-container">
        <div className="join-label">You&apos;ve been invited to</div>
        <h1 className="utopia-name">{room.name}</h1>
        <p className="founder-info">
          Founded by {founderName}, a <span className="founder-archetype">{founderArchetypeName}</span>
        </p>
        <p className="population">{populationText}</p>

        <div className="options">
          <Link href={`/wonder/essay/quiz?join=${slug}`} className="option-card primary">
            <div className="option-title">Join This Utopia</div>
            <div className="option-desc">
              Take the quiz and see how your worldviews combine.
            </div>
          </Link>

          <div className="divider">or</div>

          <Link href="/wonder/essay/quiz" className="option-card">
            <div className="option-title">Build Your Own</div>
            <div className="option-desc">
              Take the quiz and create your own utopia to invite others into.
            </div>
          </Link>
        </div>
      </main>

      <footer className="footer">
        <p className="footer-copy">&copy; 2026 Louise Ireland</p>
      </footer>
    </>
  );
}
