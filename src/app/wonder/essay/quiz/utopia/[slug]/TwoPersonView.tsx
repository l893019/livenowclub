"use client";

import { useState, useEffect, useMemo } from "react";
import {
  archetypes,
  getAnalyticalPairDynamic,
  getGroupBook,
} from "@/lib/archetypes";
import { arrayToQuizAnswers, calculateDimensions, type Dimensions } from "@/lib/dimensions";
import {
  getIdentityFromDimensions,
  getAdjectiveIndex,
  type Identity,
} from "@/lib/identities";
import { DimensionSpectrum } from "@/app/wonder/essay/quiz/result/DimensionSpectrum";
import type { UtopiaMember } from "@/lib/utopia";
import type { PairReading } from "@/lib/reading-prompts";
import styles from "./TwoPersonView.module.css";

type TwoPersonViewProps = {
  members: UtopiaMember[];
  utopiaName: string;
  onMemberClick?: (memberId: string) => void;
};

export function TwoPersonView({ members, utopiaName, onMemberClick }: TwoPersonViewProps) {
  const [llmReading, setLlmReading] = useState<PairReading | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [personA, personB] = members.length === 2 ? members : [null, null];

  useEffect(() => {
    // Check if both members have answers
    if (personA?.answers?.length === 7 && personB?.answers?.length === 7) {
      const answersA = arrayToQuizAnswers(personA.answers);
      const answersB = arrayToQuizAnswers(personB.answers);

      if (answersA && answersB) {
        setIsLoading(true);
        fetch('/api/reading/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'pair',
            members: [
              { name: personA.name || 'Person A', answers: answersA },
              { name: personB.name || 'Person B', answers: answersB },
            ]
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data.reading) setLlmReading(data.reading);
            setIsLoading(false);
          })
          .catch(() => setIsLoading(false));
      }
    }
  }, [personA, personB]);

  // Calculate dimensions and identities for both people
  const { dimensions: dimensionsA, identity: identityA } = useMemo<{
    dimensions: Dimensions | null;
    identity: Identity | null;
  }>(() => {
    if (personA?.answers?.length === 7) {
      const answers = arrayToQuizAnswers(personA.answers);
      if (answers) {
        const dims = calculateDimensions(answers);
        const adjIdx = getAdjectiveIndex(dims.certainty, dims.posture);
        const id = getIdentityFromDimensions(dims.agency, dims.certainty, dims.posture, adjIdx);
        return { dimensions: dims, identity: id ?? null };
      }
    }
    return { dimensions: null, identity: null };
  }, [personA?.answers]);

  const { dimensions: dimensionsB, identity: identityB } = useMemo<{
    dimensions: Dimensions | null;
    identity: Identity | null;
  }>(() => {
    if (personB?.answers?.length === 7) {
      const answers = arrayToQuizAnswers(personB.answers);
      if (answers) {
        const dims = calculateDimensions(answers);
        const adjIdx = getAdjectiveIndex(dims.certainty, dims.posture);
        const id = getIdentityFromDimensions(dims.agency, dims.certainty, dims.posture, adjIdx);
        return { dimensions: dims, identity: id ?? null };
      }
    }
    return { dimensions: null, identity: null };
  }, [personB?.answers]);

  if (members.length !== 2 || !personA || !personB) return null;
  const archA = archetypes[personA.archetype];
  const archB = archetypes[personB.archetype];

  // Extract short names - prefer identity names when available
  const shortNameA = identityA?.name || archA?.name?.replace(/^The /, "") || personA.archetype;
  const shortNameB = identityB?.name || archB?.name?.replace(/^The /, "") || personB.archetype;

  // Determine colors - prefer identity colors when available
  const colorA = identityA?.color || archA?.color;
  const colorB = identityB?.color || archB?.color;

  const dynamic = getAnalyticalPairDynamic(personA.archetype, personB.archetype);

  const book = getGroupBook([personA.archetype, personB.archetype]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.label}>A Utopia of Two</span>
        <h2 className={styles.names}>
          <span style={{ color: colorA }}>{shortNameA}</span>
          {" × "}
          <span style={{ color: colorB }}>{shortNameB}</span>
        </h2>
        <p className={styles.people}>
          {personA.name || "Anonymous"} & {personB.name || "Anonymous"}
        </p>
      </div>

      {/* Dimension Spectrums for both people */}
      <div className={styles.spectrums}>
        {dimensionsA && (
          <div className={styles.spectrumCard}>
            <h4 className={styles.spectrumLabel} style={{ color: colorA }}>
              {personA.name || shortNameA}
            </h4>
            <DimensionSpectrum dimensions={dimensionsA} />
          </div>
        )}
        {dimensionsB && (
          <div className={styles.spectrumCard}>
            <h4 className={styles.spectrumLabel} style={{ color: colorB }}>
              {personB.name || shortNameB}
            </h4>
            <DimensionSpectrum dimensions={dimensionsB} />
          </div>
        )}
        {!dimensionsA && !dimensionsB && (
          <p className={styles.spectrumEmpty}>Both members need to complete the quiz to see dimensions.</p>
        )}
      </div>

      <div className={styles.reading}>
        {isLoading ? (
          <div className={styles.loading}>
            Generating your pair reading...
          </div>
        ) : llmReading ? (
          <>
            <section className={styles.section}>
              <h3 className={styles.sectionLabel}>Your Combined Pattern</h3>
              <p className={styles.bodyText}>{llmReading.combinedPattern}</p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionLabel}>What You Give Each Other</h3>
              <div className={styles.giveCards}>
                <div className={styles.giveCard}>
                  <span className={styles.giveName} style={{ color: colorA }}>
                    {personA.name || shortNameA}
                  </span>
                  <span className={styles.giveArrow}>→</span>
                  <p className={styles.giveText}>{llmReading.whatAGivesB}</p>
                </div>
                <div className={styles.giveCard}>
                  <span className={styles.giveName} style={{ color: colorB }}>
                    {personB.name || shortNameB}
                  </span>
                  <span className={styles.giveArrow}>→</span>
                  <p className={styles.giveText}>{llmReading.whatBGivesA}</p>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionLabel}>What Emerges Together</h3>
              <p className={styles.bodyText}>{llmReading.whatEmerges}</p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionLabel}>Your Shared Strength</h3>
              <p className={styles.bodyText}>{llmReading.sharedStrength}</p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionLabel}>How You'll Make Decisions</h3>
              <p className={styles.bodyText}>{llmReading.howDecisions}</p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionLabel}>Where You'll Create Friction</h3>
              <p className={styles.warningText}>{llmReading.friction}</p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionLabel}>What to Watch For</h3>
              <p className={styles.warningText}>{llmReading.watchFor}</p>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionLabel}>What You'd Build Together</h3>
              <p className={styles.bodyText}>{llmReading.whatYoudBuild}</p>
            </section>
          </>
        ) : (
          <>
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
                  <span className={styles.giveName} style={{ color: colorA }}>
                    {personA.name || shortNameA}
                  </span>
                  <span className={styles.giveArrow}>→</span>
                  <p className={styles.giveText}>{dynamic.give.youToThem}</p>
                </div>
                <div className={styles.giveCard}>
                  <span className={styles.giveName} style={{ color: colorB }}>
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
          </>
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
// Force redeploy 1777310877
