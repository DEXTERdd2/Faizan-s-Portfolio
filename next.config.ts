import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 100],
    localPatterns: [
      { pathname: "/hero-portrait.png" },
      { pathname: "/og-image.svg" },
      { pathname: "/projects/**" },
    ],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "api.getlayers.ai" },
    ],
  },
};

export default nextConfig;
