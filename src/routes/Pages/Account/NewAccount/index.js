import React, { useEffect, useState } from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { Form } from 'antd';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ButtonSubmit from 'routes/Pages/components/Button/ButtonSubmit';
import { useStyles } from 'Configuration/function';
import styles from '../../Product/New/New.module.scss';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import ButtonGoBack from 'routes/Pages/components/Button/ButtonGoBack';
import { Box, CircularProgress, Paper } from '@material-ui/core';
import CardInput from '../../UserManager/User/Component/CardInput/CardInput';
import Backdrop from '@material-ui/core/Backdrop';
import ProductTypeService from 'services/auth/ProductTypeService';
import { Input, message, Row, Select } from 'antd';
import RoleService from 'services/auth/RoleService';

const heading = 'Tạo tài khoản cho nhân viên';

export default function New() {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);
  const loadRoles = async () => {
    let res = await RoleService.getAll();
    setRoles(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    loadRoles();
  }, []);
  const classes = useStyles();
  const { Option } = Select;
  const onFinish = async values => {
    console.log(values);
    try {
      await message.loading({ content: 'Loading ...' });
      await setTimeout(() => {
        message.success({ content: 'Thêm thành công', duration: 2 });
        form.resetFields();
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const widthCardInput = '29%';
  const [open, setOpen] = React.useState(false);
  return (
    <PageContainer heading={<IntlMessages id={heading} />} className={styles.container}>
      <div className={styles.container_headerPage}>
        <ButtonGoBack />
      </div>
      <Form
        className={styles.form}
        name="basic"
        form={form}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            form.submit();
          }
        }}
        onFinish={onFinish}
        autoComplete="off">
        <Box className={classes.root}>
          <Paper className={classes.paper}>
            <div className={styles.contentArea}>
              <div className={styles.title}>THÔNG TIN TÀI KHOẢN</div>
              <Row justify="space-between">
                <CardInput title="Tên đăng nhập" width={widthCardInput}>
                  <Form.Item name="username" rules={[{ required: true, message: 'Tên đăng nhập không được trống!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Mật khẩu" width={widthCardInput}>
                  <Form.Item name="password" rules={[{ required: true, message: 'Mật khẩu không được trống!' }]}>
                    <Input type="password" />
                  </Form.Item>
                </CardInput>
              </Row>
            </div>
          </Paper>
        </Box>
        <Box className={classes.root}>
          <Paper className={classes.paper}>
            <div className={styles.contentArea}>
              <div className={styles.title}>THÔNG TIN NHÂN VIÊN</div>
              <Row justify="space-between">
                <CardInput title="Họ và tên đệm" width={widthCardInput}>
                  <Form.Item name="firstName" rules={[{ required: true, message: 'Họ và tên đệm không được trống!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Tên" width={widthCardInput}>
                  <Form.Item name="lastName" rules={[{ required: true, message: 'Tên không được trống' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Địa chỉ Email" width={widthCardInput}>
                  <Form.Item name="email" rules={[{ required: true, message: 'Địa chỉ email không được trống' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Số điện thoại" width={widthCardInput}>
                  <Form.Item name="phoneNumber" rules={[{ required: true, message: 'Số điện thoại không được trống' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Địa chỉ" width={widthCardInput}>
                  <Form.Item name="address" rules={[{ required: true, message: 'Địa chỉ không được trống' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Vị trí làm việc" width={widthCardInput}>
                  <Form.Item name="jobTitle" rules={[{ required: true, message: 'Vị trí làm việc không được trống' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Mã văn phòng" required width={widthCardInput}>
                  <Form.Item name="officeCode">
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Phân quyền quản trị" width={widthCardInput}>
                  <Form.Item name="roles" rules={[{ required: true, message: 'Hãy phân quyền cho nhân viên!' }]}>
                    <Select>
                      {roles.map(role => {
                        return (
                          <Option key={role.id} values={role.id}>
                            {role.roleName}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </CardInput>
              </Row>
              <div style={{ textAlign: 'center' }}>
                <ButtonSubmit title="Thêm" width="160px" onClick={() => form.submit()} />
              </div>
            </div>
          </Paper>
        </Box>
      </Form>
    </PageContainer>
  );
}
