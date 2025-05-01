import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith("https")
          ? "https"
          : "http",
        hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").hostname,
      },
    ],
  },
};

export default nextConfig;
