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
import { Input, Row } from 'antd';
import { useParams } from 'react-router';
import OrderService from 'services/auth/OrderService';
import OrderDetailService from 'services/auth/OrderDetailService';
import CustomerService from 'services/auth/CustomerService';

const heading = 'sidebar.orderDetail';

export default function ProductTypeDetail() {

  const { id } = useParams();
  const [item, setItem] = useState({});
  const [ customer , setCustomer ] = useState({});
  const [ details , setDetails ] = useState([]);
let count = 0;
let sumPrice = 0;
  const loadCustomer = async() => {
    let res = await CustomerService.getByOrderId(id);
    setCustomer(res.data);
  }
  const loadDetail = async () => {
    let res = await OrderService.getById(id);
    setItem(res.data);
    let resOrderDetail = await OrderDetailService.getByOrderId(res.data.id);
    setDetails(resOrderDetail.data);
  }
  useEffect(() => {
    loadDetail();
    loadCustomer();
  }, []);
  const classes = useStyles();
  const widthCardInput = '40%';
  const [open, setOpen] = React.useState(false);
  details.map((detail) => {
    sumPrice += detail.priceEach * detail.quantityOrder;
  })
  return (
    <PageContainer heading={<IntlMessages id={heading} />} className={styles.container}>
      <div className={styles.container_headerPage}>
        <ButtonGoBack />
      </div>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <div className={styles.contentArea}>
            <div className={styles.title}>TH??NG TIN ????N H??NG</div>
            <Row justify="space-between">
              <CardInput title="ID ????n h??ng" width={widthCardInput}>
                <Input type="text" value={item.id}/>
              </CardInput>
              <CardInput title="T???ng ti???n ????n h??ng" width={widthCardInput}>
                <Input type="text" value={sumPrice.toLocaleString("vi-VN")}/>
              </CardInput>
              <CardInput title="Tr???ng th??i ????n h??ng" width={widthCardInput}>
                <Input type="text" value={item.status}/>
              </CardInput>
              <CardInput title="Ghi ch??" width={widthCardInput}>
                <Input type="text" value={item.comments}/>
              </CardInput>
            </Row>
          </div>
        </Paper>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <div className={styles.contentArea}>
            <div className={styles.title}>TH??NG TIN KH??CH H??NG</div>
            <Row justify="space-between">
              <CardInput title="H??? t??n" width={widthCardInput}>
                <Input type="text" value={customer.firstName + " " + customer.lastName}/>
              </CardInput>
              <CardInput title="?????a ch???" width={widthCardInput}>
                <Input type="text" value={customer.address}/>
              </CardInput>
              <CardInput title="Th??nh ph???" width={widthCardInput}>
                <Input type="text" value={customer.city}/>
              </CardInput>
              <CardInput title="Ti???u bang" width={widthCardInput}>
                <Input type="text" value={customer.state}/>
              </CardInput>
              <CardInput title="Qu???c gia" width={widthCardInput}>
                <Input type="text" value={customer.country}/>
              </CardInput>
              <CardInput title="Email" width={widthCardInput}>
                <Input type="text" value={customer.email}/>
              </CardInput>
              <CardInput title="S??? ??i???n tho???i" width={widthCardInput}>
                <Input type="text" value={customer.phoneNumber}/>
              </CardInput>
              <CardInput title="M?? b??u ??i???n" width={widthCardInput}>
                <Input type="text" value={customer.postalCode}/>
              </CardInput>
              <CardInput title="??i???m t??ch lu???" width={widthCardInput}>
                <Input type="text" value={customer.creditLimit}/>
              </CardInput>
            </Row>
          </div>
        </Paper>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <div className={styles.contentArea}>
            <div className={styles.title}>CHI TI???T ????N H??NG</div>
            
              {details.map((detail) => {
                count += 1;
                return (
                    <>
                    <Row justify="space-between">
                    <h2>S???n ph???m s??? {count} :</h2>
                    <CardInput title="T??n s???n ph???m" width={"15%"}>
                        <Input type="text" value={detail.product.productName}/>
                    </CardInput>
                    <CardInput title="S??? l?????ng s???n ph???m" width={"15%"}>
                        <Input type="text" value={detail.quantityOrder}/>
                    </CardInput>
                    <CardInput title="Gi?? s???n ph???m" width={"15%"}>
                        <Input type="text" value={detail.priceEach.toLocaleString("vi-VN")}/>
                    </CardInput>
                    </Row>
                    </>      
                )
              })}
          </div>
        </Paper>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </PageContainer>
  );
}
