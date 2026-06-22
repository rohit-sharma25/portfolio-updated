import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { PremiumCard } from '../ui/PremiumCard';
import { ShieldAlert, Zap, Globe, Rocket, ExternalLink, Code2 } from 'lucide-react';

export function FeaturedProduct() {
  const details = [
    {
      icon: ShieldAlert,
      title: 'Problem',
      desc: 'Vehicle breakdowns create stress and delays.',
    },
    {
      icon: Zap,
      title: 'Solution',
      desc: 'An intelligent platform connecting users with nearby service providers.',
    },
    {
      icon: Globe,
      title: 'Vision',
      desc: 'Making roadside assistance faster and more accessible.',
    },
    {
      icon: Rocket,
      title: 'Future Potential',
      desc: 'Scalable marketplace ecosystem.',
    },
  ];

  return (
    <section id="product" className="relative py-24 md:py-32">
      <div className="container max-w-7xl mx-auto px-6">
        <SectionHeading title="AutoFixNow" subtitle="Featured Product Concept" />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Visual Showcase */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-[color-mix(in_srgb,var(--color-text-main)_2%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_8%,transparent)] group"
          >
            {/* AutoFixNow Image */}
            <img
              src="/AutoFixNow.png"
              alt="AutoFixNow platform preview"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Gradient overlay for better text readability on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Hover Reveal Links */}
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-6">
              <a href="https://autofixnow.onrender.com/login" className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                <ExternalLink className="w-6 h-6" />
              </a>
              <a href="https://github.com/rohit-sharma25/AutoFixNow" className="w-14 h-14 rounded-full bg-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_20%,transparent)] text-[var(--color-text-main)] flex items-center justify-center hover:bg-[color-mix(in_srgb,var(--color-text-main)_20%,transparent)] transition-colors">
                <Code2 className="w-6 h-6" />
              </a>
            </div>
          </motion.div>

          {/* Product Breakdown */}
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {details.map((item, i) => (
                <PremiumCard key={i} className="p-6">
                  <item.icon className="w-8 h-8 text-[var(--color-primary)] mb-4" />
                  <h3 className="text-xl font-semibold font-heading mb-2 text-[var(--color-text-main)]">{item.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed font-body">
                    {item.desc}
                  </p>
                </PremiumCard>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
