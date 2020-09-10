const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 自动清除dist目录
const TerserPlugin = require('terser-webpack-plugin');
const resolve = (dir) => {
  return path.resolve(__dirname, '../' + dir);
};

module.exports = function (config) {
  const { BUILD_ENV } = config;
  const isBuildWin = BUILD_ENV === 'win'; // 打包是否挂载win对象

  return {
    mode: 'production',
    devtool: 'none',
    output: {
      path: resolve(`dist`),
      filename: '[name].js',
      libraryTarget: 'commonjs',
    },
    optimization: {
      namedModules: true,
      moduleIds: 'hashed',
      splitChunks: {
        chunks: 'all',
        name: true,
      },
      nodeEnv: 'production',
      sideEffects: true,
      concatenateModules: true,
      minimize: true,
      minimizer: [
        // 压缩js
        new TerserPlugin({
          cache: true,
          parallel: true,
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
          parallel: true, // 多线程
          cache: true,
          sourceMap: true,
        }),
      ],
    },
    plugins: [],
  };
};
