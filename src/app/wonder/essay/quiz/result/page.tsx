import type { Metadata } from "next";
import Link from "next/link";
import ShareButton from "./ShareButton";

const archetypes: Record<string, {
  name: string;
  description: string;
  utopia: string;
  blindSpot: string;
  color: string;
  books: { title: string; author: string }[];
  compatibility: { ally: string; tension: string; need: string };
}> = {
  citizen: {
    name: "Citizen of Abundance",
    description: "Let the machines handle the drudgery. You have better things to do with being alive. You know how power works and you know that utopia still needs someone watching the edges. You also trust that intelligence, properly distributed, tends toward good. Too much freedom will always be preferable to too little. Comfort doesn't frighten you. Boredom does.",
    utopia: "Your utopia has no word for \"job.\" They used to, but it fell out of the language three centuries ago.",
    blindSpot: "You sometimes mistake access for equity. Everyone having options is not the same as everyone being free.",
    color: "#3db9a4",
    books: [
      { title: "The Player of Games", author: "Banks" },
      { title: "Accelerando", author: "Stross" },
      { title: "Down and Out in the Magic Kingdom", author: "Doctorow" }
    ],
    compatibility: {
      ally: "the one who wants to feel everything",
      tension: "the one who's watching for what's being hidden",
      need: "the one who craves difficulty"
    }
  },
  shaper: {
    name: "Shaper of Change",
    description: "You don't trust stillness. The moment you stop adapting, you start calcifying, and you've seen it happen to every institution, every relationship, every version of yourself you've held onto too long. The transition ahead is raw material. The future is something you build with whatever is at hand, including the wreckage. You've probably already started.",
    utopia: "Your utopia is never finished. Everything is always changing.",
    blindSpot: "You sometimes mistake movement for progress. Tearing something down and building something new can be its own form of running away.",
    color: "#f4a03f",
    books: [
      { title: "Parable of the Sower", author: "Butler" },
      { title: "Red Mars", author: "Robinson" },
      { title: "The Diamond Age", author: "Stephenson" }
    ],
    compatibility: {
      ally: "the one who craves difficulty",
      tension: "the one who chose stillness",
      need: "the one who guards what came before"
    }
  },
  architect: {
    name: "Architect of the Commons",
    description: "You focus on the structures. Because the best people in the world will still reproduce the old hierarchies if the structures allow it. You'd rather build something imperfect and collectively owned than something elegant and controlled by a few. Mutual aid is a practice, and it requires showing up. You show up.",
    utopia: "Your utopia belongs to everyone and answers to no one. It doesn't work perfectly but it belongs to the people inside it.",
    blindSpot: "You sometimes love the system more than the people inside it. The meeting can become more important than what the meeting was for.",
    color: "#9b8fef",
    books: [
      { title: "The Dispossessed", author: "Le Guin" },
      { title: "Pacific Edge", author: "Robinson" },
      { title: "Four Ways to Forgiveness", author: "Le Guin" }
    ],
    compatibility: {
      ally: "the one who fixes what's broken",
      tension: "the one who left the body behind",
      need: "the one who lives in questions"
    }
  },
  presence: {
    name: "Keeper of Presence",
    description: "You keep coming back to the same realization: that the thing that actually changes a life is a person choosing to be present for another person. You appreciate what machines can do. You also know the difference between capability and care, and you've never confused the two. Someone's life is different because you showed up. You may not even know whose.",
    utopia: "Your utopia decided that the most valuable thing in the universe was undivided attention, and built its entire economy around it.",
    blindSpot: "You sometimes use care as a way to avoid confrontation. Staying in the room is not always the brave choice. Sometimes the brave choice is leaving it.",
    color: "#e8178a",
    books: [
      { title: "The Diamond Age", author: "Stephenson" },
      { title: "Klara and the Sun", author: "Ishiguro" },
      { title: "The Lifecycle of Software Objects", author: "Chiang" }
    ],
    compatibility: {
      ally: "the one who chose stillness",
      tension: "the one who left the body behind",
      need: "the one who tells the truth"
    }
  },
  swimmer: {
    name: "Swimmer in Deep Water",
    description: "You resist the urge to resolve. Most people see a problem and want to solve it. You see a question and want to live inside it. The edges of understanding are where the interesting things happen, and you've always been drawn there. You are comfortable with ambiguity in a world that punishes it, and you suspect that this comfort is its own form of wisdom.",
    utopia: "Your utopia is a civilization of philosophers. Their single ambition is to reach the deepest level of questioning ever achieved.",
    blindSpot: "You can sit with a question so long that it becomes an excuse to never act. At some point, not-knowing becomes its own form of cowardice.",
    color: "#6b8fef",
    books: [
      { title: "Solaris", author: "Lem" },
      { title: "Blindsight", author: "Watts" },
      { title: "Story of Your Life", author: "Chiang" }
    ],
    compatibility: {
      ally: "the one who left the body behind",
      tension: "the one who fixes what's broken",
      need: "the one who builds collective structures"
    }
  },
  rooted: {
    name: "Rooted in Stillness",
    description: "You've arrived at something most people spend their lives running from: the possibility that you don't need a reason to be here. Purpose is a construct. Productivity is a habit. The most radical thing you can do in a world optimized for output is to stop, and mean it. You pour the tea. You notice what's in front of you. You find that it's enough.",
    utopia: "Your utopia returned to a simpler way of life, on purpose, with full knowledge of what it was giving up.",
    blindSpot: "Your stillness can look a lot like withdrawal to the people who need you. Choosing to stop is a luxury not everyone can afford.",
    color: "#7ed6a4",
    books: [
      { title: "A Psalm for the Wild-Built", author: "Chambers" },
      { title: "Always Coming Home", author: "Le Guin" },
      { title: "Piranesi", author: "Clarke" }
    ],
    compatibility: {
      ally: "the one who values presence above all",
      tension: "the one who can't stop building",
      need: "the one who wants to feel everything"
    }
  },
  conscience: {
    name: "Conscience Before Comfort",
    description: "You see what others prefer to ignore. The comfortable prison. The soft erosion. The hierarchy that rebrands itself as community. You believe in what humans can be. You also refuse to look away from what they become when no one is paying attention. Someone has to watch the watchers. You've always known it would be you.",
    utopia: "Your utopia built accountability into the architecture. Every leader's decisions are projected onto the sky the day they leave office.",
    blindSpot: "You can become so focused on what's wrong that you forget to notice what's working. Permanent suspicion is its own kind of prison.",
    color: "#d64545",
    books: [
      { title: "1984", author: "Orwell" },
      { title: "Brave New World", author: "Huxley" },
      { title: "The Handmaid's Tale", author: "Atwood" }
    ],
    compatibility: {
      ally: "the one who tells the truth",
      tension: "the one who's made peace with abundance",
      need: "the one who values presence above all"
    }
  },
  embers: {
    name: "Keeper of Embers",
    description: "Everyone else is racing forward. You keep looking back, because you have this stubborn conviction that we've already figured most of this out and keep forgetting. Oral traditions, old religions, indigenous knowledge, the grandmother's hand on the child's head. The most dangerous thing about acceleration is amnesia. The answers aren't in the next technology. They're in the last ten thousand years.",
    utopia: "Your utopia's most protected resource is not water or energy. It's memory.",
    blindSpot: "You can love what was so deeply that you become hostile to what could be. The archive becomes a fortress. The past becomes an identity.",
    color: "#c97d3a",
    books: [
      { title: "A Canticle for Leibowitz", author: "Miller" },
      { title: "Always Coming Home", author: "Le Guin" },
      { title: "Parable of the Talents", author: "Butler" }
    ],
    compatibility: {
      ally: "the one who builds collective structures",
      tension: "the one who can't stop building",
      need: "the one still figuring it out"
    }
  },
  friction: {
    name: "Alive in the Friction",
    description: "Ease is more dangerous than difficulty. Something in us requires resistance. The act of pushing against something is how we know we're alive, and you've always known this in your bones. Take away every problem and you don't get paradise. You get a species that has forgotten how to want. You'd rather build the boat in a storm than float in still water.",
    utopia: "Your utopia kept one part of the world deliberately dangerous, because the people who built it believed that too much safety would kill something essential in the species.",
    blindSpot: "You can mistake difficulty for meaning. Not everything that's hard is worth doing. Sometimes the easy path is the right one and you can't accept that.",
    color: "#ff6b35",
    books: [
      { title: "The Stars My Destination", author: "Bester" },
      { title: "The Moon Is a Harsh Mistress", author: "Heinlein" },
      { title: "The Evolutionary Void", author: "Hamilton" }
    ],
    compatibility: {
      ally: "the one who can't stop building",
      tension: "the one who chose stillness",
      need: "the one who values presence above all"
    }
  },
  unbound: {
    name: "Unbound from Form",
    description: "You look at the species and see a draft. A first attempt. You're curious about what comes next. Uploading, merging, subliming, evolving. The vocabulary doesn't matter. The boundary of the self is simply not where you stop. Most people find this frightening. You find it the most interesting question there is.",
    utopia: "Your utopia transcended the physical. You exist as pure consciousness now, moving through dimensions that don't have names.",
    blindSpot: "You left so much behind that you may not recognize what was worth keeping until it's too late. Evolution without memory is just forgetting with better marketing.",
    color: "#a855f7",
    books: [
      { title: "Childhood's End", author: "Clarke" },
      { title: "Diaspora", author: "Egan" },
      { title: "The Hydrogen Sonata", author: "Banks" }
    ],
    compatibility: {
      ally: "the one who lives in questions",
      tension: "the one who values presence above all",
      need: "the one who guards what came before"
    }
  },
  alive: {
    name: "Alive to Everything",
    description: "You don't need a reason. You need a body, a world, and enough time. Change your form, change your perspective, taste every experience, climb every mountain, love every person who'll have you, and when you've done all of it, start again. The universe gave you everything. The least you can do is feel it. You suspect that most philosophies of meaning are elaborate ways of avoiding pleasure.",
    utopia: "Your utopia engineered twelve new senses and a sunset that lasts all day.",
    blindSpot: "Sensation can become consumption. Feeling everything is not the same as understanding anything. The twelfth sense doesn't help if the first five are numb from overuse.",
    color: "#f472b6",
    books: [
      { title: "Surface Detail", author: "Banks" },
      { title: "Trouble on Triton", author: "Delany" },
      { title: "Schismatrix Plus", author: "Sterling" }
    ],
    compatibility: {
      ally: "the one who's made peace with abundance",
      tension: "the one who's watching for what's being hidden",
      need: "the one who tells the truth"
    }
  },
  mender: {
    name: "Mender of What Remains",
    description: "You look at the stars and feel nothing pulling you toward them. The work is here. The soil, the water, the damaged systems, the fraying relationships. While everyone else is building arks and uploading their consciousness, you're fixing the thing in front of you. The most radical act in an age of acceleration is to stay, to repair, to solve the specific problem that no one else cares about. The future is the next thing that needs doing.",
    utopia: "Your utopia decided that the most advanced act of engineering was making what already existed work again instead of building something new.",
    blindSpot: "You can become so focused on repair that you miss when something needs to die. Not everything should be saved. Some things are broken because they should be.",
    color: "#10b981",
    books: [
      { title: "The Ministry for the Future", author: "Robinson" },
      { title: "New York 2140", author: "Robinson" },
      { title: "Station Eleven", author: "Mandel" }
    ],
    compatibility: {
      ally: "the one who builds collective structures",
      tension: "the one who lives in questions",
      need: "the one who craves difficulty"
    }
  },
  cleareyed: {
    name: "Clear-Eyed in the Storm",
    description: "You have one job: to see what is actually happening and say it out loud. The version that's true. The one that makes people uncomfortable. Most people don't want this from you. Civilizations survive by the quality of their honest observers, though, and collapse when the honest observers go quiet. You won't be the one who goes quiet.",
    utopia: "Your utopia has one person whose only job is to tell the truth. They answer to no one. They are the most feared and most respected person in the civilization.",
    blindSpot: "Honesty without tenderness is cruelty. You can see everything clearly and still miss the most important thing in the room, which is how your truth lands on the person hearing it.",
    color: "#64748b",
    books: [
      { title: "Slaughterhouse-Five", author: "Vonnegut" },
      { title: "His Master's Voice", author: "Lem" },
      { title: "The Road", author: "McCarthy" }
    ],
    compatibility: {
      ally: "the one who's watching for what's being hidden",
      tension: "the one who wants to feel everything",
      need: "the one who chose stillness"
    }
  },
  between: {
    name: "In the Space Between",
    description: "This isn't a philosophy you chose. It's a condition you're living in. The old world shifted and left you standing in a place you don't recognize. You're figuring out how to breathe in a room with no familiar walls. Everyone else on this list has a position. You have a question. And you're still here, which might be the bravest thing on this list.",
    utopia: "Your utopia just started to exist. Nothing is built yet. It's the beginning of an idea.",
    blindSpot: "The space between can become a permanent address. At some point, not knowing what you are becomes a way of avoiding the risk of choosing.",
    color: "#8b8b8b",
    books: [
      { title: "Never Let Me Go", author: "Ishiguro" },
      { title: "Station Eleven", author: "Mandel" },
      { title: "The Left Hand of Darkness", author: "Le Guin" }
    ],
    compatibility: {
      ally: "the one who guards what came before",
      tension: "the one who craves difficulty",
      need: "the one who can't stop building"
    }
  }
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const archetypeKey = (typeof params.a === 'string' ? params.a : 'citizen') as string;
  const shadowKey = (typeof params.s === 'string' ? params.s : null) as string | null;
  const data = archetypes[archetypeKey] || archetypes.citizen;

  const title = "What's your post-scarcity worldview?";
  const ogImage = `https://livenowclub.vercel.app/wonder/essay/quiz/images/utopia-${archetypeKey}.png`;

  const pageUrl = shadowKey
    ? `https://livenowclub.vercel.app/wonder/essay/quiz/result?a=${archetypeKey}&s=${shadowKey}`
    : `https://livenowclub.vercel.app/wonder/essay/quiz/result?a=${archetypeKey}`;

  return {
    title: `${data.name} | Sci-Fi Worldview Quiz`,
    description: data.utopia,
    openGraph: {
      title,
      description: data.utopia,
      images: [ogImage],
      url: pageUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: data.utopia,
      images: [ogImage],
    },
  };
}

