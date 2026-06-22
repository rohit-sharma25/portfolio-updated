import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';

function Counter({ end, suffix = '', duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      // Use easeOutQuart
      const t = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - t, 4);
      
      setCount(Math.floor(end * easeOut));
      
      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function FeaturedImpact() {
  const stats = [
    { label: 'Projects Built', value: 40, suffix: '+' },
    { label: 'Technologies Learned', value: 25, suffix: '+' },
    { label: 'AI Systems Developed', value: 12, suffix: '+' },
    { label: 'Continuous Learning Hours', value: 1000, suffix: '+' },
  ];

  return (
    <section id="impact" className="relative py-24 md:py-32 overflow-hidden border-t border-[color-mix(in_srgb,var(--color-text-main)_5%,transparent)]">
      <div className="container max-w-7xl mx-auto px-6">
        <SectionHeading title="Impact by the Numbers" subtitle="Global Reach" className="items-center text-center mb-16 md:mb-24" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              className="flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="text-5xl md:text-6xl font-semibold font-heading text-transparent bg-clip-text bg-gradient-to-b from-[var(--color-text-main)] to-[var(--color-text-muted)]">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm md:text-base font-medium text-[var(--color-text-muted)] tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
