"use client";

import Link from "next/link";
import { useState } from "react";
import type { Essay } from "@/lib/essays";

type EssayContentProps = {
  essay: Essay;
  relatedEssays?: Essay[];
};

// Calculate read time (roughly 200 words per minute)
function getReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function EssayContent({ essay, relatedEssays = [] }: EssayContentProps) {
  const [copied, setCopied] = useState(false);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const readTime = getReadTime(essay.content);

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://livenowclub.vercel.app/read/${essay.slug}`;
  const shareText = `${essay.title} by Louise Ireland`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  // Convert markdown to basic HTML
  const lines = essay.content.split("\n");
  const result: string[] = [];
  let blockquoteBuffer: string[] = [];

  const flushBlockquote = () => {
    if (blockquoteBuffer.length > 0) {
      result.push(`<blockquote>${blockquoteBuffer.join("<br />")}</blockquote>`);
      blockquoteBuffer = [];
    }
  };

  const processInlineFormatting = (text: string) => {
    return text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/_([^_]+)_/g, "<em>$1</em>");
  };

  for (const line of lines) {
    if (line.startsWith("# ") || line.includes("Originally published")) {
      flushBlockquote();
      continue;
    }
    if (line.startsWith("## ")) {
      flushBlockquote();
      result.push(`<h2>${line.slice(3)}</h2>`);
      continue;
    }
    if (line.startsWith("### ")) {
      flushBlockquote();
      result.push(`<h3>${line.slice(4)}</h3>`);
      continue;
    }
    if (line.trim() === "---") {
      flushBlockquote();
      result.push("<hr />");
      continue;
    }
    if (line.startsWith("> ")) {
      blockquoteBuffer.push(processInlineFormatting(line.slice(2)));
      continue;
    }

    // Not a blockquote line, flush any buffered blockquotes
    flushBlockquote();

    if (line.trim() === "") {
      result.push("</p><p>");
      continue;
    }

    // Process images first: [![alt](src)](href) or ![alt](src)
    let processed = line
      .replace(/\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)/g, '<a href="$3" target="_blank"><img src="$2" alt="$1" /></a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');

    // Process links: [text](url)
    processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Now apply text formatting
    processed = processed
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/_([^_]+)_/g, "<em>$1</em>");

    result.push(processed);
  }

  flushBlockquote(); // Flush any remaining blockquotes
  const contentHtml = result.join("\n");

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
          <Link href="/connect">Connect</Link>
        </nav>
      </header>

      <div className="essay-page">
        {/* Back Button */}
        <Link href="/read" className="essay-back">
          ← Back to all
        </Link>

        {/* Header */}
        <header className="essay-header">
          <span className="essay-header-meta">{essay.type} · {readTime} min read</span>
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

        {/* Subscribe CTA */}
        <div className="essay-subscribe-cta">
          <p className="cta-text">Join me on this journey. New essays land in your inbox almost every week.</p>
          <a
            href="https://louiseireland.substack.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
          >
            Subscribe
          </a>
        </div>

        {/* Share */}
        <div className="essay-share">
          <span className="essay-share-label">Share this piece</span>
          <div className="essay-share-buttons">
            <button onClick={handleShareTwitter} className="share-btn" aria-label="Share on Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
            <button onClick={handleCopyLink} className="share-btn" aria-label="Copy link">
              {copied ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              )}
            </button>
          </div>
          {copied && <span className="copied-toast">Link copied!</span>}
        </div>

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
            Comment on Substack →
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
          font-family: "Space Grotesk", sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(45, 42, 38, 0.45);
          margin-bottom: 60px;
          transition: color 0.2s;
        }

        .essay-back:hover {
          color: #e8178a;
        }

        .essay-header {
          max-width: 700px;
          margin: 0 auto 48px;
          text-align: center;
        }

        .essay-header-meta {
          display: block;
          font-family: "Space Grotesk", sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #e8178a;
          margin-bottom: 24px;
        }

        .essay-header h1 {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 300;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: #2d2a26;
          margin-bottom: 16px;
        }

        .essay-header-subtitle {
          font-size: 1.25rem;
          font-weight: 300;
          font-style: italic;
          color: rgba(45, 42, 38, 0.7);
          margin-bottom: 20px;
          letter-spacing: 0.02em;
        }

        .essay-header-date {
          font-family: "Space Grotesk", sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.1em;
          color: rgba(45, 42, 38, 0.45);
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
          max-width: 700px;
          margin: 0 auto;
          font-size: 17px;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(45, 42, 38, 0.7);
        }

        .essay-content :global(p) {
          margin-bottom: 1.5em;
        }

        .essay-content :global(h2) {
          font-size: 1.5rem;
          font-weight: 400;
          margin: 3rem 0 1.5rem;
          color: #2d2a26;
        }

        .essay-content :global(h3) {
          font-size: 1.25rem;
          font-weight: 400;
          margin: 2.5rem 0 1rem;
          color: #2d2a26;
        }

        .essay-content :global(blockquote) {
          font-size: 0.95rem;
          font-weight: 400;
          font-style: normal;
          border-left: 2px solid #e8178a;
          padding: 16px 0 16px 20px;
          margin: 28px 0;
          color: #2d2a26;
          background: rgba(232, 23, 138, 0.02);
          border-radius: 0 6px 6px 0;
          line-height: 1.6;
        }

        .essay-content :global(blockquote.epigraph) {
          font-style: italic;
          text-align: center;
          border-left: none;
          background: none;
          padding: 0;
          margin: 32px auto;
          max-width: 85%;
          color: rgba(45, 42, 38, 0.7);
        }

        .essay-content :global(hr) {
          border: none;
          border-top: 1px solid rgba(45, 42, 38, 0.1);
          margin: 3rem 0;
        }

        .essay-content :global(strong) {
          font-weight: 500;
          color: #e8178a;
        }

        .essay-content :global(em) {
          font-style: italic;
          color: rgba(45, 42, 38, 0.8);
        }

        /* Subscribe CTA */
        .essay-subscribe-cta {
          max-width: 650px;
          margin: 60px auto 0;
          padding: 32px;
          text-align: center;
          border-top: 1px solid rgba(45, 42, 38, 0.1);
          border-bottom: 1px solid rgba(45, 42, 38, 0.1);
        }

        .cta-text {
          font-size: 1.1rem;
          font-weight: 300;
          color: rgba(45, 42, 38, 0.7);
          margin-bottom: 20px;
          font-style: italic;
        }

        .cta-button {
          display: inline-block;
          padding: 12px 32px;
          background: #e8178a;
          color: white;
          font-family: "Space Grotesk", sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cta-button:hover {
          background: #c9146f;
          transform: translateY(-2px);
        }

        /* Share Section */
        .essay-share {
          max-width: 650px;
          margin: 60px auto 0;
          display: flex;
          align-items: center;
          gap: 16px;
          padding-top: 32px;
          border-top: 1px solid rgba(45, 42, 38, 0.1);
        }

        .essay-share-label {
          font-family: "Space Grotesk", sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(45, 42, 38, 0.45);
        }

        .essay-share-buttons {
          display: flex;
          gap: 8px;
        }

        .share-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid rgba(45, 42, 38, 0.15);
          background: white;
          color: rgba(45, 42, 38, 0.6);
          cursor: pointer;
          transition: all 0.2s;
        }

        .share-btn:hover {
          border-color: #e8178a;
          color: #e8178a;
        }

        .copied-toast {
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          color: #7a8b72;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Read Next Section */
        .essay-read-next {
          max-width: 900px;
          margin: 80px auto 0;
          padding-top: 60px;
          border-top: 1px solid rgba(45, 42, 38, 0.1);
        }

        .essay-read-next h2 {
          font-family: "Space Grotesk", sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(45, 42, 38, 0.45);
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
          border-color: #e8178a;
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
          font-family: "Space Grotesk", sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #e8178a;
          display: block;
          margin-bottom: 8px;
        }

        .read-next-card h3 {
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.3;
          color: #2d2a26;
        }

        .essay-footer {
          max-width: 700px;
          margin: 80px auto 0;
          text-align: center;
          padding-top: 40px;
          border-top: 1px solid rgba(45, 42, 38, 0.1);
        }

        .essay-footer p {
          font-family: "Space Grotesk", sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(45, 42, 38, 0.45);
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
