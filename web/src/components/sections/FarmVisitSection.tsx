'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function FarmVisitSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const prefersReduced = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="py-28 lg:py-36 bg-cream-100" aria-label="Farm Visits and Newsletter">
      <div className="max-w-8xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Farm visit info */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-wax-500 mb-4">
              Open Farm
            </p>
            <h2
              className="font-display font-bold text-walnut-900 leading-[0.9] mb-8"
              style={{ fontSize: 'clamp(2.5rem, 1.5rem + 4vw, 5rem)' }}
            >
              We open the<br />
              <span className="italic font-light text-honey-500">farm gates</span><br />
              every third Sunday.
            </h2>
            <p className="font-body text-walnut-800/70 leading-relaxed mb-8 max-w-sm"
              style={{ fontSize: 'clamp(1rem, 0.85rem + 0.35vw, 1.125rem)' }}>
              Bring curiosity. Watch a hive inspection. Taste honey straight from the comb.
              Learn why bees matter and how we work with them. No booking required — just show up.
            </p>

            {/* Visit details */}
            <div className="space-y-4">
              {[
                { label: 'When', value: 'Every third Sunday, 9am – 12pm' },
                { label: 'Where', value: 'Nilgiri Hills, Tamil Nadu (directions on contact page)' },
                { label: 'Cost', value: 'Free — bring a bag for a jar to take home' },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-4">
                  <span className="font-mono text-xs tracking-widest uppercase text-wax-500 w-16 flex-shrink-0 pt-0.5">
                    {label}
                  </span>
                  <p className="font-body text-sm text-walnut-800/80 leading-relaxed">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Newsletter signup */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
            className="bg-cream-50 rounded-4xl p-10 shadow-walnut"
          >
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-wax-500 mb-4">
              Harvest Dispatches
            </p>
            <h3
              className="font-display font-bold text-walnut-900 leading-tight mb-3"
              style={{ fontSize: 'clamp(1.75rem, 1.2rem + 2vw, 2.5rem)' }}
            >
              Hear about the harvest<br />before anyone else.
            </h3>
            <p className="font-body text-walnut-800/60 text-sm leading-relaxed mb-10">
              When the June or November batch is ready, our newsletter subscribers
              get first access — and sometimes a behind-the-scenes look at the extraction room.
              No noise, no promotions. Just honey news, twice a year.
            </p>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <p className="font-display font-bold text-honey-500 text-2xl mb-2">
                  You&#39;re in.
                </p>
                <p className="font-body text-sm text-walnut-800/60">
                  We&#39;ll be in touch when the next batch is ready.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-6">
                  <label htmlFor="newsletter-email" className="font-mono text-xs tracking-widest uppercase text-wax-500 block mb-3">
                    Your Email
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className={[
                      'w-full bg-transparent border-b-2 pb-3 outline-none',
                      'font-body text-walnut-900 placeholder:text-walnut-800/30',
                      'transition-colors duration-200',
                      'focus:border-honey-500 border-walnut-800/20',
                    ].join(' ')}
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={status === 'loading'}
                  magnetic
                  className="w-full"
                >
                  Join the Harvest List
                </Button>
                {status === 'error' && (
                  <p className="mt-3 text-sm text-center font-body text-red-600">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
