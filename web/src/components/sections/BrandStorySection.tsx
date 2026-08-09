'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { storyBeats } from '@/data/storyBeats';

export function BrandStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress to beat index
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(
      storyBeats.length - 1,
      Math.floor(v * storyBeats.length)
    );
    setActiveIndex(idx);
  });

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${storyBeats.length * 100}vh` }}
      aria-label="Our Story — From Hive to Home"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex">
        {/* Left — narrative text */}
        <div className="relative z-10 w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-16 bg-cream-50 py-20">
          {/* Section label */}
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-wax-500 mb-8">
            From Hive to Home
          </p>

          {/* Beat counter */}
          <div className="flex gap-2 mb-10" aria-hidden="true">
            {storyBeats.map((_, i) => (
              <motion.div
                key={i}
                animate={{ width: i === activeIndex ? 32 : 8 }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                className={[
                  'h-0.5 rounded-full transition-colors',
                  i === activeIndex ? 'bg-honey-500' : 'bg-wax-300',
                ].join(' ')}
              />
            ))}
          </div>

          {/* Story beats — crossfade */}
          <div className="relative min-h-[320px]">
            {storyBeats.map((beat, i) => (
              <motion.div
                key={beat.id}
                animate={{
                  opacity: i === activeIndex ? 1 : 0,
                  y: i === activeIndex ? 0 : i < activeIndex ? -20 : 20,
                }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                className={[
                  'absolute inset-0',
                  i === activeIndex ? 'pointer-events-auto' : 'pointer-events-none',
                ].join(' ')}
                aria-hidden={i !== activeIndex}
              >
                <h2
                  className="font-display font-bold text-walnut-900 mb-6 leading-tight"
                  style={{ fontSize: 'clamp(2.5rem, 1.5rem + 5vw, 5rem)' }}
                >
                  {beat.heading}
                </h2>
                <p className="font-body text-walnut-800/80 leading-relaxed"
                  style={{ fontSize: 'clamp(1rem, 0.85rem + 0.5vw, 1.125rem)' }}>
                  {beat.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Decorative hex mark */}
          <div className="absolute bottom-12 left-16 opacity-10" aria-hidden="true">
            <svg width="120" height="140" viewBox="0 0 40 46" fill="none">
              <path d="M20 1L38 11V31L20 41L2 31V11L20 1Z" stroke="#D4890A" strokeWidth="0.8" />
            </svg>
          </div>
        </div>

        {/* Right — crossfading images */}
        <div className="hidden lg:block relative w-1/2 overflow-hidden">
          {storyBeats.map((beat, i) => (
            <motion.div
              key={beat.id}
              className="absolute inset-0"
              animate={{
                opacity: i === activeIndex ? 1 : 0,
                scale: i === activeIndex ? 1 : 1.04,
              }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              aria-hidden={i !== activeIndex}
            >
              <Image
                src={beat.imageSrc}
                alt={beat.imageAlt}
                fill
                className="object-cover object-center"
                sizes="50vw"
              />
              {/* Warm overlay */}
              <div className="absolute inset-0 bg-honey-500/10 mix-blend-multiply" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
