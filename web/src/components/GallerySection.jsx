'use client';

import React, { useState } from 'react';
import { CoverflowCarousel } from '@/components/ui/coverflow-carousel';
import styles from './GallerySection.module.css';

const GALLERY_SLIDES = [
  {
    src: '/assets/gallery/g1.jpg',
    alt: 'Beekeeper inspecting honeycomb frame under blue sky',
    title: 'Golden Honeycomb Harvest',
    subtitle: 'Italian Apennines Apiary',
    meta: [
      { label: 'Harvest', value: 'Summer 2026' },
      { label: 'Colonies', value: '45 Hives' },
      { label: 'Purity', value: '100% Raw' },
    ],
  },
  {
    src: '/assets/gallery/g2.jpg',
    alt: 'Close-up of worker bees on hive box',
    title: 'Hive Colony Vitality',
    subtitle: 'Apis Mellifera Sanctuary',
    meta: [
      { label: 'Species', value: 'Italian Honeybee' },
      { label: 'Flora', value: 'Wild Clover & Thyme' },
      { label: 'Status', value: 'Thriving' },
    ],
  },
  {
    src: '/assets/gallery/g4.jpg',
    alt: 'Smiling female beekeeper holding smoker tool',
    title: 'Master Artisans',
    subtitle: 'Traditional Sustainable Care',
    meta: [
      { label: 'Technique', value: 'Natural Smoker' },
      { label: 'Additives', value: 'Zero Chemicals' },
      { label: 'Care', value: 'Ethical Beekeeping' },
    ],
  },
  {
    src: '/assets/gallery/g3.jpg',
    alt: 'Bee collecting wildflower pollen',
    title: 'Wildflower Nectar Bloom',
    subtitle: 'High Altitude Flora',
    meta: [
      { label: 'Elevation', value: '1,200 meters' },
      { label: 'Nectar Source', value: 'Alpine Flora' },
      { label: 'Notes', value: 'Floral & Citrus' },
    ],
  },
  {
    src: '/assets/gallery/g5.jpg',
    alt: 'Two beekeepers in suits inspecting meadow hives',
    title: 'Meadow Sanctuary',
    subtitle: 'Organic Certified Apiary',
    meta: [
      { label: 'Location', value: 'Tuscan Hills' },
      { label: 'Environment', value: 'Pesticide Free' },
      { label: 'Cert', value: 'Bio-Organic' },
    ],
  },
  {
    src: '/assets/gallery/g6.jpg',
    alt: 'Pure raw honey glass jar with granola bars and wooden dipper',
    title: 'Artisanal Jarring',
    subtitle: 'Farm-to-Table Fresh',
    meta: [
      { label: 'Packaging', value: 'Recyclable Glass' },
      { label: 'Texture', value: 'Unfiltered Creamed' },
      { label: 'Pairing', value: 'Aged Cheese & Tea' },
    ],
  },
  {
    src: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&h=800&fit=crop&q=80&auto=format',
    alt: 'Golden raw honey pouring from wooden dipper',
    title: 'Liquid Amber',
    subtitle: 'Cold-Extracted Nectar',
    meta: [
      { label: 'Viscosity', value: 'Rich & Silky' },
      { label: 'Enzymes', value: 'Preserved Live' },
      { label: 'Color', value: 'Deep Amber' },
    ],
  },
  {
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=800&fit=crop&q=80&auto=format',
    alt: 'Morning sunlit mist over bee farm valley',
    title: 'Dawn Over the Apiary',
    subtitle: 'First Light Foraging',
    meta: [
      { label: 'Time', value: '6:00 AM Dawn' },
      { label: 'Climate', value: 'Crisp Alpine Air' },
      { label: 'Yield', value: 'Single Origin' },
    ],
  },
];

export default function GallerySection() {
  const [viewMode, setViewMode] = useState('coverflow');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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
        {/* Centered Header Section */}
        <header className={styles.header}>
          <h2 className={styles.mainTitle}>OUR GALLERY</h2>
          <p className={styles.description}>
            Meadlight is a true beehive of activity! Explore our 3D Coverflow gallery to experience life at our artisanal bee farm.
          </p>

          {/* View Switcher Toggle */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setViewMode('coverflow')}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                viewMode === 'coverflow'
                  ? 'bg-[#f3b233] text-[#1c1917] shadow-md scale-105'
                  : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300'
              }`}
            >
              3D Coverflow
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-[#f3b233] text-[#1c1917] shadow-md scale-105'
                  : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300'
              }`}
            >
              Classic Grid
            </button>
          </div>
        </header>

        {/* 3D Coverflow View */}
        {viewMode === 'coverflow' ? (
          <div className="my-8 rounded-3xl bg-stone-900/95 p-6 md:p-10 shadow-2xl backdrop-blur border border-amber-900/30">
            <CoverflowCarousel
              slides={GALLERY_SLIDES}
              showNavigation={true}
              showPagination={true}
              showCaption={true}
              cardWidth="clamp(220px, 28vw, 340px)"
              rotate={42}
              depth={0.65}
              fade={0.12}
            />
          </div>
        ) : (
          /* Classic Grid View */
          <div className={styles.galleryGrid}>
            {GALLERY_SLIDES.map((item, idx) => (
              <div
                key={idx}
                className={styles.gridItem}
                onClick={() => setSelectedPhoto(item)}
              >
                <img src={item.src} alt={item.alt} className={styles.photo} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal for Grid View */}
      {selectedPhoto && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedPhoto(null)}
        >
          <div className={styles.modalImageWrapper} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo view"
            >
              ✕
            </button>
            <img src={selectedPhoto.src} alt={selectedPhoto.alt} className={styles.modalImage} />
          </div>
        </div>
      )}
    </section>
  );
}
