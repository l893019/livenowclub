// src/lib/analytics.ts

/**
 * Generate a unique session ID
 */
export function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Get or create session ID from localStorage
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  const storageKey = 'reader_session_id';
  const expiryKey = 'reader_session_expiry';

  // Check existing session
  const existingId = localStorage.getItem(storageKey);
  const expiry = localStorage.getItem(expiryKey);

  // If session exists and hasn't expired (30 min), reuse it
  if (existingId && expiry && Date.now() < parseInt(expiry)) {
    // Extend expiry
    const newExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes
    localStorage.setItem(expiryKey, newExpiry.toString());
    return existingId;
  }

  // Create new session
  const newId = generateSessionId();
  const newExpiry = Date.now() + 30 * 60 * 1000;
  localStorage.setItem(storageKey, newId);
  localStorage.setItem(expiryKey, newExpiry.toString());

  return newId;
}

/**
 * Track an analytics event
 */
export async function trackEvent(data: {
  event: string;
  page?: string;
  metadata?: Record<string, any>;
}): Promise<void> {
  try {
    const sessionId = getSessionId();
    const page = data.page || window.location.pathname;

    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: data.event,
        page,
        sessionId,
        metadata: data.metadata,
        referrer: document.referrer,
      }),
    });
  } catch (error) {
    // Silently fail - don't break user experience
    console.error('Analytics error:', error);
  }
}
