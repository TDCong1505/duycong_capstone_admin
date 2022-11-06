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
import ProductLineService from 'services/auth/ProductLineService';

const heading = 'Chỉnh sửa hãng sản phẩm';

export default function New() {

  const { code } = useParams();
  const loadDetail = async () => {
    let res = await ProductLineService.getByCode(code);
    const data = res.data
    form.setFieldsValue({
      productLineName:data.productLineName,
      productLineCode:data.productLineCode,
      description:data.description,
    })
  }
  useEffect(() => {
    loadDetail();
  }, []);
    const [form] = Form.useForm();
    const classes = useStyles();
    const onFinish = async values => {
        console.log(values);
        try {
            let res = await ProductLineService.updateProductLine(code,{
                productLineName:values.productLineName,
                productLineCode:values.productLineCode,
                description:values.description,
            })
            await message.loading({content: 'Loading ...'})
            await setTimeout(() => {
                message.success({ content: 'Cập nhật thành công', duration: 2 });
            }, 500);
        } catch (error){
            console.log(error);
        }
    };

    const widthCardInput = "30%"
    const [open, setOpen] = React.useState(false);
    return <PageContainer heading={<IntlMessages id={heading} />} className={styles.container}>
        <div className={styles.container_headerPage}>
            <ButtonGoBack />
        </div>
        <Box className={classes.root}>
            <Paper className={classes.paper}>
                <div className={styles.contentArea}>
                    <div className={styles.title}>
                        THÔNG TIN HÃNG SẢN PHẨM
                    </div>
                    <Form
                        className={styles.form}
                        name="basic"
                        form={form}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                form.submit();  
                            }
                        }}
                        onFinish={onFinish}
                        autoComplete="off">
                        <Row justify='space-between'>
                            <CardInput  title="Tên hãng sản phẩm" width={widthCardInput}>
                                <Form.Item name="productLineName" rules={[{required: true,message: 'Tên hãng sản phẩm không được trống!'}]}>
                                    <Input type="text" />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="Mã hãng sản phẩm" width={widthCardInput}>
                                <Form.Item name="productLineCode" rules={[{required: true,message: 'Mã hãng sản phẩm không được trống!'}]}>
                                    <Input type="text" />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="Mô tả hãng sản phẩm" width={widthCardInput}>
                                <Form.Item name="description" rules={[{required: true,message: 'Mô tả hãng sản phẩm không được trống!'}]}>
                                    <Input type="text" />
                                </Form.Item>
                            </CardInput>
                        </Row>
                    </Form>
                    <div style={{ textAlign: 'center' }}>
                        <ButtonSubmit title="Sửa" width="160px" onClick={() => form.submit()} />
                    </div>
                </div>
            </Paper>
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    </PageContainer>;
}