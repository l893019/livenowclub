'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Generate or retrieve session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem('analytics-session-id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem('analytics-session-id', sessionId);
  }
  return sessionId;
}

export default function Analytics() {
  const pathname = usePathname();
  const scrollDepthTracked = useRef<Set<number>>(new Set());
  const startTime = useRef<number>(Date.now());
  const sessionId = useRef<string>('');

  useEffect(() => {
    // Initialize session ID
    sessionId.current = getSessionId();

    // Track pageview
    const trackPageview = async () => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: pathname,
            referrer: document.referrer,
            sessionId: sessionId.current,
          }),
        });
      } catch (error) {
        // Silently fail - don't break the site if analytics fails
        console.error('Analytics error:', error);
      }
    };

    trackPageview();

    // Reset tracking for new page
    scrollDepthTracked.current = new Set();
    startTime.current = Date.now();
  }, [pathname]);

  useEffect(() => {
    // Only track scroll depth and time for essay pages
    const isEssayPage = pathname.includes('/read/') || pathname.includes('/wonder/essay/');

    if (!isEssayPage) return;

    // Track scroll depth
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = Math.round(((scrollTop + windowHeight) / documentHeight) * 100);

      // Track milestones: 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !scrollDepthTracked.current.has(milestone)) {
          scrollDepthTracked.current.add(milestone);

          fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event: 'scroll_depth',
              page: pathname,
              sessionId: sessionId.current,
              metadata: { depth: milestone },
            }),
          }).catch(() => {});
        }
      }
    };

    // Track time on page when leaving
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000); // seconds

      // Only track if spent more than 5 seconds
      if (timeSpent > 5) {
        // Use sendBeacon for reliable tracking on page unload
        const data = JSON.stringify({
          event: 'time_on_page',
          page: pathname,
          sessionId: sessionId.current,
          metadata: { seconds: timeSpent },
        });

        if (navigator.sendBeacon) {
          navigator.sendBeacon('/api/track', data);
        } else {
          fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data,
            keepalive: true,
          }).catch(() => {});
        }
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Initial check for scroll depth
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);

  return null; // This component doesn't render anything
}
