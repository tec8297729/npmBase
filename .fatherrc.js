export default {
  esm: {
    type: 'rollup',
    // mjs: true
  },
  cjs: 'rollup',
  umd: {
    name: 'vgeForm',
    // minFile: false,
    globals: {
      react: 'React',
      antd: 'antd',
      '@ant-design/icons': 'icons',
    },
  },
  // extractCSS: true,
  runtimeHelpers: true,
  autoprefixer: {
    overrideBrowserslist: [
      'last 2 versions',
      'Firefox ESR',
      '> 1%',
      'ie >= 11',
    ],
  },
};
