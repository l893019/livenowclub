"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { JoinAnimation } from "./JoinAnimation";
import { GroupRadarStep } from "./steps/GroupRadarStep";
import { GroupReadingStep } from "./steps/GroupReadingStep";
import { RelationshipStep } from "./steps/RelationshipStep";
import { TwoPersonView } from "./TwoPersonView";
import { archetypes } from "@/lib/archetypes";
import type { UtopiaMember } from "@/lib/utopia";
import styles from "./UtopiaPageClient.module.css";

type JoinInfo = {
  slug: string;
  userId: string;
  archetype: string;
  name: string;
};

type UtopiaPageClientProps = {
  slug: string;
  utopiaName: string;
  members: UtopiaMember[];
  shareUrl: string;
};

type View = "radar" | "reading" | "relationship" | "profile";

export function UtopiaPageClient({
  slug,
  utopiaName,
  members,
  shareUrl,
}: UtopiaPageClientProps) {
  const [showJoinAnimation, setShowJoinAnimation] = useState(false);
  const [joinInfo, setJoinInfo] = useState<JoinInfo | null>(null);
  const [existingMembers, setExistingMembers] = useState<UtopiaMember[]>([]);
  const [currentView, setCurrentView] = useState<View>("radar");
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("quiz-user-id");
    setCurrentUserId(userId);
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("just-joined-utopia");
    if (stored) {
      try {
        const info = JSON.parse(stored) as JoinInfo;
        if (info.slug === slug) {
          setJoinInfo(info);
          const newMember = members.find((m) => m.id === info.userId);
          if (newMember) {
            const existing = members.filter((m) => m.id !== info.userId);
            setExistingMembers(existing);
            setShowJoinAnimation(true);
          }
          sessionStorage.removeItem("just-joined-utopia");
        }
      } catch (e) {
        console.error("Failed to parse just-joined-utopia:", e);
      }
    }
  }, [slug, members]);

  const handleAnimationComplete = () => {
    setShowJoinAnimation(false);
  };

  const handleMemberClick = useCallback(
    (memberId: string) => {
      if (memberId === currentUserId) {
        // Clicking yourself shows your profile
        setCurrentView("profile");
      } else {
        setSelectedMemberId(memberId);
        setCurrentView("relationship");
      }
    },
    [currentUserId]
  );

  const handleBackToGroup = () => {
    setSelectedMemberId(null);
    setCurrentView("radar");
  };

  const handleShowReading = () => {
    setCurrentView("reading");
  };

  const handleBackToRadar = () => {
    setCurrentView("radar");
  };

  // Navigation for relationship step
  const otherMembers = members.filter((m) => m.id !== currentUserId);
  const selectedIndex = selectedMemberId
    ? otherMembers.findIndex((m) => m.id === selectedMemberId)
    : -1;

  const handleNextMember = () => {
    if (selectedIndex < otherMembers.length - 1) {
      setSelectedMemberId(otherMembers[selectedIndex + 1].id);
    }
  };

  const handlePrevMember = () => {
    if (selectedIndex > 0) {
      setSelectedMemberId(otherMembers[selectedIndex - 1].id);
    }
  };

  const handleShare = async () => {
    const shareText = `Join ${utopiaName} — a utopia of ${members.length}.`;
    if (navigator.share) {
      try {
        await navigator.share({ title: utopiaName, text: shareText, url: shareUrl });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  // Join animation
  if (showJoinAnimation && joinInfo) {
    const newMember = members.find((m) => m.id === joinInfo.userId);
    if (newMember) {
      return (
        <JoinAnimation
          existingMembers={existingMembers}
          newMember={newMember}
          utopiaName={utopiaName}
          onComplete={handleAnimationComplete}
        />
      );
    }
  }

  // Two-person utopia: special enhanced view
  if (members.length === 2) {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <TwoPersonView members={members} utopiaName={utopiaName} />
          <ShareSection
            shareUrl={shareUrl}
            onShare={handleShare}
          />
        </main>
        <Footer />
      </div>
    );
  }

  // Relationship view
  if (currentView === "relationship" && selectedMemberId && currentUserId) {
    const you = members.find((m) => m.id === currentUserId);
    const them = members.find((m) => m.id === selectedMemberId);

    if (you && them) {
      return (
        <RelationshipStep
          you={you}
          them={them}
          onBack={handleBackToGroup}
          onNext={selectedIndex < otherMembers.length - 1 ? handleNextMember : undefined}
          onPrev={selectedIndex > 0 ? handlePrevMember : undefined}
          hasNext={selectedIndex < otherMembers.length - 1}
          hasPrev={selectedIndex > 0}
        />
      );
    }
  }

  // Profile view (current user's archetype)
  if (currentView === "profile" && currentUserId) {
    const me = members.find((m) => m.id === currentUserId);
    const archetype = me ? archetypes[me.archetype] : null;

    if (me && archetype) {
      return (
        <div className={styles.container}>
          <Header />
          <button className={styles.backButton} onClick={handleBackToRadar}>
            ← Back to radar
          </button>
          <main className={styles.profileMain}>
            <div className={styles.profileCard} style={{ borderColor: archetype.color }}>
              <span className={styles.profileLabel} style={{ color: archetype.color }}>
                You are
              </span>
              <h1 className={styles.profileName} style={{ color: archetype.color }}>
                {archetype.name}
              </h1>
              <p className={styles.profileUtopia}>{archetype.utopia}</p>
              <p className={styles.profileDescription}>{archetype.description}</p>
              <div className={styles.profileSection}>
                <h3 className={styles.profileSectionTitle}>Your superpower</h3>
                <p className={styles.profileSectionText}>{archetype.superpower}</p>
              </div>
              <div className={styles.profileSection}>
                <h3 className={styles.profileSectionTitle}>Your blind spot</h3>
                <p className={styles.profileSectionText}>{archetype.blindSpot}</p>
              </div>
              <div className={styles.profileSection}>
                <h3 className={styles.profileSectionTitle}>A book for you</h3>
                <p className={styles.profileSectionText}>
                  <em>{archetype.book.title}</em> by {archetype.book.author}
                </p>
              </div>
              <div className={styles.profileActions}>
                <Link href="/wonder/essay/quiz/result" className={styles.btnSecondary}>
                  See Full Result
                </Link>
                <Link href="/wonder/essay/quiz/my-utopias" className={styles.btnSecondary}>
                  My Utopias
                </Link>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      );
    }
  }

  // Group reading view
  if (currentView === "reading") {
    return (
      <div className={styles.container}>
        <Header />
        <button className={styles.backButton} onClick={handleBackToRadar}>
          ← Back to radar
        </button>
        <main className={styles.readingMain}>
          <GroupReadingStep members={members} />
          <div className={styles.shareWrapper}>
            <ShareSection shareUrl={shareUrl} onShare={handleShare} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Main radar view (default)
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <span className={styles.label}>Your Utopia</span>
          <h1 className={styles.title}>{utopiaName}</h1>
          <p className={styles.count}>
            {members.length} {members.length === 1 ? "person" : "people"}
          </p>
        </div>

        <GroupRadarStep
          members={members}
          utopiaName={utopiaName}
          onMemberClick={handleMemberClick}
          highlightMemberId={selectedMemberId || undefined}
          currentUserId={currentUserId}
        />

        {/* Your archetype card */}
        {currentUserId && (() => {
          const me = members.find((m) => m.id === currentUserId);
          const arch = me ? archetypes[me.archetype] : null;
          if (!me || !arch) return null;
          return (
            <button className={styles.yourCard} onClick={() => setCurrentView("profile")}>
              <div className={styles.yourCardDot} style={{ backgroundColor: arch.color }} />
              <div className={styles.yourCardContent}>
                <span className={styles.yourCardLabel}>{arch.name}</span>
                <p className={styles.yourCardQuote}>{arch.utopia.replace(/^Their/, "Your")}</p>
              </div>
            </button>
          );
        })()}

        <div className={styles.actions}>
          <button className={styles.btnSecondary} onClick={handleShowReading}>
            Group Reading
          </button>
          <button className={styles.btnPrimary} onClick={handleShare}>
            Invite Someone
          </button>
        </div>

        <Link href="/wonder/essay/quiz/my-utopias" className={styles.myUtopias}>
          My Utopias →
        </Link>
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <img src="/images/logo-handwritten.png" alt="The Live Now Club" className={styles.logoImg} />
      </Link>
      <nav className={styles.nav}>
        <Link href="/read">Read</Link>
        <Link href="/navigate">Navigate</Link>
        <Link href="/wonder">Wonder</Link>
        <Link href="/connect">Connect</Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.footerNav}>
        <Link href="/read">Read</Link>
        <Link href="/navigate">Navigate</Link>
        <Link href="/wonder">Wonder</Link>
        <Link href="/connect">Connect</Link>
      </nav>
      <p className={styles.footerCopy}>&copy; 2026 Louise Ireland</p>
    </footer>
  );
}

function ShareSection({ shareUrl, onShare }: { shareUrl: string; onShare: () => void }) {
  return (
    <div className={styles.shareSection}>
      <h2 className={styles.shareTitle}>Invite someone</h2>
      <p className={styles.shareSubtitle}>
        See how your utopia changes when new worldviews join.
      </p>
      <a href={shareUrl} className={styles.shareLink} target="_blank" rel="noopener noreferrer">
        {shareUrl}
      </a>
      <div className={styles.shareActions}>
        <button className={styles.btnPrimary} onClick={onShare}>
          Share Link
        </button>
        <Link href="/wonder/essay/quiz/my-utopias" className={styles.btnSecondary}>
          My Utopias
        </Link>
      </div>
    </div>
  );
}
