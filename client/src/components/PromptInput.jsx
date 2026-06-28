import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Trash2, 
  Clipboard, 
  ArrowRight,
  Calculator,
  Smile
} from 'lucide-react';
import { estimateTokens } from '../utils/diffHelper';

const PromptInput = ({ value, onChange, onEnhance, isLoading, placeholder }) => {
  const charCount = value.length;
  const tokenCount = estimateTokens(value);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onChange(value + (value ? '\n' : '') + text);
      }
    } catch (err) {
      console.error('Failed to read clipboard', err);
    }
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="w-full rounded-2xl bg-slate-900/40 border border-slate-800/80 p-4.5 shadow-xl shadow-black/20 focus-within:border-indigo-500/30 transition-all flex flex-col gap-4">
      {/* Top action/info row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block animate-pulse" />
          <span className="text-xs font-semibold text-slate-400">Input Sandbox</span>
        </div>

        <div className="flex items-center gap-2">
          {value && (
            <button
              onClick={handleClear}
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800/60 transition-all cursor-pointer"
              title="Clear Prompt"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handlePaste}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all cursor-pointer border border-slate-800/50"
            title="Paste from Clipboard"
          >
            <Clipboard className="w-3.5 h-3.5" />
            Paste
          </button>
        </div>
      </div>

      {/* Main Textarea */}
      <div className="relative">
        <textarea
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Describe what you want AI to do..."}
          className="w-full p-1 bg-transparent border-0 text-slate-200 placeholder:text-slate-600 text-sm focus:outline-none focus:ring-0 resize-none min-h-[120px] leading-relaxed"
          disabled={isLoading}
        />
      </div>

      {/* Footer bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/40">
        {/* Count indicators */}
        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 tracking-wider">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">{charCount}</span>
            <span>CHARACTERS</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
          <div className="flex items-center gap-1.5" title="Estimated GPT Tokens">
            <Calculator className="w-3 h-3 text-slate-500" />
            <span className="text-indigo-400">{tokenCount}</span>
            <span>EST. TOKENS</span>
          </div>
        </div>

        {/* Enhance Button */}
        <button
          onClick={onEnhance}
          disabled={isLoading || !value.trim()}
          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all cursor-pointer ${
            isLoading || !value.trim()
              ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed border border-transparent'
              : 'bg-white hover:bg-slate-100 text-slate-950 font-black shadow-lg shadow-white/5 active:scale-98 hover:shadow-indigo-500/10'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              Enhancing...
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              Enhance Prompt
              <ArrowRight className="w-3.5 h-3.5 text-slate-900 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PromptInput;
