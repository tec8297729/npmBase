```jsx
import React, { useEffect, useRef, useState } from 'react';
import CodeEditorBase, { LANGUAGE_TYPE, EDITOR_THEME } from '../../common/CodeEditorBase';

const editorRef = useRef();

<CodeEditorBase
  ref={editorRef} // 暴露ref，挂载系列方法
  className={styles.codeWrap} // 样式，控制宽高
  value={'122'} // 内容
  editorDidMount={editorDidMount} // 组件初始化后执行，只有初始化后，codeRef对象上方法才可使用
  // editor配置 https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html
  editorOptions={{
    minimap: { enabled: false }, // 关闭地图
    readOnly: false, // 只读
    cursorStyle: 'line', // 光标样式 'block' or 'line'
    fontSize: 14, // 字体大小
    contextmenu: false, // 右键菜单
    // 滚动条
    scrollbar: {
      useShadows: true, // 滚动内容时，投射水平和垂直阴影
      verticalHasArrows: false, // 垂直滚动是否有箭头
      horizontalHasArrows: false, // 水平滚动是否有箭头
      vertical: 'auto', // 垂直滚动条 'auto', 'visible', 'hidden'
      horizontal: 'auto', // 水平滚动条
    },
    showFoldingControls: 'mouseover', // 折叠控件 always mouseover移入
    scrollBeyondLastLine: false, // 是否滚动底部间隔
    ...editorOptions,
  }}
  lan={LANGUAGE_TYPE.javascript} // code语言
  codeTheme={EDITOR_THEME.VisualStudioDark} // 代码主题色
/>;

// editorRef上面挂载方法介绍
editorRef.current.getValue(); // 获取editor内容
editorRef.current.setValue('let b = 33'); // 设置editor的内容
editorRef.current.setLanguage(LANGUAGE_TYPE.javascript); // 设置语言，默认
editorRef.current.setTheme(EDITOR_THEME['Visual Studio Dark']); // 设置主题
editorRef.current.setEditorOpts({}); // 设置编辑器参数，和组件editorOptions参数一样配置
editorRef.current.formatCode(); // 格式化代码
```
