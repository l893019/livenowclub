"use client";

import { useState, useEffect } from "react";
import { JoinAnimation } from "./JoinAnimation";

type Member = {
  id: string;
  name: string;
  archetype: string;
};

type JoinInfo = {
  slug: string;
  userId: string;
  archetype: string;
  name: string;
};

type UtopiaPageClientProps = {
  slug: string;
  utopiaName: string;
  members: Member[];
  children: React.ReactNode;
};

export function UtopiaPageClient({
  slug,
  utopiaName,
  members,
  children,
}: UtopiaPageClientProps) {
  const [showJoinAnimation, setShowJoinAnimation] = useState(false);
  const [joinInfo, setJoinInfo] = useState<JoinInfo | null>(null);
  const [existingMembers, setExistingMembers] = useState<Member[]>([]);

  useEffect(() => {
    // Check for just-joined-utopia in sessionStorage
    const stored = sessionStorage.getItem("just-joined-utopia");
    if (stored) {
      try {
        const info = JSON.parse(stored) as JoinInfo;
        // Verify this is the same utopia
        if (info.slug === slug) {
          setJoinInfo(info);
          // Find the new member and separate from existing
          const newMember = members.find((m) => m.id === info.userId);
          if (newMember) {
            const existing = members.filter((m) => m.id !== info.userId);
            setExistingMembers(existing);
            setShowJoinAnimation(true);
          }
          // Clear it so it doesn't show again
          sessionStorage.removeItem("just-joined-utopia");
        }
      } catch (e) {
        console.error("Failed to parse just-joined-utopia:", e);
      }
    }
  }, [slug, members]);

  const handleAnimationComplete = () => {
    setShowJoinAnimation(false);
  };

  if (showJoinAnimation && joinInfo) {
    const newMember = members.find((m) => m.id === joinInfo.userId);
    if (newMember) {
      return (
        <JoinAnimation
          existingMembers={existingMembers}
          newMember={newMember}
          utopiaName={utopiaName}
          onComplete={handleAnimationComplete}
        />
      );
    }
  }

  return <>{children}</>;
}
