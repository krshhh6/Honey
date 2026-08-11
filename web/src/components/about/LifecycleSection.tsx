'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './LifecycleSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// SVG Icon component for value-added products
function IconValueAdded() {
  return (
    <svg width="68" height="68" viewBox="0 0 64 64" fill="none">
      <rect x="14" y="16" width="36" height="36" rx="4" fill="#f3b233" transform="rotate(-12 32 34)" />
      <line x1="22" y1="22" x2="42" y2="42" stroke="#1a1a1a" strokeWidth="3" />
      <line x1="42" y1="22" x2="22" y2="42" stroke="#1a1a1a" strokeWidth="3" />
    </svg>
  );
}

// Data Arrays
interface LifecycleItem {
  id: string;
  label: string;
  image?: string;
  Icon?: React.ComponentType;
}

const BLOSSOM_TO_BOTTLE_ITEMS: LifecycleItem[] = [
  { id: 'bb-1', label: 'Ethical honey harvesting', image: '/assets/icons/blossom-1.png' },
  { id: 'bb-2', label: 'Filtration & bottling at world class facility', image: '/assets/icons/blossom-2.png' },
  { id: 'bb-3', label: 'Industrial bottling', image: '/assets/icons/blossom-3.png' },
  { id: 'bb-4', label: 'Private labelling & B2B supply', image: '/assets/icons/blossom-4.png' },
  { id: 'bb-5', label: 'Traceability & testing', image: '/assets/icons/blossom-5.png' },
  { id: 'bb-6', label: 'Other value added products', Icon: IconValueAdded },
];

const LIFE_AROUND_HIVE_ITEMS: LifecycleItem[] = [
  { id: 'lh-1', label: 'Bee breeding & colony supply', image: '/assets/icons/hive-1.png' },
  { id: 'lh-2', label: 'Beekeeper training & ecosystem building', image: '/assets/icons/hive-2.png' },
  { id: 'lh-3', label: 'Pollination & agricultural support', image: '/assets/icons/hive-3.png' },
  { id: 'lh-4', label: 'Managed Bee Farms', image: '/assets/icons/hive-4.png' },
  { id: 'lh-5', label: 'Equipment manufacturing', image: '/assets/icons/hive-5.png' },
  { id: 'lh-6', label: 'Digital tools & apiary tracking', image: '/assets/icons/hive-6.png' },
];

const METRICS_DATA = [
  {
    id: 'm-1',
    image: '/assets/metrics/metric-1.png',
    alt: 'Beekeeper figure illustration',
    bgClass: styles.metricBlockBlue,
    number: '25000+',
    label: 'trained farmers, beekeepers & tribals',
  },
  {
    id: 'm-2',
    image: '/assets/metrics/metric-2.png',
    alt: 'Bee farmer sourcing illustration',
    bgClass: styles.metricBlockGreen,
    number: '4000+',
    label: 'bee farmer ecosystem for sourcing',
  },
  {
    id: 'm-3',
    image: '/assets/metrics/metric-3.png',
    alt: 'Honey processing funnel illustration',
    bgClass: styles.metricBlockTerracotta,
    number: '150+',
    label: 'MT per month honey processing capacity',
  },
];

export default function LifecycleSection() {
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Section 1 GSAP ScrollTrigger animation
    if (section1Ref.current) {
      const titles = section1Ref.current.querySelectorAll(`.${styles.title}, .${styles.subtitle}`);
      const cards = section1Ref.current.querySelectorAll(`.${styles.iconCard}`);

      gsap.fromTo(
        titles,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section1Ref.current,
            start: 'top 82%',
          },
        }
      );

      gsap.fromTo(
        cards,
        { opacity: 0, y: 32, scale: 0.82 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: section1Ref.current,
            start: 'top 76%',
          },
        }
      );
    }

    // Section 2 GSAP ScrollTrigger animation
    if (section2Ref.current) {
      const titles = section2Ref.current.querySelectorAll(`.${styles.title}, .${styles.subtitle}`);
      const cards = section2Ref.current.querySelectorAll(`.${styles.iconCard}`);

      gsap.fromTo(
        titles,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top 82%',
          },
        }
      );

      gsap.fromTo(
        cards,
        { opacity: 0, y: 32, scale: 0.82 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top 76%',
          },
        }
      );
    }

    // Impact Section GSAP animation
    if (impactRef.current) {
      const metrics = impactRef.current.querySelectorAll(`.${styles.metricCard}`);

      gsap.fromTo(
        metrics,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: impactRef.current,
            start: 'top 78%',
          },
        }
      );
    }
  }, []);

  return (
    <>
      {/* ── Terracotta Section 1: From blossom to bottle ────────────────────── */}
      <section ref={section1Ref} className={styles.terracottaSection1} aria-label="From blossom to bottle">
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>From blossom to bottle,</h2>
            <p className={styles.subtitle}>
              Meadlight works across the entire honey lifecycle.
            </p>
          </div>

          <div className={styles.iconGrid}>
            {BLOSSOM_TO_BOTTLE_ITEMS.map(({ id, label, image, Icon }) => (
              <div key={id} className={styles.iconCard}>
                <div className={styles.iconWrapper}>
                  {image ? (
                    <img src={image} alt={label} className={styles.iconImage} />
                  ) : Icon ? (
                    <Icon />
                  ) : null}
                </div>
                <p className={styles.iconLabel}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Terracotta Section 2: Life around the hive ─────────────────────── */}
      <section ref={section2Ref} className={styles.terracottaSection2} aria-label="Life around the hive">
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Life around the hive:</h2>
            <p className={styles.subtitle}>
              Meadlight builds the ecosystem that makes beekeeping possible.
            </p>
          </div>

          <div className={styles.iconGrid}>
            {LIFE_AROUND_HIVE_ITEMS.map(({ id, label, image, Icon }) => (
              <div key={id} className={styles.iconCard}>
                <div className={styles.iconWrapper}>
                  {image ? (
                    <img src={image} alt={label} className={styles.iconImage} />
                  ) : Icon ? (
                    <Icon />
                  ) : null}
                </div>
                <p className={styles.iconLabel}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Over 15+ years of work impact counter ──────────────── */}
      <section ref={impactRef} className={styles.impactSection} aria-label="Over 15+ years of work impact">
        <div className={styles.container}>
          <div className={styles.impactHeader}>
            <h2 className={styles.impactTitle}>
              Over 15+ years of work with bees, farmers, and honey,
            </h2>
            <p className={styles.impactSubtitle}>
              This ecosystem was built step by step. Today, our scale looks like this:
            </p>
          </div>

          <div className={styles.metricGrid}>
            {METRICS_DATA.map((metric) => (
              <div key={metric.id} className={styles.metricCard}>
                <div className={`${styles.metricBlock} ${metric.bgClass}`}>
                  <img src={metric.image} alt={metric.alt} className={styles.metricImage} />
                </div>
                <div className={styles.metricTextWrapper}>
                  <p className={styles.metricNumber}>{metric.number}</p>
                  <p className={styles.metricLabel}>{metric.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
