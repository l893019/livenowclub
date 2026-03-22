import Link from "next/link";
import { getAllEssays } from "@/lib/essays";

export const metadata = {
  title: "All Writing | The Live Now Club",
  description: "Browse the complete archive of essays, poems, and meditations.",
};

export default function AllEssaysPage() {
  const essays = getAllEssays();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Group essays by year
  const essaysByYear = essays.reduce(
    (acc, essay) => {
      const year = essay.date.slice(0, 4);
      if (!acc[year]) acc[year] = [];
      acc[year].push(essay);
      return acc;
    },
    {} as Record<string, typeof essays>
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
          <Link href="/make">Make</Link>
        </nav>
      </header>

      <div className="all-essays-page">
        <Link href="/read" className="all-essays-back">
          ← Back to Read
        </Link>

        <header className="all-essays-header">
          <h1>All Writing</h1>
          <p>{essays.length} pieces</p>
        </header>

        {years.map((year) => (
          <section key={year} className="all-essays-year">
            <h2 className="year-label">{year}</h2>
            <div className="year-essays">
              {essaysByYear[year].map((essay) => (
                <Link key={essay.slug} href={`/read/${essay.slug}`} className="essay-row">
                  <span className="essay-row-type">{essay.type}</span>
                  <span className="essay-row-title">{essay.title}</span>
                  <span className="essay-row-date">{formatDate(essay.date)}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Floating Subscribe */}
      <div className="subscribe-float">
        <a href="https://louiseireland.substack.com/subscribe" target="_blank" rel="noopener noreferrer">
          Subscribe
        </a>
      </div>

      <style jsx>{`
        .all-essays-page {
          min-height: 100vh;
          background: #faf6f1;
          padding: 120px 24px 80px;
          max-width: 800px;
          margin: 0 auto;
        }

        .all-essays-back {
          display: inline-block;
          font-family: "JetBrains Mono", monospace;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(45, 42, 38, 0.6);
          margin-bottom: 48px;
          transition: color 0.2s;
        }

        .all-essays-back:hover {
          color: #e84a8a;
        }

        .all-essays-header {
          margin-bottom: 60px;
        }

        .all-essays-header h1 {
          font-size: 3rem;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .all-essays-header p {
          font-family: "JetBrains Mono", monospace;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(45, 42, 38, 0.5);
        }

        .all-essays-year {
          margin-bottom: 48px;
        }

        .year-label {
          font-family: "JetBrains Mono", monospace;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #e84a8a;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(45, 42, 38, 0.1);
        }

        .year-essays {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .essay-row {
          display: grid;
          grid-template-columns: 80px 1fr auto;
          gap: 16px;
          align-items: baseline;
          padding: 12px 0;
          border-bottom: 1px solid rgba(45, 42, 38, 0.05);
          transition: all 0.2s;
        }

        .essay-row:hover {
          background: rgba(232, 74, 138, 0.05);
          padding-left: 8px;
          margin-left: -8px;
          padding-right: 8px;
          margin-right: -8px;
        }

        .essay-row-type {
          font-family: "JetBrains Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(45, 42, 38, 0.5);
        }

        .essay-row-title {
          font-size: 1rem;
          color: #1a1a1a;
          font-weight: 500;
        }

        .essay-row:hover .essay-row-title {
          color: #e84a8a;
        }

        .essay-row-date {
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          color: rgba(45, 42, 38, 0.4);
          white-space: nowrap;
        }

        @media (max-width: 600px) {
          .essay-row {
            grid-template-columns: 1fr;
            gap: 4px;
          }

          .essay-row-date {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
