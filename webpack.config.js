const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    path.resolve(__dirname, 'client/js/index.js'),
    path.resolve(__dirname, 'client/scss/main.scss'),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client'),
  },
  watch: true,
  devServer: {
    port: 6969,
    contentBase: path.resolve(__dirname, 'client'),
    watchContentBase: true,
    hot: true,
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
          'style-loader',
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
    // Where the compiled SASS is saved to
    new MiniCssExtractPlugin({
      filename: 'style.css',
      allChunks: true,
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