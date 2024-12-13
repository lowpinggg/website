import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  // add 27.0.0.1 to the list of allowed hosts
  images: {
    remotePatterns: [
      {
        hostname: "127.0.0.1",
      },
    ],
  },
}

export default nextConfig
