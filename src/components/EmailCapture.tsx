'use client';

import { useState, useEffect } from 'react';
import styles from './EmailCapture.module.css';

type EmailCaptureProps = {
  identity?: string;
  quizAnswers?: string[];
  context?: 'quiz-result' | 'exit-intent' | 'essay' | 'floating-tab';
  title?: string;
  description?: string;
  onSuccess?: () => void;
};

export default function EmailCapture({
  identity,
  quizAnswers,
  context = 'essay',
  title = 'More like this?',
  description = 'Essays on living now. Delivered occasionally.',
  onSuccess,
}: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [substackUrl, setSubstackUrl] = useState('');
  const [isDismissed, setIsDismissed] = useState(false);

  // Check if previously dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('email-capture-dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('email-capture-dismissed', 'true');
    setIsDismissed(true);
  };

  // Don't render if dismissed
  if (isDismissed) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email.');
      return;
    }

    // Substack no longer accepts server-side signups, so send the visitor
    // to its subscribe page pre-filled. Opening synchronously inside the
    // submit gesture keeps popup blockers out of the way.
    const url = `https://louiseireland.substack.com/subscribe?email=${encodeURIComponent(trimmed)}&utm_source=livenowclub`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubstackUrl(url);
    setStatus('success');
    setMessage("Almost done. Confirm on Substack and you're in.");

    // Record the signup + analytics in the background; UX doesn't depend on it
    fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: trimmed,
        identity,
        quizAnswers,
        referrer: document.referrer,
      }),
    }).catch(() => {});

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'email_signup',
        page: window.location.pathname,
        identity,
        context,
      }),
    }).catch(() => {});

    if (onSuccess) {
      onSuccess();
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.container}>
        <button
          onClick={handleDismiss}
          className={styles.closeButton}
          aria-label="Dismiss"
        >
          ×
        </button>
        <div className={styles.success}>
          <div className={styles.successIcon}>✓</div>
          <h3>{message}</h3>
          {substackUrl && (
            <div className={styles.fallback}>
              <p>A Substack tab should have opened. If not:</p>
              <a
                href={substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.substackButton}
              >
                Complete Subscription →
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button
        onClick={handleDismiss}
        className={styles.closeButton}
        aria-label="Dismiss"
      >
        ×
      </button>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === 'loading'}
            className={styles.input}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className={styles.button}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        <p className={styles.privacy}>
          No spam. Unsubscribe anytime.
        </p>

        {status === 'error' && (
          <p className={styles.error}>{message}</p>
        )}
      </div>
    </div>
  );
}
