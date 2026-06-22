import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Award } from 'lucide-react';

export function Certifications() {
  const certifications = [
    { title: 'Advanced Machine Learning Specialization', issuer: 'Placeholder University', year: '2024' },
    { title: 'Cloud Architecture Professional', issuer: 'Placeholder Cloud', year: '2023' },
    { title: 'Full Stack Engineering Certificate', issuer: 'Placeholder Institute', year: '2022' },
    { title: 'AI Product Strategy', issuer: 'Placeholder Executive', year: '2024' },
  ];

  return (
    <section id="certifications" className="relative py-24 border-t border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6">
        <SectionHeading title="Continuous Growth" subtitle="Certifications" className="mb-12" />

        <div className="flex overflow-x-auto pb-8 -mx-6 px-6 snap-x snap-mandatory hide-scrollbar gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="snap-start shrink-0 w-[300px] md:w-[400px]"
            >
              <div className="h-full p-6 rounded-2xl bg-[color-mix(in_srgb,var(--color-text-main)_2%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] flex items-start gap-4">
                <div className="mt-1 w-10 h-10 shrink-0 rounded-full bg-[color-mix(in_srgb,var(--color-text-main)_3%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_8%,transparent)] flex items-center justify-center">
                  <Award className="w-5 h-5 text-[var(--color-primary)] opacity-80" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-heading text-[var(--color-text-main)] leading-tight mb-1">{cert.title}</h3>
                  <p className="text-sm font-medium text-[var(--color-text-muted)] mb-3">{cert.issuer}</p>
                  <span className="px-2 py-1 rounded bg-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] text-xs font-mono text-[var(--color-text-muted)]">{cert.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
