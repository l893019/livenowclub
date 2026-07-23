'use client';

import { useState, useEffect } from 'react';
import EmailCapture from './EmailCapture';
import styles from './ScrollSlideIn.module.css';

type ScrollSlideInProps = {
  enabled?: boolean;
  scrollThreshold?: number; // Percentage of page scrolled (0-100)
  suppressSelector?: string; // Hide while this element is in the viewport (e.g. an inline subscribe form)
};

export default function ScrollSlideIn({
  enabled = true,
  scrollThreshold = 50,
  suppressSelector,
}: ScrollSlideInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [suppressed, setSuppressed] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // Check if already dismissed
    const dismissed = localStorage.getItem('scroll-slidein-dismissed');
    if (dismissed === 'true') {
      return;
    }

    // Check if already subscribed
    const alreadySubscribed = localStorage.getItem('email-capture-subscribed');
    if (alreadySubscribed === 'true') {
      return;
    }

    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      // Don’t compete with an inline subscribe form that’s on screen
      let overlapping = false;
      if (suppressSelector) {
        const el = document.querySelector(suppressSelector);
        if (el) {
          const rect = el.getBoundingClientRect();
          overlapping = rect.top < windowHeight && rect.bottom > 0;
        }
      }
      setSuppressed(overlapping);

      if (hasTriggered || overlapping) return;

      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = ((scrollTop + windowHeight) / documentHeight) * 100;

      if (scrollPercent >= scrollThreshold) {
        setIsVisible(true);
        setHasTriggered(true);

        // Track slide-in impression
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'scroll_slidein_shown',
            page: window.location.pathname,
            metadata: { scrollPercent: Math.round(scrollPercent) },
          }),
        }).catch(() => {});
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Check immediately in case already scrolled
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enabled, scrollThreshold, hasTriggered, suppressSelector]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('scroll-slidein-dismissed', 'true');

    // Track dismissal
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'scroll_slidein_dismissed',
        page: window.location.pathname,
      }),
    }).catch(() => {});
  };

  if (!isVisible || suppressed) return null;

  return (
    <div className={styles.container}>
      <button
        onClick={handleClose}
        className={styles.closeButton}
        aria-label="Close"
      >
        ×
      </button>
      <div className={styles.content}>
        <div className={styles.text}>
          <h3 className={styles.title}>Reading along? Join the club.</h3>
          <p className={styles.subtitle}>One essay most weeks, on living like now is all we have.</p>
        </div>
        <EmailCapture
          context="essay"
          title=""
          description=""
          showDismiss={false}
        />
      </div>
    </div>
  );
}
