interface EditorBaseProps {
  id?: string;
  value?: string;
  className?: string;
  loading?: string | React.ReactElement | React.FC;
  /**
   * 配置参数 https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html
   */
  editorOptions?: IEditorOptions | object;
  lan?: LanguageType | string;
  codeTheme?: CodeTheme | string;
  vs?: string;
}
// 非受控
export interface IOjEditorProps extends EditorBaseProps {
  editorDidMount?: (editor: any) => {};
}

// 受控组件props
export interface IOjEditorCpProps extends EditorBaseProps {
  onChange: (v: string | number | undefined) => {};
}

// 主题
export type CodeTheme = 'light' | 'vs-dark';

// 语言
export type LanguageType =
  | 'html'
  | 'css'
  | 'json'
  | 'javascript'
  | 'dart'
  | 'dockerfile'
  | 'go'
  | 'graphql'
  | 'java'
  | 'kotlin'
  | 'markdown'
  | 'mysql'
  | 'objective-c'
  | 'php'
  | 'python'
  | 'ruby'
  | 'rust'
  | 'sql'
  | 'swift'
  | 'typescript'
  | 'xml'
  | 'yaml';

// editor配置参数
export interface IEditorOptions {
  minimap?: { enabled: boolean };
  readOnly?: boolean;
  cursorStyle?: 'line' | 'block';
  fontSize?: number;
  contextmenu?: boolean;
  scrollbar?: {
    useShadows: boolean;
    verticalHasArrows: boolean;
    horizontalHasArrows: boolean;
    vertical: 'auto' | 'visible' | 'hidden';
    horizontal: 'auto' | 'visible' | 'hidden';
  };
  showFoldingControls?: 'always' | 'mouseover';
  scrollBeyondLastLine?: boolean;
  tabSize?: number;
}
