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

const heading = 'Thêm hãng sản phẩm mới';
const { Option } = Select;
export default function New() {

    const [form] = Form.useForm();
    const classes = useStyles();
    const [ type , setType ] = useState([]);
    const loadType = async () => {
      let res = await ProductTypeService.getAll();
      setType(res.data);
    }
    const onFinish = async values => {
      console.log(values);
        try {
            const res = await ProductLineService.createProductLine(values.productLineId,{
                productLineName:values.productLineName,
                productLineCode:values.productLineCode,
                description:values.description,
                photoURL:values.photoURL,
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
    useEffect(() => {
      loadType();
    },[])
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
                            <CardInput title="Ảnh đại diện cho hãng" width={widthCardInput}>
                                <Form.Item name="photoURL" rules={[{required: true,message: 'Ảnh đại diện cho hãng không được trống!'}]}>
                                    <Input type="text" />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="Chọn loại sản phẩm" width={widthCardInput}>
                                <Form.Item name="productLineId" rules={[{required: true,message: 'Hãy chọn loại sản phẩm!'}]}>
                                    <Select>
                                      {type.map((type) => {
                                        return (
                                          <Option key={type.id} values={type.id}>{type.productTypeName}</Option>
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