import Link from "next/link";
import { getAllEssays, PATHWAYS, getPathwayEssays } from "@/lib/essays";

export const metadata = {
  title: "Read | The Live Now Club",
  description: "Essays and poems on life, love, cancer, and the relentless pursuit of joy.",
};

export default function ReadPage() {
  const allEssays = getAllEssays();

  // Track which essays we've shown to avoid duplicates
  const shownSlugs = new Set<string>();

  // Helper to get essays for a pathway without duplicates
  const getUniquePathwayEssays = (pathwayId: string) => {
    const essays = getPathwayEssays(pathwayId);
    return essays.filter(e => {
      if (shownSlugs.has(e.slug)) return false;
      shownSlugs.add(e.slug);
      return true;
    });
  };

  // Get essays by pathway in order (cancer content lives on /navigate)
  const startHere = getUniquePathwayEssays("start-here");
  const griefLoss = getUniquePathwayEssays("grief-loss");
  const findingJoy = getUniquePathwayEssays("finding-joy");
  const wisdom = getUniquePathwayEssays("wisdom");
  const selfLove = getUniquePathwayEssays("self-love");
  const poems = getUniquePathwayEssays("poems");
  const wonder = getUniquePathwayEssays("wonder");

  // Remaining essays not in any pathway
  const remaining = allEssays.filter(e => !shownSlugs.has(e.slug));

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

      <div className="read-curated">
        {/* Hero */}
        <section className="read-hero-simple">
          <h1>The Writing</h1>
          <p>Essays, poems, and meditations on life, love, cancer, and joy.</p>
        </section>

        {/* Quick Links */}
        <nav className="read-quick-nav">
          <a href="#start">Start Here</a>
          <a href="#heavy">Carrying Heavy</a>
          <a href="#joy">Finding Joy</a>
          <a href="#perspective">Perspective</a>
          <a href="#beautiful">Beautiful</a>
          <a href="#self-love">Self-Love</a>
        </nav>

        {/* Cancer Guide Callout */}
        <div className="read-callout">
          <p>Looking for the cancer guide?</p>
          <Link href="/navigate" className="read-callout-link">Navigate the journey →</Link>
        </div>

        {/* Start Here */}
        <section id="start" className="read-section">
          <div className="read-section-header">
            <h2>Start Here</h2>
            <p>New to The Live Now Club? Begin with these.</p>
          </div>
          <div className="read-list">
            {startHere.map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="read-list-item">
                {essay.image && (
                  <div className="read-list-image">
                    <img src={essay.image} alt={essay.title} />
                  </div>
                )}
                <div className="read-list-content">
                  <span className="read-list-type">{essay.type}</span>
                  <h3>{essay.title}</h3>
                  <p>{essay.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Grief & Loss / Heavy */}
        <section id="heavy" className="read-section">
          <div className="read-section-header">
            <h2>On Grief & Loss</h2>
            <p>For when you're carrying something heavy.</p>
          </div>
          <div className="read-list">
            {griefLoss.map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="read-list-item">
                {essay.image && (
                  <div className="read-list-image">
                    <img src={essay.image} alt={essay.title} />
                  </div>
                )}
                <div className="read-list-content">
                  <span className="read-list-type">{essay.type}</span>
                  <h3>{essay.title}</h3>
                  <p>{essay.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Finding Joy */}
        <section id="joy" className="read-section">
          <div className="read-section-header">
            <h2>Finding Joy Anyway</h2>
            <p>Because life is also beautiful.</p>
          </div>
          <div className="read-list">
            {findingJoy.map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="read-list-item">
                {essay.image && (
                  <div className="read-list-image">
                    <img src={essay.image} alt={essay.title} />
                  </div>
                )}
                <div className="read-list-content">
                  <span className="read-list-type">{essay.type}</span>
                  <h3>{essay.title}</h3>
                  <p>{essay.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Wisdom & Philosophy / Perspective */}
        <section id="perspective" className="read-section">
          <div className="read-section-header">
            <h2>Wisdom & Philosophy</h2>
            <p>The deeper questions about meaning and being.</p>
          </div>
          <div className="read-list">
            {wisdom.map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="read-list-item">
                {essay.image && (
                  <div className="read-list-image">
                    <img src={essay.image} alt={essay.title} />
                  </div>
                )}
                <div className="read-list-content">
                  <span className="read-list-type">{essay.type}</span>
                  <h3>{essay.title}</h3>
                  <p>{essay.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Poems / Beautiful */}
        <section id="beautiful" className="read-section">
          <div className="read-section-header">
            <h2>Poems</h2>
            <p>Brief meditations. Beauty in a breath.</p>
          </div>
          <div className="read-poems-grid">
            {poems.map((poem) => (
              <Link key={poem.slug} href={`/read/${poem.slug}`} className="read-poem-card">
                <span className="read-poem-type">poem</span>
                <h3>{poem.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Self-Love */}
        <section id="self-love" className="read-section">
          <div className="read-section-header">
            <h2>Falling in Love with Yourself</h2>
            <p>The most important relationship you'll ever have.</p>
          </div>
          <div className="read-list">
            {selfLove.map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="read-list-item">
                {essay.image && (
                  <div className="read-list-image">
                    <img src={essay.image} alt={essay.title} />
                  </div>
                )}
                <div className="read-list-content">
                  <span className="read-list-type">{essay.type}</span>
                  <h3>{essay.title}</h3>
                  <p>{essay.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Wonder */}
        {wonder.length > 0 && (
          <section className="read-section">
            <div className="read-section-header">
              <h2>Wonder</h2>
              <p>AI, dreams, and the bigger questions.</p>
            </div>
            <div className="read-list">
              {wonder.map((essay) => (
                <Link key={essay.slug} href={`/read/${essay.slug}`} className="read-list-item">
                  {essay.image && (
                    <div className="read-list-image">
                      <img src={essay.image} alt={essay.title} />
                    </div>
                  )}
                  <div className="read-list-content">
                    <span className="read-list-type">{essay.type}</span>
                    <h3>{essay.title}</h3>
                    <p>{essay.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Everything Else */}
        {remaining.length > 0 && (
          <section className="read-section">
            <div className="read-section-header">
              <h2>More Writing</h2>
              <p>Everything else worth reading.</p>
            </div>
            <div className="read-list">
              {remaining.map((essay) => (
                <Link key={essay.slug} href={`/read/${essay.slug}`} className="read-list-item">
                  {essay.image && (
                    <div className="read-list-image">
                      <img src={essay.image} alt={essay.title} />
                    </div>
                  )}
                  <div className="read-list-content">
                    <span className="read-list-type">{essay.type}</span>
                    <h3>{essay.title}</h3>
                    <p>{essay.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
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
