import type { Metadata } from "next";
import Link from "next/link";
import ShareButton from "./ShareButton";

const archetypes: Record<string, {
  name: string;
  tagline: string;
  shareText: string;
  description: string;
  color: string;
  books: { title: string; author: string }[];
}> = {
  culture: {
    name: "Culture Citizen",
    tagline: "Comfort doesn't frighten me. Boredom does.",
    shareText: "I believe we'll keep working even when we don't have to.",
    description: "You believe the machinery should handle the drudgery so we can get on with the business of being alive. You're not naive about power — you know that even utopia needs someone watching the edges — but you trust that intelligence, properly distributed, tends toward good. You'd rather live in a world with too much freedom than too little.",
    color: "#3db9a4",
    books: [
      { title: "The Player of Games", author: "Iain M. Banks" },
      { title: "Accelerando", author: "Charles Stross" },
      { title: "Down and Out in the Magic Kingdom", author: "Cory Doctorow" }
    ]
  },
  earthseed: {
    name: "Earthseed Shaper",
    tagline: "The future is raw material.",
    shareText: "I believe the future isn't something that happens to you — it's something you shape.",
    description: "You don't trust stillness. Not because you're restless, but because you understand that the moment you stop adapting, you start calcifying. You see the transition ahead not as a threat but as raw material. The future isn't something that happens to you. It's something you build with whatever is at hand, including the wreckage.",
    color: "#f4a03f",
    books: [
      { title: "Parable of the Sower", author: "Octavia Butler" },
      { title: "Red Mars", author: "Kim Stanley Robinson" },
      { title: "The Diamond Age", author: "Neal Stephenson" }
    ]
  },
  anarres: {
    name: "Anarres Builder",
    tagline: "Mutual aid is not a theory.",
    shareText: "I believe even the best people will recreate the old hierarchies if the structures allow it.",
    description: "You believe the structures matter more than the individuals inside them. Not because people don't matter — they matter immensely — but because even the best people will reproduce the old hierarchies if the structures allow it. You'd rather build something imperfect and collectively owned than something elegant and controlled by a few.",
    color: "#9b8fef",
    books: [
      { title: "The Dispossessed", author: "Ursula K. Le Guin" },
      { title: "Pacific Edge", author: "Kim Stanley Robinson" },
      { title: "Four Ways to Forgiveness", author: "Ursula K. Le Guin" }
    ]
  },
  diamond: {
    name: "Diamond Reader",
    tagline: "Someone real has to speak the words.",
    shareText: "I believe the thing that changes a life is a person choosing to be present for another.",
    description: "You keep coming back to the same realization: that no matter how sophisticated the systems become, the thing that actually changes a life is a person choosing to be present for another person. You're not a technophobe — you appreciate what machines can do — but you know the difference between capability and care.",
    color: "#e8178a",
    books: [
      { title: "The Diamond Age", author: "Neal Stephenson" },
      { title: "Klara and the Sun", author: "Kazuo Ishiguro" },
      { title: "The Lifecycle of Software Objects", author: "Ted Chiang" }
    ]
  },
  solaris: {
    name: "Solaris Dreamer",
    tagline: "The edge is where the interesting things happen.",
    shareText: "I believe some questions are worth more than their answers.",
    description: "You resist the urge to resolve. Where others see a problem to be solved, you see a question worth sitting with. You're drawn to the edges of understanding, not because you want to conquer them but because the edge itself is where the interesting things happen. You are comfortable with ambiguity in a world that punishes it.",
    color: "#6b8fef",
    books: [
      { title: "Solaris", author: "Stanislaw Lem" },
      { title: "Blindsight", author: "Peter Watts" },
      { title: "Story of Your Life", author: "Ted Chiang" }
    ]
  },
  wild: {
    name: "Wild Monk",
    tagline: "Enough is enough.",
    shareText: "I believe the most radical act is to stop — not from exhaustion, but from clarity.",
    description: "You've arrived at something most people spend their lives running from: the possibility that you don't need a reason to be here. That purpose is a construct, productivity is a habit, and the most radical thing you can do in a world optimized for output is to stop. Not out of exhaustion. Out of clarity.",
    color: "#7ed6a4",
    books: [
      { title: "A Psalm for the Wild-Built", author: "Becky Chambers" },
      { title: "Always Coming Home", author: "Ursula K. Le Guin" },
      { title: "Piranesi", author: "Susanna Clarke" }
    ]
  }
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const archetypeKey = (typeof params.a === 'string' ? params.a : 'culture') as string;
  const data = archetypes[archetypeKey] || archetypes.culture;

  return {
    title: `${data.name} | After Abundance Quiz`,
    description: data.shareText,
    openGraph: {
      title: `I'm a ${data.name}`,
      description: data.shareText,
      images: [`https://livenowclub.vercel.app/api/og?archetype=${archetypeKey}`],
      url: `https://livenowclub.vercel.app/wonder/essay/quiz/result?a=${archetypeKey}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `I'm a ${data.name}`,
      description: data.shareText,
      images: [`https://livenowclub.vercel.app/api/og?archetype=${archetypeKey}`],
    },
  };
}

