import { handleError } from '@jumbo/utils/commonHelper'
import { message, Select } from 'antd'
import { prefix } from 'helpers/buildUrl'
import { filterSelectOption } from 'helpers/uitilities'
import React from 'react'
import { useSelector } from 'react-redux'
import UserService from 'services/auth/UserService'
import styles from "./AcademicLevel.module.scss"

export default function AcademicLevel({ profile, handleCallBack }) {
    const { FjobEducationLevel: educationList = [] } = useSelector(state => state.initData.initData || {})

    const handleChangeSelectAcademicId = async (val) => {
        try {
            await UserService.updateUser(profile.code, "", { academicId: Number(val) })
            message.success("Trình độ học vấn thêm mới thành công")
            handleCallBack()
        } catch (error) {
            handleError(error)
        }
    }
    return (
        <div className={`portfolio ${styles.academic}`}>
            <div className={styles.academic_header}>
                <div className={styles.academic_title}>
                    <div className={styles.title}>Trình độ học vấn
                    </div>
                    {profile.academicId && <img alt="" src={`${prefix}/images/icons/color/icon_check.svg`} />}

                </div>
            </div>

            <div className={styles.academic_content}>
                <Select
                    getPopupContainer={trigger => trigger.parentNode}
                    filterOption={filterSelectOption}
                    placeholder="Trình độ học vấn"
                    defaultValue={profile.academicId}
                    onChange={handleChangeSelectAcademicId}
                    className={styles.select}
                >
                    {educationList.map(education => {
                        if (education.id === 1) return <Select.Option key={education.id} value={education.id}>Chưa tốt nghiệp THPT</Select.Option>
                        return <Select.Option key={education.id} value={education.id}>{education.name}</Select.Option>
                    }
                    )}
                </Select>
            </div>
        </div>
    )
}
