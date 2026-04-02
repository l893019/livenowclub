"use client";

import { useState, useEffect } from "react";
import { RadarChart } from "@/components/RadarChart";
import { archetypes } from "@/lib/archetypes";
import {
  archetypePositions,
  axisDescriptions,
  positionDescriptions,
  toSvgCoords,
} from "@/lib/radar-positions";
import styles from "./RadarExplainStep.module.css";

type RadarExplainStepProps = {
  archetypeKey: string;
  imageUrl: string;
};

export function RadarExplainStep({
  archetypeKey,
  imageUrl,
}: RadarExplainStepProps) {
  const [phase, setPhase] = useState(0);

  const archetype = archetypes[archetypeKey];
  const position = archetypePositions[archetypeKey];
  const description = positionDescriptions[archetypeKey];

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500), // Radar appears
      setTimeout(() => setPhase(2), 1500), // Labels appear
      setTimeout(() => setPhase(3), 3000), // Dot appears
      setTimeout(() => setPhase(4), 4000), // Description appears
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Calculate dot position for overlay
  // RadarChart uses size=280 on mobile, 340 on desktop
  // We'll use 280 as base and let CSS handle scaling
  const radarSize = 280;
  const padding = 40;
  const dotCoords = position
    ? toSvgCoords(position, radarSize, padding)
    : { cx: radarSize / 2, cy: radarSize / 2 };

  const dotStyle = {
    left: `${(dotCoords.cx / radarSize) * 100}%`,
    top: `${(dotCoords.cy / radarSize) * 100}%`,
    backgroundColor: archetype?.color || "#888",
    color: archetype?.color || "#888",
  };

  const radarPhaseReached = phase >= 1;
  const labelsPhaseReached = phase >= 2;
  const dotPhaseReached = phase >= 3;
  const descriptionPhaseReached = phase >= 4;

  return (
    <div className={styles.container}>
      {/* Mini island image at top */}
      <img
        src={imageUrl}
        alt={archetype?.name || "Your archetype"}
        className={styles.miniIsland}
      />

      {/* Radar chart with animated phases */}
      <div
        className={`${styles.radarWrapper} ${radarPhaseReached ? styles.visible : ""}`}
      >
        <RadarChart
          size={radarSize}
          showAllArchetypes={false}
        />

        {/* Axis descriptions overlay */}
        <div className={styles.axisDescriptions}>
          <span
            className={`${styles.axisDescription} ${styles.descNorth} ${labelsPhaseReached ? styles.visible : ""}`}
          >
            {axisDescriptions.north}
          </span>
          <span
            className={`${styles.axisDescription} ${styles.descSouth} ${labelsPhaseReached ? styles.visible : ""}`}
          >
            {axisDescriptions.south}
          </span>
          <span
            className={`${styles.axisDescription} ${styles.descEast} ${labelsPhaseReached ? styles.visible : ""}`}
          >
            {axisDescriptions.east}
          </span>
          <span
            className={`${styles.axisDescription} ${styles.descWest} ${labelsPhaseReached ? styles.visible : ""}`}
          >
            {axisDescriptions.west}
          </span>
        </div>

        {/* User dot overlay */}
        <div className={styles.userDotOverlay}>
          <div
            className={`${styles.userDotRing} ${dotPhaseReached ? styles.visible : ""}`}
            style={dotStyle}
          />
          <div
            className={`${styles.userDot} ${dotPhaseReached ? styles.visible : ""}`}
            style={dotStyle}
          />
        </div>
      </div>

      {/* Position description */}
      <p
        className={`${styles.positionDescription} ${descriptionPhaseReached ? styles.visible : ""}`}
      >
        {description}
      </p>

      {/* Hint at bottom */}
      <span
        className={`${styles.hint} ${descriptionPhaseReached ? styles.visible : ""}`}
      >
        The map of you
      </span>
    </div>
  );
}
