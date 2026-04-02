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
  const [phase, setPhase] = useState<"youAre" | "name" | "image" | "text" | "done">("youAre");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("name"), 800),
      setTimeout(() => setPhase("image"), 2500),
      setTimeout(() => setPhase("text"), 4000),
      setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 6500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (phase === "done") return null;

  const showName = phase !== "youAre";
  const showImage = phase === "image" || phase === "text";
  const nameMovedUp = phase === "image" || phase === "text";

  return (
    <div className={styles.overlay}>
      <div className={`${styles.youAre} ${showName ? styles.youAreFadeOut : ""}`}>
        You are
      </div>

      {showName && (
        <div className={`${styles.name} ${nameMovedUp ? styles.nameUp : ""}`}>
          <span style={{ color: archetypeColor }}>{archetypeName}</span>
        </div>
      )}

      {showImage && (
        <img
          src={imageUrl}
          alt={archetypeName}
          className={`${styles.image} ${phase === "text" ? styles.imageShrink : ""}`}
        />
      )}

      {phase === "text" && (
        <p className={styles.utopia}>{utopiaText}</p>
      )}

      <button className={styles.tapToContinue} onClick={onComplete}>
        Tap to continue
      </button>
    </div>
  );
}
