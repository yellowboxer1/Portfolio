import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  productionBrowserSourceMaps: false,
  headers: async () => [
    {
      source: "/portfolio/partnerit/optimized/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    },
  ],
  redirects: async () => [
    {
      source: "/profile",
      destination:
        "/?utm_source=saramin&utm_medium=profile&utm_campaign=portfolio",
      permanent: false,
    },
    {
      source: "/career",
      destination:
        "/?utm_source=remember&utm_medium=profile&utm_campaign=portfolio",
      permanent: false,
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
