'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './GallerySection.module.css';

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    src: '/assets/gallery/g1.jpg',
    alt: 'Beekeeper inspecting honeycomb frame under blue sky',
  },
  {
    id: 2,
    src: '/assets/gallery/g2.jpg',
    alt: 'Close-up of worker bees on hive box',
  },
  {
    id: 3,
    src: '/assets/gallery/g4.jpg',
    alt: 'Smiling female beekeeper holding smoker tool',
  },
  {
    id: 4,
    src: '/assets/gallery/g3.jpg',
    alt: 'Bee collecting wildflower pollen',
  },
  {
    id: 5,
    src: '/assets/gallery/g5.jpg',
    alt: 'Two beekeepers in suits inspecting meadow hives',
  },
  {
    id: 6,
    src: '/assets/gallery/g6.jpg',
    alt: 'Pure raw honey glass jar with granola bars and wooden dipper',
  },
];

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  // Handle ESC key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    if (selectedPhoto) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedPhoto]);

  return (
    <section className={styles.section} aria-label="Our Gallery">
      {/* Seamless Organic Top Wave Separator */}
      <div className={styles.sectionWaveTop} aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={styles.sectionWaveSvg}>
          <path
            fill="#1c1917"
            d="M0,0 L1440,0 L1440,64 C1344,64 1248,64 1152,53.3 C1056,43 960,21 864,21.3 C768,21 672,43 576,58.7 C480,75 384,85 288,80 C192,75 96,53 48,42.7 L0,32 Z"
          />
        </svg>
      </div>

      {/* Honeycomb Pattern */}
      <div className={styles.honeycombBg} aria-hidden="true" />

      <div className={styles.container}>
        {/* Centered Header Section (Matching reference screenshot text) */}
        <header className={styles.header}>
          <h2 className={styles.mainTitle}>OUR GALLERY</h2>
          <p className={styles.description}>
            Meadlight is a true beehive of activity! Check out the latest news and events in our image gallery and see for yourself.
          </p>
        </header>

        {/* 6 Photo 3x2 Grid (Matching reference screenshot 1:1) */}
        <div className={styles.galleryGrid}>
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              className={styles.gridItem}
              onClick={() => setSelectedPhoto(item)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={item.src} alt={item.alt} className={styles.photo} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className={styles.modalImageWrapper}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close photo view"
              >
                ✕
              </button>

              <img src={selectedPhoto.src} alt={selectedPhoto.alt} className={styles.modalImage} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
