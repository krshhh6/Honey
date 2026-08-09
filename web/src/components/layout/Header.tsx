'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { HexMark } from '@/components/ui/Icons';
import { useCart } from '@/context/CartContext';
import { navItems } from '@/data/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { expo, easeIn } from '@/lib/framer-variants';

const menuItemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.08 + 0.1, duration: 0.7, ease: expo },
  }),
  exit: (i: number) => ({
    y: -20,
    opacity: 0,
    transition: { delay: i * 0.04, duration: 0.4, ease: easeIn },
  }),
};

const overlayVariants: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: { duration: 0.6, ease: expo },
  },
  exit: {
    clipPath: 'inset(0 0 100% 0)',
    opacity: 0,
    transition: { duration: 0.5, ease: easeIn, delay: 0.2 },
  },
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-40',
          'transition-all duration-500 ease-out-expo',
          scrolled
            ? 'py-3 bg-cream-50/90 backdrop-blur-md shadow-walnut'
            : 'py-5 bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-8xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Natural Bee Farm — Home"
          >
            <HexMark
              size={30}
              color="#D4890A"
              className="transition-transform duration-300 group-hover:rotate-[30deg] ease-out-expo"
            />
            <span className="font-display font-bold text-lg tracking-tight text-walnut-900 leading-none">
              Natural<br />
              <span className="font-light italic text-honey-500">Bee Farm</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navItems.slice(0, 4).map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    'relative font-body text-sm tracking-widest uppercase',
                    'transition-colors duration-200',
                    'group',
                    isActive ? 'text-honey-500' : 'text-walnut-800 hover:text-walnut-900',
                  ].join(' ')}
                >
                  {item.label}
                  {/* Animated underline */}
                  <span
                    className={[
                      'absolute -bottom-0.5 left-0 h-px bg-honey-400',
                      'transition-all duration-400 ease-out-expo',
                      isActive ? 'w-full' : 'w-0 group-hover:w-full',
                    ].join(' ')}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 font-body text-sm text-walnut-800 hover:text-honey-500 transition-colors"
              aria-label={`Open cart, ${totalItems} items`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round"/>
                <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={prefersReduced ? {} : { scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-honey-500 text-cream-50 text-xs font-mono font-medium"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden flex flex-col gap-1.5 w-7 h-5 justify-center items-end group"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={[
                'block h-px bg-walnut-900 transition-all duration-400 ease-out-expo',
                menuOpen ? 'w-7 translate-y-[3.5px] rotate-45' : 'w-7',
              ].join(' ')} />
              <span className={[
                'block h-px bg-walnut-900 transition-all duration-400 ease-out-expo',
                menuOpen ? 'w-0 opacity-0' : 'w-5',
              ].join(' ')} />
              <span className={[
                'block h-px bg-walnut-900 transition-all duration-400 ease-out-expo',
                menuOpen ? 'w-7 -translate-y-[3.5px] -rotate-45' : 'w-7',
              ].join(' ')} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={prefersReduced ? undefined : overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-30 bg-walnut-900 flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center px-10 pt-24 pb-12">
              <nav aria-label="Mobile navigation">
                <ul className="space-y-2">
                  {navItems.map((item, i) => (
                    <li key={item.href}>
                      <motion.div
                        custom={i}
                        variants={prefersReduced ? undefined : menuItemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <Link
                          href={item.href}
                          className="block font-display font-bold text-4xl sm:text-5xl text-cream-50 hover:text-honey-400 transition-colors leading-tight py-2"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </nav>

              <motion.div
                variants={prefersReduced ? undefined : { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.6 } } } as const}
                initial="hidden"
                animate="visible"
                className="mt-12 pt-8 border-t border-walnut-700"
              >
                <p className="font-mono text-xs tracking-widest uppercase text-wax-500 mb-2">
                  Open farm visits every third Sunday
                </p>
                <p className="font-body text-cream-100/60 text-sm">
                  Nilgiri Hills, Tamil Nadu
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
