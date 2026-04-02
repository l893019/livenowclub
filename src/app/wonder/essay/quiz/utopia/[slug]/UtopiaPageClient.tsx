"use client";

import { useState, useEffect, useCallback } from "react";
import { JoinAnimation } from "./JoinAnimation";
import { RelationshipStep } from "./steps/RelationshipStep";
import type { UtopiaMember } from "@/lib/utopia";

type JoinInfo = {
  slug: string;
  userId: string;
  archetype: string;
  name: string;
};

type UtopiaPageClientProps = {
  slug: string;
  utopiaName: string;
  members: UtopiaMember[];
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
  const [existingMembers, setExistingMembers] = useState<UtopiaMember[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  // Get current user ID for relationship view
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("quiz-user-id");
    setCurrentUserId(userId);
  }, []);

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

  const handleMemberClick = useCallback(
    (memberId: string) => {
      // Only show relationship if it's not clicking yourself
      if (memberId !== currentUserId) {
        setSelectedMemberId(memberId);
      }
    },
    [currentUserId]
  );

  const handleBackToGroup = () => {
    setSelectedMemberId(null);
  };

  // Get navigation for relationship step (prev/next through other members)
  const otherMembers = members.filter((m) => m.id !== currentUserId);
  const selectedIndex = selectedMemberId
    ? otherMembers.findIndex((m) => m.id === selectedMemberId)
    : -1;

  const handleNextMember = () => {
    if (selectedIndex < otherMembers.length - 1) {
      setSelectedMemberId(otherMembers[selectedIndex + 1].id);
    }
  };

  const handlePrevMember = () => {
    if (selectedIndex > 0) {
      setSelectedMemberId(otherMembers[selectedIndex - 1].id);
    }
  };

  // Listen for member click events from radar components
  useEffect(() => {
    const handler = (e: CustomEvent<{ memberId: string }>) => {
      handleMemberClick(e.detail.memberId);
    };
    window.addEventListener(
      "utopia-member-click",
      handler as EventListener
    );
    return () => {
      window.removeEventListener(
        "utopia-member-click",
        handler as EventListener
      );
    };
  }, [handleMemberClick]);

  // Show join animation if applicable
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

  // Show relationship view if a member is selected
  if (selectedMemberId && currentUserId) {
    const you = members.find((m) => m.id === currentUserId);
    const them = members.find((m) => m.id === selectedMemberId);

    if (you && them) {
      return (
        <RelationshipStep
          you={you}
          them={them}
          onBack={handleBackToGroup}
          onNext={
            selectedIndex < otherMembers.length - 1
              ? handleNextMember
              : undefined
          }
          onPrev={selectedIndex > 0 ? handlePrevMember : undefined}
          hasNext={selectedIndex < otherMembers.length - 1}
          hasPrev={selectedIndex > 0}
        />
      );
    }
  }

  return <>{children}</>;
}

// Export a function to trigger member click from other components
export function triggerMemberClick(memberId: string) {
  window.dispatchEvent(
    new CustomEvent("utopia-member-click", { detail: { memberId } })
  );
}
