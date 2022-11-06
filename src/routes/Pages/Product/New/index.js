import React, { useEffect, useState } from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { Form } from 'antd';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ButtonSubmit from 'routes/Pages/components/Button/ButtonSubmit';
import { useStyles } from 'Configuration/function';
import styles from './New.module.scss'
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import ButtonGoBack from 'routes/Pages/components/Button/ButtonGoBack';
import { Box, CircularProgress, Paper } from '@material-ui/core';
import CardInput from '../../UserManager/User/Component/CardInput/CardInput';
import Backdrop from '@material-ui/core/Backdrop';
import ProductLineService from "../../../../services/auth/ProductLineService"
import ProductService from 'services/auth/ProductService';
import { DatePicker, Input, message, Row, Select } from 'antd';

const { Option } = Select
const breadcrumbs = [
    { label: <IntlMessages id={'sidebar.dashBoard'} />, link: '/' },
    { label: <IntlMessages id={'sidebar.listUser'} />, isActive: true },
    { label: <IntlMessages id={'sidebar.createBlog'} />, isActive: true },
];
const heading = 'Thêm sản phẩm mới';

export default function New() {
    const [ data , setData ] = useState([]);
    const loadData = async () => {
        let res = await ProductLineService.getAllProductLine();
        console.log(res.data);
        setData(res.data);
    }
    useEffect(() => {
        loadData();
    },[]);
    const [form] = Form.useForm();
    const classes = useStyles();

    const onFinish = async values => {
        try {
            const res = await ProductService.createProduct(values.productLineId,{
                productName:values.productName,
                productCode:values.productCode,
                buyPrice:values.buyPrice,
                quantityInStock:values.quantityInStock,
                productDescripttion:values.productDescription,
                productVendor:values.productVendor,
                productScale:values.productScale,
            })
            message.loading({content: 'Loading ...'})
            await setTimeout(() => {
                message.success({ content: 'Thêm thành công', duration: 2 });
                form.resetFields();
            }, 500);
        } catch (error){
            console.log(error);
        }
    };

    const widthCardInput = "31%"
    const [open, setOpen] = React.useState(false);
    return <PageContainer heading={<IntlMessages id={heading} />} breadcrumbs={breadcrumbs} className={styles.container}>
        <div className={styles.container_headerPage}>
            <ButtonGoBack />
        </div>
        <Box className={classes.root}>
            <Paper className={classes.paper}>
                <div className={styles.contentArea}>
                    <div className={styles.title}>
                        THÔNG TIN SẢN PHẨM
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
                            <CardInput  title="Tên sản phẩm" width={widthCardInput}>
                                <Form.Item name="productName" rules={[{required: true,message: 'Tên sản phẩm không được trống!'}]}>
                                    <Input type="text" />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="Mã sản phẩm" width={widthCardInput}>
                                <Form.Item name="productCode" rules={[{required: true,message: 'Mã sản phẩm không được trống!'}]}>
                                    <Input type="text" />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="Giá sản phẩm" width={widthCardInput}>
                                <Form.Item name="buyPrice" rules={[{required: true,message: 'Giá sản phẩm không được trống!'}]}>
                                    <Input type="number" />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="Số lượng sản phẩm" width={widthCardInput}>
                                <Form.Item name="quantityInStock" rules={[{required: true,message: 'Số lượng sản phẩm không được trống!'}]}>
                                    <Input type="number" />
                                </Form.Item>
                            </CardInput>
                            <CardInput required title="Mô tả sản phẩm" width={widthCardInput}>
                                <Form.Item name="productDescription">
                                    <Input type="text" />
                                </Form.Item>
                            </CardInput>
                            <CardInput  required title="Nhà cung cấp sản phẩm" width={widthCardInput}>
                                <Form.Item name="productVendor">
                                    <Input type="text" />
                                </Form.Item>
                            </CardInput>
                            <CardInput required title="Quy mô sản phẩm" width={widthCardInput}>
                                <Form.Item name="productScale">
                                    <Input type="text" />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="Hãng sản phẩm" width={widthCardInput}>
                                <Form.Item name="productLineId">
                                    <Select>
                                        {data.map((line) => {
                                            return (
                                                <Option key={line.id} value={line.id}>{line.productLineName}</Option>
                                            )
                                        })}
                                    </Select>
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