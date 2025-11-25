/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // <CHANGE> Add compiler options to target modern browsers and reduce bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // <CHANGE> Configure SWC to target modern browsers only
  experimental: {
    browsersListForSwc: true,
  },
  // <CHANGE> Optimize production builds
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  compress: true,
}

export default nextConfig
