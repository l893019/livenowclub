"use client";

import Link from "next/link";
import { useEffect } from "react";
import Header from "@/components/Header";

// ============================================
// HOMEPAGE CONTENT CONFIG
// ============================================

// Pull quotes for the filmstrip - pink style
const QUOTES = [
  {
    slug: "life-is-not-empty",
    title: "Life is not empty",
    quote: "Facing my mortality has revealed how much of my life I spent curating myself into smallness. Living now has become my spiritual practice, my rebellion.",
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
    slug: "the-live-now-club",
    title: "The Live Now Club",
    quote: "I want to create a place where mortality and joy sit side by side.",
  },
  {
    slug: "i-love-lou",
    title: "I Love Lou",
    quote: "Ultimately, there is no one on the planet who can love me better than I can love myself.",
  },
  {
    slug: "threads-of-survival",
    title: "Threads of Survival",
    quote: "Every day, I return to this moment, wrestling with the humbling truth that binds us together - both small and scared, both fighting fiercely against the tide.",
  },
  {
    slug: "and-still-the-figs-ripen",
    title: "And still the figs ripen",
    quote: "I hope I go like the fig, sweet and full, bursting at the seam, feeding whatever comes next.",
  },
  {
    slug: "the-butterfly-dream",
    title: "The Butterfly Dream",
    quote: "I dream the sleep that sleeps in me. The lie lies still. Awake within. Who dreams this dream?",
  },
];

// Soft Entry Points - What do you need today?
const SOFT_ENTRIES = [
  {
    prompt: "I was just diagnosed",
    href: "/navigate/cancer",
    ariaLabel: "Guide for the newly diagnosed",
  },
  {
    prompt: "I'm carrying something heavy",
    href: "/read#heavy",
    ariaLabel: "Essays about grief, loss, and burden",
  },
  {
    prompt: "I want perspective",
    href: "/read#perspective",
    ariaLabel: "Essays on meaning and clarity",
  },
  {
    prompt: "I need something beautiful",
    href: "/read#beautiful",
    ariaLabel: "Poetry and meditations",
  },
  {
    prompt: "I don't know",
    href: "/read#start",
    ariaLabel: "Start here",
  },
];

// Featured piece
const FEATURED = {
  slug: "the-live-now-club",
  title: "The Live Now Club",
  subtitle: "Because now is all we have",
  excerpt: "Living to live, not living not to die.",
  image: "/images/the-live-now-club.gif",
};

// Editor's Pick
const EDITORS_PICK = {
  slug: "fixing-the-unfixable",
  title: "Fixing the Unfixable",
  excerpt: "What to say when there's nothing you can say.",
  type: "essay",
  image: "/images/fixing-the-unfixable.jpg",
};

// Most recent pieces
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

// Interactive piece from Wonder
const INTERACTIVE = {
  href: "/wonder/essay",
  title: "When Purpose Is All We Have Left",
  subtitle: "What 200+ sci-fi books reveal about meaning",
  description: "An interactive exploration of human purpose through the lens of sci-fi.",
  image: "/wonder/assets/landscapes/optimized/1.jpg",
  quizHref: "/wonder/essay/quiz",
  quizLabel: "Take the quiz →",
};

// ============================================
// HOMEPAGE COMPONENT WITH FONT PREVIEW
// ============================================

export default function HomePreview() {
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
      {/* Add Libre Caslon Display font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&display=swap" rel="stylesheet" />

      {/* Override fonts for this preview */}
      <style>{`
        /* Apply Libre Caslon Display to headings, quotes, nav */
        .header .nav a,
        .soft-entries-label,
        .featured h2,
        .featured-subtitle,
        .interactive-label,
        .interactive-card h3,
        .interactive-subtitle,
        .section-label,
        .pick-label,
        .pick h4,
        .recent-item h4,
        .manifesto-statement,
        .join-simple h2,
        .footer-quote,
        .footer-nav a,
        .carousel-card blockquote,
        .carousel-card cite,
        .intro-greeting {
          font-family: 'Libre Caslon Display', serif !important;
          font-weight: 400 !important;
        }

        /* Slightly larger sizes for the serif to match visual weight */
        .header .nav a {
          font-size: 17px !important;
        }

        .featured h2 {
          font-size: 48px !important;
        }

        .interactive-card h3 {
          font-size: 36px !important;
        }

        .section-label {
          font-size: 28px !important;
        }

        .pick h4 {
          font-size: 24px !important;
        }

        .manifesto-statement {
          font-size: 38px !important;
        }

        .join-simple h2 {
          font-size: 42px !important;
        }

        .footer-quote {
          font-size: 24px !important;
        }

        .carousel-card blockquote {
          font-size: 21px !important;
        }

        .intro-greeting {
          font-size: 26px !important;
        }

        /* Keep body text in Satoshi */
        body,
        .intro-body,
        .soft-entry,
        .featured-excerpt,
        .interactive-description,
        .pick p,
        .recent-item-type,
        .text-link,
        .btn {
          font-family: 'Satoshi', -apple-system, sans-serif !important;
        }
      `}</style>

      <Header />

      {/* HERO */}
      <section className="hero">
        <div className="hero-image">
          <img src="/images/hero-playa-faded.png" alt="" />
        </div>
        <div className="hero-content">
          <img src="/images/handwritten-question.png" alt="What would you do if you knew your time was short?" className="hero-handwritten" />
          <a href="#join" className="btn btn--primary">Join the Newsletter</a>
        </div>
      </section>

      {/* INTRO */}
      <section className="intro">
        <div className="intro-photo">
          <img src="/images/louise-portrait-new.png" alt="Louise Ireland" />
        </div>
        <div className="intro-text">
          <p className="intro-greeting">I'm <Link href="/about" className="intro-louise-link">Louise</Link> <span className="intro-lou">(but you may call me Lou)</span>.</p>
          <p className="intro-body">
            I started writing to leave a mark in case I don't survive. Now I write to live.
          </p>
        </div>
      </section>

      {/* SOFT ENTRY POINTS */}
      <section className="soft-entries">
        <p className="soft-entries-label">What do you need today?</p>
        <div className="soft-entries-grid">
          {SOFT_ENTRIES.map((entry) => (
            <Link
              key={entry.href}
              href={entry.href}
              className="soft-entry"
              aria-label={entry.ariaLabel}
            >
              {entry.prompt}
            </Link>
          ))}
        </div>
      </section>

      {/* QUOTE CAROUSEL */}
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
        <Link href={`/read/${FEATURED.slug}`} className="featured-link">
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

      {/* INTERACTIVE */}
      <section className="interactive-callout">
        <div className="interactive-callout-inner">
          <span className="interactive-label">New from Wonder</span>
          <Link href={INTERACTIVE.href} className="interactive-card">
            <div className="interactive-image">
              <img src={INTERACTIVE.image} alt={INTERACTIVE.title} />
            </div>
            <div className="interactive-content">
              <h3>{INTERACTIVE.title}</h3>
              <p className="interactive-subtitle">{INTERACTIVE.subtitle}</p>
              <p className="interactive-description">{INTERACTIVE.description}</p>
              <div className="interactive-actions">
                <span className="text-link">Read the essay →</span>
                <Link href={INTERACTIVE.quizHref} className="quiz-link">{INTERACTIVE.quizLabel}</Link>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* WORTH READING */}
      <section className="worth-reading">
        <h3 className="section-label">Keep Reading</h3>
        <div className="worth-reading-layout">
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
