import path from "path";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "standalone",

  // async redirects() {
  //   return [
  //     {
  //       source: "/home",
  //       destination: "/",
  //       permanent: true,
  //     },
  //   ];
  // },

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    domains: ["lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "allenblob.blob.core.windows.net",
        pathname: "/**",
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

export default withNextIntl(nextConfig);
