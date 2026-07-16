import React, { useState, useEffect } from 'react';
import { Drone } from './Drone';
import { ContextualBubble } from './ContextualBubble';
import { ChatInterface } from './ChatInterface';
import { useAIContext } from '../../../hooks/useAIContext';
import { usePortfolioTour } from '../../../hooks/usePortfolioTour';
import type { ContextAction } from '../../../lib/ai/responseEngine';
import { motion, AnimatePresence } from 'framer-motion';


export function AICompanion() {
  const { currentContext } = useAIContext();
  const tour = usePortfolioTour();
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDroneHovered, setIsDroneHovered] = useState(false);
  
  const [bubbleMessage, setBubbleMessage] = useState('');
  const [bubbleActions] = useState<ContextAction[]>([]);
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);

  // Handle Tour Mode Bubble Updates
  useEffect(() => {
    if (tour.isActive) {
      setBubbleMessage(tour.currentStep.message);
      setIsBubbleVisible(true);
    }
  }, [tour.isActive, tour.currentStep]);

  const handleActionClick = (action: ContextAction) => {
    if (action.url) {
      if (action.url.startsWith('#')) {
        const el = document.querySelector(action.url);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.open(action.url, '_blank');
      }
    }
  };

  return (
    <>
      {/* Floating Drone Anchor */}
      <motion.div
        className="fixed z-[90] flex items-center"
        style={{ bottom: '5rem', right: '1.25rem' }}
      >
        <ContextualBubble 
          isVisible={isBubbleVisible} 
          message={bubbleMessage}
          actions={bubbleActions}
          onClose={() => setIsBubbleVisible(false)}
          onActionClick={handleActionClick}
        />

        <div className="relative">
          <Drone 
            onClick={() => setIsChatOpen(true)}
            isHovered={isDroneHovered}
            onMouseEnter={() => {
              setIsDroneHovered(true);
              setIsBubbleVisible(true);
            }}
            onMouseLeave={() => setIsDroneHovered(false)}
          />

          {/* Tour Mode Controls - Rendered below drone if active */}
          <AnimatePresence>
            {tour.isActive && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full mt-4 right-0 flex gap-2"
              >
                <button onClick={tour.prevStep} disabled={tour.currentStepIndex === 0} className="px-3 py-1 bg-black/50 backdrop-blur text-xs rounded border border-white/10 disabled:opacity-50">Prev</button>
                <button onClick={tour.nextStep} className="px-3 py-1 bg-purple-600/50 backdrop-blur text-xs rounded border border-purple-500/30">
                  {tour.currentStepIndex === tour.totalSteps - 1 ? 'Finish' : 'Next'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Full Screen Chat Overlay */}
      <ChatInterface 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        currentContext={currentContext}
      />
      
      {/* Global Tour Button */}
      {!tour.isActive && (
        <motion.button
          onClick={tour.startTour}
          initial={{ opacity: 0, x: -30, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="hidden sm:flex fixed bottom-8 left-8 z-[80] items-center px-5 py-3 rounded-full text-sm font-medium backdrop-blur-xl transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(168,85,247,0.25), rgba(124,58,237,0.15))',
            border: '1px solid rgba(168,85,247,0.35)',
            color: '#d8b4fe',
          }}
        >
          <span className="relative font-heading tracking-wide">Take Portfolio Tour</span>
        </motion.button>
      )}


    </>
  );
}
