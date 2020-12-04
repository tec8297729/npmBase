const webpack = require('webpack');
const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const resolve = (dir) => {
  return path.resolve(__dirname, '../' + dir);
};
module.exports = function (config) {
  return {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      path: resolve(`dist`),
      filename: '[name].js',
    },
    devServer: {
      contentBase: path.resolve(__dirname, '../dist'),
      disableHostCheck: true,
      compress: true,
      port: 3200,
      proxy: {
        '/v1': {
          target: 'https://kmsapi.kaikeba.com',
          changeOrigin: true,
          secure: true,
          // ws: true, // proxy websockets
          pathRewrite: {
            // '^/v1': '',
          },
        },
      },
    },
    plugins: [
      new htmlPlugin({
        inject: true,
        template: './src/index.ejs',
      }),
    ],
  };
};
