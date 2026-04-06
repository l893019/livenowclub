"use client";

import Link from "next/link";
import styles from "./QuizCTA.module.css";

type QuizCTAProps = {
  variant?: "result" | "relationship";
  personName?: string;
  /** User ID to compare with after quiz completion (viral loop) */
  compareUserId?: string;
};

export function QuizCTA({ variant = "result", personName, compareUserId }: QuizCTAProps) {
  // Build quiz URL with optional compare parameter
  const quizUrl = compareUserId
    ? `/wonder/essay/quiz?compare=${compareUserId}`
    : "/wonder/essay/quiz";

  if (variant === "relationship" && personName) {
    return (
      <div className={styles.cta}>
        <h3 className={styles.headline}>See how you relate to {personName}</h3>
        <p className={styles.subtext}>Take the quiz to discover your dynamic.</p>
        <Link href={quizUrl} className={styles.button}>
          Take the Quiz
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.cta}>
      <h3 className={styles.headline}>Compare worldviews</h3>
      <p className={styles.subtext}>Take the quiz to see how you fit together.</p>
      <Link href={quizUrl} className={styles.button}>
        Take the Quiz
      </Link>
    </div>
  );
}
