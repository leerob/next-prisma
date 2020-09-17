const PrismaClientReloaderPlugin = require('./plugin');

exports.webpack = (config) =>
  Object.assign(config, {
    plugins: [
      ...config.plugins,
      new PrismaClientReloaderPlugin()
    ],
    watchOptions: {
      ignored: ['**/.git/**', '**/.next/**']
    }
  });
