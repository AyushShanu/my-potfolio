/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // Prevent build failure on dynamic requires from libraries like Supabase
    config.module.exprContextCritical = false;
    return config;
  },
};

module.exports = nextConfig;