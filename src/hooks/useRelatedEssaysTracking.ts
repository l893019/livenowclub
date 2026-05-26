// src/hooks/useRelatedEssaysTracking.ts
'use client';

import { useEffect, useRef, useCallback } from 'react';
import { trackEvent } from '@/lib/analytics';

interface RelatedEssay {
  slug: string;
  title: string;
}

export function useRelatedEssaysTracking(
  currentPage: string,
  relatedEssays: RelatedEssay[]
) {
  const impressionTrackedRef = useRef(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Track impression when Related Essays section becomes visible
  useEffect(() => {
    if (impressionTrackedRef.current || relatedEssays.length === 0) return;

    // Find the Related Essays section
    const findSection = () => {
      // Look for section with related essays content
      const sections = document.querySelectorAll('section');
      for (const section of sections) {
        const heading = section.querySelector('h3, h2');
        if (heading?.textContent?.includes('Related') ||
            heading?.textContent?.includes('Continue')) {
          return section;
        }
      }
      return null;
    };

    const section = findSection();
    if (!section) return;

    sectionRef.current = section;

    // Use Intersection Observer to detect when section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !impressionTrackedRef.current) {
            impressionTrackedRef.current = true;

            trackEvent({
              event: 'related_essays_impression',
              page: currentPage,
              metadata: {
                related_essays: relatedEssays.map(e => e.slug),
                count: relatedEssays.length,
              },
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 } // Section is 50% visible
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [currentPage, relatedEssays]);

  // Return click handler for related essay links
  const trackClick = useCallback((clickedSlug: string) => {
    trackEvent({
      event: 'related_essays_click',
      page: currentPage,
      metadata: {
        from_essay: currentPage,
        to_essay: clickedSlug,
      },
    });
  }, [currentPage]);

  return { trackClick };
}
