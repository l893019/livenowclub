"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { archetypes } from "@/lib/archetypes";
import styles from "./MyUtopias.module.css";

type UtopiaMember = {
  id: string;
  name: string;
  archetype: string;
  joinedAt: string;
};

type UtopiaRoom = {
  slug: string;
  name: string;
  createdBy: string;
  members: UtopiaMember[];
  createdAt: string;
};

export default function MyUtopiasPage() {
  const [utopias, setUtopias] = useState<UtopiaRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("quiz-user-id");

    if (!userId) {
      setError("no-quiz");
      setLoading(false);
      return;
    }

    fetch(`/api/utopia/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.utopias) {
          setUtopias(data.utopias);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch utopias:", err);
        setError("fetch-error");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />

      <main className={styles.container}>
        <div className={styles.pageHeader}>
          <div className={styles.pageLabel}>Your Worlds</div>
          <h1 className={styles.pageTitle}>My Utopias</h1>
        </div>

        {loading && (
          <div className={styles.loading}>
            Loading your utopias
            <span className={styles.loadingDots}>
              <span className={styles.loadingDot} />
              <span className={styles.loadingDot} />
              <span className={styles.loadingDot} />
            </span>
          </div>
        )}

        {error === "no-quiz" && (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyTitle}>Take the quiz first</h2>
            <p className={styles.emptyText}>
              Discover your post-scarcity worldview, then build utopias with friends.
            </p>
            <Link href="/wonder/essay" className={`${styles.btn} ${styles.btnPrimary}`}>
              Take the Quiz
            </Link>
          </div>
        )}

        {error === "fetch-error" && (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyTitle}>Something went wrong</h2>
            <p className={styles.emptyText}>
              We couldn&apos;t load your utopias. Try refreshing the page.
            </p>
          </div>
        )}

        {!loading && !error && utopias.length === 0 && (
          <div className={styles.emptyState}>
            <h2 className={styles.emptyTitle}>No utopias yet</h2>
            <p className={styles.emptyText}>
              Build your first utopia and invite friends to join.
            </p>
            <Link href="/wonder/essay" className={`${styles.btn} ${styles.btnPrimary}`}>
              Build a Utopia
            </Link>
          </div>
        )}

        {!loading && !error && utopias.length > 0 && (
          <div className={styles.utopiasGrid}>
            {utopias.map((utopia) => (
              <Link
                key={utopia.slug}
                href={`/wonder/essay/quiz/utopia/${utopia.slug}`}
                className={styles.utopiaCard}
              >
                <div className={styles.memberDots}>
                  {utopia.members.slice(0, 5).map((member, idx) => {
                    const arch = archetypes[member.archetype];
                    return (
                      <div
                        key={member.id}
                        className={styles.memberDot}
                        style={{
                          backgroundColor: arch?.color || "#888",
                          zIndex: 5 - idx,
                        }}
                        title={member.name || "Anonymous"}
                      />
                    );
                  })}
                  {utopia.members.length > 5 && (
                    <div className={styles.memberDotMore}>+{utopia.members.length - 5}</div>
                  )}
                </div>
                <div className={styles.utopiaCardName}>{utopia.name}</div>
                <div className={styles.utopiaCardCount}>
                  {utopia.members.length} {utopia.members.length === 1 ? "person" : "people"}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <nav className={styles.footerNav}>
          <Link href="/read">Read</Link>
          <Link href="/navigate">Navigate</Link>
          <Link href="/wonder">Wonder</Link>
          <Link href="/connect">Connect</Link>
        </nav>
        <p className={styles.footerCopy}>&copy; 2026 Louise Ireland</p>
      </footer>
    </>
  );
}
