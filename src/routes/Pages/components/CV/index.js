import { CloseCircleFilled, UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import axios from 'axios';
// import { CONFIGURATION } from 'Configuration';
import { prefix } from 'helpers/buildUrl';
import router from 'next/router';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ApiService from 'services/ConfigService/APIService';
// import LinkTo from 'src/components/elements/LinkTo';
// import { configConstant } from 'src/constants/configConstant';
// import { useAppDispatch, useAppSelector } from 'src/redux';
import { getProfileRequest } from 'redux/actions/getProfileRequest';
import { getTokenUser } from 'helpers/uitilities';
import { handleError } from '@jumbo/utils/commonHelper';
import styles from "./CV.module.scss"
import { useParams } from 'react-router';
import UserService from 'services/auth/UserService';



const CV = () => {
    const { code } = useParams();
    const dispatch = useDispatch()
    const [isCv, setCv] = useState(true)
    const [user, setData] = React.useState([]);
    const loadDetail = async () => {
        try {
            let res = await UserService.userDetail(code);
            const data = res.data.data;
            setData(data);
        } catch (error) {
            handleError(error);
        }
    }
    React.useEffect(() => {
        loadDetail()
    }, [])
    const patchUpdateUserApi = async (userCode, data) => {
        await UserService.updateUser(userCode, "", data)
        loadDetail()
    }
    console.log("user", user);
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
        //   'Content-Type': 'multipart/form-data',
        //   'Authorization': `Bearer ${getTokenUser()}`,
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
                const result = await axios.post(options.action, fmData, config)
                options.onSuccess(null, options.file)
                isCv ?
                    await patchUpdateUserApi(user.code, {
                        cvLink: result.data.linkUrl
                    }) : await patchUpdateUserApi(user.code, {
                        otherDocument: result.data.linkUrl
                    })

                message.success(`Tải ${isCv ? "CV" : "tài liệu"} thành công!`)
                dispatch(getProfileRequest({ userCode: user.code }))
            } catch (error) {
                options.onError()
                message.error('Có lỗi xảy ra trong quá trình tải ảnh lên')
            }
        },
    }

    const handleDomainPostImg = () => {
        return process.env.REACT_APP_UPLOAD_URL
    }

    const removeLinkCV = async (e) => {
        e.preventDefault()
        try {
            await patchUpdateUserApi(user.code, { cvLink: "" })
            message.success("Xoá CV thành công!")
            dispatch(getProfileRequest({ userCode: user.code }))
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
                        {user.cvLink && <img alt="" src={`${prefix}/icons/icon_check.svg`} />}
                    </div>


                    {user.cvLink ? <div className={styles.cv_action}>
                        <div className={styles.cv_view} onClick={() => window.open(user.cvLink)}>

                            <img alt="" src={`${prefix}/images/icons/1.svg`} />
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
                                <img alt="" src={`${prefix}/images/icons/3.svg`} />
                                <span>
                                    Chỉnh sửa
                                </span>
                            </Upload>
                        </div>

                        <div className={styles.cv_remove} onClick={removeLinkCV}>
                            <img alt="" src={`${prefix}/images/icons//icon/4.svg`} />
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
                                <img alt="" src={`${prefix}/images/icons/5.svg`} />
                                Tải lên CV
                            </Upload>
                        </div>

                    }
                </div>
                <div className={styles.cv_main}>
                    {/* <div className={styles.cv_text}> */}
                    {user.cvLink
                        ?
                        <div className={styles.cv_link} >
                            <img src={`${prefix}/images/icons/cv.png`} alt="" />
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


        </div>

    )
}

export default CV