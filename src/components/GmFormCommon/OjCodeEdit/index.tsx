import React, { forwardRef } from 'react';
import { OjEditorCp, LANGUAGE_TYPE, EDITOR_THEME } from '@kkb/oj-editor';

type OnChangeType = (v: string | number | undefined) => void;

interface OjCodeEditProps {
  className: string;
  value: string;
  onChange: OnChangeType;
  lan: string;
}

// 支持Form组件的代码编辑器
const OjCodeEdit = forwardRef<any, OjCodeEditProps>(
  ({ className, value, onChange, lan }, ref) => {
    const onChangeEditor: any = (v: string) => {
      onChange?.(v);
    };

    return (
      <OjEditorCp
        ref={ref}
        className={className} // 样式，控制宽高
        value={value} // 内容
        onChange={onChangeEditor} // 内容改变时触发
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
        lan={lan || LANGUAGE_TYPE.python} // code语言
        codeTheme={EDITOR_THEME.VisualStudioDark} // 代码主题色
      />
    );
  },
);

export default OjCodeEdit;
