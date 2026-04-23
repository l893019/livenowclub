"use client";

import styles from "./WorldviewFingerprint.module.css";

type FingerprintBar = {
  key: string;
  name: string;
  score: number;
  percentage: number;
  color: string;
};

type WorldviewFingerprintProps = {
  data: FingerprintBar[];
  primaryKey: string;
  shadowKey: string;
};

export function WorldviewFingerprint({
  data,
  primaryKey,
  shadowKey,
}: WorldviewFingerprintProps) {
  // Show top 6 scores for cleaner visualization
  const topScores = data.slice(0, 6);
  const maxPercentage = topScores[0]?.percentage || 0;

  return (
    <div className={styles.container}>
      <div className={styles.bars}>
        {topScores.map((item) => {
          const isPrimary = item.key === primaryKey;
          const isShadow = item.key === shadowKey;
          const barWidth = maxPercentage > 0 ? (item.percentage / maxPercentage) * 100 : 0;

          return (
            <div key={item.key} className={styles.barRow}>
              <div className={styles.labelContainer}>
                <span
                  className={`${styles.label} ${isPrimary ? styles.primary : ""} ${isShadow ? styles.shadow : ""}`}
                >
                  {item.name}
                  {isPrimary && <span className={styles.badge}>Primary</span>}
                  {isShadow && <span className={styles.badge}>Shadow</span>}
                </span>
              </div>
              <div className={styles.barContainer}>
                <div
                  className={`${styles.bar} ${isPrimary ? styles.barPrimary : ""} ${isShadow ? styles.barShadow : ""}`}
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor: isPrimary || isShadow ? item.color : "rgba(45, 42, 38, 0.2)",
                  }}
                />
                <span className={styles.percentage}>{item.percentage}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
