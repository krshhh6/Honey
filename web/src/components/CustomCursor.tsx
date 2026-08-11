'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only render on desktop pointer devices
    if (typeof window === 'undefined') return;

    const isDesktopPointer = window.matchMedia('(pointer: fine)').matches && window.innerWidth > 768;
    if (!isDesktopPointer) return;

    const dot = dotRef.current;
    if (!dot) return;

    // Initial GSAP setup — smooth centered tracking
    gsap.set(dot, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      scale: 1,
    });

    // Fast, responsive GSAP quickTo setters (duration: 0.35s) for tight trailing follow
    const xTo = gsap.quickTo(dot, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.35, ease: 'power3.out' });

    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to(dot, { opacity: 0.9, duration: 0.2 });
      }
      // Offset slightly to create a subtle trailing/chasing effect near real cursor
      xTo(e.clientX + 6);
      yTo(e.clientY + 6);
    };

    // Subtle scale change on hover over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = target.closest(
        'a, button, input, textarea, select, [role="button"], .cursor-hover-target, .circleBadge, [onClick]'
      );

      if (isInteractive) {
        gsap.to(dot, {
          scale: 1.65,
          opacity: 1,
          duration: 0.25,
          ease: 'power2.out',
        });
      } else {
        gsap.to(dot, {
          scale: 1,
          opacity: 0.9,
          duration: 0.25,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeaveWindow = () => {
      gsap.to(dot, { opacity: 0, duration: 0.2 });
    };

    const handleMouseEnterWindow = () => {
      gsap.to(dot, { opacity: 0.9, duration: 0.2 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, []);

  return <div ref={dotRef} className={styles.orangeDot} aria-hidden="true" />;
}
