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
          <p className="manifesto-text">
            When I was first diagnosed, I joined countless cancer support groups. I quickly left them all. They served a purpose, but they felt heavy, airless. I've longed for a room of light.
          </p>
          <p className="manifesto-text">
            I created The Live Now Club, because I want to create a place where <em>mortality</em> and <em>joy</em> sit side by side. A place for anyone willing to hold their horizon in view and live anyway.
          </p>
        </div>

        <img src="/paint/paint-pink.png" alt="" className="manifesto-paint" />
      </section>

      {/* LATEST */}
      <section className="latest">
        <span className="section-label">Latest</span>

        <div className="latest-grid">
          {/* After Abundance - Hero Feature */}
          <Link href="/wonder/essay" className="latest-hero">
            <div className="latest-hero-image">
              <img src="/images/after-abundance-preview.png" alt="" />
            </div>
            <div className="latest-hero-content">
              <span className="latest-label">Research Essay</span>
              <h2>After Abundance</h2>
              <p className="latest-subtitle">On Learning & Human Purpose in the Age of AI</p>
              <p className="latest-excerpt">
                What do we choose to do when machines can do everything? What 200+ works of science fiction reveal about human purpose in a post-scarcity world.
              </p>
              <span className="latest-cta">Read the essay →</span>
            </div>
          </Link>

          {/* Maybe */}
          <Link href="/read/maybe" className="latest-card">
            <span className="latest-label">Essay</span>
            <h3>Maybe</h3>
            <p className="latest-card-subtitle">On Learning to Hold It All Loosely</p>
            <p className="latest-card-excerpt">
              In a year full of difficult news, I finally, thankfully, have been graced with some good. My scans show no active cancer in my system.
            </p>
            <span className="latest-cta">Read →</span>
          </Link>

          {/* Expecting the Unexpected */}
          <a
            href="https://static1.squarespace.com/static/68baddbc65e901527cbfd30f/t/693ee015670f423dc00de98e/1765728277861/Expecting+the+Unexpected+LNC+VF.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="latest-card"
          >
            <span className="latest-label">Guide</span>
            <h3>Expecting the Unexpected</h3>
            <p className="latest-card-subtitle">Lou's Guide to Cancer</p>
            <p className="latest-card-excerpt">
              Everything I wish someone had told me before diagnosis. A practical guide for those walking through cancer.
            </p>
            <span className="latest-cta">Download PDF →</span>
          </a>
        </div>
      </section>

      {/* EXPLORE */}
      <section className="explore">
        <div className="explore-links">
          <Link href="/read" className="explore-link">
            <span className="explore-number">01</span>
            <span className="explore-title">Read</span>
            <span className="explore-desc">Essays & Poetry</span>
          </Link>
          <Link href="/navigate" className="explore-link">
            <span className="explore-number">02</span>
            <span className="explore-title">Navigate</span>
            <span className="explore-desc">Guide to Cancer</span>
          </Link>
          <Link href="/wonder" className="explore-link">
            <span className="explore-number">03</span>
            <span className="explore-title">Wonder</span>
            <span className="explore-desc">Exploring the Future</span>
          </Link>
          <Link href="/make" className="explore-link">
            <span className="explore-number">04</span>
            <span className="explore-title">Make</span>
            <span className="explore-desc">Creative Tools</span>
          </Link>
        </div>
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
