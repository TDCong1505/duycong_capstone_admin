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
import CardInput from 'routes/Pages/UserManager/User/Component/CardInput/CardInput'; 
import Backdrop from '@material-ui/core/Backdrop';
import { DatePicker, Input, message, Row, Select } from 'antd';
import { useParams } from 'react-router';
import CustomerService from 'services/auth/CustomerService';

const heading = 'sidebar.editCustomer';

export default function New() {

  const { id } = useParams();
  const loadDetail = async () => {
    let res = await CustomerService.getById(id);
    const data = res.data
    form.setFieldsValue({
      firstName:data.firstName,
      lastName:data.lastName,
      phoneNumber:data.phoneNumber,
      address:data.address,
      city:data.city,
      state:data.state,
      email:data.email,
      postalCode:data.postalCode,
      country:data.country,
      creditLimit:data.creditLimit,
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
            let res = await CustomerService.updateCustomer(id,{
                firstName:values.firstName,
                lastName:values.lastName,
                phoneNumber:values.phoneNumber,
                address:values.address,
                city:values.city,
                state:values.state,
                email:values.email,
                postalCode:values.postalCode,
                country:values.country,
                creditLimit:values.creditLimit,
                salesRepEmployeeNumber:values.salesRepEmployeeNumber,
            })

            message.loading({content: 'Loading ...'})
            await setTimeout(() => {
                message.success({ content: 'C???p nh???t th??nh c??ng', duration: 2 });
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
                        TH??NG TIN KH??CH H??NG
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
                            <CardInput  title="H??? v?? t??n ?????m " width={widthCardInput}>
                                <Form.Item name="firstName" rules={[{required: true,message: 'H??? v?? t??n ?????m kh??ng ???????c tr???ng!'}]}>
                                    <Input type="text" />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="T??n" width={widthCardInput}>
                                <Form.Item name="lastName" rules={[{required: true,message: 'T??n kh??ng ???????c tr???ng!'}]}>
                                    <Input type="text" />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="S??? ??i???n tho???i" width={widthCardInput}>
                                <Form.Item name="phoneNumber" rules={[{required: true,message: 'S??? ??i???n tho???i kh??ng ???????c tr???ng!'}]}>
                                    <Input type="text " />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="?????a ch???" width={widthCardInput} >
                                <Form.Item name="address" rules={[{required: true,message: '?????a ch??? kh??ng ???????c tr???ng!'}]}>
                                    <Input type="text" />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="Th??nh ph???" required width={widthCardInput}>
                                <Form.Item name="city">
                                    <Input type="text" />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="Ti???u bang" required width={widthCardInput}>
                                <Form.Item name="state">
                                    <Input type="text" />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="Email" width={widthCardInput}>
                                <Form.Item name="email" rules={[{required: true,message: 'Email kh??ng ???????c tr???ng!'}]}>
                                    <Input type="email" />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="M?? b??u ??i???n" required width={widthCardInput}>
                                <Form.Item name="postalCode">
                                    <Input type="text" />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="Qu???c gia" required width={widthCardInput}>
                                <Form.Item name="country">
                                    <Input type="text" />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="??i???m t??ch lu???" required width={widthCardInput}>
                                <Form.Item name="creditLimit">
                                    <Input type="number" />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="S??? nh??n vi??n ?????i di???n b??n h??ng" width={widthCardInput}>
                                <Form.Item name="salesRepEmployeeNumber">
                                    <Input type="number" />
                                </Form.Item>
                            </CardInput>
                        </Row>
                    </Form>
                    <div style={{ textAlign: 'center' }}>
                        <ButtonSubmit title="S???a" width="160px" onClick={() => form.submit()} />
                    </div>
                </div>
            </Paper>
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    </PageContainer>;
}