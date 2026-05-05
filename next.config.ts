import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/navigate',
        destination: '/navigate/cancer',
        permanent: true,
      },
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
      // Security headers for all routes
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://vercel.live https://*.pusher.com wss://*.pusher.com https://sockjs.pusher.com",
              "frame-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
        ],
      },
      // Cache control for quiz paths
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
