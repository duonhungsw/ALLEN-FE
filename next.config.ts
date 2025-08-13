import path from "path";
import type { NextConfig } from "next";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";

const nextConfig: NextConfig = {
  output: "standalone",

  typescript: {
    ignoreBuildErrors: true,
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
    };

    config.plugins.push(new CaseSensitivePathsPlugin());

    return config;
  },
};

export default nextConfig;
