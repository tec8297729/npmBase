const webpack = require('webpack');
const paths = require('./paths');
const htmlPlugin = require('html-webpack-plugin');

module.exports = function (config) {
  return {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      path: paths.appBuild,
      filename: '[name].js',
    },
    devServer: {
      contentBase: paths.appBuild,
      disableHostCheck: true,
      compress: true,
      open: true,
      host: '0.0.0.0',
      port: 3200,
      hot: true,
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
        template: paths.appHtml,
      }),
    ],
  };
};
