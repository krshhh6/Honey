'use client';

import React, { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useMagneticHover } from '@/hooks/useMagneticHover';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref' | 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-honey-500 text-cream-50 hover:bg-honey-600 shadow-honey hover:shadow-honey-lg',
  secondary:
    'bg-walnut-900 text-cream-50 hover:bg-walnut-800',
  ghost:
    'bg-transparent text-walnut-900 hover:text-honey-500',
  outline:
    'bg-transparent border border-walnut-900 text-walnut-900 hover:bg-walnut-900 hover:text-cream-50',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-sm tracking-wide',
  md: 'px-7 py-3.5 text-base tracking-wide',
  lg: 'px-10 py-4 text-base tracking-widest',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', magnetic = false, loading = false, className = '', children, ...props }, externalRef) => {
    const prefersReduced = useReducedMotion();
    const { ref: magRef, x, y, onMouseMove, onMouseLeave } = useMagneticHover(0.25);

    const combinedRef = (node: HTMLButtonElement | null) => {
      (magRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof externalRef === 'function') externalRef(node);
      else if (externalRef) (externalRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    };

    return (
      <motion.button
        ref={combinedRef}
        style={magnetic && !prefersReduced ? { x, y } : {}}
        onMouseMove={magnetic && !prefersReduced ? onMouseMove : undefined}
        onMouseLeave={magnetic && !prefersReduced ? onMouseLeave : undefined}
        whileTap={prefersReduced ? {} : { scale: 0.97 }}
        className={[
          'relative inline-flex items-center justify-center gap-2',
          'font-body font-medium rounded-full',
          'transition-all duration-300 ease-out-expo',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey-500 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className,
        ].join(' ')}
        {...props}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </span>
        )}
        <span className={loading ? 'opacity-0' : 'opacity-100'}>{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
