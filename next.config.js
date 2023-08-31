module.exports = {
  images: {
    // domains: ['placehold.co'],
    unoptimized: true,

  },

  assetPrefix: 'http://pegpag.acutistecnologia.com/',
  webpack(config) {
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },

  // to serve static files
  // output: 'export',
}
