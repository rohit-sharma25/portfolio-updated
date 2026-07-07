import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { BookOpen, GraduationCap, ExternalLink } from 'lucide-react';

interface ReadingItem {
  title: string;
  author?: string;
  type: 'book' | 'course' | 'topic';
  description: string;
  progress?: string;
}

const readingItems: ReadingItem[] = [
  {
    title: 'Deep Learning with Python',
    author: 'François Chollet',
    type: 'book',
    description: 'Mastering neural networks, TensorFlow, and Keras for advanced AI applications.',
    progress: '60%',
  },
  {
    title: 'System Design Interview',
    author: 'Alex Xu',
    type: 'book',
    description: 'Architecting scalable distributed systems and preparing for system design rounds.',
    progress: '40%',
  },
  {
    title: 'Building Microservices',
    author: 'Sam Newman',
    type: 'book',
    description: 'Designing, building, and deploying microservice architectures in production.',
    progress: '25%',
  },
  {
    title: 'Advanced LangChain Patterns',
    type: 'course',
    description: 'Building production-ready RAG pipelines and autonomous agent workflows.',
    progress: '75%',
  },
];

export function CurrentlyReading() {
  return (
    <section id="learning" className="relative py-24 md:py-32 border-t border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        <SectionHeading title="Currently Learning" subtitle="Always Growing" />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {readingItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="relative group h-full p-6 md:p-8 rounded-2xl bg-[color-mix(in_srgb,var(--color-text-main)_2%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_6%,transparent)] hover:border-[var(--color-primary)]/30 transition-all duration-500 backdrop-blur-xl overflow-hidden">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-[color-mix(in_srgb,var(--color-text-main)_3%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_8%,transparent)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      {item.type === 'book' ? (
                        <BookOpen className="w-6 h-6 text-[var(--color-primary)]" />
                      ) : (
                        <GraduationCap className="w-6 h-6 text-[var(--color-primary)]" />
                      )}
                    </div>
                    {/* Pulse dot */}
                    <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500">
                      <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-40" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold font-heading text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition-colors">
                        {item.title}
                      </h3>
                      {item.progress && (
                        <span className="shrink-0 text-xs font-mono text-[var(--color-text-muted)] opacity-60 tabular-nums">
                          {item.progress}
                        </span>
                      )}
                    </div>

                    {item.author && (
                      <p className="text-sm text-[var(--color-text-muted)] mt-1 opacity-70">
                        by {item.author}
                      </p>
                    )}

                    <p className="text-sm text-[var(--color-text-muted)] mt-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Progress bar */}
                    {item.progress && (
                      <div className="mt-4 h-1 rounded-full bg-[color-mix(in_srgb,var(--color-text-main)_6%,transparent)] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: item.progress }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
                        />
                      </div>
                    )}

                    {/* Type badge */}
                    <div className="flex items-center gap-2 mt-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider text-[var(--color-text-muted)] bg-[color-mix(in_srgb,var(--color-text-main)_4%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_6%,transparent)]">
                        {item.type === 'book' ? '📖 Reading' : item.type === 'course' ? '🎓 Course' : '🔬 Exploring'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-sm text-[var(--color-text-muted)] opacity-50 mt-12 font-mono"
        >
          "The only way to do great work is to love what you learn." — continuous improvement
        </motion.p>
      </div>
    </section>
  );
}
