const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './dist/server.js',
  output: {
    path: path.resolve(__dirname, 'provider-enrollment'),
    filename: 'bundle.js'
  },
  'mode':'production',
  target: 'node',
  node: {
    fs: 'empty',
    __dirname: true
  },
  stats: {
    warnings: false
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};