import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
