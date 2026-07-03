import { useEffect, useRef } from 'react';

interface AuroraMeshProps {
  className?: string;
  variant?: 'dark' | 'light';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export function AuroraMesh({ className = '', variant = 'dark' }: AuroraMeshProps) {
  return (
    <canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}
