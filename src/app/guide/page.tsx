"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// ============================================
// THE GUIDE - Structured Sections
// ============================================

const GUIDE_SECTIONS = [
  {
    id: "beginning",
    number: "01",
    title: "The Beginning",
    subtitle: "When everything changes",
    description: "These are the essays I wrote when my life became real. For when you need words for the impossible.",
    essays: [
      { slug: "expecting-the-unexpected", title: "Expecting the Unexpected", descriptor: "The essay I wrote after my diagnosis" },
      { slug: "the-live-now-club", title: "The Live Now Club", descriptor: "The manifesto that started it all" },
      { slug: "soulmd", title: "Soul.md", descriptor: "A document to define your deepest self" },
    ],
  },
  {
    id: "navigating",
    number: "02",
    title: "Navigating Crisis",
    subtitle: "Finding your way through",
    description: "The Cancer Meditations and the essays that helped me survive treatment. Real-time dispatches from the hard parts.",
    essays: [
      { slug: "cancer-meditations", title: "Cancer Meditations", descriptor: "Six meditations written during treatment" },
      { slug: "how-to-reset-your-nervous-system", title: "How to Reset Your Nervous System", descriptor: "Practical tools for when you're overwhelmed" },
      { slug: "it-takes-a-village", title: "It Takes a Village", descriptor: "On letting people help you" },
      { slug: "i-need-you-to-hold-my-hand", title: "I Need You to Hold My Hand", descriptor: "On needing support when you're scared" },
    ],
  },
  {
    id: "processing",
    number: "03",
    title: "Processing Loss",
    subtitle: "Grief, anger, and letting go",
    description: "We all carry something heavy. These essays honor that weight while helping you move through it.",
    essays: [
      { slug: "the-other-side-of-grief", title: "The Other Side of Grief", descriptor: "What I learned from loss" },
      { slug: "you-cant-always-get-what-you-want", title: "You Can't Always Get What You Want", descriptor: "On wanting things you can't have" },
      { slug: "when-it-all-falls-out", title: "When It All Falls Out", descriptor: "On losing what defined you" },
      { slug: "fixing-the-unfixable", title: "Fixing the Unfixable", descriptor: "What to say when there's nothing you can say" },
    ],
  },
  {
    id: "finding-joy",
    number: "04",
    title: "Finding Joy",
    subtitle: "Because life is also beautiful",
    description: "Even in darkness, there is light. These pieces remind us to let the good in.",
    essays: [
      { slug: "and-still-the-figs-ripen", title: "And Still the Figs Ripen", descriptor: "On finding joy in small things" },
      { slug: "the-case-for-magical-thinking", title: "The Case for Magical Thinking", descriptor: "Why I believe in things I can't prove" },
      { slug: "the-butterfly-dream", title: "The Butterfly Dream", descriptor: "A moment of transcendence" },
      { slug: "life-is-not-empty", title: "Life is not empty", descriptor: "On finding fullness in uncertainty" },
    ],
  },
  {
    id: "wisdom",
    number: "05",
    title: "Hard-Won Wisdom",
    subtitle: "The deeper questions",
    description: "Meaning, identity, purpose. The questions that matter most when time feels short.",
    essays: [
      { slug: "all-i-want-for-my-birthday-is-another-shot-at-life", title: "All I Want for My Birthday", descriptor: "On wanting more time" },
      { slug: "i-wrote-this-with-my-eyes", title: "I Wrote This With My Eyes", descriptor: "On seeing clearly for the first time" },
      { slug: "things-ive-learned-lately", title: "Things I've Learned Lately", descriptor: "Lessons from the hard road" },
      { slug: "the-starting-line", title: "The Starting Line", descriptor: "On beginning again" },
    ],
  },
  {
    id: "self-love",
    number: "06",
    title: "Self-Love",
    subtitle: "The most important relationship",
    description: "Learning to love yourself when everything is hard. The foundation for everything else.",
    essays: [
      { slug: "i-love-lou", title: "I Love Lou", descriptor: "A love letter to myself" },
      { slug: "how-to-travel-alone", title: "How to Travel Alone", descriptor: "On being your own companion" },
      { slug: "reset-rebirth", title: "Reset, Rebirth", descriptor: "On starting over" },
      { slug: "on-friendship-and-couches", title: "On Friendship and Couches", descriptor: "The people who show up" },
    ],
  },
  {
    id: "poems",
    number: "07",
    title: "Poems",
    subtitle: "Beauty in a breath",
    description: "Brief meditations. For when you need beauty without explanation.",
    essays: [
      { slug: "sea-glass", title: "Sea Glass", descriptor: "A poem about transformation" },
      { slug: "dry-lightning", title: "Dry Lightning", descriptor: "On wanting what's dangerous" },
      { slug: "the-ebb", title: "The Ebb", descriptor: "On letting go" },
      { slug: "in-case-you-forget", title: "In Case You Forget", descriptor: "A reminder" },
    ],
  },
];

// ============================================
// COMPONENT
// ============================================

export default function GuidePage() {
  const pathname = usePathname();

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
      <main className="guide-page">
        <div className="guide-intro">
          <h1>The Guide</h1>
          <p className="guide-intro-subtitle">
            A structured path through crisis and meaning-making
          </p>
          <p className="guide-intro-desc">
            Seven sections. Fifty essays. One journey from shock to integration.
            Read in order, or jump to what you need most.
          </p>
        </div>

        {/* Table of Contents */}
        <nav className="guide-toc">
          {GUIDE_SECTIONS.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="guide-toc-item">
              <span className="guide-toc-number">{section.number}</span>
              <span className="guide-toc-title">{section.title}</span>
            </a>
          ))}
        </nav>

        {/* Sections */}
        <div className="guide-sections">
          {GUIDE_SECTIONS.map((section) => (
            <section key={section.id} id={section.id} className="guide-section">
              <div className="guide-section-header">
                <span className="guide-section-number">{section.number}</span>
                <div>
                  <h2>{section.title}</h2>
                  <p className="guide-section-subtitle">{section.subtitle}</p>
                </div>
              </div>
              <p className="guide-section-desc">{section.description}</p>
              <div className="guide-section-essays">
                {section.essays.map((essay, idx) => (
                  <Link key={essay.slug} href={`/library/${essay.slug}`} className="guide-essay-item">
                    <span className="guide-essay-number">{idx + 1}</span>
                    <div className="guide-essay-content">
                      <h4>{essay.title}</h4>
                      <p>{essay.descriptor}</p>
                    </div>
                    <span className="guide-essay-arrow">→</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="guide-footer-cta">
          <p>Ready to begin?</p>
          <Link href="/library/the-live-now-club" className="btn btn--primary">
            Start with The Manifesto
          </Link>
        </div>
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
