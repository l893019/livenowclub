import Link from "next/link";
import { getPathwayEssays } from "@/lib/essays";

export const metadata = {
  title: "Wonder | The Live Now Club",
  description: "Explorations at the intersection of AI, humanity, and meaning.",
};

// Featured essay - After Abundance (special interactive piece)
const FEATURED_ESSAY = {
  slug: "/wonder/essay",
  title: "After Abundance",
  subtitle: "When Purpose Is All We Have Left",
  description: "What more than 200 science fiction books reveal about human purpose when scarcity ends.",
  image: "/wonder/assets/landscapes/optimized/1.jpg",
  type: "interactive essay",
};

export default function WonderPage() {
  // Get essays from the "wonder" pathway
  const wonderEssays = getPathwayEssays("wonder");

  return (
    <>
      {/* Header */}
      <header className="header">
        <Link href="/" className="logo">
          <img src="/images/logo-handwritten.png" alt="The Live Now Club" className="logo-img" />
        </Link>
        <nav className="nav">
          <Link href="/read">Read</Link>
          <Link href="/navigate">Navigate</Link>
          <Link href="/wonder" className="active">Wonder</Link>
          <Link href="/connect">Connect</Link>
        </nav>
      </header>

      <div className="wonder-container">
        {/* Hero */}
        <section className="wonder-hero">
          <span className="wonder-label">Wonder</span>
          <h1>What happens when machines dream?</h1>
          <p>
            Explorations at the intersection of AI, humanity, and meaning.
            Essays that ask big questions. Projects that experiment with answers.
          </p>
        </section>

        {/* Featured Interactive Essay */}
        <section className="wonder-section">
          <h2 className="wonder-section-title">Featured</h2>
          <div className="wonder-essays-grid">
            <Link href={FEATURED_ESSAY.slug} className="wonder-essay-card">
              <div className="wonder-essay-image">
                <img src={FEATURED_ESSAY.image} alt={FEATURED_ESSAY.title} />
              </div>
              <div className="wonder-essay-content">
                <span className="wonder-essay-type">{FEATURED_ESSAY.type}</span>
                <h3>{FEATURED_ESSAY.title}</h3>
                {FEATURED_ESSAY.subtitle && <p className="wonder-essay-subtitle">{FEATURED_ESSAY.subtitle}</p>}
                <p className="wonder-essay-description">{FEATURED_ESSAY.description}</p>
                <span className="text-link">Explore →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Essays from Wonder pathway */}
        <section className="wonder-section">
          <h2 className="wonder-section-title">Essays on Meaning, AI & the Bigger Questions</h2>
          <div className="wonder-essays-list">
            {wonderEssays.map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="wonder-list-item">
                {essay.image && (
                  <div className="wonder-list-image">
                    <img src={essay.image} alt={essay.title} />
                  </div>
                )}
                <div className="wonder-list-content">
                  <span className="wonder-list-type">{essay.type}</span>
                  <h3>{essay.title}</h3>
                  <p>{essay.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Coming Soon placeholder */}
        <section className="wonder-coming-soon">
          <p>More explorations coming soon.</p>
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
