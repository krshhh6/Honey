// src/data/products.ts — typed mock product catalog
import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'wildflower-raw',
    slug: 'wildflower-raw',
    name: 'Wildflower Raw',
    subtitle: 'The meadow in a jar',
    description:
      'Harvested from hives set deep in the Nilgiri meadows, this honey carries the living complexity of thirty-two wildflower varieties. Lightly floral on the nose, long and warm on the finish. Cold-extracted, never heated above 35°C.',
    tastingNotes: ['Acacia blossom', 'Fresh hay', 'Warm beeswax', 'Long amber finish'],
    origin: 'Nilgiri Hills, Tamil Nadu',
    harvestSeason: 'June Harvest',
    weightOptions: [
      { grams: 250, priceMultiplier: 1 },
      { grams: 500, priceMultiplier: 1.8 },
      { grams: 1000, priceMultiplier: 3.2 },
    ],
    price: 42000, // ₹420 in paise
    images: [
      { src: '/images/wildflower-raw.jpg', alt: 'Wildflower Raw honey jar with wooden dipper', width: 800, height: 1000 },
    ],
    badge: 'Raw & Unfiltered',
    color: 'honey-400',
    tilt: -3,
    featured: true,
  },
  {
    id: 'forest-dark',
    slug: 'forest-dark',
    name: 'Forest Dark',
    subtitle: 'Bitter edge, deep soul',
    description:
      'Our most complex variety. Foraged from the forest fringe where the bees work the rare Soapnut and Eucalyptus in early monsoon. A honey with mineral depth, a dry bitter finish, and a lingering warmth that rewards the patient palate.',
    tastingNotes: ['Dark molasses', 'Bitter tobacco leaf', 'Wet earth', 'Mineral finish'],
    origin: 'Kodaikanal Forest Edge, Tamil Nadu',
    harvestSeason: 'November Harvest',
    weightOptions: [
      { grams: 200, priceMultiplier: 1 },
      { grams: 500, priceMultiplier: 2.2 },
    ],
    price: 68000, // ₹680
    images: [
      { src: '/images/forest-dark.jpg', alt: 'Forest Dark honey in dark amber glass jar', width: 800, height: 1000 },
    ],
    badge: 'Limited Edition',
    color: 'walnut-800',
    tilt: 4,
    featured: true,
  },
  {
    id: 'raw-comb',
    slug: 'raw-comb',
    name: 'Raw Comb',
    subtitle: 'Straight from the frame',
    description:
      'Cut directly from the Langstroth frame, sealed in its original beeswax casing. The comb is edible — chew it slowly. The wax releases a bloom of honey that no jar extraction can replicate. Each piece is cut to order and weighed by hand.',
    tastingNotes: ['Fresh beeswax', 'Floral pollen', 'Sweet cream', 'Wildflower meadow'],
    origin: 'Nilgiri Hills, Tamil Nadu',
    harvestSeason: 'June Harvest',
    weightOptions: [
      { grams: 300, priceMultiplier: 1 },
      { grams: 600, priceMultiplier: 1.9 },
    ],
    price: 85000, // ₹850
    images: [
      { src: '/images/raw-comb.jpg', alt: 'Raw honeycomb section on walnut board', width: 800, height: 1000 },
    ],
    badge: 'Cut to Order',
    color: 'wax-500',
    tilt: -2,
    featured: true,
  },
  {
    id: 'creamed-honey',
    slug: 'creamed-honey',
    name: 'Creamed Honey',
    subtitle: 'Silk on the tongue',
    description:
      'Slowly crystallized through a process called Dyce Method — stirred at precise temperatures over ten days until it reaches a pale, spreadable consistency. It won\'t run. Spread it thick on sourdough while it\'s still warm from the oven.',
    tastingNotes: ['Pale blossom', 'Vanilla cream', 'Soft butter', 'Delicate sweetness'],
    origin: 'Nilgiri Hills, Tamil Nadu',
    harvestSeason: 'Year-round (small-batch)',
    weightOptions: [
      { grams: 250, priceMultiplier: 1 },
      { grams: 500, priceMultiplier: 1.85 },
    ],
    price: 55000, // ₹550
    images: [
      { src: '/images/creamed-honey.jpg', alt: 'Creamed honey in ceramic crock with wooden spoon', width: 800, height: 1000 },
    ],
    badge: 'Small Batch',
    color: 'cream-100',
    tilt: 3,
    featured: false,
  },
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);
