"use client";

import { RadarChart } from "@/components/RadarChart";
import { archetypePositions, getGroupCenterOfGravity, toSvgCoords } from "@/lib/radar-positions";
import { archetypes, getGroupBook } from "@/lib/archetypes";
import { getSharedUtopia } from "@/lib/shared-utopia";
import type { UtopiaMember } from "@/lib/utopia";
import styles from "./TwoPersonView.module.css";

type TwoPersonViewProps = {
  members: UtopiaMember[];
  utopiaName: string;
  currentUserId?: string | null;
  onMemberClick?: (memberId: string) => void;
};

export function TwoPersonView({ members, utopiaName, currentUserId, onMemberClick }: TwoPersonViewProps) {
  if (members.length !== 2) return null;

  const [personA, personB] = members;
  const archA = archetypes[personA.archetype];
  const archB = archetypes[personB.archetype];

  // Extract short names (e.g., "Abundant" from "The Abundant")
  const shortNameA = archA?.name?.replace(/^The /, "") || personA.archetype;
  const shortNameB = archB?.name?.replace(/^The /, "") || personB.archetype;

  // Get the shared utopia content
  const sharedUtopia = getSharedUtopia(personA.archetype, personB.archetype);

  const book = getGroupBook([personA.archetype, personB.archetype]);

  const userDots = members.map((m) => ({
    id: m.id,
    name: m.name || "Anonymous",
    position: archetypePositions[m.archetype] || { x: 0, y: 0 },
    color: archetypes[m.archetype]?.color || "#888",
  }));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.label}>A Utopia of Two</span>
        <h2 className={styles.names}>
          <span style={{ color: archA?.color }}>{shortNameA}</span>
          {" × "}
          <span style={{ color: archB?.color }}>{shortNameB}</span>
        </h2>
        <p className={styles.people}>
          {personA.name || "Anonymous"} & {personB.name || "Anonymous"}
        </p>
      </div>

      <div className={styles.radar}>
        <div className={styles.radarWrapper}>
          <RadarChart
            size={280}
            userDots={userDots}
            centerOfGravity={getGroupCenterOfGravity(
              userDots.map((d) => d.position)
            )}
            showAllArchetypes={false}
          />

          {/* Clickable dot overlays */}
          {onMemberClick && members.map((member) => {
            const pos = archetypePositions[member.archetype] || { x: 0, y: 0 };
            const svgCoords = toSvgCoords(pos, 280, 40);
            const arch = archetypes[member.archetype];
            const isCurrentUser = member.id === currentUserId;
            const labelOnLeft = svgCoords.cx > 140;
            const displayName = isCurrentUser ? "You" : (member.name || "Anonymous");

            return (
              <button
                key={member.id}
                className={styles.dotButton}
                style={{
                  left: svgCoords.cx - 22,
                  top: svgCoords.cy - 22,
                }}
                onClick={() => onMemberClick(member.id)}
                aria-label={`View ${displayName}'s profile`}
              >
                <span
                  className={`${styles.dotLabel} ${labelOnLeft ? styles.labelLeft : styles.labelRight}`}
                  style={{ color: arch?.color || "#888" }}
                >
                  {displayName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {sharedUtopia ? (
        <div className={styles.reading}>
          <section className={styles.section}>
            <h3 className={styles.sectionLabel}>What You'd Build Together</h3>
            <div className={styles.bodyText}>
              {sharedUtopia.whatYoudBuild.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionLabel}>What Would Be Strong</h3>
            <div className={styles.bodyText}>
              {sharedUtopia.whatWouldBeStrong.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionLabel}>What Would Be Missing</h3>
            <div className={styles.bodyText}>
              {sharedUtopia.whatWouldBeMissing.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <section className={styles.questionSection}>
            <h3 className={styles.sectionLabel}>The Question You're Answering</h3>
            <p className={styles.questionText}>{sharedUtopia.questionYoureAnswering}</p>
          </section>

          {book && (
            <section className={styles.section}>
              <h3 className={styles.sectionLabel}>A Book for Both of You</h3>
              <div className={styles.bookCard}>
                <span className={styles.bookTitle}>{book.title}</span>
                <span className={styles.bookAuthor}> by {book.author}</span>
                <a
                  href={`https://bookshop.org/search?keywords=${encodeURIComponent(book.title + ' ' + book.author)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.bookLink}
                >
                  Find on Bookshop.org →
                </a>
              </div>
            </section>
          )}
        </div>
      ) : (
        <div className={styles.reading}>
          <p className={styles.bodyText}>Content for this pairing is coming soon.</p>
        </div>
      )}
    </div>
  );
}
