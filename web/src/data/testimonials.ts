// src/data/testimonials.ts
import type { TestimonialEntry } from '@/types';

export const testimonials: TestimonialEntry[] = [
  {
    id: 'priya-ooty',
    quote:
      'I opened the Wildflower Raw and just stood at the kitchen counter eating it with a spoon. That\'s not something I\'ve ever done with honey before. It tastes like somewhere real.',
    author: 'Priya Krishnaswamy',
    location: 'Bangalore',
    since: 'customer since 2021',
    product: 'Wildflower Raw',
    layout: 'full',
  },
  {
    id: 'arjun-chef',
    quote:
      'As a chef I\'m careful about ingredient provenance. The Forest Dark is the first Indian honey I\'ve put on a tasting menu — it stands next to anything from Burgundy or Tuscany.',
    author: 'Arjun Shetty',
    location: 'Mumbai',
    since: 'chef & wholesale partner',
    product: 'Forest Dark',
    layout: 'offset-left',
  },
  {
    id: 'meera-farm',
    quote:
      'We visited on a third Sunday in November. Watched the extraction. Bought six jars. I\'ve been sending them as gifts ever since — it\'s become the thing I give when I want to say something that matters.',
    author: 'Meera Nair',
    location: 'Kochi',
    since: 'customer since 2019',
    layout: 'with-image',
    imageSrc: '/images/farm-story-bees.jpg',
  },
];
