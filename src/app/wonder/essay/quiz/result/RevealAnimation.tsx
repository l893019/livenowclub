"use client";

import { useState, useEffect } from "react";
import styles from "./RevealAnimation.module.css";

type RevealAnimationProps = {
  archetypeName: string;
  archetypeColor: string;
  utopiaText: string;
  imageUrl: string;
  onComplete: () => void;
};

export function RevealAnimation({
  archetypeName,
  archetypeColor,
  utopiaText,
  imageUrl,
  onComplete,
}: RevealAnimationProps) {
  const [phase, setPhase] = useState<"name" | "image" | "text" | "done">("name");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("image"), 1500),
      setTimeout(() => setPhase("text"), 3000),
      setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div className={styles.overlay}>
      <div className={`${styles.name} ${phase !== "name" ? styles.nameUp : ""}`}>
        <span style={{ color: archetypeColor }}>{archetypeName}</span>
      </div>

      {(phase === "image" || phase === "text") && (
        <img
          src={imageUrl}
          alt={archetypeName}
          className={`${styles.image} ${phase === "text" ? styles.imageShrink : ""}`}
        />
      )}

      {phase === "text" && (
        <p className={styles.utopia}>{utopiaText}</p>
      )}

      <button className={styles.skip} onClick={onComplete}>
        Skip
      </button>
    </div>
  );
}
