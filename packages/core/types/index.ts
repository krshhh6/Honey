// packages/core/types/index.ts
// Shared type definitions — ready to be consumed by both the Next.js web app
// and a future React Native (Expo) companion app in a monorepo setup.
//
// To use in a monorepo:
// 1. Add this package to package.json workspaces
// 2. Import as: import type { Product } from '@naturalbee/core'
// 3. Reference from both web/ and mobile/ apps

export type { Product, WeightOption, ProductImage, TestimonialEntry, ProcessStep, NavItem, StoryBeat, CartItem, SustainabilityStat } from '../../web/src/types/index';
