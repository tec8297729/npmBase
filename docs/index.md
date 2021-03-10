---
title: 首页
order: 0
---

## 快速入门

## 接入方式

1、安装插件

```bash

```

2、配置自己项目中按需加载 antd，libraryDirectory 选择 es 模式，配置相同打包文件可最小化。

配置如下

```js
// .babelrc.js
module.exports = {
  plugins: [
    // antd按需加载
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, // less样式
      },
    ],
  ],
};
```
