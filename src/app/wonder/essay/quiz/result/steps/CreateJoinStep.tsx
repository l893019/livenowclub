"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "./CreateJoinStep.module.css";

type CreateJoinStepProps = {
  archetypeKey: string;
  inviteSlug?: string | null;
};

const suggestedNames: Record<string, string> = {
  citizen: "The Commons",
  shaper: "The Workshop",
  architect: "The Assembly",
  presence: "The Clearing",
  swimmer: "The Deep End",
  rooted: "The Grove",
  conscience: "The Watchtower",
  embers: "The Archive",
  friction: "The Proving Ground",
  unbound: "The Threshold",
  alive: "The Sensation",
  mender: "The Repair Shop",
  cleareyed: "The Mirror",
  between: "The Liminal",
};

type Mode = "choose" | "create";
type CreateStatus = "idle" | "loading" | "error";

export function CreateJoinStep({ archetypeKey, inviteSlug }: CreateJoinStepProps) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("choose");
  const [utopiaName, setUtopiaName] = useState(
    suggestedNames[archetypeKey] || "My Utopia"
  );
  const [status, setStatus] = useState<CreateStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleJoin = useCallback(() => {
    if (inviteSlug) {
      router.push(`/wonder/essay/quiz/utopia/${inviteSlug}/join`);
    }
  }, [inviteSlug, router]);

  const handleCreate = useCallback(async () => {
    setStatus("loading");
    setErrorMessage(null);

    const userId = localStorage.getItem("quiz-user-id");
    if (!userId) {
      setStatus("error");
      setErrorMessage("Please complete the quiz first.");
      return;
    }

    try {
      const response = await fetch("/api/utopia/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          customName: utopiaName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create utopia");
      }

      // Redirect to the new utopia page
      router.push(`/wonder/essay/quiz/utopia/${data.room.slug}`);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  }, [utopiaName, router]);

  const handleBack = useCallback(() => {
    setMode("choose");
    setStatus("idle");
    setErrorMessage(null);
  }, []);

  if (mode === "choose") {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>What would you like to do?</h2>
          <p className={styles.subtitle}>
            Build your own utopia or join one you've been invited to.
          </p>

          <div className={styles.optionCards}>
            <button
              className={styles.optionCard}
              onClick={() => setMode("create")}
            >
              <span className={styles.optionIcon}>+</span>
              <span className={styles.optionTitle}>Build a Utopia</span>
              <span className={styles.optionDescription}>
                Create a new space and invite others
              </span>
            </button>

            {inviteSlug && (
              <button className={styles.optionCard} onClick={handleJoin}>
                <span className={styles.optionIcon}>&rarr;</span>
                <span className={styles.optionTitle}>Join a Utopia</span>
                <span className={styles.optionDescription}>
                  Accept your invitation
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Create mode
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Name Your Utopia</h2>
        <p className={styles.subtitle}>
          We suggest a name based on your archetype, but feel free to change it.
        </p>

        <div className={styles.createForm}>
          <label htmlFor="utopia-name" className={styles.inputLabel}>
            Utopia Name
          </label>
          <input
            id="utopia-name"
            type="text"
            value={utopiaName}
            onChange={(e) => setUtopiaName(e.target.value)}
            className={styles.textInput}
            placeholder="Enter a name for your utopia"
            disabled={status === "loading"}
            maxLength={50}
          />

          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}

          <div className={styles.createActions}>
            <button
              className={styles.createButton}
              onClick={handleCreate}
              disabled={status === "loading" || !utopiaName.trim()}
            >
              {status === "loading" ? "Creating..." : "Create Utopia"}
            </button>
            <button
              className={styles.backButton}
              onClick={handleBack}
              disabled={status === "loading"}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
