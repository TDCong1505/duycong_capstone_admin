import { configConstant } from '@jumbo/constants/configConstant'
import { handleError } from '@jumbo/utils/commonHelper'
import { message, Upload } from 'antd'
import Axios from 'axios'
import { CONFIGURATION } from 'Configuration'
import { getTokenUser } from 'helpers/uitilities'
import React, { useState } from 'react'
import UserService from 'services/auth/UserService'
import styles from "./CV.module.scss"

export default function CV({ profile, handleCallBack }) {

    const [isCv, setCv] = useState(true)

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'application/pdf';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ có thể upload file pdf!');
        }
        const isLt2M = file.size / 1024 / 1024 / 1024 / 1024 / 1024 < 5;
        if (!isLt2M) {
            message.error('Ảnh phải nhỏ hơn 5MB!');
        }
        return isJpgOrPng && isLt2M;
    }


    const props = {
        name: 'file',
        multiple: false,
        accept: ".pdf",
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        //     'Authorization': `Bearer ${getTokenUser()}`,
        // },
        onRemove: file => {
            // getAvatar('')
        },
        customRequest: async (options) => {
            const fmData = new FormData()
            fmData.append('file', options.file)
            const config = {
                'headers': {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${getTokenUser()}`,
                },
            }
            try {
                const result = await Axios.post(options.action, fmData, config)
                options.onSuccess(null, options.file)
                isCv ?
                    await UserService.updateUser(profile.code, "", {
                        cvLink: result.data.linkUrl
                    }) : await UserService.updateUser(profile.code, "", {
                        otherDocument: result.data.linkUrl
                    })

                message.success(`Tải ${isCv ? "CV" : "tài liệu"} thành công!`)
                // dispatch(getProfileRequest({ userCode: profile.code }))
                handleCallBack()
            } catch (error) {
                options.onError()
                message.error('Có lỗi xảy ra trong quá trình tải ảnh lên')
            }
        },
    }

    const handleDomainPostImg = () => {
        if (process.env.REACT_APP_WEB_ENV === CONFIGURATION.environment.development)
            return configConstant.domainStagingEnv
        return process.env.REACT_APP_API_URL
    }

    const removeLinkCV = async (e) => {
        e.preventDefault()
        try {
            // await patchUpdateUserApi(profile.code, { cvLink: "" })
            await UserService.updateUser(profile.code, "", {
                cvLink: ""
            })
            message.success("Xoá CV thành công!")
            handleCallBack()
            // dispatch(getProfileRequest({ userCode: profile.code }))
        } catch (error) {
            handleError(error)
        }
    }

    const removeLinkDocument = async (e) => {
        e.preventDefault()
        try {
            // await patchUpdateUserApi(profile.code, { otherDocument: "" })
            await UserService.updateUser(profile.code, "", {
                otherDocument: ""
            })
            message.success("Xoá tài liệu thành công!")
            handleCallBack()
            // dispatch(getProfileRequest({ userCode: profile.code }))
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <div className={styles.wraper}>
            <div className={styles.cv}>
                <div className={styles.cv_header}>
                    <div className={styles.cv_title}>
                        <div className={styles.title}>CV
                        </div>
                        {profile.cvLink && <img alt="" src="/images/icons/color/icon_check.svg" />}
                    </div>


                    {profile.cvLink ? <div className={styles.cv_action}>
                        <div className={styles.cv_view} onClick={() => window.open(profile.cvLink)}>

                            <img alt="" src="/images/icons/1.svg" />
                            Xem
                        </div>

                        <div className={styles.cv_edit} onClick={() => setCv(true)}>

                            <Upload
                                {...props}
                                action={`${handleDomainPostImg()}/upload/v1.0/upload`}
                                multiple={false}
                                beforeUpload={beforeUpload}
                                className={styles.avatar}

                            >
                                <img alt="" src="/images/icons/3.svg" />
                                <span>
                                    Chỉnh sửa
                                </span>
                            </Upload>
                        </div>

                        <div className={styles.cv_remove} onClick={removeLinkCV}>
                            <img alt="" src="/images/icons/4.svg" />
                            Xóa
                        </div>
                    </div>
                        :
                        <div className={styles.cv_upload} onClick={() => setCv(true)}>
                            <Upload
                                {...props}
                                action={`${handleDomainPostImg()}/upload/v1.0/upload`}
                                multiple={false}
                                beforeUpload={beforeUpload}
                                className={styles.avatar}
                            >
                                <img alt="" src="/images/icons/5.svg" />
                                Tải lên CV
                            </Upload>
                        </div>

                    }
                </div>
                <div className={styles.cv_main}>
                    {/* <div className={styles.cv_text}> */}
                    {profile.cvLink
                        ?
                        <div className={styles.cv_link} >
                            <img src="/images/icons/cv.png" alt="" />
                        </div>
                        : <div className={styles.cv_empty}>
                            <div className={styles.title}>
                                Chưa có CV</div>
                            <div className={styles.subtitle}>
                                (Định dạng file .pdf có dung lượng <span>&#8804;</span> 5MB)
                            </div>
                        </div>
                    }
                </div>
                {/* </div> */}
            </div>

            <div className={styles.cv}>
                <div className={styles.cv_header}>
                    <div className={styles.cv_title}>
                        <div className={styles.title}>Tài liệu khác
                        </div>
                        {profile.otherDocument && <img alt="" src="/images/icons/color/icon_check.svg" />}
                    </div>


                    {profile.otherDocument ? <div className={styles.cv_action}>
                        <div className={styles.cv_view} onClick={() => window.open(profile.otherDocument)}>

                            <img alt="" src="/images/icons/1.svg" />
                            Xem
                        </div>

                        <div className={styles.cv_edit} onClick={() => setCv(false)}>

                            <Upload
                                {...props}
                                action={`${handleDomainPostImg()}/upload/v1.0/upload`}
                                multiple={false}
                                beforeUpload={beforeUpload}
                                className={styles.avatar}
                            >
                                <img alt="" src="/images/icons/3.svg" />
                                <span>
                                    Chỉnh sửa
                                </span>
                            </Upload>
                        </div>

                        <div className={styles.cv_remove} onClick={removeLinkDocument}>
                            <img alt="" src="/images/icons/4.svg" />
                            Xóa
                        </div>
                    </div>
                        :
                        <div className={styles.cv_upload} onClick={() => setCv(false)}>
                            <Upload
                                {...props}
                                action={`${handleDomainPostImg()}/upload/v1.0/upload`}
                                multiple={false}
                                beforeUpload={beforeUpload}
                                className={styles.avatar}
                            >
                                <img alt="" src="/images/icons/5.svg" />
                                Tải lên
                            </Upload>
                        </div>

                    }
                </div>
                <div className={styles.cv_main}>
                    {/* <div className={styles.cv_text}> */}
                    {profile.otherDocument
                        ?
                        <div className={styles.cv_link} >
                            <img src="/images/icons/other-document.png" alt="" />
                        </div>
                        : <div className={styles.cv_empty}>
                            <div className={styles.title}>
                                Chưa có </div>
                            <div className={styles.subtitle}>
                                (Định dạng file .pdf có dung lượng <span>&#8804;</span> 5MB)
                            </div>
                        </div>
                    }
                </div>
                {/* </div> */}
            </div>
        </div>
    )
}
