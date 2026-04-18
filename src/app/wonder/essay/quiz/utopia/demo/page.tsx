"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { GroupRadarStep } from "../[slug]/steps/GroupRadarStep";
import { GroupReadingStep } from "../[slug]/steps/GroupReadingStep";
import { RelationshipStep } from "../[slug]/steps/RelationshipStep";
import { ReadingPage } from "@/app/wonder/essay/quiz/result/ReadingPage";
import type { UtopiaMember } from "@/lib/utopia";
import styles from "../[slug]/UtopiaPageClient.module.css";

// Demo page with fake members to show what a multi-person utopia looks like
const demoMembers: UtopiaMember[] = [
  { id: "demo-1", name: "Louise", archetype: "presence", joinedAt: "2026-04-18" },
  { id: "demo-2", name: "Sarah", archetype: "shaper", joinedAt: "2026-04-17" },
  { id: "demo-3", name: "Marcus", archetype: "rooted", joinedAt: "2026-04-16" },
  { id: "demo-4", name: "Priya", archetype: "conscience", joinedAt: "2026-04-15" },
  { id: "demo-5", name: "Tom", archetype: "swimmer", joinedAt: "2026-04-14" },
];

const CURRENT_USER_ID = "demo-1";

type View = "radar" | "reading" | "relationship" | "profile" | "their-reading";

export default function DemoUtopiaPage() {
  const [currentView, setCurrentView] = useState<View>("radar");
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const handleMemberClick = useCallback((memberId: string) => {
    if (memberId === CURRENT_USER_ID) {
      setCurrentView("profile");
    } else {
      setSelectedMemberId(memberId);
      setCurrentView("relationship");
    }
  }, []);

  const handleBackToRadar = () => {
    setSelectedMemberId(null);
    setCurrentView("radar");
  };

  const handleShowReading = () => {
    setCurrentView("reading");
  };

  const handleViewTheirReading = () => {
    setCurrentView("their-reading");
  };

  // Navigation for relationship step
  const otherMembers = demoMembers.filter((m) => m.id !== CURRENT_USER_ID);
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

  // Profile view (current user's full reading)
  if (currentView === "profile") {
    const me = demoMembers.find((m) => m.id === CURRENT_USER_ID);
    if (me) {
      return (
        <ReadingPage
          archetypeKey={me.archetype}
          onBack={handleBackToRadar}
          groupContext={{
            utopiaSlug: "demo",
            utopiaName: "The Explorers",
          }}
        />
      );
    }
  }

  // Relationship view
  if (currentView === "relationship" && selectedMemberId) {
    const you = demoMembers.find((m) => m.id === CURRENT_USER_ID);
    const them = demoMembers.find((m) => m.id === selectedMemberId);

    if (you && them) {
      return (
        <RelationshipStep
          you={you}
          them={them}
          utopiaSlug="demo"
          utopiaName="The Explorers"
          onBack={handleBackToRadar}
          onNext={selectedIndex < otherMembers.length - 1 ? handleNextMember : undefined}
          onPrev={selectedIndex > 0 ? handlePrevMember : undefined}
          hasNext={selectedIndex < otherMembers.length - 1}
          hasPrev={selectedIndex > 0}
          onViewTheirReading={handleViewTheirReading}
        />
      );
    }
  }

  // Their reading view
  if (currentView === "their-reading" && selectedMemberId) {
    const them = demoMembers.find((m) => m.id === selectedMemberId);
    if (them) {
      return (
        <ReadingPage
          archetypeKey={them.archetype}
          onBack={() => setCurrentView("relationship")}
          groupContext={{
            utopiaSlug: "demo",
            utopiaName: "The Explorers",
          }}
          personName={them.name || "Anonymous"}
        />
      );
    }
  }

  // Group reading view
  if (currentView === "reading") {
    return (
      <div className={styles.container}>
        <Header />
        <button className={styles.backButton} onClick={handleBackToRadar}>
          ← Back to radar
        </button>
        <main className={styles.readingMain}>
          <GroupReadingStep
            members={demoMembers}
            utopiaName="The Explorers"
            utopiaSlug="demo"
          />
          <p style={{
            textAlign: "center",
            fontSize: "12px",
            color: "rgba(45,42,38,0.45)",
            marginTop: "24px"
          }}>
            (This is a demo with fake data)
          </p>
        </main>
      </div>
    );
  }

  // Main radar view (default)
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <span className={styles.label}>Your Utopia</span>
          <h1 className={styles.title}>The Explorers</h1>
          <p className={styles.count}>5 people</p>
        </div>

        <GroupRadarStep
          members={demoMembers}
          utopiaName="The Explorers"
          onMemberClick={handleMemberClick}
          currentUserId={CURRENT_USER_ID}
        />

        <div style={{
          background: "rgba(232, 23, 138, 0.04)",
          borderRadius: "12px",
          padding: "16px 20px",
          margin: "24px 0",
          border: "1px solid rgba(232, 23, 138, 0.1)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>🔔</span>
            <span style={{ fontSize: "14px", color: "rgba(45,42,38,0.7)" }}>
              Notifications on (louise@example.com)
            </span>
            <button style={{
              background: "none",
              border: "none",
              color: "#e8178a",
              fontSize: "13px",
              cursor: "pointer",
              textDecoration: "underline"
            }}>
              Change
            </button>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.btnSecondary} onClick={handleShowReading}>
            Group Reading
          </button>
          <button className={styles.btnPrimary}>
            Invite Someone
          </button>
        </div>

        <p style={{
          textAlign: "center",
          fontSize: "12px",
          color: "rgba(45,42,38,0.45)",
          marginTop: "24px"
        }}>
          (This is a demo with fake data)
        </p>
      </main>
    </div>
  );
}
