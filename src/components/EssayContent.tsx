"use client";

import Link from "next/link";
import type { Essay } from "@/lib/essays";

type EssayContentProps = {
  essay: Essay;
  relatedEssays?: Essay[];
};

export default function EssayContent({ essay, relatedEssays = [] }: EssayContentProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  // Convert markdown to basic HTML
  const contentHtml = essay.content
    .split("\n")
    .map((line) => {
      if (line.startsWith("# ") || line.includes("Originally published")) return "";
      if (line.startsWith("## ")) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith("### ")) return `<h3>${line.slice(4)}</h3>`;
      if (line.trim() === "---") return "<hr />";
      if (line.startsWith("> ")) return `<blockquote>${line.slice(2)}</blockquote>`;
      let processed = line
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/_(.+?)_/g, "<em>$1</em>");
      if (line.trim() === "") return "</p><p>";
      return processed;
    })
    .join("\n");

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

      <div className="essay-page">
        {/* Back Button */}
        <Link href="/read" className="essay-back">
          ← Back to all
        </Link>

        {/* Header */}
        <header className="essay-header">
          <span className="essay-header-meta">{essay.type}</span>
          <h1>{essay.title}</h1>
          {essay.subtitle && <p className="essay-header-subtitle">{essay.subtitle}</p>}
          <time className="essay-header-date">{formatDate(essay.date)}</time>
        </header>

        {/* Hero Image */}
        {essay.image && (
          <div className="essay-hero-image">
            <img src={essay.image} alt="" />
          </div>
        )}

        {/* Content */}
        <article className="essay-content" dangerouslySetInnerHTML={{ __html: `<p>${contentHtml}</p>` }} />

        {/* Read Next */}
        {relatedEssays.length > 0 && (
          <section className="essay-read-next">
            <h2>Read Next</h2>
            <div className="read-next-grid">
              {relatedEssays.map((related) => (
                <Link key={related.slug} href={`/read/${related.slug}`} className="read-next-card">
                  {related.image && (
                    <div className="read-next-image">
                      <img src={related.image} alt="" />
                    </div>
                  )}
                  <div className="read-next-content">
                    <span className="read-next-type">{related.type}</span>
                    <h3>{related.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="essay-footer">
          <p>Continue the conversation</p>
          <a
            href="https://louiseireland.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            Read on Substack →
          </a>
        </footer>
      </div>

      {/* Floating Subscribe */}
      <div className="subscribe-float">
        <a href="https://louiseireland.substack.com/subscribe" target="_blank" rel="noopener noreferrer">
          Subscribe
        </a>
      </div>

      <style jsx>{`
        .essay-page {
          min-height: 100vh;
          background: #faf6f1;
          padding: 120px 24px 80px;
        }

        .essay-back {
          display: inline-block;
          font-family: "JetBrains Mono", monospace;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(45, 42, 38, 0.6);
          margin-bottom: 60px;
          transition: color 0.2s;
        }

        .essay-back:hover {
          color: #e84a8a;
        }

        .essay-header {
          max-width: 700px;
          margin: 0 auto 48px;
          text-align: center;
        }

        .essay-header-meta {
          display: block;
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #e84a8a;
          margin-bottom: 16px;
        }

        .essay-header h1 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 500;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #1a1a1a;
          margin-bottom: 12px;
        }

        .essay-header-subtitle {
          font-size: 1.25rem;
          font-style: italic;
          color: rgba(45, 42, 38, 0.7);
          margin-bottom: 16px;
        }

        .essay-header-date {
          font-family: "JetBrains Mono", monospace;
          font-size: 12px;
          color: rgba(45, 42, 38, 0.5);
        }

        .essay-hero-image {
          max-width: 900px;
          margin: 0 auto 48px;
        }

        .essay-hero-image img {
          width: 100%;
          height: auto;
          border-radius: 4px;
        }

        .essay-content {
          max-width: 650px;
          margin: 0 auto;
          font-size: 1.125rem;
          line-height: 1.8;
          color: #1a1a1a;
        }

        .essay-content :global(p) {
          margin-bottom: 1.5rem;
        }

        .essay-content :global(h2) {
          font-size: 1.5rem;
          font-weight: 500;
          margin: 3rem 0 1rem;
        }

        .essay-content :global(blockquote) {
          font-style: italic;
          border-left: 3px solid #e84a8a;
          padding-left: 24px;
          margin: 2rem 0;
          color: rgba(45, 42, 38, 0.8);
        }

        .essay-content :global(hr) {
          border: none;
          border-top: 1px solid rgba(45, 42, 38, 0.1);
          margin: 3rem 0;
        }

        .essay-content :global(strong) {
          font-weight: 600;
          color: #e84a8a;
        }

        /* Read Next Section */
        .essay-read-next {
          max-width: 900px;
          margin: 80px auto 0;
          padding-top: 60px;
          border-top: 1px solid rgba(45, 42, 38, 0.1);
        }

        .essay-read-next h2 {
          font-family: "JetBrains Mono", monospace;
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(45, 42, 38, 0.6);
          margin-bottom: 24px;
        }

        .read-next-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .read-next-card {
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.2s;
          overflow: hidden;
        }

        .read-next-card:hover {
          border-color: #e84a8a;
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .read-next-image {
          aspect-ratio: 16/10;
          overflow: hidden;
        }

        .read-next-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .read-next-content {
          padding: 16px;
        }

        .read-next-type {
          font-family: "JetBrains Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #e84a8a;
          display: block;
          margin-bottom: 8px;
        }

        .read-next-card h3 {
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.3;
          color: #1a1a1a;
        }

        .essay-footer {
          max-width: 650px;
          margin: 80px auto 0;
          text-align: center;
          padding-top: 40px;
          border-top: 1px solid rgba(45, 42, 38, 0.1);
        }

        .essay-footer p {
          font-family: "JetBrains Mono", monospace;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(45, 42, 38, 0.5);
          margin-bottom: 16px;
        }

        @media (max-width: 768px) {
          .read-next-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
