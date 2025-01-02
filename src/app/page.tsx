'use client';

import { useState } from 'react';
import Wheel from '@/components/wheel/Wheel';
import Confetti from '@/components/confetti/Confetti';
import { wheelSegments, WheelSegment } from '@/config/wheelConfig';

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [lastWin, setLastWin] = useState<WheelSegment | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSpinEnd = (segment: WheelSegment) => {
    setLastWin(segment);
    if (segment.reward.type === 'points' && segment.reward.value > 0) {
      setShowConfetti(true);
      // Reset confetti after animation
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <Confetti isActive={showConfetti} />
      {!gameStarted ? (
        <section className="h-screen flex flex-col items-center justify-center text-white">
          <h1 className="text-6xl font-bold mb-8 text-center animate-fade-in">
            Wheel of Fortune
          </h1>
          <p className="text-xl mb-12 text-center max-w-2xl animate-fade-in-delay">
            Spin the wheel and test your luck! Win amazing rewards and compete with others.
          </p>
          <button
            onClick={() => setGameStarted(true)}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-full 
                     transform hover:scale-105 transition-all duration-300 animate-bounce"
          >
            Start Game
          </button>
        </section>
      ) : (
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
        </section>
      )}
    </div>
  );
} 