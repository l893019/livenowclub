"use client";

import { useState, useEffect } from "react";
import styles from "./NotificationSettings.module.css";

type NotificationSettingsProps = {
  userId: string;
  utopiaSlug: string;
};

export function NotificationSettings({ userId, utopiaSlug }: NotificationSettingsProps) {
  const [email, setEmail] = useState("");
  const [savedEmail, setSavedEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch current email
    fetch(`/api/utopia/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.user?.email) {
          setSavedEmail(data.user.email);
          setEmail(data.user.email);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [userId]);

  const handleSave = async () => {
    if (!email.trim()) return;

    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/utopia/update-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, email: email.trim() }),
      });

      if (res.ok) {
        setSavedEmail(email.trim());
        setShowForm(false);
        setMessage("You'll be notified when someone joins!");
      } else {
        setMessage("Failed to save. Try again.");
      }
    } catch {
      setMessage("Failed to save. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemove = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/utopia/update-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, email: "" }),
      });

      if (res.ok) {
        setSavedEmail(null);
        setEmail("");
        setShowForm(false);
        setMessage("Notifications turned off.");
      }
    } catch {
      setMessage("Failed to update. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return null;

  // Already subscribed
  if (savedEmail && !showForm) {
    return (
      <div className={styles.container}>
        <div className={styles.subscribed}>
          <span className={styles.bellIcon}>🔔</span>
          <span className={styles.subscribedText}>
            Notifications on ({savedEmail})
          </span>
          <button
            className={styles.changeBtn}
            onClick={() => setShowForm(true)}
          >
            Change
          </button>
        </div>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    );
  }

  // Show form
  if (showForm || !savedEmail) {
    return (
      <div className={styles.container}>
        <div className={styles.form}>
          <label className={styles.label}>
            <span className={styles.bellIcon}>🔔</span>
            Get notified when someone joins
          </label>
          <div className={styles.inputRow}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={styles.input}
              disabled={isSaving}
            />
            <button
              onClick={handleSave}
              disabled={isSaving || !email.trim()}
              className={styles.saveBtn}
            >
              {isSaving ? "..." : "Save"}
            </button>
          </div>
          {savedEmail && (
            <button
              className={styles.removeBtn}
              onClick={handleRemove}
              disabled={isSaving}
            >
              Turn off notifications
            </button>
          )}
        </div>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    );
  }

  return null;
}
