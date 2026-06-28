import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Search, 
  Trash2, 
  Settings, 
  HelpCircle,
  LogOut,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
  User,
  Sliders,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoImage from '../assets/Logo.jpg';

const Sidebar = ({ 
  history, 
  activeId, 
  onSelectPrompt, 
  onNewPrompt, 
  onDeletePrompt, 
  onClearAll, 
  isOpen, 
  setIsOpen
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistory = history.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.originalPrompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isOpen ? 280 : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col h-screen bg-[#0f1115] border-r border-slate-800/80 overflow-hidden select-none lg:static ${
          isOpen ? 'w-[280px]' : 'w-0 border-r-0'
        }`}
      >
        {/* Brand Logo Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/50">
          <div className="flex items-center gap-0 hover:gap-2.5 group/logo cursor-pointer transition-all duration-350">
            <img 
              src={LogoImage} 
              alt="Prompt Studio Logo" 
              className="w-8 h-8 rounded-lg object-cover shadow-md border border-slate-800/80 transition-transform duration-300 group-hover/logo:scale-105"
            />
            <div className="w-0 overflow-hidden opacity-0 group-hover/logo:w-[100px] group-hover/logo:opacity-100 transition-all duration-350 ease-out">
              <span className="font-bold text-white tracking-wide text-xs font-sans whitespace-nowrap">Prompt Studio</span>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 lg:hidden"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Action: New Session */}
        <div className="px-4 py-4.5">
          <button
            onClick={() => {
              onNewPrompt();
              if (window.innerWidth < 1024) setIsOpen(false);
            }}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-medium text-sm transition-all shadow-md shadow-indigo-600/15 border border-indigo-500/20 group cursor-pointer"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
            New Prompt
          </button>
        </div>

        {/* Search */}
        <div className="px-4 mb-2">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900/60 hover:bg-slate-900/80 focus:bg-slate-950 border border-slate-800/80 focus:border-indigo-500/50 text-xs text-slate-300 placeholder:text-slate-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto px-2 space-y-1 py-2">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 tracking-wider uppercase">
            Prompt History ({filteredHistory.length})
          </div>

          {filteredHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center px-4">
              <FolderOpen className="w-8 h-8 text-slate-700 mb-2" />
              <p className="text-xs text-slate-500">No prompts found</p>
            </div>
          ) : (
            <div className="space-y-0.5">
              <AnimatePresence initial={false}>
                {filteredHistory.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="group relative flex items-center justify-between rounded-xl transition-all"
                    >
                      <button
                        onClick={() => {
                          onSelectPrompt(item.id);
                          if (window.innerWidth < 1024) setIsOpen(false);
                        }}
                        className={`flex-1 text-left px-3.5 py-2.5 rounded-xl text-xs font-medium truncate pr-10 cursor-pointer ${
                          isActive 
                            ? 'bg-indigo-950/40 text-indigo-200 border border-indigo-500/20' 
                            : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 border border-transparent'
                        }`}
                      >
                        {item.title}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeletePrompt(item.id);
                        }}
                        className="absolute right-2 p-1.5 rounded-md text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        title="Delete Prompt"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="mt-auto border-t border-slate-800/50 bg-[#0c0d10] p-3 space-y-1.5">
          {history.length > 0 && (
            <button
              onClick={onClearAll}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-950/10 rounded-lg transition-all cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-slate-500 hover:text-rose-400" />
              Clear All Sessions
            </button>
          )}

          <div className="flex items-center gap-2.5 w-full px-3 py-2 text-[10px] font-bold text-slate-500 bg-slate-950/20 border border-slate-900/50 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            Active Model: Ollama / Llama 3
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 px-3 py-2.5 mt-2 rounded-xl bg-slate-950/40 border border-slate-900/60">
            <div className="relative flex items-center justify-center w-8.5 h-8.5 rounded-full bg-slate-800 border border-slate-700/80 overflow-hidden text-slate-300">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate leading-none">Creative Creator</p>
              <span className="text-[10px] text-slate-500 truncate mt-0.5 block">creator@promptstudio.ai</span>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
