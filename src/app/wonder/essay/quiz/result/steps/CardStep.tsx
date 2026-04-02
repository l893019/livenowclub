"use client";

import { useState, useCallback } from "react";
import { MiniRadarChart } from "@/components/MiniRadarChart";
import { archetypes } from "@/lib/archetypes";
import styles from "./CardStep.module.css";

type CardStepProps = {
  archetypeKey: string;
  imageUrl: string;
  onContinue: () => void;
};

export function CardStep({ archetypeKey, imageUrl, onContinue }: CardStepProps) {
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "shared">("idle");

  const archetype = archetypes[archetypeKey];

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/wonder/essay/quiz/result?a=${archetypeKey}`
    : "";

  const shareText = archetype
    ? `${archetype.name}\n\n${archetype.utopia}`
    : "";

  const handleShare = useCallback(async () => {
    const shareData = {
      title: archetype?.name || "My Utopia Archetype",
      text: shareText,
      url: shareUrl,
    };

    // Try native share API first
    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        setShareStatus("shared");
        setTimeout(() => setShareStatus("idle"), 2000);
        return;
      } catch (err) {
        // User cancelled or share failed, fall through to clipboard
        if ((err as Error).name === "AbortError") {
          return; // User cancelled, don't show anything
        }
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareStatus("copied");
      setTimeout(() => setShareStatus("idle"), 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  }, [archetype?.name, shareText, shareUrl]);

  if (!archetype) {
    return null;
  }

  return (
    <div className={styles.container}>
      {/* The shareable card */}
      <div className={styles.card}>
        {/* Archetype name */}
        <h2 className={styles.archetypeName} style={{ color: archetype.color }}>
          {archetype.name}
        </h2>

        {/* Island image */}
        <img
          src={imageUrl}
          alt={archetype.name}
          className={styles.islandImage}
        />

        {/* Utopia quote */}
        <p className={styles.utopiaQuote}>
          {archetype.utopia}
        </p>

        {/* Mini radar */}
        <div className={styles.radarContainer}>
          <MiniRadarChart
            members={[{ archetype: archetypeKey }]}
            size={60}
          />
        </div>

        {/* Branding */}
        <span className={styles.branding}>livenowclub.com/quiz</span>
      </div>

      {/* Actions below card */}
      <div className={styles.actions}>
        <button
          className={styles.shareButton}
          onClick={handleShare}
          aria-label="Share your result"
        >
          {shareStatus === "copied" ? "Copied!" : shareStatus === "shared" ? "Shared!" : "Share"}
        </button>
        <button
          className={styles.continueButton}
          onClick={onContinue}
        >
          Go Deeper &rarr;
        </button>
      </div>
    </div>
  );
}
