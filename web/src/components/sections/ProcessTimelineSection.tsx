'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { processSteps } from '@/data/processSteps';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { staggerContainer, fadeUp } from '@/lib/framer-variants';

// Hand-drawn SVG illustrations for each process step
const illustrations: Record<string, React.ReactNode> = {
  inspection: (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full" aria-hidden="true">
      <rect x="20" y="30" width="40" height="28" rx="2" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="24" y="26" width="32" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <line x1="28" y1="42" x2="52" y2="42" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2"/>
      <line x1="28" y1="49" x2="52" y2="49" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2"/>
      <circle cx="57" cy="23" r="8" stroke="currentColor" strokeWidth="1.2"/>
      <line x1="63" y1="29" x2="68" y2="34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  bloom: (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full" aria-hidden="true">
      <circle cx="40" cy="40" r="8" stroke="currentColor" strokeWidth="1.2"/>
      {[0,60,120,180,240,300].map((angle, i) => (
        <ellipse key={i} cx={40 + 16 * Math.cos(angle * Math.PI / 180)} cy={40 + 16 * Math.sin(angle * Math.PI / 180)}
          rx="5" ry="8" stroke="currentColor" strokeWidth="1"
          transform={`rotate(${angle} ${40 + 16 * Math.cos(angle * Math.PI / 180)} ${40 + 16 * Math.sin(angle * Math.PI / 180)})`}/>
      ))}
      <circle cx="40" cy="40" r="3" fill="currentColor" opacity="0.5"/>
    </svg>
  ),
  collection: (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Stylized bee */}
      <ellipse cx="40" cy="42" rx="12" ry="8" stroke="currentColor" strokeWidth="1.2"/>
      <ellipse cx="40" cy="40" rx="7" ry="5" stroke="currentColor" strokeWidth="1"/>
      <line x1="33" y1="40" x2="47" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
      <path d="M32 36 Q28 28 35 26 Q40 32 40 35" stroke="currentColor" strokeWidth="1" fill="none"/>
      <path d="M48 36 Q52 28 45 26 Q40 32 40 35" stroke="currentColor" strokeWidth="1" fill="none"/>
      {/* Flight path */}
      <path d="M15 25 C20 15, 35 20, 30 30" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.5"/>
    </svg>
  ),
  ripening: (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full" aria-hidden="true">
      <path d="M30 20 L50 20 L55 55 L25 55 Z" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M25 55 Q40 70 55 55" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      {/* Honeycomb fill */}
      {[[35,30],[45,30],[35,42],[45,42]].map(([x,y],i) => (
        <path key={i} d={`M${x} ${y-4} L${x+4} ${y-2} L${x+4} ${y+2} L${x} ${y+4} L${x-4} ${y+2} L${x-4} ${y-2}Z`}
          stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
      ))}
      <text x="38" y="34" fontSize="5" fill="currentColor" opacity="0.4"></text>
    </svg>
  ),
  extraction: (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Extractor cylinder */}
      <ellipse cx="40" cy="22" rx="18" ry="6" stroke="currentColor" strokeWidth="1.2"/>
      <line x1="22" y1="22" x2="22" y2="58" stroke="currentColor" strokeWidth="1.2"/>
      <line x1="58" y1="22" x2="58" y2="58" stroke="currentColor" strokeWidth="1.2"/>
      <ellipse cx="40" cy="58" rx="18" ry="6" stroke="currentColor" strokeWidth="1.2"/>
      {/* Drip */}
      <path d="M40 64 Q40 72 40 75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M37 73 Q40 78 43 73" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    </svg>
  ),
  bottling: (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Jar */}
      <path d="M32 26 L28 32 L28 62 Q28 66 32 66 L48 66 Q52 66 52 62 L52 32 L48 26 Z" stroke="currentColor" strokeWidth="1.2"/>
      <line x1="33" y1="26" x2="47" y2="26" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="30" y="20" width="20" height="7" rx="2" stroke="currentColor" strokeWidth="1.2"/>
      {/* Label */}
      <rect x="31" y="42" width="18" height="14" rx="1" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 1"/>
      {/* Honey level */}
      <path d="M28 50 Q40 46 52 50" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
    </svg>
  ),
};

export function ProcessTimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="py-28 lg:py-36 bg-cream-100 overflow-hidden"
      aria-label="The Beekeeping Process"
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="mb-20 lg:mb-28 max-w-xl"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-wax-500 mb-4">
            Season to Season
          </p>
          <h2
            className="font-display font-bold text-walnut-900 leading-[0.9]"
            style={{ fontSize: 'clamp(2.5rem, 1.5rem + 5vw, 5.5rem)' }}
          >
            How the<br />
            <span className="italic font-light text-honey-500">honey happens</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connecting line (desktop) */}
          <div
            className="absolute left-[2.25rem] top-0 bottom-0 w-px bg-wax-300 hidden lg:block"
            aria-hidden="true"
          />

          <motion.div
            variants={prefersReduced ? undefined : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-5%' }}
            className="space-y-16 lg:space-y-12"
          >
            {processSteps.map((step, i) => (
              <ProcessStepItem key={step.id} step={step} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface ProcessStepItemProps {
  step: (typeof processSteps)[0];
  index: number;
}

function ProcessStepItem({ step, index }: ProcessStepItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      variants={prefersReduced ? undefined : fadeUp}
      className="grid lg:grid-cols-[4.5rem_1fr_auto] gap-6 lg:gap-10 items-start"
    >
      {/* Step number / timeline node */}
      <div className="relative flex flex-col items-center">
        <motion.div
          className="w-9 h-9 rounded-full border-2 border-honey-500 bg-cream-100 flex items-center justify-center z-10"
          animate={isInView && !prefersReduced ? { scale: [1, 1.2, 1], borderColor: ['#D4890A', '#E8A820', '#D4890A'] } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <span className="font-mono text-xs font-medium text-honey-600">
            {String(index + 1).padStart(2, '0')}
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="lg:pr-12">
        <p className="font-mono text-xs tracking-widest uppercase text-wax-500 mb-2">
          {step.season}
        </p>
        <h3 className="font-display font-bold text-walnut-900 text-2xl lg:text-3xl mb-4">
          {step.title}
        </h3>
        <p className="font-body text-walnut-800/75 leading-relaxed text-sm lg:text-base">
          {step.description}
        </p>
      </div>

      {/* Illustration */}
      <motion.div
        className="w-20 h-20 text-honey-500 flex-shrink-0 hidden lg:block"
        animate={isInView && !prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.7, delay: index * 0.1 + 0.2, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {illustrations[step.illustration]}
      </motion.div>
    </motion.div>
  );
}
