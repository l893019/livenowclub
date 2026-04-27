"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { archetypes } from "@/lib/archetypes";
import { CreateJoinStep } from "./steps/CreateJoinStep";
import { RelationshipComparison } from "./RelationshipComparison";
import { WorldviewFingerprint } from "./WorldviewFingerprint";
import { DimensionSpectrum } from "./DimensionSpectrum";
import {
  getConvictionStrength,
  getRevealingQuestion,
  getOutlierAnswers,
  getTertiaryType,
  getRaritySignal,
  getWorldviewFingerprint,
  getAnswerJourney,
  type QuizResult,
} from "@/lib/personalization";
import { getCombinationContentWithFallback } from "@/lib/combination-content";
import { arrayToQuizAnswers, calculateDimensions, getLandscapeImagePath, type QuizAnswers, type Dimensions } from "@/lib/dimensions";
import {
  identities,
  getIdentityFromDimensions,
  getIdentityImage,
  getAdjectiveIndex,
  type Identity,
} from "@/lib/identities";
import type { IndividualReading } from "@/lib/reading-prompts";
import styles from "./ReadingPage.module.css";

type CreatedUtopia = {
  slug: string;
  name: string;
};

type GroupContext = {
  utopiaSlug: string;
  utopiaName: string;
};

type ReadingPageProps = {
  archetypeKey: string;
  /** The quiz answers - if provided, fetches LLM-generated reading */
  answers?: QuizAnswers;
  /** If provided, renders a back button instead of navigating away */
  onBack?: () => void;
  /** If provided, changes CTAs to be group-aware */
  groupContext?: GroupContext;
  /** Optional: whose reading this is (for displaying "their" reading) */
  personName?: string;
  /** Optional: user ID to show relationship comparison with (viral loop) */
  compareUserId?: string;
};

// Map compatibility descriptions to archetype keys
const compatibilityMap: Record<string, string> = {
  "the one who wants to feel everything": "alive",
  "the one who's watching for what's being hidden": "conscience",
  "the one who craves difficulty": "friction",
  "the one who chose stillness": "rooted",
  "the one who guards what came before": "embers",
  "the one who fixes what's broken": "mender",
  "the one who left the body behind": "unbound",
  "the one who lives in questions": "swimmer",
  "the one who values presence above all": "presence",
  "the one who builds collective structures": "architect",
  "the one who can't stop building": "shaper",
  "the one who tells the truth": "cleareyed",
  "the one who's made peace with abundance": "citizen",
  "the one still figuring it out": "between",
};

