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

const heading = 'Xem thông tin nhân viên';

export default function New() {
  const { id } = useParams();
  const [ user , setUser ] = useState({})
  const [ role , setRole ] = useState({});
  const [ info , setInfo ] = useState({});
  const loadRoles = async () => {
    let res = await UserService.getById(id);
    setUser(res.data);
    setRole(res.data.roles[0]);
    setInfo(res.data.employee);
  };
  useEffect(() => {
    loadRoles();
  }, []);
  const classes = useStyles();
  const { Option } = Select;
  const widthCardInput = '29%';
  const [open, setOpen] = React.useState(false);
  return (
    <PageContainer heading={<IntlMessages id={heading} />} className={styles.container}>
      <div className={styles.container_headerPage}>
        <ButtonGoBack />
      </div>
        <Box className={classes.root}>
          <Paper className={classes.paper}>
            <div className={styles.contentArea}>
              <div className={styles.title}>THÔNG TIN NHÂN VIÊN</div>
              <Row justify="space-between">
                <CardInput title="Tên tài khoản" width={widthCardInput}>
                    <Input type="text" value={user.username}/>
                </CardInput>
                <CardInput title="Họ và tên" width={widthCardInput}>
                    <Input type="text" value={info.firstName + " " + info.lastName}/>
                </CardInput>
                <CardInput title="Địa chỉ Email" width={widthCardInput}>
                    <Input type="text" value={info.email}/>
                </CardInput>
                <CardInput title="Số điện thoại" width={widthCardInput}>
                    <Input type="text" value={info.phoneNumber}/>
                </CardInput>
                <CardInput title="Địa chỉ" width={widthCardInput}>
                    <Input type="text" value={info.address}/>
                </CardInput>
                <CardInput title="Vị trí làm việc" width={widthCardInput}>
                    <Input type="text" value={info.jobTitle}/>
                </CardInput>
                <CardInput title="Mã văn phòng" required width={widthCardInput}>
                    <Input type="text" value={info.officeCode}/>
                </CardInput>
                <CardInput title="Phân quyền quản trị" width={widthCardInput}>
                    <Input type="text" value={role.roleKey}/>
                </CardInput>
              </Row>
            </div>
          </Paper>
        </Box>
    </PageContainer>
  );
}