export default async function QuizResultPage({ searchParams }: Props) {
  const params = await searchParams;
  const archetypeKey = (typeof params.a === 'string' ? params.a : 'culture') as string;
  const data = archetypes[archetypeKey] || archetypes.culture;

  const shareText = `${data.shareText}\n\nI'm a ${data.name}.\nWhat's your post-scarcity worldview?`;
  const shareUrl = `https://livenowclub.vercel.app/wonder/essay/quiz/result?a=${archetypeKey}`;

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
          --accent-color: ${data.color};
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
        .result-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 120px 24px 80px;
          text-align: center;
        }
        .result-label {
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--accent-color);
          margin-bottom: 24px;
        }
        .result-name {
          font-size: 3rem;
          font-weight: 300;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }
        .result-tagline {
          font-size: 1.3rem;
          color: var(--text-dim);
          font-style: italic;
          margin-bottom: 40px;
        }
        .result-description {
          max-width: 600px;
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text);
          margin-bottom: 48px;
        }
        .books-section {
          margin-bottom: 48px;
        }
        .books-label {
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          margin-bottom: 16px;
        }
        .books-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .book-item {
          font-size: 1rem;
          color: var(--text-dim);
        }
        .book-title {
          font-style: italic;
          color: var(--text);
        }
        .actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
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
        }
        .footer-quote {
          font-size: 1rem;
          font-style: italic;
          color: var(--text-dim);
          margin-bottom: 24px;
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
          .result-name { font-size: 2rem; }
          .result-tagline { font-size: 1.1rem; }
          .header { padding: 12px 16px; }
          .nav { gap: 16px; }
          .nav a { font-size: 10px; }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&display=swap" rel="stylesheet" />

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

      <main className="result-container">
        <div className="result-label">Your Archetype</div>
        <h1 className="result-name">{data.name}</h1>
        <p className="result-tagline">"{data.tagline}"</p>
        <p className="result-description">{data.description}</p>

        <div className="books-section">
          <div className="books-label">Books for you</div>
          <div className="books-list">
            {data.books.map((book, i) => (
              <div key={i} className="book-item">
                <span className="book-title">{book.title}</span> by {book.author}
              </div>
            ))}
          </div>
        </div>

        <div className="actions">
          <ShareButton shareText={shareText} shareUrl={shareUrl} />
          <Link href="/wonder/essay/quiz" className="btn btn-secondary">
            Retake Quiz
          </Link>
          <Link href="/wonder/essay" className="btn btn-secondary">
            Read the Essay
          </Link>
        </div>
      </main>

      <footer className="footer">
        <p className="footer-quote">What if now is all we have?</p>
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
