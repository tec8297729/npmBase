export default {
  // devtool: 'eval',
  base: '/',
  // outputPath: 'build',
  devServer: {
    port: 9999,
  },
  dynamicImport: {
    // loading, 类型为字符串，指向 loading 组件文件
    loading: '@/Loading',
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
};
