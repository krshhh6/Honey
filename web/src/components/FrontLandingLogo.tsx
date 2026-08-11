'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './FrontLandingLogo.module.css';

interface FrontLandingLogoProps {
  showTagline?: boolean;
  className?: string;
  style?: React.CSSProperties;
  animateFlyIn?: boolean;
}

export default function FrontLandingLogo({
  showTagline = true,
  className = '',
  style,
  animateFlyIn = false,
}: FrontLandingLogoProps) {
  return (
    <motion.div
      className={`${styles.logoContainer} ${className}`}
      style={style}
      initial={animateFlyIn ? { y: '65vh', opacity: 0 } : { opacity: 1, scale: 1 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        duration: animateFlyIn ? 1.4 : 0.6,
        ease: [0.16, 1, 0.3, 1], // Smooth organic deceleration to center
      }}
    >
      <div className={styles.logoWrapper}>
        {/* Yellow Bee SVG Vector Graphic */}
        <img
          src="/assets/bee-hero.svg"
          alt="Meadlight Yellow Bee Logo"
          className={styles.beeImage}
        />

        {/* SVG Overlay with Arched Text Path */}
        <motion.svg
          viewBox="0 0 800 500"
          className={styles.textOverlaySvg}
          xmlns="http://www.w3.org/2000/svg"
          initial={animateFlyIn ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: animateFlyIn ? 0.65 : 0 }}
        >
          <defs>
            {/* Smooth arch curve over bee wings */}
            <path
              id="titleArchCurve"
              d="M 100 230 C 260 115 540 115 700 230"
              fill="none"
            />
          </defs>

          {/* Arched "NATURAL BEE FARM" Header */}
          <text className={styles.archedTitle}>
            <textPath href="#titleArchCurve" startOffset="50%" textAnchor="middle">
              NATURAL BEE FARM
            </textPath>
          </text>

          {/* Subtitle "MOTHER OWNED" */}
          <text x="400" y="295" textAnchor="middle" className={styles.scriptSubtitle}>
            MOTHER OWNED
          </text>
        </motion.svg>
      </div>

      {showTagline && (
        <motion.p
          className={styles.tagline}
          initial={animateFlyIn ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: animateFlyIn ? 1.0 : 0 }}
        >
          Bee-ing as fast as possible
        </motion.p>
      )}
    </motion.div>
  );
}
