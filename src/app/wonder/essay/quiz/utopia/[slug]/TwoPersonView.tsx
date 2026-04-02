"use client";

import { RadarChart } from "@/components/RadarChart";
import { archetypePositions, getGroupCenterOfGravity } from "@/lib/radar-positions";
import {
  archetypes,
  getDetailedPairDynamic,
  generateFallbackDynamic,
  getGroupBook,
} from "@/lib/archetypes";
import type { UtopiaMember } from "@/lib/utopia";
import styles from "./TwoPersonView.module.css";

type TwoPersonViewProps = {
  members: UtopiaMember[];
  utopiaName: string;
};

export function TwoPersonView({ members, utopiaName }: TwoPersonViewProps) {
  if (members.length !== 2) return null;

  const [personA, personB] = members;
  const archA = archetypes[personA.archetype];
  const archB = archetypes[personB.archetype];

  const dynamic =
    getDetailedPairDynamic(personA.archetype, personB.archetype) ||
    generateFallbackDynamic(personA.archetype, personB.archetype);

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
          <span style={{ color: archA?.color }}>{archA?.name?.split(" ")[0]}</span>
          {" × "}
          <span style={{ color: archB?.color }}>{archB?.name?.split(" ")[0]}</span>
        </h2>
        <p className={styles.people}>
          {personA.name || "Anonymous"} & {personB.name || "Anonymous"}
        </p>
      </div>

      <div className={styles.radar}>
        <RadarChart
          size={280}
          userDots={userDots}
          centerOfGravity={getGroupCenterOfGravity(
            userDots.map((d) => d.position)
          )}
          showAllArchetypes={false}
        />
      </div>

      <div className={styles.reading}>
        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>Where you align</h3>
          <ul className={styles.list}>
            {dynamic.align.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>Where you'll clash</h3>
          <ul className={styles.list}>
            {dynamic.clash.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>What you give each other</h3>
          <p className={styles.giveText}>{dynamic.give}</p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>What this pair needs</h3>
          <p className={styles.needText}>
            Someone to challenge both of you. A third perspective to break the loop.
          </p>
        </section>

        {book && (
          <section className={styles.section}>
            <h3 className={styles.sectionLabel}>A book for both of you</h3>
            <div className={styles.bookCard}>
              <span className={styles.bookTitle}>{book.title}</span>
              <span className={styles.bookAuthor}> ({book.author})</span>
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
    </div>
  );
}
