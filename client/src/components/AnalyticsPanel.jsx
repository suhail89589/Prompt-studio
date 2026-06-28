import React from 'react';
import PromptScoreCard from './PromptScoreCard';
import { 
  Coins, 
  Type, 
  CheckCircle2, 
  Sparkles,
  TrendingUp,
  FileText
} from 'lucide-react';

const AnalyticsPanel = ({ beforeScore, afterScore, beforeTokens, afterTokens, details, badges, qualityBefore, qualityAfter }) => {
  const getQualityBadgeColor = (quality) => {
    switch (quality) {
      case 'Excellent':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25';
      case 'Good':
        return 'bg-teal-500/10 text-teal-400 border-teal-500/25';
      case 'Fair':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/25';
      case 'Poor':
      default:
        return 'bg-rose-500/10 text-rose-400 border-rose-500/25';
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2 px-1">
        <TrendingUp className="w-4 h-4 text-indigo-400" />
        <h3 className="text-sm font-bold text-white tracking-wide">Enhancement Analytics</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Circle Score Column */}
        <div className="md:col-span-1">
          <PromptScoreCard beforeScore={beforeScore} afterScore={afterScore} />
        </div>

        {/* Token Usage Card */}
        <div className="p-5 rounded-2xl bg-slate-900/35 border border-slate-900/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Token Usage</span>
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Coins className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="text-center">
              <div className="text-2xl font-black text-slate-400">{beforeTokens}</div>
              <span className="text-[10px] text-slate-500 font-semibold uppercase">Original</span>
            </div>
            <div className="flex flex-col items-center justify-center text-slate-600">
              <span className="text-xs">→</span>
              <span className="text-[9px] font-bold text-indigo-400">+{Math.round(((afterTokens - beforeTokens) / beforeTokens) * 100)}%</span>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-teal-400">{afterTokens}</div>
              <span className="text-[10px] text-teal-400 font-semibold uppercase">Enhanced</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 mt-2 text-center">
            Estimated using standard LLM token density calculations.
          </p>
        </div>

        {/* Prompt Length Details Card */}
        <div className="p-5 rounded-2xl bg-slate-900/35 border border-slate-900/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Prompt Density</span>
            <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
              <Type className="w-4 h-4" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 py-1 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 font-semibold uppercase block">Characters</span>
              <div className="text-slate-300 font-medium">{details.beforeChar} <span className="text-[10px] text-slate-500">→</span> <span className="text-teal-400 font-bold">{details.afterChar}</span></div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 font-semibold uppercase block">Words</span>
              <div className="text-slate-300 font-medium">{details.beforeWords} <span className="text-[10px] text-slate-500">→</span> <span className="text-teal-400 font-bold">{details.afterWords}</span></div>
            </div>
          </div>

          <div className="border-t border-slate-800/40 pt-2 mt-2 flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-semibold uppercase">Quality Rating</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getQualityBadgeColor(qualityAfter)}`}>
              {qualityAfter}
            </span>
          </div>
        </div>

        {/* Improvements Badge Card */}
        <div className="p-5 rounded-2xl bg-slate-900/35 border border-slate-900/80 flex flex-col justify-between md:col-span-3 lg:col-span-1">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Improvements</span>
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {badges.map((badge, idx) => (
                <span 
                  key={idx} 
                  className="px-2.5 py-1 text-[10px] font-medium text-teal-300 bg-teal-950/20 border border-teal-500/10 rounded-full flex items-center gap-1 shadow-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-slate-500 mt-3 pt-2 border-t border-slate-800/40 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-indigo-400 animate-pulse" />
            Optimized for Instruction Follow-through.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
