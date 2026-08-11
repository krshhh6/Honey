/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'swiper/react' {
  import React from 'react';
  export const Swiper: React.ComponentType<any>;
  export const SwiperSlide: React.ComponentType<any>;
}

declare module 'swiper/modules' {
  export const Autoplay: any;
  export const Pagination: any;
  export const Navigation: any;
  export const EffectFade: any;
}

declare module 'swiper/css';
declare module 'swiper/css/pagination';
declare module 'swiper/css/navigation';
