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
import { DatePicker, Input, message, Row, Select } from 'antd';
import ProductLineService from 'services/auth/ProductLineService';
import CustomerService from 'services/auth/CustomerService';
import { NavLink } from 'react-router-dom';
import { rootPath } from 'helpers/buildUrl';
import ProductService from 'services/auth/ProductService';
import OrderService from 'services/auth/OrderService';
import OrderDetailService from 'services/auth/OrderDetailService';

const heading = 'Thêm đơn hàng mới';
const { Option } = Select;
export default function New() {
  const [form] = Form.useForm();
  const classes = useStyles();
  const [customer, setCustomer] = useState([]);
  const [product, setProduct] = useState([]);
  const loadCustomer = async () => {
    let res = await CustomerService.getAll();
    setCustomer(res.data);
    let resProduct = await ProductService.getAllProduct();
    setProduct(resProduct.data);
  };
  const onFinish = async values => {
    console.log(values);
    let price = await ProductService.productDetail(values.product);
    const priceEach = price.data.buyPrice;
    let resOrder = await OrderService.createOrder(values.customer, {
      comments: values.comments,
    });
    let resOrderDetail = await OrderDetailService.createOrderDetail(values.product, resOrder.data.id, {
      quantityOrder: values.quantity,
      priceEach: priceEach,
    });
    message.loading({ content: 'Loading ...' });
    await setTimeout(() => {
      message.success({ content: 'Tạo đơn hàng thành công !', duration: 2 });
    }, 500);
  };
  useEffect(() => {
    loadCustomer();
  }, []);
  const widthCardInput = '40%';
  const [open, setOpen] = React.useState(false);
  return (
    <PageContainer heading={<IntlMessages id={heading} />} className={styles.container}>
      <div className={styles.container_headerPage}>
        <ButtonGoBack />
      </div>

      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <div className={styles.contentArea}>
            <div className={styles.title}>THÔNG TIN ĐƠN HÀNG</div>
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
              <Row justify="space-between">
                <CardInput title="Tìm kiếm khách hàng theo email" width={widthCardInput}>
                  <Form.Item name="customer">
                    <Select>
                      {customer.map(customer => {
                        return (
                          <Option key={customer.id} values={customer.id}>
                            {customer.email}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <NavLink to={`${rootPath.listCustomer}/new`}>
                    <ButtonSubmit title="Khách hàng mới" width="160px" />
                  </NavLink>
                </CardInput>
                <CardInput title="Ghi chú" width={widthCardInput}>
                  <Form.Item name="comments">
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Chọn sản phẩm" width={widthCardInput}>
                  <Form.Item name="product" rules={[{ required: true, message: 'Chọn sản phẩm muốn thêm !' }]}>
                    <Select>
                      {product.map(product => {
                        return (
                          <Option key={product.productCode} values={product.productCode}>
                            {product.productName}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </CardInput>
                <CardInput title="Số lượng" width={widthCardInput}>
                  <Form.Item name="quantity">
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
              </Row>
            </Form>
            <div style={{ textAlign: 'center' }}>
              <ButtonSubmit title="Thêm" width="160px" onClick={() => form.submit()} />
            </div>
          </div>
        </Paper>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </PageContainer>
  );
}
