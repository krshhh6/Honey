# Natural Bee Farm — Web

Premium marketing/e-commerce website for Natural Bee Farm, a single-origin artisanal honey brand from the Nilgiri Hills, Tamil Nadu.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode, `noImplicitAny`) |
| Styling | Tailwind CSS with full custom design token system |
| Animations | Framer Motion (text reveals, shared layout, modals) + GSAP (scroll) |
| State | React Context + useReducer (cart) |

## Running the Project

You'll need Node.js installed. Then:

```bash
cd web
npm install
npm run dev
```

Opens at **http://localhost:3000**

## Project Structure

```
/
├── web/                     # Next.js 14 web application
│   ├── src/
│   │   ├── app/             # App Router pages + layout
│   │   │   ├── page.tsx         # Home
│   │   │   ├── layout.tsx       # Root layout (SEO metadata, providers)
│   │   │   ├── shop/            # Shop listing page
│   │   │   ├── our-story/       # Brand story + process timeline
│   │   │   └── contact/         # Contact + farm visits
│   │   ├── components/
│   │   │   ├── ui/              # Button, Badge, Modal, Icons (design system)
│   │   │   ├── sections/        # Hero, BrandStory, ProductShelf, ProcessTimeline,
│   │   │   │                    #   Sustainability, Testimonials, FarmVisit
│   │   │   └── layout/          # Header, Footer, CartDrawer
│   │   ├── context/
│   │   │   └── CartContext.tsx  # Full cart state (add/remove/qty/open/close)
│   │   ├── data/                # Typed mock content (products, testimonials, etc.)
│   │   ├── hooks/               # useReducedMotion, useMagneticHover, useScrollProgress
│   │   ├── lib/                 # gsap.ts (plugin registration), framer-variants.ts
│   │   └── types/               # index.ts — all content model interfaces
│   ├── public/images/           # Product + farm photography
│   └── tailwind.config.ts       # Full custom design token system
│
└── packages/
    └── core/
        └── types/               # Shared types — ready for RN Expo monorepo

```

## Design Tokens

Defined in `tailwind.config.ts`:

| Token family | Role |
|---|---|
| `cream-50/100/200` | Page background, card surfaces |
| `honey-100–700` | Primary brand accent |
| `walnut-700–900` | Text, dark surfaces |
| `wax-200–600` | Honeycomb motifs, dividers |
| `sage-100–700` | Sustainability section accent |

**Fonts**: Fraunces (display/editorial) · DM Sans (body) · DM Mono (labels/prices)

## Animation Architecture

- **Framer Motion**: Text character stagger reveals, product card → modal shared layout transitions (`layoutId`), mobile menu clip-path animation, cart drawer slide-in
- **GSAP**: (imported in `lib/gsap.ts`) — ScrollTrigger for parallax on hero, SVG path drawing for process illustrations
- **prefers-reduced-motion**: Checked via `useReducedMotion` hook in every animated component

## Future / Monorepo

The `packages/core` directory is scaffolded as a future shared package for a React Native Expo companion app. Move `src/types/index.ts` and `src/data/` into `packages/core` and add the package to yarn/pnpm workspaces.
