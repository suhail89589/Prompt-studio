import React from 'react';
import { Sparkles, MessageSquare, Code, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SUGGESTIONS = [
  {
    title: 'LinkedIn Post Hook',
    text: 'Optimize a post explaining my transition from marketing to AI engineering',
    icon: MessageSquare,
    color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/10'
  },
  {
    title: 'Resume Developer Bullet',
    text: 'Rewrite "I built a web app using React and Node that processed data"',
    icon: FileText,
    color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/10'
  },
  {
    title: 'Coding Prompt Expert',
    text: 'Create a prompt to generate unit tests for a typescript caching function',
    icon: Code,
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/10'
  }
];

const EmptyState = ({ onSelectSuggestion }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 max-w-2xl mx-auto text-center">
      {/* SVG Illustration */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-teal-500/10 rounded-full blur-3xl w-48 h-48 -translate-x-12 -translate-y-8 animate-pulse-glow" />
        <svg 
          width="160" 
          height="160" 
          viewBox="0 0 160 160" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 text-slate-800"
        >
          {/* Main frame */}
          <rect x="25" y="25" width="110" height="110" rx="24" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
          <rect x="40" y="40" width="80" height="80" rx="16" fill="rgba(15, 23, 42, 0.4)" stroke="currentColor" strokeWidth="2" />
          {/* Sparkle symbols */}
          <path d="M80 55L82 63L90 65L82 67L80 75L78 67L70 65L78 63L80 55Z" fill="url(#paint0_linear)" />
          <path d="M58 85L59 89L63 90L59 91L58 95L57 91L53 90L57 89L58 85Z" fill="url(#paint1_linear)" />
          <path d="M102 85L103 89L107 90L103 91L102 95L101 91L97 90L101 89L102 85Z" fill="url(#paint1_linear)" />
          {/* Lines */}
          <line x1="55" y1="102" x2="105" y2="102" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="65" y1="110" x2="95" y2="110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          
          <defs>
            <linearGradient id="paint0_linear" x1="70" y1="55" x2="90" y2="75" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366f1" />
              <stop offset="1" stopColor="#14b8a6" />
            </linearGradient>
            <linearGradient id="paint1_linear" x1="53" y1="85" x2="63" y2="95" gradientUnits="userSpaceOnUse">
              <stop stopColor="#14b8a6" />
              <stop offset="1" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <h2 className="text-xl font-bold text-white mb-2">Start by writing or pasting a prompt</h2>
      <p className="text-sm text-slate-400 max-w-md mb-10">
        Enter a basic description of what you want your AI to do. Prompt Studio will refine it with structure, roles, and constraints.
      </p>

      {/* Suggestion list */}
      <div className="w-full space-y-3">
        <div className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider pl-1 mb-2">
          Or try a quick suggestion
        </div>
        {SUGGESTIONS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => onSelectSuggestion(item.text)}
              className="flex items-start text-left w-full p-3.5 rounded-xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/85 hover:border-indigo-500/20 transition-all cursor-pointer group"
            >
              <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} border mr-3.5 flex-shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0 pr-4">
                <h4 className="text-xs font-semibold text-slate-200 mb-0.5">{item.title}</h4>
                <p className="text-xs text-slate-400 truncate">{item.text}</p>
              </div>
              <div className="flex items-center self-center justify-center w-7 h-7 rounded-lg bg-slate-800/50 text-slate-500 group-hover:text-indigo-400 group-hover:bg-indigo-950/20 transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EmptyState;
