import Link from "next/link";
import { getAllEssays, getFeaturedEssay, PATHWAYS, MOODS, getPathwayEssays } from "@/lib/essays";

export const metadata = {
  title: "Read | The Live Now Club",
  description: "Essays and poems on life, love, cancer, and the relentless pursuit of joy.",
};

export default function ReadPage() {
  const featured = getFeaturedEssay();
  const recentEssays = getAllEssays().slice(0, 6);
  const poems = getAllEssays().filter((e) => e.type === "poem").slice(0, 4);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

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
          <Link href="/make">Make</Link>
        </nav>
      </header>

      <div className="read-editorial">
        {/* Hero */}
      {featured && (
        <section className="read-hero">
          <div className="read-hero-inner">
            <span className="read-hero-label">Featured</span>
            <h1 className="read-hero-title">{featured.title}</h1>
            {featured.subtitle && <p className="read-hero-subtitle">{featured.subtitle}</p>}
            <p className="read-hero-excerpt">{featured.excerpt}</p>
            <Link href={`/read/${featured.slug}`} className="read-hero-cta">
              Read this essay →
            </Link>
          </div>
          {featured.image && (
            <div className="read-hero-image">
              <img src={featured.image} alt="" />
            </div>
          )}
        </section>
      )}

      {/* What do you need today? */}
      <section className="read-mood">
        <h2 className="read-section-title">What do you need today?</h2>
        <div className="mood-grid">
          {MOODS.map((mood) => (
            <Link
              key={mood.mood}
              href={`/read/${mood.essays[0]}`}
              className="mood-card"
              data-mood={mood.mood}
            >
              <span className="mood-prompt">{mood.prompt}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Start Here */}
      <section className="read-pathway">
        <div className="pathway-header">
          <h2 className="read-section-title">{PATHWAYS[0].title}</h2>
          <p className="read-section-subtitle">{PATHWAYS[0].subtitle}</p>
        </div>
        <div className="pathway-grid pathway-grid--featured">
          {getPathwayEssays("start-here").map((essay) => (
            <Link key={essay.slug} href={`/read/${essay.slug}`} className="essay-card essay-card--large">
              {essay.image && (
                <div className="essay-card-image">
                  <img src={essay.image} alt="" />
                </div>
              )}
              <div className="essay-card-content">
                <span className="essay-card-type">{essay.type}</span>
                <h3 className="essay-card-title">{essay.title}</h3>
                <p className="essay-card-excerpt">{essay.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* The Cancer Journey */}
      <section className="read-pathway read-pathway--dark">
        <div className="pathway-header">
          <h2 className="read-section-title">{PATHWAYS[1].title}</h2>
          <p className="read-section-subtitle">{PATHWAYS[1].subtitle}</p>
        </div>
        <div className="pathway-scroll">
          {getPathwayEssays("cancer-journey").map((essay, i) => (
            <Link key={essay.slug} href={`/read/${essay.slug}`} className="essay-card essay-card--numbered">
              <span className="essay-card-number">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="essay-card-title">{essay.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Poetry */}
      <section className="read-pathway">
        <div className="pathway-header">
          <h2 className="read-section-title">Poetry</h2>
          <p className="read-section-subtitle">Short pieces for quiet moments.</p>
        </div>
        <div className="pathway-grid">
          {poems.map((essay) => (
            <Link key={essay.slug} href={`/read/${essay.slug}`} className="essay-card essay-card--poem">
              <h3 className="essay-card-title">{essay.title}</h3>
              <p className="essay-card-excerpt">{essay.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* On Grief & Loss */}
      <section className="read-pathway">
        <div className="pathway-header">
          <h2 className="read-section-title">{PATHWAYS[2].title}</h2>
          <p className="read-section-subtitle">{PATHWAYS[2].subtitle}</p>
        </div>
        <div className="pathway-grid">
          {getPathwayEssays("grief-loss").map((essay) => (
            <Link key={essay.slug} href={`/read/${essay.slug}`} className="essay-card">
              {essay.image && (
                <div className="essay-card-image">
                  <img src={essay.image} alt="" />
                </div>
              )}
              <div className="essay-card-content">
                <h3 className="essay-card-title">{essay.title}</h3>
                <p className="essay-card-excerpt">{essay.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Finding Joy */}
      <section className="read-pathway">
        <div className="pathway-header">
          <h2 className="read-section-title">{PATHWAYS[3].title}</h2>
          <p className="read-section-subtitle">{PATHWAYS[3].subtitle}</p>
        </div>
        <div className="pathway-grid">
          {getPathwayEssays("finding-joy").map((essay) => (
            <Link key={essay.slug} href={`/read/${essay.slug}`} className="essay-card">
              {essay.image && (
                <div className="essay-card-image">
                  <img src={essay.image} alt="" />
                </div>
              )}
              <div className="essay-card-content">
                <h3 className="essay-card-title">{essay.title}</h3>
                <p className="essay-card-excerpt">{essay.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Falling in Love with Yourself */}
      <section className="read-pathway read-pathway--warm">
        <div className="pathway-header">
          <h2 className="read-section-title">{PATHWAYS[4].title}</h2>
          <p className="read-section-subtitle">{PATHWAYS[4].subtitle}</p>
        </div>
        <div className="pathway-grid">
          {getPathwayEssays("self-love").map((essay) => (
            <Link key={essay.slug} href={`/read/${essay.slug}`} className="essay-card">
              {essay.image && (
                <div className="essay-card-image">
                  <img src={essay.image} alt="" />
                </div>
              )}
              <div className="essay-card-content">
                <h3 className="essay-card-title">{essay.title}</h3>
                <p className="essay-card-excerpt">{essay.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent */}
      <section className="read-pathway">
        <div className="pathway-header">
          <h2 className="read-section-title">Recent Writing</h2>
          <p className="read-section-subtitle">The latest from The Live Now Club.</p>
        </div>
        <div className="pathway-grid pathway-grid--compact">
          {recentEssays.map((essay) => (
            <Link key={essay.slug} href={`/read/${essay.slug}`} className="essay-card essay-card--compact">
              <span className="essay-card-date">{formatDate(essay.date)}</span>
              <h3 className="essay-card-title">{essay.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Browse All */}
      <section className="read-browse">
        <Link href="/read/all" className="browse-link">
          Browse all {getAllEssays().length} pieces →
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
