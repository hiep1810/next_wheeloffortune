'use client';

import { useState } from 'react';
import Wheel from '@/components/wheel/Wheel';
import Confetti from '@/components/confetti/Confetti';
import { wheelSegments, WheelSegment } from '@/config/wheelConfig';

export default function WheelPage() {
  const [lastWin, setLastWin] = useState<WheelSegment | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSpinEnd = (segment: WheelSegment) => {
    setLastWin(segment);
    if (segment.reward.type === 'points' && segment.reward.value > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  return (
    <section className="h-screen flex flex-col items-center justify-center space-y-8">
      <Wheel segments={wheelSegments} onSpinEnd={handleSpinEnd} />
      {lastWin && (
        <div className="text-white text-center animate-fade-in">
          <h2 className={`text-2xl font-bold mb-2 ${showConfetti ? 'celebrate' : ''}`}>
            {lastWin.reward.type === 'none' 
              ? 'Better luck next time!' 
              : 'Congratulations!'}
          </h2>
          <p className="text-xl">
            {lastWin.reward.type === 'none'
              ? 'Try again for another chance to win!'
              : `You won ${lastWin.reward.value} points!`}
          </p>
        </div>
      )}
      <Confetti isActive={showConfetti} />
    </section>
  );
} 