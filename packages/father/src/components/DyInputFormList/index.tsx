import React from 'react';
import { Button, Form, Input } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Rule } from 'antd/lib/form';
import { FormListFieldData } from 'antd/lib/form/FormList';
import classnames from 'classnames';
import TextArea from '../TextArea';
import styles from './index.less';

interface DyInputFormListProps {
  /**
   * 可以这样写属性描述
   * @description       也可以显式加上描述名
   * @description.zh-CN 还支持不同的 locale 后缀来实现多语言描述
   * @default           支持定义默认值
   */
  name: string;
  rules?: Rule[] | undefined;
  textAreaRules?: Rule[] | undefined;
  inputKey?: string;
  inputPlaceholder?: string;
  textAreaKey?: string;
  textAreaPlaceholder?: string;
  textAreaMaxLen?: number;
  addText?: string;
  removeFn?: (data: { index: number }) => void;
}

interface FormFieldsItem {
  fields: FormListFieldData[];
  remove: (index: number | number[]) => void;
}

// 动态扩展input组件
const DyInputFormList = ({
  name, // form表单总体key
  rules, // 验证规则
  textAreaRules, //  多行文本验证
  inputKey,
  inputPlaceholder = '请输入',
  textAreaKey, // 多行文本框
  textAreaMaxLen = 150, // 最大输入字数
  textAreaPlaceholder = '请输入',
  addText = '添加参数', // 添加按钮文字
  removeFn, // 移除回调
}: DyInputFormListProps) => {
  const formItemBox = ({ fields, remove }: FormFieldsItem) =>
    fields?.map((field, index: number) => {
      return (
        <div key={field.key} className={styles.listWrap}>
          {inputKey && (
            <Form.Item
              {...field}
              name={[field.name, inputKey]}
              fieldKey={[field.fieldKey, inputKey]}
              className={classnames({
                [styles.inputKey]: textAreaKey,
              })}
              rules={rules}
            >
              <Input placeholder={inputPlaceholder} />
            </Form.Item>
          )}

          {textAreaKey && (
            <Form.Item
              // {...field}
              name={[field.name, textAreaKey]}
              fieldKey={[field.fieldKey, textAreaKey]}
              // className={textAreaKey ? styles.inputKey : null}
              rules={textAreaRules ?? rules}
            >
              <TextArea
                width="100%"
                maxLength={textAreaMaxLen}
                placeholder={textAreaPlaceholder}
              />
            </Form.Item>
          )}

          <MinusCircleOutlined
            onClick={() => {
              removeFn?.({ index });
              remove(field.name);
            }}
            className={styles.removeIcon}
          />
        </div>
      );
    });

  return (
    <div className={styles.formListWrap}>
      <Form.List
        name={name}
        // rules={rules}
      >
        {(fields, { add, remove }) => {
          return (
            <>
              {formItemBox({ fields, remove })}

              <Form.Item
              // className={fields?.length > 0 ? styles.addCardBtn : ''}
              >
                <Button type="dashed" onClick={() => add()} block>
                  <PlusOutlined /> {addText}
                </Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>
    </div>
  );
};

export default DyInputFormList;
