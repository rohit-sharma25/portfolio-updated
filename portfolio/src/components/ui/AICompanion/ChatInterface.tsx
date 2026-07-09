import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Command, CornerDownLeft, Cpu, Sparkles } from 'lucide-react';
import { aiEngine } from '../../../lib/ai/responseEngine';
import type { AIResponse, ContextAction } from '../../../lib/ai/responseEngine';
import { personality } from '../../../lib/ai/personality';

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  currentContext: string | null;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  actions?: ContextAction[];
}

export function ChatInterface({ isOpen, onClose, currentContext }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! I'm ${personality.name}, ${personality.identity} How can I help you explore Rohit's work today?`,
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [userScrolledUp, setUserScrolledUp] = useState(false);

  // Stop Lenis (global smooth scroll) from hijacking wheel events inside the chat modal.
  // Without this, scrolling the chat messages actually scrolls the page behind it.
  const stopScrollPropagation = useCallback((e: WheelEvent) => {
    const container = chatContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isScrollable = scrollHeight > clientHeight;
    if (!isScrollable) return;

    const scrollingUp = e.deltaY < 0;
    const scrollingDown = e.deltaY > 0;
    const atTop = scrollTop === 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

    // Only stop propagation if the container can still scroll in the given direction
    if ((scrollingUp && !atTop) || (scrollingDown && !atBottom)) {
      e.stopPropagation();
    } else if (isScrollable) {
      e.stopPropagation();
    }
  }, []);

  // Attach/detach wheel blocker when modal opens/closes
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal || !isOpen) return;
    modal.addEventListener('wheel', stopScrollPropagation, { passive: false });
    return () => modal.removeEventListener('wheel', stopScrollPropagation);
  }, [isOpen, stopScrollPropagation]);

  // Detect if user has scrolled up manually
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // If user scrolls more than 100px away from bottom, mark as scrolled up
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setUserScrolledUp(!isNearBottom);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll only when user hasn't scrolled up
  useEffect(() => {
    if (messagesEndRef.current && !userScrolledUp) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, userScrolledUp]);

  useEffect(() => {
    // Escape key to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSend = async (overrideText?: string) => {
    const text = overrideText ?? input;
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await aiEngine.getResponse(text, currentContext || undefined);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: response.text,
        actions: response.actions
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "Sorry, I encountered an error. Please try again."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (action: ContextAction) => {
    if (action.url) {
      if (action.url.startsWith('#')) {
        // Scroll to section
        const el = document.querySelector(action.url);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          onClose(); // Close chat to let them see
        }
      } else {
        // Open external or download
        window.open(action.url, '_blank');
      }
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    handleSend(prompt).catch(() => {});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-md sm:p-4 md:p-8"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full sm:max-w-4xl h-full sm:h-[85vh] bg-[var(--color-background)] border-0 sm:border border-white/10 sm:rounded-3xl shadow-2xl flex flex-col"
            style={{ overflow: 'hidden' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 shadow-[0_0_15px_rgba(168,85,247,0.3)] border border-purple-500/30">
                   <Cpu className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-white">{personality.name}</h2>
                  <p className="text-xs text-purple-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Digital Twin
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div
              ref={chatContainerRef}
              className="flex-1 min-h-0 p-4 md:p-6 space-y-4 md:space-y-6 custom-scrollbar"
              style={{ overflowY: 'scroll', overscrollBehavior: 'contain' }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-5 py-4 ${
                    msg.sender === 'user' 
                      ? 'bg-purple-600/20 border border-purple-500/30 text-white' 
                      : 'bg-white/5 border border-white/10 text-gray-200'
                  }`}>
                    <p className="leading-relaxed">{msg.text}</p>
                    
                    {/* Context Actions */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/10">
                        {msg.actions.map((action, i) => (
                          <button
                            key={i}
                            onClick={() => handleActionClick(action)}
                            className="text-xs px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 transition-colors border border-purple-500/30 flex items-center gap-2"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-6 border-t border-white/5 bg-white/5">
              <div className="flex gap-2 mb-3 md:mb-4 overflow-x-auto pb-2 scrollbar-hide">
                {['Who is Rohit?', 'Tell me about AutoFixNow', 'What hackathons has he won?', 'Download resume'].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestedPrompt(prompt)}
                    className="whitespace-nowrap text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              
              <form 
                id="chat-form"
                onSubmit={(e) => { e.preventDefault(); handleSend().catch(() => {}); }}
                className="relative flex items-center"
              >
                <Command className="absolute left-4 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask R.AI anything about Rohit..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-16 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center text-white"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="mt-3 text-center text-[10px] text-gray-600 flex items-center justify-center gap-1">
                Press <span className="px-1 py-0.5 rounded bg-white/10 border border-white/5">Enter <CornerDownLeft className="inline w-2 h-2" /></span> to send, <span className="px-1 py-0.5 rounded bg-white/10 border border-white/5">Esc</span> to close
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
