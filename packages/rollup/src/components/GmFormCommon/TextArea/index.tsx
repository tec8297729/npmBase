import React, { useState, useEffect, useCallback } from 'react';
import { Input } from 'antd';
import styles from './index.module.less';

interface TextAreaProps {
  maxLength: number;
  placeholder: string;
  width: number | string;
  height?: number;
  onChange?: Function;
  value?: string;
}

// 多行文本框输入组件
const TextArea = ({
  maxLength = 150,
  placeholder,
  width,
  height,
  onChange,
  value,
}: TextAreaProps): React.ReactElement => {
  const [textAreaLimit, setTextAreaLimit] = useState<number>(maxLength); // 文字上限

  // 输入事件
  const onChangeTextArea = useCallback(
    (v) => {
      const len = v?.length || 0;
      setTextAreaLimit(maxLength - len);
      onChange?.(v);
    },
    [maxLength, onChange],
  );

  useEffect(() => {
    const len = value?.length || 0;
    setTextAreaLimit(maxLength - len);
  }, [maxLength, value]);

  return (
    <div
      className={styles.textAreaWrap}
      data-num={textAreaLimit}
      style={{
        width,
        height,
      }}
    >
      <Input.TextArea
        placeholder={placeholder || '请输入'}
        maxLength={maxLength}
        className={styles.textAreaBox}
        value={value}
        onChange={(e) =>
          onChangeTextArea(e?.target?.value?.substr(0, maxLength))
        }
        style={{
          resize: 'none',
          width,
          height,
        }}
      />
    </div>
  );
};

export default TextArea;
