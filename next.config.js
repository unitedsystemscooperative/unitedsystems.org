/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');

/**
 * @type {import('next').NextConfig}
 */
module.exports = withPWA({
  pwa: { dest: 'public' },
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
});
