const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
require('dotenv').config();

module.exports = {
  entry: [
    path.resolve(__dirname, 'client/js/index.js'),
    path.resolve(__dirname, 'client/scss/main.scss'),
    'webpack-dev-server/client?http://localhost:6969',
    'webpack/hot/only-dev-server',
  ],
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    port: 6969,
    contentBase: path.resolve(__dirname, 'public'),
    watchContentBase: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                path: 'postcss.config.js' 
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {outputStyle: 'compressed'}
            }
          }
        ]
      }
    ]
  },
  mode: 'development',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.min.css',
      allChunks: true,
      disable: process.env.NODE_ENV !== 'production'
    }),
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })
    ]
  }
}