export default async function QuizResultPage({ searchParams }: Props) {
  const params = await searchParams;
  const archetypeKey = (typeof params.a === 'string' ? params.a : 'citizen') as string;
  const shadowKey = (typeof params.s === 'string' ? params.s : null) as string | null;
  const data = archetypes[archetypeKey] || archetypes.citizen;
  const shadowData = shadowKey && archetypes[shadowKey] ? archetypes[shadowKey] : null;

  const shareText = shadowData
    ? `"${data.utopia}"\n\nI'm a ${data.name} with shades of ${shadowData.name}.\n\nWhat's your post-scarcity worldview?`
    : `"${data.utopia}"\n\nI'm a ${data.name}.\nWhat's your post-scarcity worldview?`;
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
        .result-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
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
          font-size: 2.5rem;
          font-weight: 300;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }
        .result-shadow {
          font-size: 1.1rem;
          font-weight: 300;
          color: var(--text-muted);
          margin-bottom: 32px;
        }
        .utopia-card {
          background: white;
          border-radius: 16px;
          padding: 0;
          max-width: 520px;
          margin-bottom: 40px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          overflow: hidden;
        }
        .utopia-image {
          width: 100%;
          height: auto;
          display: block;
        }
        .utopia-card .utopia-label,
        .utopia-card .utopia-text {
          padding: 0 32px;
        }
        .utopia-card .utopia-label {
          padding-top: 24px;
        }
        .utopia-card .utopia-text {
          padding-bottom: 32px;
        }
        .utopia-label {
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        .utopia-text {
          font-size: 1.2rem;
          font-style: italic;
          line-height: 1.7;
          color: var(--text);
        }
        .result-description {
          max-width: 600px;
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--text);
          margin-bottom: 40px;
        }
        .blind-spot {
          max-width: 500px;
          padding: 24px;
          background: rgba(0,0,0,0.03);
          border-radius: 12px;
          margin-bottom: 40px;
        }
        .blind-spot-label {
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .blind-spot-text {
          font-size: 0.95rem;
          color: var(--text-dim);
          line-height: 1.7;
        }
        .compatibility {
          max-width: 500px;
          margin-bottom: 40px;
          text-align: left;
        }
        .compatibility-label {
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          margin-bottom: 16px;
          text-align: center;
        }
        .compatibility-item {
          padding: 12px 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .compatibility-item:last-child { border-bottom: none; }
        .compatibility-type {
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent-color);
          margin-bottom: 4px;
        }
        .compatibility-text {
          font-size: 0.95rem;
          color: var(--text);
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
          .result-name { font-size: 1.8rem; }
          .header { padding: 12px 16px; }
          .nav { gap: 16px; }
          .nav a { font-size: 10px; }
          .utopia-card { padding: 24px; }
          .utopia-text { font-size: 1.1rem; }
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

      <main className="result-container">
        <div className="result-label">Your Archetype</div>
        <h1 className="result-name">{data.name}</h1>
        {shadowData && (
          <p className="result-shadow">with shades of <span style={{ color: shadowData.color, fontStyle: 'italic' }}>{shadowData.name}</span></p>
        )}

        <div className="utopia-card">
          <img
            src={`/wonder/essay/quiz/images/utopia-${archetypeKey}.png`}
            alt={`${data.name} utopia illustration`}
            className="utopia-image"
          />
          <div className="utopia-label">Your Utopia</div>
          <p className="utopia-text">{data.utopia}</p>
        </div>

        <p className="result-description">{data.description}</p>

        <div className="blind-spot">
          <div className="blind-spot-label">Your Blind Spot</div>
          <p className="blind-spot-text">{data.blindSpot}</p>
        </div>

        <div className="compatibility">
          <div className="compatibility-label">Your Connections</div>
          <div className="compatibility-item">
            <div className="compatibility-type">Your natural ally</div>
            <div className="compatibility-text">{data.compatibility.ally}</div>
          </div>
          <div className="compatibility-item">
            <div className="compatibility-type">Your tension</div>
            <div className="compatibility-text">{data.compatibility.tension}</div>
          </div>
          <div className="compatibility-item">
            <div className="compatibility-type">Your secret need</div>
            <div className="compatibility-text">{data.compatibility.need}</div>
          </div>
        </div>

        <div className="books-section">
          <div className="books-label">Read Next</div>
          <div className="books-list">
            {data.books.map((book, i) => (
              <div key={i} className="book-item">
                <span className="book-title">{book.title}</span> ({book.author})
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
