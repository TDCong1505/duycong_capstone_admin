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
import { DatePicker, Input, message, Row, Select } from 'antd';
import { useParams } from 'react-router';
import CustomerService from 'services/auth/CustomerService';
import OrderService from 'services/auth/OrderService';

const heading = 'Xem thông tin khách hàng';
export default function ShowUser() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [orders, setOrder] = useState([]);
  const loadOrder = async () => {
    let res = await OrderService.getByCustomerId(id);
    setOrder(res.data);
  };
  const loadDetail = async () => {
    let res = await CustomerService.getById(id);
    setData(res.data);
  };
  useEffect(() => {
    loadDetail();
    loadOrder();
  }, []);
  let count = 0;
  const [form] = Form.useForm();
  const classes = useStyles();
  const widthCardInput = '30%';
  const [open, setOpen] = React.useState(false);
  return (
    <PageContainer heading={<IntlMessages id={heading} />} className={styles.container}>
      <div className={styles.container_headerPage}>
        <ButtonGoBack />
      </div>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <div className={styles.contentArea}>
            <div className={styles.title}>THÔNG TIN KHÁCH HÀNG</div>
            <Row justify="space-between">
              <CardInput title="Họ và tên đệm " width={widthCardInput}>
                <Input type="text" value={data.firstName} />
              </CardInput>
              <CardInput title="Tên" width={widthCardInput}>
                <Input type="text" value={data.lastName} />
              </CardInput>
              <CardInput title="Số điện thoại" width={widthCardInput}>
                <Input type="text " value={data.phoneNumber} />
              </CardInput>
              <CardInput title="Địa chỉ" width={widthCardInput}>
                <Input type="text" value={data.address} />
              </CardInput>
              <CardInput title="Thành phố" required width={widthCardInput}>
                <Input type="text" value={data.city} />
              </CardInput>
              <CardInput title="Tiểu bang" required width={widthCardInput}>
                <Input type="text" value={data.state} />
              </CardInput>
              <CardInput title="Email" width={widthCardInput}>
                <Input type="email" value={data.email} />
              </CardInput>
              <CardInput title="Mã bưu điện" required width={widthCardInput}>
                <Input type="text" value={data.postalCode} />
              </CardInput>
              <CardInput title="Quốc gia" required width={widthCardInput}>
                <Input type="text" value={data.country} />
              </CardInput>
              <CardInput title="Điểm tích luỹ" required width={widthCardInput}>
                <Input type="number" value={data.creditLimit} />
              </CardInput>
              <CardInput title="Số nhân viên đại diện bán hàng" width={widthCardInput}>
                <Input type="number" value={data.salesRepEmployeeNumber} />
              </CardInput>
            </Row>
          </div>
        </Paper>
      </Box>
    </PageContainer>
  );
}
