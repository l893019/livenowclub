"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

type TargetUser = {
  id: string;
  name: string;
  slug: string;
  identityName: string | null;
  identityDescription: string | null;
};

type Props = {
  targetUser: TargetUser;
};

export function MeetPageClient({ targetUser }: Props) {
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has already completed quiz (reading from localStorage on mount is valid)
    const storedUserId = localStorage.getItem("quiz-user-id");
    const storedResult = localStorage.getItem("quiz-user-result");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasCompletedQuiz(Boolean(storedUserId && storedResult));
  }, []);

  const handleStartQuiz = () => {
    // Store target user ID for connection creation after quiz
    localStorage.setItem("connectWith", targetUser.id);
  };

  // Don't render CTA until we know quiz status
  if (hasCompletedQuiz === null) {
    return (
      <>
        <Header />
        <main className="meet-page">
          <section className="meet-hero">
            <div className="meet-hero-image">
              <Image
                src="/wonder/assets/landscapes/optimized/1.jpg"
                alt="Abstract landscape"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
              <div className="meet-hero-overlay" />
            </div>
            <div className="meet-hero-content">
              <span className="meet-label">From Wonder</span>
              <h1>When Purpose Is All We Have Left</h1>
              <p className="meet-subtitle">
                An interactive exploration of human purpose through the lens of sci-fi.
              </p>
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="meet-page">
        {/* Hero Section */}
        <section className="meet-hero">
          <div className="meet-hero-image">
            <Image
              src="/wonder/assets/landscapes/optimized/1.jpg"
              alt="Abstract landscape"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <div className="meet-hero-overlay" />
          </div>

          <div className="meet-hero-content">
            <span className="meet-label">From Wonder</span>
            <h1>When Purpose Is All We Have Left</h1>
            <p className="meet-subtitle">
              An interactive exploration of human purpose through the lens of sci-fi.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="meet-content">
          <div className="meet-details">
            <p>7 questions. No right answers.</p>
            <p>Just a mirror for how you think about the future.</p>
          </div>

          {hasCompletedQuiz ? (
            <div className="meet-cta">
              <a
                href={`/wonder/essay/quiz/result?compare=${targetUser.id}`}
                className="btn btn--primary"
              >
                See Where You Intersect
              </a>
              <p className="meet-subtext">You&apos;ve already taken the quiz.</p>
            </div>
          ) : (
            <div className="meet-cta">
              <a
                href="/wonder/essay/quiz"
                className="btn btn--primary"
                onClick={handleStartQuiz}
              >
                Discover Your Worldview
              </a>
              <p className="meet-subtext">Takes about 3 minutes</p>
            </div>
          )}

          {/* Personal touch from inviter */}
          <div className="meet-inviter">
            <div className="meet-divider" />
            {targetUser.identityName ? (
              <>
                <p className="meet-inviter-intro">
                  <strong>{targetUser.name === "Anonymous" ? "Someone" : targetUser.name}</strong> took this quiz and discovered they&apos;re
                </p>
                <p className="meet-inviter-identity">{targetUser.identityName}</p>
                {targetUser.identityDescription && (
                  <p className="meet-inviter-description">
                    &ldquo;{targetUser.identityDescription}&rdquo;
                  </p>
                )}
                <p className="meet-inviter-prompt">
                  After you finish, you&apos;ll see where your worldviews intersect.
                </p>
              </>
            ) : (
              <>
                <p className="meet-inviter-intro">
                  <strong>{targetUser.name === "Anonymous" ? "Someone" : targetUser.name}</strong> took this quiz.
                </p>
                <p className="meet-inviter-prompt">
                  After you finish, you&apos;ll see where your worldviews intersect.
                </p>
              </>
            )}
          </div>
        </section>
      </main>

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
    </>
  );
}
