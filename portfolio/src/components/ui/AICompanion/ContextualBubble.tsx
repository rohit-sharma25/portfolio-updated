import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Download, MessageCircle, Eye, Sparkles } from 'lucide-react';
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
    case 'open_github': return <ExternalLink className="w-3.5 h-3.5" />;
    case 'download_resume': return <Download className="w-3.5 h-3.5" />;
    case 'contact': return <MessageCircle className="w-3.5 h-3.5" />;
    case 'view_case_study':
    case 'view_project': return <Eye className="w-3.5 h-3.5" />;
    default: return null;
  }
};

function formatBubbleMessage(message: string) {
  const cleaned = message
    .replace(/[*_`>#-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleaned) return 'Exploring this section...';

  // Return the first two sentences for a richer preview
  const sentences = cleaned.match(/[^.!?]+[.!?]+/g) || [cleaned];
  const preview = sentences.slice(0, 2).join(' ').trim();
  
  if (!preview) return 'Exploring this section...';
  if (preview.length <= 150) return preview;

  return `${preview.slice(0, 147).trimEnd()}...`;
}

export function ContextualBubble({ isVisible, message, actions, onClose, onActionClick }: ContextualBubbleProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: 20, scale: 0.95, filter: 'blur(10px)' }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="absolute right-[calc(100%+16px)] top-1/2 -translate-y-1/2 w-[min(280px,calc(100vw-120px))] md:w-[320px] rounded-2xl p-4 md:p-5 shadow-[0_20px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] z-40 overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(30, 20, 50, 0.7), rgba(10, 10, 15, 0.8))',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
          }}
        >
          {/* Subtle glowing animated background behind text */}
          <motion.div 
            className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-[40px] pointer-events-none"
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          <div className="flex items-center gap-2 mb-3 relative z-10">
            <div className="flex items-center justify-center w-5 h-5 rounded-md bg-gradient-to-br from-purple-500 to-blue-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300">
              R.AI Companion
            </span>
          </div>
          
          <p className="text-sm leading-relaxed mb-4 text-gray-200 font-body relative z-10 line-clamp-4">
            {formatBubbleMessage(message)}
          </p>

          {actions && actions.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-3 border-t border-purple-500/20 relative z-10">
              {actions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => onActionClick(action)}
                  className="flex items-center gap-1.5 text-xs font-medium bg-white/5 hover:bg-purple-500/20 text-purple-200 hover:text-purple-100 px-3 py-1.5 rounded-lg transition-all duration-300 border border-white/5 hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] group"
                >
                  <span className="text-purple-400 group-hover:text-purple-300 transition-colors">
                    {getActionIcon(action.type)}
                  </span>
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
