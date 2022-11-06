import UserService from 'services/auth/UserService';
import { handleError } from '@jumbo/utils/commonHelper';
import { message } from 'antd';

export const handleDeteleUserRole = async id => {
  const key = 'delete';
  try {
    await UserService.deleteUserRole(id);
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      message.success({ content: 'Xóa thành công', key, duration: 2 });
    }, 500);
  } catch (error) {
    handleError(error);
  }
};
