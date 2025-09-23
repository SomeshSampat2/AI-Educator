import React from 'react';
import { type TopicContentData } from '../types';

interface CourseOutlineProps {
  topics: TopicContentData[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

const CourseOutline: React.FC<CourseOutlineProps> = ({ topics, currentIndex, onSelect }) => {
  return (
    <aside className="w-full bg-gray-950 p-4 md:p-6 flex-shrink-0 border-r border-gray-700 flex flex-col">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 md:mb-6">
        Learning Path
      </h2>

      <div className="overflow-y-auto flex-1">
        <ul className="space-y-3">
          {topics.map((topic, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            
            let stateClasses = 'border-gray-700 text-gray-400 hover:bg-gray-800/50 hover:border-gray-500';
            if (isCurrent) {
              stateClasses = 'border-emerald-500 text-white bg-emerald-500/10';
            } else if (isCompleted) {
              stateClasses = 'border-lime-600 text-slate-300 bg-lime-500/10 hover:bg-lime-500/20';
            }

            return (
              <li key={topic.title + index}>
                <button
                  onClick={() => onSelect(index)}
                  className={`w-full flex items-start text-left p-2 md:p-3 rounded-lg border-l-4 transition-all duration-300 text-sm md:text-base ${stateClasses}`}
                >
                  <div className="text-base md:text-lg font-bold mr-2 md:mr-4 flex-shrink-0">{index + 1}</div>
                  <span className="flex-1 font-semibold leading-tight">{topic.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default CourseOutline;