import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Canonical host: livenowclub.com (matches canonical tags and JSON-LD).
      // Without this, www serves a full duplicate of every page.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.livenowclub.com' }],
        destination: 'https://livenowclub.com/:path*',
        permanent: true,
      },
      {
        source: '/navigate',
        destination: '/navigate/cancer',
        permanent: true,
      },
      // Expecting the Unexpected now lives as chapters under /navigate/cancer/guide.
      {
        source: '/read/expecting-the-unexpected',
        destination: '/navigate/cancer/guide',
        permanent: true,
      },
      // Retired practical guide pages (Oct 2026); send old links to the cancer guide.
      ...['what-to-say','how-to-prepare-for-chemo','just-diagnosed','how-to-help-someone-with-cancer'].map((slug) => ({
        source: `/navigate/cancer/${slug}`,
        destination: '/navigate/cancer',
        permanent: true,
      })),
      {
        source: '/navigate/life',
        destination: '/philosophy',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/wonder/essay/quiz',
        destination: '/wonder/essay/quiz/index.html',
      },
      {
        source: '/wonder/essay/quiz/explore',
        destination: '/wonder/essay/quiz/explore/index.html',
      },
      {
        source: '/wonder/essay',
        destination: '/wonder/essay/index.html',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/wonder/essay/quiz/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
