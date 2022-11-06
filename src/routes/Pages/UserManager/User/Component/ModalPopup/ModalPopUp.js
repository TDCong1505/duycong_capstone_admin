import React, { useEffect } from 'react'
import { Form, Input, message } from 'antd';
import ButtonSubmit from 'routes/Pages/components/Button/ButtonSubmit';
import Popup from 'reactjs-popup';
import styles from './ModalPopup.module.scss'
import ButtonReset from 'routes/Pages/components/Button/ButtonReset';
import UserService from 'services/auth/UserService';
import { handleError } from '@jumbo/utils/commonHelper';

export default function ModalPopUp({ title, color, loadDetail, status, clientId }) {
    const [form] = Form.useForm()

    const onFinish = async (value) => {
        console.log(value.note, "status", status)
        try {
            await UserService.actionEffectUser({
                note: value.note,
                clientId: clientId,
                status: status,
            });
            message.success(title, 'Thành công!');
            loadDetail();
        } catch (error) {
            handleError(error);
        }
    }
    useEffect(() => {
        form.setFieldsValue({
            note: ""
        })
    }, []);
    return (
        <div className={styles.container}><Popup modal trigger={<button style={{ color: color }} className={styles.buttonShow}>{title}</button>}>
            {close => (
                <div
                    style={{
                        width: '600px',
                        height: '100%',
                        backgroundColor: '#fff',
                        padding: '20px 16px',
                        borderRadius: '10px',
                        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    }}>
                    <div
                        style={{
                            marginTop: '6px',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            padding: '0 0 10px 0',
                            color: '#2a2e43',
                            textAlign: 'center',
                        }}>
                        Bạn có muốn "{title}" người dùng này
                    </div>

                    <Form
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                form.submit();
                            }
                        }}
                        form={form}
                        onFinish={onFinish}
                        autoComplete="off">
                        <Form.Item
                            // className={classes.root}
                            name="note"

                        // rules={[{ required: true, message: 'Ghi chú không được để trống' }]}
                        >
                            <Input placeholder="Nhập ghi chú" />
                        </Form.Item>
                    </Form>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}>
                        <ButtonReset
                            title="Hủy"
                            width="100px"
                            onClick={() => {
                                close();
                            }}
                        />
                        <ButtonSubmit title="Lưu" width="100px" onClick={() => form.submit()} />
                    </div>
                </div>
            )}
        </Popup></div>
    )
}
