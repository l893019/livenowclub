"use client";

import Link from "next/link";
import { useEffect } from "react";

// ============================================
// HOMEPAGE CONTENT CONFIG
// ============================================

// Featured piece - change this when you want to highlight something new
const FEATURED = {
  slug: "wonder/essay",
  title: "After Abundance",
  subtitle: "On Learning & Human Purpose in the Age of AI",
  excerpt: "What do we choose to do when machines can do everything? What 200+ works of science fiction reveal about human purpose in a post-scarcity world.",
  image: "/wonder/assets/Objects-v2/optimized/Sun_1.jpg",
};

// Editor's Pick - your handpicked recommendation
const EDITORS_PICK = {
  slug: "expecting-the-unexpected",
  title: "Expecting the Unexpected",
  excerpt: "The guide I wish someone had handed me at the start. When I was first diagnosed, I didn't know what to ask, what to prepare for, or how to let people help me.",
  type: "guide",
  image: "/images/expecting-the-unexpected.jpg",
};

// Most recent pieces (by date) - these would ideally be auto-populated
const RECENT = [
  {
    slug: "maybe",
    title: "Maybe",
    type: "essay",
    image: "/images/maybe.jpg",
  },
  {
    slug: "the-case-for-magical-thinking",
    title: "The Case for Magical Thinking",
    type: "essay",
    image: "/images/the-case-for-magical-thinking.jpg",
  },
];

// ============================================
// HOMEPAGE COMPONENT
// ============================================

export default function HomePage() {
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
          <Link href="/read">Read</Link>
          <Link href="/navigate">Navigate</Link>
          <Link href="/wonder">Wonder</Link>
          <Link href="/make">Make</Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-image">
          <img src="/images/hero-playa-faded.png" alt="" />
        </div>
        <div className="hero-content">
          <p className="hero-tagline">A club for those who don't want to waste the time they have left</p>
          <img src="/images/handwritten-question.png" alt="What would you do if you knew your time was short?" className="hero-handwritten" />
          <a href="#join" className="btn btn--primary">Become a Member</a>
        </div>
      </section>

      {/* FEATURED PIECE */}
      <section className="featured">
        <Link href={`/${FEATURED.slug}`} className="featured-link">
          <div className="featured-image">
            <img src={FEATURED.image} alt="" />
          </div>
          <div className="featured-text">
            <h2>{FEATURED.title}</h2>
            <p className="featured-subtitle">{FEATURED.subtitle}</p>
            <p className="featured-excerpt">{FEATURED.excerpt}</p>
            <span className="text-link">Read →</span>
          </div>
        </Link>
      </section>

      {/* ALSO WORTH READING */}
      <section className="worth-reading">
        <h3 className="section-label">Also Worth Reading</h3>
        <div className="worth-reading-layout">
          {/* Editor's Pick - larger */}
          <Link href={`/read/${EDITORS_PICK.slug}`} className="pick">
            <div className="pick-image">
              <img src={EDITORS_PICK.image} alt="" />
            </div>
            <div className="pick-content">
              <span className="pick-label">✦ Editor's Pick</span>
              <h4>{EDITORS_PICK.title}</h4>
              <p>{EDITORS_PICK.excerpt}</p>
              <span className="text-link">Read →</span>
            </div>
          </Link>

          {/* Recent pieces - smaller, stacked */}
          <div className="recent-stack">
            {RECENT.map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="recent-item">
                <div className="recent-item-image">
                  <img src={essay.image} alt="" />
                </div>
                <div className="recent-item-content">
                  <span className="recent-item-type">{essay.type}</span>
                  <h4>{essay.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="worth-reading-footer">
          <Link href="/read" className="text-link">Browse all writing →</Link>
        </div>
      </section>

      {/* MANIFESTO ASIDE */}
      <section className="manifesto-aside">
        <blockquote>
          "I created The Live Now Club as a place where <em>mortality</em> and <em>joy</em> sit side by side."
        </blockquote>
        <Link href="/about" className="text-link">Read the full story →</Link>
      </section>

      {/* JOIN */}
      <section id="join" className="join-simple">
        <div className="join-simple-content">
          <h2>Get the letters.</h2>
          <p>Writings on living fully, delivered when the words arrive.</p>
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
        <p className="footer-quote">"What if now is all we have?"</p>
        <nav className="footer-nav">
          <Link href="/read">Read</Link>
          <Link href="/navigate">Navigate</Link>
          <Link href="/wonder">Wonder</Link>
          <Link href="/make">Make</Link>
          <Link href="/about">About</Link>
        </nav>
        <p className="footer-copy">&copy; 2026 Louise Ireland</p>
      </footer>
    </>
  );
}
