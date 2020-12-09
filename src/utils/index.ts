import { monaco } from '@monaco-editor/react';

interface IMonacoConfig {
  vs: string | undefined;
}

// 初始化monaco
export const initMonaco = ({ vs }: IMonacoConfig) => {
  if (vs) {
    monaco.config({ paths: { vs } });
  }
  monaco
    .init()
    // .then(monaco => {})
    .catch((error) =>
      console.error(
        'An error occurred during initialization of Monaco: ',
        error,
      ),
    );
};
