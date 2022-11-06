import React from 'react';
import FormInputLayout from '../Components/FormInputLayout/FormInputLayout';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { handleError } from '@jumbo/utils/commonHelper';
import { message } from 'antd';
import { Form } from 'antd';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import UserService from 'services/auth/UserService';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { useStyles } from 'Configuration/function';
const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.dashBoard'} />, link: '/' },
  { label: <IntlMessages id={'sidebar.listBlog'} />, isActive: true },
  { label: <IntlMessages id={'sidebar.createBlog'} />, isActive: true },
];

const heading = 'sidebar.createBlog';

export default function CreateUserRole() {
  const [form] = Form.useForm();
  const [open, setOpen] = React.useState(false);
  const post = [];
  const key = 'updatable';
  const classes = useStyles()
  const onFinish = async values => {
    setOpen(true)
    try {
      await UserService.createUserRole({
        userId: parseInt(values.userId),
        role: values.role,
      });
      message.loading({ content: 'Loading...', key });
      setTimeout(() => {
        message.success({ content: 'Thêm thành công', key, duration: 2 });
        form.resetFields();
      }, 500);
      setOpen(false)

    } catch (error) {
      handleError(error);
      setOpen(false)

    }
  };

  return <FormInputLayout form={form} heading={heading} onFinish={onFinish} breadcrumbs={breadcrumbs} post={post} open={open}>
  </FormInputLayout>;
}
