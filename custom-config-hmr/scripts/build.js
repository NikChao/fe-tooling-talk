const webpack = require('webpack');
const getConfig = require('./webpack.config.js');
const path = require('path');


const argv = process.argv.slice(2);
const entryName = argv[0];

webpack(
  getConfig({ entryName }),
  (err, stats) => {
    if (err) {
      console.log('Something went wrong', err);
    }
    if (stats.hasErrors()) {
      console.log(stats.toJson('minimal'));
    }
  }
);

