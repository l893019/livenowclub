'use client';

import { useState, useEffect } from 'react';
import styles from './SubscribeTab.module.css';
import EmailCapture from './EmailCapture';

export default function SubscribeTab() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Check if dismissed in last 7 days
  useEffect(() => {
    const dismissedUntil = localStorage.getItem('subscribe-tab-dismissed-until');
    if (dismissedUntil) {
      const timestamp = parseInt(dismissedUntil, 10);
      if (Date.now() < timestamp) {
        setIsDismissed(true);
      } else {
        // Expired, clear it
        localStorage.removeItem('subscribe-tab-dismissed-until');
      }
    }
  }, []);

  // Track scroll depth
  useEffect(() => {
    if (isDismissed) return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = ((scrollTop + windowHeight) / documentHeight) * 100;

      // Show tab if scrolled 50% or more
      if (scrollPercent >= 50) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  // Track time on page
  useEffect(() => {
    if (isDismissed) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsPanelOpen(false);
    setIsVisible(false);

    // Set dismissal for 7 days
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    const dismissedUntil = Date.now() + sevenDays;
    localStorage.setItem('subscribe-tab-dismissed-until', dismissedUntil.toString());

    setIsDismissed(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  return null; // Will implement render in next steps
}
