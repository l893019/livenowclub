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
    const inviteUrl = `${window.location.origin}/wonder/essay/quiz/utopia/${utopiaSlug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join ${utopiaName}`,
          text: `Take the quiz and join our utopia`,
          url: inviteUrl,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(inviteUrl);
      alert("Invite link copied to clipboard!");
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

      {/* YOUR COMPOSITION */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Composition</h2>

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

        {/* Archetype Breakdown */}
        <div className={styles.breakdownList}>
          {analysis.composition.frequencies.map((freq) => {
            const arch = archetypes[freq.archetype];
            return (
              <div key={freq.archetype} className={styles.breakdownItem}>
                <span
                  className={styles.breakdownDot}
                  style={{ backgroundColor: arch?.color || "#888" }}
                />
                <span className={styles.breakdownName}>{arch?.name || freq.archetype}</span>
                <span className={styles.breakdownCount}>
                  {freq.count} ({Math.round(freq.percentage)}%)
                </span>
              </div>
            );
          })}
        </div>

        {/* Composition narrative */}
        <div className={styles.bodyText}>
          <p>
            Your group leans {analysis.composition.buildVsWitness.build > 55 ? "toward building" : analysis.composition.buildVsWitness.witness > 55 ? "toward witnessing" : "between building and witnessing"}, and {analysis.composition.rootVsTranscend.transcend > 55 ? "reaches toward transcendence" : analysis.composition.rootVsTranscend.root > 55 ? "stays grounded in what's real" : "balances between reaching and grounding"}.
          </p>
          {analysis.composition.dominantArchetypes.length === 1 ? (
            <p>
              The {archetypes[analysis.composition.dominantArchetypes[0]]?.name || "dominant archetype"} orientation shapes your collective center of gravity.
            </p>
          ) : (
            <p>
              Multiple worldviews share equal weight, creating a more distributed center of gravity.
            </p>
          )}
        </div>
      </section>

      <div className={styles.divider} />

      {/* YOUR COLLECTIVE SUPERPOWER */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Collective Superpower</h2>
        <p className={styles.superpowerTitle}>{analysis.collectiveSuperpower.title}</p>
        <div className={styles.bodyText}>
          {analysis.collectiveSuperpower.description.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <div className={styles.divider} />

      {/* YOUR COLLECTIVE BLIND SPOT */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Collective Blind Spot</h2>
        <div className={styles.bodyText}>
          {analysis.collectiveBlindSpot.description.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <div className={styles.divider} />

      {/* MISSING VOICES */}
      {analysis.missingVoices.length > 0 && (
        <>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Missing Voices</h2>
            {analysis.missingVoices.map((voice) => {
              const arch = archetypes[voice.archetype];
              return (
                <div key={voice.archetype} className={styles.missingVoice}>
                  <h3
                    className={styles.missingVoiceName}
                    style={{ color: arch?.color || "#888" }}
                  >
                    {arch?.name || voice.archetype}
                  </h3>
                  <p className={styles.missingVoiceTagline}>"{arch?.utopia || ""}"</p>
                  <div className={styles.bodyText}>
                    <p>{voice.whatTheyWouldAdd}</p>
                  </div>
                </div>
              );
            })}
          </section>

          <div className={styles.divider} />
        </>
      )}

      {/* INTERNAL TENSIONS */}
      {analysis.internalTensions.length > 0 && (
        <>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Internal Tensions</h2>
            {analysis.internalTensions.map((tension, i) => {
              const archA = archetypes[tension.archetypeA];
              const archB = archetypes[tension.archetypeB];
              return (
                <div key={i} className={styles.tension}>
                  <div className={styles.tensionHeader}>
                    <span style={{ color: archA?.color || "#888" }}>
                      {archA?.name || tension.archetypeA}
                    </span>
                    <span className={styles.tensionX}>×</span>
                    <span style={{ color: archB?.color || "#888" }}>
                      {archB?.name || tension.archetypeB}
                    </span>
                    <span className={styles.tensionLevel}>
                      — {tension.tensionLevel} tension
                    </span>
                  </div>
                  <p className={styles.tensionThesis}>"{tension.thesis}"</p>
                  <div className={styles.bodyText}>
                    <p>{tension.howToNavigate}</p>
                  </div>
                </div>
              );
            })}
          </section>

          <div className={styles.divider} />
        </>
      )}

      {/* THE QUESTION YOUR UTOPIA IS ASKING */}
      <section className={styles.questionSection}>
        <h2 className={styles.sectionTitle}>The Question Your Utopia Is Asking</h2>
        <p className={styles.questionContext}>{analysis.groupQuestion.context}</p>
        <p className={styles.questionText}>"{analysis.groupQuestion.question}"</p>
      </section>

      <div className={styles.divider} />

      {/* INVITE SOMEONE */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Invite Someone</h2>
        <p className={styles.inviteIntro}>Your utopia would shift most with:</p>
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
            Adding this worldview would pull your center of gravity toward balance, introducing perspectives your current composition lacks. They would ask questions no one in your group currently thinks to ask, and see what your shared orientation makes invisible.
          </p>
          <p>
            Of course, the right person to invite is anyone who matters to you. The quiz will reveal where they stand, and your utopia will shift to include them.
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
