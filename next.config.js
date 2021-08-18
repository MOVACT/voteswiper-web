const withPlugins = require('next-compose-plugins');
const nextTranslate = require('next-translate');
const nextConfig = {
  poweredByHeader: false,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    iconSizes: [],
    domains: ['cdn.voteswiper.org', 'voteswiper-assets-prod.fra1.digitaloceanspaces.com', 'voteswiper-assets.ams3.cdn.digitaloceanspaces.com', 'a.storyblok.com', 'voteswiper-uploads-dev.s3.eu-central-1.amazonaws.com'],
    path: '/_next/image',
    loader: 'default',
    disableStaticImages: true
  },
  rewrites: () => [
    { source: '/!:path*', destination: 'https://old.voteswiper.org/!:path*' },
  ],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'sameorigin',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/embed/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: '',
          }
        ]
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/de/germany',
        destination: '/de/deutschland',
        locale: false,
        permanent: true,
      },
      {
        source: '/de/austria',
        destination: '/de/oesterreich',
        locale: false,
        permanent: true,
      },
      {
        source: '/de/faq',
        destination: '/de/page/faq',
        locale: false,
        permanent: true,
      },
      {
        source: '/de/germany',
        destination: '/de/deutschland',
        locale: false,
        permanent: true,
      },
      {
        source: '/catchAll',
        destination: '/de',
        locale: false,
        permanent: false,
      },
      {
        source: '/catchAll/:slug*',
        destination: '/de/:slug*',
        locale: false,
        permanent: false,
      },
    ]
  },

  
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg?$/,
      oneOf: [
        {
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                prettier: false,
                svgo: true,
                svgoConfig: {
                  plugins: [{removeViewBox: false}],
                },
                titleProp: true,
              },
            },
          ],
          issuer: {
            and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
          },
        },
      ],
    })

    return config
  },
};

module.exports = withPlugins([[nextTranslate]], nextConfig);
