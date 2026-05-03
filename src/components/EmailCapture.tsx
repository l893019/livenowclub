'use client';

import { useState, useEffect } from 'react';
import styles from './EmailCapture.module.css';

type EmailCaptureProps = {
  identity?: string;
  quizAnswers?: string[];
  context?: 'quiz-result' | 'exit-intent' | 'essay';
  title?: string;
  description?: string;
};

export default function EmailCapture({
  identity,
  quizAnswers,
  context = 'essay',
  title = 'More like this?',
  description = 'Essays on living now. Delivered occasionally.',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          identity,
          quizAnswers,
          referrer: document.referrer,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        if (data.substackUrl) {
          setSubstackUrl(data.substackUrl);
        }

        // Track email signup event
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
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to subscribe. Please try again.');
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
              <p>Click below to complete your subscription:</p>
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
