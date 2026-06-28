import React from 'react';
import { X, Sliders, Check, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsModal = ({ isOpen, onClose, settings, onChangeSettings }) => {
  if (!isOpen) return null;

  const models = [
    { id: 'gemini-flash', name: 'Gemini 3.5 Flash', desc: 'Fast, energy-efficient optimization' },
    { id: 'gemini-pro', name: 'Gemini 3.5 Pro', desc: 'Complex instruction enhancement' },
    { id: 'claude-sonnet', name: 'Claude 3.5 Sonnet', desc: 'Highly creative and formatting-focused' },
    { id: 'gpt-4o', name: 'GPT-4o', desc: 'Balanced reasoning and task constraints' },
  ];

  const tones = ['Professional', 'Creative', 'Technical', 'Conversational', 'Concise'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-md rounded-2xl bg-[#0f1115] border border-slate-800 shadow-2xl p-6 overflow-hidden z-10"
      >
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
          <div className="flex items-center gap-2 text-indigo-400">
            <Sliders className="w-4.5 h-4.5" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Enhancer Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800/60 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Target Model Select */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Optimization Model</label>
            <div className="space-y-1.5">
              {models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => onChangeSettings({ ...settings, model: model.id })}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex justify-between items-center cursor-pointer ${
                    settings.model === model.id
                      ? 'bg-indigo-950/20 border-indigo-500/30 text-indigo-200'
                      : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:bg-slate-900/40 hover:text-slate-300'
                  }`}
                >
                  <div>
                    <h4 className="font-semibold text-slate-200">{model.name}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">{model.desc}</p>
                  </div>
                  {settings.model === model.id && (
                    <div className="p-1 rounded-full bg-indigo-500/20 text-indigo-400">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tone Select */}
          <div className="space-y-2 pt-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Default Enhancing Tone</label>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  onClick={() => onChangeSettings({ ...settings, tone: t })}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                    settings.tone === t
                      ? 'bg-teal-950/20 border-teal-500/30 text-teal-300'
                      : 'bg-slate-950/40 border-slate-900 text-slate-500 hover:text-slate-300 hover:bg-slate-900/40'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Extra Toggle Context */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-800/50 mt-4">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <HelpCircle className="w-3 h-3" />
              <span>Simulate streaming delays</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={settings.streamingDelay} 
                onChange={(e) => onChangeSettings({ ...settings, streamingDelay: e.target.checked })}
                className="sr-only peer" 
              />
              <div className="w-8 h-4.5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-none after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-indigo-600 peer-checked:after:bg-white" />
            </label>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsModal;
