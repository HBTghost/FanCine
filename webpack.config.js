/**
 * Webpack main configuration file
 */

const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ImageMinPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const environment = require('./configuration/environment');

let htmlPageNames = fs.readdirSync(path.resolve(__dirname, environment.paths.source, 'views/pages/'));
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HTMLWebpackPlugin({
    inject: true,
    hash: false,
    template: path.resolve(__dirname, environment.paths.source, 'views/pages', name),
    filename: `${name.substr(0, name.indexOf('.'))}.html`,
    favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
  })
});

module.exports = {
  entry: {
    app: path.resolve(environment.paths.source, 'js', 'app.js'),
  },
  output: {
    filename: 'js/[name].js',
    path: environment.paths.output,
  },
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: 'handlebars-loader',
            options: {
              knownHelpersOnly: false,
              partialDirs: [path.resolve(environment.paths.source, 'views', 'partials')]
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/design/[name].[hash:6].[ext]',
              publicPath: './',
              limit: environment.limits.images,
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'fonts/[name].[hash:6].[ext]',
              publicPath: '../',
              limit: environment.limits.fonts,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new ImageMinPlugin({ test: /\.(jpg|jpeg|png|gif|svg)$/i }),
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new NodemonPlugin({
      script: './server/index.js',
      watch: path.resolve('./server'),
      ext: 'js,json',
      delay: "1000",
      verbose: true,    
    }),
    new HTMLWebpackPlugin({
      inject: true,
      hash: false,
      template: path.resolve(__dirname, environment.paths.source, 'views/index.hbs'),
      filename: 'index.html',
      favicon: path.resolve(environment.paths.source, 'images', 'favicon.ico'),
    })
  ].concat(multipleHtmlPlugins),
  target: 'web',
};
