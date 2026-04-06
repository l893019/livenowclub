"use client";

import Link from "next/link";
import styles from "./QuizCTA.module.css";

type QuizCTAProps = {
  variant?: "result" | "relationship";
  personName?: string;
};

export function QuizCTA({ variant = "result", personName }: QuizCTAProps) {
  if (variant === "relationship" && personName) {
    return (
      <div className={styles.cta}>
        <h3 className={styles.headline}>See how you relate to {personName}</h3>
        <p className={styles.subtext}>Take the quiz to discover your dynamic.</p>
        <Link href="/wonder/essay/quiz" className={styles.button}>
          Take the Quiz
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.cta}>
      <h3 className={styles.headline}>What&apos;s your worldview?</h3>
      <p className={styles.subtext}>7 questions. 2 minutes.</p>
      <Link href="/wonder/essay/quiz" className={styles.button}>
        Take the Quiz
      </Link>
    </div>
  );
}
