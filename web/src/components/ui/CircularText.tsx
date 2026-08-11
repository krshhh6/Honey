'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import styles from './CircularText.module.css';

export interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
  className?: string;
}

type TransitionConfig = {
  rotate: {
    from: number;
    to: number;
    ease: string;
    duration: number;
    type: string;
    repeat: number;
  };
  scale: {
    type: string;
    damping: number;
    stiffness: number;
  };
};

type PauseTransitionConfig = {
  rotate: { type: string; damping: number; stiffness: number };
  scale: { type: string; damping: number; stiffness: number };
};

export default function CircularText({
  text,
  spinDuration = 20,
  onHover = 'speedUp',
  className = '',
}: CircularTextProps) {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  const getRotationTransition = useCallback((duration: number, from: number, loop = true) => ({
    from,
    to: from + 360,
    ease: 'linear' as const,
    duration,
    type: 'tween' as const,
    repeat: loop ? Infinity : 0,
  }), []);

  const getTransition = useCallback((duration: number, from: number): TransitionConfig => ({
    rotate: getRotationTransition(duration, from),
    scale: {
      type: 'spring' as const,
      damping: 20,
      stiffness: 300,
    },
  }), [getRotationTransition]);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  }, [spinDuration, text, onHover, controls, rotation, getTransition]);

  const handleHoverStart = () => {
    const start = rotation.get();
    if (!onHover) return;

    let transitionConfig: TransitionConfig | PauseTransitionConfig;
    let scaleVal = 1;

    switch (onHover) {
      case 'slowDown':
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case 'speedUp':
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case 'pause':
        transitionConfig = {
          rotate: { type: 'spring', damping: 20, stiffness: 300 },
          scale: { type: 'spring', damping: 20, stiffness: 300 },
        };
        scaleVal = 1;
        break;
      case 'goBonkers':
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig,
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  };

  return (
    <motion.div
      className={`${styles.circularText} ${className}`}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`;

        return (
          <span key={i} style={{ transform, WebkitTransform: transform }}>
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
}
