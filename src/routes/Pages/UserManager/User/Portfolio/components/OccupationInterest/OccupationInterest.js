import { CloseCircleFilled, EditOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from "./OccupationInterest.module.scss"
import { handleError } from '@jumbo/utils/commonHelper'
import ModalPopup from 'routes/Pages/components/Element/ModalPopup/ModalPopup'
import { Cascader, message } from 'antd'
import { createCategories } from 'helpers/uitilities'
import ModalRewardDiamond from 'routes/Pages/components/Element/ModalRewardDiamond/ModalRewardDiamond'
import UserService from 'services/auth/UserService'
import { prefix } from 'helpers/buildUrl'

export default function OccupationInterest({ profile, handleCallBack }) {
    const [isOccupationInterestModal, setIsOccupationInterestModal] = useState(false)
    const { FjobCategory: categoryList = [] } = useSelector(state => state.initData.initData || {})
    const [cascaderValues, setCascaderValues] = useState(
        (profile.favCats || []).map(i => [categoryList.find(item => item.id === i)?.parentId || 0, i]))
    const [isRewardDiamondModal, setIsRewardDiamondModal] = useState(false)
    const [rewardDiamond, setRewardDiamond] = useState({})
    const formatFavCat = () => {
        const obj = []
        profile.favCats.forEach(favCat => { obj.push(categoryList.find(cate => cate.id === favCat)) })
        return obj
    }
    const removeItemOccupationInterest = async (id) => {
        const fav = cascaderValues.map(item => item[1]).filter(item => item !== id)
        try {
            await UserService.postFavCatsApi({ catIds: fav, userId: profile.id })
            setCascaderValues(fav.map(i => [categoryList.find(item => item.id === i)?.parentId || 0, i]))
            message.success("Xoá ngành nghề thành công")
            handleCallBack()
        } catch (error) {
            handleError(error)
            message.error("Xoá ngành nghề thất bại")
        }
    }
    const renderItem = (formatFavCat() || []).map((item, idx) => (
        <div className={styles.interest_item} key={idx}>
            <div className={styles.cancel} onClick={() => {
                removeItemOccupationInterest(item.id)
            }}>
                <CloseCircleFilled style={{ color: "#B5B5B5", fontSize: "20px" }} />
            </div>
            <img alt="" src={categoryList.find(cate => cate.id === item.parentId)?.avatar || `${prefix}/images/icons/default-cate.svg`} />
            <h4 className={styles.name}>{item.name}</h4>
        </div>
    ))
    const onConfirmOccupationInterestModal = async () => {
        const fav = cascaderValues.map(i => i[1])

        try {
            const { data } = await UserService.postFavCatsApi({ catIds: fav, userId: profile.id })

            if (data.profileRewarded) {
                setIsRewardDiamondModal(true)
                setRewardDiamond({ name: "hồ sơ cá nhân", diamond: data.profileRewarded })
            }
            message.success("Thêm ngành nghề thành công")
            handleCallBack()

        } catch (err) {
            if ((err).response.data.errorCode === 9001) {
                message.error((err).response.data.message)
            }
            message.error("Thêm ngành nghề thất bại")
        }
        setIsOccupationInterestModal(false)
    }
    const onChangeOccupationInterestModal = value => {
        if ((value.length > 0 && value[value.length - 1].length === 2) || value.length === 0) {
            setCascaderValues(value)
        }

        if (value.length > 5) {
            value.pop()
            message.warning('Chỉ được chọn tối đa 5 ngành nghề quan tâm!')
        }
    }
    return (
        <div className={styles.interest}>
            <div className={styles.interest_header}>
                <div className={styles.interest_title}>
                    <div className={styles.title}>Ngành nghề quan tâm
                    </div>
                    {
                        profile.favCats.length > 0 && <img alt="" src={`${prefix}/images/icons/color/icon_check.svg`} />
                    }

                </div>
                <div
                    className={styles.interest_edit}
                    onClick={() => {
                        setIsOccupationInterestModal(true)
                        setCascaderValues((profile.favCats || []).map(i => [categoryList.find(item => item.id === i)?.parentId || 0, i]))
                    }}
                >
                    <EditOutlined style={{ marginRight: '.25rem' }} /> Chỉnh sửa
                </div>
            </div>

            <div className={styles.interest_content}>
                {profile.favCats?.length === 0 ?
                    <div className={styles.interest_empty}>Giúp bạn tiến gần hơn với công việc mơ ước, giúp nhà tuyển dụng tìm kiểm công việc phù hợp
                        với sở ngành nghề bạn quan tâm của bạn.</div> :
                    <div>
                        <div className={styles.interest_desc}>Bạn có thể thêm tối đa 5 ngành nghề mà bạn quan tâm</div>
                        <div className={styles.interest_list}>
                            {renderItem}
                        </div>
                    </div>
                }
            </div>


            <ModalPopup
                visible={isOccupationInterestModal}
                handleCancelModal={() => setIsOccupationInterestModal(false)}
                handleConfirmModal={onConfirmOccupationInterestModal}
                title="Chọn ngành nghề quan tâm"
            >
                <Cascader
                    size="large"
                    options={createCategories(categoryList)}
                    onChange={onChangeOccupationInterestModal}
                    multiple
                    placeholder="Chọn tối đa 5 ngành nghề quan tâm"
                    value={cascaderValues}
                    style={{ width: '100%' }}
                />
            </ModalPopup>

            <ModalRewardDiamond
                isRewardDiamondModal={isRewardDiamondModal}
                setIsRewardDiamondModal={setIsRewardDiamondModal}
                rewardDiamond={rewardDiamond}
            />
        </div>
    )
}