export function ReadingPage({ archetypeKey, answers, onBack, groupContext, personName, compareUserId }: ReadingPageProps) {
  const [showCreateUtopia, setShowCreateUtopia] = useState(false);
  const [existingUtopia, setExistingUtopia] = useState<CreatedUtopia | null>(null);
  const [hasQuizUserId, setHasQuizUserId] = useState<boolean | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [reading, setReading] = useState<IndividualReading | null>(null);
  const [isLoadingReading, setIsLoadingReading] = useState(false);
  const [readingError, setReadingError] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const archetype = archetypes[archetypeKey];

  // Check if user has taken the quiz and load their result
  useEffect(() => {
    const userId = localStorage.getItem("quiz-user-id");
    setHasQuizUserId(!!userId);

    // Load quiz result for personalization
    try {
      const stored = localStorage.getItem("quiz-user-result");
      if (stored) {
        const parsed = JSON.parse(stored);
        setQuizResult({
          archetype: parsed.archetype,
          secondaryArchetype: parsed.secondaryArchetype,
          scores: parsed.scores || {},
          answers: parsed.answers || [],
        });

        // If no answers prop provided, convert localStorage answers and fetch LLM reading
        if (!answers && parsed.answers && Array.isArray(parsed.answers)) {
          const convertedAnswers = arrayToQuizAnswers(parsed.answers);
          if (convertedAnswers) {
            // Calculate dimensions from answers
            const dims = calculateDimensions(convertedAnswers);
            setDimensions(dims);

            // Look up identity instantly from dimensions
            const adjIndex = getAdjectiveIndex(dims.certainty, dims.posture);
            const foundIdentity = getIdentityFromDimensions(dims.agency, dims.certainty, dims.posture, adjIndex);
            if (foundIdentity) {
              setIdentity(foundIdentity);
            }

            setIsLoadingReading(true);
            setReadingError(null);

            fetch('/api/reading/generate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ type: 'individual', answers: convertedAnswers })
            })
              .then(res => {
                if (!res.ok) {
                  throw new Error('Failed to generate reading');
                }
                return res.json();
              })
              .then(data => {
                setReading(data.reading);
                setIsLoadingReading(false);
              })
              .catch(err => {
                console.error('Failed to fetch reading:', err);
                setReadingError(err.message);
                setIsLoadingReading(false);
              });
          }
        }
      }
    } catch (e) {
      console.error("Failed to parse quiz result:", e);
    }
  }, [answers]);

  // Check if utopia was already created (user named it before quiz)
  useEffect(() => {
    const stored = sessionStorage.getItem("created-utopia");
    if (stored) {
      try {
        setExistingUtopia(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse created-utopia:", e);
      }
    }
  }, []);

  // Fetch LLM-generated reading when answers are provided
  useEffect(() => {
    if (!answers) {
      return;
    }

    // Check if we have all 7 answers
    const answerKeys = Object.keys(answers);
    const hasAllAnswers = answerKeys.length === 7 &&
      answerKeys.every(key => answers[key as keyof QuizAnswers]);

    if (!hasAllAnswers) {
      return;
    }

    // Calculate dimensions from answers prop
    const dims = calculateDimensions(answers);
    setDimensions(dims);

    // Look up identity instantly from dimensions
    const adjIndex = getAdjectiveIndex(dims.certainty, dims.posture);
    const foundIdentity = getIdentityFromDimensions(dims.agency, dims.certainty, dims.posture, adjIndex);
    if (foundIdentity) {
      setIdentity(foundIdentity);
    }

    setIsLoadingReading(true);
    setReadingError(null);

    fetch('/api/reading/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'individual', answers })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to generate reading');
        }
        return res.json();
      })
      .then(data => {
        setReading(data.reading);
        setIsLoadingReading(false);
      })
      .catch(err => {
        console.error('Failed to fetch reading:', err);
        setReadingError(err.message);
        setIsLoadingReading(false);
      });
  }, [answers]);

  if (!archetype) {
    return (
      <div className={styles.reading}>
        <p>Archetype not found.</p>
      </div>
    );
  }

  // Show utopia creation flow (only if no existing utopia)
  if (showCreateUtopia && !existingUtopia) {
    return <CreateJoinStep archetypeKey={archetypeKey} />;
  }

  // Get ally, tension, and need archetypes
  const allyKey = compatibilityMap[archetype.compatibility.ally];
  const tensionKey = compatibilityMap[archetype.compatibility.tension];
  const needKey = compatibilityMap[archetype.compatibility.need];

  const allyArchetype = allyKey ? archetypes[allyKey] : undefined;
  const tensionArchetype = tensionKey ? archetypes[tensionKey] : undefined;
  const needArchetype = needKey ? archetypes[needKey] : undefined;

  // Compute personalization data if we have quiz results
  const shadowArchetype = quizResult?.secondaryArchetype
    ? archetypes[quizResult.secondaryArchetype]
    : null;

  const combinationContent = quizResult?.secondaryArchetype
    ? getCombinationContentWithFallback(
        archetypeKey,
        quizResult.secondaryArchetype,
        archetype.name,
        shadowArchetype?.name || ""
      )
    : null;

  const conviction = quizResult?.scores
    ? getConvictionStrength(quizResult.scores)
    : null;

  const revealingQuestion = quizResult?.answers
    ? getRevealingQuestion(quizResult.answers, archetypeKey)
    : null;

  const outliers = quizResult?.answers && quizResult?.scores
    ? getOutlierAnswers(quizResult.answers, archetypeKey, quizResult.scores)
    : [];

  const tertiaryType = quizResult?.scores
    ? getTertiaryType(quizResult.scores)
    : null;

  const tertiaryArchetype = tertiaryType
    ? archetypes[tertiaryType.key]
    : null;

  const rarity = getRaritySignal(archetypeKey);

  const fingerprint = quizResult?.scores
    ? getWorldviewFingerprint(quizResult.scores)
    : [];

  const answerJourney = quizResult?.answers
    ? getAnswerJourney(quizResult.answers)
    : [];

  // Determine if this is viewing someone else's reading
  const isViewingOther = !!personName;
  // Determine article (a/an) based on first letter of name
  // Archetype names start with "The " so don't need an article
  const getArticle = (name: string) => {
    if (name.startsWith("The ")) return ""; // "The Abundant" needs no article
    const firstLetter = name.charAt(0).toLowerCase();
    return ['a', 'e', 'i', 'o', 'u'].includes(firstLetter) ? 'an' : 'a';
  };
  const displayName = identity?.name || archetype.name;
  const article = getArticle(displayName);
  const labelText = isViewingOther
    ? `${personName} is${article ? ` ${article}` : ""}`
    : `You are${article ? ` ${article}` : ""}`;

  const imageUrl = `/wonder/essay/quiz/images/utopia-${archetypeKey}.png`;

  // Identity-based image when identity is available
  const identityImageUrl = identity ? getIdentityImage(identity) : null;

  // Dimension-based image for LLM reading view (legacy fallback)
  const dimensionImageUrl = dimensions ? getLandscapeImagePath(dimensions) : null;

  // Replace "Their" with "Your" when viewing your own result
  const utopiaText = isViewingOther
    ? (identity?.utopia || archetype.utopia)
    : (identity?.utopia || archetype.utopia).replace(/^Their /i, "Your ");

  return (
    <div className={styles.reading}>
      {/* Background landscape - priority: identity image > dimension image > archetype image */}
      <div className={styles.bgLandscape}>
        <img src={identityImageUrl || dimensionImageUrl || imageUrl} alt="" />
      </div>

      {/* Back button when in inline context */}
      {onBack && (
        <button className={styles.backButton} onClick={onBack}>
          ← Back
        </button>
      )}

      {/* Loading state for LLM reading */}
      {isLoadingReading && (
        <div className={styles.loading}>
          <p>Generating your personalized reading...</p>
        </div>
      )}

      {/* Identity-based content (instant display from dimensions) */}
      {identity && !isLoadingReading && (
        <>
          <header className={styles.header}>
            <p className={styles.label}>{labelText}</p>
            <h1 className={styles.name}>{identity.name}</h1>
          </header>

          {/* Utopia Card */}
          <div className={styles.utopiaCard}>
            <img src={identityImageUrl || imageUrl} alt={identity.name} className={styles.utopiaImage} />
            <div className={styles.utopiaLabel}>{isViewingOther ? "Their Utopia" : "Your Utopia"}</div>
            <p className={styles.utopiaText}>{utopiaText}</p>
          </div>

          {/* Core Description */}
          <p className={styles.description}>{identity.description}</p>

          {/* One-sentence worldview */}
          {!isViewingOther && identity.oneSentence && (
            <div className={styles.oneSentence}>
              <p className={styles.oneSentenceText}>"{identity.oneSentence}"</p>
            </div>
          )}

          {/* LLM-enhanced personalized sections (when available) */}
          {reading && (
            <>
              <div className={styles.divider} />

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Your Pattern</h2>
                <p className={styles.bodyText}>{reading.pattern}</p>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>What This Gives You</h2>
                <p className={styles.bodyText}>{reading.gifts}</p>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>How You&apos;ll Move</h2>
                <p className={styles.bodyText}>{reading.movement}</p>
              </section>

              {reading.tradeoff && (
                <div className={styles.blindSpot}>
                  <div className={styles.blindSpotLabel}>The Tradeoff</div>
                  <p className={styles.blindSpotText}>{reading.tradeoff}</p>
                </div>
              )}
            </>
          )}

          <div className={styles.divider} />

          {/* How You Got Here */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>How You Got Here</h2>
            <p className={styles.bodyText}>{identity.howYouGotHere}</p>
          </section>

          <div className={styles.divider} />

          {/* The Worldview */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>The Worldview</h2>
            <p className={styles.bodyText}>You likely believe:</p>
            <ul className={styles.beliefs}>
              {identity.coreBeliefs.map((belief, i) => (
                <li key={i}>{belief}</li>
              ))}
            </ul>
          </section>

          <div className={styles.divider} />

          {/* Your Superpower */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Your Superpower</h2>
            <h3 className={styles.highlight} style={{ color: identity.color }}>
              {identity.superpower}
            </h3>
            <div className={styles.expandedContent}>
              {identity.superpowerExpanded.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <div className={styles.divider} />

          {/* Your Blind Spot */}
          <div className={styles.blindSpot}>
            <div className={styles.blindSpotLabel}>Something to Consider</div>
            <p className={styles.blindSpotText}>{identity.blindSpot}</p>
          </div>

          <div className={styles.divider} />

          {/* Where You Fall */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Where You Fall</h2>
            {dimensions ? (
              <DimensionSpectrum dimensions={dimensions} />
            ) : (
              <p className={styles.bodyText}>Take the quiz to see your position on the three dimensions.</p>
            )}
          </section>

          {/* Your People - dimension-based compatibility */}
          <div className={styles.compatibility}>
            <div className={styles.compatibilityLabel}>Your People</div>
            <div className={styles.relationships}>
              <div className={styles.relationshipCard}>
                <h4 className={styles.relationshipLabel}>You Align With</h4>
                <p className={styles.relationshipDesc}>{identity.alignsWith}</p>
              </div>
              <div className={styles.relationshipCard}>
                <h4 className={styles.relationshipLabel}>Your Tension</h4>
                <p className={styles.relationshipDesc}>{identity.tensionWith}</p>
              </div>
              <div className={styles.relationshipCard}>
                <h4 className={styles.relationshipLabel}>You Grow With</h4>
                <p className={styles.relationshipDesc}>{identity.growsWith}</p>
              </div>
            </div>
          </div>

          {/* Compare Worldviews CTA - smart button based on quiz status */}
          {hasQuizUserId !== null && (
            <section className={styles.ctaSection}>
              <h2 className={styles.sectionTitle}>Compare Worldviews</h2>
              <p className={styles.ctaDescription}>
                See what happens when different worldviews try to build something together.
              </p>
              <div className={styles.ctaButtons}>
                {hasQuizUserId === false ? (
                  <Link href="/wonder/essay/quiz" className={styles.primaryBtn}>
                    Take the Quiz
                  </Link>
                ) : groupContext ? (
                  <button
                    className={styles.primaryBtn}
                    onClick={() => {
                      const shareUrl = `${window.location.origin}/wonder/essay/quiz/utopia/${groupContext.utopiaSlug}/join`;
                      if (navigator.share) {
                        navigator.share({
                          title: `Join ${groupContext.utopiaName}`,
                          text: `I'm ${identity.name}. What are you? Join my group and find out.`,
                          url: shareUrl,
                        });
                      } else {
                        navigator.clipboard.writeText(shareUrl);
                        alert("Invite link copied to clipboard!");
                      }
                    }}
                  >
                    Invite to {groupContext.utopiaName}
                  </button>
                ) : existingUtopia ? (
                  <Link
                    href={`/wonder/essay/quiz/utopia/${existingUtopia.slug}`}
                    className={styles.primaryBtn}
                  >
                    Go to Your Group
                  </Link>
                ) : (
                  <button
                    className={styles.primaryBtn}
                    onClick={() => setShowCreateUtopia(true)}
                  >
                    Create a Group
                  </button>
                )}
              </div>
            </section>
          )}

          <div className={styles.divider} />

          {/* Books */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Books for Your Worldview</h2>
            <div className={styles.books}>
              {identity.books.map((book, i) => (
                <div key={i} className={styles.bookCard}>
                  <h4 className={styles.bookTitle}>{book.title}</h4>
                  <p className={styles.bookAuthor}>by {book.author}</p>
                  <p className={styles.bookReason}>{book.reason}</p>
                  <a
                    href={`https://bookshop.org/search?keywords=${encodeURIComponent(
                      book.title + " " + book.author
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.bookLink}
                  >
                    Find on Bookshop.org
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Essay Link */}
          <div className={styles.essayLink}>
            <Link href="/wonder/essay" className={styles.essayLinkText}>
              Read <em>When Purpose Is All We Have Left</em> &rarr;
            </Link>
          </div>
        </>
      )}

      {/* Archetype-based content (fallback for backward compatibility when no identity) */}
      {!identity && !isLoadingReading && (
        <>
          {/* Header */}
          <header className={styles.header}>
            <p className={styles.label}>{labelText}</p>
            <h1 className={styles.name}>{archetype.name}</h1>

            {/* Shadow type and combination tagline */}
            {!isViewingOther && shadowArchetype && (
              <div className={styles.shadowType}>
                <span className={styles.shadowLabel}>with undertones of</span>
                <span className={styles.shadowName} style={{ color: shadowArchetype.color }}>
                  {shadowArchetype.name}
                </span>
              </div>
            )}

            {!isViewingOther && combinationContent && (
              <p className={styles.tagline}>{combinationContent.tagline}</p>
            )}
          </header>

      {/* Utopia Card */}
          <div className={styles.utopiaCard}>
            <img src={imageUrl} alt={archetype.name} className={styles.utopiaImage} />
            <div className={styles.utopiaLabel}>{isViewingOther ? "Their Utopia" : "Your Utopia"}</div>
            <p className={styles.utopiaText}>{utopiaText}</p>
          </div>

          {/* Core Description */}
          <p className={styles.description}>{archetype.description}</p>

          {/* One-sentence worldview */}
          {!isViewingOther && archetype.oneSentence && (
            <div className={styles.oneSentence}>
              <p className={styles.oneSentenceText}>"{archetype.oneSentence}"</p>
            </div>
          )}


          {/* Rarity Signal */}
          {!isViewingOther && (
            <div className={styles.raritySignal}>
              <div className={styles.rarityNumber}>{rarity.percentage}%</div>
              <p className={styles.rarityText}>{rarity.description}</p>
            </div>
          )}

          {/* Conviction Strength */}
          {!isViewingOther && conviction && (
            <div className={styles.personalizedSection}>
              <h3 className={styles.sectionTitle}>Your Conviction</h3>
              <div className={styles.convictionMeter}>
                <div className={styles.convictionLabel}>{conviction.label}</div>
                <div className={styles.convictionBar}>
                  <div
                    className={styles.convictionFill}
                    style={{
                      width: `${conviction.strength}%`,
                      backgroundColor: archetype.color,
                    }}
                  />
                </div>
                <p className={styles.convictionDescription}>{conviction.description}</p>
              </div>
            </div>
          )}

          {/* The Question That Revealed You */}
          {!isViewingOther && revealingQuestion && (
            <div className={styles.personalizedSection}>
              <h3 className={styles.sectionTitle}>The Question That Revealed You</h3>
              <p className={styles.revealingQuestion}>
                Your answer to <strong>"{revealingQuestion.summary}"</strong> was the clearest signal of your worldview.
              </p>
            </div>
          )}

          {/* Outlier Answers */}
          {!isViewingOther && outliers.length > 0 && (
            <div className={styles.personalizedSection}>
              <h3 className={styles.sectionTitle}>Where You Surprised Us</h3>
              <div className={styles.outlierList}>
                {outliers.map((outlier, i) => (
                  <div key={i} className={styles.outlierItem}>
                    On <strong>{outlier.summary}</strong>, you answered more like{" "}
                    <strong>{outlier.contributedToName}</strong>.
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tertiary Type */}
          {!isViewingOther && tertiaryType && tertiaryArchetype && (
            <div className={styles.personalizedSection}>
              <h3 className={styles.sectionTitle}>Also Running Through You</h3>
              <div className={styles.tertiaryType}>
                <span
                  className={styles.tertiaryDot}
                  style={{ backgroundColor: tertiaryArchetype.color }}
                />
                <span className={styles.tertiaryName}>{tertiaryArchetype.name}</span>
                <span className={styles.tertiaryLabel}>undertone</span>
              </div>
            </div>
          )}

          {/* Worldview Fingerprint */}
          {!isViewingOther && fingerprint.length > 0 && quizResult && (
            <div className={styles.personalizedSection}>
              <h3 className={styles.sectionTitle}>Your Worldview Fingerprint</h3>
              <div className={styles.fingerprintSection}>
                <WorldviewFingerprint
                  data={fingerprint}
                  primaryKey={archetypeKey}
                  shadowKey={quizResult.secondaryArchetype}
                />
              </div>
            </div>
          )}

          {/* Relationship comparison for viral loop (when ?compare= is present) */}
          {compareUserId && hasQuizUserId && (
            <RelationshipComparison
              yourArchetypeKey={archetypeKey}
              compareUserId={compareUserId}
            />
          )}

          <div className={styles.divider} />

          {/* How You Got Here */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>How You Got Here</h2>
            <p className={styles.bodyText}>{archetype.howYouGotHere}</p>
          </section>

          <div className={styles.divider} />

          {/* The Worldview */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>The Worldview</h2>
            <p className={styles.bodyText}>You likely believe:</p>
            <ul className={styles.beliefs}>
              {archetype.coreBeliefs.map((belief, i) => (
                <li key={i}>{belief}</li>
              ))}
            </ul>
          </section>

          <div className={styles.divider} />

          {/* Your Superpower */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Your Superpower</h2>
            <h3 className={styles.highlight} style={{ color: archetype.color }}>
              {archetype.superpower}
            </h3>
            <div className={styles.expandedContent}>
              {archetype.superpowerExpanded.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <div className={styles.divider} />

          {/* Your Blind Spot - coral accent */}
          {/* Use personalized blind spot if available, otherwise fall back to archetype default */}
          <div className={styles.blindSpot}>
            <div className={styles.blindSpotLabel}>Something to Consider</div>
            <p className={styles.blindSpotText}>
              {!isViewingOther && combinationContent
                ? combinationContent.blindSpot
                : archetype.blindSpot}
            </p>
          </div>

          <div className={styles.divider} />

          {/* Where You Fall */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Where You Fall</h2>
            {dimensions ? (
              <DimensionSpectrum dimensions={dimensions} />
            ) : (
              <p className={styles.bodyText}>Take the quiz to see your position on the three dimensions.</p>
            )}
          </section>

          {/* Your People - compatibility section */}
          <div className={styles.compatibility}>
            <div className={styles.compatibilityLabel}>Your People</div>
            <div className={styles.relationships}>
              {allyArchetype && (
                <div className={styles.relationshipCard}>
                  <h4 className={styles.relationshipLabel}>Your Natural Ally</h4>
                  <Link
                    href={`/wonder/essay/quiz/result?a=${allyKey}`}
                    className={styles.archName}
                    style={{ color: allyArchetype.color }}
                  >
                    {allyArchetype.name}
                  </Link>
                  <p className={styles.relationshipDesc}>
                    {archetype.allyDescription}
                  </p>
                </div>
              )}

              {tensionArchetype && (
                <div className={styles.relationshipCard}>
                  <h4 className={styles.relationshipLabel}>Your Tension</h4>
                  <Link
                    href={`/wonder/essay/quiz/result?a=${tensionKey}`}
                    className={styles.archName}
                    style={{ color: tensionArchetype.color }}
                  >
                    {tensionArchetype.name}
                  </Link>
                  <p className={styles.relationshipDesc}>
                    {archetype.tensionDescription}
                  </p>
                </div>
              )}

              {needArchetype && (
                <div className={styles.relationshipCard}>
                  <h4 className={styles.relationshipLabel}>Your Counterweight</h4>
                  <Link
                    href={`/wonder/essay/quiz/result?a=${needKey}`}
                    className={styles.archName}
                    style={{ color: needArchetype.color }}
                  >
                    {needArchetype.name}
                  </Link>
                  <p className={styles.relationshipDesc}>
                    {archetype.needDescription}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Compare Worldviews CTA - smart button based on quiz status */}
          {hasQuizUserId !== null && (
            <section className={styles.ctaSection}>
              <h2 className={styles.sectionTitle}>Compare Worldviews</h2>
              <p className={styles.ctaDescription}>
                See what happens when different worldviews try to build something together.
              </p>
              <div className={styles.ctaButtons}>
                {hasQuizUserId === false ? (
                  <Link href="/wonder/essay/quiz" className={styles.primaryBtn}>
                    Take the Quiz
                  </Link>
                ) : groupContext ? (
                  <button
                    className={styles.primaryBtn}
                    onClick={() => {
                      const shareUrl = `${window.location.origin}/wonder/essay/quiz/utopia/${groupContext.utopiaSlug}/join`;
                      if (navigator.share) {
                        navigator.share({
                          title: `Join ${groupContext.utopiaName}`,
                          text: `I'm ${archetype.name}. What are you? Join my group and find out.`,
                          url: shareUrl,
                        });
                      } else {
                        navigator.clipboard.writeText(shareUrl);
                        alert("Invite link copied to clipboard!");
                      }
                    }}
                  >
                    Invite to {groupContext.utopiaName}
                  </button>
                ) : existingUtopia ? (
                  <Link
                    href={`/wonder/essay/quiz/utopia/${existingUtopia.slug}`}
                    className={styles.primaryBtn}
                  >
                    Go to Your Group
                  </Link>
                ) : (
                  <button
                    className={styles.primaryBtn}
                    onClick={() => setShowCreateUtopia(true)}
                  >
                    Create a Group
                  </button>
                )}
              </div>
            </section>
          )}

          <div className={styles.divider} />

          {/* Books */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Books for Your Worldview</h2>
            <div className={styles.books}>
              {archetype.books.map((book, i) => (
                <div key={i} className={styles.bookCard}>
                  <h4 className={styles.bookTitle}>{book.title}</h4>
                  <p className={styles.bookAuthor}>by {book.author}</p>
                  <p className={styles.bookReason}>{book.reason}</p>
                  <a
                    href={`https://bookshop.org/search?keywords=${encodeURIComponent(
                      book.title + " " + book.author
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.bookLink}
                  >
                    Find on Bookshop.org
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Essay Link */}
          <div className={styles.essayLink}>
            <Link href="/wonder/essay" className={styles.essayLinkText}>
              Read <em>When Purpose Is All We Have Left</em> &rarr;
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
