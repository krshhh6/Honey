'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './PlantBees.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PlantBeesProps {
  targetSectionRef?: React.RefObject<HTMLElement | null>;
}

const PLANT_LANDING_SPOTS = [
  { id: 1, targetX: 40, targetY: 60, rot: -22, startFrom: { x: -280, y: -150 } },
  { id: 2, targetX: 180, targetY: 140, rot: 15, startFrom: { x: -350, y: 220 } },
  { id: 3, targetX: 780, targetY: 90, rot: -10, startFrom: { x: 900, y: -200 } },
  { id: 4, targetX: 920, targetY: 220, rot: 25, startFrom: { x: 1000, y: 350 } },
  { id: 5, targetX: 520, targetY: 40, rot: 8, startFrom: { x: 500, y: -300 } },
];

export default function PlantBees({ targetSectionRef }: PlantBeesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const beeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wingsRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      PLANT_LANDING_SPOTS.forEach((spot, i) => {
        const beeEl = beeRefs.current[i];
        const wingsEl = wingsRefs.current[i];
        if (!beeEl) return;

        // Set initial off-screen start position
        gsap.set(beeEl, {
          x: spot.startFrom.x,
          y: spot.startFrom.y,
          scale: 0.65,
          rotation: spot.rot - 35,
          opacity: 0,
        });

        // ScrollTrigger sequence when plant section enters viewport
        const triggerEl = targetSectionRef?.current || containerRef.current;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerEl,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
          delay: 0.2 + i * 0.3,
        });

        // Curved Flight-in -> Landing bounce
        tl.to(beeEl, {
          x: spot.targetX,
          y: spot.targetY,
          rotation: spot.rot,
          scale: 1.15,
          opacity: 1,
          duration: 1.5 + Math.random() * 0.4,
          ease: 'power2.out',
        })
          .to(beeEl, {
            scale: 1.0,
            duration: 0.35,
            ease: 'back.out(1.7)',
          });

        // Idle Wing Flutter Loop once landed
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

        // Settled Position Jitter Loop on leaf/stem
        gsap.to(beeEl, {
          y: '+=3',
          x: '+=2',
          rotation: '+=4',
          duration: 1.9 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2.0 + i * 0.3,
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [targetSectionRef]);

  return (
    <div ref={containerRef} className={styles.plantBeesContainer} aria-hidden="true">
      {PLANT_LANDING_SPOTS.map((spot, i) => (
        <motion.div
          key={spot.id}
          ref={(el) => { beeRefs.current[i] = el; }}
          className={styles.beeInstance}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <img
            ref={(el) => { wingsRefs.current[i] = el; }}
            src="/assets/icons/bee-detailed.svg"
            alt=""
            className={styles.beeIcon}
          />
        </motion.div>
      ))}
    </div>
  );
}
