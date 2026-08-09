'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BeeFlightPath, HoneycombGrid } from '@/components/ui/Icons';
import { staggerContainer, fadeUp } from '@/lib/framer-variants';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Split text into individual chars for stagger animation
function SplitChars({ text, className }: { text: string; className?: string }) {
  const prefersReduced = useReducedMotion();
  const chars = text.split('');
  return (
    <span className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          custom={i}
          variants={prefersReduced ? {} : {
            hidden: { y: 80, opacity: 0, skewY: 4 },
            visible: {
              y: 0,
              opacity: 1,
              skewY: 0,
              transition: {
                delay: i * 0.035,
                duration: 0.9,
                ease: [0.19, 1, 0.22, 1],
              },
            },
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax layers
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReduced ? '0%' : '-15%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReduced ? '0%' : '8%']);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-walnut-900"
      aria-label="Hero — Natural Bee Farm"
    >
      {/* Background image layer */}
      <motion.div
        className="absolute inset-0 scale-[1.08]"
        style={{ y: bgY }}
        initial={prefersReduced ? {} : { scale: 1.08, opacity: 0 }}
        animate={{ scale: 1.0, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.19, 1, 0.22, 1] }}
      >
        <Image
          src="/images/hero-farm-bg.jpg"
          alt="Golden-hour photograph of beehive boxes in the Nilgiri wildflower meadow"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-walnut-900/80 via-walnut-900/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-walnut-900/50 via-transparent to-transparent" />
      </motion.div>

      {/* Honeycomb grid overlay */}
      <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none">
        <HoneycombGrid
          cols={12}
          rows={8}
          cellSize={60}
          color="#E8A820"
          className="opacity-30 -mr-20 translate-x-10"
        />
      </div>

      {/* Bee flight path SVG */}
      <div className="absolute inset-x-0 top-[20%] pointer-events-none">
        <BeeFlightPath
          className="w-full h-auto max-w-3xl mx-auto opacity-60"
          strokeColor="#D4890A"
        />
      </div>

      {/* Hero text content */}
      <motion.div
        className="relative z-10 flex flex-col justify-end h-full max-w-8xl mx-auto px-6 lg:px-12 pb-20 lg:pb-28"
        style={{ y: textY }}
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.4 }}
          className="font-mono text-xs tracking-[0.3em] uppercase text-honey-400 mb-6"
        >
          Nilgiri Hills — Single Origin — Treatment Free
        </motion.p>

        {/* Main headline — two lines, staggered chars */}
        <motion.h1
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="font-display leading-[0.88] text-cream-50 mb-8"
          style={{ fontSize: 'clamp(3.5rem, 1rem + 12.5vw, 9rem)' }}
        >
          <span className="block overflow-hidden">
            <SplitChars text="Where every" />
          </span>
          <span className="block overflow-hidden italic font-light text-honey-400">
            <SplitChars text="jar begins" />
          </span>
          <span className="block overflow-hidden">
            <SplitChars text="with a season." />
          </span>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.8 }}
          className="font-body text-cream-100/80 max-w-md mb-10"
          style={{ fontSize: 'clamp(1rem, 0.85rem + 0.5vw, 1.2rem)' }}
        >
          Raw. Unfiltered. Alive. Two harvests a year from forty hives
          that have worked the same meadows for seventeen seasons.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4"
          style={{ '--stagger-delay': '2s' } as React.CSSProperties}
        >
          <motion.div variants={fadeUp} transition={{ delay: 2 }}>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 font-body font-medium rounded-full transition-all duration-300 ease-out-expo bg-honey-500 text-cream-50 hover:bg-honey-600 shadow-honey hover:shadow-honey-lg px-10 py-4 text-base tracking-widest"
            >
              Shop the Harvest
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} transition={{ delay: 2.1 }}>
            <Link
              href="/our-story"
              className="inline-flex items-center justify-center gap-2 font-body font-medium rounded-full transition-all duration-300 ease-out-expo bg-transparent text-cream-100 hover:text-honey-400 px-10 py-4 text-base tracking-widest"
            >
              Our Story
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        aria-hidden="true"
      >
        <span className="font-mono text-xs tracking-widest uppercase text-cream-100/50">Scroll</span>
        <motion.div
          animate={prefersReduced ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-cream-100/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
