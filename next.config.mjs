/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Configure which admin pages should not be pre-rendered
  experimental: {
    excludeDefaultMomentLocales: true,
  },
  
  // Add build-time environment variables
  env: {
    APP_URL: process.env.APP_URL,
  },
  
  // Define redirects and rewrites
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
