import { useEffect, useRef, useState, useCallback, type ElementType } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, BrainCircuit, LayoutTemplate, Building2, Lightbulb, Bot, Moon, Sun } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

// ─── AVATAR CONFIG ───────────────────────────────────────────────
// Drop your photo into src/assets/ and set the path below.
// e.g. import avatarSrc from '../assets/rohit.jpg';
// Then set: const AVATAR_SRC = avatarSrc;
const AVATAR_SRC: string | null = null; // null = show monogram placeholder

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

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-50" />;
}

// Orbital ring with icons using trigonometry
interface TechNode {
  icon: ElementType;
  label: string;
  angle: number;
}

function OrbitRing({ radius, speed, nodes, counterRotate = false }: {
  radius: number;
  speed: number;
  nodes: TechNode[];
  counterRotate?: boolean;
}) {
  return (
    <motion.div
      className="absolute rounded-full border border-[color-mix(in_srgb,var(--color-text-main)_6%,transparent)]"
      style={{
        width: radius * 2,
        height: radius * 2,
        top: '50%',
        left: '50%',
        marginTop: -radius,
        marginLeft: -radius,
      }}
      animate={{ rotate: counterRotate ? -360 : 360 }}
      transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
    >
      {nodes.map((node, i) => {
        const angleDeg = node.angle;
        const angleRad = (angleDeg * Math.PI) / 180;
        const x = radius + radius * Math.cos(angleRad) - 24;
        const y = radius + radius * Math.sin(angleRad) - 24;
        return (
          <motion.div
            key={i}
            className="absolute w-12 h-12 rounded-full bg-[var(--color-secondary)] border border-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] flex flex-col items-center justify-center shadow-xl shadow-[color-mix(in_srgb,var(--color-text-main)_60%,transparent)] cursor-default group"
            style={{ left: x, top: y }}
            animate={{ rotate: counterRotate ? 360 : -360 }}
            transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
          >
            <node.icon className="w-5 h-5 text-[color-mix(in_srgb,var(--color-text-main)_60%,transparent)] group-hover:text-[var(--color-primary)] transition-colors duration-300" />
            {/* Label tooltip */}
            <span className="absolute -bottom-7 text-[10px] font-mono text-[color-mix(in_srgb,var(--color-text-main)_40%,transparent)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {node.label}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
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

  const springCfg = { damping: 30, stiffness: 100 };
  const avatarX = useSpring(0, springCfg);
  const avatarY = useSpring(0, springCfg);

  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 }); // percentage

  const onMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY, currentTarget } = e as MouseEvent & { currentTarget: Window };
    const { innerWidth, innerHeight } = window;
    const nx = (clientX / innerWidth - 0.5) * 2;
    const ny = (clientY / innerHeight - 0.5) * 2;
    avatarX.set(nx * 12);
    avatarY.set(ny * 12);
    setGlowPos({ x: (clientX / innerWidth) * 100, y: (clientY / innerHeight) * 100 });
  }, [avatarX, avatarY]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove as any);
    return () => window.removeEventListener('mousemove', onMouseMove as any);
  }, [onMouseMove]);

  // Each orbit node = one of Rohit's five core pillars
  const outerNodes: TechNode[] = [
    { icon: BrainCircuit,   label: 'AI Engineering',   angle: 0   },
    { icon: LayoutTemplate, label: 'Full Stack',        angle: 72  },
    { icon: Building2,      label: 'Architecture',      angle: 144 },
    { icon: Lightbulb,      label: 'Product Design',    angle: 216 },
    { icon: Bot,            label: 'Automation',        angle: 288 },
  ];

  // Orbital radii — responsive to viewport; avatar is ~192px (w-48) on desktop
  const [orbitRadius, setOrbitRadius] = useState(200);

  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      if (w < 480) setOrbitRadius(110);
      else if (w < 768) setOrbitRadius(140);
      else if (w < 1024) setOrbitRadius(170);
      else setOrbitRadius(200);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-background)]"
    >
      {/* Particle Layer */}
      <Particles />

      {/* Animated Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* Radial Gradient Base */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 70% 50%, rgba(168,85,247,0.07) 0%, transparent 70%)' }}
      />

      {/* Cursor-responsive Glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-all duration-300"
        style={{
          background: `radial-gradient(700px circle at ${glowPos.x}% ${glowPos.y}%, rgba(168,85,247,0.08), transparent 50%)`
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

        {/* ─── RIGHT: Avatar + Orbit ─── */}
        <motion.div
          className="relative flex items-center justify-center order-first lg:order-last"
          style={{ width: orbitRadius * 2 + 100, height: orbitRadius * 2 + 100, minWidth: 200, minHeight: 200 }}
        >
          {/* Outer glow blob behind orbit */}
          <div className="absolute rounded-full opacity-20 blur-[80px] w-72 h-72"
            style={{ background: 'radial-gradient(circle, rgba(168,85,247,1) 0%, rgba(124,58,237,0.5) 60%, transparent 100%)' }} />

          {/* Orbit ring with tech icons */}
          {orbitRadius > 0 && <OrbitRing radius={orbitRadius} speed={35} nodes={outerNodes} />}

          {/* Avatar: parallax + float */}
          <motion.div
            style={{ x: avatarX, y: avatarY }}
            className="relative z-20"
          >
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
              className="relative"
            >
              {/* Glow ring */}
              <div className="absolute -inset-4 rounded-full opacity-30"
                style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.6) 0%, transparent 70%)', filter: 'blur(20px)' }} />

              {/* Avatar shell — swap AVATAR_SRC above to show your real photo */}
              <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full border border-[color-mix(in_srgb,var(--color-text-main)_10%,transparent)] overflow-hidden shadow-2xl shadow-[color-mix(in_srgb,var(--color-text-main)_50%,transparent)]"
                style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-text-main) 6%, transparent) 0%, color-mix(in srgb, var(--color-text-main) 2%, transparent) 100%)' }}
              >
                {AVATAR_SRC ? (
                  <img
                    src={AVATAR_SRC}
                    alt="Rohit Sharma"
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  /* Monogram placeholder — shown until you add your photo */
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2"
                    style={{ background: 'radial-gradient(circle at 40% 30%, rgba(168,85,247,0.12) 0%, transparent 60%)' }}
                  >
                    <span className="font-heading text-[4.5rem] font-semibold leading-none select-none"
                      style={{ color: 'rgba(255,255,255,0.18)' }}
                    >RS</span>
                    <span className="text-[9px] font-mono tracking-[0.25em] uppercase"
                      style={{ color: 'rgba(255,255,255,0.10)' }}
                    >your photo here</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
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
