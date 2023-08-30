module.exports = {
  images: {
    // domains: ['placehold.co'],
    unoptimized: true,

  },

  assetPrefix: 'http://ec2-18-222-169-213.us-east-2.compute.amazonaws.com/app/',
  webpack(config) {
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },

  // to serve static files
  // output: 'export',
}
