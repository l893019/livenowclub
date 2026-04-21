"use client";

import { archetypes } from "@/lib/archetypes";
import { generateGroupReading, type GroupMember } from "@/lib/group-dynamics";
import type { UtopiaMember } from "@/lib/utopia";
import styles from "./GroupReadingStep.module.css";

type GroupReadingStepProps = {
  members: UtopiaMember[];
  utopiaName: string;
  utopiaSlug: string;
  currentUserId?: string;
  onPairClick?: (memberAId: string, memberBId: string) => void;
};

export function GroupReadingStep({
  members,
  utopiaName,
  utopiaSlug,
  currentUserId,
  onPairClick,
}: GroupReadingStepProps) {
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

  // Convert UtopiaMember[] to GroupMember[] for analysis
  const groupMembers: GroupMember[] = members.map((m) => ({
    id: m.id,
    name: m.name || "Anonymous",
    archetype: m.archetype,
  }));

  // Generate the rich group reading
  const groupReading = generateGroupReading(groupMembers, currentUserId);

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

  return (
    <div className={styles.reading}>
      {/* SECTION 1: YOUR GROUP AT A GLANCE */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Group at a Glance</h2>
        <div className={styles.bodyText}>
          <p className={styles.poeticOpening}>{groupReading.atGlance.poeticOpening}</p>
          <p>
            <strong>You're strong at:</strong> {groupReading.atGlance.strengths.join(", ")}
          </p>
          <p>
            <strong>You may struggle with:</strong> {groupReading.atGlance.struggles.join(", ")}
          </p>
          <p className={styles.whatsMissing}>{groupReading.atGlance.whatsMissing}</p>
        </div>
      </section>

      <div className={styles.divider} />

      {/* SECTION 2: WHO PLAYS WHAT ROLE */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Who Plays What Role</h2>
        <div className={styles.rolesList}>
          {groupReading.roles.map((role) => {
            const arch = archetypes[role.archetype];
            return (
              <div key={role.memberId} className={styles.roleCard}>
                <div className={styles.roleHeader}>
                  <span
                    className={styles.memberDot}
                    style={{ backgroundColor: arch?.color || "#888" }}
                  />
                  <span className={styles.memberName}>{role.memberName}</span>
                  <span className={styles.roleNameBadge}>{role.roleName}</span>
                </div>
                <div className={styles.roleDescription}>
                  {role.roleDescription.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className={styles.divider} />

      {/* SECTION 3: WHERE YOU'LL CLICK / WHERE YOU'LL PUSH */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Where You'll Click / Where You'll Push</h2>

        {groupReading.pairDynamics.clicks.length > 0 && (
          <div className={styles.dynamicsGroup}>
            <h3 className={styles.dynamicsSubtitle}>WHERE YOU'LL CLICK</h3>
            {groupReading.pairDynamics.clicks.map((pair, i) => (
              <div
                key={`click-${i}`}
                className={styles.pairCard}
                onClick={() => onPairClick?.(pair.memberAId, pair.memberBId)}
                role={onPairClick ? "button" : undefined}
                tabIndex={onPairClick ? 0 : undefined}
              >
                <div className={styles.pairNames}>
                  <span>{pair.memberAName}</span>
                  <span className={styles.pairPlus}>+</span>
                  <span>{pair.memberBName}</span>
                </div>
                <p className={styles.pairDescription}>{pair.description}</p>
              </div>
            ))}
          </div>
        )}

        {groupReading.pairDynamics.pushes.length > 0 && (
          <div className={styles.dynamicsGroup}>
            <h3 className={styles.dynamicsSubtitle}>WHERE YOU'LL PUSH EACH OTHER</h3>
            {groupReading.pairDynamics.pushes.map((pair, i) => (
              <div
                key={`push-${i}`}
                className={styles.pairCard}
                onClick={() => onPairClick?.(pair.memberAId, pair.memberBId)}
                role={onPairClick ? "button" : undefined}
                tabIndex={onPairClick ? 0 : undefined}
              >
                <div className={styles.pairNames}>
                  <span>{pair.memberAName}</span>
                  <span className={styles.pairPlus}>+</span>
                  <span>{pair.memberBName}</span>
                </div>
                <p className={styles.pairDescription}>{pair.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className={styles.divider} />

      {/* SECTION 4: WHAT YOUR GROUP MIGHT OVERDO / UNDERDO */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What Your Group Might Overdo / Underdo</h2>
        <div className={styles.tendenciesBox}>
          <div className={styles.tendencyRow}>
            <span className={styles.tendencyLabel}>Overdo:</span>
            <span className={styles.tendencyList}>
              {groupReading.tendencies.overdo.join(", ")}
            </span>
          </div>
          <div className={styles.tendencyRow}>
            <span className={styles.tendencyLabel}>Underdo:</span>
            <span className={styles.tendencyList}>
              {groupReading.tendencies.underdo.join(", ")}
            </span>
          </div>
          <p className={styles.tendencyWarning}>{groupReading.tendencies.warning}</p>
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
