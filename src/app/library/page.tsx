import Link from "next/link";
import { getAllEssays, getPathwayEssays, getLatestEssays, MOODS } from "@/lib/essays";

export const metadata = {
  title: "Library | The Live Now Club",
  description: "Essays and poems on life, love, cancer, and the relentless pursuit of joy.",
};

// Feeling-based filters that map to existing MOODS and pathways
const FEELINGS = [
  { id: "all", label: "All Essays", emoji: "" },
  { id: "scared", label: "I'm scared", emoji: "" },
  { id: "grieving", label: "I'm grieving", emoji: "" },
  { id: "hope", label: "I need hope", emoji: "" },
  { id: "peace", label: "I want peace", emoji: "" },
  { id: "angry", label: "I'm angry", emoji: "" },
];

export default function LibraryPage() {
  const allEssays = getAllEssays();
  const latestEssays = getLatestEssays(6);

  return (
    <>
      {/* Header */}
      <header className="header scrolled">
        <Link href="/" className="logo">
          <img src="/images/logo-handwritten.png" alt="The Live Now Club" className="logo-img" />
        </Link>
        <nav className="nav">
          <Link href="/start-here">Start Here</Link>
          <Link href="/guide">The Guide</Link>
          <Link href="/library" className="active">Library</Link>
          <Link href="/connect">Connect</Link>
        </nav>
      </header>

      <div className="library-page">
        {/* Header */}
        <section className="library-header">
          <h1>The Library</h1>
          <p>{allEssays.length} essays, poems, and meditations</p>
        </section>

        {/* Feeling Filters */}
        <section className="library-filters">
          <p className="library-filters-prompt">How are you feeling?</p>
          <div className="feeling-pills">
            {FEELINGS.map((feeling) => (
              <a key={feeling.id} href={`#${feeling.id}`} className="feeling-pill">
                {feeling.label}
              </a>
            ))}
          </div>
        </section>

        {/* Latest */}
        <section id="all" className="library-section">
          <div className="section-header">
            <h2>Latest</h2>
            <p>The most recent writing</p>
          </div>
          <div className="library-grid">
            {latestEssays.map((essay) => (
              <Link key={essay.slug} href={`/library/${essay.slug}`} className="library-card">
                <div className="library-card-image">
                  <img src={essay.image || "/images/default-essay.jpg"} alt={essay.title} />
                </div>
                <div className="library-card-content">
                  <span className="library-card-type">{essay.type}</span>
                  <h3>{essay.title}</h3>
                  <p className="library-card-excerpt">{essay.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* I'm Scared - Crisis */}
        <section id="scared" className="library-section">
          <div className="section-header">
            <h2>For the Scared</h2>
            <p>When you just got news that changed everything.</p>
          </div>
          <div className="library-grid">
            {MOODS.find(m => m.mood === "scared")?.essays.map((slug) => {
              const essay = allEssays.find(e => e.slug === slug);
              if (!essay) return null;
              return (
                <Link key={essay.slug} href={`/library/${essay.slug}`} className="library-card">
                  <div className="library-card-image">
                    <img src={essay.image || "/images/default-essay.jpg"} alt={essay.title} />
                  </div>
                  <div className="library-card-content">
                    <span className="library-card-type">{essay.type}</span>
                    <h3>{essay.title}</h3>
                    <p className="library-card-excerpt">{essay.excerpt}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* I'm Grieving */}
        <section id="grieving" className="library-section">
          <div className="section-header">
            <h2>For the Grieving</h2>
            <p>When you're carrying loss.</p>
          </div>
          <div className="library-grid">
            {getPathwayEssays("grief-loss").slice(0, 4).map((essay) => (
              <Link key={essay.slug} href={`/library/${essay.slug}`} className="library-card">
                <div className="library-card-image">
                  <img src={essay.image || "/images/default-essay.jpg"} alt={essay.title} />
                </div>
                <div className="library-card-content">
                  <span className="library-card-type">{essay.type}</span>
                  <h3>{essay.title}</h3>
                  <p className="library-card-excerpt">{essay.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* I Need Hope */}
        <section id="hope" className="library-section">
          <div className="section-header">
            <h2>For Hope</h2>
            <p>When you need to believe things can be okay.</p>
          </div>
          <div className="library-grid">
            {getPathwayEssays("finding-joy").slice(0, 4).map((essay) => (
              <Link key={essay.slug} href={`/library/${essay.slug}`} className="library-card">
                <div className="library-card-image">
                  <img src={essay.image || "/images/default-essay.jpg"} alt={essay.title} />
                </div>
                <div className="library-card-content">
                  <span className="library-card-type">{essay.type}</span>
                  <h3>{essay.title}</h3>
                  <p className="library-card-excerpt">{essay.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* I Want Peace */}
        <section id="peace" className="library-section">
          <div className="section-header">
            <h2>For Peace</h2>
            <p>When you need stillness.</p>
          </div>
          <div className="library-grid">
            {getPathwayEssays("poems").map((essay) => (
              <Link key={essay.slug} href={`/library/${essay.slug}`} className="library-card library-card--poem">
                <div className="library-card-content">
                  <span className="library-card-type">poem</span>
                  <h3>{essay.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* I'm Angry */}
        <section id="angry" className="library-section">
          <div className="section-header">
            <h2>For the Angry</h2>
            <p>When you're mad at the world and that's okay.</p>
          </div>
          <div className="library-grid">
            {MOODS.find(m => m.mood === "angry")?.essays.map((slug) => {
              const essay = allEssays.find(e => e.slug === slug);
              if (!essay) return null;
              return (
                <Link key={essay.slug} href={`/library/${essay.slug}`} className="library-card">
                  <div className="library-card-image">
                    <img src={essay.image || "/images/default-essay.jpg"} alt={essay.title} />
                  </div>
                  <div className="library-card-content">
                    <span className="library-card-type">{essay.type}</span>
                    <h3>{essay.title}</h3>
                    <p className="library-card-excerpt">{essay.excerpt}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* All Essays */}
        <section className="library-all">
          <div className="section-header">
            <h2>All Essays</h2>
            <p>Everything in one place.</p>
          </div>
          <div className="library-grid library-grid--compact">
            {allEssays.map((essay) => (
              <Link key={essay.slug} href={`/library/${essay.slug}`} className="library-card library-card--compact">
                <div className="library-card-image">
                  <img src={essay.image || "/images/default-essay.jpg"} alt={essay.title} />
                </div>
                <div className="library-card-content">
                  <span className="library-card-type">{essay.type}</span>
                  <h3>{essay.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <nav className="footer-nav">
          <Link href="/start-here">Start Here</Link>
          <Link href="/guide">The Guide</Link>
          <Link href="/library">Library</Link>
          <Link href="/connect">Connect</Link>
        </nav>
        <p className="footer-copy">&copy; 2026 Louise Ireland</p>
      </footer>
    </>
  );
}
