import React, { useState } from 'react';
import TopicCard from './TopicCard';
import { TOPIC_CATEGORIES } from '../constants';
import { type LearningTopic } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface HomePageProps {
  onTopicSelect: (topic: LearningTopic) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onTopicSelect }) => {
  const [customTopic, setCustomTopic] = useState('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTopic.trim()) {
      const newTopic: LearningTopic = {
        id: `custom-${Date.now()}`,
        title: customTopic.trim(),
        description: `A custom learning path about your chosen topic.`,
        Icon: SparklesIcon,
      };
      onTopicSelect(newTopic);
    }
  };


  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <header className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 leading-relaxed py-4">
          Agent-E
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
          Your intelligent AI companion for learning. Start with your own topic or pick a suggestion below.
        </p>
      </header>
      <main>
        <div className="mb-16">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-100 mb-3">Start your own journey</h2>
                <p className="text-sm text-slate-400 mb-6 max-w-xl mx-auto">Curious about something else? Type any topic below to begin a brand new learning path.</p>
            </div>
            <form onSubmit={handleCustomSubmit} className="flex flex-col items-center gap-4 max-w-2xl mx-auto">
                <input
                    type="text"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    placeholder="e.g., How do Neural Networks work?, The History of the Roman Empire, What is Quantum Entanglement?..."
                    className="w-full p-4 bg-gray-900 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-lg"
                />
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg w-full md:w-auto">
                    Start Learning
                </button>
            </form>
        </div>

        <div className="pt-12 border-t border-gray-800">
            <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">Our Suggestions</h2>
            <div className="space-y-12">
                {TOPIC_CATEGORIES.map((category) => (
                    <div key={category.title}>
                        <h3 className="text-2xl font-bold text-slate-200 mb-4 px-4 md:px-0">{category.title}</h3>
                        <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4">
                            {category.topics.map((topic) => (
                                <div key={topic.id} className="flex-shrink-0 w-80 md:w-96">
                                    <TopicCard topic={topic} onClick={() => onTopicSelect(topic)} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </main>
      <footer className="text-center mt-16 text-gray-500">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default HomePage;