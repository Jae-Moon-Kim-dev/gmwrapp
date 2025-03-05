import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  /* config options here */
};

module.exports = {
  images: {
      unoptimized: true
  },
  compiler: {
    styledComponents: true
  }
}

export default nextConfig;
