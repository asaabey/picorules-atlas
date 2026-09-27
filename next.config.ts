import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,
  turbopack: { root: process.cwd() },
  transpilePackages: ['picorules-compiler-js-core'],
};

export default nextConfig;
