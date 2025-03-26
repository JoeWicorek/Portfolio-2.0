/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static file serving through /public directory
  assetPrefix: '',
  // Disable server-side rendering for this static site
  output: 'export',
  // Disable image optimization since we're using static files
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes are handled correctly
  trailingSlash: true,
}

module.exports = nextConfig
