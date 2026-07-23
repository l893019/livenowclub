'use client';

import { useState, useEffect } from 'react';
import EmailCapture from './EmailCapture';
import styles from './ExitIntentPopup.module.css';

type ExitIntentPopupProps = {
  enabled?: boolean;
};

export default function ExitIntentPopup({ enabled = true }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // Check if already dismissed in this session
    const dismissed = sessionStorage.getItem('exit-intent-dismissed');
    if (dismissed === 'true') {
      return;
    }

    // Check if already subscribed
    const alreadySubscribed = localStorage.getItem('email-capture-subscribed');
    if (alreadySubscribed === 'true') {
      return;
    }

    let timeout: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving through the top of the page
      // and we haven’t triggered before
      if (e.clientY <= 0 && !hasTriggered) {
        // Small delay to avoid accidental triggers
        timeout = setTimeout(() => {
          setIsVisible(true);
          setHasTriggered(true);

          // Track exit-intent impression
          fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event: 'exit_intent_shown',
              page: window.location.pathname,
            }),
          }).catch(() => {});
        }, 100);
      }
    };

    // Add mouse leave listener
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (timeout) clearTimeout(timeout);
    };
  }, [enabled, hasTriggered]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('exit-intent-dismissed', 'true');

    // Track dismissal
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'exit_intent_dismissed',
        page: window.location.pathname,
      }),
    }).catch(() => {});
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleClose}
          className={styles.closeButton}
          aria-label="Close"
        >
          ×
        </button>
        <div className={styles.content}>
          <h2 className={styles.title}>Wait — don’t go yet</h2>
          <p className={styles.subtitle}>
            If this essay resonated, there’s more where it came from.
          </p>
          <EmailCapture
            context="exit-intent"
            title="Before you go"
            description="One essay most weeks, on living like now is all we have. Free."
          />
        </div>
      </div>
    </div>
  );
}
