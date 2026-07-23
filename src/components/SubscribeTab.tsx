'use client';

import { useState, useEffect } from 'react';
import styles from './SubscribeTab.module.css';
import EmailCapture from './EmailCapture';

export default function SubscribeTab() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  // Don’t show on admin/stats pages
  if (pathname.startsWith('/stats') || pathname.startsWith('/api')) {
    return null;
  }

  const [isVisible, setIsVisible] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    if (typeof window === 'undefined') return false; // SSR safety
    try {
      const dismissedUntil = localStorage.getItem('subscribe-tab-dismissed-until');
      if (dismissedUntil) {
        const timestamp = parseInt(dismissedUntil, 10);
        if (!isNaN(timestamp) && Date.now() < timestamp) {
          return true;
        } else {
          // Invalid or expired, clear it
          localStorage.removeItem('subscribe-tab-dismissed-until');
        }
      }
    } catch (error) {
      console.warn('localStorage unavailable, dismissal will not persist:', error);
    }
    return false;
  });

  // Track scroll depth
  useEffect(() => {
    if (isDismissed) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollTop = window.scrollY;
          const scrollPercent = ((scrollTop + windowHeight) / documentHeight) * 100;

          if (scrollPercent >= 50) {
            setIsVisible(true);
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  // Track time on page
  useEffect(() => {
    if (isDismissed) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsPanelOpen(false);
    setIsVisible(false);

    try {
      // Set dismissal for 7 days
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      const dismissedUntil = Date.now() + sevenDays;
      localStorage.setItem('subscribe-tab-dismissed-until', dismissedUntil.toString());
      setIsDismissed(true);
    } catch (error) {
      console.warn('Failed to persist dismissal:', error);
      // Still set dismissed state so tab disappears for this session
      setIsDismissed(true);
    }
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  const handleSubscribeSuccess = () => {
    setIsSubscribed(true);

    // Clear dismissal - allow showing again later
    localStorage.removeItem('subscribe-tab-dismissed-until');

    // Keep the panel open: the success state holds the "finish on
    // Substack" backup link, which the visitor needs if their popup
    // blocker ate the tab we opened. They close it themselves.
  };

  // ESC key closes panel
  useEffect(() => {
    if (!isPanelOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClosePanel();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isPanelOpen]);

  // Lock body scroll when panel open
  useEffect(() => {
    if (isPanelOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isPanelOpen]);

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsPanelOpen(true)}
        className={styles.tab}
        aria-label="Subscribe to newsletter"
      >
        <span className={styles.tabIcon} aria-hidden="true">{isSubscribed ? '✓' : '✉️'}</span>
        <span className={styles.tabText}>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
      </button>

      {isPanelOpen && (
        <>
          <div
            className={styles.backdrop}
            onClick={handleClosePanel}
          />
          <div className={styles.panel}>
            <button
              onClick={handleDismiss}
              className={styles.closeButton}
              aria-label="Dismiss subscribe panel"
            >
              ✕
            </button>
            <div className={styles.panelContent}>
              <EmailCapture
                context="floating-tab"
                title="Join the club"
                description="One essay most weeks, on living like now is all we have."
                onSuccess={handleSubscribeSuccess}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
