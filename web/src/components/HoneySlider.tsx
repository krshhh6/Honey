'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

/* Swiper core styles */
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
  { id: 1, title: '100% Raw Honey', body: 'Cold-extracted, unfiltered, straight from the hive.' },
  { id: 2, title: 'Naturally Fermented', body: 'Ancient process, zero additives, infinite flavour.' },
  { id: 3, title: 'Prodotto in Italia', body: 'Every bottle born in the Italian hills.' },
  { id: 4, title: 'Low ABV', body: 'Light, refreshing and easy to enjoy anywhere.' },
];

export default function HoneySlider() {
  return (
    <section className="slider-section">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640:  { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        loop
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="honey-swiper"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id}>
            <div className="slide-card">
              <h3 className="slide-card__title">{s.title}</h3>
              <p  className="slide-card__body">{s.body}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
