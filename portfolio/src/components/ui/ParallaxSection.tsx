import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  offset?: number;
  id?: string;
}

export function ParallaxSection({ children, className = '', offset = 200, id }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  return (
    <div ref={sectionRef} id={id} className="relative overflow-hidden">
      <motion.div style={{ y, opacity }} className={className}>
        {children}
      </motion.div>
    </div>
  );
}
