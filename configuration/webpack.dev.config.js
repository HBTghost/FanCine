/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');

const webpackConfiguration = require('../webpack.config');
const environment = require('./environment');

module.exports = merge(webpackConfiguration, {
  mode: 'development',

  /* Manage source maps generation process */
  devtool: 'inline-source-map',

  /* Development Server Configuration */
  devServer: {
    contentBase: environment.paths.source,
    watchContentBase: true,
    publicPath: '/',
    open: true,
    historyApiFallback: true,
    compress: true,
    overlay: true,
    hot: true,
    watchOptions: {
      poll: 300,
    },
    ...environment.server,
    proxy: {
      '/api': {
          target: 'http://localhost:8080',
          secure:false,
          changeOrigin:true
      },
    }
  },
  /* File watcher options */
  watchOptions: {
    aggregateTimeout: 300,
    poll: 300,
    ignored: /node_modules/,
  },

  /* Additional plugins configuration */
  plugins: [],
});
