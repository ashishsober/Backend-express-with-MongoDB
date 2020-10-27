const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './dist/bootstrap.js',
  output: {
    path: path.resolve(__dirname, 'provider-enrollment'),
    filename: 'bundle.js'
  },
  'mode':'development',
  target: 'node',
  node: {
    fs: 'empty',
    __dirname: true
  },
  stats: {
    warnings: false
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        exclude: /\.controller\.ts/i,
        include: /\.ts($|\?)/i,
        parallel: true,
        sourceMap: false
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};