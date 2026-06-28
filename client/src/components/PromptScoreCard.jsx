import React, { useEffect, useState } from 'react';

const PromptScoreCard = ({ beforeScore, afterScore }) => {
  const [animatedAfter, setAnimatedAfter] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedAfter(afterScore);
    }, 200);
    return () => clearTimeout(timer);
  }, [afterScore]);

  // SVG Gauge calculations
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffsetBefore = circumference - (beforeScore / 100) * circumference;
  const strokeDashoffsetAfter = circumference - (animatedAfter / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900/30 border border-slate-900/50">
      <h3 className="text-xs font-semibold text-slate-400 mb-4 tracking-wider uppercase">Optimization Score</h3>
      
      <div className="relative flex items-center justify-center w-28 h-28">
        {/* SVG Circle Gauge */}
        <svg className="w-full h-full transform -rotate-90">
          {/* Track Circle */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            className="stroke-slate-800"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Before Score indicator (dashed red/amber) */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            className="stroke-amber-500/30"
            strokeWidth="4"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffsetBefore}
            strokeLinecap="round"
            fill="transparent"
          />
          {/* After Score indicator (solid emerald green) */}
          <circle
            cx="56"
            cy="56"
            r={radius}
            className="stroke-teal-400 transition-all duration-1000 ease-out"
            strokeWidth="8"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffsetAfter}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        
        {/* Core Percentage Texts */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-black text-white leading-none">
            {afterScore}
            <span className="text-[10px] text-slate-500 font-normal">/100</span>
          </span>
          <span className="text-[9px] text-emerald-400 font-medium mt-1">
            +{afterScore - beforeScore} points
          </span>
        </div>
      </div>

      <div className="flex gap-4 mt-4 text-[10px] font-semibold">
        <div className="flex items-center gap-1 text-slate-500">
          <span className="w-2.5 h-2.5 rounded bg-slate-800 border border-slate-700/80 inline-block" />
          Before: {beforeScore}
        </div>
        <div className="flex items-center gap-1 text-teal-400">
          <span className="w-2.5 h-2.5 rounded bg-teal-400 inline-block" />
          After: {afterScore}
        </div>
      </div>
    </div>
  );
};

export default PromptScoreCard;
