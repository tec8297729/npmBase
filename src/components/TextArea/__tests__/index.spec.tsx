import React from 'react';
import { mount } from 'enzyme';
import TextArea from '../index';

describe('TextArea Component', () => {
  it('test render', async () => {
    const wrapper = mount(<TextArea maxLength={20} />);
    // 设置props参数
    wrapper.setProps({ value: 'hello' });
    // 获取节点value内容
    const domValue = wrapper.find('textArea').at(0).getDOMNode().nodeValue;
    // 对比内容
    expect(domValue).toBe('hello');
  });
});
