import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps extends React.ComponentPropsWithoutRef<typeof motion.button> {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function MagneticButton({
  children,
  className = '',
  intensity = 0.2,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * intensity, y: middleY * intensity });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 font-medium transition-colors ${className}`}
      {...props}
    >
      <span className="relative z-10 pointer-events-none">{children}</span>
    </motion.button>
  );
}
