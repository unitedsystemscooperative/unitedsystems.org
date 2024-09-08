/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')({
  dest: 'public',
});

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  experimental: { esmExternals: true },
  pageExtensions: ['page.tsx', 'api.ts'],
  async redirects() {
    return [
      { source: '/', destination: '/home', permanent: true },
      // Join Request List has moved twice since inception.
      {
        source: '/admin/joinList',
        destination: '/admin/joinRequests',
        permanent: true,
      },
      {
        source: '/join/joinListforHC',
        destination: '/admin/joinRequests',
        permanent: true,
      },
    ];
  },
};
