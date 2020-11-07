const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MinifyPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

require('dotenv').config();

let entries = [
  path.resolve(__dirname, 'client/js/index.js'),
  path.resolve(__dirname, 'client/scss/main.scss'),
  path.resolve(__dirname, 'client/views/index.hbs')
]
if (process.env.NODE_ENV === 'development') {
  entries.push('webpack-dev-server/client?http://localhost:6969', 'webpack/hot/only-dev-server');
}

module.exports = {
  entry: entries,
  output: {
    filename: process.env.NODE_ENV === 'development' ? 'bundle.min.js' : '[name].[contenthash].js',
    path: path.resolve(__dirname, 'public')
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 6969,
    contentBase: path.resolve(__dirname, 'client'),
    watchContentBase: process.env.NODE_ENV == 'development',
    open: true,
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: false,
      warnings: true,
      publicPath: false
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: ['babel-loader', 'source-map-loader',  {
          loader: 'eslint-loader',
          options: {
            fix: true,
          }
        }],
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
        options: {
          knownHelpersOnly: false,
          partialDirs: [path.join(__dirname, './client/views/partials')],
      },
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
    ],
  },
  plugins: [
    new MinifyPlugin(),
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === 'development' ? 'style.min.css' : '[name].[contenthash].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: './client/views/index.hbs',
      minify: true,
      inject: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './client/images', to: 'images' },
      ],
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
  },
}