import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Moon, Sun } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { HeroIdCard } from './HeroIdCard';

// Particle system
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.3 + 0.05,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30" />;
}

interface HeroProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export function Hero({ theme, toggleTheme }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 900], [0, 280]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const onMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setGlowPos({ x: (clientX / innerWidth) * 100, y: (clientY / innerHeight) * 100 });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-background)]"
    >
      {/* Particle Layer */}
      <Particles />

      {/* Animated Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* Cursor-responsive Glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-all duration-500"
        style={{
          background: `radial-gradient(800px circle at ${glowPos.x}% ${glowPos.y}%, rgba(168,85,247,0.06), transparent 50%)`
        }}
      />

      {/* Main layout */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="container relative z-10 max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center min-h-screen py-24"
      >
        {/* ─── LEFT: Text ─── */}
        <div className="flex flex-col items-start space-y-8 lg:max-w-[580px]">
          {/* Role badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 px-4 py-2 rounded-full border border-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] bg-[color-mix(in_srgb,var(--color-text-main)_3%,transparent)] backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" style={{ boxShadow: '0 0 8px color-mix(in srgb, var(--color-primary) 80%, transparent)' }} />
            <span className="text-sm font-medium text-[color-mix(in_srgb,var(--color-text-main)_60%,transparent)] tracking-[0.06em]">
              AI Engineer&nbsp;&nbsp;•&nbsp;&nbsp;Full Stack Architect
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,8vw,5.5rem)] font-semibold font-heading tracking-tight leading-[1.0] text-[var(--color-text-main)]"
          >
            ROHIT<br />SHARMA
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-[color-mix(in_srgb,var(--color-text-main)_50%,transparent)] max-w-md leading-[1.7] font-body"
          >
            <span className="text-[color-mix(in_srgb,var(--color-text-main)_90%,transparent)] font-medium">
              Building Intelligent Digital Products That Solve Real-World Problems.
            </span>
            <br />
            <span className="text-[color-mix(in_srgb,var(--color-text-main)_50%,transparent)]">
              AI-powered systems, modern web applications, and scalable products.
            </span>
          </motion.p>

          {/* Personal human detail */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.24 }}
            className="text-sm text-[color-mix(in_srgb,var(--color-text-main)_30%,transparent)] font-mono tracking-wide"
          >
            I turn ideas into products — not just code.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              className="bg-[var(--color-text-main)] text-[var(--color-background)] font-semibold px-8 py-4 hover:opacity-90 transition-all text-[15px]"
              onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore My Work
            </MagneticButton>
            <a
              href="#contact"
              className="group flex items-center gap-2 px-7 py-4 rounded-full border border-[color-mix(in_srgb,var(--color-text-main)_12%,transparent)] bg-[color-mix(in_srgb,var(--color-text-main)_3%,transparent)] text-[color-mix(in_srgb,var(--color-text-main)_80%,transparent)] hover:text-[var(--color-text-main)] hover:border-[color-mix(in_srgb,var(--color-text-main)_25%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-text-main)_6%,transparent)] transition-all duration-300 font-medium text-[15px] backdrop-blur-sm"
            >
              Let's Build Together
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <MagneticButton
              className="bg-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] border border-[color-mix(in_srgb,var(--color-text-main)_15%,transparent)] text-[color-mix(in_srgb,var(--color-text-main)_80%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-text-main)_20%,transparent)] transition-colors px-7 py-4 text-[15px]"
              onClick={toggleTheme}
            >
              <span className="flex items-center gap-2">
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </MagneticButton>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2"
          >
            {[
              { dot: 'bg-[color-mix(in_srgb,var(--color-text-main)_30%,transparent)]', text: 'Building AutoFixNow' },
              { dot: 'bg-[color-mix(in_srgb,var(--color-text-main)_30%,transparent)]', text: 'AI Systems' },
              { dot: 'bg-emerald-400', text: 'Open to Opportunities', glow: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.dot}`}
                  style={item.glow ? { boxShadow: '0 0 6px rgba(52,211,153,0.9)' } : {}}
                />
                <span className="text-sm font-mono text-[color-mix(in_srgb,var(--color-text-main)_40%,transparent)]">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ─── RIGHT: Draggable ID Card ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center lg:-translate-x-32 xl:-translate-x-48"
          style={{ minWidth: 280, minHeight: 420 }}
        >
          <HeroIdCard containerRef={sectionRef} />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-[color-mix(in_srgb,var(--color-text-main)_30%,transparent)] to-transparent"
        />
        <span className="text-[10px] font-mono text-[color-mix(in_srgb,var(--color-text-main)_20%,transparent)] tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
