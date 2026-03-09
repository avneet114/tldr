import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/tldr",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/tldr",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
