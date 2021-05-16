import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs'];

// rollup.config.js
export default {
  input: 'src/index.tsx',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      globals: {
        react: 'React',
        antd: 'antd',
      },
    },
  ],
  // external: ["react", "react-dom", "prop-types"],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
      clean: true,
      tsconfigOverride: {
        compilerOptions: {
          // Support dynamic import
          target: 'esnext',
        },
      },
    }),
    nodeResolve({ browser: true }),
    commonjs(),
    babel({
      exclude: /\/node_modules\//,
      // babelrc: false,
      extensions,
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['@babel/plugin-transform-react-jsx'],
      babelHelpers: 'bundled',
    }),
    json(),
    postcss({
      extract: true, // 输出css样式
      plugins: [],
      // 模块化，自定义名称
      // modules: {
      //   generateScopedName: 'vgeform_[local]__[hash:base64:5]',
      // },
      // autoModules: true,
      sourceMap: false, // map文件
    }),
  ],
};
