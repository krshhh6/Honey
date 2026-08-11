import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Meadlight — The Brand New Honey Drink',
  description: 'Principio is a fermented honey drink. 100% raw honey. Prodotto in Italia.',
};

export const viewport: Viewport = {
  themeColor: '#ffcc26',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
