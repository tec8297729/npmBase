const { merge } = require('webpack-merge');
const paths = require('./paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 引入分离打包CSS
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const isProd = ['prod', 'win'].includes(process.env.BUILD_ENV);
const configName = `./webpack.${isProd ? 'prod' : 'dev'}.js`;
const merge_Webpack_Config = require(`./${configName}`); // 动态加载webpack配置
const WebpackBar = require('webpackbar');
const postcssPlugins = require('./postcssPlugins');
const appPackageJson = require(paths.appPackageJson);

const config = {
  BUILD_ENV: process.env.BUILD_ENV, // 环境
};

const webpackConfig = {
  entry: isProd ? paths.appIndexJs : paths.appIndexDevJs,
  resolve: {
    alias: {
      '@': paths.appSrc,
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
        include: [paths.appSrc],
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
      name: appPackageJson.name,
      color: '#00AFF2',
      profile: true,
      minimal: false,
      compiledIn: false,
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
  cache: {
    type: 'filesystem',
    version: 'v0.0.1',
  },

  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
  performance: false,
};

module.exports = merge(webpackConfig, merge_Webpack_Config(config));
