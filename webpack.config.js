const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MinifyPlugin = require('uglifyjs-webpack-plugin');
require('dotenv').config();

module.exports = {
  entry: [
    path.resolve(__dirname, 'client/js/index.js'),
    path.resolve(__dirname, 'client/scss/main.scss'),
    'webpack-dev-server/client?http://localhost:6969',
    'webpack/hot/only-dev-server'
  ],
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'public')
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 6969,
    contentBase: path.resolve(__dirname, 'public'),
    watchContentBase: this.mode == 'development',
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: ['babel-loader', 'source-map-loader'],
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
              sourceMap: true,
              sassOptions: {outputStyle: 'compressed'}
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MinifyPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.min.css',
      allChunks: true
    })
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