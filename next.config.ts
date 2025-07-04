import type { NextConfig } from "next";

const nextConfig = {
  output: "standalone", // hoặc bỏ hẳn `output` nếu bạn không cần `export`
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
