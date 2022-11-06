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
import { DatePicker, Input, Button, message, Row, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ProductPhotoService from 'services/auth/ProductPhotoService';
import ProductService from 'services/auth/ProductService';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.dashBoard'} />, link: '/' },
  { label: <IntlMessages id={'sidebar.listUser'} />, isActive: true },
  { label: <IntlMessages id={'sidebar.createBlog'} />, isActive: true },
];
const { Option } = Select;
const heading = 'Thêm ảnh sản phẩm mới';
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};

export default function New() {
  const [form] = Form.useForm();
  const classes = useStyles();
  const [code, setCode] = useState();
  const postPhoto = async (link) => {
    let res = await ProductPhotoService.createPhoto(code, {
      photoURL: link,
    });
    setTimeout(() => {
      message.success({ content: 'Thêm ảnh thành công', duration: 2 });
      form.resetFields();
    }, 500);
  }
  const onFinish = async values => {
    try {
      if (code) {
        const data = values.names;
        data.map(photo => {
          postPhoto(photo)
        });
      } else {
        message.warning('Chọn sản phẩm để thêm ảnh .');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [product, setProduct] = useState([]);
  const loadProduct = async () => {
    let res = await ProductService.getAllProduct();
    setProduct(res.data);
  };
  
  useEffect(() => {
    loadProduct();
  }, []);
  const widthCardInput = '40%';
  const [open, setOpen] = React.useState(false);
  return (
    <PageContainer heading={<IntlMessages id={heading} />} breadcrumbs={breadcrumbs} className={styles.container}>
      <div className={styles.container_headerPage}>
        <ButtonGoBack />
      </div>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <div className={styles.contentArea}>
            <div className={styles.title}>ẢNH SẢN PHẨM</div>
            <CardInput title="Sản phẩm" width={widthCardInput}>
              <Select style={{ width: '100%', marginBottom: '40px' }} onChange={values => setCode(values)}>
                {product.map(product => {
                  return (
                    <Option key={product.productCode} values={product.productCode}>
                      {product.productName}
                    </Option>
                  );
                })}
              </Select>
            </CardInput>
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
              <Form.List
                name="names"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 2) {
                        return Promise.reject(new Error('Phải thêm ít nhất 2 ảnh'));
                      }
                    },
                  },
                ]}>
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                        label={index === 0 ? 'Ảnh sản phẩm' : ''}
                        required={false}
                        key={field.key}>
                        <Form.Item
                          {...field}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: 'Hãy nhập đường dẫn ảnh.',
                            },
                          ]}
                          noStyle>
                          <Input
                            placeholder="Hãy điền đường dẫn ảnh sản phẩm vào đây . . ."
                            style={{
                              width: '60%',
                            }}
                          />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{
                          width: '60%',
                        }}
                        icon={<PlusOutlined />}>
                        Thêm ô nhập
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
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
