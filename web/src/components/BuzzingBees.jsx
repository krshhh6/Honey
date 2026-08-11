'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import styles from './BuzzingBees.module.css';

export default function BuzzingBees({ count = 5 }) {
  const containerRef = useRef(null);
  const beeRefs = useRef([]);
  const wingsRefs = useRef([]);
  const isFleeingRef = useRef([]);
  const pointerRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const beesArray = Array.from({ length: count });
    isFleeingRef.current = beesArray.map(() => false);

    const ctx = gsap.context(() => {
      // Initialize each bee position & idle animation loops
      beesArray.forEach((_, i) => {
        const beeEl = beeRefs.current[i];
        const wingsEl = wingsRefs.current[i];
        if (!beeEl) return;

        // Random initial coordinates within viewport padding
        const startX = Math.random() * (window.innerWidth - 120) + 60;
        const startY = Math.random() * (window.innerHeight - 120) + 60;

        gsap.set(beeEl, { x: startX, y: startY, scale: 1, rotation: Math.random() * 360 });

        // Continuous wing buzzing loop (0.08s fast oscillation)
        if (wingsEl) {
          gsap.to(wingsEl, {
            scaleY: 0.65,
            y: -1.5,
            duration: 0.08,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }

        // Function for randomized loose organic idle flight
        const flyRandom = () => {
          if (isFleeingRef.current[i] || !beeEl) return;

          const currX = gsap.getProperty(beeEl, 'x');
          const currY = gsap.getProperty(beeEl, 'y');

          const nextX = Math.random() * (window.innerWidth - 140) + 70;
          const nextY = Math.random() * (window.innerHeight - 140) + 70;

          // Face direction of travel
          const angle = Math.atan2(nextY - currY, nextX - currX) * (180 / Math.PI);

          const duration = 2.4 + Math.random() * 2.0;

          gsap.to(beeEl, {
            x: nextX,
            y: nextY,
            rotation: angle,
            duration,
            ease: 'power1.inOut',
            onComplete: () => {
              if (!isFleeingRef.current[i]) {
                flyRandom();
              }
            },
          });
        };

        // Start initial idle loop with staggered random delay
        const initialTimer = setTimeout(() => flyRandom(), i * 350);
        return () => clearTimeout(initialTimer);
      });

      // Throttled Pointer Proximity Check ('Flee' behavior)
      const checkProximity = () => {
        const { x: px, y: py } = pointerRef.current;

        if (px > 0 && py > 0) {
          beesArray.forEach((_, i) => {
            const beeEl = beeRefs.current[i];
            if (!beeEl || isFleeingRef.current[i]) return;

            const currX = gsap.getProperty(beeEl, 'x');
            const currY = gsap.getProperty(beeEl, 'y');

            const dist = Math.hypot(currX - px, currY - py);

            // Proximity threshold: 95px
            if (dist < 95) {
              isFleeingRef.current[i] = true;
              gsap.killTweensOf(beeEl);

              // Calculate fleeing vector opposite from pointer
              const fleeAngle = Math.atan2(currY - py, currX - px);
              const fleeDistance = 180 + Math.random() * 90;

              let targetX = currX + Math.cos(fleeAngle) * fleeDistance;
              let targetY = currY + Math.sin(fleeAngle) * fleeDistance;

              // Keep within viewport bounds
              targetX = Math.max(50, Math.min(window.innerWidth - 70, targetX));
              targetY = Math.max(50, Math.min(window.innerHeight - 70, targetY));

              // Fast startled flee animation
              gsap.to(beeEl, {
                x: targetX,
                y: targetY,
                rotation: fleeAngle * (180 / Math.PI),
                scale: 1.35,
                duration: 0.45,
                ease: 'power4.out',
                onComplete: () => {
                  gsap.to(beeEl, { scale: 1.0, duration: 0.25 });
                  setTimeout(() => {
                    isFleeingRef.current[i] = false;
                    // Resume idle flight loop
                    const currX2 = gsap.getProperty(beeEl, 'x');
                    const currY2 = gsap.getProperty(beeEl, 'y');
                    const nextX2 = Math.random() * (window.innerWidth - 140) + 70;
                    const nextY2 = Math.random() * (window.innerHeight - 140) + 70;
                    const angle2 = Math.atan2(nextY2 - currY2, nextX2 - currX2) * (180 / Math.PI);

                    gsap.to(beeEl, {
                      x: nextX2,
                      y: nextY2,
                      rotation: angle2,
                      duration: 2.8,
                      ease: 'power1.inOut',
                      onComplete: function loopAgain() {
                        if (!isFleeingRef.current[i] && beeEl) {
                          const currentX = gsap.getProperty(beeEl, 'x');
                          const currentY = gsap.getProperty(beeEl, 'y');
                          const nx = Math.random() * (window.innerWidth - 140) + 70;
                          const ny = Math.random() * (window.innerHeight - 140) + 70;
                          const ang = Math.atan2(ny - currentY, nx - currentX) * (180 / Math.PI);

                          gsap.to(beeEl, {
                            x: nx,
                            y: ny,
                            rotation: ang,
                            duration: 2.8 + Math.random() * 1.5,
                            ease: 'power1.inOut',
                            onComplete: loopAgain,
                          });
                        }
                      },
                    });
                  }, 450);
                },
              });
            }
          });
        }

        rafRef.current = requestAnimationFrame(checkProximity);
      };

      rafRef.current = requestAnimationFrame(checkProximity);

      const handlePointerMove = (e) => {
        pointerRef.current = { x: e.clientX, y: e.clientY };
      };

      const handleTouchStart = (e) => {
        if (e.touches && e.touches[0]) {
          pointerRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      };

      window.addEventListener('mousemove', handlePointerMove, { passive: true });
      window.addEventListener('touchstart', handleTouchStart, { passive: true });

      return () => {
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('touchstart', handleTouchStart);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [count]);

  return (
    <div ref={containerRef} className={styles.container} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          ref={(el) => (beeRefs.current[i] = el)}
          className={styles.beeWrapper}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 * i, ease: 'backOut' }}
        >
          <div className={styles.beeInner}>
            <div className={styles.fleeGlow} />
            <img
              ref={(el) => (wingsRefs.current[i] = el)}
              src="/assets/icons/step-2.svg"
              alt=""
              className={styles.beeIcon}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
