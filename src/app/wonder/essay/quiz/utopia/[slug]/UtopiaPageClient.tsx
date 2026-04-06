"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { JoinAnimation } from "./JoinAnimation";
import { GroupRadarStep } from "./steps/GroupRadarStep";
import { GroupReadingStep } from "./steps/GroupReadingStep";
import { RelationshipStep } from "./steps/RelationshipStep";
import { TwoPersonView } from "./TwoPersonView";
import { YourArchetypeCard, JoinUtopiaCard } from "./YourArchetypeCard";
import { ReadingPage } from "@/app/wonder/essay/quiz/result/ReadingPage";
import { archetypes } from "@/lib/archetypes";
import type { UtopiaMember } from "@/lib/utopia";
import styles from "./UtopiaPageClient.module.css";

type JoinInfo = {
  slug: string;
  userId: string;
  archetype: string;
  name: string;
  inviterId?: string | null;
};

type UtopiaPageClientProps = {
  slug: string;
  utopiaName: string;
  members: UtopiaMember[];
  shareUrl: string;
};

type View = "radar" | "reading" | "relationship" | "profile" | "their-reading";

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
  // For deep links: view relationship as a specific person (without changing your identity)
  const [viewAsUserId, setViewAsUserId] = useState<string | null>(null);
  // Track the previous view for back navigation from their-reading
  const [previousView, setPreviousView] = useState<View>("radar");

  useEffect(() => {
    const userId = localStorage.getItem("quiz-user-id");
    setCurrentUserId(userId);

    // Handle deep link for relationship view
    const params = new URLSearchParams(window.location.search);
    const view = params.get("view");
    const youId = params.get("you");
    const themId = params.get("them");

    if (view === "relationship" && youId && themId) {
      setSelectedMemberId(themId);
      setCurrentView("relationship");
      // Set viewAs for deep link (preserves actual identity in currentUserId)
      if (youId !== userId) {
        setViewAsUserId(youId);
      }
      // Clear URL params to prevent issues on refresh/navigation
      window.history.replaceState({}, "", window.location.pathname);
    }
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
    // Auto-show relationship with inviter after animation (immediate payoff)
    if (joinInfo?.inviterId) {
      const inviter = members.find((m) => m.id === joinInfo.inviterId);
      if (inviter) {
        setSelectedMemberId(joinInfo.inviterId);
        setCurrentView("relationship");
      }
    }
  };

  const handleMemberClick = useCallback(
    (memberId: string) => {
      // Always check localStorage directly to avoid stale state issues
      const actualUserId = localStorage.getItem("quiz-user-id");
      if (memberId === actualUserId) {
        // Clicking yourself shows your profile
        setCurrentView("profile");
      } else {
        setSelectedMemberId(memberId);
        setCurrentView("relationship");
      }
    },
    []
  );

  const handleBackToGroup = () => {
    setSelectedMemberId(null);
    setViewAsUserId(null); // Clear deep link perspective
    setCurrentView("radar");
  };

  const handleShowReading = () => {
    setCurrentView("reading");
  };

  const handleBackToRadar = () => {
    setViewAsUserId(null); // Clear any deep link perspective
    setCurrentView("radar");
  };

  const handleViewTheirReading = () => {
    setPreviousView(currentView);
    setCurrentView("their-reading");
  };

  const handleBackFromTheirReading = () => {
    setCurrentView(previousView);
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
    // Get current user's archetype for personalized share text
    const me = members.find((m) => m.id === currentUserId);
    const myArchetype = me ? archetypes[me.archetype] : null;
    const myArchetypeName = myArchetype?.name || "a unique worldview";

    // Share text includes archetype: "I'm a Swimmer in Deep Water. What are you? Take the quiz and join my group."
    const shareText = me
      ? `I'm a ${myArchetypeName}. What are you? Take the quiz and join my group.`
      : `Join ${utopiaName} — a utopia of ${members.length}.`;

    if (navigator.share) {
      try {
        await navigator.share({ title: utopiaName, text: shareText, url: shareUrl });
      } catch {
        // User cancelled or error
      }
    } else {
      // Copy both text and URL for better sharing
      const fullText = `${shareText}\n\n${shareUrl}`;
      await navigator.clipboard.writeText(fullText);
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
  // Use viewAsUserId for deep links, otherwise currentUserId
  const relationshipYouId = viewAsUserId || currentUserId;
  if (currentView === "relationship" && selectedMemberId && relationshipYouId) {
    const you = members.find((m) => m.id === relationshipYouId);
    const them = members.find((m) => m.id === selectedMemberId);

    if (you && them) {
      // Show CTA if viewer is on a deep link (viewAsUserId is set) and hasn't taken quiz (no currentUserId)
      const viewerHasNotTakenQuiz = !!viewAsUserId && !currentUserId;

      return (
        <RelationshipStep
          you={you}
          them={them}
          utopiaSlug={slug}
          utopiaName={utopiaName}
          onBack={handleBackToGroup}
          onNext={selectedIndex < otherMembers.length - 1 ? handleNextMember : undefined}
          onPrev={selectedIndex > 0 ? handlePrevMember : undefined}
          hasNext={selectedIndex < otherMembers.length - 1}
          hasPrev={selectedIndex > 0}
          onViewTheirReading={handleViewTheirReading}
          viewerHasNotTakenQuiz={viewerHasNotTakenQuiz}
        />
      );
    }
  }

  // Their reading view (viewing another member's full reading)
  if (currentView === "their-reading" && selectedMemberId) {
    const them = members.find((m) => m.id === selectedMemberId);

    if (them) {
      return (
        <ReadingPage
          archetypeKey={them.archetype}
          onBack={handleBackFromTheirReading}
          groupContext={{
            utopiaSlug: slug,
            utopiaName: utopiaName,
          }}
          personName={them.name || "Anonymous"}
        />
      );
    }
  }

  // Profile view (current user's full reading inline)
  // Always use localStorage directly to avoid any stale state issues
  const actualUserIdForProfile = typeof window !== "undefined" ? localStorage.getItem("quiz-user-id") : null;
  if (currentView === "profile" && actualUserIdForProfile) {
    const me = members.find((m) => m.id === actualUserIdForProfile);

    if (me) {
      return (
        <ReadingPage
          archetypeKey={me.archetype}
          onBack={handleBackToRadar}
          groupContext={{
            utopiaSlug: slug,
            utopiaName: utopiaName,
          }}
        />
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
          <GroupReadingStep members={members} utopiaName={utopiaName} utopiaSlug={slug} />
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

        {/* Your archetype card or Join CTA */}
        {currentUserId ? (
          (() => {
            const me = members.find((m) => m.id === currentUserId);
            if (!me) return <JoinUtopiaCard slug={slug} utopiaName={utopiaName} memberCount={members.length} />;
            return <YourArchetypeCard member={me} onClick={() => setCurrentView("profile")} />;
          })()
        ) : (
          <JoinUtopiaCard slug={slug} utopiaName={utopiaName} memberCount={members.length} />
        )}

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
