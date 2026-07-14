import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, Briefcase, History, FolderOpen, Mail, Command } from 'lucide-react';

interface MacDockProps {
  onOpenCommandPalette: () => void;
}

export function MacDock({ onOpenCommandPalette }: MacDockProps) {
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(`#${id}`, { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { icon: Home, label: 'Home', sectionId: 'home' },
    { icon: Briefcase, label: 'About', sectionId: 'about' },
    { icon: FolderOpen, label: 'Projects', sectionId: 'projects' },
    { icon: History, label: 'Experience', sectionId: 'timeline' },
    { icon: Mail, label: 'Contact', sectionId: 'contact' },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="fixed bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 pt-2.5 pb-3 sm:py-3 rounded-2xl backdrop-blur-2xl shadow-2xl border"
            style={{
              background: 'rgba(10,10,12,0.85)',
              borderColor: 'rgba(255,255,255,0.09)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {navItems.map((item, i) => (
              <DockIcon key={i} mouseX={mouseX} item={item} onNavigate={scrollToSection} />
            ))}

            {/* Divider + Command Palette — hidden on small screens */}
            <div className="hidden sm:block w-px h-6 bg-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] mx-1" />

            {/* Command palette trigger */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCommandPalette}
              className="hidden sm:flex relative items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-text-main)_6%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] text-[color-mix(in_srgb,var(--color-text-main)_60%,transparent)] hover:text-[var(--color-text-main)] hover:bg-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] transition-colors group"
              style={{ width: 44, height: 44 }}
              title="Command Palette (⌘K)"
            >
              <Command className="w-[46%] h-[46%]" />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border pointer-events-none"
                style={{ background: 'rgba(18,18,22,0.95)', borderColor: 'rgba(255,255,255,0.1)' }}>
                ⌘K
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ mouseX, item, onNavigate }: { mouseX: any; item: { icon: React.ElementType; label: string; sectionId: string }; onNavigate: (id: string) => void }) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeSync = useTransform(distance, [-100, 0, 100], [36, 56, 36]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 180, damping: 14 });

  const handleClick = () => {
    // On touch devices: first tap shows tooltip, second tap navigates
    if ('ontouchstart' in window) {
      if (showTooltip) {
        // Second tap: navigate
        onNavigate(item.sectionId);
        setShowTooltip(false);
        return;
      }
      // First tap: show tooltip, don't navigate yet
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return;
    }
    // Desktop: navigate immediately
    onNavigate(item.sectionId);
  };

  return (
    <motion.button
      ref={ref}
      onClick={handleClick}
      style={{ width: size, height: size, flexShrink: 0 }}
      className="relative flex flex-col items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_7%,transparent)] text-[color-mix(in_srgb,var(--color-text-main)_60%,transparent)] hover:text-[var(--color-text-main)] hover:bg-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] transition-colors group"
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
    >
      <item.icon className="w-[46%] h-[46%] opacity-80 group-hover:opacity-100 transition-opacity" />
      
      {/* Desktop hover tooltip */}
      <span
        className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border max-sm:hidden"
        style={{ background: 'rgba(18,18,22,0.95)', borderColor: 'rgba(255,255,255,0.1)' }}
      >
        {item.label}
      </span>

      {/* Mobile tap tooltip */}
      <span
        className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-opacity duration-200 pointer-events-none border sm:hidden ${
          showTooltip ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ background: 'rgba(18,18,22,0.95)', borderColor: 'rgba(255,255,255,0.1)' }}
      >
        {item.label}
      </span>

      {/* Mobile persistent label below icon */}
      <span className="sm:hidden text-[8px] font-medium text-[color-mix(in_srgb,var(--color-text-main)_50%,transparent)] leading-none mt-0.5 pointer-events-none">
        {item.label}
      </span>
    </motion.button>
  );
}
