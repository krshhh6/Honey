'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import Navbar from '@/components/Navbar';
import SplashLoader from '@/components/SplashLoader';
import HoneyStorySection from '@/components/HoneyStorySection';
import ShopByCollection from '@/components/ShopByCollection';
import VideoBannerSection from '@/components/VideoBannerSection';
import GallerySection from '@/components/GallerySection';
import CircularText from '@/components/ui/CircularText';

/* ═══════════════════════════════════════════════════════════════════════════
   Framer Motion variants
   ═══════════════════════════════════════════════════════════════════════════ */
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay: d },
  }),
};

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: (d = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: d },
  }),
};

/* ═══════════════════════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const jarRef = useRef<HTMLDivElement>(null);

  /* Jar — gentle perpetual float */
  useEffect(() => {
    if (!jarRef.current) return;
    const tween = gsap.to(jarRef.current, {
      y: -12, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.0,
    });
    return () => { tween.kill(); };
  }, []);

  return (
    <div className="page">

      {/* ── ANIMATED SPLASH PRELOADER ─────────────────────────────────── */}
      <AnimatePresence>
        {showSplash && (
          <SplashLoader onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* ── TOP NAVBAR ─────────────────────────────────────────────────── */}
      <Navbar />

      {/* ══════════════════════════════════════════════════════════════════
          HERO SECTION — Figma design layout
          ══════════════════════════════════════════════════════════════════ */}
      <section id="home" className="hero">

        {/* ── Honey drip — full-bleed at top ─────────────────────────── */}
        <motion.div
          className="hero__drip"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <Image
            src="/honey-drip.png"
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'top center' }}
            priority
            aria-hidden="true"
          />
        </motion.div>

        {/* ── LEFT COLUMN — bee + headline ───────────────────────────── */}
        <div className="hero__left">

          {/* Bee illustration */}
          <motion.div
            className="hero__bee"
            initial={{ opacity: 0, x: -30, rotate: -10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <Image
              src="/hero-bee.png"
              alt="Honey bee illustration"
              width={120}
              height={90}
              style={{ width: '100%', height: 'auto' }}
            />
          </motion.div>

          {/* Main headline */}
          <h1 className="hero__headline">
            {(['NATURAL', 'BEE FARM', 'NATURAL HONEY'] as const).map((line, i) => (
              <motion.span
                key={line}
                className="hero__headline-line"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={0.45 + i * 0.14}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            className="hero__subtext"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.85}
          >
            100% Pure &amp; Authentic Honey
          </motion.p>

          {/* Honey pot illustration (bottom-left of text) */}
          <motion.div
            className="hero__pot"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.95 }}
          >
            <Image
              src="/honey-pot.png"
              alt="Honey pot illustration"
              width={160}
              height={180}
              style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 8px 16px rgba(180,100,0,0.18))' }}
            />
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN — honey jar ───────────────────────────────── */}
        <div className="hero__right">
          <motion.div
            className="hero__jar-wrap"
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div ref={jarRef} style={{ position: 'relative' }}>
              <Image
                src="/honey-jar.png"
                alt="Natural Bee Farm Raw Honey Jar — Pure · Natural · Unfiltered"
                width={420}
                height={560}
                style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 24px 48px rgba(160,80,0,0.22))' }}
                priority
              />

              {/* Circular spinning text badge */}
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-30px',
                zIndex: 25,
              }}>
                <CircularText
                  text="NATURAL*BEE*FARM*"
                  spinDuration={20}
                  onHover="goBonkers"
                />
              </div>
            </div>
          </motion.div>

          {/* Shop now button */}
          <motion.a
            href="#collections"
            className="hero__shop-btn"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
          >
            Shop now
          </motion.a>
        </div>

        {/* ── RIGHT EDGE — flower decoration ─────────────────────────── */}
        <motion.div
          className="hero__flower"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={0.8}
          aria-hidden="true"
        >
          <Image
            src="/hero-flower.png"
            alt=""
            width={180}
            height={340}
            style={{ width: '100%', height: 'auto', opacity: 0.75 }}
          />
        </motion.div>

      </section>

      {/* ── HARVEST STORY SECTION ──────────────────────────────────────────── */}
      <div id="story">
        <HoneyStorySection />
      </div>

      {/* ── SHOP BY COLLECTION SECTION ────────────────────────────────────── */}
      <div id="collections">
        <ShopByCollection />
      </div>

      {/* ── VIDEO BANNER SECTION ──────────────────────────────────────────── */}
      <VideoBannerSection />

      {/* ── OUR GALLERY SECTION ───────────────────────────────────────────── */}
      <div id="gallery">
        <GallerySection />
      </div>

    </div>
  );
}
