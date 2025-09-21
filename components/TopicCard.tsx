import React from 'react';
import { type LearningTopic } from '../types';

interface TopicCardProps {
  topic: LearningTopic;
  onClick: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onClick }) => {
  const { Icon, title, description } = topic;

  return (
    <button
      onClick={onClick}
      className="w-full h-full bg-gray-900/70 rounded-xl p-6 text-left hover:bg-gray-800/80 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-fuchsia-500 focus:ring-opacity-75 group border border-gray-800 hover:border-gray-700"
    >
      <div className="flex items-center mb-4">
        <div className="p-3 bg-gray-800 rounded-lg mr-4 group-hover:bg-fuchsia-600 transition-colors duration-300">
          <Icon className="w-8 h-8 text-fuchsia-400 group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-100">{title}</h3>
      </div>
      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>
    </button>
  );
};

export default TopicCard;