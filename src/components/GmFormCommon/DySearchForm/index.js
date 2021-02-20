import React, { useImperativeHandle } from 'react';
import { Form, Select, Input, Button, Row, Col } from 'antd';
import { BOX_TYPE } from './boxType';
import styles from './index.module.less';

const { Option } = Select;

/* 动态搜索组件
import { DySearchForm, BOX_TYPE } from './components/DySearchForm';
<DySearchForm
  boxKeyData={boxKeyData} // 动态组件定义
  searchFn={searchFn} // 搜索按钮回调
  defaultValue={{ searchSelect: 333 }} // 设置默认值
/>

const boxKeyData = [
  {
    type: BOX_TYPE.input,
    label: '闪卡名称',
    name: 'name',
    rules: [], // 自定义验证规则
  },
  {
    type: BOX_TYPE.select,
    label: '所属卡组',
    name: 'spas',
    data: [
      { value: 'male', label: 'male' },
      { value: 'female', label: 'female' },
    ],
    // 下拉或输入回调，大部份组件都支持此事件
    onChange: value => {},
  },
  {
    type: BOX_TYPE.statusSelect,
    label: '状态',
    name: 'status',
  },
  {
    type: BOX_TYPE.searchSelect,
    label: '搜索组件',
    name: 'searchSelect',
    data: [
      { value: 'male', label: 'male' },
      { value: 'female', label: 'female' },
    ],
    // 搜索回调
    callback: value => {},
  },
  {
    type: BOX_TYPE.custom,
    label: '自定义组件',
    name: 'status',
    data: [],
    custom: <div>自定义各种组件</div>,
  },
];
*/
const DySearchForm = ({
  boxKeyData,
  isShowQueryBtn,
  isShowResetBtn,
  searchFn,
  searchResetFn,
  defaultValue,
  childRef,
}) => {
  const [form] = Form.useForm();

  // 生成formItem动态组件
  const generateFormBox = (v) => {
    let fromBoxEle;
    const data = v?.data || [];
    switch (v.type) {
      case BOX_TYPE.input:
        fromBoxEle = <Input placeholder={v.placeholder || '请输入名称'} />;
        break;
      case BOX_TYPE.select:
        fromBoxEle = (
          <Select
            placeholder={v.placeholder || '请选择'}
            onChange={v.onChange}
            allowClear
            options={data?.map((item) => {
              if (item.name) {
                return {
                  label: item.name,
                  value: item.id,
                };
              }
              return {
                label: item.label,
                value: item.value,
              };
            })}
          />
        );
        break;
      case BOX_TYPE.searchSelect: // 搜索下拉组件
        fromBoxEle = (
          <Select
            placeholder={v?.placeholder || '请选择'}
            onChange={v?.onChange}
            allowClear
            showSearch
            onSearch={v?.callback}
            filterOption={(input, option) =>
              option.label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
            }
            options={data?.map((item) => {
              if (item.name) {
                return {
                  label: item.name,
                  value: item.id,
                };
              }
              return {
                label: item.label,
                value: item.value,
              };
            })}
          />
        );
        break;
      case BOX_TYPE.statusSelect:
        fromBoxEle = (
          <Select style={{ width: '100%' }} placeholder="请选择" allowClear>
            <Option value={null}>全部</Option>
            <Option value={1}>已上架</Option>
            <Option value={0}>已下架</Option>
          </Select>
        );
        break;
      case BOX_TYPE.custom: // 用户自定义组件
        fromBoxEle = v?.custom;
        break;
      default:
        fromBoxEle = <Input placeholder={v?.placeholder} />;
        break;
    }
    return fromBoxEle;
  };

  const createFormItems = () => {
    return boxKeyData?.map((v) => {
      return (
        <Col span={8} key={v.name}>
          <Form.Item name={v?.name} label={v?.label} rules={v?.rules}>
            {generateFormBox(v)}
          </Form.Item>
        </Col>
      );
    });
  };

  // 查询事件
  const onFinish = (values) => {
    searchFn?.(values);
  };

  // 重置事件
  const onReset = () => {
    form.resetFields();
    searchResetFn?.(form.getFieldsValue());
  };

  useImperativeHandle(childRef, () => ({
    formRef: form,
  }));

  return (
    <div className={styles.searchForm}>
      <Form
        name="advanced_search"
        className={styles.advancedSearchForm}
        form={form}
        onFinish={onFinish}
        initialValues={defaultValue}
      >
        <Row gutter={24}>
          {createFormItems()}

          <Col span={8} style={{ textAlign: 'left' }}>
            {isShowQueryBtn ? (
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            ) : null}
            {isShowResetBtn ? (
              <Button style={{ marginLeft: 50 }} onClick={onReset}>
                重置
              </Button>
            ) : null}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

DySearchForm.defaultProps = {
  isShowQueryBtn: true, // 是否显示查询按钮
  isShowResetBtn: true, // 是否显示重置按钮
  defaultValue: {}, // 表单参数
  boxKeyData: [], // 定义动态组件数据
};

export { DySearchForm, BOX_TYPE };
