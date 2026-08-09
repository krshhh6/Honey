import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://naturalbee.farm'),
  title: {
    default: 'Natural Bee Farm — Raw Honey from the Nilgiri Hills',
    template: '%s | Natural Bee Farm',
  },
  description:
    'Single-origin, treatment-free raw honey from our forty hives in the Nilgiri Hills, Tamil Nadu. Two harvests a year. Hand-extracted, hand-labelled. Wildflower Raw, Forest Dark, Raw Comb, Creamed Honey.',
  keywords: [
    'raw honey India',
    'Nilgiri honey',
    'artisan honey',
    'treatment-free beekeeping',
    'single origin honey',
    'wildflower honey Tamil Nadu',
  ],
  authors: [{ name: 'Natural Bee Farm' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Natural Bee Farm',
    title: 'Natural Bee Farm — Raw Honey from the Nilgiri Hills',
    description:
      'Forty hives. Seventeen seasons. Two harvests a year. Raw, unfiltered, and honest — from the Nilgiri Hills to your kitchen.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Natural Bee Farm' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Natural Bee Farm',
    description: 'Raw, unfiltered honey from the Nilgiri Hills.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#D4890A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
