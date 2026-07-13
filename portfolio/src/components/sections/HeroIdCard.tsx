import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';

const AVATAR_SRC = '/avatar.png'; // Assuming it exists in public folder

interface HeroIdCardProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

// ── Dummy QR Code Component ──
const QRCode = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-gray-800" fill="currentColor">
    <rect x="10" y="10" width="25" height="25" rx="3" />
    <rect x="65" y="10" width="25" height="25" rx="3" />
    <rect x="10" y="65" width="25" height="25" rx="3" />
    <rect x="15" y="15" width="15" height="15" fill="#fafafa" />
    <rect x="70" y="15" width="15" height="15" fill="#fafafa" />
    <rect x="15" y="70" width="15" height="15" fill="#fafafa" />
    <rect x="18" y="18" width="9" height="9" />
    <rect x="73" y="18" width="9" height="9" />
    <rect x="18" y="73" width="9" height="9" />
    <rect x="45" y="10" width="10" height="20" rx="2" />
    <rect x="40" y="40" width="20" height="20" rx="2" />
    <rect x="70" y="45" width="20" height="10" rx="2" />
    <rect x="10" y="45" width="20" height="10" rx="2" />
    <rect x="45" y="70" width="45" height="20" rx="2" />
    <rect x="45" y="70" width="15" height="15" fill="#fafafa" />
    <rect x="48" y="73" width="9" height="9" />
  </svg>
);

