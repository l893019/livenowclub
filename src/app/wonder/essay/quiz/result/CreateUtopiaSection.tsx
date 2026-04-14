"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SUGGESTED_NAMES: Record<string, string> = {
  citizen: "The Abundant Commons",
  shaper: "The Unfinished City",
  architect: "The People's House",
  presence: "The Gathering Place",
  swimmer: "The Deep End",
  rooted: "The Still Garden",
  conscience: "The Watchtower",
  embers: "The Memory Palace",
  friction: "The Proving Ground",
  unbound: "The Infinite Edge",
  alive: "The Feeling World",
  mender: "The Repair Shop",
  cleareyed: "The Clear View",
  between: "The Threshold",
};

type CreateUtopiaSectionProps = {
  archetypeKey: string;
};

export default function CreateUtopiaSection({ archetypeKey }: CreateUtopiaSectionProps) {
  const router = useRouter();
  const suggestedName = SUGGESTED_NAMES[archetypeKey] || "My Utopia";
  const [name, setName] = useState(suggestedName);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateUtopia = async () => {
    if (!name.trim()) {
      setError("Please enter a name for your utopia");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get or create userId from localStorage
      let userId = localStorage.getItem("quiz-user-id");
      if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem("quiz-user-id", userId);
      }

      // Create the utopia
      const response = await fetch("/api/utopia/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          customName: name.trim(),
          email: email.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (data.success && data.room) {
        router.push(`/wonder/essay/quiz/utopia/${data.room.slug}`);
      } else {
        setError(data.error || "Failed to create utopia");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error creating utopia:", err);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="create-utopia-section">
      <div className="create-utopia-title">Create Your Utopia</div>
      <p className="create-utopia-desc">
        Invite others to see how your worldviews combine.
      </p>

      <div className="utopia-name-input-wrapper">
        <label htmlFor="utopia-name" className="utopia-name-label">Name it:</label>
        <input
          id="utopia-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="utopia-name-input"
          placeholder="Enter a name..."
          disabled={isLoading}
        />
      </div>

      <div className="utopia-email-input-wrapper">
        <label htmlFor="utopia-email" className="utopia-email-label">
          Get notified when friends join (optional):
        </label>
        <input
          id="utopia-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="utopia-email-input"
          placeholder="your@email.com"
          disabled={isLoading}
        />
      </div>

      {error && <p className="create-utopia-error">{error}</p>}

      <button
        onClick={handleCreateUtopia}
        disabled={isLoading}
        className="btn btn-primary"
      >
        {isLoading ? "Creating..." : "Create Utopia"}
      </button>

      <style jsx>{`
        .create-utopia-section {
          max-width: 400px;
          margin-bottom: 48px;
          text-align: center;
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }
        .create-utopia-title {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--text);
          margin-bottom: 8px;
        }
        .create-utopia-desc {
          font-size: 0.95rem;
          color: var(--text-dim);
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .utopia-name-input-wrapper {
          margin-bottom: 20px;
        }
        .utopia-name-label {
          display: block;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 8px;
          text-align: left;
        }
        .utopia-name-input {
          width: 100%;
          padding: 14px 16px;
          font-size: 1rem;
          font-family: inherit;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 8px;
          background: var(--bg-deep, #faf6f1);
          color: var(--text);
          transition: border-color 0.2s;
        }
        .utopia-name-input:focus {
          outline: none;
          border-color: var(--accent-pink, #e8178a);
        }
        .utopia-name-input:disabled {
          opacity: 0.6;
        }
        .utopia-email-input-wrapper {
          margin-bottom: 20px;
        }
        .utopia-email-label {
          display: block;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 8px;
          text-align: left;
        }
        .utopia-email-input {
          width: 100%;
          padding: 14px 16px;
          font-size: 1rem;
          font-family: inherit;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 8px;
          background: var(--bg-deep, #faf6f1);
          color: var(--text);
          transition: border-color 0.2s;
        }
        .utopia-email-input:focus {
          outline: none;
          border-color: var(--accent-pink, #e8178a);
        }
        .utopia-email-input:disabled {
          opacity: 0.6;
        }
        .create-utopia-error {
          font-size: 0.85rem;
          color: #d64545;
          margin-bottom: 16px;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          border-radius: 50px;
          transition: all 0.3s;
          cursor: pointer;
          border: none;
          font-family: inherit;
        }
        .btn-primary {
          background: var(--accent-pink, #e8178a);
          color: white;
        }
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(232,23,138,0.3);
        }
        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
