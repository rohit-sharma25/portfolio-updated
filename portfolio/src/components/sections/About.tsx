import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { PremiumCard } from '../ui/PremiumCard';

export function About() {
  const bentoItems = [
    {
      title: "Who I Am",
      content: "I am an AI Engineer and Full Stack Architect dedicated to building software that feels invisible yet immensely powerful.",
      className: "md:col-span-2 md:row-span-2",
      titleSize: "text-2xl md:text-3xl"
    },
    {
      title: "Mission",
      content: "To bridge the gap between complex AI algorithms and intuitive, human-centric product design.",
      className: "md:col-span-1",
      titleSize: "text-xl"
    },
    {
      title: "Vision",
      content: "A future where intelligent digital tools empower users rather than overwhelm them.",
      className: "md:col-span-1",
      titleSize: "text-xl"
    },
    {
      title: "Current Focus",
      content: "Architecting autonomous agents and RAG pipelines for scalable enterprise workflows.",
      className: "md:col-span-2",
      titleSize: "text-xl"
    },
    {
      title: "Problem Solving",
      content: "I approach engineering as a product builder first. Code is just the medium; solving the right problem is the goal.",
      className: "md:col-span-1",
      titleSize: "text-xl"
    },
    {
      title: "Technology Passion",
      content: "I obsess over performance, clean architecture, and 60fps micro-interactions.",
      className: "md:col-span-1",
      titleSize: "text-xl"
    },
    {
      title: "Education & Growth",
      content: "A lifelong learner constantly adapting to the bleeding edge of machine learning and web technologies.",
      className: "md:col-span-2",
      titleSize: "text-xl"
    }
  ];

  return (
    <section id="about" className="relative py-24 border-t border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)]">
      <div className="container max-w-7xl mx-auto px-6">
        <SectionHeading title="The Architect" subtitle="About Me" className="mb-16" />
        
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-6">
          {bentoItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={item.className}
            >
              <PremiumCard className="h-full flex flex-col justify-center">
                <h3 className={`${item.titleSize} font-semibold font-heading mb-4 text-[var(--color-text-main)]`}>
                  {item.title}
                </h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed font-body">
                  {item.content}
                </p>
              </PremiumCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
