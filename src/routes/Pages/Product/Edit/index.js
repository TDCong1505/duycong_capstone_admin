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

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.dashBoard'} />, link: '/' },
  { label: <IntlMessages id={'sidebar.listUser'} />, isActive: true },
  { label: <IntlMessages id={'sidebar.createBlog'} />, isActive: true },
];
const heading = 'Sửa thông tin sản phẩm';

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
    <PageContainer heading={<IntlMessages id={heading} />} breadcrumbs={breadcrumbs} className={styles.container}>
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
              <div className={styles.title}>THÔNG TIN SẢN PHẨM</div>
              {!!Object.keys(item).length ? (
                <>
                  <Row justify="space-between">
                    <CardInput title="Tên sản phẩm" width={widthCardInput}>
                      <Form.Item name="productName" rules={[{ required: true, message: 'Tên sản phẩm không được trống!' }]}>
                        <Input type="text" />
                      </Form.Item>
                    </CardInput>
                    <CardInput title="Mã sản phẩm" width={widthCardInput}>
                      <Form.Item name="productCode" rules={[{ required: true, message: 'Mã sản phẩm không được trống!' }]}>
                        <Input type="text" />
                      </Form.Item>
                    </CardInput>
                    <CardInput title="Giá sản phẩm" width={widthCardInput}>
                      <Form.Item name="buyPrice" rules={[{ required: true, message: 'Giá sản phẩm không được trống!' }]}>
                        <Input type="number" />
                      </Form.Item>
                    </CardInput>
                    <CardInput title="Số lượng sản phẩm" width={widthCardInput}>
                      <Form.Item name="quantityInStock">
                        <Input type="number" value={item.quantityInStock} />
                      </Form.Item>
                    </CardInput>
                    <CardInput required title="Mô tả sản phẩm" width={widthCardInput}>
                      <Form.Item name="productDescripttion">
                        <Input type="text" />
                      </Form.Item>
                    </CardInput>
                    <CardInput required title="Hãng sản phẩm" width={widthCardInput}>
                      <Form.Item name="productScale">
                        <Input type="text" value={item.productScale} />
                      </Form.Item>
                    </CardInput>
                    <CardInput required title="Quy mô sản phẩm" width={widthCardInput}>
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
              <div className={styles.title}>THÔNG SỐ KỸ THUẬT</div>
              <Row justify="space-between">
                <CardInput title="Kích thước màn hình" width={widthCardInput}>
                  <Form.Item name="inches" rules={[{ required: true, message: 'Không được để trống!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Độ phân giải màn hình" width={widthCardInput}>
                  <Form.Item name="pixels" rules={[{ required: true, message: 'Không được để trống!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Bộ nhớ trong" width={widthCardInput}>
                  <Form.Item name="memory" rules={[{ required: true, message: 'Không được để trống!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Chipset" width={widthCardInput}>
                  <Form.Item name="chipset" rules={[{ required: true, message: 'Không được để trống!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Trọng lượng" width={widthCardInput}>
                  <Form.Item name="weight" rules={[{ required: true, message: 'Không được để trống!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Công nghệ màn hình" width={widthCardInput}>
                  <Form.Item name="screen" rules={[{ required: true, message: 'Không được để trống!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Quay video" width={widthCardInput}>
                  <Form.Item name="video" rules={[{ required: true, message: 'Không được để trống!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Kích thước" width={widthCardInput}>
                  <Form.Item name="size" rules={[{ required: true, message: 'Không được để trống!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Pin" width={widthCardInput}>
                  <Form.Item name="pin" rules={[{ required: true, message: 'Không được để trống!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Camera trước" width={widthCardInput}>
                  <Form.Item name="camera1" rules={[{ required: true, message: 'Không được để trống!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Camera sau" width={widthCardInput}>
                  <Form.Item name="camera2" rules={[{ required: true, message: 'Không được để trống!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Hệ điều hành" width={widthCardInput}>
                  <Form.Item name="os" rules={[{ required: true, message: 'Không được để trống!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Sim" width={widthCardInput}>
                  <Form.Item name="sim" rules={[{ required: true, message: 'Không được để trống!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="WLAN" width={widthCardInput}>
                  <Form.Item name="wlan" rules={[{ required: true, message: 'Không được để trống!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Bluetooth" width={widthCardInput}>
                  <Form.Item name="bluetooth" rules={[{ required: true, message: 'Không được để trống!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="GPS" width={widthCardInput}>
                  <Form.Item name="gps" rules={[{ required: true, message: 'Không được để trống!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="NFC" width={widthCardInput}>
                  <Form.Item name="nfc" rules={[{ required: true, message: 'Không được để trống!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Cảm biến" width={widthCardInput}>
                  <Form.Item name="sensor" rules={[{ required: true, message: 'Không được để trống!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Thẻ nhớ" width={widthCardInput}>
                  <Form.Item name="memoryCard" rules={[{ required: true, message: 'Không được để trống!' }]}>
                    <Input type="text" />
                  </Form.Item>
                </CardInput>
              </Row>
            </div>
            <div style={{ textAlign: 'center' }}>
              <ButtonSubmit title="Thêm" width="160px" onClick={() => form.submit()} />
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
