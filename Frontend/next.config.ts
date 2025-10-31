import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ============================================
  // Optimización de Imágenes
  // ============================================
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ============================================
  // Headers de Seguridad
  // ============================================
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // ============================================
  // Experimental Features
  // ============================================
  experimental: {
    // Optimizar imports de paquetes grandes
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-select',
    ],

    // Turbopack ya está habilitado en dev script
    // turbo: {},
  },

  // ============================================
  // Webpack Configuration
  // ============================================
  webpack: (config, { dev, isServer }) => {
    // Optimización para producción
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Framework chunk (React, Next.js, etc.)
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|next|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Common libraries chunk
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
            },
            // UI libraries chunk
            ui: {
              name: 'ui',
              test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|framer-motion)[\\/]/,
              priority: 30,
            },
            // Large libraries in separate chunks
            lib: {
                test(module: { size(): number; identifier(): string }): boolean {
                return (
                  module.size() > 160000 &&
                  /node_modules[/\\]/.test(module.identifier())
                );
                },
              name(module: { identifier: () => string; }) {
                const packageNameMatch = /[\\/]node_modules[\\/](.*?)([\\/]|$)/.exec(module.identifier());
                const packageName = packageNameMatch ? packageNameMatch[1] : '';
                return `lib.${packageName.replace('@', '')}`;
              },
              priority: 10,
              minChunks: 1,
            },
          },
        },
      };
    }

    return config;
  },

  // ============================================
  // Compiler Options
  // ============================================
  compiler: {
    // Remove console.log in production
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },

  // ============================================
  // Production Source Maps (disabled for security)
  // ============================================
  productionBrowserSourceMaps: false,

  // ============================================
  // Redirects y Rewrites
  // ============================================
  // async redirects() {
  //   return []
  // },

  // async rewrites() {
  //   return []
  // },
};

export default nextConfig;
