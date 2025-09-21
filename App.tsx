import React, { useState } from 'react';
import HomePage from './components/HomePage';
import LearningSession from './components/LearningSession';
import { type LearningTopic } from './types';

const App: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<LearningTopic | null>(null);

  const handleTopicSelect = (topic: LearningTopic) => {
    setSelectedTopic(topic);
  };

  const handleExitSession = () => {
    setSelectedTopic(null);
  };

  return (
    <div className="min-h-screen bg-black font-sans">
      {selectedTopic ? (
        <LearningSession topic={selectedTopic} onExit={handleExitSession} />
      ) : (
        <HomePage onTopicSelect={handleTopicSelect} />
      )}
    </div>
  );
};

export default App;