import React from 'react';

export default function LoadingSkeleton({ type = 'card', count = 1 }) {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="bg-[#0d1118]/70 border border-slate-900 p-5 space-y-4 animate-pulse">
            <div className="bg-slate-800/80 h-32 w-full"></div>
            <div className="h-4 bg-slate-800/80 w-3/4"></div>
            <div className="h-3 bg-slate-800/80 w-1/2"></div>
            <div className="flex space-x-2">
              <div className="h-5 bg-slate-800/80 w-12"></div>
              <div className="h-5 bg-slate-800/80 w-12"></div>
            </div>
          </div>
        );
      case 'skill':
        return (
          <div className="bg-[#0d1118]/70 border border-slate-900 p-4 flex flex-col items-center justify-center animate-pulse space-y-3 h-28">
            <div className="w-8 h-8 rounded-full bg-slate-800/80"></div>
            <div className="h-2 bg-slate-800/80 w-3/4"></div>
          </div>
        );
      case 'timeline':
        return (
          <div className="bg-[#0d1118]/70 border border-slate-900 p-5 animate-pulse space-y-3">
            <div className="h-4 bg-slate-800/80 w-1/4"></div>
            <div className="h-3 bg-slate-800/80 w-1/3"></div>
            <div className="h-3 bg-slate-800/80 w-full"></div>
          </div>
        );
      case 'text':
      default:
        return (
          <div className="space-y-2 animate-pulse">
            <div className="h-4 bg-slate-800/80 w-full"></div>
            <div className="h-4 bg-slate-800/80 w-5/6"></div>
            <div className="h-4 bg-slate-800/80 w-2/3"></div>
          </div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <React.Fragment key={index}>
          {renderSkeleton()}
        </React.Fragment>
      ))}
    </>
  );
}
