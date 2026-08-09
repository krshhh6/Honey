// src/data/processSteps.ts
import type { ProcessStep } from '@/types';

export const processSteps: ProcessStep[] = [
  {
    id: 'hive-inspection',
    index: 0,
    season: 'February – March',
    title: 'Hive Inspection',
    description:
      'Every hive is opened and read before the spring bloom. We check brood pattern, colony strength, and queen health — no hive goes into the honey season without a full inspection.',
    illustration: 'inspection',
  },
  {
    id: 'spring-bloom',
    index: 1,
    season: 'March – May',
    title: 'Spring Bloom',
    description:
      'The Nilgiri meadows peak in March. The bees work a radius of three kilometres — wildflowers, coffee blossoms, orange groves. This is when the hive is most alive.',
    illustration: 'bloom',
  },
  {
    id: 'nectar-collection',
    index: 2,
    season: 'April – June',
    title: 'Nectar Collection',
    description:
      'A single forager visits up to 1,500 flowers in one trip. Over six weeks, a colony of 60,000 bees will collect enough nectar for 30 kg of honey. We never rush this.',
    illustration: 'collection',
  },
  {
    id: 'ripening',
    index: 3,
    season: 'May – June',
    title: 'Ripening in the Comb',
    description:
      'The bees fan their wings for days, reducing moisture to below 18%. When a cell is capped with wax, the nectar has become honey. We wait for the bees to tell us it\'s ready.',
    illustration: 'ripening',
  },
  {
    id: 'extraction',
    index: 4,
    season: 'June',
    title: 'Cold Extraction',
    description:
      'We extract by hand, spinning uncapped frames in a small centrifuge. The honey never exceeds 35°C — the temperature of the hive itself. Enzymes, pollen, and flavour remain intact.',
    illustration: 'extraction',
  },
  {
    id: 'bottling',
    index: 5,
    season: 'June – July',
    title: 'Hand-Labelling & Dispatch',
    description:
      'Each jar is filled, wiped, tasted, and labelled by hand. The batch number and harvest date go on every label. If it doesn\'t meet the standard, it doesn\'t leave the farm.',
    illustration: 'bottling',
  },
];
