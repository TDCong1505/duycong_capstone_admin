import React from 'react';
import { useParams } from 'react-router-dom';

import FormInputLayout from '../components/FormInputLayout';
import IntlMessages from '@jumbo/utils/IntlMessages';
import UserService from 'services/auth/UserService';
import { handleError } from '@jumbo/utils/commonHelper';
import { message } from 'antd';
import { Form } from 'antd';
import { useSelector } from 'react-redux';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.dashBoard'} />, link: '/' },
  { label: <IntlMessages id={'sidebar.userIdentification'} />, isActive: true },
  { label: <IntlMessages id={'sidebar.updateBlog'} />, isActive: true },
];
const heading = 'sidebar.updateBlog';

export default function UpdateUser() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const UserIdentification = useSelector(state => state.user.userIdentification);
  const loadUserDetail = async () => {
    try {
      let res = UserIdentification.filter(item => {
        return item.id === parseInt(id);
      });
      const data = res[0];
      form.setFieldsValue({
        status: data.status,
        identificationType: data.identificationType,
        reasonReject: data.reasonReject,
      });
    } catch (error) {
      handleError(error);
    }
  };
  const key = 'updatable';
  const onFinish = async values => {
    try {
      await UserService.updateUserIdentification(id, {
        status: parseInt(values.status),
        identificationType: parseInt(values.identificationType),
        reasonReject: values.reasonReject,
      });
      message.loading({ content: 'Loading...', key });
      setTimeout(() => {
        message.success({ content: 'Update thành công', key, duration: 2 });
      }, 500);
    } catch (error) {
      handleError(error);
    }
  };

  React.useEffect(() => {
    loadUserDetail();
  }, []);

  return <FormInputLayout form={form} heading={heading} onFinish={onFinish} breadcrumbs={breadcrumbs} />;
}
