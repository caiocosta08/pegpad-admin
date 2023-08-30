module.exports = {
  images: {
    // domains: ['placehold.co'],
    unoptimized: true,

  },

  basePath: '/pegpag-admin',
  webpack(config) {
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },

  // to serve static files
  // output: 'export',
}
