import React, { useEffect, useState } from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { Button, Carousel, Empty, Input, Row } from 'antd';
import { Form } from 'antd';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useStyles } from 'Configuration/function';
import styles from '../New/New.module.scss';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import ButtonGoBack from 'routes/Pages/components/Button/ButtonGoBack';
import { Box, CircularProgress, Paper } from '@material-ui/core';
import CardInput from '../../UserManager/User/Component/CardInput/CardInput';
import Backdrop from '@material-ui/core/Backdrop';
import ProductService from 'services/auth/ProductService';
import { useParams } from 'react-router';
import ProductDesService from '../../../../services/auth/ProductDesService';
import ProductPhotoService from 'services/auth/ProductPhotoService';
import ButtonSubmit from 'routes/Pages/components/Button/ButtonSubmit';

const heading = 'sidebar.editProduct';

export default function EditProduct() {
  const [form] = Form.useForm();
  const [open, setOpen] = React.useState(false);
  const { code } = useParams();
  const [item, setItem] = useState([]);
  const [des, setDes] = useState([]);
  const loadDetail = async () => {
    let res = await ProductService.productDetail(code);
    setItem(res.data);
    const data = res.data;
    form.setFieldsValue({
      productName: data.productName,
      productCode: data.productCode,
      productScale: data.productScale,
      quantityInStock: data.quantityInStock,
      productDescripttion: data.productDescripttion,
      buyPrice: data.buyPrice,
      productVendor: data.productVendor,
    });
  };
  const loadDes = async () => {
    let res = await ProductDesService.getByProductCode(code);
    setDes(res.data);
    const data = res.data;
    form.setFieldsValue({
      inches: data.inches,
      pixels: data.pixels,
      memory: data.memory,
      chipset: data.chipset,
      weight: data.weight,
      screen: data.screen,
      video: data.video,
      size: data.size,
      pixels: data.pixels,
      camera1: data.camera1,
      camera2: data.camera2,
      pin: data.pin,
      sim: data.sim,
      wlan: data.wlan,
      bluetooth: data.bluetooth,
      gps: data.gps,
      nfc: data.nfc,
      sensor: data.sensor,
      memoryCard: data.memoryCard,
      os: data.os,
    });
  };
  useEffect(() => {
    loadDetail();
    loadDes();
  }, []);
  const classes = useStyles();
  const widthCardInput = '30%';
  const onFinish = async values => {
    let updateProduct = await ProductService.updateProduct(code, {
      productName: values.productName,
      productCode: values.productCode,
      productScale: values.productScale,
      quantityInStock: values.quantityInStock,
      productDescripttion: values.productDescripttion,
      buyPrice: values.buyPrice,
      productVendor: values.productVendor,
    });
    console.log(updateProduct.data);
    const desBody = {
      inches: values.inches,
      pixels: values.pixels,
      memory: values.memory,
      chipset: values.chipset,
      weight: values.weight,
      screen: values.screen,
      video: values.video,
      size: values.size,
      pixels: values.pixels,
      camera1: values.camera1,
      camera2: values.camera2,
      pin: values.pin,
      sim: values.sim,
      wlan: values.wlan,
      bluetooth: values.bluetooth,
      gps: values.gps,
      nfc: values.nfc,
      sensor: values.sensor,
      memoryCard: values.memoryCard,
      os: values.os,
    }
    if (des) {
      let updateDes = await ProductDesService.updateProductDes(des.id,desBody);
      console.log(updateDes.data);
    } else {
      let createDes = await ProductDesService.createProductDes(code,desBody);
      console.log(createDes.data);
    }
  };
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
              <div className={styles.title}>TH??NG TIN S???N PH???M</div>
              {!!Object.keys(item).length ? (
                <>
                  <Row justify="space-between">
                    <CardInput title="T??n s???n ph???m" width={widthCardInput}>
                      <Form.Item name="productName" rules={[{ required: true, message: 'T??n s???n ph???m kh??ng ???????c tr???ng!' }]}>
                        <Input type="text" />
                      </Form.Item>
                    </CardInput>
                    <CardInput title="M?? s???n ph???m" width={widthCardInput}>
                      <Form.Item name="productCode" rules={[{ required: true, message: 'M?? s???n ph???m kh??ng ???????c tr???ng!' }]}>
                        <Input type="text" />
                      </Form.Item>
                    </CardInput>
                    <CardInput title="Gi?? s???n ph???m" width={widthCardInput}>
                      <Form.Item name="buyPrice" rules={[{ required: true, message: 'Gi?? s???n ph???m kh??ng ???????c tr???ng!' }]}>
                        <Input type="number" />
                      </Form.Item>
                    </CardInput>
                    <CardInput title="S??? l?????ng s???n ph???m" width={widthCardInput}>
                      <Form.Item name="quantityInStock">
                        <Input type="number" value={item.quantityInStock} />
                      </Form.Item>
                    </CardInput>
                    <CardInput required title="M?? t??? s???n ph???m" width={widthCardInput}>
                      <Form.Item name="productDescripttion">
                        <Input type="text" />
                      </Form.Item>
                    </CardInput>
                    <CardInput required title="H??ng s???n ph???m" width={widthCardInput}>
                      <Form.Item name="productScale">
                        <Input type="text" value={item.productScale} />
                      </Form.Item>
                    </CardInput>
                    <CardInput required title="Quy m?? s???n ph???m" width={widthCardInput}>
                      <Form.Item name="productVendor">
                        <Input type="text" value={item.productVendor} />
                      </Form.Item>
                    </CardInput>
                  </Row>
                </>
              ) : (
                <Empty />
              )}
            </div>
          </Paper>
        </Box>
        <Box className={classes.root}>
          <Paper className={classes.paper}>
            <div className={styles.contentArea}>
              <div className={styles.title}>TH??NG S??? K??? THU???T</div>
              <Row justify="space-between">
                <CardInput title="K??ch th?????c m??n h??nh" width={widthCardInput}>
                  <Form.Item name="inches" rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="????? ph??n gi???i m??n h??nh" width={widthCardInput}>
                  <Form.Item name="pixels" rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="B??? nh??? trong" width={widthCardInput}>
                  <Form.Item name="memory" rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Chipset" width={widthCardInput}>
                  <Form.Item name="chipset" rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Tr???ng l?????ng" width={widthCardInput}>
                  <Form.Item name="weight" rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="C??ng ngh??? m??n h??nh" width={widthCardInput}>
                  <Form.Item name="screen" rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Quay video" width={widthCardInput}>
                  <Form.Item name="video" rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="K??ch th?????c" width={widthCardInput}>
                  <Form.Item name="size" rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Pin" width={widthCardInput}>
                  <Form.Item name="pin" rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Camera tr?????c" width={widthCardInput}>
                  <Form.Item name="camera1" rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Camera sau" width={widthCardInput}>
                  <Form.Item name="camera2" rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="H??? ??i???u h??nh" width={widthCardInput}>
                  <Form.Item name="os" rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Sim" width={widthCardInput}>
                  <Form.Item name="sim" rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="WLAN" width={widthCardInput}>
                  <Form.Item name="wlan" rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Bluetooth" width={widthCardInput}>
                  <Form.Item name="bluetooth" rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="GPS" width={widthCardInput}>
                  <Form.Item name="gps" rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="NFC" width={widthCardInput}>
                  <Form.Item name="nfc" rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="C???m bi???n" width={widthCardInput}>
                  <Form.Item name="sensor" rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Th??? nh???" width={widthCardInput}>
                  <Form.Item name="memoryCard" rules={[{ required: true, message: 'Kh??ng ???????c ????? tr???ng!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
              </Row>
            </div>
            <div style={{ textAlign: 'center' }}>
              <ButtonSubmit title="Th??m" width="160px" onClick={() => form.submit()} />
            </div>
          </Paper>
        </Box>
      </Form>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </PageContainer>
  );
}
