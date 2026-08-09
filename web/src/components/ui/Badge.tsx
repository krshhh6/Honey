'use client';

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'honey' | 'walnut' | 'sage' | 'wax';
  className?: string;
}

const variantClasses = {
  honey: 'bg-honey-100 text-honey-700 border-honey-200',
  walnut: 'bg-walnut-900 text-cream-50 border-walnut-800',
  sage: 'bg-sage-100 text-sage-700 border-sage-200',
  wax: 'bg-wax-200 text-walnut-800 border-wax-300',
};

export function Badge({ children, variant = 'honey', className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center',
        'font-mono text-xs tracking-widest uppercase',
        'px-3 py-1 rounded-full border',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
