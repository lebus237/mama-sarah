/** @type {import('next').NextConfig} */
const nextConfig = {
   output: 'standalone',
   distDir: 'build',
   // devIndicators: false,
   i18n: {
      locales: ['en', 'fr'],
      localeDetection: true,
      defaultLocale: 'en',
   },
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'iderma.s3.eu-west-1.amazonaws.com',
         },
      ],
   },
   // allowedDevOrigins: ['dev.iderma.*'],
}

module.exports = nextConfig
