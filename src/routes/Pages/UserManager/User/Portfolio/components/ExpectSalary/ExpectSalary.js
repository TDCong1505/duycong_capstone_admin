import { EditOutlined } from '@ant-design/icons'
import { Form, InputNumber, message, Select } from 'antd'
import { prefix } from 'helpers/buildUrl'
import { formatNumber } from 'helpers/uitilities'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ModalPopup from 'routes/Pages/components/Element/ModalPopup/ModalPopup'
import UserService from 'services/auth/UserService'
import styles from "./ExpectSalary.module.scss"



export default function ExpectSalary({ profile, handleCallBack }) {
    const [isExpectSalaryModal, setIsExpectSalaryModal] = useState(false)
    const { WageUnit = [] } = useSelector(state => state.initData.initData || {})
    const [form] = Form.useForm();
    const handleConfirmExpectSalaryModal = async () => {
        form.submit()
        form
            .validateFields()
            .then(async () => {
                try {
                    await UserService.updateUser(profile.code, "", {
                        expectSalaryUnit: form.getFieldValue("unitSalary"),
                        expectSalaryFrom: form.getFieldValue("minSalary"),
                        expectSalaryTo: form.getFieldValue("maxSalary"),
                    })
                    handleCallBack()
                    message.success("Cập nhật mức lương thành công!")
                } catch (error) {
                    message.error('Cập nhật mức lương không thành công!')
                }
            })
            .catch(() => {
                message.warning('Mức lương không được để trống!')
            })
        setIsExpectSalaryModal(false)
    }
    const initialValues = {
        minSalary: profile.expectSalaryFrom,
        maxSalary: profile.expectSalaryTo,
        unitSalary: profile.expectSalaryUnit
    }
    return (
        <div className={`portfolio ${styles.salary}`}>
            <div className={styles.salary_header}>
                <div className={styles.salary_title}>
                    <div className={styles.title}>Mức lương mong muốn
                    </div>
                    {profile.expectSalaryFrom !== 0 && profile.expectSalaryTo !== 0 && <img alt="" src={`${prefix}/images/icons/color/icon_check.svg`} />}

                </div>
                <div
                    className={styles.salary_edit}
                    onClick={() => setIsExpectSalaryModal(true)}
                >
                    <EditOutlined style={{ marginRight: '.5rem' }} /> Chỉnh sửa
                </div>
            </div>
            <div className={styles.salary_content}>
                <span>
                    {formatNumber(profile.expectSalaryFrom)} - {formatNumber(profile.expectSalaryTo)}&nbsp;
                    VNĐ/{WageUnit.find(item => item.id === profile.expectSalaryUnit)?.name}
                </span>
            </div>

            {isExpectSalaryModal && <ModalPopup
                visible={isExpectSalaryModal}
                handleCancelModal={() => setIsExpectSalaryModal(false)}
                handleConfirmModal={handleConfirmExpectSalaryModal}
                title="Mức lương mong muốn"
                className="portfolio_salary"
            >
                <Form
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            form.submit();
                        }
                    }}
                    form={form}
                    className={styles.modal}
                    initialValues={initialValues}
                >
                    <div className={styles.modal_wrap}>
                        <div className={styles.salary_min}>
                            <div className={styles.title}>Từ</div>
                            <Form.Item name="minSalary" rules={[
                                {
                                    required: true,
                                    message: 'Mức lương không được để trống!',
                                },
                            ]}>
                                <InputNumber
                                    controls={false}
                                    min={0}
                                    formatter={(value) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                />
                            </Form.Item>
                        </div>
                        <div className={styles.salary_max}>
                            <div className={styles.title}>Đến</div>
                            <Form.Item name="maxSalary" rules={[
                                {
                                    required: true,
                                    message: 'Mức lương không được để trống!',
                                },
                            ]}>
                                <InputNumber
                                    controls={false}
                                    min={form.getFieldValue("minSalary")}
                                    formatter={(value) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                />
                            </Form.Item>
                        </div>
                        <Form.Item name="unitSalary" rules={[
                            {
                                required: true,
                                message: 'Mức lương không được để trống!',
                            },
                        ]}>
                            <Select placeholder="VNĐ / Tháng" >
                                {[...WageUnit].reverse().map(item => <Select.Option key={item.id} value={item.id}>
                                    VNĐ / {item.name}
                                </Select.Option>)}
                            </Select>
                        </Form.Item>

                    </div>
                </Form>
            </ModalPopup>}
        </div>
    )
}
