"use client";

import styles from "./DimensionSpectrum.module.css";
import type { Dimensions } from "@/lib/dimensions";

type DimensionSpectrumProps = {
  dimensions: Dimensions;
};

export function DimensionSpectrum({ dimensions }: DimensionSpectrumProps) {
  // Convert -1 to 1 range to 0 to 100 percentage
  const toPercent = (value: number) => ((value + 1) / 2) * 100;

  const spectrums = [
    {
      name: "Agency",
      lowLabel: "Witness",
      highLabel: "Builder",
      value: dimensions.agency,
      percent: toPercent(dimensions.agency),
    },
    {
      name: "Certainty",
      lowLabel: "Seeking",
      highLabel: "Settled",
      value: dimensions.certainty,
      percent: toPercent(dimensions.certainty),
    },
    {
      name: "Posture",
      lowLabel: "Protective",
      highLabel: "Expansive",
      value: dimensions.posture,
      percent: toPercent(dimensions.posture),
    },
  ];

  return (
    <div className={styles.container}>
      {spectrums.map((spectrum) => (
        <div key={spectrum.name} className={styles.spectrum}>
          <div className={styles.labels}>
            <span className={styles.lowLabel}>{spectrum.lowLabel}</span>
            <span className={styles.dimensionName}>{spectrum.name}</span>
            <span className={styles.highLabel}>{spectrum.highLabel}</span>
          </div>
          <div className={styles.track}>
            <div
              className={styles.marker}
              style={{ left: `${spectrum.percent}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
