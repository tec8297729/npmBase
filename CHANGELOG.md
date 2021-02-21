# 开发说明

文档语法介绍 https://d.umijs.org/zh-CN/guide/basic

## 关于 dependencies、peerDependencies 和 external

cjs 和 esm 格式打包方式选 rollup 时有个约定，dependencies 和 peerDependencies 里的内容会被 external
esm.mjs 和 umd 格式，只有 peerDenendencies 会被 external
打包方式 babel 时无需考虑 external，因为是文件到文件的编译，不处理文件合并

## 目录说明

``` bash
src/App.js # 开发时测试用的文件，可以不用npm link本地测试组件的文件
src/index.tsx # 插件导出核心文件，npm发布插件供用户使用的
```

# 版本历史更新
