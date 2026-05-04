"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import styles from "./MePageClient.module.css";
import type { UserResult } from "@/lib/utopia";
import type { Connection } from "@/lib/connections";
import { arrayToQuizAnswers, calculateDimensions } from "@/lib/dimensions";
import { getIdentityFromDimensions, getAdjectiveIndex } from "@/lib/identities";

type ConnectionWithUser = Connection & {
  otherUser: UserResult;
};

export function MePageClient() {
  const router = useRouter();
  const [user, setUser] = useState<UserResult | null>(null);
  const [connections, setConnections] = useState<ConnectionWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("quiz-user-id");
    if (!userId) {
      router.push("/wonder");
      return;
    }

    // Fetch user data and connections
    Promise.all([
      fetch(`/api/utopia/user/${userId}`).then(r => r.json()),
      fetch(`/api/connections/list?userId=${userId}`).then(r => r.json()),
    ]).then(([userData, connectionsData]) => {
      if (userData.user) {
        setUser(userData.user);
      }
      if (connectionsData.connections) {
        setConnections(connectionsData.connections);
      }
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  }, [router]);

  const handleCopyLink = () => {
    if (!user?.slug) return;
    const link = `${window.location.origin}/meet/${user.slug}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (!user?.slug) return;
    const link = `${window.location.origin}/meet/${user.slug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "See your compatibility with me",
          text: "Take the worldview quiz and see how compatible we are!",
          url: link,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      handleCopyLink();
    }
  };

  // Get identity from user answers
  const getIdentityWithDebug = (answers: string[]) => {
    const quizAnswers = arrayToQuizAnswers(answers);
    if (!quizAnswers) return { identity: null, debug: null };
    const dims = calculateDimensions(quizAnswers);
    const adjIdx = getAdjectiveIndex(dims.certainty, dims.posture);
    const identity = getIdentityFromDimensions(dims.agency, dims.certainty, dims.posture, adjIdx);
    const combinedIntensity = (Math.abs(dims.certainty) + Math.abs(dims.posture)) / 2;
    return {
      identity,
      debug: {
        answers: answers.join(','),
        dims,
        adjIdx,
        combinedIntensity,
      },
    };
  };

  // Legacy wrapper for backward compatibility
  const getIdentity = (answers: string[]) => getIdentityWithDebug(answers).identity;

  if (isLoading) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <div className={styles.loading}>Loading...</div>
        </div>
      </>
    );
  }

  if (!user) {
    return null;
  }

  const { identity, debug } = user.answers ? getIdentityWithDebug(user.answers) : { identity: null, debug: null };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Identity Section */}
          <section className={styles.identitySection}>
            <p className={styles.label}>Your World</p>
            <h1 className={styles.identityName} style={{ color: identity?.color }}>
              {identity?.name || "Unknown"}
            </h1>
            <Link href="/wonder/essay/quiz/result" className={styles.viewResultsLink}>
              View your full results →
            </Link>
            <div className={styles.shareButtons}>
              <button className={styles.copyButton} onClick={handleCopyLink}>
                {copied ? "Copied!" : "Copy Link"}
              </button>
              <button className={styles.shareButton} onClick={handleShare}>
                Share
              </button>
            </div>
          </section>

        {/* Connections Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Your Connections {connections.length > 0 && `(${connections.length})`}
            </h2>
            {connections.length > 5 && (
              <Link href="/me/connections" className={styles.seeAll}>
                See all
              </Link>
            )}
          </div>

          {connections.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Share your link to start connecting with others.</p>
            </div>
          ) : (
            <div className={styles.connectionsList}>
              {connections.slice(0, 5).map((conn) => {
                const connIdentity = conn.otherUser.answers
                  ? getIdentity(conn.otherUser.answers)
                  : null;
                return (
                  <Link
                    key={conn.id}
                    href={`/wonder/essay/quiz/result?compare=${conn.otherUser.id}`}
                    className={styles.connectionCard}
                  >
                    <span className={styles.connectionName}>
                      {conn.otherUser.name && conn.otherUser.name !== "Anonymous"
                        ? conn.otherUser.name
                        : "Someone"}
                    </span>
                    <span
                      className={styles.connectionIdentity}
                      style={{ color: connIdentity?.color }}
                    >
                      {connIdentity?.name || "Unknown"}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Groups Section - Placeholder for Phase 3 */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Your Groups (0)</h2>
          </div>
          <div className={styles.emptyState}>
            <p>Groups coming soon! Create groups from your connections.</p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <nav className={styles.footerNav}>
          <Link href="/read">Read</Link>
          <Link href="/navigate">Navigate</Link>
          <Link href="/wonder">Wonder</Link>
          <Link href="/connect">Connect</Link>
        </nav>
        <p className={styles.footerCopy}>&copy; 2026 Louise Ireland</p>
      </footer>
    </div>
    </>
  );
}
