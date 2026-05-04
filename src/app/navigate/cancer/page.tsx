import Link from "next/link";
import Header from "@/components/Header";
import { CANCER_GUIDE, getCancerGuideEssays, getCancerEssays } from "@/lib/essays";

// Essays that are truly practical guides (actionable, step-by-step)
const PRACTICAL_GUIDES = ["expecting-the-unexpected", "how-to-reset-your-nervous-system"];

// Key milestones in Louise's cancer journey
const JOURNEY_MILESTONES: Record<string, string> = {
  "embracing-free-fall": "The diagnosis",
  "you-cant-always-get-what-you-want": "When cancer returned",
  "maybe": "In remission",
};

// Format date as "Feb 14" or "Feb 14, 2025" for display
function formatDate(dateStr: string, includeYear = false): string {
  const date = new Date(dateStr + "T12:00:00");
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  if (includeYear) options.year = "numeric";
  return date.toLocaleDateString("en-US", options);
}

// Get year from date string
function getYear(dateStr: string): string {
  return dateStr.slice(0, 4);
}

export const metadata = {
  title: "Cancer Guide: Navigating Diagnosis, Treatment & Beyond | The Live Now Club",
  description:
    "A comprehensive guide to navigating cancer, written by a survivor. Practical advice for newly diagnosed patients, those in treatment, caregivers, and anyone seeking meaning through illness.",
  keywords: [
    "cancer guide",
    "cancer diagnosis",
    "cancer treatment",
    "cancer survivor",
    "cancer support",
    "cancer caregiver",
    "living with cancer",
    "coping with cancer",
    "cancer meditation",
    "cancer essays",
  ],
  openGraph: {
    title: "Cancer Guide: Navigating Diagnosis, Treatment & Beyond",
    description:
      "A comprehensive guide to navigating cancer, written by a survivor. Practical advice for newly diagnosed patients, those in treatment, and caregivers.",
    type: "website",
    url: "https://livenowclub.vercel.app/navigate/cancer",
  },
};

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Cancer Guide: Navigating Diagnosis, Treatment & Beyond",
  description:
    "A comprehensive guide to navigating cancer, written by a survivor. Practical advice for newly diagnosed patients, those in treatment, caregivers, and anyone seeking meaning through illness.",
  author: {
    "@type": "Person",
    name: "Louise Ireland",
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Just Diagnosed",
        description: "Everything I wish someone had told me at the start.",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "During Treatment",
        description: "Practical guidance and poetic musings for the hardest days.",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "For Caregivers",
        description: "How to support someone you love through this.",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Finding Meaning",
        description: "Making sense of it all.",
      },
    ],
  },
};

