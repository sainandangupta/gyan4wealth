import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Particle {
  id: number;
  x: string;    // CSS left %
  y: string;    // CSS top %
  size: number;  // px
  duration: number; // animation duration
  delay: number;
  opacity: number;
}

interface ParticlesProps {
  count?: number;
}

export const Particles: React.FC<ParticlesProps> = ({ count = 18 }) => {
  const shouldReduce = useReducedMotion();

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${60 + Math.random() * 40}%`, // spawn in lower 40% so they drift upward
      size: 2 + Math.random() * 4,      // 2-6 px
      duration: 8 + Math.random() * 6,   // 8-14s
      delay: Math.random() * 6,
      opacity: 0.15 + Math.random() * 0.2,
    }));
  }, [count]);

  if (shouldReduce) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -(200 + Math.random() * 300)],
            opacity: [p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};
