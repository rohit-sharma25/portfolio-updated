import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, Briefcase, FolderOpen, BrainCircuit, Mail, ArrowRight, Command } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function CommandPalette({ isOpen, setIsOpen }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setActiveIndex(0);
      setQuery('');
    }
  }, [isOpen]);

  const commands = [
    { id: 'home', title: 'Home', desc: 'Back to the top', icon: Home, href: '#home' },
    { id: 'about', title: 'About', desc: 'Who I am and my mission', icon: Briefcase, href: '#about' },
    { id: 'product', title: 'AutoFixNow', desc: 'Featured product showcase', icon: FolderOpen, href: '#product' },
    { id: 'ai', title: 'AI Engineering', desc: 'Intelligent systems & AI work', icon: BrainCircuit, href: '#ai-engineering' },
    { id: 'contact', title: 'Contact', desc: 'Let\'s build together', icon: Mail, href: '#contact' },
  ];

  const filtered = query
    ? commands.filter(c => c.title.toLowerCase().includes(query.toLowerCase()) || c.desc.toLowerCase().includes(query.toLowerCase()))
    : commands;

  const navigate = (item: typeof commands[0]) => {
    const el = document.querySelector(item.href);
    el?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(i => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex(i => Math.max(i - 1, 0)); }
      if (e.key === 'Enter' && filtered[activeIndex]) navigate(filtered[activeIndex]);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, filtered, activeIndex]);

  useEffect(() => setActiveIndex(0), [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[16vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Palette Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -12 }}
            transition={{ type: 'spring', damping: 30, stiffness: 380 }}
            className="relative w-full max-w-[560px] overflow-hidden rounded-2xl shadow-2xl"
            style={{
              background: 'rgba(13,13,16,0.96)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04) inset',
            }}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              <Search className="w-5 h-5 text-[color-mix(in_srgb,var(--color-text-main)_30%,transparent)] shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search or jump to…"
                className="flex-1 bg-transparent text-[var(--color-text-main)] placeholder-[color-mix(in_srgb,var(--color-text-main)_25%,transparent)] outline-none text-[15px] font-body"
              />
              <div className="flex items-center gap-1.5 shrink-0">
                <kbd className="px-2 py-1 rounded-md text-[10px] font-mono text-[color-mix(in_srgb,var(--color-text-main)_30%,transparent)] border" style={{ background: 'color-mix(in srgb, var(--color-text-main) 5%, transparent)', borderColor: 'color-mix(in srgb, var(--color-text-main) 8%, transparent)' }}>ESC</kbd>
              </div>
            </div>

            {/* Results */}
            <div className="p-2 max-h-[360px] overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-sm text-[color-mix(in_srgb,var(--color-text-main)_30%,transparent)] font-body">No results for "{query}"</div>
              ) : (
                <>
                  <div className="px-3 py-2 text-[11px] font-mono text-[color-mix(in_srgb,var(--color-text-main)_25%,transparent)] uppercase tracking-widest">Navigation</div>
                  {filtered.map((cmd, i) => (
                    <motion.button
                      key={cmd.id}
                      onClick={() => navigate(cmd)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className="w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-colors text-left group"
                      animate={{ backgroundColor: activeIndex === i ? 'color-mix(in srgb, var(--color-text-main) 6%, transparent)' : 'rgba(0,0,0,0)' }}
                      transition={{ duration: 0.12 }}
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border"
                        style={{ background: 'color-mix(in srgb, var(--color-text-main) 4%, transparent)', borderColor: 'color-mix(in srgb, var(--color-text-main) 8%, transparent)' }}>
                        <cmd.icon className="w-4 h-4 text-[color-mix(in_srgb,var(--color-text-main)_50%,transparent)] group-hover:text-[color-mix(in_srgb,var(--color-text-main)_80%,transparent)] transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[color-mix(in_srgb,var(--color-text-main)_80%,transparent)] group-hover:text-[var(--color-text-main)] transition-colors">{cmd.title}</div>
                        <div className="text-[12px] text-[color-mix(in_srgb,var(--color-text-main)_30%,transparent)] mt-0.5">{cmd.desc}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[color-mix(in_srgb,var(--color-text-main)_20%,transparent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  ))}
                </>
              )}
            </div>

            {/* Footer hint */}
            <div className="px-5 py-3 border-t flex items-center gap-3 text-[11px] text-[color-mix(in_srgb,var(--color-text-main)_20%,transparent)] font-mono"
              style={{ borderColor: 'color-mix(in srgb, var(--color-text-main) 6%, transparent)' }}>
              <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5">↑↓</kbd> navigate</span>
              <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5">↵</kbd> open</span>
              <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5">esc</kbd> close</span>
              <div className="ml-auto flex items-center gap-1">
                <Command className="w-3 h-3" />
                <span>K to toggle</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
