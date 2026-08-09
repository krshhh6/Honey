/** @type {import('next').NextConfig} */
const nextConfig = {
  // Images from external domains (add if using any external image sources)
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
  },
  // Strict mode for React 18
  reactStrictMode: true,
  // Experimental: app router typedRoutes
  experimental: {},
};

export default nextConfig;
