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

      <div style={{
        minHeight: '100vh',
        background: '#faf6f1',
        padding: '120px 24px 80px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <Link href="/read" style={{
          display: 'inline-block',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase' as const,
          color: 'rgba(45, 42, 38, 0.6)',
          marginBottom: '48px'
        }}>
          ← Back to Read
        </Link>

        <header style={{ marginBottom: '60px' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: '#1a1a1a',
            marginBottom: '8px'
          }}>All Writing</h1>
          <p style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: 'rgba(45, 42, 38, 0.5)'
          }}>{essays.length} pieces</p>
        </header>

        {years.map((year) => (
          <section key={year} style={{ marginBottom: '48px' }}>
            <h2 style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: '#e84a8a',
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '1px solid rgba(45, 42, 38, 0.1)'
            }}>{year}</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {essaysByYear[year].map((essay) => (
                <Link key={essay.slug} href={`/read/${essay.slug}`} style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  gap: '16px',
                  alignItems: 'baseline',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(45, 42, 38, 0.05)'
                }}>
                  <span style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase' as const,
                    color: 'rgba(45, 42, 38, 0.5)'
                  }}>{essay.type}</span>
                  <span style={{
                    fontSize: '1rem',
                    color: '#1a1a1a',
                    fontWeight: 500
                  }}>{essay.title}</span>
                  <span style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '11px',
                    color: 'rgba(45, 42, 38, 0.4)',
                    whiteSpace: 'nowrap'
                  }}>{formatDate(essay.date)}</span>
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
    </>
  );
}
