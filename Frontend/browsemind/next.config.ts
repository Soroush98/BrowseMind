import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.browsemind.net/api/:path*',
      },
    ];
  },
};

export default nextConfig;
