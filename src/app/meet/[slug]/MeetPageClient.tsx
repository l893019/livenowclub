"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./MeetPageClient.module.css";

type TargetUser = {
  id: string;
  name: string;
  slug: string;
};

type Props = {
  targetUser: TargetUser;
};

export function MeetPageClient({ targetUser }: Props) {
  const router = useRouter();
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has already completed quiz
    const storedUserId = localStorage.getItem("userId");
    const storedAnswers = localStorage.getItem("quizAnswers");

    if (storedUserId && storedAnswers) {
      setHasCompletedQuiz(true);
      setCurrentUserId(storedUserId);
    }
  }, []);

  const handleStartQuiz = () => {
    // Store target user ID for connection creation after quiz
    localStorage.setItem("connectWith", targetUser.id);
    router.push("/wonder");
  };

  const handleSeeCompatibility = () => {
    // Go directly to compatibility view
    router.push(`/wonder/essay/quiz/result?compare=${targetUser.id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p className={styles.label}>Compatibility Check</p>
        <h1 className={styles.title}>
          See how compatible you are with{" "}
          <span className={styles.name}>{targetUser.name}</span>
        </h1>

        {hasCompletedQuiz ? (
          <>
            <p className={styles.subtitle}>
              You've already taken the quiz. See your compatibility now.
            </p>
            <button className={styles.primaryButton} onClick={handleSeeCompatibility}>
              See Compatibility
            </button>
          </>
        ) : (
          <>
            <p className={styles.subtitle}>
              Answer 7 questions to discover your worldview and see how it compares.
            </p>
            <button className={styles.primaryButton} onClick={handleStartQuiz}>
              Take the Quiz
            </button>
            <p className={styles.time}>Takes about 3 minutes</p>
          </>
        )}
      </div>
    </div>
  );
}
