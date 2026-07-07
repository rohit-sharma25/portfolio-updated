import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Download, MessageCircle, Eye } from 'lucide-react';
import type { ContextAction } from '../../../lib/ai/responseEngine';

interface ContextualBubbleProps {
  isVisible: boolean;
  message: string;
  actions?: ContextAction[];
  onClose: () => void;
  onActionClick: (action: ContextAction) => void;
}

const getActionIcon = (type: ContextAction['type']) => {
  switch (type) {
    case 'open_github': return <ExternalLink className="w-3 h-3" />;
    case 'download_resume': return <Download className="w-3 h-3" />;
    case 'contact': return <MessageCircle className="w-3 h-3" />;
    case 'view_case_study':
    case 'view_project': return <Eye className="w-3 h-3" />;
    default: return null;
  }
};

function formatBubbleMessage(message: string) {
  const cleaned = message
    .replace(/[*_`>#-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleaned) return 'Exploring this section...';

  const firstLine = cleaned.split('\n')[0];
  const firstSentence = firstLine.split(/(?<=[.!?])\s+/)[0];
  const candidate = (firstSentence || firstLine).trim();

  if (!candidate) return 'Exploring this section...';
  if (candidate.length <= 110) return candidate;

  return `${candidate.slice(0, 107).trimEnd()}...`;
}

export function ContextualBubble({ isVisible, message, actions, onClose, onActionClick }: ContextualBubbleProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="absolute right-[120%] top-1/2 -translate-y-1/2 w-64 md:w-72 backdrop-blur-xl border rounded-2xl p-4 shadow-2xl z-40"
          style={{
            background: 'color-mix(in srgb, var(--color-text-main) 8%, transparent)',
            borderColor: 'color-mix(in srgb, var(--color-text-main) 12%, transparent)',
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">R.AI Companion</span>
          </div>
          
          <p className="text-sm leading-relaxed mb-3 whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ color: 'color-mix(in srgb, var(--color-text-main) 80%, transparent)' }}>
            {formatBubbleMessage(message)}
          </p>

          {actions && actions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/10">
              {actions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => onActionClick(action)}
                  className="flex items-center gap-1.5 text-xs bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-2.5 py-1.5 rounded-lg transition-colors border border-purple-500/30"
                >
                  {getActionIcon(action.type)}
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
