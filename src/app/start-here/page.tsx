"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// ============================================
// ENTRY PATHS - Emotional Entry Points
// ============================================

const ENTRY_PATHS = [
  {
    id: "crisis",
    title: "I'm facing a crisis",
    description: "A diagnosis, a loss, or life-altering news. When everything changes in an instant.",
    color: "pink",
    essays: [
      {
        slug: "expecting-the-unexpected",
        title: "Expecting the Unexpected",
        descriptor: "The essay I wrote after my cancer diagnosis",
        image: "/images/expecting-the-unexpected.jpg",
      },
      {
        slug: "cancer-meditations",
        title: "Cancer Meditations",
        descriptor: "Six meditations written during treatment",
        image: "/images/cancer-meditations.jpg",
      },
      {
        slug: "i-need-you-to-hold-my-hand",
        title: "I Need You to Hold My Hand",
        descriptor: "On needing support when you're scared",
        image: "/images/i-need-you-to-hold-my-hand.jpg",
      },
      {
        slug: "fixing-the-unfixable",
        title: "Fixing the Unfixable",
        descriptor: "What to say when there's nothing you can say",
        image: "/images/fixing-the-unfixable.jpg",
      },
    ],
  },
  {
    id: "alone",
    title: "I want to feel less alone",
    description: "Someone else has been where you are. These are the words I wish I'd heard.",
    color: "coral",
    essays: [
      {
        slug: "how-are-you-after-it-all-falls-down",
        title: "How Are You (After It All Falls Down)",
        descriptor: "On the impossible question and honest answers",
        image: "/images/how-are-you-after-it-all-falls-down.jpg",
      },
      {
        slug: "it-takes-a-village",
        title: "It Takes a Village",
        descriptor: "On letting people help you",
        image: "/images/it-takes-a-village.jpg",
      },
      {
        slug: "the-other-side-of-grief",
        title: "The Other Side of Grief",
        descriptor: "What I learned from loss",
        image: "/images/the-other-side-of-grief.jpg",
      },
      {
        slug: "on-friendship-and-couches",
        title: "On Friendship and Couches",
        descriptor: "The people who show up",
        image: "/images/on-friendship-and-couches.jpg",
      },
    ],
  },
  {
    id: "meaning",
    title: "I'm searching for meaning",
    description: "Making sense of what happened. Finding purpose in the chaos.",
    color: "teal",
    essays: [
      {
        slug: "the-live-now-club",
        title: "The Live Now Club",
        descriptor: "The manifesto that started it all",
        image: "/images/the-live-now-club.gif",
      },
      {
        slug: "soulmd",
        title: "Soul.md",
        descriptor: "A document to define your deepest self",
        image: "/images/soulmd.jpg",
      },
      {
        slug: "life-is-not-empty",
        title: "Life is not empty",
        descriptor: "On finding fullness in uncertainty",
        image: "/images/life-is-not-empty.jpg",
      },
      {
        slug: "the-case-for-magical-thinking",
        title: "The Case for Magical Thinking",
        descriptor: "Why I believe in things I can't prove",
        image: "/images/the-case-for-magical-thinking.jpg",
      },
    ],
  },
  {
    id: "joy",
    title: "I need to feel something good",
    description: "Because even in the hard times, beauty exists. And it's okay to let it in.",
    color: "gold",
    essays: [
      {
        slug: "and-still-the-figs-ripen",
        title: "And Still the Figs Ripen",
        descriptor: "On finding joy in small things",
        image: "/images/and-still-the-figs-ripen.jpg",
      },
      {
        slug: "the-butterfly-dream",
        title: "The Butterfly Dream",
        descriptor: "A moment of transcendence",
        image: "/images/the-butterfly-dream.jpg",
      },
      {
        slug: "maybe",
        title: "Maybe",
        descriptor: "A meditation on possibility",
        image: "/images/maybe.jpg",
      },
      {
        slug: "sea-glass",
        title: "Sea Glass",
        descriptor: "A poem about transformation",
        image: "/images/sea-glass.jpg",
      },
    ],
  },
];

// ============================================
// COMPONENTS
// ============================================

function StartHereContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedPath = searchParams.get("path");

  const activePath = ENTRY_PATHS.find((p) => p.id === selectedPath);

  return (
    <>
      {/* HEADER */}
      <header className="header scrolled">
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

      {/* MAIN CONTENT */}
      <main className="start-here-page">
        <div className="start-here-header">
          <h1>Where are you right now?</h1>
          <p>Everyone arrives here for a reason. Find your entry point.</p>
        </div>

        {/* Path Selection */}
        <div className="start-here-paths">
          {ENTRY_PATHS.map((path) => (
            <Link
              key={path.id}
              href={`/start-here?path=${path.id}`}
              className={`start-here-path ${selectedPath === path.id ? "active" : ""}`}
              data-color={path.color}
            >
              <h3>{path.title}</h3>
              <p>{path.description}</p>
            </Link>
          ))}
        </div>

        {/* Selected Path Essays */}
        {activePath && (
          <section className="start-here-essays">
            <h2 className="section-label">{activePath.title}</h2>
            <div className="start-here-essays-grid">
              {activePath.essays.map((essay) => (
                <Link key={essay.slug} href={`/library/${essay.slug}`} className="start-here-essay-card">
                  <div className="start-here-essay-image">
                    <img src={essay.image} alt={essay.title} />
                  </div>
                  <div className="start-here-essay-content">
                    <h4>{essay.title}</h4>
                    <p>{essay.descriptor}</p>
                    <span className="text-link">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* No Path Selected - Show Default */}
        {!activePath && (
          <section className="start-here-default">
            <div className="start-here-featured">
              <Link href="/library/the-live-now-club" className="start-here-featured-card">
                <div className="start-here-featured-image">
                  <img src="/images/the-live-now-club.gif" alt="The Live Now Club" />
                </div>
                <div className="start-here-featured-content">
                  <span className="section-label">If you only read one thing</span>
                  <h3>The Live Now Club</h3>
                  <p>The manifesto that started it all. What it means to live like you mean it.</p>
                  <span className="text-link">Read →</span>
                </div>
              </Link>
            </div>
          </section>
        )}
      </main>

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

export default function StartHerePage() {
  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <StartHereContent />
    </Suspense>
  );
}
