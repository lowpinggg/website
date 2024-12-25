import type { NextConfig } from 'next'
import MillionLint from '@million/lint'

const nextConfig: NextConfig = {
  /* config options here */
  // add 27.0.0.1 to the list of allowed hosts
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        protocol: 'https',
        hostname: 'oroqkwktxvuxkwoszubb.supabase.co',
      },
    ],
  },
}

export default MillionLint.next({
  enabled: true,
  rsc: true,
  filter: {
    exclude: '**/components/ui/**',
  },
})(nextConfig)
