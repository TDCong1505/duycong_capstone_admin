import React from 'react';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { Backdrop, Box, CircularProgress, Paper } from '@material-ui/core';
import {} from '@material-ui/core';
import { Form, Input, Select, DatePicker, Row, message } from 'antd';
import { useParams } from 'react-router';
import { CONFIGURATION } from 'Configuration';
import { Link } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useStyles } from 'Configuration/function';
import styles from './FormInputLayout.module.scss';
import { rootPath } from 'helpers/buildUrl';
import { useSelector } from 'react-redux';
import ButtonGoBack from 'routes/Pages/components/Button/ButtonGoBack';
import ButtonSubmit from 'routes/Pages/components/Button/ButtonSubmit';
import ButtonReset from 'routes/Pages/components/Button/ButtonReset';
import Required from 'routes/Pages/components/Element/Required';
import CV from 'routes/Pages/components/CV';
import CardInput from '../CardInput/CardInput';
import ModalPopup from 'routes/Pages/components/Element/ModalPopup/ModalPopup';
import Map from 'routes/Pages/components/Element/Map/Map';
import * as Yup from 'yup'
import { DeleteTwoTone } from '@ant-design/icons';
import UserService from 'services/auth/UserService';
import { handleError } from '@jumbo/utils/commonHelper';
import { matches } from 'lodash';

