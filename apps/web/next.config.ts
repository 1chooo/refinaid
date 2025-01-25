import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.1chooo.com',
      },
    ],
  },
};

export default nextConfig;
