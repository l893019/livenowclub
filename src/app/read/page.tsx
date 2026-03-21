import Link from "next/link";
import { essays, formatDate } from "@/data/essays";

export const metadata = {
  title: "Read | The Live Now Club",
  description: "Essays on life, love, cancer, and the relentless pursuit of joy.",
};

// Key essays for the reading pathways
const HERO_ESSAY = {
  slug: "embracing-free-fall",
  title: "Embracing Free Fall",
  excerpt: "There isn't any easy way to say it, so I'll just say it: I have cervical cancer. It's invasive, seemingly advanced, and terrifying.",
  substackUrl: "https://louiseireland.substack.com/p/embracing-free-fall",
};

const START_HERE = [
  {
    type: "If you're facing cancer",
    slug: "cancer-meditations",
    title: "Cancer Meditations",
    subtitle: "The descent into the liminal space",
    substackUrl: "https://louiseireland.substack.com/p/cancer-meditations",
  },
  {
    type: "If you're supporting someone",
    slug: "fixing-the-unfixable",
    title: "Fixing the Unfixable",
    subtitle: "For those supporting someone with cancer",
    substackUrl: "https://louiseireland.substack.com/p/fixing-the-unfixable",
  },
  {
    type: "If you want to feel alive",
    slug: "the-live-now-club",
    title: "The Live Now Club",
    subtitle: "Because now is all we have",
    substackUrl: "https://louiseireland.substack.com/p/the-live-now-club",
  },
];

const CANCER_MEDITATIONS = [
  { num: "I", slug: "cancer-meditations", title: "The Descent", substackUrl: "https://louiseireland.substack.com/p/cancer-meditations" },
  { num: "II", slug: "cancer-meditations-ii", title: "Into the Wilderness", substackUrl: "https://louiseireland.substack.com/p/cancer-meditations-ii" },
  { num: "III", slug: "cancer-meditations-iii", title: "Diving to Darkness", substackUrl: "https://louiseireland.substack.com/p/cancer-meditations-iii" },
  { num: "IV", slug: "cancer-meditations-iv", title: "On the Battlefield", substackUrl: "https://louiseireland.substack.com/p/cancer-meditations-iv" },
  { num: "V", slug: "cancer-meditations-v", title: "The Reckoning", substackUrl: "https://louiseireland.substack.com/p/cancer-meditations-v" },
  { num: "VI", slug: "cancer-meditations-vi", title: "The Return", substackUrl: "https://louiseireland.substack.com/p/cancer-meditations-vi" },
];

// Get latest essays (excluding cancer meditations series)
const latestEssays = essays
  .filter(e => !e.slug.startsWith("cancer-meditations"))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 5);

// Group essays by theme
const themes = {
  life: {
    title: "Joy & Mortality",
    description: "Writing on being alive when you know time is short",
    essays: essays.filter(e => e.section === "life").slice(0, 6),
  },
  guides: {
    title: "Practical Wisdom",
    description: "What I wish someone had told me",
    essays: essays.filter(e => e.section === "guides"),
  },
  philosophy: {
    title: "Questions That Matter",
    description: "On meaning, presence, and what remains",
    essays: essays.filter(e => e.section === "philosophy"),
  },
};

function getSubstackUrl(slug: string): string {
  return `https://louiseireland.substack.com/p/${slug}`;
}

export default function ReadPage() {
  return (
    <>
      <Header />
      <main className="read-page">
        {/* HERO: The Origin Story */}
        <section className="read-hero">
          <a
            href={HERO_ESSAY.substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="read-hero-link"
          >
            <span className="read-hero-label">Where It Began</span>
            <h1 className="read-hero-title">{HERO_ESSAY.title}</h1>
            <p className="read-hero-excerpt">"{HERO_ESSAY.excerpt}"</p>
            <span className="read-hero-cta">Read the essay →</span>
          </a>
        </section>

        {/* START HERE: 3 Entry Points */}
        <section className="read-section">
          <div className="read-section-header">
            <h2>Start Here</h2>
            <p>Three doorways into this body of work</p>
          </div>
          <div className="read-start-here">
            {START_HERE.map((entry) => (
              <a
                key={entry.slug}
                href={entry.substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="start-here-card"
              >
                <span className="start-here-type">{entry.type}</span>
                <h3>{entry.title}</h3>
                <p className="start-here-subtitle">{entry.subtitle}</p>
              </a>
            ))}
          </div>
        </section>

        {/* CANCER MEDITATIONS: The Series */}
        <section className="read-section read-section--series">
          <div className="read-section-header">
            <h2>Cancer Meditations</h2>
            <p>A six-part series written during treatment</p>
          </div>
          <div className="meditations-series">
            {CANCER_MEDITATIONS.map((med) => (
              <a
                key={med.slug}
                href={med.substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="meditation-card"
              >
                <span className="meditation-num">{med.num}</span>
                <span className="meditation-title">{med.title}</span>
              </a>
            ))}
          </div>
        </section>

        {/* LATEST */}
        <section className="read-section read-section--latest">
          <div className="read-section-header">
            <h2>Latest Writing</h2>
          </div>
          <div className="read-latest">
            {latestEssays.map((essay) => (
              <a
                key={essay.slug}
                href={getSubstackUrl(essay.slug)}
                target="_blank"
                rel="noopener noreferrer"
                className="latest-card"
              >
                <span className="latest-date">{formatDate(essay.date)}</span>
                <h3>{essay.title}</h3>
              </a>
            ))}
          </div>
        </section>

        {/* BROWSE BY THEME */}
        <section className="read-section">
          <div className="read-section-header">
            <h2>Browse by Theme</h2>
          </div>

          {Object.entries(themes).map(([key, theme]) => (
            <div key={key} className="read-category">
              <h3 className="read-category-title">{theme.title}</h3>
              <p className="read-category-desc">{theme.description}</p>
              <div className="read-category-grid">
                {theme.essays.map((essay) => (
                  <a
                    key={essay.slug}
                    href={getSubstackUrl(essay.slug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="browse-card"
                  >
                    <h4>{essay.title}</h4>
                    {essay.subtitle && (
                      <p className="browse-excerpt">{essay.subtitle}</p>
                    )}
                    <span className="browse-date">{formatDate(essay.date)}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ALL ESSAYS CTA */}
        <section className="read-section" style={{ textAlign: "center", paddingBottom: "4rem" }}>
          <a
            href="https://louiseireland.substack.com/archive"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            View All Essays on Substack
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header className="header scrolled">
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
  );
}

function Footer() {
  return (
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
  );
}
