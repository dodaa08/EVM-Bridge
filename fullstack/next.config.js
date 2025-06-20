/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
      'net': 'commonjs net',
      'tls': 'commonjs tls',
      'crypto': 'commonjs crypto',
      'stream': 'commonjs stream',
      'http': 'commonjs http',
      'https': 'commonjs https',
      'zlib': 'commonjs zlib',
      'path': 'commonjs path',
      'fs': 'commonjs fs',
    })
    return config
  },
}

module.exports = nextConfig
