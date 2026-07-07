import { useState, useEffect } from 'react';

export type AIContext = 'hero' | 'autofixnow' | 'experience' | 'ai_engineering' | 'projects' | 'contact' | 'capabilities' | null;

export function useAIContext() {
  const [currentContext, setCurrentContext] = useState<AIContext>(null);

  useEffect(() => {
    // We will use IntersectionObserver to detect which section is currently in view.
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is intersecting most
        let maxRatio = 0;
        let activeId: string | null = null;
        
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            activeId = entry.target.getAttribute('data-ai-context');
          }
        });

        if (activeId) {
          setCurrentContext(activeId as AIContext);
        } else {
          setCurrentContext(null);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: [0.1, 0.5, 1.0] // check at different visibility milestones
      }
    );

    const sections = document.querySelectorAll('[data-ai-context]');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return { currentContext };
}
