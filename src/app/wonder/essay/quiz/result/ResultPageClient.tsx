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

  useEffect(() => {
    const storedUserId = localStorage.getItem("quiz-user-id");
    setUserId(storedUserId);
  }, []);

  // If compareUserId exists and we have a userId, show comparison view
  const showComparison = compareUserId && userId && compareUserId !== userId;

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

      {showComparison ? (
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
