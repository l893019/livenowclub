import Link from "next/link";
import { getAllEssays, PATHWAYS, getPathwayEssays, getLatestEssays, getManifestoEssay } from "@/lib/essays";

export const metadata = {
  title: "Read | The Live Now Club",
  description: "Essays and poems on life, love, cancer, and the relentless pursuit of joy.",
};

export default function ReadPage() {
  const allEssays = getAllEssays();
  const latestEssays = getLatestEssays(4);
  const manifesto = getManifestoEssay();

  return (
    <>
      {/* Header */}
      <header className="header">
        <Link href="/" className="logo">
          <img src="/images/logo-handwritten.png" alt="The Live Now Club" className="logo-img" />
        </Link>
        <nav className="nav">
          <Link href="/read" className="active">Read</Link>
          <Link href="/navigate">Navigate</Link>
          <Link href="/wonder">Wonder</Link>
          <Link href="/connect">Connect</Link>
        </nav>
      </header>

      <div className="read-immersive">
        {/* Manifesto Hero */}
        {manifesto && (
          <section className="read-manifesto">
            <Link href={`/read/${manifesto.slug}`} className="manifesto-card">
              <div className="manifesto-image">
                <img src={manifesto.image || "/images/the-live-now-club.gif"} alt={manifesto.title} />
              </div>
              <div className="manifesto-content">
                <span className="manifesto-label">The Manifesto</span>
                <h1>{manifesto.title}</h1>
                <p className="manifesto-subtitle">{manifesto.subtitle || "Because now is all we have"}</p>
                <p className="manifesto-excerpt">{manifesto.excerpt}</p>
                <span className="text-link">Read the founding essay →</span>
              </div>
            </Link>
          </section>
        )}

        {/* Latest */}
        <section className="read-section">
          <div className="section-header">
            <h2>Latest</h2>
            <p>The most recent writing</p>
          </div>
          <div className="read-grid read-grid--4">
            {latestEssays.map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="immersive-card">
                <img src={essay.image || "/images/default-essay.jpg"} alt={essay.title} />
                <div className="immersive-card-content">
                  <span className="immersive-card-type">{essay.type}</span>
                  <h3 className="immersive-card-title">{essay.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* What do you need today? */}
        <section className="read-mood-section">
          <h2 className="read-mood-title">What do you need today?</h2>
          <div className="mood-cards">
            <Link href="/navigate" className="mood-pill">I just got a diagnosis</Link>
            <a href="#grief-loss" className="mood-pill">I'm grieving</a>
            <a href="#finding-joy" className="mood-pill">I need hope</a>
            <a href="#wisdom" className="mood-pill">I want to think deeply</a>
            <a href="#poems" className="mood-pill">Something brief & beautiful</a>
          </div>
        </section>

        {/* Start Here */}
        <section id="start-here" className="read-section">
          <div className="section-header">
            <h2>Start Here</h2>
            <p>New to The Live Now Club? Begin with these.</p>
          </div>
          <div className="read-grid">
            {getPathwayEssays("start-here").map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="immersive-card">
                <img src={essay.image || "/images/default-essay.jpg"} alt={essay.title} />
                <div className="immersive-card-content">
                  <span className="immersive-card-type">{essay.type}</span>
                  <h3 className="immersive-card-title">{essay.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Cancer Journey */}
        <section id="cancer-journey" className="read-section">
          <div className="section-header">
            <h2>The Cancer Journey</h2>
            <p>A series of meditations written during treatment.</p>
          </div>
          <div className="read-grid read-grid--4">
            {getPathwayEssays("cancer-journey").slice(0, 4).map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="immersive-card">
                <img src={essay.image || "/images/default-essay.jpg"} alt={essay.title} />
                <div className="immersive-card-content">
                  <span className="immersive-card-type">{essay.type}</span>
                  <h3 className="immersive-card-title">{essay.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="section-more">
            <Link href="/navigate" className="text-link">See the full cancer guide →</Link>
          </div>
        </section>

        {/* On Grief & Loss */}
        <section id="grief-loss" className="read-section">
          <div className="section-header">
            <h2>On Grief & Loss</h2>
            <p>For when you're carrying something heavy.</p>
          </div>
          <div className="read-grid">
            {getPathwayEssays("grief-loss").map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="immersive-card">
                <img src={essay.image || "/images/default-essay.jpg"} alt={essay.title} />
                <div className="immersive-card-content">
                  <span className="immersive-card-type">{essay.type}</span>
                  <h3 className="immersive-card-title">{essay.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Finding Joy */}
        <section id="finding-joy" className="read-section">
          <div className="section-header">
            <h2>Finding Joy Anyway</h2>
            <p>Because life is also beautiful.</p>
          </div>
          <div className="read-grid">
            {getPathwayEssays("finding-joy").map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="immersive-card">
                <img src={essay.image || "/images/default-essay.jpg"} alt={essay.title} />
                <div className="immersive-card-content">
                  <span className="immersive-card-type">{essay.type}</span>
                  <h3 className="immersive-card-title">{essay.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Wisdom & Philosophy */}
        <section id="wisdom" className="read-section">
          <div className="section-header">
            <h2>Wisdom & Philosophy</h2>
            <p>The deeper questions about meaning, identity, and being.</p>
          </div>
          <div className="read-grid">
            {getPathwayEssays("wisdom").slice(0, 4).map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="immersive-card">
                <img src={essay.image || "/images/default-essay.jpg"} alt={essay.title} />
                <div className="immersive-card-content">
                  <span className="immersive-card-type">{essay.type}</span>
                  <h3 className="immersive-card-title">{essay.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Poems */}
        <section id="poems" className="read-section">
          <div className="section-header">
            <h2>Poems</h2>
            <p>Brief meditations. Beauty in a breath.</p>
          </div>
          <div className="read-grid read-grid--3">
            {getPathwayEssays("poems").slice(0, 6).map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="immersive-card immersive-card--poem">
                <div className="immersive-card-content">
                  <span className="immersive-card-type">poem</span>
                  <h3 className="immersive-card-title">{essay.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Falling in Love with Yourself */}
        <section id="self-love" className="read-section">
          <div className="section-header">
            <h2>Falling in Love with Yourself</h2>
            <p>The most important relationship you'll ever have.</p>
          </div>
          <div className="read-grid">
            {getPathwayEssays("self-love").map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="immersive-card">
                <img src={essay.image || "/images/default-essay.jpg"} alt={essay.title} />
                <div className="immersive-card-content">
                  <span className="immersive-card-type">{essay.type}</span>
                  <h3 className="immersive-card-title">{essay.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Browse All */}
        <section className="read-browse">
          <Link href="/read/all" className="browse-link">
            Browse all {allEssays.length} pieces →
          </Link>
        </section>
      </div>

      {/* Floating Subscribe Button */}
      <div className="subscribe-float">
        <a href="https://louiseireland.substack.com/subscribe" target="_blank" rel="noopener noreferrer">
          Subscribe
        </a>
      </div>
    </>
  );
}
