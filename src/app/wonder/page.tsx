"use client";

import Link from "next/link";

// Note: metadata moved to layout.tsx for client component
const pageMetadata = {
  title: "Wonder | The Live Now Club",
  description: "Explorations at the intersection of AI, humanity, and meaning.",
};

// AI content - philosophy and projects
const AI_ESSAYS = [
  {
    slug: "/wonder/essay",
    title: "After Abundance",
    subtitle: "When Purpose Is All We Have Left",
    description: "What more than 200 science fiction books reveal about human purpose when scarcity ends.",
    image: "/wonder/assets/landscapes/optimized/1.jpg",
    type: "essay",
  },
];

// Future: AI projects/experiments will go here
const AI_PROJECTS: { title: string; description: string; link: string; status: string }[] = [
  // { title: "Project Name", description: "What it does", link: "/wonder/project", status: "live" },
];

export default function WonderPage() {
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
          <Link href="/wonder" className="active">Wonder</Link>
          <Link href="/connect">Connect</Link>
        </nav>
      </header>

      <div className="wonder-container">
        {/* Hero */}
        <section className="wonder-hero">
          <span className="wonder-label">Wonder</span>
          <h1>What happens when machines dream?</h1>
          <p>
            Explorations at the intersection of AI, humanity, and meaning.
            Essays that ask big questions. Projects that experiment with answers.
          </p>
        </section>

        {/* Essays Section */}
        <section className="wonder-section">
          <h2 className="wonder-section-title">Essays</h2>
          <div className="wonder-essays-grid">
            {AI_ESSAYS.map((essay) => (
              <Link key={essay.slug} href={essay.slug} className="wonder-essay-card">
                <div className="wonder-essay-image">
                  <img src={essay.image} alt={essay.title} />
                </div>
                <div className="wonder-essay-content">
                  <span className="wonder-essay-type">{essay.type}</span>
                  <h3>{essay.title}</h3>
                  {essay.subtitle && <p className="wonder-essay-subtitle">{essay.subtitle}</p>}
                  <p className="wonder-essay-description">{essay.description}</p>
                  <span className="text-link">Read →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Projects Section - hidden until there are projects */}
        {AI_PROJECTS.length > 0 && (
          <section className="wonder-section">
            <h2 className="wonder-section-title">Projects</h2>
            <div className="wonder-projects-grid">
              {AI_PROJECTS.map((project) => (
                <a key={project.title} href={project.link} className="wonder-project-card" target="_blank" rel="noopener noreferrer">
                  <div className="wonder-project-status">{project.status}</div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span className="text-link">Explore →</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Coming Soon placeholder */}
        <section className="wonder-coming-soon">
          <p>More explorations coming soon.</p>
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
        .wonder-container {
          min-height: 100vh;
          background: var(--cream, #faf6f1);
          padding: 120px 24px 80px;
        }

        .wonder-hero {
          max-width: 700px;
          margin: 0 auto 80px;
          text-align: center;
        }

        .wonder-label {
          display: block;
          font-family: "Space Grotesk", sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #E8178A;
          margin-bottom: 24px;
        }

        .wonder-hero h1 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 300;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: #2d2a26;
          margin-bottom: 24px;
        }

        .wonder-hero p {
          font-size: 1.125rem;
          color: rgba(45, 42, 38, 0.7);
          line-height: 1.7;
        }

        .wonder-section {
          max-width: 900px;
          margin: 0 auto 80px;
        }

        .wonder-section-title {
          font-family: "Space Grotesk", sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(45, 42, 38, 0.45);
          margin-bottom: 32px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(45, 42, 38, 0.1);
        }

        .wonder-essays-grid {
          display: grid;
          gap: 32px;
        }

        .wonder-essay-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.06);
          overflow: hidden;
          transition: all 0.3s;
        }

        .wonder-essay-card:hover {
          border-color: var(--pink, #e84a8a);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
          transform: translateY(-4px);
        }

        .wonder-essay-image {
          aspect-ratio: 16/10;
          overflow: hidden;
        }

        .wonder-essay-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .wonder-essay-content {
          padding: 32px 32px 32px 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .wonder-essay-type {
          font-family: "Space Grotesk", sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #E8178A;
          margin-bottom: 12px;
        }

        .wonder-essay-content h3 {
          font-size: 1.75rem;
          font-weight: 300;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: #2d2a26;
          margin-bottom: 8px;
        }

        .wonder-essay-subtitle {
          font-size: 1.125rem;
          font-style: italic;
          color: rgba(45, 42, 38, 0.7);
          margin-bottom: 16px;
        }

        .wonder-essay-description {
          font-size: 1rem;
          color: rgba(45, 42, 38, 0.6);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .wonder-projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .wonder-project-card {
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.06);
          padding: 32px;
          transition: all 0.2s;
        }

        .wonder-project-card:hover {
          border-color: var(--pink, #e84a8a);
          transform: translateY(-4px);
        }

        .wonder-project-status {
          display: inline-block;
          font-family: "Space Grotesk", sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          background: rgba(122, 139, 114, 0.1);
          color: #7a8b72;
          padding: 4px 8px;
          border-radius: 2px;
          margin-bottom: 16px;
        }

        .wonder-project-card h3 {
          font-size: 1.25rem;
          font-weight: 400;
          margin-bottom: 12px;
          color: #2d2a26;
        }

        .wonder-project-card p {
          font-size: 0.95rem;
          color: rgba(45, 42, 38, 0.6);
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .wonder-coming-soon {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          padding: 60px 0;
          border-top: 1px solid rgba(45, 42, 38, 0.1);
        }

        .wonder-coming-soon p {
          font-family: "Space Grotesk", sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(45, 42, 38, 0.45);
        }

        @media (max-width: 768px) {
          .wonder-essay-card {
            grid-template-columns: 1fr;
          }

          .wonder-essay-content {
            padding: 24px;
          }
        }
      `}</style>
    </>
  );
}
