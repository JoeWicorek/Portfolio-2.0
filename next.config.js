/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',  // Generate static HTML/CSS/JS
    trailingSlash: true,
    images: {
        unoptimized: true, // Required for static export
    },
    // Ensure static files are served correctly
    assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
    basePath: '',
};

module.exports = nextConfig;
