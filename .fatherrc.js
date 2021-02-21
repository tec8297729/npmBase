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
  cssModules: {
    generateScopedName: 'vgeForm_[name]__[local]___[hash:base64:5]',
  },
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
