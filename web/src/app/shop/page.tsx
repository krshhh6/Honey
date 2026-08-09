import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Shop — Our Honey',
  description: 'Browse Natural Bee Farm\'s full range of raw, single-origin honey. Wildflower Raw, Forest Dark, Raw Comb, and Creamed Honey — all treatment-free from the Nilgiri Hills.',
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-cream-50 pt-32 pb-24">
      <div className="max-w-8xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-wax-500 mb-4">
            The Shelf
          </p>
          <h1
            className="font-display font-bold text-walnut-900 leading-[0.9] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 1.5rem + 5vw, 5.5rem)' }}
          >
            Our<br />
            <span className="italic font-light text-honey-500">Honeys</span>
          </h1>
          <p className="font-body text-walnut-800/70 leading-relaxed">
            Four varieties. Each a distinct landscape, season, and bloom.
            All treatment-free. All cold-extracted. All numbered.
          </p>
        </div>

        {/* Products grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 items-end">
          {products.map((product, i) => (
            <article
              key={product.id}
              className="group"
              style={{ marginTop: i === 1 ? '3rem' : i === 3 ? '5rem' : '0' }}
            >
              <Link
                href={`/shop/${product.slug}`}
                className="block relative rounded-[2rem] overflow-hidden bg-cream-100 shadow-walnut hover:shadow-walnut-lg transition-all duration-500"
                style={{ rotate: `${product.tilt}deg` } as React.CSSProperties}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {product.badge && (
                    <div className="absolute top-4 left-4">
                      <Badge variant={product.id === 'forest-dark' ? 'walnut' : 'honey'}>
                        {product.badge}
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="font-display font-bold text-walnut-900 text-2xl leading-tight mb-1">
                    {product.name}
                  </h2>
                  <p className="font-body text-sm text-walnut-800/60 mb-4 italic">
                    {product.subtitle}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs text-wax-500 tracking-widest uppercase">From</span>
                      <p className="font-display font-bold text-honey-600 text-xl">
                        ₹{(product.price / 100).toFixed(0)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
