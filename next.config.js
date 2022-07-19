/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    contentsBasePath: '/contents',
  },

  experimental: {
    //https://nextjs.org/docs/api-reference/next/future/image
    images: {
      allowFutureImage: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'image.tmdb.org',
        },
      ],
    },
  },
};

module.exports = nextConfig;
