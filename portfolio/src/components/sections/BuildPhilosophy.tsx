import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { PremiumCard } from '../ui/PremiumCard';
import { SkillGraph } from '../ui/SkillGraph';
import { BrainCircuit, LayoutTemplate, Lightbulb } from 'lucide-react';

export function BuildPhilosophy() {
  const philosophies = [
    {
      title: 'AI Engineering',
      icon: BrainCircuit,
      items: ['Python', 'RAG', 'LangChain', 'NLP'],
      className: 'lg:col-span-1'
    },
    {
      title: 'Full Stack Engineering',
      icon: LayoutTemplate,
      items: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
      className: 'lg:col-span-1'
    },
    {
      title: 'Product Development',
      icon: Lightbulb,
      items: ['System Design', 'UX Thinking', 'Scalable Architecture', 'Problem Solving'],
      className: 'lg:col-span-1'
    }
  ];

  return (
    <section id="philosophy" className="relative py-24 md:py-32 bg-[var(--color-secondary)]">
      <div className="container max-w-7xl mx-auto px-6">
        <SectionHeading title="Build Philosophy" subtitle="How I Think" />

        {/* Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {philosophies.map((phil, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={phil.className}
            >
              <PremiumCard className="h-full flex flex-col group p-8">
                <phil.icon className="w-8 h-8 text-[var(--color-primary)] mb-6 opacity-80 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-2xl font-semibold font-heading mb-6 text-[var(--color-text-main)]">{phil.title}</h3>
                
                <div className="mt-auto grid grid-cols-1 gap-3">
                  {phil.items.map((item, j) => (
                    <div 
                      key={j}
                      className="px-4 py-3 rounded-xl bg-[color-mix(in_srgb,var(--color-text-main)_3%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] text-sm text-[var(--color-text-muted)] font-medium text-left"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>

        {/* Interactive Tech Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
              Skill Network
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: 'linear-gradient(90deg, var(--color-primary), transparent)' }}
            />
          </div>
          <SkillGraph />
        </motion.div>
      </div>
    </section>
  );
}
