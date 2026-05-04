"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { generateStarName } from "@/lib/star-names";
import styles from "./CreateJoinStep.module.css";

type CreateStatus = "idle" | "loading" | "error";

export function CreateJoinStep() {
  const router = useRouter();
  // Generate a random star name once on mount
  const suggestedName = useMemo(() => generateStarName(), []);
  const [groupName, setGroupName] = useState(suggestedName);
  const [email, setEmail] = useState("");
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
          email: email.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create group");
      }

      // Store created utopia so result page knows about it
      sessionStorage.setItem("created-utopia", JSON.stringify({
        slug: data.room.slug,
        name: data.room.name,
      }));

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

          <label htmlFor="email" className={styles.inputLabel}>
            Get notified when friends join (optional)
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.textInput}
            placeholder="your@email.com"
            disabled={status === "loading"}
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
