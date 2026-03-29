"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// ============================================
// HOMEPAGE CONTENT CONFIG
// ============================================

// Pull quotes for the filmstrip - pink style
const QUOTES = [
  {
    slug: "the-live-now-club",
    title: "The Live Now Club",
    quote: "Most people in your situation are focused on living not to die, I think what you're trying to say is that you're living to live.",
  },
  {
    slug: "fixing-the-unfixable",
    title: "Fixing the Unfixable",
    quote: "There is nothing you can say that will solve it. But, there is much you can say that will keep someone company inside of it.",
  },
  {
    slug: "the-other-side-of-grief",
    title: "The other side of grief",
    quote: "I wept from the strangeness of return. From the terror of starting anew. From the defiant choice to love this life anyway.",
  },
  {
    slug: "embracing-free-fall",
    title: "Embracing Free Fall",
    quote: "I'm learning to stop grasping for control and lean back into complete free fall.",
  },
  {
    slug: "cancer-meditations",
    title: "Cancer Meditations",
    quote: "I am not dying from this. But it's given me some peace to think that we are all on a path toward death, that we build beautiful lives that dissolve into beautiful nothingness.",
  },
  {
    slug: "i-love-lou",
    title: "I Love Lou",
    quote: "I met her on February 13, 2022. Like any good meet-cute, I had this feeling I had met her long ago. Her name is Lou.",
  },
  {
    slug: "threads-of-survival",
    title: "Threads of Survival",
    quote: "Every day, I return to this moment, wrestling with the humbling truth that binds us together - both small and scared, both fighting fiercely against the tide.",
  },
  {
    slug: "and-still-the-figs-ripen",
    title: "And still the figs ripen",
    quote: "And still the figs ripen, the sea turns over, and we go on.",
  },
  {
    slug: "life-is-not-empty",
    title: "Life is not empty",
    quote: "Life is not empty. It was never empty. I just forgot to look.",
  },
  {
    slug: "the-butterfly-dream",
    title: "The Butterfly Dream",
    quote: "Am I dreaming the butterfly, or is the butterfly dreaming me?",
  },
];

// Soft Entry Points - What do you need today?
// These are the emotional entry points that guide visitors to the right content
const SOFT_ENTRIES = [
  {
    prompt: "I just got a diagnosis",
    slug: "expecting-the-unexpected",
    ariaLabel: "Practical guide for the newly diagnosed",
  },
  {
    prompt: "I'm grieving",
    slug: "the-other-side-of-grief",
    ariaLabel: "Essays about processing grief and loss",
  },
  {
    prompt: "I'm supporting someone I love",
    slug: "fixing-the-unfixable",
    ariaLabel: "What to say when there's nothing to fix",
  },
  {
    prompt: "I need to feel less alone",
    slug: "the-live-now-club",
    ariaLabel: "The founding essay about living fully",
  },
  {
    prompt: "I want to think deeply",
    slug: "soulmd",
    ariaLabel: "Essays on meaning, AI, and being human",
  },
  {
    prompt: "I want something beautiful",
    slug: "and-still-the-figs-ripen",
    ariaLabel: "Poetry and meditations",
  },
];

// Featured piece - change this when you want to highlight something new
const FEATURED = {
  slug: "the-live-now-club",
  title: "The Live Now Club",
  subtitle: "Because now is all we have",
  excerpt: "Living to live, not living not to die. The founding essay of this space.",
  image: "/images/the-live-now-club.gif",
};

// Editor's Pick - your handpicked recommendation
const EDITORS_PICK = {
  slug: "fixing-the-unfixable",
  title: "Fixing the Unfixable",
  excerpt: "What to say when there's nothing you can say.",
  type: "essay",
  image: "/images/fixing-the-unfixable.jpg",
};

// Most recent pieces (by date)
const RECENT = [
  {
    slug: "soulmd",
    title: "Soul.md",
    type: "essay",
    image: "/images/soulmd.jpg",
  },
  {
    slug: "if-you-can-keep-your-head-about-you",
    title: "If you can keep your head about you",
    type: "essay",
    image: "/images/keep-your-head.jpg",
  },
  {
    slug: "life-is-not-empty",
    title: "Life is not empty",
    type: "essay",
    image: "/images/life-is-not-empty.jpg",
  },
  {
    slug: "expecting-the-unexpected",
    title: "Expecting the Unexpected",
    type: "guide",
    image: "/images/expecting-the-unexpected.jpg",
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
          <Link href="/read" className={pathname === "/read" ? "active" : ""}>Read</Link>
          <Link href="/navigate" className={pathname === "/navigate" ? "active" : ""}>Navigate</Link>
          <Link href="/wonder" className={pathname === "/wonder" ? "active" : ""}>Wonder</Link>
          <Link href="/connect" className={pathname === "/connect" ? "active" : ""}>Connect</Link>
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
          <a href="#join" className="btn btn--primary">Join the Newsletter</a>
        </div>
      </section>

      {/* INTRO */}
      <section className="intro">
        <p className="intro-greeting">I'm Louise.</p>
        <p className="intro-body">
          I am a person of many verbs <span className="intro-verbs">(writer, founder, investor, artist)</span> who is working on being just a noun <span className="intro-verbs">(human)</span>.
        </p>
        <p className="intro-body">
          I started writing to leave a mark in case I don't survive, and now I write to live.
        </p>
        <p className="intro-body">
          I created this space to start more conversation around life, loss, illness, and the choice to choose joy every time.
        </p>
      </section>

      {/* SOFT ENTRY POINTS - What do you need today? */}
      <section className="soft-entries">
        <p className="soft-entries-label">What do you need today?</p>
        <div className="soft-entries-grid">
          {SOFT_ENTRIES.map((entry) => (
            <Link
              key={entry.slug}
              href={`/read/${entry.slug}`}
              className="soft-entry"
              aria-label={entry.ariaLabel}
            >
              {entry.prompt}
            </Link>
          ))}
        </div>
      </section>

      {/* QUOTE CAROUSEL - Pink style */}
      <section className="quote-carousel">
        <div className="carousel-track">
          {QUOTES.map((item) => (
            <Link key={item.slug} href={`/read/${item.slug}`} className="carousel-card">
              <blockquote>"{item.quote}"</blockquote>
              <cite>— {item.title}</cite>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PIECE */}
      <section className="featured">
        <Link href={`/${FEATURED.slug}`} className="featured-link">
          <div className="featured-image">
            <img src={FEATURED.image} alt={`Featured: ${FEATURED.title}`} />
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
        <h3 className="section-label">Keep Reading</h3>
        <div className="worth-reading-layout">
          {/* Editor's Pick - larger */}
          <Link href={`/read/${EDITORS_PICK.slug}`} className="pick">
            <div className="pick-image">
              <img src={EDITORS_PICK.image} alt={`Editor's Pick: ${EDITORS_PICK.title}`} />
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
                  <img src={essay.image} alt={essay.title} />
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
        <p className="manifesto-statement"><em>Mortality</em> and <em>joy</em>, side by side.</p>
      </section>

      {/* JOIN */}
      <section id="join" className="join-simple">
        <div className="join-simple-content">
          <h2>Join me.</h2>
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
