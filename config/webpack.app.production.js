const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Csso = require('csso-webpack-plugin').default;
const baseConfig = require('./webpack.app.base');

module.exports = {
  ...baseConfig,
  name: 'production',
  mode: 'production',
  plugins: [
    ...baseConfig.plugins,
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    new Csso(),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: false,
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
    }
  },
};
