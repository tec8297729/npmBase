const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      },
    ],
    // 编译转换px成rem
    [
      'fig-pxtorem',
      {
        rootValue: 37.5, // 设置根字体是37.5，1rem = 37.5px
        selectorBlackList: ['weui', 'mu', 'ant'], // 忽略转换正则匹配项（选择器）
        unitPrecision: 5,
        mediaQuery: true,
        minPixelValue: 0,
        include: [resolveApp('./src/components/H5')],
        propList: [
          '*background*',
          '*padding*',
          '*margin*',
          'letter-spacing',
          '*width*',
          '*height*',
          'left',
          'font*',
          'right',
          'top',
          'bottom',
        ],
      },
    ],
    'postcss-normalize',
  ],
};
module.exports.postcss = true;
