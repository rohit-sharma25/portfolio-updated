import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface DroneProps {
  onClick: () => void;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function Drone({ onClick, isHovered, onMouseEnter, onMouseLeave }: DroneProps) {
  return (
    <motion.div
      className="relative cursor-pointer z-50 flex items-center justify-center group"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {/* Outer Glow / Halo */}
      <motion.div
        className="absolute inset-0 blur-2xl bg-purple-500/40 rounded-full"
        animate={{
          scale: isHovered ? 1.6 : [1, 1.3, 1],
          opacity: isHovered ? 0.9 : [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Organic Floating Blob */}
      <motion.div
        className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center relative overflow-hidden backdrop-blur-xl border border-white/30 shadow-[0_0_30px_rgba(168,85,247,0.5),inset_0_0_20px_rgba(255,255,255,0.4)]"
        style={{
          background: 'linear-gradient(135deg, rgba(168,85,247,0.85), rgba(59,130,246,0.75))',
        }}
        animate={{
          scale: isHovered ? 1.15 : 1,
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%"
          ],
          rotate: isHovered ? 180 : 360
        }}
        transition={{
          borderRadius: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { type: "spring", stiffness: 300, damping: 15 }
        }}
      >
        {/* Inner core / eye that counters rotation to stay upright */}
        <motion.div 
          className="relative z-10 flex items-center justify-center"
          animate={{ rotate: isHovered ? -180 : -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
           <Sparkles className="w-6 h-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]" />
        </motion.div>
        
        {/* Shimmer effect inside blob */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent w-[200%] h-[200%]"
          animate={{
            x: ['-100%', '50%'],
            y: ['-100%', '50%']
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    </motion.div>
  );
}
