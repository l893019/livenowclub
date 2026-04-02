import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getUtopia, type UtopiaMember } from "@/lib/utopia";
import { archetypes } from "@/lib/archetypes";
import ShareButton from "./ShareButton";
import PlanetVisualization from "./PlanetVisualization";
import { UtopiaCards } from "./UtopiaCards";

// Copy for same archetype pairs
const pairSameCopy: Record<string, string> = {
  citizen: "Two at ease. This utopia floats. Who drops anchor?",
  shaper: "Two builders. You'll create something—if you stop redesigning it.",
  architect: "Two systems thinkers. Great structures. Who lives in them?",
  presence: "Two keepers. So much holding space. Who makes the first move?",
  swimmer: "Two in deep water. You'll question everything. Even this.",
  rooted: "Two in stillness. Peaceful—but the tea isn't going to make itself.",
  conscience: "Two watchmen. Nothing escapes you. Exhausting, but safe.",
  embers: "Two archivists. The past is very well preserved here.",
  friction: "Two who crave difficulty. This should be interesting.",
  unbound: "Two transcenders. You've both left the building.",
  alive: "Two sensation-seekers. Buckle up.",
  mender: "Two fixers. Everything here will work. Eventually.",
  cleareyed: "Two truth-tellers. No one's getting away with anything.",
  between: "Two still figuring it out. At least you're not alone.",
};

// Copy for overrepresentation (3+)
const overrepCopy: Record<string, string> = {
  citizen: "Heavy on ease. But who's watching the edges?",
  shaper: "Builders everywhere. Does anyone here sit down?",
  architect: "Systems thinkers abound. The meeting about the meeting is scheduled.",
  presence: "So much presence. Who takes action?",
  swimmer: "Deep philosophers. Beautiful questions. Any answers?",
  rooted: "So much stillness. Peaceful—but does anything happen?",
  conscience: "Watchmen everywhere. Nothing gets past you. Maybe lighten up?",
  embers: "Archivists aplenty. The past is safe. What about tomorrow?",
  friction: "Everyone craves difficulty. Everything's a mountain.",
  unbound: "Transcenders all. Don't forget you still have bodies.",
  alive: "Sensation-seekers everywhere. Who's driving?",
  mender: "Fixers all around. You'll repair anything—even what should stay broken.",
  cleareyed: "Truth-tellers in stereo. Brutal honesty abound.",
  between: "Everyone's still figuring it out. Take your time. Really.",
};

