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
import { Input, message, Row } from 'antd';

const heading = 'Thêm loại sản phẩm mới';

export default function New() {

    useEffect(() => {

    },[]);
    const [form] = Form.useForm();
    const classes = useStyles();

    const onFinish = async values => {
      console.log(values);
        try {
            const res = await ProductTypeService.createProductType({
                productTypeName:values.productTypeName,
                productTypeCode:values.productTypeCode,
            })
            await message.loading({content: 'Loading ...'})
            await setTimeout(() => {
                message.success({ content: 'Thêm thành công', duration: 2 });
                form.resetFields();
            }, 500);
        } catch (error){
            console.log(error);
        }
    };

    const widthCardInput = "40%"
    const [open, setOpen] = React.useState(false);
    return <PageContainer heading={<IntlMessages id={heading} />} className={styles.container}>
        <div className={styles.container_headerPage}>
            <ButtonGoBack />
        </div>
        <Box className={classes.root}>
            <Paper className={classes.paper}>
                <div className={styles.contentArea}>
                    <div className={styles.title}>
                        THÔNG TIN LOẠI SẢN PHẨM
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
                            <CardInput  title="Tên loại sản phẩm" width={widthCardInput}>
                                <Form.Item name="productTypeName" rules={[{required: true,message: 'Tên loại sản phẩm không được trống!'}]}>
                                    <Input type="text" />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="Mã loại sản phẩm" width={widthCardInput}>
                                <Form.Item name="productTypeCode" rules={[{required: true,message: 'Mã loại sản phẩm không được trống!'}]}>
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
    </PageContainer>;
}