export default function NavigateCancerPage() {
  // Sort chronologically (oldest first) for the journey timeline
  const allCancerEssays = getCancerEssays().sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Header />

      <div className="navigate-container">
        {/* Breadcrumb */}
        <div className="navigate-breadcrumb">
          <Link href="/navigate">← Back</Link>
        </div>

        {/* Hero */}
        <section className="navigate-hero">
          <span className="navigate-label">Lou's Guide to Cancer</span>
          <h1>Everything I Wish Someone Had Told Me</h1>
          <p>
            A mix of practical guidance for navigating cancer diagnosis, treatment, and beyond combined with my own journey.
          </p>
          <div style={{ marginTop: "24px" }}>
            <Link
              href="/read/expecting-the-unexpected"
              className="btn btn--primary"
              style={{ marginRight: "12px" }}
            >
              Read the Full Guide
            </Link>
            <a
              href="/expecting-the-unexpected-guide.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary"
            >
              Download PDF
            </a>
          </div>
        </section>

        {/* Quick Links */}
        <section className="navigate-quick-links">
          <div className="quick-links-grid">
            {[
              { href: "/read/expecting-the-unexpected#before-you-start-treatment", num: "01", title: "Just Diagnosed", sub: "Start here" },
              { href: "/read/expecting-the-unexpected#treatment", num: "02", title: "During Treatment", sub: "Practical guidance" },
              { href: "/read/expecting-the-unexpected#how-do-you-support-a-friend-with-cancer", num: "03", title: "For Caregivers", sub: "Supporting someone" },
              { href: "/read/expecting-the-unexpected#survivorship", num: "04", title: "Living with Uncertainty", sub: "Holding it loosely" },
              { href: "/read/expecting-the-unexpected#core-principles", num: "05", title: "Core Principles", sub: "Essential guidance" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="quick-link-card">
                <span className="quick-link-number">{item.num}</span>
                <h3>{item.title}</h3>
                <p>{item.sub}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Just Diagnosed */}
        <section id="just-diagnosed" className="guide-section guide-section--white">
          <div className="guide-section-inner">
            <div className="guide-section-header">
              <span className="guide-section-number">01</span>
              <h2>{CANCER_GUIDE[0].title}</h2>
              <p>{CANCER_GUIDE[0].subtitle}</p>
            </div>
            <div className="guide-grid">
              {getCancerGuideEssays("just-diagnosed").map((essay, i) => (
                <Link
                  key={essay.slug}
                  href={`/read/${essay.slug}`}
                  className={`guide-card ${i === 0 ? "guide-card--featured" : ""}`}
                >
                  {essay.image && i === 0 && (
                    <div className="guide-card-image">
                      <img src={essay.image} alt={essay.title} />
                    </div>
                  )}
                  <div className="guide-card-content">
                    <span className="guide-card-type">
                      {PRACTICAL_GUIDES.includes(essay.slug) ? "Practical Guide" : essay.type}
                    </span>
                    <h3>{essay.title}</h3>
                    <p>{essay.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Cancer Meditations */}
        <section id="cancer-meditations" className="guide-section guide-section--dark">
          <div className="guide-section-inner">
            <div className="guide-section-header">
              <span className="guide-section-number">Series</span>
              <h2>{CANCER_GUIDE[1].title}</h2>
              <p>{CANCER_GUIDE[1].subtitle}</p>
            </div>
            <div className="guide-grid guide-grid--three">
              {getCancerGuideEssays("cancer-meditations").map((essay, i) => (
                <Link key={essay.slug} href={`/read/${essay.slug}`} className="guide-card guide-card--numbered">
                  <span className="guide-card-number">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{essay.title}</h3>
                  <p>{essay.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* During Treatment */}
        <section id="during-treatment" className="guide-section">
          <div className="guide-section-inner">
            <div className="guide-section-header">
              <span className="guide-section-number">02</span>
              <h2>{CANCER_GUIDE[2].title}</h2>
              <p>{CANCER_GUIDE[2].subtitle}</p>
            </div>
            <div className="guide-grid">
              {getCancerGuideEssays("during-treatment").map((essay) => (
                <Link key={essay.slug} href={`/read/${essay.slug}`} className="guide-card">
                  {essay.image && (
                    <div className="guide-card-image">
                      <img src={essay.image} alt={essay.title} />
                    </div>
                  )}
                  <div className="guide-card-content">
                    {PRACTICAL_GUIDES.includes(essay.slug) && (
                      <span className="guide-card-type">Practical Guide</span>
                    )}
                    <h3>{essay.title}</h3>
                    <p>{essay.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* For Caregivers */}
        <section id="for-caregivers" className="guide-section guide-section--warm">
          <div className="guide-section-inner">
            <div className="guide-section-header">
              <span className="guide-section-number">03</span>
              <h2>{CANCER_GUIDE[3].title}</h2>
              <p>{CANCER_GUIDE[3].subtitle}</p>
            </div>
            <div className="guide-grid guide-grid--three">
              {getCancerGuideEssays("for-caregivers").map((essay) => (
                <Link key={essay.slug} href={`/read/${essay.slug}`} className="guide-card">
                  <div className="guide-card-content">
                    <h3>{essay.title}</h3>
                    <p>{essay.excerpt}</p>
                    <span className="guide-card-cta">Read this →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Living with Uncertainty */}
        <section id="living-with-uncertainty" className="guide-section">
          <div className="guide-section-inner">
            <div className="guide-section-header">
              <span className="guide-section-number">04</span>
              <h2>{CANCER_GUIDE[5].title}</h2>
              <p>{CANCER_GUIDE[5].subtitle}</p>
            </div>
            <div className="guide-grid">
              {getCancerGuideEssays("living-with-uncertainty").map((essay) => (
                <Link key={essay.slug} href={`/read/${essay.slug}`} className="guide-card">
                  {essay.image && (
                    <div className="guide-card-image">
                      <img src={essay.image} alt={essay.title} />
                    </div>
                  )}
                  <div className="guide-card-content">
                    <h3>{essay.title}</h3>
                    <p>{essay.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Finding Meaning */}
        <section id="finding-meaning" className="guide-section guide-section--alt">
          <div className="guide-section-inner">
            <div className="guide-section-header">
              <span className="guide-section-number">05</span>
              <h2>{CANCER_GUIDE[6].title}</h2>
              <p>{CANCER_GUIDE[6].subtitle}</p>
            </div>
            <div className="guide-grid">
              {getCancerGuideEssays("finding-meaning").map((essay) => (
                <Link key={essay.slug} href={`/read/${essay.slug}`} className="guide-card">
                  {essay.image && (
                    <div className="guide-card-image">
                      <img src={essay.image} alt={essay.title} />
                    </div>
                  )}
                  <div className="guide-card-content">
                    <h3>{essay.title}</h3>
                    <p>{essay.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Helpful Resources */}
        <section className="guide-section guide-section--resources">
          <div className="guide-section-inner">
            <div className="guide-section-header">
              <span className="guide-section-number">Resources</span>
              <h2>Helpful Organizations & Tools</h2>
              <p>Organizations and resources mentioned in the comprehensive guide</p>
            </div>
            <div className="resources-grid">
              <div className="resource-category">
                <h3>Support & Community</h3>
                <ul className="resource-list">
                  <li>
                    <a href="https://imermanangels.org/" target="_blank" rel="noopener noreferrer">
                      <strong>Imerman Angels</strong>
                      <span>One-on-one cancer support matching you with a mentor</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.caringbridge.org/" target="_blank" rel="noopener noreferrer">
                      <strong>CaringBridge</strong>
                      <span>Free websites to share health updates with loved ones</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.mealtrain.com/" target="_blank" rel="noopener noreferrer">
                      <strong>Meal Train</strong>
                      <span>Organize meal support from friends and family</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="resource-category">
                <h3>Fertility Preservation</h3>
                <ul className="resource-list">
                  <li>
                    <a href="https://www.ccrm.com/" target="_blank" rel="noopener noreferrer">
                      <strong>CCRM Fertility</strong>
                      <span>Fertility clinic specializing in egg freezing</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://chickmission.com/" target="_blank" rel="noopener noreferrer">
                      <strong>Chick Mission</strong>
                      <span>Financial assistance for fertility preservation</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="resource-category">
                <h3>Mental Health & Meditation</h3>
                <ul className="resource-list">
                  <li>
                    <a href="https://drjoedispenza.com/" target="_blank" rel="noopener noreferrer">
                      <strong>Joe Dispenza</strong>
                      <span>Guided meditations for healing</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.monroeinstitute.org/pages/expand" target="_blank" rel="noopener noreferrer">
                      <strong>Expand by Monroe</strong>
                      <span>Meditation app with health-specific programs</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.calm.com/" target="_blank" rel="noopener noreferrer">
                      <strong>Calm</strong>
                      <span>Sleep stories and calming meditations</span>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.wakingup.com/" target="_blank" rel="noopener noreferrer">
                      <strong>Waking Up</strong>
                      <span>Meditation and philosophical discussions</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* All Cancer Writing - Chronological Timeline */}
        <section className="journey-section">
          <div className="journey-header">
            <h2>From the Start</h2>
            <p>from diagnosis to now</p>
          </div>
          <div className="journey-timeline">
            {allCancerEssays.map((essay, index) => {
              const milestone = JOURNEY_MILESTONES[essay.slug];
              const prevYear = index > 0 ? getYear(allCancerEssays[index - 1].date) : null;
              const currentYear = getYear(essay.date);
              const showYear = currentYear !== prevYear;

              return (
                <div key={essay.slug} className="journey-entry">
                  {showYear && <div className="journey-year">{currentYear}</div>}
                  {milestone ? (
                    <Link href={`/read/${essay.slug}`} className="journey-milestone">
                      <span className="journey-milestone-marker">{milestone}</span>
                      <span className="journey-milestone-title">{essay.title}</span>
                      <span className="journey-milestone-date">{formatDate(essay.date)}</span>
                    </Link>
                  ) : (
                    <Link href={`/read/${essay.slug}`} className="journey-item">
                      <span className="journey-item-date">{formatDate(essay.date)}</span>
                      <span className="journey-item-title">{essay.title}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="guide-footer-cta">
          <p>You're not alone in this.</p>
          <div className="guide-footer-buttons">
            <Link href="/connect" className="btn btn--primary">
              Share Your Story
            </Link>
            <a
              href="https://louiseireland.substack.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary"
            >
              Get Updates
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
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
