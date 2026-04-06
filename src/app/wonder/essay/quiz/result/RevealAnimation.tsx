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
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),   // Label fades in
      setTimeout(() => setPhase(2), 800),   // Name fades in
      setTimeout(() => setPhase(3), 2000),  // Image fades in
      setTimeout(() => setPhase(4), 3200),  // Utopia text fades in
      setTimeout(() => setPhase(5), 5500),  // Ready to continue
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className={styles.overlay} onClick={phase >= 4 ? onComplete : undefined}>
      {/* Background landscape */}
      <div className={styles.bgLandscape}>
        <img src={imageUrl} alt="" />
        <div className={styles.bgGradient} />
      </div>

      <div className={styles.content}>
        {/* "Your Archetype" label */}
        <div className={`${styles.label} ${phase >= 1 ? styles.visible : ""}`}>
          Your Archetype
        </div>

        {/* Archetype name with gradient */}
        <h1
          className={`${styles.name} ${phase >= 2 ? styles.visible : ""}`}
          style={{ "--archetype-color": archetypeColor } as React.CSSProperties}
        >
          {archetypeName}
        </h1>

        {/* Utopia card */}
        <div className={`${styles.utopiaCard} ${phase >= 3 ? styles.visible : ""}`}>
          <img src={imageUrl} alt={archetypeName} className={styles.utopiaImage} />
          <div className={styles.utopiaLabel}>Your Utopia</div>
          <p className={`${styles.utopiaText} ${phase >= 4 ? styles.visible : ""}`}>
            {utopiaText}
          </p>
        </div>

        {/* Tap to continue */}
        <button
          className={`${styles.continueBtn} ${phase >= 5 ? styles.visible : ""}`}
          onClick={onComplete}
        >
          Tap to continue
        </button>
      </div>
    </div>
  );
}
