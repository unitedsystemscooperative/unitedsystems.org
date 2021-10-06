/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: { dest: 'public' },
  experimental: { esmExternals: true },
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
