"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ComparisonSpectrum } from "./ComparisonSpectrum";
import { generateComparisonReading } from "@/lib/comparison-reading";
import { calculateDimensions, arrayToQuizAnswers, type Dimensions } from "@/lib/dimensions";
import {
  identities,
  getIdentityFromDimensions,
  getAdjectiveIndex,
  type Identity,
} from "@/lib/identities";
import styles from "./ComparisonView.module.css";

type UserData = {
  id: string;
  name: string;
  answers: string[];
};

type ComparisonViewProps = {
  userId: string;
  compareUserId: string;
};

export function ComparisonView({ userId, compareUserId }: ComparisonViewProps) {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [otherUser, setOtherUser] = useState<UserData | null>(null);
  const [currentDimensions, setCurrentDimensions] = useState<Dimensions | null>(null);
  const [otherDimensions, setOtherDimensions] = useState<Dimensions | null>(null);
  const [currentIdentity, setCurrentIdentity] = useState<Identity | null>(null);
  const [otherIdentity, setOtherIdentity] = useState<Identity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);

        // Fetch both users in parallel
        const [currentResponse, otherResponse] = await Promise.all([
          fetch(`/api/utopia/user/${userId}`),
          fetch(`/api/utopia/user/${compareUserId}`),
        ]);

        if (!currentResponse.ok || !otherResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const currentData = await currentResponse.json();
        const otherData = await otherResponse.json();

        if (!currentData.user || !otherData.user) {
          throw new Error("User data not found");
        }

        if (!currentData.user.answers || !otherData.user.answers) {
          throw new Error("Missing quiz answers");
        }

        setCurrentUser(currentData.user);
        setOtherUser(otherData.user);

        // Calculate dimensions for both users
        const currentAnswers = arrayToQuizAnswers(currentData.user.answers);
        const otherAnswers = arrayToQuizAnswers(otherData.user.answers);

        if (!currentAnswers || !otherAnswers) {
          throw new Error("Invalid quiz answers");
        }

        const currentDims = calculateDimensions(currentAnswers);
        const otherDims = calculateDimensions(otherAnswers);

        setCurrentDimensions(currentDims);
        setOtherDimensions(otherDims);

        // Get identities
        const currentAdjIndex = getAdjectiveIndex(currentDims.certainty, currentDims.posture);
        const otherAdjIndex = getAdjectiveIndex(otherDims.certainty, otherDims.posture);

        const currentIdent = getIdentityFromDimensions(
          currentDims.agency,
          currentDims.certainty,
          currentDims.posture,
          currentAdjIndex
        );

        const otherIdent = getIdentityFromDimensions(
          otherDims.agency,
          otherDims.certainty,
          otherDims.posture,
          otherAdjIndex
        );

        if (!currentIdent || !otherIdent) {
          throw new Error("Could not determine identities");
        }

        setCurrentIdentity(currentIdent);
        setOtherIdentity(otherIdent);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err instanceof Error ? err.message : "Could not load comparison. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [userId, compareUserId]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading comparison...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  if (!currentUser || !otherUser || !currentDimensions || !otherDimensions || !currentIdentity || !otherIdentity) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          Could not load comparison data. Please make sure both users have completed the quiz.
        </div>
      </div>
    );
  }

  // Debug logging
  console.log('ComparisonView Debug:', {
    currentUser: currentUser.name,
    otherUser: otherUser.name,
    currentDimensions,
    otherDimensions,
    currentIdentity: currentIdentity.name,
    otherIdentity: otherIdentity.name
  });

  // Generate reading
  const reading = generateComparisonReading(
    currentDimensions,
    otherDimensions,
    { name: currentIdentity.name },
    { name: otherIdentity.name },
    "You",
    otherUser.name
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Your Relationship with {otherUser.name}</h1>
        <p className={styles.subtitle}>Based on your worldview dimensions</p>
      </div>

      {/* Comparison Spectrum */}
      <ComparisonSpectrum
        userDimensions={currentDimensions}
        otherDimensions={otherDimensions}
        userName="You"
        otherName={otherUser.name}
      />

      {/* Reading Section */}
      <div className={styles.reading}>
        <p className={styles.intro}>{reading.intro}</p>
        <div className={styles.narrative}>
          {reading.narrative.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <Link href="/wonder/essay/quiz/result" className={styles.primaryButton}>
          See Your Results
        </Link>
        <button onClick={handleCopyLink} className={styles.secondaryButton}>
          {linkCopied ? "Link Copied!" : "Share This Comparison"}
        </button>
        <Link href="/wonder/essay/quiz/result" className={styles.secondaryButton}>
          See All Comparisons
        </Link>
      </div>
    </div>
  );
}
