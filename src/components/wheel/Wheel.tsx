'use client';

import { useEffect, useRef, useState } from 'react';
import { WheelSegment } from '@/config/wheelConfig';

interface WheelProps {
  segments: WheelSegment[];
  onSpinEnd?: (segment: WheelSegment) => void;
}

export default function Wheel({ segments, onSpinEnd }: WheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Draw wheel segments
    segments.forEach((segment, index) => {
      const startAngle = (index * 2 * Math.PI) / segments.length;
      const endAngle = ((index + 1) * 2 * Math.PI) / segments.length;

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = segment.color;
      ctx.fill();
      ctx.stroke();

      // Add text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + (endAngle - startAngle) / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px Inter';
      ctx.fillText(segment.text, radius - 20, 5);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
  }, [segments, currentRotation]);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const spinDuration = 4000; // 4 seconds
    const minSpins = 5; // Minimum number of full rotations
    const startTime = Date.now();

    // Calculate final rotation based on selected segment
    const selectedIndex = Math.floor(Math.random() * segments.length);
    const segmentAngle = 360 / segments.length;
    const finalAngle = 360 * minSpins + selectedIndex * segmentAngle;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      
      if (elapsed < spinDuration) {
        const easeOut = 1 - Math.pow(1 - elapsed / spinDuration, 3);
        const currentAngle = easeOut * finalAngle;
        setCurrentRotation(currentAngle);
        requestAnimationFrame(animate);
      } else {
        setCurrentRotation(finalAngle);
        setIsSpinning(false);
        onSpinEnd?.(segments[selectedIndex]);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        style={{
          transform: `rotate(${currentRotation}deg)`,
          transition: isSpinning ? 'none' : 'transform 0.3s ease-out',
        }}
      />
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                   bg-yellow-500 text-black font-bold py-2 px-4 rounded-full
                   hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSpinning ? 'Spinning...' : 'SPIN!'}
      </button>
    </div>
  );
} 