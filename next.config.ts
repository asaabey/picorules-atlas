import type { NextConfig } from 'next';
import { resolve } from 'node:path';

const nextConfig: NextConfig = {
  trailingSlash: true,
  turbopack: { root: resolve(process.cwd(), '..') },
  transpilePackages: ['picorules-compiler-js-core'],
};

export default nextConfig;
