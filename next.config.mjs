import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: { esmExternals: true },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      // { source: '/', destination: '/home', permanent: true },
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
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
  },
});

export default withMDX(nextConfig);
