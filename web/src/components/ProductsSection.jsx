'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PlantBees from './PlantBees';
import styles from './ProductsSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PRODUCTS = [
  {
    id: 1,
    name: 'Principio Classic Honey',
    desc: 'Lightly sparkling fermented wildflower honey drink with fresh citrus essence.',
    price: '$8.50',
    badge: 'Best Seller',
    image: '/B1.png',
  },
  {
    id: 2,
    name: 'Hibiscus Honey Nectar',
    desc: 'Untouched 100% raw hibiscus honey infusion harvested directly from pristine apiaries.',
    price: '$16.00',
    badge: '100% Organic',
    image: '/B2.png',
  },
  {
    id: 3,
    name: 'Ginger Lemon Honey',
    desc: 'Artisanal fermented honey infused with organic ginger root and fresh Sicilian lemon.',
    price: '$22.00',
    badge: 'Limited Harvest',
    image: '/B3.png',
  },
];

export default function ProductsSection() {
  const sectionRef = useRef(null);
  const botanicalLeftRef = useRef(null);
  const botanicalRightRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // 1. Botanical Floating Parallax
      if (botanicalLeftRef.current) {
        gsap.to(botanicalLeftRef.current, {
          y: 45,
          rotate: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
        gsap.to(botanicalLeftRef.current, {
          y: -10,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (botanicalRightRef.current) {
        gsap.to(botanicalRightRef.current, {
          y: -40,
          rotate: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
        gsap.to(botanicalRightRef.current, {
          y: 10,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // 2. Products Cards Floating Parallax & Bobbing
      cardRefs.current.forEach((cardEl, index) => {
        if (!cardEl) return;

        gsap.to(cardEl, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: cardEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });

        gsap.to(cardEl, {
          y: -8,
          rotation: index % 2 === 0 ? 0.8 : -0.8,
          duration: 3.6 + index * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Our Craft Selection - Products">
      {/* Background Pattern */}
      <div className={styles.honeycombBg} aria-hidden="true" />

      {/* Seamless Organic Top Wave Separator (Matches Section 05 color #fdf0ee) */}
      <div className={styles.sectionWaveTop} aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={styles.sectionWaveSvg}>
          <path
            fill="#fdf0ee"
            d="M0,0 L1440,0 L1440,64 C1344,64 1248,64 1152,53.3 C1056,43 960,21 864,21.3 C768,21 672,43 576,58.7 C480,75 384,85 288,80 C192,75 96,53 48,42.7 L0,32 Z"
          />
        </svg>
      </div>

      {/* Eucalyptus Botanical Decor (Left & Right) */}
      <img
        ref={botanicalLeftRef}
        src="/assets/eucalyptus.png"
        alt=""
        className={styles.botanicalLeft}
        aria-hidden="true"
      />
      <img
        ref={botanicalRightRef}
        src="/assets/eucalyptus.png"
        alt=""
        className={styles.botanicalRight}
        aria-hidden="true"
      />

      {/* Group 2 Plant & Greenery Bees */}
      <PlantBees targetSectionRef={sectionRef} />

      <div className={styles.container}>
        {/* Section Header */}
        <header className={styles.header}>
          <div className={styles.subTitlePill}>
            <span className={styles.subTitleDot} />
            Our Craft Selection
          </div>
          <h2 className={styles.mainTitle}>Products</h2>
          <p className={styles.description}>
            Discover our signature artisanal fermented honey beverages and pure raw harvest jars.
          </p>
        </header>

        {/* Products Showcase Grid */}
        <div className={styles.productsGrid}>
          {PRODUCTS.map((prod, idx) => (
            <motion.article
              key={prod.id}
              ref={(el) => (cardRefs.current[idx] = el)}
              className={styles.productCard}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.productBadge}>{prod.badge}</span>
              <div className={styles.imageWrapper}>
                <img src={prod.image} alt={prod.name} className={styles.productImg} />
              </div>
              <h3 className={styles.cardTitle}>{prod.name}</h3>
              <p className={styles.cardDesc}>{prod.desc}</p>
              <div className={styles.cardFooter}>
                <span className={styles.price}>{prod.price}</span>
                <button type="button" className={styles.buyBtn}>
                  Order Now
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
