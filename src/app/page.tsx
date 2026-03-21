"use client";

import Link from "next/link";
import { useEffect } from "react";

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

      {/* MANIFESTO */}
      <section className="manifesto">
        <div className="manifesto-texture"></div>
        <img src="/botanicals/botanical-02-bw.png" alt="" className="manifesto-botanical" />

        <div className="manifesto-content">
          <span className="section-label">The Manifesto</span>
          <blockquote>
            A space where<br />
            <em>joy</em> and <em>mortality</em><br />
            coexist.
          </blockquote>
          <p>
            We write about life, navigate hard things together,<br />
            and build tools for living fully.
          </p>
        </div>

        <img src="/paint/paint-pink.png" alt="" className="manifesto-paint" />
      </section>

      {/* FEATURED WORK */}
      <section className="featured">
        <div className="featured-grid">
          {/* Expecting the Unexpected */}
          <a
            href="https://static1.squarespace.com/static/68baddbc65e901527cbfd30f/t/693ee015670f423dc00de98e/1765728277861/Expecting+the+Unexpected+LNC+VF.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="featured-card featured-card--cancer"
          >
            <span className="featured-label">Navigate</span>
            <h2 className="featured-title">Expecting the Unexpected</h2>
            <p className="featured-quote">
              "There isn't any easy way to say it, so I'll just say it: I have cancer."
            </p>
            <p className="featured-desc">
              Everything I wish someone had told me before diagnosis. A guide for those walking through cancer.
            </p>
            <span className="featured-cta">Download the guide →</span>
          </a>

          {/* After Abundance */}
          <a
            href="https://after-abundance.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="featured-card featured-card--wonder"
          >
            <span className="featured-label">Wonder</span>
            <h2 className="featured-title">After Abundance</h2>
            <p className="featured-quote">
              "What do we choose to do when machines can do everything?"
            </p>
            <p className="featured-desc">
              What 200+ works of science fiction reveal about human purpose in a post-scarcity world.
            </p>
            <span className="featured-cta">Explore the research →</span>
          </a>
        </div>
      </section>

      {/* PILLARS */}
      <section className="pillars">
        <div className="pillars-texture"></div>

        <div className="pillars-header">
          <span className="pillars-label">Four Ways In</span>
        </div>

        <div className="pillars-grid">
          {/* READ */}
          <Link href="/read" className="pillar" data-number="01">
            <div className="pillar-inner">
              <h3>Read</h3>
              <p className="pillar-subtitle">Essays & Poetry</p>
              <p className="pillar-desc">Writing on life, love, cancer, and the relentless pursuit of joy.</p>
              <span className="pillar-arrow">→</span>
            </div>
          </Link>

          {/* NAVIGATE */}
          <Link href="/navigate" className="pillar" data-number="02">
            <div className="pillar-inner">
              <h3>Navigate</h3>
              <p className="pillar-subtitle">Lou's Guide to Cancer</p>
              <p className="pillar-desc">Everything I wish someone had told me.</p>
              <span className="pillar-arrow">→</span>
            </div>
          </Link>

          {/* WONDER */}
          <Link href="/wonder" className="pillar pillar--wonder" data-number="03">
            <div className="pillar-inner">
              <h3>Wonder</h3>
              <p className="pillar-subtitle">Exploring the Future</p>
              <p className="pillar-desc">AI, post-scarcity, and the questions that keep me up at night.</p>
              <span className="pillar-arrow">→</span>
            </div>
          </Link>

          {/* MAKE */}
          <Link href="/make" className="pillar" data-number="04">
            <div className="pillar-inner">
              <h3>Make</h3>
              <p className="pillar-subtitle">Living a Creative Life</p>
              <p className="pillar-desc">Tools to help you make things.</p>
              <span className="pillar-arrow">→</span>
            </div>
          </Link>
        </div>

        <img src="/botanicals/botanical-01-bw.png" alt="" className="pillars-botanical" />
      </section>

      {/* JOIN */}
      <section id="join" className="join">
        <img src="/paint/paint-multi.png" alt="" className="join-paint" />
        <img src="/botanicals/botanical-02-green.png" alt="" className="join-botanical" />

        <div className="join-content">
          <span className="join-label">Join Us</span>
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
