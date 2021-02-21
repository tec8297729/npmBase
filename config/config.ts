export default {
  // devtool: 'eval',
  base: '/',
  outputPath: 'docs',
  devServer: {
    port: 9999
  },
  extraBabelPlugins: [
    ['babel-plugin-import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }],
  ],
};
