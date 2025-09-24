import React, { useState, useEffect } from 'react';
import { type TopicContentData } from '../types';
import FormattedContent from './FormattedContent';

interface TopicViewProps {
  content: TopicContentData | null;
  isLatestTopic: boolean;
  onFollowUpSelect: (suggestion: string) => void;
}

const TopicView: React.FC<TopicViewProps> = (props) => {
  const { content, isLatestTopic, onFollowUpSelect } = props;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [customQuery, setCustomQuery] = useState('');

  // Reset state when new content arrives
  useEffect(() => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [content]);

  // Cleanup speech synthesis on component unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  const handleToggleSpeech = () => {
    if (!content) return;
    if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    } else {
        const textToSpeak = `${content.title}. ${content.explanation}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
    }
  };

  const handleCustomQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customQuery.trim()) {
      onFollowUpSelect(customQuery.trim());
      setCustomQuery('');
    }
  };

  if (!content) {
    return (
        <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Loading topic...</p>
        </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-violet-400 leading-tight">{content.title}</h1>
        <button
            onClick={handleToggleSpeech}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors whitespace-nowrap"
            aria-label={isSpeaking ? 'Stop reading aloud' : 'Read explanation aloud'}
        >
            {isSpeaking ? 'Stop' : 'Read Aloud'}
        </button>
      </div>

      <FormattedContent
        content={content.explanation}
        className="prose prose-invert prose-xl max-w-none text-slate-200"
      />
      
      {isLatestTopic && (
        <div className="mt-8 md:mt-12 mb-8 border-t-2 border-gray-700 pt-6 md:pt-8 animate-fade-in">
            <h3 className="text-xl md:text-2xl font-bold text-emerald-400 mb-4">Where to next? 🤔</h3>
            <p className="text-gray-300 mb-4 text-sm md:text-base">Click a suggestion or ask your own question to continue!</p>
            <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
                {/* Always show "next chapter" hardcoded option */}
                <button
                    onClick={() => onFollowUpSelect("next chapter")}
                    className="px-3 md:px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-sm md:text-base font-semibold shadow-lg"
                >
                    📚 Next Chapter
                </button>
                {/* Show AI-generated suggestions */}
                {content.followUpSuggestions.map(suggestion => (
                    <button
                        key={suggestion}
                        onClick={() => onFollowUpSelect(suggestion)}
                        className="px-3 md:px-4 py-2 bg-gray-800 text-slate-200 rounded-full hover:bg-emerald-600 hover:text-white transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                    >
                        {suggestion}
                    </button>
                ))}
            </div>

            <form onSubmit={handleCustomQuerySubmit} className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <input
                    type="text"
                    value={customQuery}
                    onChange={(e) => setCustomQuery(e.target.value)}
                    placeholder="Ask a question or tell me what to learn..."
                    className="flex-1 p-3 md:p-4 bg-gray-800 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-sm md:text-base"
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-lg transition-colors text-sm md:text-base whitespace-nowrap">
                    Go!
                </button>
            </form>
        </div>
      )}
    </div>
  );
};

export default TopicView;