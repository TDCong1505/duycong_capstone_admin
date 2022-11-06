import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { handleError } from '@jumbo/utils/commonHelper';
import { DatePicker, Input, message, Row, Select } from 'antd';
import { Form } from 'antd';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import UserService from 'services/auth/UserService';
import ButtonSubmit from 'routes/Pages/components/Button/ButtonSubmit';
import { useStyles } from 'Configuration/function';
import styles from './New.module.scss'
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import Required from 'routes/Pages/components/Element/Required';
import { CONFIGURATION } from 'Configuration';
import ButtonGoBack from 'routes/Pages/components/Button/ButtonGoBack';
import { Box, CircularProgress, Paper } from '@material-ui/core';
import CardInput from '../Component/CardInput/CardInput';
import { v4 as uuidv4 } from 'uuid';
import AuthService from 'services/auth/AuthService';
import { DeleteTwoTone } from '@ant-design/icons';
import ModalPopup from 'routes/Pages/components/Element/ModalPopup/ModalPopup';
import Map from 'routes/Pages/components/Element/Map/Map';
import Backdrop from '@material-ui/core/Backdrop';
import * as Yup from 'yup'
import { getTokenUser } from 'helpers/uitilities';

const { Option } = Select

const breadcrumbs = [
    { label: <IntlMessages id={'sidebar.dashBoard'} />, link: '/' },
    { label: <IntlMessages id={'sidebar.listUser'} />, isActive: true },
    { label: <IntlMessages id={'sidebar.createBlog'} />, isActive: true },
];
const phoneRegExp = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/
let schema = Yup.object().shape({
    email: Yup.string().email("Email không đúng định dạng"),
    phoneNumber: Yup.string()
        .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
        .min(10, 'Số điện thoại không hợp lệ')
        .max(11, 'Số điện thoại không hợp lệ')
        .required('Số điện thoại là bắt buộc'),
    password: Yup.string()
        .min(8, 'Mật khẩu quá ngắn')
        .max(50, 'Mật khẩu quá dài')
        .required('Mật khẩu là bắt buộc'),
})
const yupSync = {
    async validator({ field }, value) {
        await schema.validateSyncAt(field, { [field]: value });
    },
};
const heading = 'sidebar.createUser';

export default function New() {
    const [form] = Form.useForm();
    const classes = useStyles()
    const [addressEnterprise, setAddressEnterprise] = React.useState([]);
    const [isAddAddressModal, setIsAddAddressModal] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const key = 'updatable';
    const platform = process.env.REACT_APP_PLATFORM
    const token = getTokenUser();

    const onFinish = async values => {
        const deviceId = uuidv4();
        setOpen(true)

        try {
            const res = await AuthService.onRegister(platform, {
                phone: values.phoneNumber,
                deviceId: deviceId,
                password: values.password,
                passwordConfirm: values.passwordConfirm,
                otp: 111111,
                trustedDevice: true,
                lang: "vi",
                isEmployee: 1,
                isEmployer: 1,
                isPersonal: 0,
                token: token
            })
            const reason = "createUser"
            await UserService.updateUser(res.data.data.user.code, reason, {
                name: values.name,
                birthday: (new Date(values.birthday)).toISOString().substring(0, 10),
                gender: values.gender,
            })
            const address = values.address[0]
            await UserService.updateUserAdress({
                userId: res.data.data.user.id,
                longitude: address.longitude,
                latitude: address.latitude,
                address: address.address,
                provinceId: address.provinceId,
                districtId: address.districtId,
                communeId: address.communeId,
            })
            message.loading({ content: 'Loading...', key });
            setTimeout(() => {
                message.success({ content: 'Thêm thành công', key, duration: 2 });
                form.resetFields();
                setAddressEnterprise([])
            }, 500);
            setOpen(false)
        } catch (error) {
            handleError(error);
            setOpen(false)
        }
    };

    const handlePostAddress = async data => {
        form.setFieldsValue({ address: [...addressEnterprise, data] });
        setAddressEnterprise([...addressEnterprise, data]);
    };
    const renderAddressEnterprise = addressEnterprise.map((address, index) => (
        <div key={index} className={styles.main_address_item}>
            <span>
                {index + 1}. {address.address}
            </span>
            <DeleteTwoTone
                onClick={() => {
                    form.setFieldsValue({ address: addressEnterprise.filter(item => item.address !== address.address) });
                    setAddressEnterprise(addressEnterprise.filter(item => item.address !== address.address));
                }}
                twoToneColor="red"
            />
        </div>
    ));
    const widthCardInput = "31%"

    return <PageContainer heading={<IntlMessages id={heading} />} breadcrumbs={breadcrumbs} className={styles.container}>
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
                            <CardInput title="Số điện thoại" width={widthCardInput}>
                                <Form.Item name="phoneNumber" rules={[yupSync]}>
                                    <Input type="number" />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="Mật khẩu đăng nhập" width={widthCardInput}>
                                <Form.Item name="password" rules={[yupSync]}>
                                    <Input.Password autoComplete="new-password" />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="Nhập lại mật khẩu" width={widthCardInput}>
                                <Form.Item name="passwordConfirm" dependencies={['password']} hasFeedback rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng xác nhận lại mật khẩu',
                                    },
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
                            <CardInput title="Họ và tên" width={widthCardInput}>
                                <Form.Item name="name" rules={[{ required: true, message: 'Tên tài khoản không được để trống' }]}>
                                    <Input />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="Ngày sinh" width={widthCardInput}>
                                <Form.Item name="birthday" rules={[{ required: true, message: 'Ngày sinh không được để trống' }]}>
                                    <DatePicker placeholder="dd-mm-yyyy" format="DD-MM-YYYY" />
                                </Form.Item>
                            </CardInput>
                            <CardInput title="Giới tính" width={widthCardInput}>
                                <Form.Item name="gender" rules={[{ required: true, message: 'Giới tính không được để trống' }]}>
                                    <Select>
                                        {CONFIGURATION.gender.map(item => (
                                            <Option key={item.id} value={item.id}>
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
                            rules={[
                                {
                                    required: true,
                                    message: 'Cần ít nhất 1 địa chỉ làm việc!',
                                },
                            ]}
                        >
                            {renderAddressEnterprise}
                        </Form.Item>

                        {addressEnterprise.length < 1 && (
                            <button type="button" className={styles.address_btn} onClick={() => setIsAddAddressModal(true)}>
                                <span >Thêm địa chỉ</span>
                            </button>
                        )}
                    </Form>
                    <div style={{ textAlign: 'center' }}>
                        <ButtonSubmit title="Thêm" width="160px" onClick={() => form.submit()} />
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
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    </PageContainer>;
}