// types/index.ts — shared content model types
// Designed to be extractable into packages/core for React Native Expo companion app

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  tastingNotes: string[];
  origin: string;
  harvestSeason: string;
  weightOptions: WeightOption[];
  price: number; // base price in INR (paise)
  images: ProductImage[];
  badge?: string; // e.g. "Raw & Unfiltered", "Limited Edition"
  color: string; // CSS token name for card accent, e.g. "honey-400"
  tilt: number; // degrees of intentional tilt for card layout
  featured: boolean;
}

export interface WeightOption {
  grams: number;
  priceMultiplier: number; // multiplied by base price
}

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface TestimonialEntry {
  id: string;
  quote: string;
  author: string;
  location: string;
  since: string; // e.g. "customer since 2019"
  product?: string; // product they're reviewing
  layout: 'full' | 'offset-left' | 'with-image';
  imageSrc?: string;
}

export interface ProcessStep {
  id: string;
  season: string; // e.g. "March – April"
  title: string;
  description: string;
  illustration: string; // SVG path data or component name
  index: number;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface StoryBeat {
  id: string;
  heading: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
}

export interface CartItem {
  product: Product;
  weightOption: WeightOption;
  quantity: number;
}

export interface SustainabilityStat {
  value: string;
  unit?: string;
  label: string;
}
