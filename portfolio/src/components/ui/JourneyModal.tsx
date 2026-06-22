import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface JourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function JourneyModal({ isOpen, onClose, title, children }: JourneyModalProps) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-[var(--color-background)]/80 backdrop-blur-sm"
        />
      )}
      {isOpen && (
        <div key="modal-wrapper" className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[var(--color-secondary)] border border-[var(--color-text-main)]/10 rounded-2xl shadow-2xl pointer-events-auto"
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
        </div>
      )}
    </AnimatePresence>
  );
}
