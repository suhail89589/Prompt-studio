import React from 'react';
import { Menu, Sparkles, Sliders, LayoutGrid } from 'lucide-react';
import LogoImage from '../assets/Logo.jpg';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, activeTitle }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-[#0b0c10]/80 backdrop-blur-md border-b border-slate-900">
      <div className="flex items-center gap-3">
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
            title="Open Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="flex items-center gap-2 lg:hidden">
          <img 
            src={LogoImage} 
            alt="Prompt Studio Logo" 
            className="w-6 h-6 rounded object-cover border border-slate-800"
          />
          <span className="font-bold text-white text-xs tracking-wider">Prompt Studio</span>
        </div>

        {activeTitle && (
          <span className="hidden lg:inline-block text-xs font-medium text-slate-400 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-800/80">
            Current Session: <span className="text-indigo-400">{activeTitle}</span>
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-teal-400 bg-teal-950/20 border border-teal-500/10">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          Local Ollama Active
        </div>
      </div>
    </header>
  );
};

export default Navbar;