export function HeroIdCard({ containerRef }: HeroIdCardProps) {
  // ── Responsive dimensions ────────────────────────────────────
  const [dims, setDims] = useState({ w: 260, h: 380, photoH: 260 });

  useEffect(() => {
    const updateDims = () => {
      const w = window.innerWidth;
      if (w < 640) setDims({ w: 220, h: 320, photoH: 220 });
      else if (w < 900) setDims({ w: 240, h: 350, photoH: 240 });
      else setDims({ w: 260, h: 380, photoH: 260 });
    };
    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, []);

  const BADGE_W = dims.w;
  const BADGE_H = dims.h;

  // ── Physics Values ────────────────────────────────────────────
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Pendulum simulation: Pivot is far above. 
  // Dragging left (x < 0) rotates clockwise (positive degrees).
  const PIVOT_L = 500;
  const rawRotate = useTransform(x, (latest) => {
    return Math.asin(Math.max(-0.99, Math.min(0.99, latest / PIVOT_L))) * (180 / Math.PI) * -1;
  });
  
  // Smooth out the rotation so it lags slightly for realistic momentum
  const smoothRotate = useSpring(rawRotate, { stiffness: 200, damping: 20, mass: 1 });

  // 3D Twist on drag (subtle torsion)
  const dragTwist = useTransform(x, [-300, 300], [15, -15]);
  const smoothTwist = useSpring(dragTwist, { stiffness: 100, damping: 15 });

  // Idle Swing state (base rotation)
  const idleRot = useMotionValue(0);

  // Combine Idle + Smooth pendulum rotation
  const totalRot = useMotionValue(0);
  useEffect(() => {
    const combine = () => totalRot.set(idleRot.get() + smoothRotate.get());
    const unsubIdle = idleRot.on('change', combine);
    const unsubSmooth = smoothRotate.on('change', combine);
    return () => { unsubIdle(); unsubSmooth(); };
  }, [idleRot, smoothRotate, totalRot]);

  // ── State ────────────────────────────────────────────────────
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const flipRotateY = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    flipRotateY.set(isFlipped ? 180 : 0);
  }, [isFlipped, flipRotateY]);

  // ── Refs ─────────────────────────────────────────────────────
  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lanyardRef = useRef<HTMLDivElement>(null);

  // ── Idle swinging animation ───────────────────────────────────
  useEffect(() => {
    let rafId: number;
    const start = Date.now();
    const tick = () => {
      if (!isDragging) {
        // Slow continuous pendulum swing (1-2 degrees)
        const t = (Date.now() - start) / 4500;
        idleRot.set(Math.sin(t * Math.PI * 2) * 1.5);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isDragging, idleRot]);

  // ── Update lanyard to follow hardware buckle ──────────────────
  const updateLanyard = useCallback(() => {
    if (!cardRef.current || !wrapperRef.current || !lanyardRef.current) return;
    const wrapRect = wrapperRef.current.getBoundingClientRect();

    const anchorX = wrapRect.width / 2;
    const anchorY = -1500; // Ceiling anchor

    // Center of the wrapper
    const centerX = wrapRect.width / 2;
    const centerY = wrapRect.height / 2;

    // Center of the card
    const cardCenterX = centerX + x.get();
    const cardCenterY = centerY + y.get();

    // Hardware cluster buckle pivot is at local y = -BADGE_H/2 - 75 from card center
    const radius = BADGE_H / 2 + 75;
    const angle = totalRot.get() * (Math.PI / 180);

    const buckleX = cardCenterX + Math.sin(angle) * radius;
    const buckleY = cardCenterY - Math.cos(angle) * radius;

    const dx = buckleX - anchorX;
    const dy = buckleY - anchorY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Angle to point the top-anchored lanyard at the buckle
    const rotation = Math.atan2(dy, dx) - Math.PI / 2;

    // Translate lanyard to the ceiling anchor and stretch it down to the buckle
    // Lanyard is w-[26px], so -13 centers it on the anchor.
    lanyardRef.current.style.height = `${distance}px`;
    lanyardRef.current.style.transform = `translate(${anchorX - 13}px, ${anchorY}px) rotate(${rotation}rad)`;

  }, [BADGE_H, x, y, totalRot]);

  useEffect(() => {
    const unsubX = x.on('change', updateLanyard);
    const unsubY = y.on('change', updateLanyard);
    const unsubRot = totalRot.on('change', updateLanyard);
    const onResize = () => updateLanyard();
    window.addEventListener('resize', onResize);

    let cancelled = false;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!cancelled) updateLanyard();
    }));

    return () => {
      cancelled = true;
      unsubX(); unsubY(); unsubRot();
      window.removeEventListener('resize', onResize);
    };
  }, [x, y, totalRot, updateLanyard]);

  // ── Handlers ────────────────────────────────────────────
  const handleDoubleClick = useCallback(() => setIsFlipped((f) => !f), []);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    setHasInteracted(true);
  }, []);

  const handleDragEnd = useCallback((_: any, info: any) => {
    setIsDragging(false);

    // Multi-stage spring physics for the pendulum release
    // Return -> Overshoot -> Bounce -> Oscillations -> Rest
    animate(x, 0, {
      type: 'spring',
      stiffness: 150,
      damping: 12,
      mass: 1.2,
      velocity: info.velocity.x
    });
    animate(y, 0, {
      type: 'spring',
      stiffness: 150,
      damping: 12,
      mass: 1.2,
      velocity: info.velocity.y
    });

  }, [x, y]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-full flex items-center justify-center pointer-events-none"
    >
      {/* ── Premium Fabric Lanyard Strap ── */}
      <div 
        ref={lanyardRef}
        className="absolute top-0 left-0 w-[26px] bg-[#111] z-0 flex flex-col items-center justify-end overflow-hidden"
        style={{
          boxShadow: 'inset 0 0 8px rgba(0,0,0,0.9), 2px 0 10px rgba(0,0,0,0.6)',
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)', // Woven fabric texture
          borderLeft: '1px dashed rgba(255,255,255,0.15)', // Edge stitching
          borderRight: '1px dashed rgba(255,255,255,0.15)',
          transformOrigin: 'top center',
          willChange: 'transform, height',
        }}
      >
        {/* Repeating Typography down the strap */}
        <div className="flex flex-col gap-12 pb-20 opacity-[0.35] select-none">
           {[...Array(12)].map((_, i) => (
             <div key={i} className="flex flex-col gap-1.5 items-center">
               {['R','O','H','I','T'].map((l, j) => (
                 <span key={j} className="text-[12px] font-bold text-white tracking-[0.2em]">{l}</span>
               ))}
             </div>
           ))}
        </div>
      </div>

      {/* ── Draggable Pendulum Body (Hardware + Badge) ── */}
      <motion.div
        ref={cardRef}
        drag
        dragMomentum={false}
        dragElastic={0.4}
        style={{ x, y, rotateZ: totalRot, rotateY: smoothTwist }}
        className="relative z-20 pointer-events-auto cursor-grab active:cursor-grabbing will-change-transform"
        onDoubleClick={handleDoubleClick}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        
        {/* Hardware Cluster (Pivots seamlessly with the badge) */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-[95px] flex flex-col items-center z-10 pointer-events-none w-14">
          
          {/* Matte Black Buckle */}
          <div className="w-8 h-10 bg-[#151515] rounded-t-sm rounded-b-md shadow-2xl relative z-30 flex flex-col items-center justify-end border-b-2 border-black"
               style={{ backgroundImage: 'linear-gradient(to bottom, #111, #1a1a1a)' }}>
            <div className="w-5 h-1.5 bg-[#0a0a0a] rounded-full mb-1 shadow-inner border border-white/5" />
          </div>

          {/* Chrome Metallic Clip */}
          <div className="w-4 h-12 bg-gradient-to-b from-gray-300 via-gray-100 to-gray-500 rounded-sm shadow-[inset_0_0_5px_rgba(255,255,255,0.8),0_4px_6px_rgba(0,0,0,0.5)] relative z-20 -mt-2 border-x border-white/80 flex flex-col items-center justify-end pb-1">
            <div className="w-2.5 h-2.5 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full shadow-inner" />
          </div>
          
          {/* Steel Key Ring */}
          <div className="w-7 h-7 border-[2.5px] border-gray-400 rounded-full shadow-lg relative z-10 -mt-[14px]" 
               style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(200,200,200,0) 50%, rgba(100,100,100,0.9) 100%)' }} />
          
          {/* Transparent Plastic Connector */}
          <div className="w-12 h-10 bg-white/20 backdrop-blur-md border border-white/40 rounded-sm shadow-sm relative z-20 -mt-[16px] flex flex-col items-center">
            {/* Cutout for ring */}
            <div className="w-4 h-3 bg-white/10 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] mt-1" />
            <div className="w-8 h-[2px] bg-white/40 rounded-full mt-3" />
          </div>

        </div>

        {/* Dynamic Floor Shadow */}
        <motion.div
          className="absolute -bottom-10 left-[10%] right-[10%] h-8 rounded-full pointer-events-none"
          animate={{
            opacity: isDragging ? 0.1 : 0.25,
            scaleX: isDragging ? 0.8 : 1,
            y: isDragging ? 30 : 0
          }}
          transition={{ duration: 0.4 }}
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.6), transparent 70%)',
            filter: 'blur(12px)',
          }}
        />

        {/* 3D Container */}
        <motion.div
          className="relative rounded-[20px] shadow-2xl"
          style={{
            perspective: 1200,
            transformStyle: 'preserve-3d',
            width: BADGE_W,
            height: BADGE_H,
            rotateY: flipRotateY,
            boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.8), inset 0 0 20px rgba(255,255,255,0.5)',
          }}
        >
          
          {/* ── FRONT FACE ── */}
          <div 
            className="absolute inset-0 bg-[#f4f4f5] rounded-[20px] overflow-hidden flex flex-col"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            {/* Portrait (edge-to-edge) */}
            <div className="relative w-full flex-1 overflow-hidden bg-gray-200">
              {AVATAR_SRC ? (
                <img
                  src={AVATAR_SRC}
                  alt="Rohit Sharma"
                  className="w-full h-full object-cover grayscale-[20%] contrast-125"
                  draggable={false}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 font-bold text-4xl">
                  RS
                </div>
              )}
            </div>
            
            {/* Info Section */}
            <div className="h-[95px] bg-[#f4f4f5] flex flex-col justify-center items-center text-center px-4 shrink-0 shadow-[0_-4px_15px_rgba(0,0,0,0.05)] z-10 relative">
              <h2 className="font-heading font-black text-2xl text-gray-900 tracking-tight leading-none uppercase mb-1">Rohit Sharma</h2>
              <div className="w-6 h-[2px] bg-purple-600 rounded-full mb-1.5" />
              <p className="font-sans text-[11px] font-bold text-gray-600 uppercase tracking-widest">AI Engineer</p>
              <p className="font-mono text-[9px] text-gray-400 absolute bottom-3 tracking-widest">EMP: RS-2026</p>
            </div>

            {/* Matte finish overlay */}
            <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")' }}
            />
          </div>

          {/* ── BACK FACE ── */}
          <div 
            className="absolute inset-0 bg-[#fafafa] rounded-[20px] overflow-hidden flex flex-col"
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)' 
            }}
          >
            {/* Header */}
            <div className="bg-gray-900 text-white pt-8 pb-4 px-6 text-center shadow-md">
              <h3 className="font-heading font-black text-lg tracking-widest uppercase">AI Engineer</h3>
              <p className="text-[10px] font-mono text-purple-300 mt-1 uppercase tracking-[0.2em]">Full Stack Architect</p>
            </div>

            <div className="flex-1 flex flex-col px-5 py-4 justify-between">
              
              {/* QR Codes Row */}
              <div className="flex justify-between items-center gap-4 px-2">
                <div className="flex flex-col items-center">
                  <div className="w-[60px] h-[60px] bg-white p-1 rounded-md shadow-sm border border-gray-200">
                    <QRCode />
                  </div>
                  <span className="text-[8px] font-bold uppercase text-gray-500 mt-1 tracking-widest">GitHub</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-[60px] h-[60px] bg-white p-1 rounded-md shadow-sm border border-gray-200">
                    <QRCode />
                  </div>
                  <span className="text-[8px] font-bold uppercase text-gray-500 mt-1 tracking-widest">Portfolio</span>
                </div>
              </div>

              {/* Technologies */}
              <div className="text-center">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Core Stack</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {['React', 'Node.js', 'Python', 'TensorFlow', 'AWS'].map((tech) => (
                     <span key={tech} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-sm text-[9px] font-semibold tracking-wide border border-gray-200">
                       {tech}
                     </span>
                  ))}
                </div>
              </div>

              {/* Contact & Status */}
              <div className="text-center">
                <p className="text-[11px] font-mono text-purple-600 font-bold mb-3">rohit.sharma.rnks@gmail.com</p>
                <div className="h-[1px] w-full bg-gray-200 mb-3" />
                <div className="flex items-center justify-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Open for Collaboration</p>
                </div>
              </div>

            </div>

            {/* Matte finish overlay */}
            <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")' }}
            />
          </div>

        </motion.div>

        {/* Flip hint (load only) */}
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 4, duration: 1.5 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-white/60 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
              Drag · Double-click to flip
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
