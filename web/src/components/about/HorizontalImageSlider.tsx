'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './HorizontalImageSlider.module.css';

export interface SliderImageItem {
  id: string;
  src: string;
  alt: string;
}

const SLIDER_IMAGES: SliderImageItem[] = [
  {
    id: 'img-2',
    src: '/assets/gallery/gallery-2.jpg',
    alt: 'Beekeeper in yellow shirt tending to wooden hive box',
  },
  {
    id: 'img-3',
    src: '/assets/gallery/gallery-3.jpg',
    alt: 'Traditional wooden beehive box on post surrounded by green foliage',
  },
  {
    id: 'img-4',
    src: '/assets/gallery/gallery-4.jpg',
    alt: 'Beekeeper inspecting raw honeycomb frame with visitors',
  },
  {
    id: 'img-8',
    src: '/assets/gallery/gallery-8.jpg',
    alt: 'Apiculture workshop training session on beehive construction',
  },
  {
    id: 'img-5',
    src: '/assets/gallery/gallery-5.jpg',
    alt: 'Warehouse storage with blue barrels of pure honey',
  },
  {
    id: 'img-6',
    src: '/assets/gallery/gallery-6.jpg',
    alt: 'Honey processing facility interior with organized pallets',
  },
  {
    id: 'img-7',
    src: '/assets/gallery/gallery-7.jpg',
    alt: 'Exterior view of modern honey processing and bottling facility',
  },
];

export default function HorizontalImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Maximum scroll step calculation
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, SLIDER_IMAGES.length - itemsPerPage);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Optional subtle auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <section className={styles.sliderSection} aria-label="Apiculture Ecosystem Slider">
      {/* Heading Text Group */}
      <div className={styles.textContainer}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Today, Meadlight is an apiculture company.
        </motion.h2>
        <motion.p
          className={styles.subtext}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          From bee breeding to honey bottling, we operate across the ecosystem.
        </motion.p>
      </div>

      {/* Full-Width Horizontal Sliding Carousel */}
      <div className={styles.carouselWrapper}>
        {/* Prev Arrow Button */}
        <button
          className={`${styles.navButton} ${styles.navButtonPrev}`}
          onClick={handlePrev}
          aria-label="Previous Slide"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Next Arrow Button */}
        <button
          className={`${styles.navButton} ${styles.navButtonNext}`}
          onClick={handleNext}
          aria-label="Next Slide"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Sliding Viewport */}
        <div className={styles.sliderViewport}>
          <div
            className={styles.sliderTrack}
            style={{
              transform: `translateX(-${currentIndex * 33.333}%)`,
            }}
          >
            {SLIDER_IMAGES.map((img) => (
              <div key={img.id} className={styles.slideItem}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className={styles.slideImage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
