"use client";

import { useState, useEffect } from "react";
import { RadarChart } from "@/components/RadarChart";
import { archetypePositions } from "@/lib/radar-positions";
import { archetypes } from "@/lib/archetypes";
import { getSharedUtopia } from "@/lib/shared-utopia";
import styles from "./RelationshipComparison.module.css";

type CompareUser = {
  id: string;
  name: string;
  archetype: string;
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

  // Get the shared utopia content
  const sharedUtopia = getSharedUtopia(yourArchetypeKey, compareUser.archetype);

  // Get current user info from localStorage
  const currentUserId = typeof window !== "undefined" ? localStorage.getItem("quiz-user-id") : null;
  const storedResult = typeof window !== "undefined" ? localStorage.getItem("quiz-user-result") : null;
  let yourName = "You";
  if (storedResult) {
    try {
      const parsed = JSON.parse(storedResult);
      yourName = parsed.name || "You";
    } catch {
      // Use default
    }
  }

  const userDots = [
    {
      id: currentUserId || "you",
      name: yourName,
      position: archetypePositions[yourArchetypeKey] || { x: 0, y: 0 },
      color: yourArchetype.color,
      isYou: true,
    },
    {
      id: compareUser.id,
      name: compareUser.name,
      position: archetypePositions[compareUser.archetype] || { x: 0, y: 0 },
      color: theirArchetype.color,
    },
  ];

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

      <div className={styles.radarContainer}>
        <RadarChart size={280} userDots={userDots} showAllArchetypes={false} />
      </div>

      {sharedUtopia ? (
        <>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>What You'd Build Together</h3>
            <div className={styles.bodyText}>
              {sharedUtopia.whatYoudBuild.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>What Would Be Strong</h3>
            <div className={styles.bodyText}>
              {sharedUtopia.whatWouldBeStrong.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>What Would Be Missing</h3>
            <div className={styles.bodyText}>
              {sharedUtopia.whatWouldBeMissing.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.questionSection}>
            <h3 className={styles.sectionTitle}>The Question You're Answering</h3>
            <p className={styles.questionText}>{sharedUtopia.questionYoureAnswering}</p>
          </div>
        </>
      ) : (
        <div className={styles.section}>
          <p className={styles.bodyText}>Content for this pairing is coming soon.</p>
        </div>
      )}

      {/* Share Button */}
      <div className={styles.shareSection}>
        <button
          className={styles.shareButton}
          onClick={() => {
            const shareUrl = window.location.href;
            const shareText = `${yourArchetype.name.split(" ")[0]} × ${theirArchetype.name.split(" ")[0]} — What we'd build together`;

            if (navigator.share) {
              navigator.share({
                title: `${yourName} × ${compareUser.name}`,
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
