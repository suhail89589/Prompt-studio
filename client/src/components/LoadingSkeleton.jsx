import React, { useState, useEffect } from 'react';
import { Sparkles, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_MESSAGES = [
  'Understanding your prompt...',
  'Improving clarity and phrasing...',
  'Structuring context & persona definitions...',
  'Injecting professional constraints...',
  'Optimizing layout formatting...',
  'Finalizing enhancements...'
];

const LoadingSkeleton = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 py-6 px-4">
      {/* Messages Indicator */}
      <div className="flex flex-col items-center justify-center py-4 text-center">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl w-12 h-12 animate-pulse" />
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400">
            <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
        </div>
        
        <div className="h-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-semibold text-slate-200"
            >
              {LOADING_MESSAGES[msgIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Grid Comparison Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original Prompt Card Skeleton */}
        <div className="rounded-2xl border border-slate-900 bg-slate-950/40 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-4 w-28 bg-slate-800 rounded-lg animate-pulse" />
            <div className="h-3 w-16 bg-slate-900 rounded-lg animate-pulse" />
          </div>
          <div className="space-y-2.5 pt-2">
            <div className="h-3.5 w-full bg-slate-800/80 rounded-lg animate-pulse" />
            <div className="h-3.5 w-[92%] bg-slate-800/80 rounded-lg animate-pulse" />
            <div className="h-3.5 w-[85%] bg-slate-800/80 rounded-lg animate-pulse" />
            <div className="h-3.5 w-[70%] bg-slate-800/80 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Enhanced Prompt Card Skeleton */}
        <div className="rounded-2xl border border-indigo-950/40 bg-indigo-950/5 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-4 w-32 bg-slate-800 rounded-lg animate-pulse" />
            <div className="h-3 w-16 bg-slate-900 rounded-lg animate-pulse" />
          </div>
          <div className="space-y-2.5 pt-2">
            <div className="h-3.5 w-full bg-slate-800/80 rounded-lg animate-pulse" />
            <div className="h-3.5 w-[96%] bg-slate-800/80 rounded-lg animate-pulse" />
            <div className="h-3.5 w-[88%] bg-slate-800/80 rounded-lg animate-pulse" />
            <div className="h-3.5 w-[92%] bg-slate-800/80 rounded-lg animate-pulse" />
            <div className="h-3.5 w-[78%] bg-slate-800/80 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Analytics Card Skeleton */}
      <div className="rounded-2xl border border-slate-900 bg-slate-950/20 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-900 animate-pulse" />
            <div className="space-y-2">
              <div className="h-3 w-16 bg-slate-800 rounded-lg animate-pulse" />
              <div className="h-4.5 w-24 bg-slate-800 rounded-lg animate-pulse" />
            </div>
          </div>
          <div className="space-y-2.5">
            <div className="h-3.5 w-20 bg-slate-800 rounded-lg animate-pulse" />
            <div className="h-5 w-28 bg-slate-800 rounded-lg animate-pulse" />
          </div>
          <div className="space-y-2.5">
            <div className="h-3.5 w-24 bg-slate-800 rounded-lg animate-pulse" />
            <div className="h-5 w-32 bg-slate-800 rounded-lg animate-pulse" />
          </div>
          <div className="space-y-2.5">
            <div className="h-3.5 w-16 bg-slate-800 rounded-lg animate-pulse" />
            <div className="h-5 w-20 bg-slate-800 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
