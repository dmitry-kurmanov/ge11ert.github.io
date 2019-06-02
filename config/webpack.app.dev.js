const baseConfig = require('./webpack.app.base');

module.exports = {
  ...baseConfig,
  name: 'dev',
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true,
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false,
    },
    disableHostCheck: true,
  },
};
