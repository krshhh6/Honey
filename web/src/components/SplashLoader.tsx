'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FrontLandingLogo from './FrontLandingLogo';
import styles from './SplashLoader.module.css';

interface SplashLoaderProps {
  onComplete: () => void;
  durationMs?: number;
}

export default function SplashLoader({
  onComplete,
  durationMs = 1800, // 1.8 seconds smooth intro
}: SplashLoaderProps) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const timer = setTimeout(() => {
      onCompleteRef.current();
    }, durationMs);

    return () => clearTimeout(timer);
  }, [durationMs]);

  return (
    <motion.div
      className={styles.splashOverlay}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -40,
        scale: 0.98,
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
      }}
      onClick={() => onCompleteRef.current()}
      style={{ cursor: 'pointer' }}
    >
      {/* Background Honey Glow */}
      <motion.div
        className={styles.honeyGlow}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, delay: 0.2 }}
      />

      {/* Main Vector Bee Front Landing Logo - flies up from bottom to center */}
      <FrontLandingLogo showTagline={true} animateFlyIn={true} />
    </motion.div>
  );
}
