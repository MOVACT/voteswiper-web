const withPlugins = require('next-compose-plugins');
const nextTranslate = require('next-translate');
const nextConfig = {
  poweredByHeader: false,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    iconSizes: [],
    domains: ['voteswiper-assets.ams3.cdn.digitaloceanspaces.com', 'a.storyblok.com', 'voteswiper-uploads-dev.s3.eu-central-1.amazonaws.com'],
    path: '/_next/image',
    loader: 'default',
  },
  rewrites: () => [
    { source: '/!:path*', destination: 'https://voteswiper.org/!:path*' },
  ],
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
