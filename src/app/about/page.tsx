"use client";

import Link from "next/link";
import Header from "@/components/Header";


export default function AboutPage() {
  return (
    <>
      <Header />

      <div className="about-container">
        {/* Hero */}
        <section className="about-hero">
          <div className="about-hero-image">
            <img src="/images/louise-teal-veil.jpg" alt="Louise Ireland" />
          </div>
          <div className="about-hero-content">
            <span className="about-label">About</span>
            <h1>I'm Louise.</h1>
          </div>
        </section>

        {/* Introduction */}
        <section className="about-section">
          <p className="about-intro">
            I'm Louise. I am a person of many verbs <span className="verbs">(writer, founder, investor, painter, experience designer)</span> who is working on being just a noun <span className="noun">(human)</span>. I created this space to start more conversations around life, loss, illness, and the choice to choose joy every time.
          </p>
        </section>

        {/* Cancer Journey */}
        <section className="about-section about-section--story">
          <div className="about-section-content">
            <p>
              In February 2025, my world was turned upside down. At age 34, I was diagnosed with Stage III cervical cancer out of nowhere, my only symptom being an abnormal period. I underwent a brutal round of external and internal radiation and chemotherapy that completely debilitated me, only to learn a few months after that it hadn't completely worked. My cancer had progressed across my body to multiple organs, putting me in Stage IVB. I was given less than two years to live.
            </p>
            <p>
              I went through another round of several chemotherapies, immunotherapies, and an experimental vaccine. I received news in early 2026 that I no longer have active cancer in my body, but I am aware of the statistics around recurrence, so I am holding everything lightly.
            </p>
            <Link href="/navigate/cancer" className="about-link">
              Read more about my journey with cancer <span>→</span>
            </Link>
          </div>
        </section>

        {/* Self-Love */}
        <section className="about-section">
          <div className="about-section-content">
            <p className="about-belief">
              I believe deeply that the purpose of our lives is to find peace in our souls.
            </p>
            <p>
              I made a pact with myself on February 13, 2022, to do whatever it would take.
            </p>
            <Link href="/read/i-love-lou" className="about-link">
              Read more about my journey to self-love <span>→</span>
            </Link>
          </div>
        </section>

        {/* Writing */}
        <section className="about-section about-section--writing">
          <div className="about-section-content">
            <p>
              I write primarily for myself, but it means the world to know that it helps others in some way. I try to write bi-weekly, sometimes weekly, most often on Sundays, but sometimes it slips. I wax poetic about life, love, and the magic of the world. I am endlessly curious and always creating something, so this is a hub for anything that sparks my fancy.
            </p>
            <Link href="/navigate/life" className="about-link">
              Read more about who I am at my core <span>→</span>
            </Link>
          </div>
        </section>

        {/* Location */}
        <section className="about-section about-section--location">
          <p className="about-location">
            I am most often found between San Francisco, airplanes, somewhere in the woods, the liminal spaces of hospitals, events I am creating, and the Pacific and Atlantic oceans.
          </p>
        </section>

        {/* Newsletter */}
        <section className="about-newsletter">
          <h3>Stay in touch</h3>
          <p>Essays on mortality and joy, delivered to your inbox.</p>
          <iframe
            src="https://louiseireland.substack.com/embed"
            width="100%"
            height="150"
            style={{ border: "none", background: "transparent" }}
            frameBorder="0"
            scrolling="no"
          />
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

      <style jsx>{`
        .about-container {
          min-height: 100vh;
          background: var(--cream, #faf6f1);
        }

        .about-hero {
          position: relative;
          height: 85vh;
          min-height: 500px;
          max-height: 900px;
          overflow: hidden;
        }

        .about-hero-image {
          position: absolute;
          inset: 0;
        }

        .about-hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
        }

        .about-hero-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 60px 24px;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
          text-align: center;
        }

        .about-label {
          display: block;
          font-family: "Space Grotesk", sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 16px;
        }

        .about-hero h1 {
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 300;
          color: white;
          letter-spacing: -0.02em;
        }

        .about-section {
          max-width: 640px;
          margin: 0 auto;
          padding: 48px 24px;
        }

        .about-intro {
          font-size: 1.25rem;
          line-height: 1.8;
          color: var(--charcoal, #2d2a26);
          text-align: center;
        }

        .verbs {
          color: var(--pink, #E8178A);
          font-style: italic;
        }

        .noun {
          color: var(--sage, #7a8b72);
          font-weight: 500;
        }

        .louise-link {
          color: var(--charcoal, #2d2a26);
          text-decoration: none;
          border-bottom: 1px solid var(--pink, #E8178A);
          transition: color 0.2s ease;
        }

        .louise-link:hover {
          color: var(--pink, #E8178A);
        }

        .about-section--story {
          border-top: 1px solid rgba(45, 42, 38, 0.1);
        }

        .about-section-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .about-section-content p {
          font-size: 1.0625rem;
          line-height: 1.8;
          color: rgba(45, 42, 38, 0.85);
        }

        .about-belief {
          font-size: 1.375rem !important;
          font-style: italic;
          color: var(--charcoal, #2d2a26) !important;
          text-align: center;
          padding: 24px 0;
        }

        .about-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: "Space Grotesk", sans-serif;
          font-size: 0.9375rem;
          color: var(--pink, #E8178A);
          text-decoration: none;
          transition: gap 0.2s ease;
        }

        .about-link:hover {
          gap: 12px;
        }

        .about-link span {
          transition: transform 0.2s ease;
        }

        .about-link:hover span {
          transform: translateX(4px);
        }

        .about-section--writing {
          background: white;
          max-width: none;
          padding: 60px 24px;
        }

        .about-section--writing .about-section-content {
          max-width: 640px;
          margin: 0 auto;
        }

        .about-section--location {
          border-top: 1px solid rgba(45, 42, 38, 0.1);
          padding-top: 60px;
          padding-bottom: 60px;
        }

        .about-location {
          font-size: 1.125rem;
          font-style: italic;
          line-height: 1.8;
          color: rgba(45, 42, 38, 0.7);
          text-align: center;
        }

        .about-newsletter {
          max-width: 480px;
          margin: 0 auto;
          padding: 48px 24px 80px;
          text-align: center;
          border-top: 1px solid rgba(45, 42, 38, 0.1);
        }

        .about-newsletter h3 {
          font-size: 1.25rem;
          font-weight: 400;
          color: var(--charcoal, #2d2a26);
          margin-bottom: 8px;
        }

        .about-newsletter p {
          color: rgba(45, 42, 38, 0.6);
          margin-bottom: 24px;
        }

        @media (max-width: 768px) {
          .about-hero {
            height: 70vh;
            min-height: 400px;
          }

          .about-hero-image img {
            object-position: center 15%;
          }

          .about-hero-content {
            padding: 40px 20px;
          }

          .about-section {
            padding: 32px 20px;
          }

          .about-intro {
            font-size: 1.125rem;
          }

          .about-section-content p {
            font-size: 1rem;
          }

          .about-belief {
            font-size: 1.125rem !important;
          }

          .about-section--writing {
            padding: 40px 20px;
          }

          .about-section--location {
            padding: 40px 20px;
          }

          .about-newsletter {
            padding: 40px 20px 60px;
          }
        }
      `}</style>
    </>
  );
}
