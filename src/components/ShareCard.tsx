"use client";

import { useRef, useState } from "react";
import { archetypes } from "@/lib/archetypes";
import {
  archetypePositions,
  getAxisPercentages,
  toSvgCoords,
  type RadarPosition,
} from "@/lib/radar-positions";
import styles from "./ShareCard.module.css";

type ShareCardProps = {
  archetypeKey: string;
  userName?: string;
  position?: RadarPosition; // Optional custom position, defaults to archetype position
};

export function ShareCard({ archetypeKey, userName, position }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const archetype = archetypes[archetypeKey];
  const archetypePosition = position || archetypePositions[archetypeKey];
  const percentages = getAxisPercentages(archetypePosition);

  // Chart dimensions
  const chartSize = 180;
  const padding = 20;
  const center = chartSize / 2;
  const innerRadius = (chartSize - padding * 2) / 2;
  const rings = [0.33, 0.66, 1.0];

  // Get user dot position
  const userCoords = toSvgCoords(archetypePosition, chartSize, padding);

  const handleSaveImage = async () => {
    if (!cardRef.current || isSaving) return;

    setIsSaving(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#faf6f1",
        scale: 2, // Higher resolution
        useCORS: true,
        logging: false,
      });

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `${archetype?.name?.toLowerCase().replace(/\s+/g, "-") || "worldview"}-card.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }, "image/png");
    } catch (error) {
      console.error("Failed to save image:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!archetype) {
    return <div className={styles.error}>Unknown archetype</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div ref={cardRef} className={styles.card}>
        {/* Mini Radar Chart */}
        <div className={styles.chartContainer}>
          <svg
            viewBox={`0 0 ${chartSize} ${chartSize}`}
            className={styles.chart}
            aria-label="Worldview compass"
          >
            {/* Background circles */}
            {rings.map((ring, i) => (
              <circle
                key={i}
                cx={center}
                cy={center}
                r={innerRadius * ring}
                className={styles.ring}
              />
            ))}

            {/* Axis lines */}
            <line
              x1={padding}
              y1={center}
              x2={chartSize - padding}
              y2={center}
              className={styles.axis}
            />
            <line
              x1={center}
              y1={padding}
              x2={center}
              y2={chartSize - padding}
              className={styles.axis}
            />

            {/* User position dot */}
            <circle
              cx={userCoords.cx}
              cy={userCoords.cy}
              r={8}
              fill={archetype.color}
              className={styles.userDot}
            />
            <circle
              cx={userCoords.cx}
              cy={userCoords.cy}
              r={12}
              fill="none"
              stroke={archetype.color}
              strokeWidth={2}
              opacity={0.4}
            />
          </svg>

          {/* Axis labels */}
          <div className={`${styles.axisLabel} ${styles.axisNorth}`}>
            <span className={styles.axisPrimary}>what could be</span>
            <span className={styles.axisSecondary}>reach</span>
          </div>
          <div className={`${styles.axisLabel} ${styles.axisSouth}`}>
            <span className={styles.axisPrimary}>what is</span>
            <span className={styles.axisSecondary}>ground</span>
          </div>
          <div className={`${styles.axisLabel} ${styles.axisEast}`}>
            <span className={styles.axisPrimary}>what&apos;s next</span>
            <span className={styles.axisSecondary}>build</span>
          </div>
          <div className={`${styles.axisLabel} ${styles.axisWest}`}>
            <span className={styles.axisPrimary}>what&apos;s true</span>
            <span className={styles.axisSecondary}>perceive</span>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Archetype Name */}
        <h2 className={styles.archetypeName} style={{ color: archetype.color }}>
          {archetype.name.toUpperCase()}
        </h2>

        {/* User name if provided */}
        {userName && <p className={styles.userName}>{userName}</p>}

        {/* Axis Percentages */}
        <div className={styles.percentages}>
          <span>Perceive {percentages.perceivePercent}%</span>
          <span className={styles.dot}>-</span>
          <span>Reach {percentages.reachPercent}%</span>
        </div>

        {/* Pull and Edge */}
        <div className={styles.traits}>
          <p className={styles.trait}>
            <span className={styles.traitLabel}>Your pull:</span> {archetype.pull}
          </p>
          <p className={styles.trait}>
            <span className={styles.traitLabel}>Your edge:</span> {archetype.edge}
          </p>
        </div>

        {/* URL */}
        <p className={styles.url}>livenowclub.com/quiz</p>
      </div>

      {/* Save Button (outside the card so it's not in the screenshot) */}
      <button
        onClick={handleSaveImage}
        disabled={isSaving}
        className={styles.saveButton}
        style={{ backgroundColor: archetype.color }}
      >
        {isSaving ? "Saving..." : "Save Image"}
      </button>
    </div>
  );
}
