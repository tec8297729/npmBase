import { notification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';
// cms统一提示风格组件
export default {
  /**
   * 成功提示
   */
  success: (msg: string, arg?: ArgsProps) => {
    if (msg) {
      notification.success({
        message: msg,
        ...arg,
      });
    }
  },

  /**
   * 错误提示
   */
  error: (msg: string, arg?: ArgsProps) => {
    if (msg) {
      notification.error({
        message: msg,
        ...arg,
      });
    }
  },
};
