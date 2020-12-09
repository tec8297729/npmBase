import { IEditorOptions } from '../typings/codeEditor';
// 组件默认参数
export const editorInitOpts: IEditorOptions = {
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
  tabSize: 4,
};
