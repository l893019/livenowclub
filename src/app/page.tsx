"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Essay = {
  slug: string;
  title: string;
  excerpt: string;
  type: string;
  image?: string;
};

// Static essay data for the homepage
const RECENT_ESSAYS: Essay[] = [
  {
    slug: "expecting-the-unexpected",
    title: "Expecting the Unexpected",
    excerpt: "The call came on a Thursday.",
    type: "essay",
    image: "/images/expecting-the-unexpected.jpg"
  },
  {
    slug: "maybe",
    title: "Maybe",
    excerpt: "Maybe you'll wake tomorrow to a world made new.",
    type: "poem",
    image: "/images/maybe.jpg"
  },
  {
    slug: "the-case-for-magical-thinking",
    title: "The Case for Magical Thinking",
    excerpt: "What if belief itself has power?",
    type: "essay",
    image: "/images/the-case-for-magical-thinking.jpg"
  },
  {
    slug: "i-love-lou",
    title: "I Love Lou",
    excerpt: "Learning to love the person I am.",
    type: "essay"
  },
  {
    slug: "cancer-meditations",
    title: "Cancer Meditations",
    excerpt: "Notes from the quiet hours of treatment.",
    type: "meditation",
    image: "/images/cancer-meditations-hero.jpg"
  },
  {
    slug: "the-purge",
    title: "The Purge",
    excerpt: "On letting go of everything that no longer serves.",
    type: "essay",
    image: "/images/the-purge.jpg"
  }
];

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

      {/* FEATURED */}
      <section className="featured-essay">
        <Link href="/wonder/essay" className="featured-essay-card">
          <div className="featured-essay-image">
            <img src="/images/after-abundance-preview.png" alt="" />
          </div>
          <div className="featured-essay-content">
            <span className="featured-essay-label">Featured</span>
            <h2>After Abundance</h2>
            <p className="featured-essay-subtitle">On Learning & Human Purpose in the Age of AI</p>
            <p className="featured-essay-excerpt">
              What do we choose to do when machines can do everything? What 200+ works of science fiction reveal about human purpose in a post-scarcity world.
            </p>
            <span className="featured-essay-cta">Read the essay →</span>
          </div>
        </Link>
      </section>

      {/* RECENT WRITING */}
      <section className="recent-writing">
        <div className="recent-header">
          <h2>Recent Writing</h2>
          <Link href="/read/all" className="recent-browse">Browse all →</Link>
        </div>
        <div className="recent-grid">
          {RECENT_ESSAYS.map((essay) => (
            <Link key={essay.slug} href={`/read/${essay.slug}`} className="recent-card">
              {essay.image && (
                <div className="recent-card-image">
                  <img src={essay.image} alt="" />
                </div>
              )}
              <div className="recent-card-content">
                <span className="recent-card-type">{essay.type}</span>
                <h3>{essay.title}</h3>
                <p>{essay.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MANIFESTO QUOTE */}
      <section className="manifesto-quote">
        <blockquote>
          "I created The Live Now Club as a place where <em>mortality</em> and <em>joy</em> sit side by side."
        </blockquote>
        <Link href="/about" className="manifesto-link">Read the full story →</Link>
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
