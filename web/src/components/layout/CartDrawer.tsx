'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const drawerVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] as [number, number, number, number] },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.1 } },
};

export function CartDrawer() {
  const { state, closeCart, removeItem, updateQty, totalPrice } = useCart();
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={prefersReduced ? undefined : backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-walnut-900/60 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            {...(!prefersReduced ? {
              variants: drawerVariants,
              initial: 'hidden',
              animate: 'visible',
              exit: 'exit',
            } : {})}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-cream-50 shadow-walnut-lg flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-cream-200">
              <div>
                <h2 className="font-display font-bold text-walnut-900 text-2xl">Your Cart</h2>
                <p className="font-mono text-xs text-wax-500 tracking-widest uppercase mt-1">
                  {state.items.length === 0
                    ? 'Empty'
                    : `${state.items.reduce((s, i) => s + i.quantity, 0)} items`}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-cream-100 hover:bg-cream-200 transition-colors"
                aria-label="Close cart"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-6 py-20">
                  <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-display font-bold text-walnut-900 text-xl mb-2">Nothing here yet</p>
                    <p className="font-body text-sm text-walnut-800/60">
                      Head to the shelf and find your honey.
                    </p>
                  </div>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="inline-flex items-center justify-center gap-2 font-body font-medium rounded-full transition-all duration-300 bg-honey-500 text-cream-50 hover:bg-honey-600 shadow-honey px-5 py-2.5 text-sm tracking-wide"
                  >
                    Browse the Shelf
                  </Link>
                </div>
              ) : (
                state.items.map((item) => {
                  const linePrice = Math.round(
                    (item.product.price * item.weightOption.priceMultiplier) / 100
                  ) * item.quantity;
                  return (
                    <motion.div
                      key={`${item.product.id}-${item.weightOption.grams}`}
                      layout
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4 bg-cream-100 rounded-2xl p-4"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-16 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.images[0].src}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-walnut-900 truncate">
                          {item.product.name}
                        </p>
                        <p className="font-mono text-xs text-wax-500 tracking-wide mb-3">
                          {item.weightOption.grams}g
                        </p>
                        {/* Qty controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQty(item.product.id, item.weightOption.grams, item.quantity - 1)}
                            className="w-7 h-7 rounded-full border border-walnut-800/20 flex items-center justify-center hover:border-honey-500 transition-colors text-sm"
                            aria-label="Decrease quantity"
                          >−</button>
                          <span className="font-mono text-sm w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.product.id, item.weightOption.grams, item.quantity + 1)}
                            className="w-7 h-7 rounded-full border border-walnut-800/20 flex items-center justify-center hover:border-honey-500 transition-colors text-sm"
                            aria-label="Increase quantity"
                          >+</button>
                        </div>
                      </div>
                      {/* Price + remove */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.product.id, item.weightOption.grams)}
                          className="text-walnut-800/30 hover:text-honey-500 transition-colors"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                          </svg>
                        </button>
                        <p className="font-display font-bold text-walnut-900">₹{linePrice}</p>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="px-8 py-6 border-t border-cream-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-body text-walnut-800/70">Total</span>
                  <span className="font-display font-bold text-walnut-900 text-2xl">
                    ₹{(totalPrice / 100).toFixed(0)}
                  </span>
                </div>
                <Button variant="primary" size="lg" magnetic className="w-full">
                  Proceed to Checkout
                </Button>
                <p className="font-mono text-xs text-center text-walnut-800/40 tracking-wide mt-4">
                  Free delivery on orders above ₹999
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
