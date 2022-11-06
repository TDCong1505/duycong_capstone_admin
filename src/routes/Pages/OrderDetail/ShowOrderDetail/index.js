import React, { useEffect, useState } from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useStyles } from 'Configuration/function';
import styles from '../../Product/New/New.module.scss';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import ButtonGoBack from 'routes/Pages/components/Button/ButtonGoBack';
import { Box, CircularProgress, Paper } from '@material-ui/core';
import CardInput from '../../UserManager/User/Component/CardInput/CardInput';
import Backdrop from '@material-ui/core/Backdrop';
import { Input, Row,  } from 'antd';
import { useParams } from 'react-router';
import OrderDetailService from 'services/auth/OrderDetailService';

const heading = 'Xem thông tin đơn hàng chi tiết';

export default function ShowOrderDetail() {

  const { id } = useParams();
  const [item, setItem] = useState({});
  const loadDetail = async () => {
    let res = await OrderDetailService.getById(id);
    setItem(res.data);
  }
  useEffect(() => {
    loadDetail();
  }, []);
  const classes = useStyles();
  const widthCardInput = '33%';
  const [open, setOpen] = React.useState(false);
  return (
    <PageContainer heading={<IntlMessages id={heading} />} className={styles.container}>
      <div className={styles.container_headerPage}>
        <ButtonGoBack />
      </div>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <div className={styles.contentArea}>
            <div className={styles.title}>THÔNG TIN ĐƠN HÀNG CHI TIẾT</div>
            <Row justify="space-between">
              <CardInput title="ID đơn hàng" width={widthCardInput}>
                <Input type="text" value={item.id}/>
              </CardInput>
              <CardInput title="Số lượng sản phẩm" width={widthCardInput}>
                <Input type="text" value={item.quantityOrder}/>
              </CardInput>
              <CardInput title="Giá tiền" width={widthCardInput}>
                <Input type="text" value={item.priceEach}/>
              </CardInput>
              <CardInput title="Tổng tiền đơn hàng" width={widthCardInput}>
                <Input type="text" value={item.priceEach * item.quantityOrder}/>
              </CardInput>
            </Row>
          </div>
        </Paper>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </PageContainer>
  );
}
