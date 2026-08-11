'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './AboutHero.module.css';

interface AboutHeroProps {
  headline?: string;
  subtext?: string;
  ctaText?: string;
  imageSrc?: string;
  imageAlt?: string;
  onCtaClick?: () => void;
}

export default function AboutHero({
  headline = 'MEADLIGHT DID NOT BEGIN AS A BRAND.',
  subtext = 'We started as a beekeeping community.',
  ctaText = 'Explore our complete journey',
  imageSrc = '/s1.avif',
  imageAlt = 'Beekeepers inspecting honeycomb frame in natural farm',
  onCtaClick,
}: AboutHeroProps) {
  // Staggered line variants
  const lineVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.12 },
    }),
  };

  const handleScrollToNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onCtaClick) {
      onCtaClick();
      return;
    }
    const target = document.getElementById('story-blocks');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.heroSection} aria-label="About Hero">
      <div className={styles.container}>
        {/* Left Column: Text & CTA */}
        <div className={styles.contentCol}>
          <h1 className={styles.headline}>
            {headline.split('.').map((part, idx) => {
              const textLine = part.trim();
              if (!textLine) return null;
              return (
                <motion.span
                  key={idx}
                  className={styles.headlineLine}
                  initial="hidden"
                  animate="visible"
                  custom={idx}
                  variants={lineVariant}
                >
                  {textLine}{idx === 0 ? '.' : ''}
                </motion.span>
              );
            })}
          </h1>

          <motion.p
            className={styles.subtext}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {subtext}
          </motion.p>

          <motion.a
            href="#story-blocks"
            onClick={handleScrollToNext}
            className={styles.ctaButton}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {ctaText}
          </motion.a>
        </div>

        {/* Right Column: Hero Image */}
        <motion.div
          className={styles.imageCol}
          initial={{ opacity: 0, scale: 0.96, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className={styles.imageFrame}>
            <img src={imageSrc} alt={imageAlt} className={styles.heroImage} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
