
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          { type: 'host', value: 'adinn-three.vercel.app' },
        ],
        destination: 'https://www.adinn.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
