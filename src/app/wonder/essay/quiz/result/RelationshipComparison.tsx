"use client";

import { useState, useEffect, useMemo } from "react";
import { archetypes, getAnalyticalPairDynamic } from "@/lib/archetypes";
import { arrayToQuizAnswers, calculateDimensions } from "@/lib/dimensions";
import { DimensionSpectrum } from "./DimensionSpectrum";
import styles from "./RelationshipComparison.module.css";

type CompareUser = {
  id: string;
  name: string;
  archetype: string;
  answers?: string[];
};

type RelationshipComparisonProps = {
  yourArchetypeKey: string;
  compareUserId: string;
};

export function RelationshipComparison({
  yourArchetypeKey,
  compareUserId,
}: RelationshipComparisonProps) {
  const [compareUser, setCompareUser] = useState<CompareUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCompareUser() {
      try {
        const response = await fetch(`/api/utopia/user/${compareUserId}`);
        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();
        if (data.user) {
          setCompareUser({
            id: data.user.id,
            name: data.user.name || "Anonymous",
            archetype: data.user.archetype,
            answers: data.user.answers,
          });
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCompareUser();
  }, [compareUserId]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading comparison...</div>
      </div>
    );
  }

  if (error || !compareUser) {
    return null; // Silently fail - don't show anything if we can't load the user
  }

  const yourArchetype = archetypes[yourArchetypeKey];
  const theirArchetype = archetypes[compareUser.archetype];

  if (!yourArchetype || !theirArchetype) {
    return null;
  }

  // Get the relationship analysis
  const dynamic = getAnalyticalPairDynamic(yourArchetypeKey, compareUser.archetype);

  // Get current user info from localStorage
  const storedResult = typeof window !== "undefined" ? localStorage.getItem("quiz-user-result") : null;
  let yourName = "You";
  let yourAnswers: string[] | null = null;
  if (storedResult) {
    try {
      const parsed = JSON.parse(storedResult);
      yourName = parsed.name || "You";
      yourAnswers = parsed.answers || null;
    } catch {
      // Use default
    }
  }

  // Calculate dimensions for both people
  const yourDimensions = useMemo(() => {
    if (yourAnswers?.length === 7) {
      const quizAnswers = arrayToQuizAnswers(yourAnswers);
      return quizAnswers ? calculateDimensions(quizAnswers) : null;
    }
    return null;
  }, [yourAnswers]);

  const theirDimensions = useMemo(() => {
    if (compareUser.answers?.length === 7) {
      const quizAnswers = arrayToQuizAnswers(compareUser.answers);
      return quizAnswers ? calculateDimensions(quizAnswers) : null;
    }
    return null;
  }, [compareUser.answers]);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <span style={{ color: yourArchetype.color }}>{yourName}</span>
          <span className={styles.times}> &times; </span>
          <span style={{ color: theirArchetype.color }}>{compareUser.name}</span>
        </h2>
        <p className={styles.subtitle}>
          {yourArchetype.name} & {theirArchetype.name}
        </p>
      </div>

      {/* Dimension Spectrums */}
      <div className={styles.spectrums}>
        {yourDimensions && (
          <div className={styles.spectrumCard}>
            <h4 className={styles.spectrumLabel} style={{ color: yourArchetype.color }}>
              {yourName}
            </h4>
            <DimensionSpectrum dimensions={yourDimensions} />
          </div>
        )}
        {theirDimensions && (
          <div className={styles.spectrumCard}>
            <h4 className={styles.spectrumLabel} style={{ color: theirArchetype.color }}>
              {compareUser.name}
            </h4>
            <DimensionSpectrum dimensions={theirDimensions} />
          </div>
        )}
        {!yourDimensions && !theirDimensions && (
          <p className={styles.spectrumEmpty}>
            Both people need to complete the quiz to see dimension comparison.
          </p>
        )}
      </div>

      <p className={styles.thesis}>&ldquo;{dynamic.thesis}&rdquo;</p>

      <div className={styles.divider} />

      {/* THE DYNAMIC */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>The Dynamic</h3>
        <div className={styles.bodyText}>
          {dynamic.dynamic.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      {/* WHERE YOU ALIGN */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Where You Align</h3>
        {dynamic.align.map((item, i) => (
          <div key={i} className={styles.point}>
            <h4 className={styles.pointHeading}>{item.point}</h4>
            <p className={styles.pointText}>{item.explanation}</p>
          </div>
        ))}
      </div>

      <div className={styles.divider} />

      {/* WHERE YOU'LL CLASH */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Where You&apos;ll Clash</h3>
        {dynamic.clash.map((item, i) => (
          <div key={i} className={styles.point}>
            <h4 className={styles.pointHeading}>{item.point}</h4>
            <p className={styles.pointText}>{item.explanation}</p>
          </div>
        ))}
      </div>

      <div className={styles.divider} />

      {/* WHAT YOU EXCHANGE */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>What You Exchange</h3>

        <div className={styles.exchangeBlock}>
          <h4 className={styles.exchangeName} style={{ color: yourArchetype.color }}>
            What you give {compareUser.name}
          </h4>
          <p className={styles.exchangeText}>{dynamic.give.youToThem}</p>
        </div>

        <div className={styles.exchangeBlock}>
          <h4 className={styles.exchangeName} style={{ color: theirArchetype.color }}>
            What {compareUser.name} gives you
          </h4>
          <p className={styles.exchangeText}>{dynamic.give.themToYou}</p>
        </div>
      </div>

      <div className={styles.divider} />

      {/* A QUESTION */}
      <div className={styles.questionSection}>
        <h3 className={styles.sectionTitle}>A Question for You Both</h3>
        <p className={styles.questionText}>&ldquo;{dynamic.question.text}&rdquo;</p>
        <p className={styles.questionFraming}>{dynamic.question.framing}</p>
      </div>

      {/* Share Button */}
      <div className={styles.shareSection}>
        <button
          className={styles.shareButton}
          onClick={() => {
            const shareUrl = window.location.href;
            const shareText = `${yourArchetype.name.split(" ")[0]} x ${theirArchetype.name.split(" ")[0]} — See our relationship`;

            if (navigator.share) {
              navigator.share({
                title: `${yourName} x ${compareUser.name}`,
                text: shareText,
                url: shareUrl,
              });
            } else {
              navigator.clipboard.writeText(shareUrl);
              alert("Link copied to clipboard!");
            }
          }}
        >
          Share This Reading
        </button>
      </div>
    </section>
  );
}
