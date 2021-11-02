// const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.js',
  // Put your normal webpack config below here  
  externals: {
    'better-sqlite3': 'commonjs better-sqlite3',
  },
  // plugins: [
  //   new CopyPlugin([
  //     {
  //       from: 'root/node_modules/better-sqlite3/',
  //       to: 'output/node_modules/better-sqlite3/', // still under node_modules directory so it could find this module
  //     },
  //   ]),
  // ],
  module: {
    rules: require('./webpack.rules'),
  },
};
