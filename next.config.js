// next.config.js
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: 'localhost',
        port: '3000',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: {
    buildActivity: false,
  },
  // output: 'standalone'
};

module.exports = nextConfig;
