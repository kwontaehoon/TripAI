import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [new URL('https://tvkqolkaaqmqftrawadd.supabase.co/storage/v1/object/public/trip-ai/**')],
  },
};

export default nextConfig;
