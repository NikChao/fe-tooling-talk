const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = ({ entryName = 'main.js', hotReload = false }) => ({
  entry: path.resolve(entryName),
  output: {
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },

  plugins: [
    new HotModuleReplacementPlugin({
      multiStep: true
    })
  ]
});
