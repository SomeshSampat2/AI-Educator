import React from 'react';
import { type UserLevel } from '../types';
import { KNOWLEDGE_LEVELS } from '../constants';

interface LevelSelectorProps {
  topicTitle: string;
  onSelect: (level: UserLevel) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ topicTitle, onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h2 className="text-4xl font-bold mb-2">Starting your journey on: <span className="text-amber-400">{topicTitle}</span></h2>
      <p className="text-gray-300 text-xl mb-8">How well do you know this topic?</p>
      <div className="w-full max-w-md space-y-4">
        {KNOWLEDGE_LEVELS.map(({ label, value }) => (
          <button
            key={label}
            onClick={() => onSelect(value)}
            className="w-full text-left p-6 bg-gray-800 rounded-lg border-2 border-transparent hover:border-fuchsia-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          >
            <h3 className="text-lg font-semibold text-white">{label}</h3>
            <p className="text-gray-400">{value}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;