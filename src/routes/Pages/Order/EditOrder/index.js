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
import OrderService from 'services/auth/OrderService';

const heading = 'sidebar.editOrder';

export default function EditOrder() {

    const { Option } = Select;
  const { id } = useParams();
  const loadDetail = async () => {
    let res = await OrderService.getById(id);
    console.log(res.data);
    const data = res.data
    form.setFieldsValue({
        id:data.id,
        status:data.status,
        comments:data.comments,
        orderDate:data.orderDate.substring(0,10),
        requiredDate:data.requiredDate.substring(0,10),
        shippedDate:data.shippedDate.substring(0,10),
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
            let res = await OrderService.updateOrder(id,{
                status:values.status,
                comments:values.comments,
                orderDate:values.orderDate,
                requiredDate:values.requiredDate,
                shippedDate:values.shippedDate,
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
                        C???P NH???T TH??NG TIN ????N H??NG
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
                        <Row justify="space-between">
                            <CardInput title="ID ????n h??ng" width={widthCardInput}>
                            <Form.Item name="id" >
                                <Input type="text" />
                            </Form.Item>
                            </CardInput>
                            <CardInput title="Tr???ng th??i ????n h??ng" width={widthCardInput}>
                            <Form.Item name="status">
                                <Select >
                                    <Option values="Ch??? x??c nh???n" key={"Ch??? x??c nh???n"}>Ch??? x??c nh???n</Option>
                                    <Option values="???? x??c nh???n" key={"???? x??c nh???n"}>???? x??c nh???n</Option>
                                    <Option values="???? giao xong" key={"???? giao xong"}>???? giao xong</Option>
                                    <Option values="???? t??? ch???i" key={"???? t??? ch???i"}>???? t??? ch???i</Option>
                                </Select>
                            </Form.Item>
                            </CardInput>
                            <CardInput title="Ghi ch??" width={widthCardInput}>
                            <Form.Item name="comments" rules={[{required: true,message: 'C???p nh???t ghi ch?? cho ????n h??ng!'}]}>
                                <Input type="text" />
                            </Form.Item>
                            </CardInput>
                            <CardInput title="Ng??y ?????t ????n" width={widthCardInput}>
                            <Form.Item name="orderDate">
                                <Input type="date" />
                            </Form.Item>
                            </CardInput>
                            <CardInput title="Ng??y x??c nh???n" width={widthCardInput}>
                            <Form.Item name="requiredDate">
                                <Input type="date" />
                            </Form.Item>
                            </CardInput>
                            <CardInput title="Ng??y giao h??ng" width={widthCardInput}>
                            <Form.Item name="shippedDate">
                                <Input type="date" />
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