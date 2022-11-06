import React from 'react';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { Backdrop, Box, CircularProgress, Paper } from '@material-ui/core';
import {} from '@material-ui/core';
import { Form, Input, Select, message } from 'antd';
import { useParams } from 'react-router';
import { CONFIGURATION } from 'Configuration';
import { Link } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { rootPath } from 'helpers/buildUrl';
import styles from './FormInputLayout.module.scss';
import UserService from 'services/auth/UserService';
import { handleError } from '@jumbo/utils/commonHelper';
import { useStyles } from 'Configuration/function';
import ButtonGoBack from 'routes/Pages/components/Button/ButtonGoBack';
import ButtonSubmit from 'routes/Pages/components/Button/ButtonSubmit';
import ButtonDelete from 'routes/Pages/components/Button/ButtonDelete';
import ButtonReset from 'routes/Pages/components/Button/ButtonReset';
import Required from 'routes/Pages/components/Element/Required';
const { Option } = Select;

export default function FormInputLayout({ form, heading, breadcrumbs, onFinish, open }) {
  const { id } = useParams();
  const onReset = () => {
    form.resetFields();
  };
  const key = 'delete';
  const handleDelete = async () => {
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
  const classes = useStyles();
  return (
    <PageContainer heading={<IntlMessages id={heading} />} breadcrumbs={breadcrumbs} className={styles.container}>
      <div className={styles.container_headerPage}>
        <ButtonGoBack />
        {heading === 'sidebar.updateUserRole' ? (
          <div>
            <Link to={`${rootPath.fjobUserRole}/show/${id}`}>
              <ButtonSubmit title="Xem chi tiết" width="115px" />
            </Link>
            <ButtonDelete title="Xóa" width="58px" onClick={handleDelete} />
          </div>
        ) : null}
      </div>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <Form
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                form.submit();
              }
            }}
            className={styles.form}
            style={{ textAlign: 'center', padding: '30px 0 0' }}
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
            }}
            form={form}
            onFinish={onFinish}
            autoComplete="off">
            <div>
              <label className={classes.label} htmlFor="role">
                Quyền hạn <Required/>
              </label>
              <Form.Item className={classes.input} name="role" rules={[{ required: true, message: 'Quyền hạn không được để trống' }]}>
                <Select>
                  {CONFIGURATION.role.map(item => (
                    <Option key={item.id} values={item.id}>
                      {item.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div>
              <label className={classes.label} htmlFor="userId">
                User ID <Required/>
              </label>
              <Form.Item className={classes.input} name="userId" rules={[{ required: true, message: 'User ID không được để trống' }]}>
                <Input />
              </Form.Item>
            </div>
          </Form>
          <div style={{ textAlign: 'center' }}>
            <ButtonReset title="Làm mới" width="160px" onClick={onReset} />
            <ButtonSubmit title="Lưu" width="160px" onClick={() => form.submit()} />
          </div>
        </Paper>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </PageContainer>
  );
}
