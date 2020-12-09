import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import { initMonaco } from '@/utils';
import { EDITOR_THEME, LANGUAGE_TYPE } from '../../consts';
import { editorInitOpts } from '../../consts/editorDefault';
import { IOjEditorProps } from '../../typings/codeEditor';

// 非受控组件
const OjEditor = forwardRef(
  (
    {
      id,
      value,
      className,
      loading,
      editorDidMount,
      editorOptions = {},
      lan = LANGUAGE_TYPE.javascript,
      codeTheme = EDITOR_THEME.VisualStudioDark,
      vs, // 自定义monaco-editor的cdn
    }: IOjEditorProps,
    ref,
  ) => {
    const editorRef = useRef<any>();
    const [language, setLanguage] = useState(lan);
    const [theme, setTheme] = useState(codeTheme);

    const [opts, setOpts] = useState({
      ...editorInitOpts,
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
      setValue: (v: string) => editorRef.current?.setValue(v),
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
      initMonaco({ vs });
    }, []);

    return (
      <div
        className={className}
        id={id}
        style={
          className
            ? {}
            : {
                width: 400,
                height: 400,
              }
        }
      >
        <MonacoEditor
          value={value}
          editorDidMount={handleEditorDidMount}
          language={language}
          theme={theme}
          options={opts}
          loading={loading || <div>加载中...</div>}
        />
      </div>
    );
  },
);

export { OjEditor };
