import type { NextConfig } from 'next';
import { resolve } from 'node:path';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  turbopack: { root: resolve(process.cwd(), '..') },
  transpilePackages: ['picorules-compiler-js-core'],
};

export default nextConfig;
