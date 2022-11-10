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
import { useParams } from 'react-router';
import ProductDesService from 'services/auth/ProductDesService';
import ProductService from 'services/auth/ProductService';

const { Option } = Select;
const heading = 'sidebar.newDesc';

export default function New() {
  const [product, setProduct] = useState([]);
  const loadProduct = async () => {
    let res = await ProductService.getAllProduct();
    setProduct(res.data);
  };
  useEffect(() => {
    loadProduct();
  },[])
  const [form] = Form.useForm();
  const classes = useStyles();
  const onFinish = async values => {
    console.log(values);
    try {
      let res = ProductDesService.createProductDes(values.productCode, {
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
      });
      await message.loading({ content: 'Loading ...' });
      await setTimeout(() => {
        message.success({ content: 'Tạo mới thành công', duration: 2 });
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

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
            <div className={styles.title}>THÔNG SỐ SẢN PHẨM</div>
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
                <CardInput title="Sản phẩm" width={widthCardInput}>
                <Form.Item name="productCode" rules={[{ required: true, message: 'Không được để trống!' }]}>
                  <Select style={{width:'100%'}}>
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
