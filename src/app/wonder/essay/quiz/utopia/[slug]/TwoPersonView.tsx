"use client";

import { RadarChart } from "@/components/RadarChart";
import { archetypePositions, getGroupCenterOfGravity } from "@/lib/radar-positions";
import {
  archetypes,
  getAnalyticalPairDynamic,
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

  // Extract short names (e.g., "Abundant" from "The Abundant")
  const shortNameA = archA?.name?.replace(/^The /, "") || personA.archetype;
  const shortNameB = archB?.name?.replace(/^The /, "") || personB.archetype;

  const dynamic = getAnalyticalPairDynamic(personA.archetype, personB.archetype);

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
        <section className={styles.thesisSection}>
          <p className={styles.thesis}>{dynamic.thesis}</p>
        </section>

        {dynamic.dynamic && (
          <section className={styles.section}>
            <h3 className={styles.sectionLabel}>The Dynamic</h3>
            <p className={styles.bodyText}>{dynamic.dynamic}</p>
          </section>
        )}

        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>Where you align</h3>
          <div className={styles.expandedList}>
            {dynamic.align.map((item, i) => (
              <div key={i} className={styles.expandedItem}>
                <h4 className={styles.expandedPoint}>{item.point}</h4>
                {item.explanation && (
                  <p className={styles.expandedExplanation}>{item.explanation}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>Where you'll clash</h3>
          <div className={styles.expandedList}>
            {dynamic.clash.map((item, i) => (
              <div key={i} className={styles.expandedItem}>
                <h4 className={styles.expandedPoint}>{item.point}</h4>
                {item.explanation && (
                  <p className={styles.expandedExplanation}>{item.explanation}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>What you give each other</h3>
          <div className={styles.giveCards}>
            <div className={styles.giveCard}>
              <span className={styles.giveName} style={{ color: archA?.color }}>
                {personA.name || shortNameA}
              </span>
              <span className={styles.giveArrow}>→</span>
              <p className={styles.giveText}>{dynamic.give.youToThem}</p>
            </div>
            <div className={styles.giveCard}>
              <span className={styles.giveName} style={{ color: archB?.color }}>
                {personB.name || shortNameB}
              </span>
              <span className={styles.giveArrow}>→</span>
              <p className={styles.giveText}>{dynamic.give.themToYou}</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionLabel}>A question for you both</h3>
          <p className={styles.questionText}>{dynamic.question.text}</p>
          {dynamic.question.framing && (
            <p className={styles.questionFraming}>{dynamic.question.framing}</p>
          )}
        </section>

        {dynamic.risk && (
          <section className={styles.section}>
            <h3 className={styles.sectionLabel}>Watch out for</h3>
            <p className={styles.warningText}>{dynamic.risk}</p>
          </section>
        )}

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
