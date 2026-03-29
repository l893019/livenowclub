import Link from "next/link";
import { getAllEssays, getLatestEssays, getQuoteWallEssays, getTimelineEssays, getPathwayEssays } from "@/lib/essays";

export const metadata = {
  title: "Read | The Live Now Club",
  description: "Essays and poems on life, love, cancer, and the relentless pursuit of joy.",
};

export default function ReadPage() {
  const allEssays = getAllEssays();
  const latestEssays = getLatestEssays(6);
  const quoteEssays = getQuoteWallEssays(6);
  const timelineEssays = getTimelineEssays();
  const poems = getPathwayEssays("poems").slice(0, 4);

  // For magazine layout: pick varied essays avoiding duplicates
  const featured = allEssays.find((e) => e.slug === "fixing-the-unfixable");
  const secondaryEssays = allEssays
    .filter((e) => !["fixing-the-unfixable", "the-live-now-club"].includes(e.slug))
    .slice(0, 4);

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

      <div className="read-magazine">
        {/* Magazine Hero Section - Mixed Sizes */}
        <section className="magazine-hero">
          <h1 className="magazine-title">The Writing</h1>
          <p className="magazine-subtitle">{allEssays.length} pieces on life, love, cancer, and the relentless pursuit of joy</p>
        </section>

        {/* Magazine Grid - Featured + Sidebar */}
        <section className="magazine-grid">
          {/* Large Featured Card */}
          {featured && (
            <Link href={`/read/${featured.slug}`} className="magazine-featured">
              <div className="magazine-featured-image">
                <img src={featured.image || "/images/default-essay.jpg"} alt={featured.title} />
              </div>
              <div className="magazine-featured-content">
                <span className="magazine-type">{featured.type}</span>
                <h2>{featured.title}</h2>
                {featured.pullQuote && <p className="magazine-quote">"{featured.pullQuote}"</p>}
                <span className="text-link">Read →</span>
              </div>
            </Link>
          )}

          {/* Medium Sidebar Cards */}
          <div className="magazine-sidebar">
            {secondaryEssays.slice(0, 2).map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="magazine-medium">
                <div className="magazine-medium-image">
                  <img src={essay.image || "/images/default-essay.jpg"} alt={essay.title} />
                </div>
                <div className="magazine-medium-content">
                  <span className="magazine-type">{essay.type}</span>
                  <h3>{essay.title}</h3>
                  {essay.pullQuote && <p className="magazine-quote-small">"{essay.pullQuote}"</p>}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quote Wall */}
        <section className="quote-wall">
          <h2 className="section-label">Words That Stay</h2>
          <div className="quote-grid">
            {quoteEssays.map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="quote-card">
                <blockquote>"{essay.pullQuote}"</blockquote>
                <cite>— {essay.title}</cite>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Writing */}
        <section className="magazine-section">
          <h2 className="section-label">Latest</h2>
          <div className="magazine-row">
            {latestEssays.map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="magazine-card">
                {essay.image && (
                  <div className="magazine-card-image">
                    <img src={essay.image} alt={essay.title} />
                  </div>
                )}
                <div className="magazine-card-content">
                  <span className="magazine-type">{essay.type}</span>
                  <h3>{essay.title}</h3>
                  <p className="magazine-excerpt">{essay.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Timeline: The Cancer Journey */}
        <section className="timeline-section">
          <h2 className="section-label">The Journey</h2>
          <p className="timeline-intro">A story told through essays, from before the diagnosis to after.</p>
          <div className="timeline">
            {timelineEssays.map((essay, index) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="timeline-item">
                <div className="timeline-marker">
                  <span className="timeline-number">{index + 1}</span>
                </div>
                <div className="timeline-content">
                  <span className="timeline-date">{essay.date}</span>
                  <h3>{essay.title}</h3>
                  <p>{essay.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Poems - Special Treatment */}
        <section className="poems-section">
          <h2 className="section-label">Brief & Beautiful</h2>
          <div className="poems-grid">
            {poems.map((poem) => (
              <Link key={poem.slug} href={`/read/${poem.slug}`} className="poem-card">
                <span className="poem-type">poem</span>
                <h3>{poem.title}</h3>
                {poem.pullQuote && <p className="poem-quote">"{poem.pullQuote}"</p>}
              </Link>
            ))}
          </div>
          <div className="section-more">
            <Link href="/read/poems" className="text-link">All poems →</Link>
          </div>
        </section>

        {/* Browse All */}
        <section className="browse-section">
          <Link href="/read/all" className="browse-link">
            Browse all {allEssays.length} pieces →
          </Link>
        </section>
      </div>

      {/* Footer */}
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
