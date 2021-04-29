const withPlugins = require('next-compose-plugins');
const nextTranslate = require('next-translate');
const nextConfig = {
  poweredByHeader: false,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    iconSizes: [],
    domains: ['voteswiper-assets.ams3.cdn.digitaloceanspaces.com', 'a.storyblok.com'],
    path: '/_next/image',
    loader: 'default',
  },
  rewrites: () => [
    { source: '/!:path*', destination: 'https://voteswiper.org/!:path*' },
  ],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    // Important: return the modified config
    return config;
  },
};

module.exports = withPlugins([[nextTranslate]], nextConfig);
