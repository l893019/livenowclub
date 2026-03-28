"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import type { Essay } from "@/lib/essays";

type AllEssaysClientProps = {
  essays: Essay[];
};

// Calculate read time (roughly 200 words per minute)
function getReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function AllEssaysClient({ essays }: AllEssaysClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Filter essays based on search
  const filteredEssays = useMemo(() => {
    if (!searchQuery.trim()) return essays;

    const query = searchQuery.toLowerCase();
    return essays.filter(
      (essay) =>
        essay.title.toLowerCase().includes(query) ||
        essay.excerpt.toLowerCase().includes(query) ||
        essay.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        essay.type.toLowerCase().includes(query)
    );
  }, [essays, searchQuery]);

  // Group filtered essays by year
  const essaysByYear = filteredEssays.reduce(
    (acc, essay) => {
      const year = essay.date.slice(0, 4);
      if (!acc[year]) acc[year] = [];
      acc[year].push(essay);
      return acc;
    },
    {} as Record<string, Essay[]>
  );

  const years = Object.keys(essaysByYear).sort((a, b) => b.localeCompare(a));

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

      <div className="all-essays-container">
        <Link href="/read" className="back-link">
          ← Back to Read
        </Link>

        <header className="all-essays-header">
          <h1>All Writing</h1>
          <p>{essays.length} pieces</p>
        </header>

        {/* Search */}
        <div className="search-container">
          <svg
            className="search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search essays, poems, tags..."
            className="search-input"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="search-clear" aria-label="Clear search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Results count when searching */}
        {searchQuery && (
          <p className="search-results">
            {filteredEssays.length} result{filteredEssays.length !== 1 ? "s" : ""} for "{searchQuery}"
          </p>
        )}

        {/* Essays by year */}
        {years.length === 0 ? (
          <p className="no-results">No essays found. Try a different search.</p>
        ) : (
          years.map((year) => (
            <section key={year} className="year-section">
              <h2 className="year-header">{year}</h2>
              <div className="essays-list">
                {essaysByYear[year].map((essay) => (
                  <Link key={essay.slug} href={`/read/${essay.slug}`} className="essay-row">
                    <span className="essay-type">{essay.type}</span>
                    <span className="essay-title">{essay.title}</span>
                    <span className="essay-meta">
                      <span className="essay-read-time">{getReadTime(essay.content)} min</span>
                      <span className="essay-date">{formatDate(essay.date)}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      {/* Floating Subscribe */}
      <div className="subscribe-float">
        <a href="https://louiseireland.substack.com/subscribe" target="_blank" rel="noopener noreferrer">
          Subscribe
        </a>
      </div>

      <style jsx>{`
        .all-essays-container {
          min-height: 100vh;
          background: #faf6f1;
          padding: 120px 24px 80px;
          max-width: 900px;
          margin: 0 auto;
        }

        .back-link {
          display: inline-block;
          font-family: "Space Grotesk", sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(45, 42, 38, 0.45);
          margin-bottom: 48px;
          transition: color 0.2s;
        }

        .back-link:hover {
          color: #E8178A;
        }

        .all-essays-header {
          margin-bottom: 40px;
        }

        .all-essays-header h1 {
          font-size: clamp(2.5rem, 6vw, 3.5rem);
          font-weight: 300;
          letter-spacing: -0.03em;
          color: #2d2a26;
          margin-bottom: 8px;
        }

        .all-essays-header p {
          font-family: "Space Grotesk", sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(45, 42, 38, 0.45);
        }

        .search-container {
          position: relative;
          max-width: 500px;
          margin-bottom: 40px;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(45, 42, 38, 0.4);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 14px 44px;
          font-size: 1rem;
          font-family: inherit;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: white;
          color: #1a1a1a;
          transition: border-color 0.2s;
        }

        .search-input:focus {
          outline: none;
          border-color: #E8178A;
        }

        .search-input::placeholder {
          color: rgba(45, 42, 38, 0.4);
        }

        .search-clear {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          padding: 4px;
          cursor: pointer;
          color: rgba(45, 42, 38, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }

        .search-clear:hover {
          color: #E8178A;
        }

        .search-results {
          font-family: "Space Grotesk", sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.05em;
          color: rgba(45, 42, 38, 0.6);
          margin-bottom: 32px;
        }

        .no-results {
          text-align: center;
          color: rgba(45, 42, 38, 0.5);
          padding: 60px 0;
        }

        .year-section {
          margin-bottom: 48px;
        }

        .year-header {
          font-family: "Space Grotesk", sans-serif;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.2em;
          color: #E8178A;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(45, 42, 38, 0.1);
        }

        .essays-list {
          display: flex;
          flex-direction: column;
        }

        .essay-row {
          display: grid;
          grid-template-columns: 80px 1fr auto;
          gap: 16px;
          align-items: baseline;
          padding: 12px 0;
          border-bottom: 1px solid rgba(45, 42, 38, 0.05);
          transition: background 0.2s;
        }

        .essay-row:hover {
          background: rgba(232, 23, 138, 0.03);
        }

        .essay-type {
          font-family: "Space Grotesk", sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(45, 42, 38, 0.45);
        }

        .essay-title {
          font-size: 1rem;
          color: #2d2a26;
          font-weight: 400;
        }

        .essay-meta {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .essay-read-time {
          font-family: "Space Grotesk", sans-serif;
          font-size: 10px;
          font-weight: 400;
          color: rgba(45, 42, 38, 0.45);
          background: rgba(45, 42, 38, 0.05);
          padding: 2px 6px;
          border-radius: 2px;
        }

        .essay-date {
          font-family: "Space Grotesk", sans-serif;
          font-size: 11px;
          font-weight: 400;
          color: rgba(45, 42, 38, 0.45);
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .essay-row {
            grid-template-columns: 1fr;
            gap: 4px;
          }

          .essay-meta {
            justify-content: flex-start;
          }
        }
      `}</style>
    </>
  );
}
