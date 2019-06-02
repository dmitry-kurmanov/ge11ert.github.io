const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sass = require('sass');
const Fiber = require('fibers');

const projectBaseDir = `${__dirname}/..`;
const projectDistDir = 'public';
const environment = process.env.ENV || 'dev';

module.exports = {
  name: 'base',
  mode: 'none',
  entry: {
    app: ['./src/app.js']
  },
  output: {
    path: path.resolve(projectBaseDir, projectDistDir),
    filename: '[name].[hash:16].js',
  },
  resolve: {
    modules: [
      path.join(projectBaseDir, 'src'),
      'node_modules',
    ],
    extensions: ['.js', '.svelte'],
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: environment !== 'dev',
            hotReload: environment === 'dev',
          },
        }
      },
      {
        test: /\.scss$/,
        use: [
          environment === 'dev' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: environment === 'dev',
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('postcss-url')({
                  url: 'inline',
                  maxSize: 3,
                }),
                require('autoprefixer'),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              fiber: Fiber,
              includePaths: [path.resolve('src')],
            },
          },
        ]
      },
      {
        test: /\.(webp|png|jpg|jpeg|gif)$/,
        loader: 'file-loader?name=images/[hash].[ext]',
      },
      {
        test: /\.svg$/,
        loader: 'file-loader?name=images/[hash].[ext]',
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        loader: 'file-loader?name=fonts/[hash].[ext]',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      b: 'bem-react-helper',
    }),
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      template: path.join(projectBaseDir, 'src/index.html'),
      minify: {
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
    }),
  ],
  stats: {
    children: false,
  },
  performance: {
    hints: false,
  }
};
