/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placehold.co'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;