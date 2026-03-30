import type { Metadata } from "next";
import Link from "next/link";
import ShareButton from "./ShareButton";

// Sharp combination lines that reveal something they didn't explicitly say
const synthesisLines: Record<string, string> = {
  // Culture primary
  culture_earthseed: "You'll automate the revolution and optimize the resistance.",
  culture_anarres: "You trust the machines more than you trust the committees — but you want both to succeed.",
  culture_diamond: "You'll be the last to trust the AI caretaker — and the first to ask if it's lonely.",
  culture_solaris: "You'd live forever just to see what questions we haven't thought to ask yet.",
  culture_wild: "You want abundance so badly you might forget to enjoy it.",
  // Earthseed primary
  earthseed_culture: "You'll build the future they automate — and wonder if it was worth the sweat.",
  earthseed_anarres: "You'll tear down the system by building something better beside it.",
  earthseed_diamond: "You shape the world for people who didn't ask to be shaped — and that keeps you up at night.",
  earthseed_solaris: "You're drawn to edges you know you shouldn't try to cross.",
  earthseed_wild: "You build so hard you sometimes forget you're allowed to stop.",
  // Anarres primary
  anarres_culture: "You design systems that could run without you — and worry they will.",
  anarres_earthseed: "You want to change everything except the collective's power to resist change.",
  anarres_diamond: "You'll build the commune and then stay up wondering if anyone actually feels at home.",
  anarres_solaris: "You organize the resistance while secretly hoping someone will explain what we're resisting toward.",
  anarres_wild: "You've built the alternative — now you're not sure you want to live there.",
  // Diamond primary
  diamond_culture: "You trust people over systems — until the system is full of people you trust.",
  diamond_earthseed: "You know presence matters most, but you're not sure you can stay present through the change.",
  diamond_anarres: "You put people first, then wonder if the structure would do it better.",
  diamond_solaris: "You reach out to connect — and find the other side reaching back with questions, not answers.",
  diamond_wild: "You believe in presence so deeply you've forgotten to be present to yourself.",
  // Solaris primary
  solaris_culture: "You question everything except your right to keep questioning.",
  solaris_earthseed: "You sit with uncertainty while secretly building toward certainty.",
  solaris_anarres: "You embrace the mystery but wish someone else would organize the search party.",
  solaris_diamond: "You'd rather sit in silence with someone than solve them.",
  solaris_wild: "You've stopped asking why — and you're not sure that's an answer.",
  // Wild primary
  wild_culture: "You've found peace — now you're restless about how much work went into finding it.",
  wild_earthseed: "You stopped building to rest — and woke up building again.",
  wild_anarres: "You stepped off the wheel — and it keeps turning toward you.",
  wild_diamond: "You're so present you've forgotten that others are still arriving.",
  wild_solaris: "You found the answer in stopping — and now you're suspicious of it."
};

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
  const shadowKey = (typeof params.s === 'string' ? params.s : null) as string | null;
  const data = archetypes[archetypeKey] || archetypes.culture;
  const shadowData = shadowKey ? archetypes[shadowKey] : null;

  // Get synthesis line or fallback to shareText
  const synthesisKey = shadowKey ? `${archetypeKey}_${shadowKey}` : null;
  const synthesis = synthesisKey && synthesisLines[synthesisKey] ? synthesisLines[synthesisKey] : data.shareText;

  const title = shadowData
    ? `I'm a ${data.name} with shades of ${shadowData.name}`
    : `I'm a ${data.name}`;

  const ogUrl = shadowKey
    ? `https://livenowclub.vercel.app/api/og?archetype=${archetypeKey}&shadow=${shadowKey}`
    : `https://livenowclub.vercel.app/api/og?archetype=${archetypeKey}`;

  const pageUrl = shadowKey
    ? `https://livenowclub.vercel.app/wonder/essay/quiz/result?a=${archetypeKey}&s=${shadowKey}`
    : `https://livenowclub.vercel.app/wonder/essay/quiz/result?a=${archetypeKey}`;

  return {
    title: `${data.name} | After Abundance Quiz`,
    description: synthesis,
    openGraph: {
      title,
      description: synthesis,
      images: [ogUrl],
      url: pageUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: synthesis,
      images: [ogUrl],
    },
  };
}

export default async function QuizResultPage({ searchParams }: Props) {
  const params = await searchParams;
  const archetypeKey = (typeof params.a === 'string' ? params.a : 'culture') as string;
  const shadowKey = (typeof params.s === 'string' ? params.s : null) as string | null;
  const data = archetypes[archetypeKey] || archetypes.culture;
  const shadowData = shadowKey && archetypes[shadowKey] ? archetypes[shadowKey] : null;

  // Get synthesis line
  const synthesisKey = shadowKey ? `${archetypeKey}_${shadowKey}` : null;
  const synthesis = synthesisKey && synthesisLines[synthesisKey] ? synthesisLines[synthesisKey] : data.shareText;

  const shareText = shadowData
    ? `"${synthesis}"\n\nI'm a ${data.name} with shades of ${shadowData.name}.\n\nWhat's your post-scarcity worldview?`
    : `${data.shareText}\n\nI'm a ${data.name}.\nWhat's your post-scarcity worldview?`;
  const shareUrl = shadowKey
    ? `https://livenowclub.vercel.app/wonder/essay/quiz/result?a=${archetypeKey}&s=${shadowKey}`
    : `https://livenowclub.vercel.app/wonder/essay/quiz/result?a=${archetypeKey}`;

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
        .result-shadow {
          font-size: 1.1rem;
          font-weight: 300;
          color: var(--text-muted);
          margin-bottom: 24px;
        }
        .result-synthesis {
          font-size: 1.25rem;
          font-weight: 400;
          font-style: italic;
          color: var(--accent-pink);
          max-width: 480px;
          margin: 0 auto 24px;
          line-height: 1.6;
          padding: 24px 0;
          border-top: 1px solid rgba(232,23,138,0.15);
          border-bottom: 1px solid rgba(232,23,138,0.15);
        }
        .result-tagline {
          font-size: 1.2rem;
          color: var(--text-dim);
          font-style: italic;
          margin-bottom: 32px;
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
        {shadowData && (
          <p className="result-shadow">with shades of <span style={{ color: shadowData.color, fontStyle: 'italic' }}>{shadowData.name}</span></p>
        )}
        <p className="result-synthesis">"{synthesis}"</p>
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
