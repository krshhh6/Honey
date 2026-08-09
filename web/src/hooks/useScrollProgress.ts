// src/hooks/useScrollProgress.ts
'use client';
import { useEffect, useRef } from 'react';
import { useMotionValue } from 'framer-motion';

/**
 * Returns a MotionValue [0, 1] representing scroll progress
 * of a given element relative to the viewport.
 */
export function useScrollProgress() {
  const ref = useRef<HTMLElement>(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const total = rect.height + windowH;
      const scrolled = windowH - rect.top;
      progress.set(Math.max(0, Math.min(1, scrolled / total)));
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [progress]);

  return { ref: ref as React.RefObject<HTMLElement | null>, progress };
}
