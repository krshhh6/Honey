'use client';

import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { SustainabilityStat } from '@/types';

const stats: SustainabilityStat[] = [
  { value: '0', unit: '', label: 'Pesticides used. Ever.' },
  { value: '17', unit: '+', label: 'Seasons of treatment-free beekeeping.' },
  { value: '40', unit: '%', label: 'Global bee population decline since 1990. We are choosing a different path.' },
];

function AnimatedStat({ stat, delay }: { stat: SustainabilityStat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReduced = useReducedMotion();
  const count = useMotionValue(0);

  React.useEffect(() => {
    if (isInView && !prefersReduced) {
      const numericValue = parseInt(stat.value, 10);
      const controls = animate(count, numericValue, {
        duration: 1.8,
        delay,
        ease: 'easeOut',
      });
      return controls.stop;
    }
  }, [isInView, count, stat.value, delay, prefersReduced]);

  const displayValue = useTransform(count, (latest) =>
    prefersReduced ? stat.value : Math.round(latest).toString()
  );

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.19, 1, 0.22, 1] }}
      className="border-t border-walnut-700 pt-8"
    >
      <div className="flex items-end gap-1 mb-3">
        <motion.span
          className="font-display font-bold text-honey-400 leading-none"
          style={{ fontSize: 'clamp(3rem, 1rem + 7vw, 6rem)' }}
        >
          {displayValue}
        </motion.span>
        {stat.unit && (
          <span
            className="font-display font-bold text-honey-600 mb-2"
            style={{ fontSize: 'clamp(1.5rem, 0.5rem + 3vw, 3rem)' }}
          >
            {stat.unit}
          </span>
        )}
      </div>
      <p className="font-body text-cream-100/70 leading-relaxed text-sm lg:text-base max-w-xs">
        {stat.label}
      </p>
    </motion.div>
  );
}

export function SustainabilitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineInView = useInView(sectionRef, { once: true });

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-36 bg-walnut-900 overflow-hidden"
      aria-label="Sustainability — Save the Bees"
    >
      {/* Background hex pattern */}
      <div
        className="absolute inset-0 bg-hex-pattern opacity-10 pointer-events-none"
        aria-hidden="true"
      />
      {/* Sage accent left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-sage-500" aria-hidden="true" />

      <div className="max-w-8xl mx-auto px-6 lg:px-12">
        {/* Large editorial headline */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={headlineInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="mb-20 lg:mb-28 max-w-4xl"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-sage-400 mb-6">
            Our Commitment
          </p>
          <h2
            className="font-display leading-[0.88] text-cream-50"
            style={{ fontSize: 'clamp(2.5rem, 1rem + 8vw, 7rem)' }}
          >
            No bees.{' '}
            <span className="italic font-light text-honey-400">No food.</span>
            <br />
            No future.
          </h2>
        </motion.div>

        {/* Stats grid — asymmetric */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} stat={stat} delay={i * 0.2} />
          ))}
        </div>

        {/* Body copy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-24"
        >
          <p className="font-body text-cream-100/70 leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 0.85rem + 0.35vw, 1.125rem)' }}>
            The global honeybee population has declined by 40% since 1990. Industrial beekeeping
            practices — routine antibiotic use, artificial queen replacement, migratory stress —
            are part of the problem. We are not part of that system.
          </p>
          <p className="font-body text-cream-100/70 leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 0.85rem + 0.35vw, 1.125rem)' }}>
            Treatment-free beekeeping means our colonies build genuine immunity. It means slower
            growth, smaller harvests, higher cost. We think that&#39;s the right trade. Every jar
            you buy funds hives that are helping, not hurting.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
