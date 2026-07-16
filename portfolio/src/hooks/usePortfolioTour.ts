import { useState, useCallback, useEffect } from 'react';

export interface TourStep {
  id: string;
  targetSelector: string; // The CSS selector of the section to scroll to
  message: string;
  label: string; // Short label for progress display
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'hero',
    targetSelector: '[data-ai-context="hero"]',
    message: "Hi! I'm R.AI, Rohit's digital twin. This is where it all begins — the Hero section. Get a glimpse of who Rohit is and what he builds.",
    label: 'Home',
  },
  {
    id: 'impact',
    targetSelector: '[data-ai-context="impact"]',
    message: "Here's the impact in numbers! 15+ projects built, 20+ technologies learned, and 500+ hours of continuous learning.",
    label: 'Impact',
  },
  {
    id: 'about',
    targetSelector: '[data-ai-context="about"]',
    message: "This is the About section — Rohit's mission, vision, and the story behind his journey into AI engineering.",
    label: 'About',
  },
  {
    id: 'capabilities',
    targetSelector: '[data-ai-context="capabilities"]',
    message: "Rohit specializes in AI Engineering — building RAG systems, NLP applications, AI Agents, and complex data pipelines.",
    label: 'Capabilities',
  },
  {
    id: 'autofixnow',
    targetSelector: '[data-ai-context="autofixnow"]',
    message: "AutoFixNow — Rohit's hackathon flagship! A real-time marketplace connecting drivers with nearby mechanics. He led the product planning here.",
    label: 'AutoFixNow',
  },
  {
    id: 'projects',
    targetSelector: '[data-ai-context="projects"]',
    message: "Swipe through the full project collection — AI tools, full-stack apps, UI/UX designs, and more. Each card has a detailed case study.",
    label: 'Projects',
  },
  {
    id: 'experience',
    targetSelector: '[data-ai-context="experience"]',
    message: "The Timeline lays out Rohit's professional journey — from early explorations to building AI-powered products.",
    label: 'Experience',
  },
  {
    id: 'github',
    targetSelector: '[data-ai-context="github"]',
    message: "Live GitHub stats — contributions, repos, and the open-source footprint Rohit is building every day.",
    label: 'GitHub',
  },
  {
    id: 'philosophy',
    targetSelector: '[data-ai-context="philosophy"]',
    message: "The Build Philosophy — how Rohit thinks about software. Empathy, constraints, and craft over speed.",
    label: 'Philosophy',
  },
  {
    id: 'learning',
    targetSelector: '[data-ai-context="learning"]',
    message: "Learning never stops. Here's what Rohit is currently reading, studying, and exploring to stay ahead.",
    label: 'Learning',
  },
  {
    id: 'certifications',
    targetSelector: '[data-ai-context="certifications"]',
    message: "Certifications, hackathons, and internships — proof of Rohit's commitment to continuous growth.",
    label: 'Certifications',
  },
  {
    id: 'contact',
    targetSelector: '[data-ai-context="contact"]',
    message: "That's the full tour! Every project, every skill, every philosophy — all here. If something resonates, drop Rohit a message. Let's build something meaningful!",
    label: 'Contact',
  }
];

export function usePortfolioTour() {
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const scrollToStep = useCallback((index: number) => {
    const step = TOUR_STEPS[index];
    if (step) {
      const element = document.querySelector(step.targetSelector);
      if (element) {
        const lenis = (window as any).__lenis;
        if (lenis) {
          lenis.scrollTo(element, {
            duration: 1.4,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, []);

  const startTour = useCallback(() => {
    setIsActive(true);
    setCurrentStepIndex(0);
    setTimeout(() => scrollToStep(0), 100);
  }, [scrollToStep]);

  const endTour = useCallback(() => {
    setIsActive(false);
    setIsAutoPlaying(false);
    setCurrentStepIndex(0);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      setTimeout(() => scrollToStep(nextIndex), 100);
    } else {
      endTour();
    }
  }, [currentStepIndex, endTour, scrollToStep]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      setTimeout(() => scrollToStep(prevIndex), 100);
    }
  }, [currentStepIndex, scrollToStep]);

  const jumpToStep = useCallback((index: number) => {
    if (index >= 0 && index < TOUR_STEPS.length) {
      setCurrentStepIndex(index);
      setTimeout(() => scrollToStep(index), 100);
    }
  }, [scrollToStep]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev);
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlaying || !isActive) return;
    const interval = setInterval(() => {
      if (currentStepIndex < TOUR_STEPS.length - 1) {
        nextStep();
      } else {
        setIsAutoPlaying(false);
        endTour();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isActive, currentStepIndex, nextStep, endTour]);

  return {
    isActive,
    currentStep: TOUR_STEPS[currentStepIndex],
    currentStepIndex,
    totalSteps: TOUR_STEPS.length,
    startTour,
    endTour,
    nextStep,
    prevStep,
    jumpToStep,
    isAutoPlaying,
    toggleAutoPlay,
  };
}
