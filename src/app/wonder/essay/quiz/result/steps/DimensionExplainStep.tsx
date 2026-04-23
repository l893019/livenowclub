"use client";

import { useState, useEffect } from "react";
import { archetypes } from "@/lib/archetypes";
import { DimensionSpectrum } from "../DimensionSpectrum";
import type { Dimensions } from "@/lib/dimensions";
import styles from "./DimensionExplainStep.module.css";

type DimensionExplainStepProps = {
  dimensions: Dimensions;
  archetypeKey?: string;
  imageUrl?: string;
};

const dimensionDescriptions = {
  agency: {
    name: "Agency",
    low: "Witness",
    high: "Builder",
    description: "How actively you want to shape the world versus observe and appreciate it",
  },
  certainty: {
    name: "Certainty",
    low: "Seeking",
    high: "Settled",
    description: "Whether you're drawn to questions or have arrived at answers",
  },
  posture: {
    name: "Posture",
    low: "Protective",
    high: "Expansive",
    description: "How you balance preservation with exploration",
  },
};

export function DimensionExplainStep({
  dimensions,
  archetypeKey,
  imageUrl,
}: DimensionExplainStepProps) {
  const [phase, setPhase] = useState(0);

  const archetype = archetypeKey ? archetypes[archetypeKey] : null;

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300), // Title appears
      setTimeout(() => setPhase(2), 800), // First dimension
      setTimeout(() => setPhase(3), 1400), // Second dimension
      setTimeout(() => setPhase(4), 2000), // Third dimension
      setTimeout(() => setPhase(5), 2800), // Description appears
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const titleReached = phase >= 1;
  const dim1Reached = phase >= 2;
  const dim2Reached = phase >= 3;
  const dim3Reached = phase >= 4;
  const descReached = phase >= 5;

  // Get the dominant dimension description
  const getDominantDescription = () => {
    const dims = [
      { key: "agency", value: dimensions.agency },
      { key: "certainty", value: dimensions.certainty },
      { key: "posture", value: dimensions.posture },
    ];
    const mostExtreme = dims.reduce((max, dim) => {
      const extremity = Math.abs(dim.value - 0.5);
      const maxExtremity = Math.abs(max.value - 0.5);
      return extremity > maxExtremity ? dim : max;
    });
    const desc = dimensionDescriptions[mostExtreme.key as keyof typeof dimensionDescriptions];
    const side = mostExtreme.value > 0.5 ? desc.high : desc.low;
    return `You lean ${side.toLowerCase()} — ${desc.description.toLowerCase()}.`;
  };

  return (
    <div className={styles.container}>
      {/* Mini island image at top */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={archetype?.name || "Your worldview"}
          className={styles.miniIsland}
        />
      )}

      {/* Title */}
      <h2 className={`${styles.title} ${titleReached ? styles.visible : ""}`}>
        Your Position
      </h2>

      {/* Dimension Spectrums */}
      <div className={styles.spectrums}>
        {/* Agency */}
        <div className={`${styles.dimensionRow} ${dim1Reached ? styles.visible : ""}`}>
          <div className={styles.dimensionHeader}>
            <span className={styles.dimensionName}>Agency</span>
            <span className={styles.dimensionRange}>
              {dimensionDescriptions.agency.low} ↔ {dimensionDescriptions.agency.high}
            </span>
          </div>
          <div className={styles.spectrumWrapper}>
            <DimensionSpectrum
              dimensions={dimensions}
              showLabels={false}
              singleDimension="agency"
            />
          </div>
        </div>

        {/* Certainty */}
        <div className={`${styles.dimensionRow} ${dim2Reached ? styles.visible : ""}`}>
          <div className={styles.dimensionHeader}>
            <span className={styles.dimensionName}>Certainty</span>
            <span className={styles.dimensionRange}>
              {dimensionDescriptions.certainty.low} ↔ {dimensionDescriptions.certainty.high}
            </span>
          </div>
          <div className={styles.spectrumWrapper}>
            <DimensionSpectrum
              dimensions={dimensions}
              showLabels={false}
              singleDimension="certainty"
            />
          </div>
        </div>

        {/* Posture */}
        <div className={`${styles.dimensionRow} ${dim3Reached ? styles.visible : ""}`}>
          <div className={styles.dimensionHeader}>
            <span className={styles.dimensionName}>Posture</span>
            <span className={styles.dimensionRange}>
              {dimensionDescriptions.posture.low} ↔ {dimensionDescriptions.posture.high}
            </span>
          </div>
          <div className={styles.spectrumWrapper}>
            <DimensionSpectrum
              dimensions={dimensions}
              showLabels={false}
              singleDimension="posture"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <p className={`${styles.description} ${descReached ? styles.visible : ""}`}>
        {getDominantDescription()}
      </p>

      {/* Hint */}
      <span className={`${styles.hint} ${descReached ? styles.visible : ""}`}>
        Your worldview coordinates
      </span>
    </div>
  );
}
