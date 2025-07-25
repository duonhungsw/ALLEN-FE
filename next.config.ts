import path from "path";
import type { NextConfig } from "next";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";

const nextConfig: NextConfig = {
  output: "standalone",

  i18n: {
    locales: ["en", "vi"],        // ⚠️ Khai báo các ngôn ngữ hỗ trợ
    defaultLocale: "vi",          // ⚠️ Ngôn ngữ mặc định
    localeDetection: false,        // Tự động phát hiện ngôn ngữ trình duyệt
  },

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
