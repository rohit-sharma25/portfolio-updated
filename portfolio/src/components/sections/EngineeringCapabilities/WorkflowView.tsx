import { motion } from 'framer-motion';

const WORKFLOW_STEPS = [
  { id: 'discovery', title: 'Problem Discovery', description: 'Identifying user pain points and technical constraints.' },
  { id: 'research', title: 'Research & Feasibility', description: 'Evaluating models, architecture, and technology stacks.' },
  { id: 'design', title: 'System & UI Design', description: 'Architecting databases, APIs, and wireframing user interfaces.' },
  { id: 'frontend', title: 'Frontend Engineering', description: 'Building responsive, accessible, and performant user experiences.' },
  { id: 'backend', title: 'Backend Architecture', description: 'Developing scalable APIs, microservices, and securing data.' },
  { id: 'ai', title: 'AI Integration', description: 'Implementing LLMs, RAG pipelines, and intelligent agents.' },
  { id: 'deployment', title: 'Deployment & DevOps', description: 'Setting up CI/CD, hosting, and cloud infrastructure.' },
  { id: 'iteration', title: 'Monitoring & Iteration', description: 'Gathering feedback, analyzing metrics, and shipping v2.' }
];

export function WorkflowView() {
  return (
    <div className="w-full py-12">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold text-[var(--color-text-main)] mb-8 text-center font-heading">
          Product Development Workflow
        </h3>
        
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] -translate-x-1/2 hidden md:block" />
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] md:hidden" />

          <div className="space-y-8 md:space-y-12">
            {WORKFLOW_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={step.id} 
                  className={`relative flex items-center md:justify-between gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-[var(--color-background)] border-2 border-[var(--color-primary)] -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                  
                  {/* Content Box */}
                  <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="p-6 rounded-2xl bg-[color-mix(in_srgb,var(--color-text-main)_2%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] hover:border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] transition-all duration-300">
                      <span className="text-xs font-mono text-[var(--color-primary)] mb-2 block">0{index + 1}</span>
                      <h4 className="text-lg font-semibold text-[var(--color-text-main)] mb-2">{step.title}</h4>
                      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Empty space for alternate side on desktop */}
                  <div className="hidden md:block md:w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
