// src/hooks/useMagneticHover.ts
'use client';
import { useRef, useCallback } from 'react';
import { useSpring, useMotionValue } from 'framer-motion';

interface MagneticHoverResult {
  ref: React.RefObject<HTMLElement | null>;
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
}

export function useMagneticHover(strength = 0.3): MagneticHoverResult {
  const ref = useRef<HTMLElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 200, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 200, damping: 20, mass: 0.5 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      rawX.set((e.clientX - cx) * strength);
      rawY.set((e.clientY - cy) * strength);
    },
    [rawX, rawY, strength]
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { ref: ref as React.RefObject<HTMLElement | null>, x, y, onMouseMove, onMouseLeave };
}
