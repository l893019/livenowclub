"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./MeetPageClient.module.css";

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
  const router = useRouter();
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);

  useEffect(() => {
    // Check if user has already completed quiz
    const storedUserId = localStorage.getItem("quiz-user-id");
    const storedResult = localStorage.getItem("quiz-user-result");

    if (storedUserId && storedResult) {
      setHasCompletedQuiz(true);
    }
  }, []);

  const handleStartQuiz = () => {
    // Store target user ID for connection creation after quiz
    localStorage.setItem("connectWith", targetUser.id);
    router.push("/wonder/essay");
  };

  const handleSeeConnection = () => {
    // Go directly to result with comparison
    router.push(`/wonder/essay/quiz/result?compare=${targetUser.id}`);
  };

  return (
    <div className={styles.page}>
      {/* Hero Image */}
      <div className={styles.heroImage}>
        <img
          src="/wonder/assets/landscapes/optimized/1.jpg"
          alt="Abstract landscape"
        />
        <div className={styles.heroOverlay} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <header className={styles.header}>
          <Link href="/" className={styles.logoLink}>
            <span className={styles.logo}>The Live Now Club</span>
          </Link>
          <span className={styles.label}>From Wonder</span>
        </header>

        <main className={styles.main}>
          <h1 className={styles.title}>When Purpose Is All We Have Left</h1>

          <p className={styles.description}>
            An interactive exploration of human purpose through the lens of sci-fi.
          </p>

          <div className={styles.details}>
            <p>7 questions. No right answers.</p>
            <p>Just a mirror for how you think about the future.</p>
          </div>

          {hasCompletedQuiz ? (
            <>
              <button className={styles.primaryButton} onClick={handleSeeConnection}>
                See Where You Intersect
              </button>
              <p className={styles.subtext}>
                You've already taken the quiz.
              </p>
            </>
          ) : (
            <>
              <button className={styles.primaryButton} onClick={handleStartQuiz}>
                Discover Your Worldview
              </button>
              <p className={styles.subtext}>3 minutes</p>
            </>
          )}
        </main>

        {/* Personal touch from inviter */}
        <footer className={styles.footer}>
          <div className={styles.divider} />

          {targetUser.identityName ? (
            <div className={styles.inviterSection}>
              <p className={styles.inviterIntro}>
                <span className={styles.inviterName}>{targetUser.name}</span> took this quiz and discovered they're
              </p>
              <p className={styles.inviterIdentity}>
                {targetUser.identityName}
              </p>
              {targetUser.identityDescription && (
                <p className={styles.inviterDescription}>
                  {targetUser.identityDescription}
                </p>
              )}
              <p className={styles.inviterPrompt}>
                After you finish, you'll see where your worldviews intersect.
              </p>
            </div>
          ) : (
            <div className={styles.inviterSection}>
              <p className={styles.inviterIntro}>
                <span className={styles.inviterName}>{targetUser.name}</span> took this quiz.
              </p>
              <p className={styles.inviterPrompt}>
                After you finish, you'll see where your worldviews intersect.
              </p>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}
