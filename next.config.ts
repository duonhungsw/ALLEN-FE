
import path from "path";
import type { NextConfig } from "next";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";

const nextConfig: NextConfig = {
  output: "standalone",

  typescript: {
    ignoreBuildErrors: true, 
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'allenblob.blob.core.windows.net',
        port: '',
        pathname: '/allen/**',
      },
    ],
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
