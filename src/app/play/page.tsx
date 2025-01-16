'use client';

import { useRef, useState } from 'react';
import Wheel from '@/components/wheel/Wheel';
import { wheelSegments, WheelSegment, WheelSegmentType } from '@/config/wheelConfig';
import Confetti from '@/components/confetti/Confetti';

export default function WheelPage() {
  const [wheelJSONItems, setWheelJSONItems] = useState(wheelSegments);
  const [lastWin, setLastWin] = useState<WheelSegment | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isJSON, setIsJSON] = useState(false);
  const [wheelListItems, setWheelListItems] = useState<string[]>([]);
  const colors = useRef<string[]>([]);
  const [wheelListToJSONItems, setWheelListToJSONItems] = useState<WheelSegment[]>([]);

  const handleSpinEnd = (segment: WheelSegment) => {
    setLastWin(segment);
    if (segment.reward.type === 'points' && typeof segment.reward.value === 'number' && segment.reward.value > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const handleWheelItemsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isJSON) {
      try {
        if (e.target.value === '') {
          setWheelJSONItems(wheelSegments);
        } else {
          const newItems = JSON.parse(e.target.value);
          setWheelJSONItems(newItems);
        }
      } catch (error) {
        console.error('Invalid JSON format');
      }
    }
  };

  const handleReset = () => {
    setWheelJSONItems(wheelSegments);
    setWheelListItems([]);
    setWheelListToJSONItems([]);
    setLastWin(null);
    setShowConfetti(false);
    setIsJSON(false);
  };

  const randomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }

  const wheelListItemsToJSON = (listItems: string[], colors: string[]) : WheelSegment[] =>{
    const wheelListItemsJSON = listItems.map((item, index) => ({
      id: index + 1,
      text: item,
      probability: 1 / listItems.length,
      color: colors[index],
      reward: {
        type: 'name' as WheelSegmentType,
        value: item
      }
    }));
    
    return wheelListItemsJSON;
  }

  const handleWheelListItems = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textArea = e.target as HTMLTextAreaElement;
    const items = textArea.value.split('\n');

    if(e.key === 'Backspace'){
      if(items.length > 0){
        if(items[items.length - 1].length > 0){
          items[items.length - 1] = items[items.length - 1].slice(0, -1);
        }
        else{
          items.pop();
          colors.current.pop();
          const listToJSONItems = wheelListItemsToJSON(items, colors.current);
          setWheelListToJSONItems(listToJSONItems); 
        }
      }
    }else {
      if (e.key === 'Enter') {
        const newColors = [...colors.current, randomColor()];
        colors.current = newColors;
        const listToJSONItems = wheelListItemsToJSON(items, newColors);
        setWheelListToJSONItems(listToJSONItems); 
        items.push('');
      } 
      else if (e.key.length === 1 &&  /^[a-zA-Z0-9\s!@#$%^&*()_+-=[\]{};:'",./<>?]$/.test(e.key)){
        if(items.length > 0){ 
          items[items.length - 1] = items[items.length - 1] + e.key;
        }
        else{
          items.push(e.key);
        }
      }
    }
    setWheelListItems(items);
  }

  return (
    <section className="h-full flex flex-col items-center justify-center">
      <Confetti isActive={showConfetti} />
      <div className="flex w-full h-full">
        <div className="flex flex-1 flex-col items-center justify-center">
          <Wheel segments={isJSON ? wheelJSONItems : wheelListToJSONItems} onSpinEnd={handleSpinEnd} />
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
            className={`${isJSON && 'hidden'} w-3/4 h-64 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={wheelListItems.join('\n')}
            placeholder={`Enter wheel items as List`}
            onKeyDown={handleWheelListItems}
            spellCheck={false}
          />
          
          <textarea 
            className={`${!isJSON && 'hidden'} w-3/4 h-64 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onChange={handleWheelItemsChange}
            value={JSON.stringify(wheelJSONItems, null, 2)}
            placeholder={`Enter wheel items as JSON`}
            spellCheck={false}
          />

          <div className="flex flex-row gap-4">
            <button
              onClick={() => setIsJSON(!isJSON)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
              {isJSON ? 'JSON' : 'List'}
            </button>
            <button 
              onClick={handleReset}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors">
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 