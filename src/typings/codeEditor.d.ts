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
  codeTheme?: CodeThemeType | string;
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

// 配置类型
export type EditorOptions = IEditorOptions | object;

// 主题类型
export type CodeThemeType = 'light' | 'vs-dark' | string;

// 语言类型
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
  | 'yaml'
  | string;

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
