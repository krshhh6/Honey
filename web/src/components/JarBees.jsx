'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import styles from './JarBees.module.css';

const BEE_LANDING_SPOTS = [
  { id: 1, xPercent: 12, yPercent: 25, rot: -18, startFrom: { x: -350, y: -200 } },
  { id: 2, xPercent: 8, yPercent: 62, rot: -10, startFrom: { x: -400, y: 300 } },
  { id: 3, xPercent: 50, yPercent: 8, rot: 5, startFrom: { x: 100, y: -450 } },
  { id: 4, xPercent: 88, yPercent: 32, rot: 22, startFrom: { x: 500, y: -150 } },
  { id: 5, xPercent: 84, yPercent: 70, rot: 15, startFrom: { x: 450, y: 350 } },
];

export default function JarBees({ jarRef }) {
  const containerRef = useRef(null);
  const beeRefs = useRef([]);
  const wingsRefs = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      BEE_LANDING_SPOTS.forEach((spot, i) => {
        const beeEl = beeRefs.current[i];
        const wingsEl = wingsRefs.current[i];
        if (!beeEl) return;

        // Calculate landing position relative to jar dimensions
        const jarRect = jarRef?.current ? jarRef.current.getBoundingClientRect() : null;
        const targetX = jarRect ? (jarRect.width * spot.xPercent) / 100 : spot.xPercent * 3.5;
        const targetY = jarRect ? (jarRect.height * spot.yPercent) / 100 : spot.yPercent * 3.5;

        // Start off-screen
        gsap.set(beeEl, {
          x: spot.startFrom.x,
          y: spot.startFrom.y,
          scale: 0.7,
          rotation: spot.rot - 45,
          opacity: 0,
        });

        // 1. Entrance -> Landing Bounce Sequence via Timeline
        const tl = gsap.timeline({ delay: 0.35 + i * 0.35 });

        tl.to(beeEl, {
          x: targetX,
          y: targetY,
          rotation: spot.rot,
          scale: 1.15,
          opacity: 1,
          duration: 1.6 + Math.random() * 0.4,
          ease: 'power2.out',
        })
          .to(beeEl, {
            scale: 1.0,
            duration: 0.35,
            ease: 'back.out(1.7)',
          });

        // 2. Idle Wing Flutter Loop
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

        // 3. Settled Position Jitter Loop (Fixed on Jar)
        gsap.to(beeEl, {
          y: '+=3',
          x: '+=2',
          rotation: '+=4',
          duration: 1.8 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2.2 + i * 0.35,
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [jarRef]);

  return (
    <div ref={containerRef} className={styles.jarBeesContainer} aria-hidden="true">
      {BEE_LANDING_SPOTS.map((spot, i) => (
        <motion.div
          key={spot.id}
          ref={(el) => (beeRefs.current[i] = el)}
          className={styles.beeInstance}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <img
            ref={(el) => (wingsRefs.current[i] = el)}
            src="/assets/icons/bee-detailed.svg"
            alt=""
            className={styles.beeIcon}
          />
        </motion.div>
      ))}
    </div>
  );
}
