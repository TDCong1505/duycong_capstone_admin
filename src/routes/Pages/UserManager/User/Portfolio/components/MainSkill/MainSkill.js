import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { handleError } from '@jumbo/utils/commonHelper'
import { Form, Input, message, Select } from 'antd'
import { prefix } from 'helpers/buildUrl'
import { filterSelectOption } from 'helpers/uitilities'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ModalPopup from 'routes/Pages/components/Element/ModalPopup/ModalPopup'
import ModalRewardDiamond from 'routes/Pages/components/Element/ModalRewardDiamond/ModalRewardDiamond'
import UserService from 'services/auth/UserService'
import styles from "./MainSkill.module.scss"

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
}
export default function MainSkill({ profile, handleCallBack }) {

    const [form] = Form.useForm()

    const {
        FjobProfSkill: profSkillList = [],
        FjobExperience: experienceList = []
    } = useSelector(state => state.initData.initData || {})

    const [currentId, setCurrentId] = useState()


    const [isRemoveSkillModal, setIsRemoveSkillModal] = React.useState(false)
    const [isSkillModal, setIsSkillModal] = useState(false)


    const [rewardDiamond, setRewardDiamond] = useState({})
    const [isRewardDiamondModal, setIsRewardDiamondModal] = useState(false)


    const handleConfirmRemoveSkillModal = async () => {
        try {
            await UserService.deleteUserProSkillApi(currentId)
            handleCallBack()
            message.success('Xóa kỹ năng thành công!')
        } catch (error) {
            handleError(error)
        } finally {
            setIsRemoveSkillModal(false)
        }
    }

    const noData = (
        <div className={styles.no_data}>
            Đừng bỏ lỡ mục này, vì nó khiến bạn mất đi một cơ hội để chứng tỏ cho nhà tuyển dụng thấy
            được khả năng của mình!
        </div>
    )

    const onChangeProSkill = item => {
        form.setFieldsValue({ id: item.id })
        form.setFieldsValue({ profSkillId: item.profSkillId })
        form.setFieldsValue({ experience: item.experience })
        form.setFieldsValue({ note: item.note })
        setIsSkillModal(true)
    }

    const renderSkill = (profile.profSkills || []).map(item => (
        <div className={styles.skill_item} key={item.id} >
            <div className={styles.skill_content}>
                <div className={styles.skill_title}>
                    <div className={styles.title}>
                        {profSkillList.find(i => i.id === item.profSkillId)?.name}
                    </div>
                    {!!item.experience && <p className={styles.time}>
                        <div>Thời gian:</div>
                        <span>
                            {experienceList.find(i => i.id === item.experience)?.name}
                        </span>
                    </p>}
                    {item.note &&
                        <div className={styles.note}>
                            Ghi chú:&nbsp;
                            <span style={{ fontStyle: 'italic', color: 'grey' }}>&nbsp;{item.note}</span>
                        </div>
                    }
                </div>
                <div className={styles.skill_option}>
                    <EditOutlined
                        onClick={() => onChangeProSkill(item)}
                        className={styles.icon}
                    />
                    <DeleteOutlined
                        onClick={() => {
                            setCurrentId(item.id)
                            setIsRemoveSkillModal(true)
                        }}
                        className={styles.icon}
                    />
                </div>
            </div>
        </div>

    ))



    const handleConfirmSkillModal = async () => {
        try {
            const formData = { ...form.getFieldsValue(), userId: profile.id }
            if (!formData.id) {
                delete formData.id
            }
            const { data } = formData.id ? await UserService.patchExperienceApi(formData.id, formData) : await UserService.postExperienceApi(formData)
            if (data.profileRewarded) {
                setIsRewardDiamondModal(true)
                setRewardDiamond({ name: "hồ sơ cá nhân", diamond: data.profileRewarded })
            }

            handleCallBack()
            if (!formData.id) {
                message.success('Thêm mới kỹ năng thành công!')
            } else {
                message.success('Cập nhật kỹ năng thành công!')
            }
        } catch (error) {
            handleError(error)
        }
        setIsSkillModal(false)
    }

    return (
        <div className={styles.skill}>
            <div className={styles.skill_header}>
                <div className={styles.skill_title}>
                    <div className={styles.title}>Kỹ năng
                    </div>
                    {profile.profSkills.length > 0 && <img alt="" src={`${prefix}/images/icons/color/icon_check.svg`} />}
                </div>
                <div
                    className={styles.skill_edit}
                    onClick={() => {
                        setIsSkillModal(true)
                        form.resetFields()
                    }}
                >
                    <PlusOutlined style={{ marginRight: '.5rem' }} /> Thêm mới
                </div>
            </div>

            <div className={styles.content}>{profile.profSkills?.length === 0 ? noData : renderSkill}</div>


            <ModalPopup
                title="Xoá kỹ năng"
                visible={isRemoveSkillModal}
                handleConfirmModal={handleConfirmRemoveSkillModal}
                handleCancelModal={() => setIsRemoveSkillModal(false)}
                transition="move-up"
            >
                <div className='text-center'>Bạn chắc chắn muốn xoá kỹ năng đã chọn?</div>
            </ModalPopup>


            <ModalPopup
                visible={isSkillModal}
                handleCancelModal={() => setIsSkillModal(false)}
                title="Kỹ năng cá nhân"
                isCancelBtn={false}
                closeBtn
                positionAction='center'
                handleConfirmModal={() => {
                    form
                        .validateFields()
                        .then(handleConfirmSkillModal)
                }}
            >
                <Form
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            form.submit();
                        }
                    }}
                    {...formItemLayout}
                    form={form}
                    initialValues={{}}
                    scrollToFirstError
                >
                    <Form.Item name="id" hidden />
                    <span className="fieldLabel">
                        Kỹ năng cá nhân <span className="field-required">*</span>
                    </span>
                    <Form.Item
                        name="profSkillId"
                        rules={[
                            {
                                required: true,
                                message: 'Kỹ năng không được để trống!',
                            },
                        ]}
                    >
                        <Select
                            getPopupContainer={trigger => trigger.parentNode}
                            size="large"
                            allowClear
                            showSearch
                            optionFilterProp="children"
                            filterOption={filterSelectOption}
                            placeholder="Kỹ năng cá nhân"
                        >
                            {profSkillList.map(item => (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <span className="fieldLabel">Ghi chú</span>
                    <Form.Item
                        name="note"
                        initialValue=""
                        rules={[
                            {
                                max: 500,
                                message: 'Tối đa 500 kí tự!',
                            },
                        ]}
                    >
                        <Input style={{ borderRadius: '6px', height: '40px' }} placeholder="Ghi chú" />
                    </Form.Item>
                </Form>
            </ModalPopup>

            <ModalRewardDiamond
                isRewardDiamondModal={isRewardDiamondModal}
                setIsRewardDiamondModal={setIsRewardDiamondModal}
                rewardDiamond={rewardDiamond}
            />
        </div>
    )
}
