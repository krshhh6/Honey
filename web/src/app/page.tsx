'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
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
          HERO SECTION — Exact Figma design layout
          ══════════════════════════════════════════════════════════════════ */}
      <section id="home" className="hero">

        {/* ── Realistic Bee (Left) ────────────────────────────────────── */}
        <motion.div
          className="hero__bee-left"
          initial={{ opacity: 0, x: -30, rotate: -15 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/hero-bee.png"
              alt="Realistic Honey Bee"
              width={140}
              height={110}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </motion.div>
        </motion.div>

        {/* ── Cartoon Bee (Right Top) ──────────────────────────────────── */}
        <motion.div
          className="hero__bee-right"
          initial={{ opacity: 0, x: 30, rotate: 15 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/bee-float.png"
              alt="Cartoon Bee Illustration"
              width={170}
              height={170}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </motion.div>
        </motion.div>

        {/* ── MAIN HERO LAYOUT CONTAINER ──────────────────────────────── */}
        <div className="hero__container">

          {/* ── LEFT COLUMN: Headline, Subtitle Badge & CTA ────────── */}
          <div className="hero__left">
            <h1 className="hero__headline">
              {(['NATURAL', 'BEE FARM', 'NATURAL HONEY'] as const).map((line, i) => (
                <motion.span
                  key={line}
                  className="hero__headline-line"
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  custom={0.3 + i * 0.12}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            {/* Rotated Subtitle Badge */}
            <motion.div
              className="hero__badge"
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
            >
              <span className="hero__badge-text">100% Pure &amp; Authentic Honey</span>
            </motion.div>

            {/* Action Row for Shop button + Mobile Honey Pot */}
            <div className="hero__action-row">
              <motion.a
                href="#collections"
                className="hero__shop-btn"
                initial={{ opacity: 0, scale: 0.85, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.75 }}
                whileHover={{ scale: 1.08, rotate: 0 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop now
              </motion.a>

              {/* Small Honey Pot (Mobile only) */}
              <motion.div
                className="hero__pot hero__pot-mobile"
                initial={{ opacity: 0, scale: 0.85, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
              >
                <Image
                  src="/honey-pot.png"
                  alt="Honey Pot with Dipper"
                  width={110}
                  height={115}
                  style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 6px 12px rgba(180,100,0,0.18))' }}
                  priority
                />
              </motion.div>
            </div>
          </div>

          {/* ── MIDDLE COLUMN: Honey Pot (Desktop view) ──────────────── */}
          <div className="hero__center hero__pot-desktop">
            <motion.div
              className="hero__pot"
              initial={{ opacity: 0, scale: 0.85, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            >
              <Image
                src="/honey-pot.png"
                alt="Honey Pot with Dipper"
                width={260}
                height={270}
                style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 10px 20px rgba(180,100,0,0.2))' }}
                priority
              />
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: Main Raw Honey Jar & Badge ─────────────── */}
          <div className="hero__right">
            <motion.div
              className="hero__jar-wrap"
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            >
              {/* Continuous Organic Floating Motion */}
              <motion.div
                animate={{ y: [0, -14, 0], rotate: [0, 1.5, -1, 0] }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ position: 'relative' }}
              >
                <Image
                  src="/honey-jar.png"
                  alt="Natural Bee Farm Raw Honey Jar — Pure · Natural · Unfiltered"
                  width={400}
                  height={540}
                  style={{
                    width: '100%',
                    height: 'auto',
                    filter: 'drop-shadow(0 28px 44px rgba(160, 70, 0, 0.32)) drop-shadow(0 10px 20px rgba(255, 180, 0, 0.22))',
                  }}
                  priority
                />

                {/* Circular spinning text badge */}
                <div className="hero__circular-badge">
                  <CircularText
                    text="NATURAL*BEE*FARM*"
                    spinDuration={20}
                    onHover="goBonkers"
                  />
                </div>
              </motion.div>

              {/* Dynamic Ground Shadow underneath the floating jar */}
              <motion.div
                className="hero__jar-ground-shadow"
                animate={{
                  scale: [1, 0.82, 1],
                  opacity: [0.75, 0.35, 0.75],
                }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>

        </div>

        {/* ── Background Flower line-art (Bottom Right) ────────────────── */}
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
            width={200}
            height={360}
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
