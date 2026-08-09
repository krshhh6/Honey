// src/data/storyBeats.ts
import type { StoryBeat } from '@/types';

export const storyBeats: StoryBeat[] = [
  {
    id: 'the-farm',
    heading: 'The Farm',
    body: 'Nestled in the Nilgiri foothills at 1,600 metres above sea level, our forty hives have worked the same wildflower meadows for seventeen seasons. The elevation matters — the air is clean, the blooms are unhurried, and the bees have never had to compete with pesticide-treated monocultures.',
    imageSrc: '/images/hero-farm-bg.jpg',
    imageAlt: 'Beehive boxes in the Nilgiri meadows at golden hour',
  },
  {
    id: 'the-bees',
    heading: 'The Bees',
    body: 'We practice treatment-free beekeeping. No antibiotics, no artificial feeding, no queen replacement. The colonies that thrive here have adapted over generations to this specific landscape. A weaker colony that needs intervention is a message from the hive — we listen to it, not override it.',
    imageSrc: '/images/farm-story-bees.jpg',
    imageAlt: 'Close-up of bees on honeycomb frame',
  },
  {
    id: 'the-harvest',
    heading: 'The Harvest',
    body: 'We extract twice a year — June, after the wildflower bloom, and November, after the forest forage. Each batch is cold-extracted, hand-filtered through a single coarse mesh, and rested for two weeks before bottling. Every jar is tasted, numbered, and dated. If it\'s not exceptional, it doesn\'t leave the farm.',
    imageSrc: '/images/farm-harvest.jpg',
    imageAlt: 'Beekeeper lifting honey frame at harvest',
  },
];
