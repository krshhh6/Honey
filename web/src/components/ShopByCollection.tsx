'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './ShopByCollection.module.css';

interface CollectionItem {
  id: string;
  label: string;
  image: string;
  alt: string;
  link: string;
}

const COLLECTIONS: CollectionItem[] = [
  {
    id: 'multifloral',
    label: 'Multifloral Honey →',
    image: '/B1.png',
    alt: 'Meadlight Multifloral Fermented Honey Drink',
    link: '/collections/multifloral-honey',
  },
  {
    id: 'single-origin',
    label: 'Single Origin Honey →',
    image: '/B2.png',
    alt: 'Meadlight Single Origin Honey Drink',
    link: '/collections/single-origin-honey',
  },
  {
    id: 'beekeeping',
    label: 'Beekeeping Equipment →',
    image: '/B3.png',
    alt: 'Meadlight Beekeeping Equipment & Reserve',
    link: '/collections/beekeeping-equipment',
  },
];

export default function ShopByCollection() {
  return (
    <section className={styles.section} aria-label="Shop By Collection">
      {/* Seamless Organic Top Wave Separator (Matches preceding section color #fdf0ee) */}
      <div className={styles.sectionWaveTop} aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={styles.sectionWaveSvg}>
          <path
            fill="#fdf0ee"
            d="M0,0 L1440,0 L1440,64 C1344,64 1248,64 1152,53.3 C1056,43 960,21 864,21.3 C768,21 672,43 576,58.7 C480,75 384,85 288,80 C192,75 96,53 48,42.7 L0,32 Z"
          />
        </svg>
      </div>

      <div className={styles.container}>
        {/* Section Header Row: Title Left + View All Link Right */}
        <div className={styles.headerRow}>
          <h2 className={styles.sectionTitle}>SHOP BY COLLECTION</h2>
          <a href="/collections" className={styles.viewAllLink}>
            VIEW ALL →
          </a>
        </div>

        {/* 3-Column Static Grid (Matching reference screenshot 1:1) */}
        <div className={styles.cardsGrid}>
          {COLLECTIONS.map((col, idx) => (
            <motion.a
              key={col.id}
              href={col.link}
              className={styles.cardLink}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Full-Bleed Background Image */}
              <img src={col.image} alt={col.alt} className={styles.bgImage} />

              {/* Top-Right Label Badge */}
              <div className={styles.topRightBadge}>
                <span>{col.label}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
