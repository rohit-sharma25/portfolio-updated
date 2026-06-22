import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export const BackgroundEffects = ({ theme }: { theme: 'dark' | 'light' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 }); // start offscreen

  // Handle Mouse Glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 45; // Minimalist count
    const connectionDistance = 150; // Distance to connect particles

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4 - 0.2, // slight upward drift
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isDark = theme === 'dark';
      // Subtle particle colors
      const particleColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)';
      const lineColorFn = (opacity: number) => isDark ? `rgba(255, 255, 255, ${opacity * 0.15})` : `rgba(0, 0, 0, ${opacity * 0.1})`;

      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Opacity based on distance
            const opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = lineColorFn(opacity);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  // Glow color based on theme
  const glowColor = theme === 'dark' 
    ? 'rgba(255, 255, 255, 0.06)' 
    : 'rgba(0, 0, 0, 0.04)';

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />
      
      {/* Cursor Glow */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 40%)`,
        }}
      />
    </div>
  );
};
