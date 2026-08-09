'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { modalOverlay, modalContent } from '@/lib/framer-variants';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function Modal({ isOpen, onClose, children, className = '', ariaLabel }: ModalProps) {
  const prefersReduced = useReducedMotion();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={prefersReduced ? undefined : modalOverlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-walnut-900/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Content */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            variants={prefersReduced ? undefined : modalContent}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={[
              'fixed z-50 inset-x-4 top-1/2 -translate-y-1/2',
              'sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2',
              'w-full sm:max-w-2xl lg:max-w-4xl',
              'max-h-[90vh] overflow-y-auto',
              'bg-cream-50 rounded-3xl shadow-walnut-lg',
              className,
            ].join(' ')}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-cream-100 hover:bg-cream-200 transition-colors"
              aria-label="Close modal"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
