"use client";

import { useRef, useCallback, type TouchEvent } from "react";

type SwipeHandlers = {
  onTouchStart: (e: TouchEvent) => void;
  onTouchEnd: (e: TouchEvent) => void;
};

/**
 * Hook for detecting horizontal swipe gestures.
 * @param onSwipeLeft - Called when user swipes left (next)
 * @param onSwipeRight - Called when user swipes right (previous)
 * @param threshold - Minimum horizontal distance in px (default: 50)
 */
export function useSwipe(
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  threshold = 50
): SwipeHandlers {
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = useCallback((e: TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  }, []);

  const onTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!touchStart.current) return;

      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;

      // Only trigger if horizontal movement exceeds threshold
      // and is more horizontal than vertical (prevents scroll interference)
      if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0 && onSwipeLeft) {
          onSwipeLeft();
        } else if (dx > 0 && onSwipeRight) {
          onSwipeRight();
        }
      }

      touchStart.current = null;
    },
    [onSwipeLeft, onSwipeRight, threshold]
  );

  return { onTouchStart, onTouchEnd };
}
