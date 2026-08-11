import type { Metadata, Viewport } from 'next';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import './globals.css';

export const metadata: Metadata = {
  title: 'Meadlight — The Brand New Honey Drink',
  description: 'Principio is a fermented honey drink. 100% raw honey. Prodotto in Italia.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#ffcc26',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        {children}
        <Footer />
      </body>
    </html>
  );
}
