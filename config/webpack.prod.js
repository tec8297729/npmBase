const webpack = require('webpack');
const paths = require('./paths');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 自动清除dist目录
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function (config) {
  const { BUILD_ENV } = config;
  const isBuildWin = BUILD_ENV === 'win'; // 打包是否挂载win对象

  return {
    mode: 'production',
    devtool: false,
    output: {
      path: isBuildWin ? paths.appBuildWindow : paths.appBuild,
      filename: isBuildWin ? '[name].es.js' : '[name].js',
      library: isBuildWin ? 'fig' : 'commonjs',
      libraryTarget: isBuildWin ? 'umd' : 'commonjs',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      nodeEnv: 'production',
      sideEffects: true,
      concatenateModules: true,
      minimize: true,
      minimizer: [
        // 压缩js
        new TerserPlugin({
          parallel: true, // 多线程
          extractComments: false, // 移除license文件
          terserOptions: {
            compress: {
              comparisons: false, // 关闭二进制优化
            },
            parse: {},
            mangle: true,
            output: {
              comments: false,
              beautify: false,
              ascii_only: true, // 非ASCII字符转换为UTF-8
            },
          },
        }),
      ],
    },
    plugins: [],
    externals: {
      react: 'commonjs react',
      'react-dom': 'commonjs react-dom',
    },
  };
};
