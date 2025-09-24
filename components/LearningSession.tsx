import React, { useState, useCallback } from 'react';
import { type LearningTopic, type UserLevel, type SessionState, type TopicContentData } from '../types';
import { generateTopic, generateFunFact } from '../services/geminiService';
import LevelSelector from './LevelSelector';
import TopicView from './TopicView';
import Loader from './Loader';
import CourseOutline from './CourseOutline';

interface LearningSessionProps {
  topic: LearningTopic;
  onExit: () => void;
}

const LearningSession: React.FC<LearningSessionProps> = ({ topic, onExit }) => {
  const [sessionState, setSessionState] = useState<SessionState>('selecting_level');
  const [userLevel, setUserLevel] = useState<UserLevel | null>(null);
  const [topicHistory, setTopicHistory] = useState<TopicContentData[]>([]);
  const [viewedTopicIndex, setViewedTopicIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loadingFact, setLoadingFact] = useState<string | null>(null);
  const [isCourseOutlineVisible, setIsCourseOutlineVisible] = useState(false);

  const currentTopicForView = topicHistory[viewedTopicIndex] || null;

  const loadTopic = useCallback(async (
    requestedTopicTitle: string,
    level: UserLevel,
    history: TopicContentData[],
    preFetchedFact: string | null = null
  ) => {
    setError(null);
    setLoadingFact(preFetchedFact); // Set fact immediately if available
    setSessionState('generating_topic');

    // If no pre-fetched fact (e.g., first topic or custom query), fetch one in parallel now.
    if (!preFetchedFact) {
      generateFunFact(requestedTopicTitle).then(setLoadingFact).catch(console.warn);
    }
    
    try {
      const historyTitles = history.map(t => t.title);
      const content = await generateTopic(topic, requestedTopicTitle, level, historyTitles);
      setTopicHistory(prev => {
        const newHistory = [...prev, content];
        setViewedTopicIndex(newHistory.length - 1);
        return newHistory;
      });
      setSessionState('learning');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
      setSessionState('error');
    }
  }, [topic]);

  const handleStartSession = (level: UserLevel) => {
    setUserLevel(level);
    loadTopic(topic.title, level, [], null);
  };
  
  const handleSelectTopic = (index: number) => {
    setViewedTopicIndex(index);
  }
  
  const handleFollowUpSelect = useCallback((suggestion: string) => {
      if (!userLevel) return;
      
      const latestTopicData = topicHistory[topicHistory.length - 1];
      let preFetchedFact: string | null = null;
      
      // Use the pre-fetched fact from the latest chapter if it exists.
      if (latestTopicData?.funFactForNextTopic?.fact) {
          preFetchedFact = latestTopicData.funFactForNextTopic.fact;
      }

      loadTopic(suggestion, userLevel, topicHistory, preFetchedFact);
  }, [userLevel, topicHistory, loadTopic]);

  const restartSession = () => {
    setSessionState('selecting_level');
    setUserLevel(null);
    setTopicHistory([]);
    setViewedTopicIndex(0);
    setError(null);
    setLoadingFact(null);
  };

  const toggleCourseOutline = () => {
    setIsCourseOutlineVisible(!isCourseOutlineVisible);
  };
  
  const renderContent = () => {
    if (sessionState === 'error' || sessionState === 'selecting_level' || sessionState === 'generating_topic') {
        return (
            <div className="flex-1 flex items-center justify-center p-4">
                 {sessionState === 'error' && (
                     <div className="text-center p-8 flex flex-col items-center justify-center h-full bg-red-900/30 rounded-lg max-w-lg border border-red-500">
                        <h2 className="text-3xl font-bold text-red-400 mb-4">Oops! Something went wrong.</h2>
                        <p className="text-slate-300 mb-6">{error}</p>
                        <button onClick={restartSession} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">Start Over</button>
                    </div>
                 )}
                 {sessionState === 'generating_topic' && <Loader message="Crafting your next chapter..." funFact={loadingFact} />}
                 {sessionState === 'selecting_level' && <LevelSelector onSelect={handleStartSession} topicTitle={topic.title} />}
            </div>
        )
    }

    return (
        <div className="flex flex-1 overflow-hidden relative">
            {/* Mobile overlay for course outline */}
            {isCourseOutlineVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" onClick={toggleCourseOutline} />
            )}

            {/* Course Outline - responsive positioning */}
            <div className={`
                ${isCourseOutlineVisible ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
                fixed md:relative
                top-0 left-0
                h-full
                w-80
                bg-gray-950
                border-r border-gray-700
                flex flex-col
                z-50 md:z-auto
                transition-transform duration-300 ease-in-out
            `}>
                <CourseOutline
                    topics={topicHistory}
                    currentIndex={viewedTopicIndex}
                    onSelect={(index) => {
                        handleSelectTopic(index);
                        // Close mobile overlay after selection
                        if (window.innerWidth < 768) {
                            setIsCourseOutlineVisible(false);
                        }
                    }}
                />
            </div>

            {/* Main content - responsive width */}
            <div className={`
                flex-1
                p-4 md:p-8
                overflow-y-auto
                transition-all duration-300
                ${isCourseOutlineVisible ? 'md:ml-0' : 'ml-0'}
            `}>
                 {sessionState === 'learning' ? (
                    <TopicView
                        content={currentTopicForView}
                        isLatestTopic={viewedTopicIndex === topicHistory.length - 1}
                        onFollowUpSelect={handleFollowUpSelect}
                    />
                 ) : (
                    <Loader message="Thinking..." />
                 )}
            </div>
        </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-black text-slate-100">
      <header className="w-full bg-gray-900 p-4 flex-shrink-0 border-b border-gray-700 flex items-center justify-between">
         <div className="flex items-center gap-4">
           <button
             onClick={toggleCourseOutline}
             className="md:hidden text-gray-400 hover:text-white transition-colors text-sm font-semibold"
             aria-label="Toggle course outline"
           >
             ☰
           </button>
           <h2 className="text-lg md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
             {topic.title}
           </h2>
         </div>
         <button
           onClick={onExit}
           className="text-gray-400 hover:text-white transition-colors text-sm font-semibold"
         >
           &larr; Home
         </button>
      </header>
      <main className="flex-1 flex flex-col overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default LearningSession;