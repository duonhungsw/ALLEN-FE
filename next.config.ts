// import type { NextConfig } from "next";

// const nextConfig = {
//   output: "standalone", // hoặc bỏ hẳn `output` nếu bạn không cần `export`
//   typescript: {
//     ignoreBuildErrors: true,
//   },
// };

// export default nextConfig;


import path from "path";
import type { NextConfig } from "next";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin"; // add plugin

const nextConfig: NextConfig = {
  output: "standalone",

  typescript: {
    ignoreBuildErrors: true, // đã đúng
  },

  webpack: (config) => {
    // Alias @ -> src
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
    };

    // Bắt lỗi sai chữ hoa/thường như common vs Common
    config.plugins.push(new CaseSensitivePathsPlugin());

    return config;
  },
};

export default nextConfig;
