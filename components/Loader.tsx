
import React from 'react';

interface LoaderProps {
  message: string;
  funFact?: string | null;
}

const Loader: React.FC<LoaderProps> = ({ message, funFact }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400 mb-6"></div>
      <h2 className="text-xl font-semibold text-slate-200">{message}</h2>
      <p className="text-slate-400">Please wait a moment.</p>

      {funFact && (
        <div className="mt-8 max-w-md p-4 bg-gray-900 border border-cyan-500/50 rounded-lg animate-fade-in transition-opacity duration-500">
            <h3 className="text-lg font-bold text-cyan-400 mb-2">💡 Fun Fact!</h3>
            <p className="text-slate-300 leading-relaxed">{funFact}</p>
        </div>
      )}
    </div>
  );
};

export default Loader;