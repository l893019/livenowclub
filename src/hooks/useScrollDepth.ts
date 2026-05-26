// src/hooks/useScrollDepth.ts
'use client';

import { useEffect, useRef, useCallback } from 'react';
import { trackEvent } from '@/lib/analytics';

export function useScrollDepth(page: string) {
  const maxDepthRef = useRef(0);
  const lastReportedRef = useRef(0);
  const reportedRef = useRef(false);

  const calculateScrollDepth = useCallback(() => {
    // Calculate how far down the page the user has scrolled (0-100%)
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    const scrollableHeight = documentHeight - windowHeight;
    const scrollPercentage = scrollableHeight > 0
      ? Math.round((scrollTop / scrollableHeight) * 100)
      : 100;

    return Math.min(scrollPercentage, 100);
  }, []);

  const handleScroll = useCallback(() => {
    const currentDepth = calculateScrollDepth();

    // Update max depth
    if (currentDepth > maxDepthRef.current) {
      maxDepthRef.current = currentDepth;
    }

    // Report every 25% milestone (25, 50, 75, 100)
    const milestone = Math.floor(currentDepth / 25) * 25;
    if (milestone > lastReportedRef.current && milestone > 0) {
      lastReportedRef.current = milestone;

      trackEvent({
        event: 'scroll_depth',
        page,
        metadata: { depth: milestone },
      });
    }
  }, [calculateScrollDepth, page]);

  const reportFinalDepth = useCallback(() => {
    // Report final depth on unmount if not already reported
    if (!reportedRef.current && maxDepthRef.current > 0) {
      reportedRef.current = true;
      trackEvent({
        event: 'scroll_depth_final',
        page,
        metadata: { depth: maxDepthRef.current },
      });
    }
  }, [page]);

  useEffect(() => {
    // Throttle scroll events
    let timeoutId: NodeJS.Timeout;
    const throttledScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Report initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
      reportFinalDepth();
    };
  }, [handleScroll, reportFinalDepth]);
}
