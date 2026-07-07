import { motion, AnimatePresence } from 'framer-motion';
import { X, Network, BookOpen, Wrench, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { CapabilityPillar, Technology } from './data';
import { createPortal } from 'react-dom';

interface CapabilityModalProps {
  capability: CapabilityPillar | null;
  onClose: () => void;
}

export function CapabilityModal({ capability, onClose }: CapabilityModalProps) {
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);

  // Reset selected tech when capability changes
  useEffect(() => {
    if (capability && capability.technologies.length > 0) {
      setSelectedTech(capability.technologies[0]);
    } else {
      setSelectedTech(null);
    }
  }, [capability]);

  // Prevent background scrolling
  useEffect(() => {
    if (capability) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [capability]);

  if (!capability) return null;

  const productionReady = capability.technologies.filter(t => t.status === 'Production Ready');
  const building = capability.technologies.filter(t => t.status === 'Building');
  const exploring = capability.technologies.filter(t => t.status === 'Exploring');

  const content = (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-6xl h-full max-h-[85vh] bg-[var(--color-background)] border border-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 rounded-full bg-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-text-main)_15%,transparent)] transition-colors"
          >
            <X className="w-5 h-5 text-[var(--color-text-main)]" />
          </button>

          {/* Left Column: Tech Stack Classification */}
          <div className="w-full md:w-1/2 lg:w-7/12 border-b md:border-b-0 md:border-r border-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] bg-[color-mix(in_srgb,var(--color-text-main)_2%,transparent)] overflow-y-auto hide-scrollbar p-8 lg:p-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[var(--color-text-main)] mb-4">{capability.title}</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-10 text-sm md:text-base">
              {capability.description}
            </p>

            <div className="space-y-10">
              {/* Production Ready */}
              {productionReady.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4 text-[var(--color-primary)]">
                    <CheckCircle className="w-4 h-4" />
                    <h3 className="text-sm font-semibold uppercase tracking-wider">Production Ready</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {productionReady.map(tech => (
                      <button
                        key={tech.name}
                        onClick={() => setSelectedTech(tech)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                          selectedTech?.name === tech.name 
                            ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20' 
                            : 'bg-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] text-[var(--color-text-main)]'
                        }`}
                      >
                        {tech.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Building */}
              {building.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4 text-[#3B82F6]">
                    <Wrench className="w-4 h-4" />
                    <h3 className="text-sm font-semibold uppercase tracking-wider">Building</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {building.map(tech => (
                      <button
                        key={tech.name}
                        onClick={() => setSelectedTech(tech)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                          selectedTech?.name === tech.name 
                            ? 'bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/20' 
                            : 'bg-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] text-[var(--color-text-main)]'
                        }`}
                      >
                        {tech.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Exploring */}
              {exploring.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4 text-[#22D3EE]">
                    <BookOpen className="w-4 h-4" />
                    <h3 className="text-sm font-semibold uppercase tracking-wider">Exploring</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exploring.map(tech => (
                      <button
                        key={tech.name}
                        onClick={() => setSelectedTech(tech)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                          selectedTech?.name === tech.name 
                            ? 'bg-[#22D3EE] text-white shadow-lg shadow-[#22D3EE]/20' 
                            : 'bg-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] text-[var(--color-text-main)]'
                        }`}
                      >
                        {tech.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Relationships & Connections */}
          <div className="w-full md:w-1/2 lg:w-5/12 bg-[var(--color-background)] p-8 lg:p-12 overflow-y-auto hide-scrollbar flex flex-col">
            {selectedTech ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTech.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="mb-8">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] rounded-full text-xs font-mono text-[var(--color-text-muted)] mb-4">
                      <Network className="w-3 h-3" />
                      Technology Profile
                    </span>
                    <h3 className="text-3xl font-bold text-[var(--color-text-main)] mb-2 font-heading">{selectedTech.name}</h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-[var(--color-primary)] to-transparent rounded-full" />
                  </div>

                  <div className="space-y-8 flex-1">
                    {/* Purpose Section */}
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-semibold mb-4">Used For</h4>
                      <ul className="space-y-3">
                        {selectedTech.purpose.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] mt-2 shrink-0" />
                            <span className="text-[var(--color-text-main)] text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Applied In Section */}
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-semibold mb-4">Applied In</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedTech.usedIn.map((item, idx) => (
                          <div 
                            key={idx} 
                            className="px-4 py-3 rounded-xl bg-[color-mix(in_srgb,var(--color-text-main)_3%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)]"
                          >
                            <span className="text-[var(--color-text-main)] text-sm font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                <Network className="w-12 h-12 text-[var(--color-text-muted)] mb-4" />
                <p className="text-[var(--color-text-main)]">Select a technology to explore its connections.</p>
              </div>
            )}
          </div>

        </motion.div>
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
