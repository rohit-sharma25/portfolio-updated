import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, Briefcase, BrainCircuit, FolderOpen, Mail, Command, Code2 } from 'lucide-react';

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

  const navItems = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: Briefcase, label: 'About', href: '#about' },
    { icon: FolderOpen, label: 'Product', href: '#product' },
    { icon: BrainCircuit, label: 'AI', href: '#ai-engineering' },
    { icon: Mail, label: 'Contact', href: '#contact' },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="fixed bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl backdrop-blur-2xl shadow-2xl border"
            style={{
              background: 'rgba(10,10,12,0.85)',
              borderColor: 'rgba(255,255,255,0.09)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {navItems.map((item, i) => (
              <DockIcon key={i} mouseX={mouseX} item={item} />
            ))}

            {/* Divider */}
            <div className="w-px h-6 bg-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] mx-1" />

            {/* View Source */}
            <motion.a
              href="https://github.com/rohit-sharma25/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-text-main)_6%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] text-[color-mix(in_srgb,var(--color-text-main)_60%,transparent)] hover:text-[var(--color-text-main)] hover:bg-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] transition-colors group"
              style={{ width: 44, height: 44 }}
              title="View Source"
            >
              <Code2 className="w-[46%] h-[46%]" />
              <span
                className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border pointer-events-none"
                style={{ background: 'rgba(18,18,22,0.95)', borderColor: 'rgba(255,255,255,0.1)' }}
              >
                View Source
              </span>
            </motion.a>

            {/* Divider */}
            <div className="w-px h-6 bg-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] mx-1" />

            {/* Command palette trigger */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCommandPalette}
              className="relative flex items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-text-main)_6%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] text-[color-mix(in_srgb,var(--color-text-main)_60%,transparent)] hover:text-[var(--color-text-main)] hover:bg-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] transition-colors group"
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

function DockIcon({ mouseX, item }: { mouseX: any; item: any }) {
  const ref = React.useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeSync = useTransform(distance, [-100, 0, 100], [44, 64, 44]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 180, damping: 14 });

  return (
    <motion.a
      ref={ref}
      href={item.href}
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_7%,transparent)] text-[color-mix(in_srgb,var(--color-text-main)_60%,transparent)] hover:text-[var(--color-text-main)] hover:bg-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] transition-colors group"
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
    >
      <item.icon className="w-[46%] h-[46%] opacity-80 group-hover:opacity-100 transition-opacity" />
      <span
        className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border"
        style={{ background: 'rgba(18,18,22,0.95)', borderColor: 'rgba(255,255,255,0.1)' }}
      >
        {item.label}
      </span>
    </motion.a>
  );
}
