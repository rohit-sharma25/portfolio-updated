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
                I don't write code just to instruct machines; I write code to solve human friction. 
                Technology at its best should be invisible. It should feel like magic that seamlessly integrates into our daily lives, quietly empowering us to do more, be more, and experience more.
              </p>
              <p>
                I build because I am deeply curious about how the world works, and deeply unsatisfied with the parts that don't. Every line of code is an opportunity to make someone's day infinitesimally better. That compounding impact is what drives me.
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
                Design is not just how it looks; it's how it works. I approach engineering from a place of empathy. Before deciding on the architecture, the framework, or the database, I ask: <em className="text-[var(--color-text-main)]">Who is this for, and what are they trying to achieve?</em>
              </p>
              <p>
                I believe in constraints. Constraints breed creativity. They force you to distill a product down to its absolute essence. A well-designed system doesn't have everything—it only has exactly what is needed.
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
                I am drawn to complexity that hides behind simplicity. Systems where the backend does heavy lifting—processing data, leveraging AI, routing complex logic—so the frontend can remain perfectly clean, calm, and intuitive.
              </p>
              <p>
                I love bridging the gap between artificial intelligence and human interaction. Not chatbots that frustrate, but intelligent systems that genuinely understand context, anticipate needs, and augment human capability rather than replacing it.
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
                Good software should respect the user's time. It should load instantly, respond naturally, and never demand cognitive load to navigate.
              </p>
              <p>
                It should evoke an emotional response. When a user interacts with a product, they should feel a sense of craft. The subtle micro-interactions, the precise typography, the fluid motion—these aren't just aesthetic choices; they are a profound expression of care.
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
