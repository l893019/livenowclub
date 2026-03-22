"use client";

import Link from "next/link";
import { CANCER_GUIDE, getCancerGuideEssays, getCancerEssays } from "@/lib/essays";

export default function NavigatePage() {
  const allCancerEssays = getCancerEssays();

  return (
    <>
      {/* Header */}
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

      <div className="navigate-page">
        {/* Hero */}
        <section className="navigate-hero">
          <span className="navigate-hero-label">Lou's Guide to Cancer</span>
          <h1>Everything I wish someone had told me.</h1>
          <p className="navigate-hero-subtitle">
            Practical guidance for navigating cancer and supporting those who are. Every piece here was written from the
            trenches.
          </p>
        </section>

        {/* Quick Links */}
        <section className="navigate-quick">
          <div className="quick-grid">
            <Link href="#just-diagnosed" className="quick-card">
              <span className="quick-icon">01</span>
              <h3>Just Diagnosed</h3>
              <p>Start here</p>
            </Link>
            <Link href="#during-treatment" className="quick-card">
              <span className="quick-icon">02</span>
              <h3>During Treatment</h3>
              <p>Practical guidance</p>
            </Link>
            <Link href="#for-caregivers" className="quick-card">
              <span className="quick-icon">03</span>
              <h3>For Caregivers</h3>
              <p>Supporting someone</p>
            </Link>
            <Link href="#finding-meaning" className="quick-card">
              <span className="quick-icon">04</span>
              <h3>Finding Meaning</h3>
              <p>Making sense of it</p>
            </Link>
          </div>
        </section>

        {/* Just Diagnosed - Featured */}
        <section id="just-diagnosed" className="navigate-section navigate-section--featured">
          <div className="section-header">
            <span className="section-number">01</span>
            <h2>{CANCER_GUIDE[0].title}</h2>
            <p>{CANCER_GUIDE[0].subtitle}</p>
          </div>
          <div className="featured-grid">
            {getCancerGuideEssays("just-diagnosed").map((essay, i) => (
              <Link
                key={essay.slug}
                href={`/read/${essay.slug}`}
                className={`featured-card ${i === 0 ? "featured-card--primary" : ""}`}
              >
                {essay.image && i === 0 && (
                  <div className="featured-card-image">
                    <img src={essay.image} alt="" />
                  </div>
                )}
                <div className="featured-card-content">
                  <span className="featured-card-type">{essay.type}</span>
                  <h3>{essay.title}</h3>
                  <p>{essay.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Cancer Meditations */}
        <section id="cancer-meditations" className="navigate-section navigate-section--dark">
          <div className="section-header">
            <span className="section-number">Series</span>
            <h2>{CANCER_GUIDE[1].title}</h2>
            <p>{CANCER_GUIDE[1].subtitle}</p>
          </div>
          <div className="meditations-scroll">
            {getCancerGuideEssays("cancer-meditations").map((essay, i) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="meditation-card">
                <span className="meditation-number">{String(i + 1).padStart(2, "0")}</span>
                <h3>{essay.title}</h3>
                <p className="meditation-excerpt">{essay.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* During Treatment */}
        <section id="during-treatment" className="navigate-section">
          <div className="section-header">
            <span className="section-number">02</span>
            <h2>{CANCER_GUIDE[2].title}</h2>
            <p>{CANCER_GUIDE[2].subtitle}</p>
          </div>
          <div className="guide-grid">
            {getCancerGuideEssays("during-treatment").map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="guide-card">
                {essay.image && (
                  <div className="guide-card-image">
                    <img src={essay.image} alt="" />
                  </div>
                )}
                <div className="guide-card-content">
                  <h3>{essay.title}</h3>
                  <p>{essay.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* For Caregivers */}
        <section id="for-caregivers" className="navigate-section navigate-section--accent">
          <div className="section-header">
            <span className="section-number">03</span>
            <h2>{CANCER_GUIDE[3].title}</h2>
            <p>{CANCER_GUIDE[3].subtitle}</p>
          </div>
          <div className="caregiver-grid">
            {getCancerGuideEssays("for-caregivers").map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="caregiver-card">
                <h3>{essay.title}</h3>
                <p>{essay.excerpt}</p>
                <span className="caregiver-cta">Read this &rarr;</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Finding Meaning */}
        <section id="finding-meaning" className="navigate-section">
          <div className="section-header">
            <span className="section-number">04</span>
            <h2>{CANCER_GUIDE[4].title}</h2>
            <p>{CANCER_GUIDE[4].subtitle}</p>
          </div>
          <div className="guide-grid">
            {getCancerGuideEssays("finding-meaning").map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="guide-card">
                {essay.image && (
                  <div className="guide-card-image">
                    <img src={essay.image} alt="" />
                  </div>
                )}
                <div className="guide-card-content">
                  <h3>{essay.title}</h3>
                  <p>{essay.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Browse All Cancer Writing */}
        <section className="navigate-browse">
          <h2>All Cancer Writing</h2>
          <p className="browse-count">{allCancerEssays.length} pieces</p>
          <div className="browse-list">
            {allCancerEssays.map((essay) => (
              <Link key={essay.slug} href={`/read/${essay.slug}`} className="browse-row">
                <span className="browse-type">{essay.type}</span>
                <span className="browse-title">{essay.title}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="navigate-footer">
          <p>You're not alone in this.</p>
          <a
            href="https://louiseireland.substack.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            Get updates &rarr;
          </a>
        </section>
      </div>

      {/* Floating Subscribe */}
      <div className="subscribe-float">
        <a href="https://louiseireland.substack.com/subscribe" target="_blank" rel="noopener noreferrer">
          Subscribe
        </a>
      </div>

      <style jsx>{`
        .navigate-page {
          min-height: 100vh;
          background: #faf6f1;
        }

        /* Hero */
        .navigate-hero {
          padding: 160px 24px 80px;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .navigate-hero-label {
          display: inline-block;
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #e84a8a;
          margin-bottom: 24px;
          padding: 8px 16px;
          border: 1px solid #e84a8a;
          border-radius: 20px;
        }

        .navigate-hero h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 500;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #1a1a1a;
          margin-bottom: 24px;
        }

        .navigate-hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.6;
          color: rgba(45, 42, 38, 0.7);
          max-width: 600px;
          margin: 0 auto;
        }

        /* Quick Links */
        .navigate-quick {
          padding: 0 24px 80px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .quick-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .quick-card {
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.06);
          padding: 24px;
          transition: all 0.2s;
          text-align: center;
        }

        .quick-card:hover {
          border-color: #e84a8a;
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .quick-icon {
          display: block;
          font-family: "JetBrains Mono", monospace;
          font-size: 24px;
          font-weight: 600;
          color: #e84a8a;
          margin-bottom: 12px;
        }

        .quick-card h3 {
          font-size: 1rem;
          font-weight: 500;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .quick-card p {
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          color: rgba(45, 42, 38, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Section styles */
        .navigate-section {
          padding: 80px 24px;
        }

        .navigate-section--featured {
          background: white;
        }

        .navigate-section--dark {
          background: #1a1a1a;
          color: white;
        }

        .navigate-section--accent {
          background: linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%);
        }

        .section-header {
          max-width: 900px;
          margin: 0 auto 40px;
        }

        .section-number {
          display: block;
          font-family: "JetBrains Mono", monospace;
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #e84a8a;
          margin-bottom: 12px;
        }

        .navigate-section--dark .section-number {
          color: #e84a8a;
        }

        .section-header h2 {
          font-size: 2rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          margin-bottom: 8px;
        }

        .navigate-section--dark .section-header h2 {
          color: white;
        }

        .section-header p {
          font-size: 1.125rem;
          color: rgba(45, 42, 38, 0.7);
        }

        .navigate-section--dark .section-header p {
          color: rgba(255, 255, 255, 0.6);
        }

        /* Featured Grid */
        .featured-grid {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .featured-card {
          background: #faf6f1;
          border: 1px solid rgba(0, 0, 0, 0.06);
          overflow: hidden;
          transition: all 0.2s;
        }

        .featured-card:hover {
          border-color: #e84a8a;
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .featured-card--primary {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .featured-card-image {
          aspect-ratio: 16/10;
          overflow: hidden;
        }

        .featured-card--primary .featured-card-image {
          aspect-ratio: auto;
        }

        .featured-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .featured-card-content {
          padding: 24px;
        }

        .featured-card--primary .featured-card-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .featured-card-type {
          display: block;
          font-family: "JetBrains Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #e84a8a;
          margin-bottom: 8px;
        }

        .featured-card h3 {
          font-size: 1.25rem;
          font-weight: 500;
          line-height: 1.3;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .featured-card--primary h3 {
          font-size: 1.75rem;
        }

        .featured-card p {
          font-size: 0.9rem;
          line-height: 1.5;
          color: rgba(45, 42, 38, 0.7);
        }

        /* Meditations */
        .meditations-scroll {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .meditation-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 24px;
          transition: all 0.2s;
        }

        .meditation-card:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #e84a8a;
        }

        .meditation-number {
          display: block;
          font-family: "JetBrains Mono", monospace;
          font-size: 32px;
          font-weight: 600;
          color: #e84a8a;
          margin-bottom: 12px;
        }

        .meditation-card h3 {
          font-size: 1rem;
          font-weight: 500;
          color: white;
          margin-bottom: 8px;
        }

        .meditation-excerpt {
          font-size: 0.85rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Guide Grid */
        .guide-grid {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .guide-card {
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.06);
          overflow: hidden;
          transition: all 0.2s;
        }

        .guide-card:hover {
          border-color: #e84a8a;
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .guide-card-image {
          aspect-ratio: 16/9;
          overflow: hidden;
        }

        .guide-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .guide-card-content {
          padding: 20px;
        }

        .guide-card h3 {
          font-size: 1.125rem;
          font-weight: 500;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .guide-card p {
          font-size: 0.9rem;
          line-height: 1.5;
          color: rgba(45, 42, 38, 0.7);
        }

        /* Caregiver Grid */
        .caregiver-grid {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .caregiver-card {
          background: white;
          padding: 28px;
          transition: all 0.2s;
        }

        .caregiver-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
        }

        .caregiver-card h3 {
          font-size: 1.125rem;
          font-weight: 500;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        .caregiver-card p {
          font-size: 0.9rem;
          line-height: 1.5;
          color: rgba(45, 42, 38, 0.7);
          margin-bottom: 16px;
        }

        .caregiver-cta {
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          letter-spacing: 0.05em;
          color: #e84a8a;
          font-weight: 500;
        }

        /* Browse */
        .navigate-browse {
          padding: 80px 24px;
          max-width: 800px;
          margin: 0 auto;
        }

        .navigate-browse h2 {
          font-size: 1.5rem;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .browse-count {
          font-family: "JetBrains Mono", monospace;
          font-size: 12px;
          color: rgba(45, 42, 38, 0.5);
          margin-bottom: 24px;
        }

        .browse-list {
          display: flex;
          flex-direction: column;
        }

        .browse-row {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 16px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(45, 42, 38, 0.08);
          transition: all 0.2s;
        }

        .browse-row:hover {
          padding-left: 8px;
        }

        .browse-type {
          font-family: "JetBrains Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(45, 42, 38, 0.5);
        }

        .browse-title {
          font-size: 1rem;
          color: #1a1a1a;
        }

        .browse-row:hover .browse-title {
          color: #e84a8a;
        }

        /* Footer */
        .navigate-footer {
          text-align: center;
          padding: 80px 24px;
          background: white;
          border-top: 1px solid rgba(45, 42, 38, 0.08);
        }

        .navigate-footer p {
          font-size: 1.25rem;
          color: rgba(45, 42, 38, 0.7);
          margin-bottom: 24px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .quick-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .featured-card--primary {
            grid-template-columns: 1fr;
          }

          .meditations-scroll {
            grid-template-columns: 1fr;
          }

          .guide-grid {
            grid-template-columns: 1fr;
          }

          .caregiver-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
