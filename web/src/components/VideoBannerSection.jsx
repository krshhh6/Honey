'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './VideoBannerSection.module.css';

export default function VideoBannerSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return (
    <section className={styles.section} aria-label="Beekeeping Video Story">
      {/* Seamless Organic Top Wave Separator (Matches ProductsSection background #fdf0ee) */}
      <div className={styles.sectionWaveTop} aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={styles.sectionWaveSvg}>
          <path
            fill="#fdf0ee"
            d="M0,0 L1440,0 L1440,64 C1344,64 1248,64 1152,53.3 C1056,43 960,21 864,21.3 C768,21 672,43 576,58.7 C480,75 384,85 288,80 C192,75 96,53 48,42.7 L0,32 Z"
          />
        </svg>
      </div>

      {/* Full-width Clickable Video Banner */}
      <div
        className={styles.bannerWrapper}
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        aria-label="Play honey making video"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setIsModalOpen(true);
        }}
      >
        {/* Background Beekeeping Photo Poster */}
        <img
          src="/h3.png"
          alt="Beekeepers harvesting honey frame from hive"
          className={styles.bgImage}
        />

        {/* Dark Radial Vignette Overlay */}
        <div className={styles.darkOverlay} />

        {/* Play Button & Label */}
        <div className={styles.centerContent}>
          <motion.div
            className={styles.playBtnRing}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <svg className={styles.playIcon} viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
          <p className={styles.playLabel}>LEARN HOW IT&apos;S MADE</p>
        </div>
      </div>

      {/* Lightbox Vimeo Video Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setIsModalOpen(false)}
                aria-label="Close video player"
              >
                ✕
              </button>

              <iframe
                className={styles.iframe}
                src="https://player.vimeo.com/video/44384072?autoplay=1&autopause=0"
                title="Learn How Honey Is Made - Beekeeping Story"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
