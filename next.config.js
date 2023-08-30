module.exports = {
  images: {
    // domains: ['placehold.co'],
    unoptimized: true,

  },

  assetPrefix: 'http://18.222.169.213/pegpag-admin/',
  webpack(config) {
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },

  // to serve static files
  // output: 'export',
}
