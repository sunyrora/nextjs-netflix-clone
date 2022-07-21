/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    realPath: '/contents',
    contentsBasePath: '/browse',
    asPath: '/browse',
  },
  async rewrites() {
    return [
      // {
      //   source: `${this.env.asPath}`,
      //   destination: this.env.realPath,
      // },
      // {
      //   source: `${this.env.asPath}/:path*`,
      //   destination: this.env.realPath,
      // },
      {
        source: `${this.env.contentsBasePath}/:path*`,
        destination: this.env.realPath,
      },
      {
        source: `${this.env.realPath}/:path*`,
        destination: this.env.realPath,
      },
    ];
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
