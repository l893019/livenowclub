"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type UtopiaMember = {
  id: string;
  name: string;
  archetype: string;
  joinedAt: string;
};

type UtopiaRoom = {
  slug: string;
  name: string;
  createdBy: string;
  members: UtopiaMember[];
  createdAt: string;
};

// Mini planet component for dashboard
function MiniPlanet({ archetypes }: { archetypes: string[] }) {
  const archetypeColors: Record<string, string> = {
    citizen: "#3db9a4",
    shaper: "#f4a03f",
    architect: "#9b8fef",
    presence: "#e8178a",
    swimmer: "#6b8fef",
    rooted: "#7ed6a4",
    conscience: "#d64545",
    embers: "#c97d3a",
    friction: "#ff6b35",
    unbound: "#a855f7",
    alive: "#f472b6",
    mender: "#10b981",
    cleareyed: "#64748b",
    between: "#8b8b8b",
  };

  const unique = [...new Set(archetypes)];
  const count = unique.length;

  return (
    <svg viewBox="0 0 100 100" width="80" height="80">
      <defs>
        <radialGradient id={`miniBase-${archetypes.join("")}`} cx="30%" cy="30%">
          <stop offset="0%" stopColor="#2a2a3e" />
          <stop offset="100%" stopColor="#1a1a2e" />
        </radialGradient>
        <clipPath id={`miniClip-${archetypes.join("")}`}>
          <circle cx="50" cy="50" r="45" />
        </clipPath>
      </defs>

      <circle cx="50" cy="50" r="45" fill={`url(#miniBase-${archetypes.join("")})`} />

      <g clipPath={`url(#miniClip-${archetypes.join("")})`}>
        {unique.map((arch, i) => {
          const segmentAngle = 360 / count;
          const startAngle = (segmentAngle * i) - 90;
          const endAngle = startAngle + segmentAngle;
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;
          const x1 = 50 + 45 * Math.cos(startRad);
          const y1 = 50 + 45 * Math.sin(startRad);
          const x2 = 50 + 45 * Math.cos(endRad);
          const y2 = 50 + 45 * Math.sin(endRad);
          const largeArc = segmentAngle > 180 ? 1 : 0;
          const pathD = `M50,50 L${x1},${y1} A45,45 0 ${largeArc},1 ${x2},${y2} Z`;

          return (
            <path
              key={arch}
              d={pathD}
              fill={archetypeColors[arch] || "#666"}
              opacity={0.6}
            />
          );
        })}
      </g>

      <ellipse cx="35" cy="35" rx="15" ry="10" fill="white" opacity="0.08" />
    </svg>
  );
}

export default function MyUtopiasPage() {
  const [utopias, setUtopias] = useState<UtopiaRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("quiz-user-id");

    if (!userId) {
      setError("no-quiz");
      setLoading(false);
      return;
    }

    fetch(`/api/utopia/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.utopias) {
          setUtopias(data.utopias);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch utopias:", err);
        setError("fetch-error");
        setLoading(false);
      });
  }, []);

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
          font-family: 'Space Grotesk', system-ui, sans-serif;
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

        .container {
          min-height: 100vh;
          padding: 120px 24px 80px;
          max-width: 900px;
          margin: 0 auto;
        }

        .page-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .page-label {
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--accent-pink);
          margin-bottom: 16px;
        }

        .page-title {
          font-size: clamp(2rem, 6vw, 3rem);
          font-weight: 300;
          letter-spacing: -0.02em;
        }

        .utopias-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 24px;
        }

        .utopia-card {
          background: var(--bg-card);
          border-radius: 16px;
          padding: 24px;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .utopia-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(232,23,138,0.12);
        }

        .utopia-card-planet {
          margin-bottom: 16px;
        }

        .utopia-card-name {
          font-size: 1.25rem;
          font-weight: 400;
          margin-bottom: 4px;
        }

        .utopia-card-count {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .empty-state {
          text-align: center;
          padding: 60px 24px;
        }

        .empty-title {
          font-size: 1.5rem;
          font-weight: 300;
          margin-bottom: 16px;
        }

        .empty-text {
          font-size: 1rem;
          color: var(--text-dim);
          margin-bottom: 32px;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
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
        }

        .btn-primary {
          background: var(--accent-pink);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(232,23,138,0.3);
        }

        .loading {
          text-align: center;
          padding: 60px 24px;
          color: var(--text-muted);
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
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

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

      <main className="container">
        <div className="page-header">
          <div className="page-label">Your Worlds</div>
          <h1 className="page-title">My Utopias</h1>
        </div>

        {loading && (
          <div className="loading">Loading your utopias...</div>
        )}

        {error === "no-quiz" && (
          <div className="empty-state">
            <h2 className="empty-title">Take the quiz first</h2>
            <p className="empty-text">
              Discover your post-scarcity worldview, then build utopias with friends.
            </p>
            <Link href="/wonder/essay/quiz" className="btn btn-primary">
              Take the Quiz
            </Link>
          </div>
        )}

        {error === "fetch-error" && (
          <div className="empty-state">
            <h2 className="empty-title">Something went wrong</h2>
            <p className="empty-text">
              We couldn&apos;t load your utopias. Try refreshing the page.
            </p>
          </div>
        )}

        {!loading && !error && utopias.length === 0 && (
          <div className="empty-state">
            <h2 className="empty-title">No utopias yet</h2>
            <p className="empty-text">
              Build your first utopia and invite friends to join.
            </p>
            <Link href="/wonder/essay/quiz" className="btn btn-primary">
              Build a Utopia
            </Link>
          </div>
        )}

        {!loading && !error && utopias.length > 0 && (
          <div className="utopias-grid">
            {utopias.map((utopia) => (
              <Link
                key={utopia.slug}
                href={`/wonder/essay/quiz/utopia/${utopia.slug}`}
                className="utopia-card"
              >
                <div className="utopia-card-planet">
                  <MiniPlanet archetypes={utopia.members.map((m) => m.archetype)} />
                </div>
                <div className="utopia-card-name">{utopia.name}</div>
                <div className="utopia-card-count">
                  {utopia.members.length} {utopia.members.length === 1 ? "person" : "people"}
                </div>
              </Link>
            ))}
          </div>
        )}
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
