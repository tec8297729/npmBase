// interface IEditorOptions {}

interface EditorBaseProps {
  id?: string;
  value?: string;
  className?: string;
  loading?: string | React.ReactElement | React.FC;
  editorOptions?: object;
  lan?: string;
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
type CodeTheme = 'light' | 'vs-dark';

type Lan =
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
