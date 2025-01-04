'use client';

import { useState } from 'react';
import Wheel from '@/components/wheel/Wheel';
import { wheelSegments, WheelSegment } from '@/config/wheelConfig';
import Confetti from '@/components/confetti/Confetti';

export default function WheelPage() {
  const [wheelItems, setWheelItems] = useState(wheelSegments);
  const [lastWin, setLastWin] = useState<WheelSegment | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSpinEnd = (segment: WheelSegment) => {
    setLastWin(segment);
    if (segment.reward.type === 'points' && segment.reward.value > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const handleWheelItemsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      if (e.target.value === '') {
        setWheelItems(wheelSegments);
      } else {
        const newItems = JSON.parse(e.target.value);
        setWheelItems(newItems);
      }
    } catch (error) {
      console.error('Invalid JSON format');
    }
  };

  return (
    <section className="h-full flex flex-col items-center justify-center">
      <Confetti isActive={showConfetti} />
      <div className="flex w-full h-full">
        <div className="flex flex-1 flex-col items-center justify-center">
          <Wheel segments={wheelItems} onSpinEnd={handleSpinEnd} />
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
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 scrollbar-vscode-thick">
          <textarea 
            className="w-3/4 h-64 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={JSON.stringify(wheelItems, null, 2)}
            onChange={handleWheelItemsChange}
            placeholder="Enter wheel items as JSON"
          />

          <div className="flex flex-row gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
              Spin
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors">
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 