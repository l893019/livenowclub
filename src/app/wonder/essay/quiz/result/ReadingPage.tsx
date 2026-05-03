"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CreateJoinStep } from "./steps/CreateJoinStep";
import { DimensionSpectrum } from "./DimensionSpectrum";
import EmailCapture from "@/components/EmailCapture";
import { arrayToQuizAnswers, calculateDimensions, type QuizAnswers, type Dimensions } from "@/lib/dimensions";
import {
  identities,
  getIdentityFromDimensions,
  getIdentityImage,
  getAdjectiveIndex,
  type Identity,
} from "@/lib/identities";
import type { IndividualReading } from "@/lib/reading-prompts";
import { identityToReading } from "@/lib/identity-to-reading";
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
  /** The quiz answers - if provided, fetches LLM-generated reading */
  answers?: QuizAnswers;
  /** Identity key from URL params - used for shared links */
  identityKey?: string | null;
  /** If provided, renders a back button instead of navigating away */
  onBack?: () => void;
  /** If provided, changes CTAs to be group-aware */
  groupContext?: GroupContext;
  /** Optional: whose reading this is (for displaying "their" reading) */
  personName?: string;
  /** Optional: user ID to show relationship comparison with (feature disabled) */
  compareUserId?: string;
};

export function ReadingPage({ answers, identityKey, onBack, groupContext, personName, compareUserId }: ReadingPageProps) {
  const [showCreateUtopia, setShowCreateUtopia] = useState(false);
  const [existingUtopia, setExistingUtopia] = useState<CreatedUtopia | null>(null);
  const [hasQuizUserId, setHasQuizUserId] = useState<boolean | null>(null);
  const [reading, setReading] = useState<IndividualReading | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);
  const isViewingOther = !!personName;

  const [identity, setIdentity] = useState<Identity | null>(null);
  const [userSlug, setUserSlug] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  // SINGLE SOURCE OF TRUTH: Load and calculate identity
  useEffect(() => {
    const userId = localStorage.getItem("quiz-user-id");
    setHasQuizUserId(!!userId);

    // PRIORITY 1: If identityKey from URL provided, use it (for shared links)
    if (identityKey && identities[identityKey]) {
      const foundIdentity = identities[identityKey];
      setIdentity(foundIdentity);
      setReading(identityToReading(foundIdentity));
      return;
    }

    // PRIORITY 2: If answers prop provided, use it
    if (answers) {
      const answerKeys = Object.keys(answers);
      const hasAllAnswers = answerKeys.length === 7 &&
        answerKeys.every(key => answers[key as keyof QuizAnswers]);

      if (hasAllAnswers) {
        const dims = calculateDimensions(answers);
        setDimensions(dims);

        const adjIndex = getAdjectiveIndex(dims.certainty, dims.posture);
        const foundIdentity = getIdentityFromDimensions(dims.agency, dims.certainty, dims.posture, adjIndex);

        if (foundIdentity) {
          setIdentity(foundIdentity);
          setReading(identityToReading(foundIdentity));
        }
      }
      return;
    }

    // PRIORITY 2: If no answers prop but have userId, fetch from API
    if (!userId) return;

    const abortController = new AbortController();

    fetch(`/api/utopia/user/${userId}`, { signal: abortController.signal })
      .then(res => res.json())
      .then(data => {
        if (!data.user) return;

        const user = data.user;

        if (user.slug) {
          setUserSlug(user.slug);
          localStorage.setItem("userSlug", user.slug);
        }

        if (user.answers && Array.isArray(user.answers) && user.answers.length === 7) {
          const convertedAnswers = arrayToQuizAnswers(user.answers);
          if (convertedAnswers) {
            const dims = calculateDimensions(convertedAnswers);
            setDimensions(dims);

            const adjIndex = getAdjectiveIndex(dims.certainty, dims.posture);
            const foundIdentity = getIdentityFromDimensions(dims.agency, dims.certainty, dims.posture, adjIndex);

            if (foundIdentity) {
              setIdentity(foundIdentity);
              setReading(identityToReading(foundIdentity));
            }
          }
        }
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error('Failed to fetch user data:', error);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [answers, identityKey]);

  // Check if utopia was already created
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

  // Create connection if came from someone's link
  useEffect(() => {
    const connectWith = localStorage.getItem("connectWith");
    const userId = localStorage.getItem("quiz-user-id");

    if (connectWith && userId && connectWith !== userId) {
      fetch('/api/connections/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          connectWithUserId: connectWith,
        }),
      }).then(() => {
        localStorage.removeItem("connectWith");
      }).catch(console.error);
    }
  }, []);

  // Show utopia creation flow
  if (showCreateUtopia && !existingUtopia) {
    return <CreateJoinStep />;
  }

  // Loading state
  if (!identity) {
    return (
      <div className={styles.reading}>
        <div className={styles.loading}>
          <p>Calculating your identity...</p>
        </div>
      </div>
    );
  }

  const getArticle = (name: string) => {
    if (name.startsWith("The ")) return "";
    const firstLetter = name.charAt(0).toLowerCase();
    return ['a', 'e', 'i', 'o', 'u'].includes(firstLetter) ? 'an' : 'a';
  };

  const article = getArticle(identity.name);
  const labelText = isViewingOther
    ? `${personName} is${article ? ` ${article}` : ""}`
    : `You are${article ? ` ${article}` : ""}`;

  const identityImageUrl = getIdentityImage(identity);
  const utopiaText = isViewingOther
    ? identity.utopia
    : identity.utopia.replace(/^Their /i, "Your ");

  return (
    <div className={styles.reading}>
      {/* Background landscape */}
      <div className={styles.bgLandscape}>
        <img src={identityImageUrl} alt="" />
      </div>

      {/* Back button */}
      {onBack && (
        <button className={styles.backButton} onClick={onBack}>
          ← Back
        </button>
      )}

      {/* Header */}
      <header className={styles.header}>
        <p className={styles.label}>{labelText}</p>
        <h1 className={styles.name}>{identity.name}</h1>
      </header>

      {/* Utopia Card */}
      <div className={styles.utopiaCard}>
        <img src={identityImageUrl} alt={identity.name} className={styles.utopiaImage} />
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

      {/* Share link */}
      {userSlug && !isViewingOther && (
        <div className={styles.yourWorldSection}>
          <div className={styles.shareBox}>
            <div className={styles.shareBoxRow}>
              <span className={styles.shareBoxLink}>
                livenowclub.vercel.app/meet/{userSlug}
              </span>
              <button
                className={styles.shareBoxCopyButton}
                onClick={() => {
                  navigator.clipboard.writeText(`https://livenowclub.vercel.app/meet/${userSlug}`);
                  setLinkCopied(true);
                  setTimeout(() => setLinkCopied(false), 2000);
                }}
              >
                {linkCopied ? "Copied!" : "Copy Link"}
              </button>
            </div>
            <p className={styles.shareBoxHint}>Share with friends to see your compatibility</p>
          </div>
          <Link href="/me" className={styles.yourWorldLink}>
            Go to Your World →
          </Link>
        </div>
      )}

      {/* LLM-enhanced sections */}
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
      {!reading && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>How You Got Here</h2>
          <p className={styles.bodyText}>{identity.howYouGotHere}</p>
        </section>
      )}

      {!reading && <div className={styles.divider} />}

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
      {!reading?.tradeoff && (
        <div className={styles.blindSpot}>
          <div className={styles.blindSpotLabel}>Something to Consider</div>
          <p className={styles.blindSpotText}>{identity.blindSpot}</p>
        </div>
      )}

      {!reading?.tradeoff && <div className={styles.divider} />}

      {/* Where You Fall */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Where You Fall</h2>
        {dimensions ? (
          <DimensionSpectrum dimensions={dimensions} />
        ) : (
          <p className={styles.bodyText}>Take the quiz to see your position on the three dimensions.</p>
        )}
      </section>

      {/* Your People */}
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

      {/* Compare Worldviews CTA */}
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

      {/* Essay Promotion */}
      <section className={styles.essayPromoSection}>
        <h2 className={styles.essayPromoTitle}>Continue the Journey</h2>

        <Link href="/wonder/essay" className={styles.featuredEssayCard}>
          <div className={styles.featuredEssayImage}>
            <img
              src="/wonder/assets/landscapes/optimized/1.jpg"
              alt="When Purpose Is All We Have Left"
            />
          </div>
          <div className={styles.featuredEssayContent}>
            <span className={styles.featuredEssayLabel}>The Essay Behind the Quiz</span>
            <h3 className={styles.featuredEssayTitle}>When Purpose Is All We Have Left</h3>
            <p className={styles.featuredEssayExcerpt}>
              What happens when technology solves our survival problems? An exploration of meaning, identity, and what we might become.
            </p>
            <span className={styles.featuredEssayRead}>Read the essay →</span>
          </div>
        </Link>

        <div className={styles.moreEssays}>
          <h3 className={styles.moreEssaysTitle}>More to Read</h3>
          <div className={styles.essayGrid}>
            <Link href="/read/the-live-now-club" className={styles.essayCard}>
              <img src="/images/the-live-now-club.gif" alt="The Live Now Club" className={styles.essayCardImage} />
              <div className={styles.essayCardContent}>
                <h4>The Live Now Club</h4>
                <p>Living to live, not living not to die.</p>
              </div>
            </Link>
            <Link href="/read/fixing-the-unfixable" className={styles.essayCard}>
              <img src="/images/fixing-the-unfixable.jpg" alt="Fixing the Unfixable" className={styles.essayCardImage} />
              <div className={styles.essayCardContent}>
                <h4>Fixing the Unfixable</h4>
                <p>What to say when there is nothing to say.</p>
              </div>
            </Link>
            <Link href="/read/soulmd" className={styles.essayCard}>
              <img src="/images/soulmd.jpg" alt="Soul.md" className={styles.essayCardImage} />
              <div className={styles.essayCardContent}>
                <h4>Soul.md</h4>
                <p>On AI, meaning, and what makes us human.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      {!isViewingOther && (
        <EmailCapture
          identity={identity.name}
          context="quiz-result"
          title="More like this?"
          description="Essays on living now. Delivered occasionally."
        />
      )}
    </div>
  );
}
