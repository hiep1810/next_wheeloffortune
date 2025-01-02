'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  isActive: boolean;
}

export default function Confetti({ isActive }: ConfettiProps) {
  useEffect(() => {
    if (!isActive) return;

    // Fire multiple bursts of confetti
    const duration = 1000;
    const end = Date.now() + duration;

    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFE66D'];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, [isActive]);

  return null;
} 