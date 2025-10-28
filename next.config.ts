import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tvkqolkaaqmqftrawadd.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/trip-ai/**',
      },
      {
        protocol: 'https',
        hostname: 'places.googleapis.com', 
        port: '',
        pathname: '/v1/places/**',
      },
    ],
  },
};

export default nextConfig;
