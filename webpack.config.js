const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client/js/index.js'),
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
  mode: 'development'
}