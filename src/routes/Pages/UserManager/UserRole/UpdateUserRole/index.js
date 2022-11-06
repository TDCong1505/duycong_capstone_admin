import React from 'react';
import { useParams } from 'react-router-dom';

import FormInputLayout from '../Components/FormInputLayout/FormInputLayout';
import IntlMessages from '@jumbo/utils/IntlMessages';
import UserService from 'services/auth/UserService';
import { handleError } from '@jumbo/utils/commonHelper';
import { message } from 'antd';
import { Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setDataUserRole } from 'redux/actions/UserCurrent';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.dashBoard'} />, link: '/' },
  { label: <IntlMessages id={'sidebar.userRole'} />, isActive: true },
  { label: <IntlMessages id={'sidebar.updateUserRole'} />, isActive: true },
];
const heading = 'sidebar.updateUserRole';

export default function UpdateUser() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  // const [id, setId] = React.useState();

  const UserRole = useSelector(state => state.user.userRole);
  const loadDetail = async () => {
    try {
      let res = UserRole.filter(item => {
        return item.id === parseInt(id);
      });
      const data = res[0];
      // setId(data.id);
      form.setFieldsValue({
        role: data.role,
        userId: data.userId,
      });
    } catch (error) {
      handleError(error);
    }
  };
  const dateFormat = 'YYYY/MM/DD';
  const key = 'updatable';
  const onFinish = async values => {
    try {
      let res = await UserService.updateUserRole(id, {
        id: id,
        userId: values.userId,
        role: values.role,
      });

      UserRole.splice(
        UserRole.findIndex(function(item) {
          return item.id === parseInt(id);
        }),
        1,
        res.data.data,
      );
      dispatch(setDataUserRole(UserRole));

      message.loading({ content: 'Loading...', key });
      setTimeout(() => {
        message.success({ content: 'Update thành công', key, duration: 2 });
      }, 500);
    } catch (error) {
      handleError(error);
    }
  };

  React.useEffect(() => {
    loadDetail();
  }, []);

  return (
    <FormInputLayout form={form} heading={heading} onFinish={onFinish} breadcrumbs={breadcrumbs} dateFormat={dateFormat} />
  );
}
