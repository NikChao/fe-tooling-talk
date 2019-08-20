const webpack = require('webpack');

const WebpackDevServer = require('webpack-dev-server');
const getConfig = require('./webpack.config.js');
const path = require('path');

const argv = process.argv.slice(2);
const entryName = argv[0];

const config = getConfig({ entryName, hotReload: true });
config.mode = 'development';

const host = '0.0.0.0'
const port = 3000;

const compiler = webpack(config);

const devServerConfig = {
  contentBase: path.resolve(entryName),
  compress: true,

  hot: true,
  inline: true,

  host,
  port,

  contentBase: path.resolve('public'),
  publicPath: '/',
  watchContentBase: true,
};

const devServer = new WebpackDevServer(compiler, devServerConfig);
devServer.listen(port, host);