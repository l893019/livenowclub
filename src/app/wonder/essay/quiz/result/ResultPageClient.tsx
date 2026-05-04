"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { ReadingPage } from "./ReadingPage";
import { ComparisonView } from "./ComparisonView";

type ResultPageClientProps = {
  identityKey?: string | null;
  compareUserId?: string;
};

export function ResultPageClient({
  identityKey,
  compareUserId,
}: ResultPageClientProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem("quiz-user-id");
    setUserId(storedUserId);
    setIsLoading(false);
  }, []);

  // Wait for localStorage to load before deciding what to show
  if (isLoading) {
    return null; // Or show a minimal loading state
  }

  // If compareUserId exists and we have a userId, show comparison view
  const showComparison = compareUserId && userId && compareUserId !== userId;

  // If compareUserId exists but no userId, user needs to take quiz first
  const needsToTakeQuiz = compareUserId && !userId;

  return (
    <>
      <style>{`
        :root {
          --bg-deep: #faf6f1;
          --bg: #fffbf7;
          --text: #2d2a26;
          --text-dim: rgba(45,42,38,0.7);
          --text-muted: rgba(45,42,38,0.45);
          --accent-pink: #e8178a;
        }
      `}</style>

      <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet" />

      <Header />

      {needsToTakeQuiz ? (
        <div style={{
          maxWidth: '600px',
          margin: '120px auto',
          padding: '40px 20px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '28px', marginBottom: '16px', color: 'var(--text)' }}>
            Take the Quiz First
          </h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--text-dim)', marginBottom: '32px' }}>
            To see this comparison, you need to discover your own worldview first.
          </p>
          <Link
            href="/wonder/essay/quiz"
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              background: 'var(--accent-pink)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            Take the Quiz
          </Link>
        </div>
      ) : showComparison ? (
        <ComparisonView userId={userId} compareUserId={compareUserId} />
      ) : (
        <ReadingPage identityKey={identityKey} compareUserId={compareUserId} />
      )}

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
