import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface JourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function JourneyModal({ isOpen, onClose, title, children }: JourneyModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Use the title as a key so that when a different project is selected,
  // the modal content fully remounts — preventing stale data flash.
  const modalKey = title || 'modal';

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key={modalKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop blur */}
          <div className="absolute inset-0 bg-[var(--color-background)]/80 backdrop-blur-sm" />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[var(--color-secondary)] border border-[var(--color-text-main)]/10 rounded-2xl shadow-2xl"
            data-lenis-prevent="true"
          >
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-[var(--color-text-main)]/10 bg-[var(--color-secondary)]/80 backdrop-blur-md z-10">
              <h3 className="text-xl font-heading font-semibold text-[var(--color-text-main)]">{title}</h3>
              <button
                onClick={onClose}
                className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors rounded-full hover:bg-[var(--color-primary)]/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
