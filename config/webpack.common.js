const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 引入分离打包CSS
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const merge = require('webpack-merge'); // 合并webpack配置插件
const isProd = process.env.BUILD_ENV !== 'dev';
const configName = `./webpack.${isProd ? 'prod' : 'dev'}.js`;
const merge_Webpack_Config = require(`./${configName}`); // 动态加载webpack配置
const WebpackBar = require('webpackbar');
const postcssPlugins = require('./postcssPlugins');

const config = {
  BUILD_ENV: process.env.BUILD_ENV, // 打包环境
};

const resolve = (dir) => {
  return path.resolve(__dirname, '../' + dir);
};

const webpackConfig = {
  entry: './src/index.js',
  resolve: {
    alias: {
      '@': resolve('src'),
    },
    extensions: ['.ts', '.js', '.json'],
  },
  bail: false,
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: ['babel-loader'],
        // exclude: /node_modules/,
      },
      {
        test: /\.(c|le)ss?$/,
        include: [resolve('src')],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              hmr: !config.IsProd,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => postcssPlugins(process.env),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WebpackBar({
      name: 'homecommon',
      color: '#00AFF2',
      profile: true,
      minimal: false,
      compiledIn: false,
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: false,
};

module.exports = merge(webpackConfig, merge_Webpack_Config(config));