// Copy for missing archetypes
const missingCopy: Record<string, string> = {
  citizen: "No one here is at ease. You're all still fighting for something.",
  shaper: "No one is building. Are you too comfortable with how things are?",
  architect: "No one is thinking about structures. Who decides how decisions get made?",
  presence: "No one is just... here. Everyone's somewhere else.",
  swimmer: "No one sits with questions. You might solve the wrong problems efficiently.",
  rooted: "No one has stopped. When does this group rest?",
  conscience: "No one is watching. What might you miss?",
  embers: "No one guards the past. You might build something incredible and forget why.",
  friction: "No one craves difficulty. Comfort might be your blind spot.",
  unbound: "No one is reaching past the edges. Too earthbound.",
  alive: "No one is here just to feel. Don't forget to enjoy this.",
  mender: "No one fixes things. When it breaks, you'll just build new.",
  cleareyed: "No one tells the hard truth. Who calls out the elephant?",
  between: "Everyone knows what they believe. You might lack beginner's mind.",
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

function analyzeGroup(members: UtopiaMember[]) {
  // Count archetypes
  const counts: Record<string, string[]> = {};
  for (const member of members) {
    const arch = member.archetype;
    if (!counts[arch]) counts[arch] = [];
    counts[arch].push(member.name);
  }

  // Find overrepresented (3+)
  const overrep = Object.entries(counts)
    .filter(([, names]) => names.length >= 3)
    .map(([arch]) => arch);

  // Find missing
  const allArchetypes = Object.keys(archetypes);
  const missing = allArchetypes.filter((arch) => !counts[arch]);

  // Generate one-liner
  let oneLiner = "";

  if (members.length === 2) {
    const [a, b] = members;
    if (a.archetype === b.archetype) {
      // Same archetype pair
      oneLiner = pairSameCopy[a.archetype] || "Two of a kind.";
    } else {
      // Different archetypes
      const aName = archetypes[a.archetype]?.name || a.archetype;
      const bName = archetypes[b.archetype]?.name || b.archetype;
      oneLiner = `A ${aName.split(" ")[0]} and a ${bName.split(" ")[0]}. You'll either balance each other or drive each other crazy.`;
    }
  } else if (overrep.length > 0) {
    // Use overrep copy for the most overrepresented
    const mostOverrep = overrep.sort(
      (a, b) => (counts[b]?.length || 0) - (counts[a]?.length || 0)
    )[0];
    oneLiner = overrepCopy[mostOverrep] || "An interesting mix.";
  } else if (members.length === 1) {
    oneLiner = "A utopia of one. Invite someone to see what you build together.";
  } else {
    // Diverse group
    const archetypeCount = Object.keys(counts).length;
    oneLiner = `${archetypeCount} different worldviews. This could get interesting.`;
  }

  return { counts, overrep, missing, oneLiner };
}

export default async function UtopiaPage({ params }: Props) {
  const { slug } = await params;
  const room = await getUtopia(slug);

  if (!room) {
    notFound();
  }

  const { counts, missing, oneLiner } = analyzeGroup(room.members);
  const creator = room.members.find(m => m.id === room.createdBy);
  const creatorName = creator?.name || "Someone";

  // Get current host for share URL
  const headersList = await headers();
  const host = headersList.get("host") || "livenowclub.com";
  const protocol = host.includes("localhost") ? "http" : "https";
  const shareUrl = `${protocol}://${host}/wonder/essay/quiz/utopia/${slug}/join`;
  const shareText = `Join ${room.name} — a utopia of ${room.members.length}.`;

  return (
    <>
      <style>{`
        :root {
          --bg-deep: #faf6f1;
          --bg: #fffbf7;
          --bg-card: #fff;
          --text: #2d2a26;
          --text-dim: rgba(45,42,38,0.7);
          --text-muted: rgba(45,42,38,0.45);
          --accent-pink: #e8178a;
          --border: rgba(232,23,138,0.12);
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

        .utopia-container {
          min-height: 100vh;
          padding: 120px 24px 80px;
          max-width: 800px;
          margin: 0 auto;
        }

        .utopia-hero {
          text-align: center;
          margin-bottom: 48px;
        }

        .utopia-label {
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--accent-pink);
          margin-bottom: 16px;
        }

        .utopia-name {
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 300;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }

        .utopia-count {
          font-size: 1rem;
          color: var(--text-muted);
          margin-bottom: 32px;
        }

        .planet-wrapper {
          margin: 0 auto 32px;
          display: flex;
          justify-content: center;
        }

        .one-liner {
          font-size: 1.3rem;
          font-style: italic;
          color: var(--text);
          max-width: 600px;
          margin: 0 auto 48px;
          text-align: center;
          line-height: 1.6;
        }

        .section {
          margin-bottom: 48px;
        }

        .section-title {
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          margin-bottom: 24px;
          text-align: center;
        }

        .members-grid {
          display: grid;
          gap: 24px;
        }

        .archetype-group {
          background: var(--bg-card);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }

        .archetype-name {
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 12px;
        }

        .member-names {
          font-size: 1.1rem;
          color: var(--text);
        }

        .missing-section {
          background: rgba(0,0,0,0.03);
          border-radius: 12px;
          padding: 32px;
        }

        .missing-intro {
          font-size: 1rem;
          color: var(--text-dim);
          margin-bottom: 24px;
          text-align: center;
        }

        .missing-list {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
        }

        .missing-item {
          background: var(--bg-card);
          padding: 16px 24px;
          border-radius: 8px;
          max-width: 400px;
        }

        .missing-archetype {
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 4px;
          text-decoration: none;
          display: block;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .missing-archetype:hover {
          opacity: 0.7;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .missing-insight {
          font-size: 0.95rem;
          color: var(--text-dim);
          line-height: 1.6;
        }

        .share-section {
          text-align: center;
          padding: 48px 24px;
          background: var(--bg-card);
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }

        .share-title {
          font-size: 1.5rem;
          font-weight: 300;
          margin-bottom: 8px;
        }

        .share-subtitle {
          font-size: 1rem;
          color: var(--text-dim);
          margin-bottom: 24px;
        }

        .share-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
          color: var(--text-muted);
          background: var(--bg-deep);
          padding: 12px 20px;
          border-radius: 8px;
          display: inline-block;
          margin-bottom: 24px;
          word-break: break-all;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
        }
        .share-link:hover {
          color: var(--accent-pink);
          background: rgba(232, 23, 138, 0.08);
        }

        .actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          border-radius: 50px;
          transition: all 0.3s;
          cursor: pointer;
          border: none;
          font-family: inherit;
        }

        .btn-primary {
          background: var(--accent-pink);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(232,23,138,0.3);
        }

        .btn-secondary {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--text-muted);
        }

        .btn-secondary:hover {
          border-color: var(--accent-pink);
          color: var(--accent-pink);
        }

        .footer {
          padding: 60px 24px;
          text-align: center;
          border-top: 1px solid rgba(232,23,138,0.1);
          margin-top: 80px;
        }

        .footer-nav {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-bottom: 24px;
        }

        .footer-nav a {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-dim);
          text-decoration: none;
        }

        .footer-copy {
          font-size: 12px;
          color: var(--text-muted);
        }

        @media (max-width: 640px) {
          .header { padding: 12px 16px; }
          .nav { gap: 16px; }
          .nav a { font-size: 10px; }
          .utopia-name { font-size: 2rem; }
          .planet-wrapper { margin-bottom: 24px; }
          .one-liner { font-size: 1.1rem; }
        }
      `}</style>

      <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400&display=swap" rel="stylesheet" />

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

      <main className="utopia-container">
        <div className="utopia-hero">
          <div className="utopia-label">Your Utopia</div>
          <h1 className="utopia-name">{room.name}</h1>
          <p className="utopia-count">
            {room.members.length} {room.members.length === 1 ? "person" : "people"}
          </p>

          <div className="planet-wrapper">
            <PlanetVisualization archetypes={room.members.map(m => m.archetype)} size={280} />
          </div>

          <p className="one-liner">{oneLiner}</p>
        </div>

        {/* Members - Swipeable Cards */}
        <div className="section">
          <h2 className="section-title">Who&apos;s Here</h2>
          <UtopiaCards
            members={room.members}
            createdBy={room.createdBy}
            utopiaName={room.name}
          />
        </div>

        {/* Missing archetypes (only show a few) */}
        {missing.length > 0 && missing.length <= 10 && (
          <div className="section">
            <h2 className="section-title">What&apos;s Missing</h2>
            <div className="missing-section">
              <p className="missing-intro">
                Every group has blind spots. Here are yours.
              </p>
              <div className="missing-list">
                {missing.slice(0, 4).map((arch) => (
                  <div key={arch} className="missing-item">
                    <Link
                      href={`/wonder/essay/quiz/explore/#${arch}`}
                      className="missing-archetype"
                      style={{ color: archetypes[arch]?.color || "#666" }}
                    >
                      {archetypes[arch]?.name || arch}
                    </Link>
                    <div className="missing-insight">
                      {missingCopy[arch] || "Someone with this perspective could help."}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Share */}
        <div className="share-section">
          <h2 className="share-title">Invite someone</h2>
          <p className="share-subtitle">
            See how your utopia changes when new worldviews join.
          </p>
          <a href={shareUrl} className="share-link" target="_blank" rel="noopener noreferrer">{shareUrl}</a>
          <div className="actions">
            <ShareButton shareText={shareText} shareUrl={shareUrl} />
            <Link href="/wonder/essay/quiz/my-utopias" className="btn btn-secondary">
              My Utopias
            </Link>
          </div>
        </div>
      </main>

      <footer className="footer">
        <nav className="footer-nav">
          <Link href="/read">Read</Link>
          <Link href="/navigate">Navigate</Link>
          <Link href="/wonder">Wonder</Link>
          <Link href="/connect">Connect</Link>
        </nav>
        <p className="footer-copy">&copy; 2026 Louise Ireland</p>
      </footer>
    </>
  );
}
