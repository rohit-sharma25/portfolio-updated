import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className = '' }: SectionHeadingProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;
    
    const elements = container.current.children;
    gsap.fromTo(
      elements,
      { y: 50, opacity: 0, rotationX: -15 },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 85%',
        },
      }
    );
  }, { scope: container });

  return (
    <div ref={container} className={`flex flex-col gap-4 mb-12 md:mb-16 perspective-[1000px] ${className}`}>
      {subtitle && (
        <span className="text-[var(--color-primary)] font-medium tracking-wider uppercase text-sm md:text-base">
          {subtitle}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold font-heading tracking-tight">
        {title}
      </h2>
    </div>
  );
}
