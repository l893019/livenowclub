"use client";

import { RadarChart } from "@/components/RadarChart";
import { archetypePositions } from "@/lib/radar-positions";
import { archetypes } from "@/lib/archetypes";
import { analyzeGroup, type GroupMember } from "@/lib/group-analysis";
import type { UtopiaMember } from "@/lib/utopia";
import styles from "./GroupReadingStep.module.css";

type GroupReadingStepProps = {
  members: UtopiaMember[];
  utopiaName: string;
  utopiaSlug: string;
};

export function GroupReadingStep({
  members,
  utopiaName,
  utopiaSlug,
}: GroupReadingStepProps) {
  // Convert UtopiaMember[] to GroupMember[] for analysis
  const groupMembers: GroupMember[] = members.map((m) => ({
    id: m.id,
    name: m.name || "Anonymous",
    archetype: m.archetype,
  }));

  // Handle edge case: fewer than 3 members
  if (members.length < 3) {
    return (
      <div className={styles.reading}>
        <header className={styles.header}>
          <h1 className={styles.title}>{utopiaName}</h1>
          <p className={styles.subtitle}>
            A utopia of {members.length} worldview{members.length !== 1 ? "s" : ""}
          </p>
        </header>
        <div className={styles.emptyState}>
          <p>Group analysis requires at least 3 members.</p>
          <p>Invite more people to unlock the full group reading.</p>
        </div>
      </div>
    );
  }

  // Run the full analysis
  const analysis = analyzeGroup(groupMembers);

  // Build user dots for radar
  const userDots = members.map((m) => ({
    id: m.id,
    name: m.name || "Member",
    position: archetypePositions[m.archetype] || { x: 0, y: 0 },
    color: archetypes[m.archetype]?.color || "#888",
  }));

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/wonder/essay/quiz/utopia/${utopiaSlug}`;
    const shareText = `${utopiaName} — A utopia of ${members.length} worldviews`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: utopiaName,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  const handleInvite = async () => {
    const inviteUrl = `${window.location.origin}/wonder/essay/quiz/utopia/${utopiaSlug}/join`;

    // Get current user's archetype for personalized share text
    const currentUserId = typeof window !== "undefined" ? localStorage.getItem("quiz-user-id") : null;
    const me = members.find((m) => m.id === currentUserId);
    const myArchetype = me ? archetypes[me.archetype] : null;
    const myArchetypeName = myArchetype?.name || "a unique worldview";

    const shareText = me
      ? `I'm ${myArchetypeName}. What are you? Take the quiz and join my group.`
      : `Take the quiz and join our utopia`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join ${utopiaName}`,
          text: shareText,
          url: inviteUrl,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(inviteUrl);
      alert("Invite link copied!");
    }
  };

  // Get the recommended invite archetype data
  const recommendedArchetype = archetypes[analysis.recommendedInvite];

  return (
    <div className={styles.reading}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>{utopiaName}</h1>
        <p className={styles.subtitle}>
          A utopia of {members.length} worldviews
        </p>
      </header>

      {/* Radar Card */}
      <div className={styles.radarContainer}>
        <div className={styles.radarCard}>
          <RadarChart
            size={280}
            userDots={userDots}
            centerOfGravity={analysis.centerOfGravity.position}
            showAllArchetypes={false}
          />
        </div>
      </div>

      {/* Member List */}
      <div className={styles.memberList}>
        {members.map((member) => {
          const arch = archetypes[member.archetype];
          return (
            <div key={member.id} className={styles.memberItem}>
              <span
                className={styles.memberDot}
                style={{ backgroundColor: arch?.color || "#888" }}
              />
              <span className={styles.memberName}>{member.name || "Anonymous"}</span>
              <span
                className={styles.memberArchetype}
                style={{ color: arch?.color || "#888" }}
              >
                {arch?.name || member.archetype}
              </span>
            </div>
          );
        })}
      </div>

      <div className={styles.divider} />

      {/* WHAT YOU'D BUILD TOGETHER */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What You'd Build Together</h2>
        <div className={styles.bodyText}>
          {analysis.groupUtopia.whatYoudBuild.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <div className={styles.divider} />

      {/* WHAT WOULD BE STRONG */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What Would Be Strong</h2>
        <div className={styles.bodyText}>
          {analysis.groupUtopia.whatWouldBeStrong.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <div className={styles.divider} />

      {/* WHAT WOULD BE MISSING */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What Would Be Missing</h2>
        <div className={styles.bodyText}>
          {analysis.groupUtopia.whatWouldBeMissing.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <div className={styles.divider} />

      {/* THE QUESTION YOU'RE ANSWERING */}
      <section className={styles.questionSection}>
        <h2 className={styles.sectionTitle}>The Question You're Answering</h2>
        <p className={styles.questionText}>{analysis.groupUtopia.questionYoureAnswering}</p>
      </section>

      <div className={styles.divider} />

      {/* INVITE SOMEONE */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Expand Your Group</h2>
        <p className={styles.inviteIntro}>A perspective that would stretch what you build:</p>
        <div className={styles.recommendedArchetype}>
          <h3
            className={styles.recommendedName}
            style={{ color: recommendedArchetype?.color || "#888" }}
          >
            {recommendedArchetype?.name || analysis.recommendedInvite}
          </h3>
          <p className={styles.recommendedTagline}>"{recommendedArchetype?.utopia || ""}"</p>
        </div>
        <div className={styles.bodyText}>
          <p>
            Adding this worldview would introduce questions and instincts your current mix doesn't naturally generate. Of course, the right person to invite is anyone who matters to you—the quiz will reveal where they stand.
          </p>
        </div>
      </section>

      {/* CTA Buttons */}
      <div className={styles.ctaSection}>
        <button className={styles.inviteButton} onClick={handleInvite}>
          Invite Someone
        </button>
        <button className={styles.shareButton} onClick={handleShare}>
          Share This Reading
        </button>
      </div>
    </div>
  );
}
