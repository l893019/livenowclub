"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "./CreateJoinStep.module.css";

type CreateJoinStepProps = {
  archetypeKey: string;
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

type CreateStatus = "idle" | "loading" | "error";

export function CreateJoinStep({ archetypeKey }: CreateJoinStepProps) {
  const router = useRouter();
  const [groupName, setGroupName] = useState(
    suggestedNames[archetypeKey] || "My Group"
  );
  const [status, setStatus] = useState<CreateStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
          customName: groupName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create group");
      }

      // Redirect to the new group page
      router.push(`/wonder/essay/quiz/utopia/${data.room.slug}`);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  }, [groupName, router]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Create a Group</h2>
        <p className={styles.subtitle}>
          Compare worldviews with friends, family, or coworkers.
          Name your group and share the invite link.
        </p>

        <div className={styles.createForm}>
          <label htmlFor="group-name" className={styles.inputLabel}>
            Group Name
          </label>
          <input
            id="group-name"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className={styles.textInput}
            placeholder="Enter a name for your group"
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
              disabled={status === "loading" || !groupName.trim()}
            >
              {status === "loading" ? "Creating..." : "Create Group"}
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
