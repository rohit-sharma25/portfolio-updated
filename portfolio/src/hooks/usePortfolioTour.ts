import { useState, useCallback } from 'react';

export interface TourStep {
  id: string;
  targetSelector: string; // The CSS selector of the section to scroll to
  message: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'hero',
    targetSelector: '[data-ai-context="hero"]',
    message: "Hi! I'm R.AI, Rohit's digital twin. Let me show you around. This is the Hero section, where it all begins.",
  },
  {
    id: 'autofixnow',
    targetSelector: '[data-ai-context="autofixnow"]',
    message: "Here's AutoFixNow, one of Rohit's proudest projects from the Sabka AI Hackathon. He led the product planning here.",
  },
  {
    id: 'ai_engineering',
    targetSelector: '[data-ai-context="ai_engineering"]',
    message: "Rohit specializes in AI Engineering—building RAG systems, NLP applications, and AI Agents just like me.",
  },
  {
    id: 'projects',
    targetSelector: '[data-ai-context="projects"]',
    message: "Check out the rest of the projects, spanning from AI tools to Full Stack applications.",
  },
  {
    id: 'contact',
    targetSelector: '[data-ai-context="contact"]',
    message: "That concludes our quick tour! Feel free to explore more, or drop Rohit a message here. Have a great day!",
  }
];

export function usePortfolioTour() {
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const startTour = useCallback(() => {
    setIsActive(true);
    setCurrentStepIndex(0);
    scrollToStep(0);
  }, []);

  const endTour = useCallback(() => {
    setIsActive(false);
    setCurrentStepIndex(0);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      scrollToStep(nextIndex);
    } else {
      endTour();
    }
  }, [currentStepIndex, endTour]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      scrollToStep(prevIndex);
    }
  }, [currentStepIndex]);

  const scrollToStep = (index: number) => {
    const step = TOUR_STEPS[index];
    if (step) {
      const element = document.querySelector(step.targetSelector);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return {
    isActive,
    currentStep: TOUR_STEPS[currentStepIndex],
    currentStepIndex,
    totalSteps: TOUR_STEPS.length,
    startTour,
    endTour,
    nextStep,
    prevStep
  };
}
