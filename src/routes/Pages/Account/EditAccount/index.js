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
import UserService from 'services/auth/UserService';
import { useParams } from 'react-router';
import EmployeeService from 'services/auth/EmployeeService';
const heading = 'Chỉnh sửa thông tin nhân viên';
export default function New() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);
  const [idEmployee, setIdEmployee] = useState(0);
  const loadUser = async () => {
    let res = await UserService.getById(id);
    setIdEmployee(res.data.employee.id);
    form.setFieldsValue({
      firstName: res.data.employee.firstName,
      lastName: res.data.employee.lastName,
      email: res.data.employee.email,
      phoneNumber: res.data.employee.phoneNumber,
      address: res.data.employee.email,
      jobTitle: res.data.employee.jobTitle,
      officeCode: res.data.employee.officeCode,
      roles: res.data.roles[0].roleKey,
    });
  };
  const loadRoles = async () => {
    let res = await RoleService.getAll();
    setRoles(res.data);
  };
  useEffect(() => {
    loadRoles();
    loadUser();
  }, []);
  const classes = useStyles();
  const { Option } = Select;
  const onFinish = async values => {
    try {
      const idUser = localStorage.getItem("idUser");
      let res = await EmployeeService.updateEmployee(idEmployee, {
        firstName:values.firstName,
        lastName:values.lastName,
        email:values.email,
        phoneNumber:values.phoneNumber,
        address:values.address,
        jobTitle:values.jobTitle,
        officeCode:values.officeCode,
      });
      let resUser = await UserService.updateUser(id,{
        updatedBy:idUser,
        roles: [{id:values.roles}],
      })
      message.loading({ content: 'Loading ...' });
      await setTimeout(() => {
        message.success({ content: 'Cập nhật thông tin thành công', duration: 2 });
        loadUser();
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

      <Box className={classes.root}>
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
                    <Input type="number" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Phân quyền quản trị" width={widthCardInput}>
                  <Form.Item name="roles" rules={[{ required: true, message: 'Hãy phân quyền cho nhân viên!' }]}>
                    <Select>
                      {roles.map(role => {
                        return (
                          <Option key={role.id} values={role.id} >
                            {role.roleKey}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </CardInput>
              </Row>
            </div>
          </Paper>
        </Form>
        <div style={{ textAlign: 'center' }}>
          <ButtonSubmit title="Thêm" width="160px" onClick={() => form.submit()} />
        </div>
      </Box>
    </PageContainer>
  );
}
