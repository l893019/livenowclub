'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './EmailCapture.module.css';

// The earned capture: quiz finishers keep the reading they just made.
// Copy here is placeholder-plain; Louise owns the final lines.
type EmailMyReadingProps = {
  identityKey: string;
  identityName: string;
};

export default function EmailMyReading({ identityKey, identityName }: EmailMyReadingProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const impressionTracked = useRef(false);

  useEffect(() => {
    if (impressionTracked.current) return;
    impressionTracked.current = true;
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'email_capture_impression',
        page: window.location.pathname,
        context: 'reading-email',
      }),
    }).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email.');
      return;
    }

    setStatus('loading');

    let acquisition: string | null = null;
    try {
      acquisition = sessionStorage.getItem('acquisition-source');
    } catch {}

    try {
      const res = await fetch('/api/reading-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          identityKey,
          acquisition: acquisition || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        try {
          localStorage.setItem('email-capture-subscribed', 'true');
        } catch {}
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'email_signup',
            page: window.location.pathname,
            identity: identityName,
            context: 'reading-email',
            metadata: acquisition ? { acquisition } : undefined,
          }),
        }).catch(() => {});
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.container}>
        <div className={styles.success}>
          <div className={styles.successIcon}>✓</div>
          <h3>Sent. Check your inbox.</h3>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3 className={styles.title}>Keep this reading</h3>
        <p className={styles.description}>
          You&rsquo;re {identityName}. I&rsquo;ll send your full reading to your inbox.
        </p>

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
          <button type="submit" disabled={status === 'loading'} className={styles.button}>
            {status === 'loading' ? 'Sending...' : 'Send it'}
          </button>
        </form>

        <p className={styles.privacy}>
          One email, plus the essay it came from. Unsubscribe anytime.
        </p>

        {status === 'error' && <p className={styles.error}>{message}</p>}
      </div>
    </div>
  );
}
