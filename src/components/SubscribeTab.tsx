'use client';

import { useState, useEffect } from 'react';
import styles from './SubscribeTab.module.css';
import EmailCapture from './EmailCapture';

export default function SubscribeTab() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

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

  return null; // Will implement render in next steps
}
