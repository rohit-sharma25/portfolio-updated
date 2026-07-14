import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SEO, personStructuredData } from './components/SEO';

// UI Components
import { ParallaxSection } from './components/ui/ParallaxSection';
import { MacDock } from './components/ui/MacDock';
import { CommandPalette } from './components/ui/CommandPalette';
import { BackgroundEffects } from './components/ui/BackgroundEffects';
import { AICompanion } from './components/ui/AICompanion';
import { StoryConnector } from './components/ui/StoryConnector';

// Sections
import { Hero } from './components/sections/Hero';
import { FeaturedImpact } from './components/sections/FeaturedImpact';
import { GitHubStats } from './components/sections/GitHubStats';
import { About } from './components/sections/About';
import { EngineeringCapabilities } from './components/sections/EngineeringCapabilities';
import { FeaturedProductsCinematic } from './components/sections/FeaturedProductsCinematic';
import { Projects } from './components/sections/Projects';
import { Timeline } from './components/sections/Timeline';
import { BuildPhilosophy } from './components/sections/BuildPhilosophy';
import { Certifications } from './components/sections/Certifications';
import { CurrentlyReading } from './components/sections/CurrentlyReading';
import { Contact } from './components/sections/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = window.localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  const [themeTransitioning, setThemeTransitioning] = useState(false);

  const toggleTheme = useCallback(() => {
    setThemeTransitioning(true);
    // After the overlay starts fading in, switch the theme
    setTimeout(() => {
      setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }, 80);
    // Let the overlay fade out after the theme swap
    setTimeout(() => {
      setThemeTransitioning(false);
    }, 350);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    // Connect Lenis to GSAP's ticker as the single update loop
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Lenis expects milliseconds
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      (window as any).__lenis = undefined;
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-main)] font-body selection:bg-[var(--color-primary)] selection:text-white">
      <SEO
        jsonLd={personStructuredData()}
        ogType="profile"
      />
      <BackgroundEffects theme={theme} />
      <AICompanion />
      <CommandPalette isOpen={isCommandPaletteOpen} setIsOpen={setIsCommandPaletteOpen} />
      <MacDock onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
      
      <main className="relative z-10 w-full overflow-x-clip">
        <div data-ai-context="hero">
          <Hero theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* Theme transition overlay — a brief crossfade that makes the change feel deliberate */}
        <AnimatePresence>
          {themeTransitioning && (
            <motion.div
              key="theme-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeInOut' }}
              className="fixed inset-0 z-[100] pointer-events-none"
              style={{
                background: theme === 'dark'
                  ? 'rgba(255,255,255,0.50)'
                  : 'rgba(5,5,5,0.55)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
            />
          )}
        </AnimatePresence>
        <ParallaxSection offset={120}><FeaturedImpact /></ParallaxSection>
        
        <StoryConnector text="Every great product starts with a problem." />
        
        <ParallaxSection offset={80}><About /></ParallaxSection>
        <ParallaxSection offset={80}><EngineeringCapabilities /></ParallaxSection>
        
        <FeaturedProductsCinematic />
        
        <StoryConnector text="My curiosity evolved into intelligent systems." />
        
        <div data-ai-context="projects">
          <ParallaxSection offset={70}><Projects /></ParallaxSection>
        </div>
        
        <StoryConnector text="Every project became another lesson in product design." />
        
        <div data-ai-context="experience">
          <ParallaxSection offset={60}><Timeline /></ParallaxSection>
        </div>
        
        <StoryConnector text="Experience isn't just time spent, it's problems solved." />
        <ParallaxSection offset={50}><GitHubStats /></ParallaxSection>
        
        <StoryConnector text="How do I think about software?" />
        
        <ParallaxSection offset={80}><BuildPhilosophy /></ParallaxSection>
        <ParallaxSection offset={60}><CurrentlyReading /></ParallaxSection>
        
        <StoryConnector text="Learning never stops." />
        
        <ParallaxSection offset={100}><Certifications /></ParallaxSection>
        
        <StoryConnector text="Now let's build something meaningful." />
        
        <div data-ai-context="contact">
          <ParallaxSection offset={120}><Contact resumeUrl="/resume.pdf" /></ParallaxSection>
        </div>
      </main>
    </div>
  );
}

export default App;
