/** @type {import('next').NextConfig} */
const nextConfig = {
   output: 'standalone',
   distDir: 'build',
   images: {
      remotePatterns: [new URL('https://picsum.photos/**'), new URL('http://localhost:3333/**')],
   },
}

export default nextConfig
