/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    // Serve static files from public directory
    assetPrefix: '',
    // Enable trailing slashes
    trailingSlash: true,
};

module.exports = nextConfig;
