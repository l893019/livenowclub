"use client";

import styles from "./ComparisonSpectrum.module.css";
import type { Dimensions } from "@/lib/dimensions";

type ComparisonSpectrumProps = {
  userDimensions: Dimensions;
  otherDimensions: Dimensions;
  userName: string;
  otherName: string;
};

export function ComparisonSpectrum({
  userDimensions,
  otherDimensions,
  userName,
  otherName,
}: ComparisonSpectrumProps) {
  // Convert -1 to 1 range to 0 to 100 percentage
  const toPercent = (value: number) => ((value + 1) / 2) * 100;

  const spectrums = [
    {
      name: "Agency",
      lowLabel: "Witness",
      highLabel: "Builder",
      userValue: userDimensions.agency,
      otherValue: otherDimensions.agency,
      userPercent: toPercent(userDimensions.agency),
      otherPercent: toPercent(otherDimensions.agency),
    },
    {
      name: "Certainty",
      lowLabel: "Seeking",
      highLabel: "Settled",
      userValue: userDimensions.certainty,
      otherValue: otherDimensions.certainty,
      userPercent: toPercent(userDimensions.certainty),
      otherPercent: toPercent(otherDimensions.certainty),
    },
    {
      name: "Posture",
      lowLabel: "Protective",
      highLabel: "Expansive",
      userValue: userDimensions.posture,
      otherValue: otherDimensions.posture,
      userPercent: toPercent(userDimensions.posture),
      otherPercent: toPercent(otherDimensions.posture),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={`${styles.legendMarker} ${styles.userMarker}`} />
            <span>{userName}</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendMarker} ${styles.otherMarker}`} />
            <span>{otherName}</span>
          </div>
        </div>
      </div>

      {spectrums.map((spectrum) => (
        <div key={spectrum.name} className={styles.spectrum}>
          <div className={styles.labels}>
            <span className={styles.lowLabel}>{spectrum.lowLabel}</span>
            <span className={styles.dimensionName}>{spectrum.name}</span>
            <span className={styles.highLabel}>{spectrum.highLabel}</span>
          </div>
          <div className={styles.track}>
            <div
              className={`${styles.marker} ${styles.userMarker}`}
              style={{ left: `${spectrum.userPercent}%` }}
              aria-label={`${userName}: ${spectrum.userValue.toFixed(2)}`}
            />
            <div
              className={`${styles.marker} ${styles.otherMarker}`}
              style={{ left: `${spectrum.otherPercent}%` }}
              aria-label={`${otherName}: ${spectrum.otherValue.toFixed(2)}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
