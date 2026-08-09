'use client';

import React from 'react';
import Link from 'next/link';
import { HexMark, HoneycombGrid } from '@/components/ui/Icons';

const shopLinks = [
  { label: 'Wildflower Raw', href: '/shop/wildflower-raw' },
  { label: 'Forest Dark', href: '/shop/forest-dark' },
  { label: 'Raw Comb', href: '/shop/raw-comb' },
  { label: 'Creamed Honey', href: '/shop/creamed-honey' },
];

const learnLinks = [
  { label: 'Our Story', href: '/our-story' },
  { label: 'The Process', href: '/our-story#process' },
  { label: 'Sustainability', href: '/our-story#sustainability' },
];

const contactLinks = [
  { label: 'Get in Touch', href: '/contact' },
  { label: 'Wholesale Enquiries', href: '/contact#wholesale' },
  { label: 'Farm Visits', href: '/contact#visits' },
];

export function Footer() {
  return (
    <footer className="relative bg-walnut-800 text-cream-100 overflow-hidden">
      {/* Honeycomb top edge decoration */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden h-16 opacity-20">
        <HoneycombGrid
          cols={20}
          rows={2}
          cellSize={52}
          color="#C4A05A"
          className="w-full"
        />
      </div>

      <div className="relative max-w-8xl mx-auto px-6 lg:px-12 pt-24 pb-12">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <HexMark size={28} color="#D4890A" />
              <span className="font-display font-bold text-lg tracking-tight text-cream-50 leading-none">
                Natural<br />
                <span className="font-light italic text-honey-400">Bee Farm</span>
              </span>
            </Link>
            <p className="font-body text-sm text-cream-100/60 leading-relaxed max-w-xs">
              Forty hives. Seventeen seasons. Two harvests a year.
              Raw, unfiltered, and honest — from the Nilgiri Hills
              to your kitchen.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-8">
              {['Instagram', 'Facebook'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="font-mono text-xs tracking-widest uppercase text-wax-400 hover:text-honey-400 transition-colors"
                  aria-label={s}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-mono text-xs tracking-widest uppercase text-wax-500 mb-6">Shop</h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream-100/70 hover:text-honey-400 transition-colors group flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-honey-400 transition-all duration-300 group-hover:w-4" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="font-mono text-xs tracking-widest uppercase text-wax-500 mb-6">Learn</h3>
            <ul className="space-y-3">
              {learnLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream-100/70 hover:text-honey-400 transition-colors group flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-honey-400 transition-all duration-300 group-hover:w-4" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-mono text-xs tracking-widest uppercase text-wax-500 mb-6">Visit & Contact</h3>
            <ul className="space-y-3 mb-8">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream-100/70 hover:text-honey-400 transition-colors group flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-honey-400 transition-all duration-300 group-hover:w-4" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <address className="not-italic">
              <p className="font-mono text-xs tracking-wide text-cream-100/40 leading-relaxed">
                Nilgiri Hills, Tamil Nadu<br />
                India — 643 001<br />
                hello@naturalbee.farm
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-walnut-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-cream-100/30 tracking-wide">
            © {new Date().getFullYear()} Natural Bee Farm. All rights reserved.
          </p>
          <p className="font-mono text-xs text-cream-100/30 tracking-wide">
            Treatment-free. Single-origin. Hand-harvested.
          </p>
        </div>
      </div>
    </footer>
  );
}
