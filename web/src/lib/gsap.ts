// src/lib/gsap.ts — GSAP plugin registration (must be called once, client-side only)
'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

// Register plugins — safe to call multiple times (GSAP deduplicates)
export function registerGSAPPlugins() {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
}

// Shared GSAP defaults — keep animations on GPU-composited properties only
export const GSAP_DEFAULTS = {
  ease: 'power3.out',
  duration: 0.9,
};

// Helper: create a smooth ScrollTrigger reveal
export function createReveal(
  element: Element | string,
  options: Partial<ScrollTrigger.Vars> = {}
) {
  return gsap.fromTo(
    element,
    { y: 48, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 88%',
        toggleActions: 'play none none none',
        ...options,
      },
    }
  );
}

export { gsap, ScrollTrigger };
