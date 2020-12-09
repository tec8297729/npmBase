# ojEditor代码编辑器

基于微软monaco-editor封装的react精简版。

## OjEditor非受控组件介绍

非受控组件没有onChange事件

```jsx
import React, { useEffect, useRef, useState } from 'react';
import { OjEditor, LANGUAGE_TYPE, EDITOR_THEME } from '@kkb/ojEditor';
const DemoTest = () => {
  const editorRef = useRef();

  return <OjEditor
    ref={editorRef}
    className={styles.codeWrap} // 样式，控制宽高
    id="boxid" // 绑定id
    value={'let a = 122'} // 内容
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
    }}
    lan={LANGUAGE_TYPE.javascript} // code语言
    codeTheme={EDITOR_THEME.VisualStudioDark} // 代码主题色
    vs="https://cdn.jsdelivr.net/npm/monaco-editor@0.21.2/min/vs" // 定义cdn地址（可选参数）
  />;
}

// editorRef上面挂载方法介绍
editorRef.current.getValue(); // 获取editor内容
editorRef.current.setValue('let b = 33'); // 设置editor的内容
editorRef.current.setLanguage(LANGUAGE_TYPE.javascript); // 设置语言，默认
editorRef.current.setTheme(EDITOR_THEME.VisualStudio); // 设置主题
editorRef.current.setEditorOpts({}); // 设置编辑器参数
editorRef.current.formatCode(); // 格式化代码
```
<br><br><br>


## OjEditorCp 受控组件介绍 

OjEditorCp组件 可以支持antd Form组件<br>

antd Form直接包裹此组件，不需要定义value及onChange二参数即可。

```jsx
import React, { useEffect, useRef, useState } from 'react';
import { OjEditorCp, LANGUAGE_TYPE, EDITOR_THEME } from '@kkb/ojEditor';
const DemoTest = () => {
  const editorRef = useRef();
  const [value, setValue] = useState('let a = 122');

  return <OjEditorCp 
    ref={editorRef} // 同上ref方法
    className={styles.codeWrap} // 样式，控制宽高
    id="boxid" // 绑定id
    value={value} // 内容
    onChange={(v)=> setValue(v)} // 内容改变时触发
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
    }}
    lan={LANGUAGE_TYPE.javascript} // code语言
    codeTheme={EDITOR_THEME.VisualStudioDark} // 代码主题色
    vs="https://cdn.jsdelivr.net/npm/monaco-editor@0.21.2/min/vs" // 定义cdn地址（可选参数）
  />
}

```

<br><br><br>

