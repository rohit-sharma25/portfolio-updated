import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';

export function BuildPhilosophy() {
  return (
    <section id="philosophy" className="relative py-24 md:py-32 border-t border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)] bg-[var(--color-background)]">
      <div className="container max-w-4xl mx-auto px-6">
        <SectionHeading title="Build Philosophy" subtitle="My Manifesto" />

        <div className="mt-16 md:mt-24 space-y-16 md:space-y-24 relative">
          
          {/* Subtle connecting line behind paragraphs */}
          <div className="absolute left-0 md:left-[-3rem] top-4 bottom-4 w-px bg-gradient-to-b from-[var(--color-primary)] via-[color-mix(in_srgb,var(--color-text-main)_20%,transparent)] to-transparent opacity-30" />

          {/* Section 1: Why I Build */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -left-3 md:-left-[3.35rem] top-2 w-6 h-6 rounded-full bg-[var(--color-background)] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)]" />
            </div>
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-[var(--color-text-main)] mb-6">
              Why I Build
            </h3>
            <div className="space-y-6 text-[var(--color-text-muted)] font-body text-base md:text-lg leading-relaxed">
              <p>
                I write code to solve human friction. Technology at its best should be invisible — seamlessly empowering us without demanding our attention.
              </p>
              <p>
                I build because I'm curious about how the world works, and unsatisfied with the parts that don't. Every line is a chance to make someone's day better.
              </p>
            </div>
          </motion.div>

          {/* Section 2: How I Think */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -left-3 md:-left-[3.35rem] top-2 w-6 h-6 rounded-full bg-[var(--color-background)] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[var(--color-text-main)] opacity-50" />
            </div>
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-[var(--color-text-main)] mb-6">
              How I Think
            </h3>
            <div className="space-y-6 text-[var(--color-text-muted)] font-body text-base md:text-lg leading-relaxed">
              <p>
                Design is how it works. I lead with empathy, asking: <em className="text-[var(--color-text-main)]">Who is this for, and what are they trying to achieve?</em>
              </p>
              <p>
                Constraints breed creativity. They distill a product to its essence — exactly what's needed, nothing more.
              </p>
            </div>
          </motion.div>

          {/* Section 3: What Problems Excite Me */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -left-3 md:-left-[3.35rem] top-2 w-6 h-6 rounded-full bg-[var(--color-background)] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[var(--color-text-main)] opacity-50" />
            </div>
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-[var(--color-text-main)] mb-6">
              The Problems That Excite Me
            </h3>
            <div className="space-y-6 text-[var(--color-text-muted)] font-body text-base md:text-lg leading-relaxed">
              <p>
                I'm drawn to complexity that hides behind simplicity. Heavy backend lifting so the frontend stays clean, calm, and intuitive.
              </p>
              <p>
                I love bridging AI and human interaction — systems that understand context, anticipate needs, and augment rather than replace.
              </p>
            </div>
          </motion.div>

          {/* Section 4: What Good Software Should Do */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -left-3 md:-left-[3.35rem] top-2 w-6 h-6 rounded-full bg-[var(--color-background)] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)]" />
            </div>
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-[var(--color-text-main)] mb-6">
              What Good Software Should Do
            </h3>
            <div className="space-y-6 text-[var(--color-text-muted)] font-body text-base md:text-lg leading-relaxed">
              <p>
                Good software respects your time — loads instantly, responds naturally, demands no cognitive overhead.
              </p>
              <p>
                It should evoke emotion. Micro-interactions, typography, motion — these aren't just aesthetics. They're a profound expression of care.
              </p>
              <p className="text-[var(--color-text-main)] font-medium pt-4 text-xl">
                Ultimately, good software doesn't just work. It feels right.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
