// src/data/navigation.ts
import type { NavItem } from '@/types';

export const navItems: NavItem[] = [
  { label: 'Shop', href: '/shop' },
  {
    label: 'Our Honey',
    href: '/shop',
    children: [
      { label: 'Wildflower Raw', href: '/shop/wildflower-raw' },
      { label: 'Forest Dark', href: '/shop/forest-dark' },
      { label: 'Raw Comb', href: '/shop/raw-comb' },
      { label: 'Creamed Honey', href: '/shop/creamed-honey' },
    ],
  },
  { label: 'Our Story', href: '/our-story' },
  { label: 'The Process', href: '/our-story#process' },
  { label: 'Contact', href: '/contact' },
];
