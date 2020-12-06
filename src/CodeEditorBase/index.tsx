import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import Editor, { monaco, EditorDidMount } from '@monaco-editor/react';
import { EDITOR_THEME, LANGUAGE_TYPE, THEME_NAME } from './config';
import styles from './style.module.less';

const CodeEditorBase = forwardRef(
  (
    {
      className,
      loading,
      editorDidMount,
      editorOptions = {},
      lan = LANGUAGE_TYPE.javascript,
      codeTheme = EDITOR_THEME.VisualStudio,
    }: any,
    ref,
  ) => {
    const editorRef = useRef<any>();
    const [language, setLanguage] = useState(lan);
    const [theme, setTheme] = useState(codeTheme);
    // editor配置 https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html
    const [opts, setOpts] = useState({
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
      ...editorOptions,
    });

    // 初始化editor
    const handleEditorDidMount: EditorDidMount = (_, editor) => {
      editorRef.current = editor;
      editorDidMount?.(editor);
    };

    // ref相关方法
    useImperativeHandle(ref, () => ({
      getValue: (): string => editorRef.current?.getValue(),
      setValue: (value: string) => editorRef.current?.setValue(value),
      setLanguage, // 设置语言
      setTheme, // 设置主题
      // 设置editor配置参数
      setEditorOpts: (editorOpts: any) =>
        setOpts({
          ...opts,
          ...editorOpts,
        }),
      // 格式化代码
      formatCode: () =>
        // eslint-disable-next-line no-underscore-dangle
        editorRef?.current?._actions?.['editor.action.formatDocument']?._run(),
    }));

    useEffect(() => {
      // monaco.config({ paths: { vs: '...' } });
      monaco
        .init()
        // .then(monaco => {})
        .catch((error) =>
          console.error(
            'An error occurred during initialization of Monaco: ',
            error,
          ),
        );
    }, []);

    return (
      <>
        <div className={className || styles.baseEditWrap}>
          <Editor
            editorDidMount={handleEditorDidMount}
            language={language}
            theme={theme}
            options={opts}
            loading={loading || <div>加载中...</div>}
          />
        </div>
      </>
    );
  },
);

export { CodeEditorBase, EDITOR_THEME, LANGUAGE_TYPE, THEME_NAME };
