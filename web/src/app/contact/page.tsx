import type { Metadata } from 'next';
import { FarmVisitSection } from '@/components/sections/FarmVisitSection';

export const metadata: Metadata = {
  title: 'Contact & Farm Visits',
  description:
    'Get in touch with Natural Bee Farm — wholesale enquiries, farm visits, or just a hello. We open the farm gates every third Sunday.',
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <div className="max-w-8xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-wax-500 mb-6">
          Contact
        </p>
        <h1
          className="font-display font-bold text-walnut-900 leading-[0.88] max-w-3xl mb-8"
          style={{ fontSize: 'clamp(3rem, 1rem + 9vw, 8rem)' }}
        >
          Say<br />
          <span className="italic font-light text-honey-500">hello.</span>
        </h1>
        <div className="grid sm:grid-cols-3 gap-8 max-w-3xl">
          {[
            { label: 'Email', value: 'hello@naturalbee.farm', id: 'email' },
            { label: 'Phone', value: '+91 94440 00000', id: 'phone' },
            { label: 'Address', value: 'Nilgiri Hills, Tamil Nadu 643 001', id: 'address' },
          ].map((item) => (
            <div key={item.id} id={item.id}>
              <p className="font-mono text-xs tracking-widest uppercase text-wax-500 mb-2">
                {item.label}
              </p>
              <p className="font-body text-walnut-800">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div id="visits">
        <FarmVisitSection />
      </div>
    </div>
  );
}
