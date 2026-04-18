"use client";

import Header from "@/components/Header";
import { GroupRadarStep } from "../[slug]/steps/GroupRadarStep";
import { NotificationSettings } from "../[slug]/NotificationSettings";
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

export default function DemoUtopiaPage() {
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
          onMemberClick={() => {}}
          currentUserId="demo-1"
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
          <button className={styles.btnSecondary}>
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
