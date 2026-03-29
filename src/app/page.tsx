"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// ============================================
// HOMEPAGE CONTENT CONFIG
// ============================================

// Read This First - the essential starting piece
const READ_THIS_FIRST = {
  slug: "the-live-now-club",
  title: "The Live Now Club",
  excerpt: "The manifesto that started it all. What it means to live like you mean it.",
  image: "/images/the-live-now-club.jpg",
};

// Library preview - curated selection
const LIBRARY_PREVIEW = [
  {
    slug: "cancer-meditations",
    title: "Cancer Meditations",
    feeling: "facing crisis",
    image: "/images/cancer-meditations.jpg",
  },
  {
    slug: "the-other-side-of-grief",
    title: "The Other Side of Grief",
    feeling: "processing loss",
    image: "/images/the-other-side-of-grief.jpg",
  },
  {
    slug: "life-is-not-empty",
    title: "Life is not empty",
    feeling: "finding meaning",
    image: "/images/life-is-not-empty.jpg",
  },
  {
    slug: "and-still-the-figs-ripen",
    title: "And Still the Figs Ripen",
    feeling: "finding joy",
    image: "/images/and-still-the-figs-ripen.jpg",
  },
];

// ============================================
// HOMEPAGE COMPONENT
// ============================================

export default function HomePage() {
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <Link href="/" className="logo">
          <img src="/images/logo-handwritten.png" alt="The Live Now Club" className="logo-img" />
        </Link>
        <nav className="nav">
          <Link href="/start-here" className={pathname === "/start-here" ? "active" : ""}>Start Here</Link>
          <Link href="/guide" className={pathname === "/guide" ? "active" : ""}>The Guide</Link>
          <Link href="/library" className={pathname === "/library" ? "active" : ""}>Library</Link>
          <Link href="/connect" className={pathname === "/connect" ? "active" : ""}>Connect</Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero hero--centered">
        <div className="hero-image">
          <img src="/images/hero-playa-faded.png" alt="" />
        </div>
        <div className="hero-content">
          <h1 className="hero-headline">When life becomes real, where do you go?</h1>
          <p className="hero-subline">Essays, meditations, and practical wisdom for when everything changes.</p>
        </div>
      </section>

      {/* ENTRY PATHS */}
      <section className="entry-paths">
        <div className="entry-paths-grid">
          <Link href="/start-here?path=crisis" className="entry-path">
            <span className="entry-path-label">I'm facing a crisis</span>
            <p className="entry-path-desc">Cancer, loss, or life-altering news. Start here.</p>
          </Link>
          <Link href="/start-here?path=alone" className="entry-path">
            <span className="entry-path-label">I want to feel less alone</span>
            <p className="entry-path-desc">Someone else has been where you are.</p>
          </Link>
          <Link href="/start-here?path=meaning" className="entry-path">
            <span className="entry-path-label">I'm searching for meaning</span>
            <p className="entry-path-desc">Making sense of what happened.</p>
          </Link>
        </div>
      </section>

      {/* THE GUIDE */}
      <section className="guide-feature">
        <div className="guide-feature-content">
          <span className="guide-feature-label">Featured</span>
          <h2 className="guide-feature-title">The Guide</h2>
          <p className="guide-feature-desc">
            A structured path through crisis and meaning-making. Seven sections, fifty essays,
            one journey from shock to integration.
          </p>
          <Link href="/guide" className="btn btn--primary">Explore The Guide</Link>
        </div>
        <div className="guide-feature-visual">
          <div className="guide-sections-preview">
            <span>Beginning</span>
            <span>Navigating</span>
            <span>Processing</span>
            <span>Finding Joy</span>
            <span>Integration</span>
          </div>
        </div>
      </section>

      {/* READ THIS FIRST */}
      <section className="read-first">
        <h3 className="section-label">Read This First</h3>
        <Link href={`/library/${READ_THIS_FIRST.slug}`} className="read-first-card">
          <div className="read-first-image">
            <img src={READ_THIS_FIRST.image} alt={READ_THIS_FIRST.title} />
          </div>
          <div className="read-first-content">
            <h4>{READ_THIS_FIRST.title}</h4>
            <p>{READ_THIS_FIRST.excerpt}</p>
            <span className="text-link">Read →</span>
          </div>
        </Link>
      </section>

      {/* LIBRARY PREVIEW */}
      <section className="library-preview">
        <h3 className="section-label">From the Library</h3>
        <div className="library-preview-grid">
          {LIBRARY_PREVIEW.map((essay) => (
            <Link key={essay.slug} href={`/library/${essay.slug}`} className="library-preview-card">
              <div className="library-preview-image">
                <img src={essay.image} alt={essay.title} />
              </div>
              <div className="library-preview-content">
                <span className="library-preview-feeling">{essay.feeling}</span>
                <h4>{essay.title}</h4>
              </div>
            </Link>
          ))}
        </div>
        <div className="library-preview-footer">
          <Link href="/library" className="text-link">Browse all 52 essays →</Link>
        </div>
      </section>

      {/* CLOSING / JOIN */}
      <section id="join" className="closing">
        <div className="closing-content">
          <p className="closing-quote">What if now is all we have?</p>
          <h2>Join me.</h2>
          <p className="closing-desc">Essays on mortality, joy, and everything in between. Delivered when I write them.</p>
          <iframe
            src="https://louiseireland.substack.com/embed"
            width="100%"
            height="150"
            style={{ border: "none", background: "transparent", maxWidth: 480 }}
            frameBorder="0"
            scrolling="no"
          />
        </div>
      </section>

      {/* FOOTER */}
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
