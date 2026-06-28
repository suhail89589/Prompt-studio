import React, { useState } from 'react';
import { 
  Columns, 
  GitCompare, 
  Copy, 
  Download, 
  RefreshCw, 
  Edit3, 
  Check, 
  CheckCircle,
  FileText
} from 'lucide-react';
import { diffWords } from '../utils/diffHelper';

const PromptOutput = ({ originalPrompt, enhancedPrompt, onRegenerate, onEdit }) => {
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'diff'
  const [copied, setCopied] = useState(false);

  const diffTokens = diffWords(originalPrompt, enhancedPrompt);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(enhancedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([enhancedPrompt], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "enhanced-prompt.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Helper to render colored tokens for Split View (Only highlight insertions)
  const renderEnhancedSplit = () => {
    return (
      <div className="whitespace-pre-wrap text-sm leading-relaxed font-sans text-slate-300">
        {diffTokens.map((token, idx) => {
          if (token.type === 'added') {
            return (
              <span key={idx} className="bg-emerald-950/50 text-emerald-300 px-1 py-0.5 rounded border border-emerald-500/15 font-semibold">
                {token.value}
              </span>
            );
          } else if (token.type === 'removed') {
            // In Split View, we do not show deletions in the "after" text
            return null;
          }
          return <span key={idx}>{token.value}</span>;
        })}
      </div>
    );
  };

  // Helper to render Unified Diff view (Highlight both insertions and deletions inline)
  const renderUnifiedDiff = () => {
    return (
      <div className="whitespace-pre-wrap text-sm leading-relaxed font-sans text-slate-300">
        {diffTokens.map((token, idx) => {
          if (token.type === 'added') {
            return (
              <span key={idx} className="bg-emerald-950/70 text-emerald-300 px-1 py-0.5 rounded border border-emerald-500/20 font-semibold inline-block my-0.5">
                {token.value}
              </span>
            );
          } else if (token.type === 'removed') {
            return (
              <span key={idx} className="bg-rose-950/70 text-rose-300 px-1 py-0.5 rounded border border-rose-500/20 line-through decoration-rose-500/50 inline-block my-0.5">
                {token.value}
              </span>
            );
          }
          return <span key={idx}>{token.value}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* Selector toggle */}
      <div className="flex items-center justify-between border-b border-slate-900 pb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <h3 className="text-sm font-bold text-white tracking-wide">Optimized Output</h3>
        </div>

        <div className="flex items-center p-0.5 rounded-lg bg-slate-950 border border-slate-900">
          <button
            onClick={() => setViewMode('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
              viewMode === 'split' 
                ? 'bg-slate-900 text-white border border-slate-800' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            Split View
          </button>
          <button
            onClick={() => setViewMode('diff')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
              viewMode === 'diff' 
                ? 'bg-slate-900 text-white border border-slate-800' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            Unified Diff
          </button>
        </div>
      </div>

      {/* Main output screen based on view selection */}
      {viewMode === 'split' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Original Prompt (Left Card) */}
          <div className="rounded-2xl border border-slate-900 bg-slate-950/20 p-5 flex flex-col min-h-[300px]">
            <div className="flex items-center justify-between border-b border-slate-900/50 pb-2.5 mb-3.5">
              <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">Original Prompt</span>
              <span className="text-[10px] text-slate-600 font-mono">Input version</span>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[360px] text-sm text-slate-400 leading-relaxed whitespace-pre-wrap font-sans">
              {originalPrompt}
            </div>
          </div>

          {/* Enhanced Prompt (Right Card) */}
          <div className="rounded-2xl border border-indigo-950/25 bg-slate-950/50 p-5 flex flex-col min-h-[300px] relative shadow-lg shadow-black/10">
            <div className="flex items-center justify-between border-b border-indigo-950/20 pb-2.5 mb-3.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-teal-400 tracking-wider uppercase">Enhanced Prompt</span>
                <span className="text-[9px] text-emerald-400 font-mono px-1 py-0.2 rounded bg-emerald-500/10">PRO</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Subtle highlighting of insertions enabled</span>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[360px] pr-1">
              {renderEnhancedSplit()}
            </div>
          </div>
        </div>
      ) : (
        /* Unified Diff View */
        <div className="rounded-2xl border border-slate-900 bg-slate-950/30 p-5 min-h-[300px] flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-900/50 pb-2.5 mb-3.5">
            <span className="text-[10px] font-bold text-indigo-400 tracking-wider uppercase">Unified Diff View</span>
            <div className="flex gap-3 text-[9px] font-semibold">
              <span className="flex items-center gap-1 text-rose-400">
                <span className="w-1.5 h-1.5 rounded bg-rose-500 inline-block" /> Deleted
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded bg-emerald-500 inline-block" /> Added
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[360px] pr-1">
            {renderUnifiedDiff()}
          </div>
        </div>
      )}

      {/* Primary Actions Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 bg-slate-950/20 p-3 rounded-xl border border-slate-900/40">
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900/40 hover:bg-slate-900 border border-slate-800/80 rounded-xl transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-500" />
            Edit Prompt
          </button>
          <button
            onClick={onRegenerate}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-teal-400 bg-slate-900/40 hover:bg-teal-950/15 border border-slate-800/80 hover:border-teal-500/20 rounded-xl transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            Regenerate
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900/40 hover:bg-slate-900 border border-slate-800/80 rounded-xl transition-all cursor-pointer"
            title="Download as text file"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Download .txt
          </button>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all cursor-pointer shadow-lg ${
              copied 
                ? 'bg-emerald-600 text-white font-black' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/10'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Prompt
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptOutput;
