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

// Sections
import { Hero } from './components/sections/Hero';
import { FeaturedImpact } from './components/sections/FeaturedImpact';
import { GitHubStats } from './components/sections/GitHubStats';
import { About } from './components/sections/About';
import { FeaturedProduct } from './components/sections/FeaturedProduct';
import { AIEngineering } from './components/sections/AIEngineering';
import { Projects } from './components/sections/Projects';
import { Timeline } from './components/sections/Timeline';
import { BuildPhilosophy } from './components/sections/BuildPhilosophy';
import { Testimonials } from './components/sections/Testimonials';
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

    // Connect Lenis to GSAP's ticker as the single update loop
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Lenis expects milliseconds
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
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
      <CommandPalette isOpen={isCommandPaletteOpen} setIsOpen={setIsCommandPaletteOpen} />
      <MacDock onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
      
      <main className="relative z-10 w-full overflow-hidden">
        <Hero theme={theme} toggleTheme={toggleTheme} />

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
        <ParallaxSection offset={80}><About /></ParallaxSection>
        <ParallaxSection offset={100}><FeaturedProduct /></ParallaxSection>
        <ParallaxSection offset={90}><AIEngineering /></ParallaxSection>
        <ParallaxSection offset={70}><Projects /></ParallaxSection>
        <ParallaxSection offset={60}><Timeline /></ParallaxSection>
        <ParallaxSection offset={50}><GitHubStats /></ParallaxSection>
        <ParallaxSection offset={80}><BuildPhilosophy /></ParallaxSection>
        <ParallaxSection offset={60}><Testimonials /></ParallaxSection>
        <ParallaxSection offset={60}><CurrentlyReading /></ParallaxSection>
        <ParallaxSection offset={100}><Certifications /></ParallaxSection>
        <ParallaxSection offset={120}><Contact resumeUrl="/resume.pdf" /></ParallaxSection>
      </main>
    </div>
  );
}

export default App;
