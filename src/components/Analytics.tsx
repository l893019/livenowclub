'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Track pageview
    const trackPageview = async () => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: pathname,
            referrer: document.referrer,
          }),
        });
      } catch (error) {
        // Silently fail - don't break the site if analytics fails
        console.error('Analytics error:', error);
      }
    };

    trackPageview();
  }, [pathname]);

  return null; // This component doesn't render anything
}
