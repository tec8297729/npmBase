---
title: DyInputFormList # 页面标题

nav:
  title: 菜单名称

group:
  title: 自定义分组名称
  order: 0 # 控制分组顺序，数字越小越靠前，默认以路径长度和字典序排序
---

## 组件使用案例

```jsx
/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import DyInputFormList from './index';

import React from 'react';

export default () => {
  return (
    <>
      <div>Click me</div>
      <DyInputFormList>Click me</DyInputFormList>
    </>
  );
};
```

## API

### Anchor Props

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| affix | 固定模式 | boolean | true |  |
| bounds | 锚点区域边界 | number | 5 |  |
| getContainer | 指定滚动的容器 | () => HTMLElement | () => window |  |
| getCurrentAnchor | 自定义高亮的锚点 | () => string | - |  |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | number |  |  |
| showInkInFixed | `affix={false}` 时是否显示小圆点 | boolean | false |  |
| targetOffset | 锚点滚动偏移量，默认与 offsetTop 相同，[例子](#components-anchor-demo-targetOffset) | number | - |  |
| onChange | 监听锚点链接改变 | (currentActiveLink: string) => void | - |  |
| onClick | `click` 事件的 handler | function(e: Event, link: Object) | - |  |
