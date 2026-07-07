import { motion } from 'framer-motion';

interface DroneProps {
  onClick: () => void;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function Drone({ onClick, isHovered, onMouseEnter, onMouseLeave }: DroneProps) {
  return (
    <motion.div
      className="relative cursor-pointer z-50 flex items-center justify-center"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {/* Outer Glow Ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-purple-500/30"
        animate={{
          scale: isHovered ? 1.4 : [1, 1.1, 1],
          opacity: isHovered ? 0.8 : [0.3, 0.6, 0.3],
          rotate: 360
        }}
        transition={{
          rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
          scale: isHovered ? { type: 'spring' } : { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          opacity: isHovered ? { type: 'spring' } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }}
      />
      
      {/* Inner Core */}
      <motion.div
        className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center relative overflow-hidden"
        style={{
          boxShadow: '0 0 20px rgba(168, 85, 247, 0.4), inset 0 0 10px rgba(168, 85, 247, 0.2)'
        }}
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
      >
        <motion.div
          className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-purple-500"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}
