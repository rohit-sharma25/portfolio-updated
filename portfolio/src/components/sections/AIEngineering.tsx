import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { PremiumCard } from '../ui/PremiumCard';
import { Bot, Database, MessageSquare, Mic, Zap, Cpu } from 'lucide-react';

export function AIEngineering() {
  const systems = [
    {
      title: 'AI Agents',
      desc: 'Autonomous systems capable of reasoning, planning, and executing complex multi-step workflows without human intervention.',
      icon: Bot,
    },
    {
      title: 'RAG Pipelines',
      desc: 'Retrieval-Augmented Generation architectures that ground LLM responses in proprietary enterprise data.',
      icon: Database,
    },
    {
      title: 'NLP Applications',
      desc: 'Advanced text analysis, sentiment classification, and semantic search systems using state-of-the-art embedding models.',
      icon: MessageSquare,
    },
    {
      title: 'Voice Systems',
      desc: 'Real-time conversational voice assistants integrated with advanced speech-to-text and LLM processing.',
      icon: Mic,
    },
    {
      title: 'Automation',
      desc: 'Intelligent automation workflows that eliminate repetitive tasks and scale business operations exponentially.',
      icon: Zap,
    },
    {
      title: 'Machine Learning',
      desc: 'Custom predictive models and data pipelines designed to extract actionable insights from raw data.',
      icon: Cpu,
    },
  ];

  return (
    <section id="ai-engineering" className="relative py-24 md:py-32 border-t border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)]">
      <div className="container max-w-7xl mx-auto px-6">
        <SectionHeading title="AI Engineering" subtitle="Intelligent Systems" />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((sys, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <PremiumCard className="h-full flex flex-col group p-8">
                <div className="w-12 h-12 rounded-xl bg-[color-mix(in_srgb,var(--color-text-main)_3%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_8%,transparent)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <sys.icon className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-semibold font-heading mb-4 text-[var(--color-text-main)]">{sys.title}</h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed font-body">
                  {sys.desc}
                </p>
              </PremiumCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
