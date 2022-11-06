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
import { DatePicker, Input, message, Row, Select , Image } from 'antd';
import { useParams } from 'react-router';
import ProductPhotoService from 'services/auth/ProductPhotoService';
const heading = 'Chỉnh sửa ảnh sản phẩm';

export default function EditPhoto() {

    const [ data , setData ] = useState({}); 
  const { id } = useParams();
  const loadDetail = async () => {
    let res = await ProductPhotoService.getDetail(id);
    setData(res.data);
    const data = res.data
    form.setFieldsValue({
      photoURL:data.photoURL
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
            let res = await ProductPhotoService.updatePhoto(id,{
                photoURL:values.photoURL,
            })
            message.loading({content: 'Loading ...'})
            await setTimeout(() => {
                message.success({ content: 'Cập nhật thành công', duration: 2 });
            }, 500);
            loadDetail();
        } catch (error){
            console.log(error);
        }
    };

    const widthCardInput = "80%"
    const [open, setOpen] = React.useState(false);
    return <PageContainer heading={<IntlMessages id={heading} />} className={styles.container}>
        <div className={styles.container_headerPage}>
            <ButtonGoBack />
        </div>
        <Box className={classes.root}>
            <Paper className={classes.paper}>
                <div className={styles.contentArea}>
                    <div className={styles.title}>
                        ẢNH SẢN PHẨM
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
                            <CardInput  title="Đường dẫn ảnh sản phẩm" width={widthCardInput}>
                                <Form.Item name="photoURL" rules={[{required: true,message: 'Đường dẫn ảnh sản phẩm không được trống!'}]}>
                                    <Input type="text" />
                                </Form.Item>
                            </CardInput>
                            <CardInput  title="Ảnh sản phẩm" width={widthCardInput}>
                                <Image src={data.photoURL}></Image>
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