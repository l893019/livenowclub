"use client";

import { useState, useEffect } from "react";
import { arrayToQuizAnswers } from "@/lib/dimensions";
import { GroupDimensionSpectrum } from "./GroupDimensionSpectrum";
import type { GroupReading } from "@/lib/reading-prompts";
import type { UtopiaMember } from "@/lib/utopia";
import styles from "./GroupReadingStep.module.css";

type GroupReadingStepProps = {
  members: UtopiaMember[];
  utopiaName: string;
  utopiaSlug: string;
  currentUserId?: string;
  onMemberClick?: (memberId: string) => void;
};

export function GroupReadingStep({
  members,
  utopiaName,
  utopiaSlug,
  currentUserId,
  onMemberClick,
}: GroupReadingStepProps) {
  const [llmReading, setLlmReading] = useState<GroupReading | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch LLM-generated group reading when all members have answers
  useEffect(() => {
    // Check if all members have answers
    const allHaveAnswers = members.every((m) => m.answers?.length === 7);

    if (allHaveAnswers && members.length >= 2) {
      const membersWithAnswers = members.map((m) => {
        const answers = arrayToQuizAnswers(m.answers!);
        return {
          name: m.name || "Anonymous",
          answers: answers!,
        };
      });

      setIsLoading(true);
      setError(null);
      fetch("/api/reading/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "group",
          members: membersWithAnswers,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Group reading API response:", data);
          if (data.error) {
            setError(data.error);
          } else if (data.reading) {
            setLlmReading(data.reading);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Group reading fetch error:", err);
          setError(err.message || "Failed to fetch reading");
          setIsLoading(false);
        });
    }
  }, [members]);

  // Handle edge case: fewer than 2 members
  if (members.length < 2) {
    return (
      <div className={styles.reading}>
        <header className={styles.header}>
          <h1 className={styles.title}>{utopiaName}</h1>
          <p className={styles.subtitle}>
            A utopia of {members.length} worldview{members.length !== 1 ? "s" : ""}
          </p>
        </header>
        <div className={styles.emptyState}>
          <p>Group analysis requires at least 2 members.</p>
          <p>Invite more people to unlock the full group reading.</p>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/wonder/essay/quiz/utopia/${utopiaSlug}`;
    const shareText = `${utopiaName} — A utopia of ${members.length} worldviews`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: utopiaName,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  const handleInvite = async () => {
    const inviteUrl = `${window.location.origin}/wonder/essay/quiz/utopia/${utopiaSlug}/join`;
    const shareText = "Take the quiz and join our utopia";

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join ${utopiaName}`,
          text: shareText,
          url: inviteUrl,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(inviteUrl);
      alert("Invite link copied!");
    }
  };

  return (
    <div className={styles.reading}>
      {/* Group Dimension Spectrum */}
      <GroupDimensionSpectrum
        members={members}
        onMemberClick={onMemberClick}
        currentUserId={currentUserId}
      />

      <div className={styles.divider} />

      {isLoading ? (
        <div className={styles.loading}>Generating your group reading...</div>
      ) : llmReading ? (
        <>
          {/* Section 1: Your Group Pattern */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Your Group Pattern</h2>
            <p className={styles.bodyText}>{llmReading.groupPattern}</p>
          </section>

          <div className={styles.divider} />

          {/* Section 2: Your Shared Strength */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Your Shared Strength</h2>
            <p className={styles.bodyText}>{llmReading.sharedStrength}</p>
          </section>

          <div className={styles.divider} />

          {/* Section 3: How You'll Move Together */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>How You'll Move Together</h2>
            <p className={styles.bodyText}>{llmReading.groupMovement}</p>
          </section>

          <div className={styles.divider} />

          {/* Section 4: Watch For */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Watch For</h2>
            <p className={styles.bodyText}>{llmReading.watchFor}</p>
          </section>

          <div className={styles.divider} />

          {/* Section 5: What You'd Build */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What You'd Build</h2>
            <p className={styles.bodyText}>{llmReading.whatYoudBuild}</p>
          </section>
        </>
      ) : error ? (
        <div className={styles.emptyState}>
          <p>Couldn't generate the group reading.</p>
          <p>Please try refreshing the page.</p>
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>All members need to complete the quiz to see the group reading.</p>
        </div>
      )}

      {/* CTA Buttons */}
      <div className={styles.ctaSection}>
        <button className={styles.inviteButton} onClick={handleInvite}>
          Invite Someone
        </button>
        <button className={styles.shareButton} onClick={handleShare}>
          Share This Reading
        </button>
      </div>
    </div>
  );
}
