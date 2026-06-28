import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import PromptInput from './components/PromptInput';
import EmptyState from './components/EmptyState';
import LoadingSkeleton from './components/LoadingSkeleton';
import PromptOutput from './components/PromptOutput';
import AnalyticsPanel from './components/AnalyticsPanel';
import { enhancePromptLocal } from './utils/mockEnhancer';
import { Sparkles, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoImage from './assets/Logo.jpg';

const LOCAL_STORAGE_KEY = 'prompt_studio_history_v1';

const App = () => {
  // Application State
  const [history, setHistory] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedHistory) {
        const parsed = JSON.parse(storedHistory);
        setHistory(parsed);
        if (parsed.length > 0) {
          setActiveId(parsed[0].id);
          setInputText(parsed[0].originalPrompt);
        }
      }
    } catch (err) {
      console.error('Error parsing localStorage:', err);
    }
  }, []);

  // Find active session
  const activeSession = history.find(item => item.id === activeId);

  // Sync input text when selecting a history item
  useEffect(() => {
    if (activeSession) {
      setInputText(activeSession.originalPrompt);
    } else {
      setInputText('');
    }
  }, [activeId, history]);

  // Handle Select Conversation
  const handleSelectPrompt = (id) => {
    setActiveId(id);
  };

  // Handle New Prompt / Clean Canvas
  const handleNewPrompt = () => {
    setActiveId(null);
    setInputText('');
  };

  // Handle Delete Single History Item
  const handleDeletePrompt = (id) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    if (activeId === id) {
      if (updated.length > 0) {
        setActiveId(updated[0].id);
      } else {
        handleNewPrompt();
      }
    }
  };

  // Handle Clear All
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all optimization sessions?')) {
      setHistory([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      handleNewPrompt();
    }
  };

  // Handle Suggestion click
  const handleSelectSuggestion = (text) => {
    setInputText(text);
  };

  // Handle Prompt Enhancement Action
  const handleEnhance = () => {
    if (!inputText.trim()) return;

    setIsLoading(true);

    const runEnhance = () => {
      const result = enhancePromptLocal(inputText);
      
      // Build title from first few words of input
      const cleanTitle = inputText.trim()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .slice(0, 4)
        .join(' ');
      const title = cleanTitle ? cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1) : 'Enhanced Prompt';

      const newSession = {
        id: Date.now().toString(),
        title,
        originalPrompt: inputText,
        enhancedPrompt: result.enhancedText,
        beforeScore: result.beforeScore,
        afterScore: result.afterScore,
        beforeTokens: result.beforeTokens,
        afterTokens: result.afterTokens,
        badges: result.badges,
        qualityBefore: result.qualityBefore,
        qualityAfter: result.qualityAfter,
        details: result.details,
        date: new Date().toLocaleDateString()
      };

      // Add to state and save
      const updatedHistory = [newSession, ...history];
      setHistory(updatedHistory);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
      setActiveId(newSession.id);
      setIsLoading(false);
    };

    // Simulate local Ollama model delay for luxury feel
    setTimeout(runEnhance, 2000);
  };

  // Handle Edit Action
  const handleEdit = () => {
    if (activeSession) {
      setInputText(activeSession.originalPrompt);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0b0c10] text-slate-100">
      
      {/* Sidebar Panel */}
      <Sidebar
        history={history}
        activeId={activeId}
        onSelectPrompt={handleSelectPrompt}
        onNewPrompt={handleNewPrompt}
        onDeletePrompt={handleDeletePrompt}
        onClearAll={handleClearAll}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 h-full bg-[#0c0e12] relative overflow-hidden">
        
        {/* Decorative Top Lights */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent pointer-events-none" />
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-glow-radial pointer-events-none opacity-40 rounded-full blur-3xl" />

        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          activeTitle={activeSession?.title}
        />

        {/* Content Box */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Header branding */}
            {!activeSession && !isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center pt-8 pb-4 flex flex-col items-center"
              >
                <div className="mb-4 relative">
                  <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl blur-lg w-16 h-16" />
                  <img 
                    src={LogoImage} 
                    alt="Prompt Studio Logo" 
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-800 shadow-xl relative z-10"
                  />
                </div>
                <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold mb-3.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Version 1.0 Live</span>
                </div>
                <h1 className="text-3xl md:text-4.5xl font-black tracking-tight text-white font-sans bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-300">
                  Prompt Studio
                </h1>
                <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
                  Transform ordinary prompts into high-quality AI prompts.
                </p>
              </motion.div>
            )}

            {/* Core Working Area */}
            <div className="space-y-6">
              
              {/* Input Area */}
              <AnimatePresence mode="wait">
                {!isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <PromptInput
                      value={inputText}
                      onChange={setInputText}
                      onEnhance={handleEnhance}
                      isLoading={isLoading}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Streaming loading skeleton */}
              {isLoading && <LoadingSkeleton />}

              {/* Enhanced Prompt comparison + Analytics dashboard */}
              {!isLoading && activeSession && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <PromptOutput
                    originalPrompt={activeSession.originalPrompt}
                    enhancedPrompt={activeSession.enhancedPrompt}
                    onRegenerate={handleEnhance}
                    onEdit={handleEdit}
                  />

                  <AnalyticsPanel
                    beforeScore={activeSession.beforeScore}
                    afterScore={activeSession.afterScore}
                    beforeTokens={activeSession.beforeTokens}
                    afterTokens={activeSession.afterTokens}
                    details={activeSession.details}
                    badges={activeSession.badges}
                    qualityBefore={activeSession.qualityBefore}
                    qualityAfter={activeSession.qualityAfter}
                  />
                </motion.div>
              )}

              {/* Empty Workspace Dashboard */}
              {!activeSession && !isLoading && (
                <EmptyState onSelectSuggestion={handleSelectSuggestion} />
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default App;