const { Option } = Select;
const phoneRegExp = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/
let schema = Yup.object().shape({
  email: Yup.string().email("Email không đúng định dạng"),
  phoneNumber: Yup.string()
    .required('Số điện thoại là bắt buộc')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
    .min(10, 'Số điện thoại không hợp lệ')
    .max(11, 'Số điện thoại không hợp lệ'),
  password: Yup.string()
    .min(8, 'Mật khẩu quá ngắn')
    .max(50, 'Mật khẩu quá dài'),
  // .required('Mật khẩu là bắt buộc'),
  passwordConfirm: Yup.string()
    // .required()
})
const yupSync = {
  async validator({ field }, value) {
    await schema.validateSyncAt(field, { [field]: value });
  },
};
export default function FormInputLayout({ statusUser, form, heading, breadcrumbs, onFinish, address, dataUser }) {
  const { code } = useParams();
  const onReset = () => {
    form.resetFields();
  };
  var disable = false;
  if (statusUser === 1) {
    disable = true;
  }
  if (statusUser === 0) {
    disable = false;
  }

  const classes = useStyles()
  const [addressEnterprise, setAddressEnterprise] = React.useState([]);
  const [isAddAddressModal, setIsAddAddressModal] = React.useState(false);
  const [rulesPhone, setRulesPhone] = React.useState("")
  const key = 'updatable';
  const handleChangePassword = (event) => {
    console.log("value", event);
  }
  const handleChangePhone = (e) => {
    if (e.target.value) {
      setRulesPhone([yupSync])
    }
    if (!e.target.value) {
      setRulesPhone("")
    }
  }
  React.useEffect(() => {
    setAddressEnterprise(address)
  }, [address])
  const handlePostAddress = async data => {
    try {
      await UserService.updateUserAdress({
        userId: dataUser.id,
        longitude: data.longitude,
        latitude: data.latitude,
        address: data.address,
        provinceId: data.provinceId,
        districtId: data.districtId,
        communeId: data.communeId,
      })
      message.loading({ content: "Loading...", key });
      setTimeout(() => {
        message.success({ content: "Thêm địa chỉ mới thành công", key, duration: 2 });
      }, 500);
      form.setFieldsValue({ address: [...addressEnterprise, data] });
      setAddressEnterprise([...addressEnterprise, data]);
    } catch (error) {
      handleError(error)
    }
  };
  const renderAddressEnterprise = addressEnterprise.map((address, index) => (
    <div key={index} className={styles.main_address_item}>
      <span>
        {index + 1}. {address.address}
      </span>
      <DeleteTwoTone
        onClick={async () => {
          try {
            await UserService.deleteUserAdress(address.userAddressId)
            message.loading({ content: "Loading...", key });
            setTimeout(() => {
              message.success({ content: "Xoá địa chỉ thành công", key, duration: 2 });
            }, 500);
            form.setFieldsValue({ address: addressEnterprise.filter(item => item.address !== address.address) });
            setAddressEnterprise(addressEnterprise.filter(item => item.address !== address.address));
          } catch (error) {
            handleError(error)
          }
        }}
        twoToneColor="red"
      />
    </div>
  ));
  const widthCardInput = "23%"
  return (
    <PageContainer heading={<IntlMessages id={heading} />} breadcrumbs={breadcrumbs} className={styles.container}>
      <div className={styles.container_headerPage}>
        <ButtonGoBack />
      </div>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <div className={styles.contentArea}>
            <div className={styles.title}>
              THÔNG TIN TÀI KHOẢN
            </div>
            <Form
              // name="basic"
              form={form}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  form.submit();
                }
              }}
              onFinish={onFinish}
              autoComplete="off">
              <Row justify='space-between'>
                <CardInput title="Số điện thoại" width={widthCardInput} required>
                  <Form.Item name="phoneNumber" rules={rulesPhone}>
                    <Input onChange={handleChangePhone} type="number" disabled />
                  </Form.Item>
                </CardInput>
                <CardInput title="Mật khẩu đăng nhập" width={widthCardInput}>
                  <Form.Item name="password" rules={[yupSync]}>
                    <Input.Password onChange={handleChangePassword} autoComplete="new-password" />
                  </Form.Item>
                </CardInput>
                <CardInput title="Nhập lại mật khẩu" width={widthCardInput}>
                  <Form.Item name="passwordConfirm" dependencies={['password']} hasFeedback rules={[
                    yupSync,
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('hai mật khẩu đã nhập không khớp'));
                      },
                    }),
                  ]}>
                    <Input.Password />
                  </Form.Item>
                </CardInput>
                <CardInput width={widthCardInput} left="0" required></CardInput>
              </Row>
              <Row justify='space-between'>
                <CardInput title="Họ và tên" width={widthCardInput}>
                  <Form.Item name="name" rules={[{ required: true, message: 'Tên tài khoản không được để trống' }]}>
                    <Input disabled={disable} />
                  </Form.Item>
                </CardInput>
                <CardInput title="Ngày sinh" width={widthCardInput}>
                  <Form.Item name="birthday" rules={[{ required: true, message: 'Ngày sinh không được để trống' }]}>
                    <DatePicker placeholder="dd-mm-yyyy" format="DD-MM-YYYY" disabled={disable} />
                  </Form.Item>
                </CardInput>
                <CardInput title="Giới tính" width={widthCardInput}>
                  <Form.Item name="gender" rules={[{ required: true, message: 'Giới tính không được để trống' }]}>
                    <Select disabled={disable}>
                      {CONFIGURATION.gender.map(item => (
                        <Option key={item.id} value={item.id}>
                          {item.title}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </CardInput>
                <CardInput title="Tài khoản Zeta" width={widthCardInput} left="0">
                  <Form.Item name="zetaAccount" rules={[{ required: true, message: 'Không được để trống' }]}>
                    <Select style={{ alignContent: 'start' }}>
                      {CONFIGURATION.zetaJob.map(item => (
                        <Option value={item.id} key={item.id}>
                          {item.title}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </CardInput>

              </Row>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>Địa chỉ <Required /></div>
              <Form.Item
                style={{ width: "100%" }}
                name="address"
              >
                {renderAddressEnterprise}
              </Form.Item>

              {addressEnterprise.length < 5 && (
                <button type="button" className={styles.address_btn} onClick={() => setIsAddAddressModal(true)}>
                  <span >Thêm địa chỉ</span>
                </button>
              )}
              <CardInput title="Lý do thay đổi" width="100%">
                <Form.Item name="reason" rules={[{ required: true, message: 'Lý do thay đổi không được để trống' }]}>
                  <Input />
                </Form.Item>
              </CardInput>
            </Form>
            <div style={{ textAlign: 'center' }}>
              <ButtonSubmit title="Lưu" width="160px" onClick={() => form.submit()} />
            </div>
            <ModalPopup
              visible={isAddAddressModal}
              width={800}
              title="Thêm địa chỉ"
              isConfirmBtn={false}
              isCancelBtn={false}
              closeBtn
              handleCancelModal={() => setIsAddAddressModal(false)}>
              <Map handlePostAddress={handlePostAddress} handleCloseModalMap={() => setIsAddAddressModal(false)} />
            </ModalPopup>
          </div>
        </Paper>
      </Box>
    </PageContainer>
  );
}
