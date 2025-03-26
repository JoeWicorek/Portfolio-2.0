/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',  // Changed from 'standalone' to 'export' for static site generation
    // Ensure static files are served correctly
    assetPrefix: '',
    // Enable trailing slashes
    trailingSlash: true,
    // Disable image optimization since we're using static files
    images: {
        unoptimized: true
    },
    // Disable server features since we're going fully static
    experimental: {
        appDir: true
    }
};

module.exports = nextConfig;
