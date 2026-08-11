'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import JarBees from '@/components/JarBees';
import HoneyStorySection from '@/components/HoneyStorySection';
import ShopByCollection from '@/components/ShopByCollection';
import VideoBannerSection from '@/components/VideoBannerSection';
import GallerySection from '@/components/GallerySection';


/* ═══════════════════════════════════════════════════════════════════════════
   Assets
   ═══════════════════════════════════════════════════════════════════════════ */
const imgJar      = '/lol.png';
const imgFlower   = 'https://www.figma.com/api/mcp/asset/5907b0b0-86b9-41cf-ba88-52caa3a823ca.png';
const imgSquiggle = 'https://www.figma.com/api/mcp/asset/fc948c7d-49ad-4502-b326-721f149a9c0b.svg';

/* ═══════════════════════════════════════════════════════════════════════════
   Framer Motion variants
   ═══════════════════════════════════════════════════════════════════════════ */
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
};
const fadeIn = {
  hidden:  { opacity: 0 },
  visible: (d = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay: d },
  }),
};

/* ═══════════════════════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const jarRef  = useRef<HTMLDivElement>(null);

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

      {/* ── ABOUT pill ──────────────────────────────────────────────────── */}
      <motion.nav className="nav"
        initial="hidden" animate="visible" variants={fadeIn} custom={0.2}>
        <motion.div className="nav__pill"
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
          ABOUT
        </motion.div>
      </motion.nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <div className="hero">

        {/* LEFT — text */}
        <div className="hero__text">

          <motion.p className="label"
            initial="hidden" animate="visible" variants={fadeUp} custom={0.4}>
            The Brand{'\n'}New Drink
          </motion.p>

          <motion.div className="squiggle"
            initial="hidden" animate="visible" variants={fadeUp} custom={0.55}>
            <img src={imgSquiggle} alt="" aria-hidden="true" />
          </motion.div>

          <h1 className="headline">
            {(['Principio is', 'a fermented', 'HONEY drink'] as const).map((line, i) => (
              <motion.span key={line} className="headline__line"
                initial="hidden" animate="visible" variants={fadeUp}
                custom={0.65 + i * 0.12}>
                {line}
              </motion.span>
            ))}
          </h1>

        </div>

        {/* RIGHT — jar + Group 1 Jar Bees */}
        <motion.div className="hero__jar"
          initial={{ opacity: 0, y: 40, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
          <div ref={jarRef} style={{ position: 'relative' }}>
            <img src={imgJar}
              alt="Meadlight Raw Honey — Pure · Natural · Unfiltered, Product of Italy" />
            <JarBees jarRef={jarRef} />
          </div>
        </motion.div>

      </div>

      {/* ── FLOWER — bottom-right decoration ────────────────────────────── */}
      <motion.div className="hero__flower"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
        aria-hidden="true">
        <img src={imgFlower} alt="" draggable={false} />
      </motion.div>

      {/* ── HARVEST STORY SECTION ────────────────────────────────────────── */}
      <HoneyStorySection />

      {/* ── SHOP BY COLLECTION SECTION ───────────────────────────────────── */}
      <ShopByCollection />

      {/* ── VIDEO BANNER SECTION ────────────────────────────────────────── */}
      <VideoBannerSection />

      {/* ── OUR GALLERY SECTION ─────────────────────────────────────────── */}
      <GallerySection />

    </div>
  );
}
