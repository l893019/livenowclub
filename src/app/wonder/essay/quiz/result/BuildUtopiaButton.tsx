"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type BuildUtopiaButtonProps = {
  archetypeKey: string;
};

export default function BuildUtopiaButton({ archetypeKey }: BuildUtopiaButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleBuildUtopia = async () => {
    setIsLoading(true);

    try {
      // Get or create userId from localStorage
      let userId = localStorage.getItem("quiz-user-id");
      if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem("quiz-user-id", userId);
      }

      // Create the utopia room
      const response = await fetch("/api/utopia/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (data.success && data.room) {
        // Redirect to the shared utopia page
        router.push(`/wonder/essay/quiz/utopia/${data.room.slug}`);
      } else {
        console.error("Failed to create utopia:", data.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error creating utopia:", error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleBuildUtopia}
      disabled={isLoading}
      className="btn btn-primary"
    >
      {isLoading ? "Creating..." : "Create Shared Utopia"}
    </button>
  );
}
