import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardView } from './DashboardView';
import { WorkflowView } from './WorkflowView';
import { CapabilityModal } from './CapabilityModal';
import type { CapabilityPillar } from './data';
import { Layers, Workflow } from 'lucide-react';

export function EngineeringCapabilities() {
  const [activeView, setActiveView] = useState<'dashboard' | 'workflow'>('dashboard');
  const [selectedCapability, setSelectedCapability] = useState<CapabilityPillar | null>(null);

  return (
    <section id="capabilities" className="relative py-24 border-t border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] overflow-hidden" data-ai-context="capabilities">
      <div className="container max-w-7xl mx-auto px-6">
        
        {/* Header & Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[#22D3EE]">
              Engineering Capabilities
            </h2>
            <p className="text-[var(--color-text-muted)] text-lg md:text-xl max-w-2xl">
              How I transform ideas into intelligent digital products.
            </p>
          </div>

          {/* Premium Toggle */}
          <div className="flex items-center p-1.5 rounded-2xl bg-[color-mix(in_srgb,var(--color-text-main)_3%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] shrink-0 relative w-fit">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeView === 'dashboard' ? 'text-white' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
              }`}
            >
              <Layers className="w-4 h-4" />
              Capabilities
            </button>
            <button
              onClick={() => setActiveView('workflow')}
              className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeView === 'workflow' ? 'text-white' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
              }`}
            >
              <Workflow className="w-4 h-4" />
              Process
            </button>
            
            {/* Animated Pill Background */}
            <div 
              className={`absolute top-1.5 bottom-1.5 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 ease-out z-0`}
              style={{
                left: activeView === 'dashboard' ? '6px' : 'calc(50% + 3px)',
                width: 'calc(50% - 9px)'
              }}
            />
          </div>
        </div>

        {/* Dynamic Views */}
        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            {activeView === 'dashboard' ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <DashboardView onSelectCapability={setSelectedCapability} />
              </motion.div>
            ) : (
              <motion.div
                key="workflow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <WorkflowView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Immersive Modal */}
      <CapabilityModal 
        capability={selectedCapability} 
        onClose={() => setSelectedCapability(null)} 
      />
    </section>
  );
}
