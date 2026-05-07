'use client';

import { useState, useEffect } from 'react';
import styles from './SubscribeTab.module.css';
import EmailCapture from './EmailCapture';

export default function SubscribeTab() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
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

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = ((scrollTop + windowHeight) / documentHeight) * 100;

      // Show tab if scrolled 50% or more
      if (scrollPercent >= 50) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

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
        <span className={styles.tabIcon} aria-hidden="true">✉️</span>
        <span className={styles.tabText}>Subscribe</span>
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
                title="Subscribe"
                description="Essays on living now. Delivered occasionally."
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
