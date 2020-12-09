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
import {
  IOjEditorProps,
  LanguageType,
  CodeThemeType,
  EditorOptions,
} from '../../typings/codeEditor';

interface EditorRef {
  getValue: () => string;
  setValue: (v: string) => void;
  setLanguage: (v: LanguageType) => void;
  setTheme: (v: CodeThemeType) => void;
  setEditorOpts: (options: EditorOptions) => void;
  formatCode: () => void;
}

// 非受控组件
const OjEditor = forwardRef<EditorRef, IOjEditorProps>(
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
    },
    ref,
  ) => {
    const editorRef = useRef<any>();
    const [language, setLanguage] = useState<LanguageType>(lan);
    const [theme, setTheme] = useState<CodeThemeType>(codeTheme);
    const [opts, setOpts] = useState<EditorOptions>({
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
      setEditorOpts: (editorOpts) =>
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
