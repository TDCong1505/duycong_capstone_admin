import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { handleError } from '@jumbo/utils/commonHelper';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { Box } from '@material-ui/core';
import { Empty, message } from 'antd';
import { convertPrice } from 'Configuration';
import { useStyles } from 'Configuration/function';
import jwtDecode from 'jwt-decode';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import ButtonGoBack from 'routes/Pages/components/Button/ButtonGoBack';
import UserService from 'services/auth/UserService';
import styles from "./Portfolio.module.scss"
import { calcTranslateX, calcWidthTranslateX } from 'helpers/uitilities';
import useWindowDimensions from 'hooks/useWindowDimensions';
import OccupationInterest from './components/OccupationInterest/OccupationInterest';
import ExpectSalary from './components/ExpectSalary/ExpectSalary';
import WorkExperience from './components/WorkExperience/WorkExperience';
import AcademicLevel from './components/AcademicLevel/AcademicLevel';
import Academic from './components/Academic/Academic';
import MainSkill from './components/MainSkill/MainSkill';
import CV from './components/CV/CV';

const breadcrumbs = [
    { label: <IntlMessages id={'sidebar.dashBoard'} />, link: '/' },
    { label: <IntlMessages id={'sidebar.listUser'} />, isActive: true },
    { label: <IntlMessages id={'sidebar.editPortfolio'} />, isActive: true },
];
const heading = 'sidebar.editPortfolio';




export default function Portfolio() {
    const { code } = useParams();
    const [item, setItem] = useState([]);
    const tokenUser = localStorage.getItem('token');
    const decoded = jwtDecode(tokenUser) || {};
    const [tabInfo, setTabInfo] = useState(0)
    const SCREEN = useWindowDimensions();
    const [flagExp, setFlagExp] = useState(false)
    let headers = {
        'Content-Type': 'application/json',
    };
    headers = {
        ...headers,
        'x-fjob-user-id': decoded.uid,
        'x-fjob-role': 'user',
        'x-fjob-user-code': decoded.userCode,
    };
    const handleNextStep = () => {
        const { academicId, profSkills, expectSalaryFrom, expectSalaryTo, favCats, hasExperience } = item

        if (!favCats?.length) return message.warning("B???n ph???i th??m ng??nh ngh??? quan t??m l??m vi???c ????? ti???p t???c ???ng tuy???n!")
        if (!(expectSalaryFrom && expectSalaryTo)) return message.warning("B???n ph???i th??m m???c l????ng mong mu???n ????? ti???p t???c ???ng tuy???n!")
        if ((flagExp && hasExperience === 0) || typeof hasExperience !== 'number')
            return message.warning("B???n ph???i th??m kinh nghi???m l??m vi???c ????? ti???p t???c ???ng tuy???n!")

        if (!academicId) return message.warning("B???n ph???i th??m tr??nh ????? h???c v???n ????? ti???p t???c ???ng tuy???n!")
        if (!profSkills?.length) return message.warning("B???n ph???i th??m k??? n??ng ????? ti???p t???c ???ng tuy???n!")

        // const slug = decodeURIComponent(router.query.next).split("/") || []


        // localStorage.setItem(storageConstant.localStorage.flagAutoApplyJob, slug[slug.length - 1])

        // if (favCats?.length && expectSalaryFrom && expectSalaryTo && academicId
        //     && typeof hasExperience === 'number' && profSkills?.length)
        //     router.push(decodeURIComponent(router.query.next as string))
    }
    const handleCallBack = () => {
        loadDetail()
    }
    const loadDetail = async () => {
        try {
            const res = await UserService.userDetail(code);
            setItem(res.data.data);


        } catch (error) {
            handleError(error);
        }
    };
    const classes = useStyles();
    const renderRole = () => {
        const arr = [];
        if (item.isEmployee === 1) arr.push('???ng vi??n');
        if (item.isEmployer === 1) arr.push('Nh?? tuy???n d???ng');
        return arr.join(' & ');
    };
    useEffect(() => {
        loadDetail();
    }, []);
    const PortfolioCpn = ({ setFlagExp }) =>
        <div>
            <OccupationInterest profile={item} handleCallBack={handleCallBack} />
            <ExpectSalary profile={item} handleCallBack={handleCallBack} />
            <WorkExperience setFlagExp={setFlagExp} profile={item} handleCallBack={handleCallBack} />
            <AcademicLevel profile={item} handleCallBack={handleCallBack} />
            <Academic profile={item} handleCallBack={handleCallBack} />
            <MainSkill profile={item} handleCallBack={handleCallBack} />
        </div>

    const CVCpn = () => <div>
        <CV profile={item} handleCallBack={handleCallBack} />
    </div>
    return (
        <PageContainer heading={<IntlMessages id={heading} />} breadcrumbs={breadcrumbs} className={styles.container}>
            <div className={styles.container_headerPage}>
                <ButtonGoBack />

            </div>
            <Box className={classes.root}>
                {!!Object.keys(item).length ? (
                    <div className={styles.portfolio}>
                        <div className={styles.infoUser}>
                            <div className={styles.infoUser_title}>TH??NG TIN USER</div>
                            <div className={styles.infoUser_content}>
                                <div>
                                    <img className={styles.infoUser_content_avatar} src={item.avatar} alt="" />
                                </div>
                                <div className={styles.infoUser_content_contact}>
                                    <div className={styles.infoUser_content_contact_item}>
                                        H??? t??n: &nbsp; <div className={styles.infoUser_content_contact_item_value}>{item.name}</div>
                                    </div>
                                    <div className={styles.infoUser_content_contact_item}>
                                        ID: &nbsp; <div className={styles.infoUser_content_contact_item_value}>{item.id}</div>
                                    </div>
                                </div>
                                <div className={styles.infoUser_content_contact}>
                                    <div className={styles.infoUser_content_contact_item}>
                                        Vai tr??: &nbsp;
                                        <div className={styles.infoUser_content_contact_item_value}>
                                            {renderRole() && <div> {renderRole()}</div>}
                                        </div>
                                    </div>
                                    <div className={styles.infoUser_content_contact_item}>
                                        Kim c????ng: &nbsp; <div className={styles.infoUser_content_contact_item_value}>{convertPrice(item.walletValue)}</div>
                                    </div>
                                </div>
                                <div className={styles.infoUser_content_contact}>
                                    <div className={styles.infoUser_content_contact_item}>
                                        S??? ??i???n tho???i: &nbsp;
                                        {item.phoneNumber && <div className={styles.infoUser_content_contact_item_value}>+{item.phoneNumber}</div>}
                                    </div>
                                    <div className={styles.infoUser_content_contact_item}>
                                        Email: &nbsp; <div className={styles.infoUser_content_contact_item_value}>{item.email}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.portfolio_tab}>
                            <div className={styles.portfolio_overlay}
                                style={{
                                    transform: `translateX(${calcTranslateX(SCREEN.width, tabInfo)}px)`,
                                    width: `${calcWidthTranslateX(SCREEN.width) - 10}px`
                                }}
                            />
                            <div className={styles.tab_tab} onClick={() => { setTabInfo(0) }}>
                                <span>
                                    H??? s?? c?? nh??n
                                </span>
                            </div>
                            <div className={styles.tab_tab} onClick={() => { setTabInfo(1) }}>
                                <span>
                                    CV
                                </span>
                            </div>
                        </div>
                        {!tabInfo ? <PortfolioCpn setFlagExp={setFlagExp} /> : <CVCpn />}
                    </div>
                ) : (
                    <Empty />
                )}
            </Box>
        </PageContainer>
    );
}
