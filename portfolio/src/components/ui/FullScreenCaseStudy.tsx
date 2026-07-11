import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code2 } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';

export interface CaseStudySection {
  title: string;
  content: ReactNode;
}

export interface CinematicProject {
  id: string;
  title: string;
  category: string;
  summary: string;
  status: string;
  badge: string;
  problem: string;
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  bgGradient: string;
  caseStudySections: CaseStudySection[];
  metrics: { label: string; value: string }[];
  scrollReveals: { title: string; content: ReactNode }[];
}

interface FullScreenCaseStudyProps {
  isOpen: boolean;
  onClose: () => void;
  project: CinematicProject | null;
}

export function FullScreenCaseStudy({ isOpen, onClose, project }: FullScreenCaseStudyProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-[var(--color-background)] overflow-y-auto"
          data-lenis-prevent="true"
        >
          {/* Subtle Ambient Background for the case study */}
          <div 
            className="fixed inset-0 pointer-events-none opacity-20"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${project.bgGradient}, transparent 70%)`
            }}
          />

          <div className="sticky top-0 z-50 flex justify-end p-6 bg-gradient-to-b from-[var(--color-background)] via-[var(--color-background)] to-transparent pointer-events-none">
            <button
              onClick={onClose}
              className="pointer-events-auto p-4 rounded-full bg-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] backdrop-blur-md text-[var(--color-text-main)] hover:bg-[color-mix(in_srgb,var(--color-text-main)_20%,transparent)] transition-all shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="max-w-4xl mx-auto px-6 pb-32 -mt-10 relative z-10">
            {/* Hero Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider border border-[var(--color-primary)]/20">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-[color-mix(in_srgb,var(--color-text-main)_50%,transparent)] tracking-widest uppercase">
                  {project.status}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight text-[var(--color-text-main)]">
                {project.title}
              </h1>
              <p className="text-xl md:text-2xl text-[var(--color-text-muted)] font-body mb-12 leading-relaxed">
                {project.summary}
              </p>
              
              <div className="flex gap-4 mb-16">
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-full font-medium text-sm flex items-center gap-2 hover:bg-[var(--color-primary)]/80 transition-colors shadow-lg shadow-[var(--color-primary)]/20">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
                {project.githubUrl && project.githubUrl !== '#' && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-transparent text-[var(--color-text-main)] border border-[var(--color-text-main)]/20 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-[var(--color-text-main)]/5 transition-colors">
                    <Code2 className="w-4 h-4" /> View Source
                  </a>
                )}
              </div>
            </motion.div>

            {/* Metrics Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 py-8 border-y border-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)]"
            >
              {project.metrics.map((metric, idx) => (
                <div key={idx}>
                  <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--color-text-main)_40%,transparent)] mb-2">
                    {metric.label}
                  </h4>
                  <p className="text-sm font-medium text-[var(--color-text-main)]">
                    {metric.value}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Cover Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-full aspect-video rounded-3xl overflow-hidden mb-24 border border-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] relative group"
            >
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>

            {/* Editorial Content Sections */}
            <div className="space-y-32">
              {project.caseStudySections.map((section, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
                >
                  <div className="md:col-span-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)] sticky top-32">
                      {section.title}
                    </h3>
                  </div>
                  <div className="md:col-span-8">
                    <div className="prose prose-invert prose-lg max-w-none text-[color-mix(in_srgb,var(--color-text-main)_90%,transparent)] font-body leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
