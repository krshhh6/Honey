'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { testimonials } from '@/data/testimonials';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function TestimonialsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-28 lg:py-36 bg-cream-50 overflow-hidden" aria-label="Customer Testimonials">
      <div className="max-w-8xl mx-auto px-6 lg:px-12">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs tracking-[0.3em] uppercase text-wax-500 mb-20"
        >
          What people say
        </motion.p>

        <div className="space-y-24 lg:space-y-32">
          {testimonials.map((t) => {
            if (t.layout === 'full') {
              return (
                <motion.div
                  key={t.id}
                  initial={prefersReduced ? {} : { opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                  className="max-w-4xl"
                >
                  <blockquote>
                    <svg
                      className="text-wax-300 mb-6 w-10 h-10"
                      viewBox="0 0 40 30"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M0 30V18C0 8 6 2 18 0l2 4C12 6 8 10 8 18h10v12H0zm22 0V18C22 8 28 2 40 0l2 4C34 6 30 10 30 18h10v12H22z"/>
                    </svg>
                    <p
                      className="font-display font-light italic text-walnut-900 leading-[1.15] mb-8"
                      style={{ fontSize: 'clamp(1.75rem, 1.2rem + 2.75vw, 3rem)' }}
                    >
                      {t.quote}
                    </p>
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-px bg-honey-400" aria-hidden="true" />
                    <cite className="not-italic">
                      <span className="font-body font-medium text-walnut-900">{t.author}</span>
                      <span className="font-mono text-xs text-walnut-800/50 tracking-wide ml-3">
                        {t.location} · {t.since}
                      </span>
                    </cite>
                  </div>
                </motion.div>
              );
            }

            if (t.layout === 'offset-left') {
              return (
                <motion.div
                  key={t.id}
                  initial={prefersReduced ? {} : { opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                  className="max-w-2xl ml-auto"
                >
                  <div className="relative pl-8 border-l-2 border-sage-400">
                    <blockquote>
                      <p
                        className="font-display font-light italic text-walnut-900 leading-[1.2] mb-6"
                        style={{ fontSize: 'clamp(1.35rem, 1.1rem + 1.25vw, 1.875rem)' }}
                      >
                        {t.quote}
                      </p>
                    </blockquote>
                    <cite className="not-italic block">
                      <span className="font-body font-medium text-walnut-900">{t.author}</span>
                      <span className="font-mono text-xs text-walnut-800/50 tracking-wide ml-3">
                        {t.location} · {t.since}
                      </span>
                    </cite>
                    {t.product && (
                      <span className="mt-2 inline-block font-mono text-xs tracking-widest uppercase text-honey-500">
                        On: {t.product}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            }

            if (t.layout === 'with-image') {
              return (
                <motion.div
                  key={t.id}
                  initial={prefersReduced ? {} : { opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                  className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center"
                >
                  {/* Image */}
                  {t.imageSrc && (
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden order-2 lg:order-1">
                      <Image
                        src={t.imageSrc}
                        alt={`Farm visit — ${t.author}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-honey-500/10 mix-blend-multiply" />
                    </div>
                  )}
                  {/* Quote */}
                  <div className="order-1 lg:order-2">
                    <blockquote>
                      <p
                        className="font-display font-light italic text-walnut-900 leading-[1.2] mb-6"
                        style={{ fontSize: 'clamp(1.35rem, 1.1rem + 1.25vw, 1.875rem)' }}
                      >
                        {t.quote}
                      </p>
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-px bg-honey-400" aria-hidden="true" />
                      <cite className="not-italic">
                        <span className="font-body font-medium text-walnut-900">{t.author}</span>
                        <span className="font-mono text-xs text-walnut-800/50 tracking-wide ml-3">
                          {t.location}
                        </span>
                      </cite>
                    </div>
                    <p className="font-mono text-xs text-walnut-800/40 tracking-wide mt-2 pl-9">
                      {t.since}
                    </p>
                  </div>
                </motion.div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </section>
  );
}
