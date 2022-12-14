import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import React, { useState } from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { Box } from '@material-ui/core';
import { useParams } from 'react-router';
import { handleError } from '@jumbo/utils/commonHelper';
import { convertGender, convertPrice } from 'Configuration';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import UserService from '../../../../../services/auth/UserService';
import EducationCard from './components/EducationCard';
import CompanyCard from './components/CompanyCard';
import ServiceCard from './components/ServiceCard';
import { useStyles } from 'Configuration/function';
import styles from './UserDetail.module.scss';
import ProfSkillCard from './components/ProfSkillCard';
import ExpCard from './components/ExpCard';
import { prefix, rootPath } from 'helpers/buildUrl';
import { Empty } from 'antd';
import moment from "moment"
import ButtonGoBack from 'routes/Pages/components/Button/ButtonGoBack';
import ButtonSubmit from 'routes/Pages/components/Button/ButtonSubmit';
import ButtonReset from 'routes/Pages/components/Button/ButtonReset';
import { statusBlockUser } from 'Configuration/enum';
import ModalPopUp from '../Component/ModalPopup/ModalPopUp';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.dashBoard'} />, link: '/' },
  { label: <IntlMessages id={'sidebar.listUser'} />, isActive: true },
  { label: <IntlMessages id={'sidebar.detailUser'} />, isActive: true },
];

export default function JobDetail() {
  const { code } = useParams();
  const [item, setItem] = useState({})
  const [company, setCompany] = React.useState([]);
  const [service, setService] = React.useState([]);
  const [exp, setExp] = React.useState([]);
  const [edu, setEdu] = React.useState([]);
  const favCatsInit = useSelector(state => state.initData.initData.FjobCategory);
  const classes = useStyles();

  const loadDetail = async () => {
    try {
      const res = await UserService.userDetail(code);

      setItem(res.data.data)


      setCompany(res.data.data.companyList);


      setService(res.data.data.userServices);


      setExp(res.data.data.experiences);

      setEdu(res.data.data.educations);

    } catch (error) {
      handleError(error);
    }
  };


  const renderRole = () => {
    const arr = []
    if (item.isEmployee === 1) arr.push("???ng vi??n")
    if (item.isEmployer === 1) arr.push("Nh?? tuy???n d???ng")
    return arr.join(" & ")
  }



  React.useEffect(() => {
    loadDetail();
  }, []);

  const stylesUserInfo = item.censorship !== 1 ? { width: "48%" } : {}

  return (
    <PageContainer heading={<IntlMessages id="sidebar.detailUser" />} breadcrumbs={breadcrumbs} className={styles.container}>
      <div className={styles.container_headerPage}>
        <ButtonGoBack />
        <div>
          <Link to={`${rootPath.user}/edit/${code}`}>
            <ButtonReset title="S???a t??i kho???n" width="120px" />
          </Link>
          <Link to={`${rootPath.user}/portfolio/${code}`}>
            <ButtonReset title="S???a h??? s??" width="100px" />
          </Link>
          <Link to={`${rootPath.user}/recharge/${code}`}>
            <ButtonReset title="N???p t??i kho???n" width="129px" />
          </Link>
          <Link to={`${rootPath.user}/store-purchase/${code}`}>
            <ButtonReset title="Th??m d???ch v???" width="129px" />
          </Link>
        </div>
      </div>

      {!!Object.keys(item).length ? (
        <Box className={classes.root}>
          <div className={styles.contentContainer}>
            <div className={styles.infoUser}>
              <div className={styles.infoUser_avatar}>
                <img className={styles.infoUser_avatar_img} src={item.avatar ? item.avatar : `${prefix}/images/logo/avatar.svg`} alt="" />
                <div className={styles.infoUser_avatar_id}>
                  ID: {item.id}
                </div>
              </div>
              <div className={styles.infoUser_content}>
                <div className={styles.infoUser_content_userName}>
                  <div className={styles.infoUser_content_userName_name}>{item.name}</div>
                  <div className={styles.infoUser_content_userName_verify}>{item.verifyKyc === 1 ? (
                    <div className={styles.userInfo_content_item}>
                      <img alt="" src={`${prefix}/images/icons/color/isVerified.svg`} />
                      &nbsp;
                      T??i kho???n ???? ???????c x??c th???c
                    </div>
                  ) : (
                      <div style={{ color: "#FF8500" }} className={styles.userInfo_content_item}>
                        <img alt="" src={`${prefix}/images/icons/color/unVerified.svg`} />
                        &nbsp;
                      T??i kho???n ch??a ???????c x??c th???c
                    </div>
                  )}</div>
                </div>
                <hr className={styles.hrCard} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={stylesUserInfo}>
                    <div className={styles.infoUser_content_item}>
                      <div>Vai tr??:&nbsp;</div>
                      <div className={styles.infoUser_content_item_value}>
                        {renderRole() && <div> {renderRole()}</div>}
                      </div>
                    </div>
                    <div className={styles.infoUser_content_item}>
                      <div>Kim c????ng:&nbsp;</div>
                      <div className={styles.infoUser_content_item_value}>
                        {convertPrice(item.walletValue)}
                      </div>
                    </div>
                    <div className={styles.infoUser_content_item}>
                      <div>?????a ch???:&nbsp;</div>
                      <div className={styles.infoUser_content_item_value}>
                        {item.addresses && item.addresses.map((item) => (<div style={{ marginBottom: "7px" }} key={item.id}>{item.address}</div>))}
                      </div>
                    </div>
                  </div>
                  <div style={stylesUserInfo}>
                    <div className={styles.infoUser_content_item}>
                      <div>Gi???i t??nh:&nbsp;</div>
                      <div className={styles.infoUser_content_item_value}>
                        {convertGender(item.gender)}</div>
                    </div>
                    <div className={styles.infoUser_content_item}>
                      <div>Ng??y sinh:&nbsp;</div>
                      <div className={styles.infoUser_content_item_value}>
                        {moment(item.birthday).format('DD/MM/yyyy')}
                      </div>
                    </div>
                    <div className={styles.infoUser_content_item}>
                      <div>S??? ??i???n tho???i:&nbsp;</div>
                      {item.phoneNumber && <div className={styles.infoUser_content_item_value}>
                        +{item.phoneNumber}
                      </div>}
                    </div>
                    <div className={styles.infoUser_content_item}>
                      <div>Email:&nbsp;</div>
                      <div className={styles.infoUser_content_item_value}>
                        {item.email}
                      </div>
                    </div>
                  </div>
                  {
                    item.censorship === 1 ? (<div className={styles.infoUser_content_button}>
                      <ModalPopUp title="Ki???m duy???t" loadDetail={loadDetail} status={statusBlockUser.Valid} clientId={item.id} />
                      <ModalPopUp title="C???nh b??o vi ph???m" color="#FF8500" loadDetail={loadDetail} status={statusBlockUser.Restricted} clientId={item.id} />
                      <ModalPopUp title="Kho?? ng?????i d??ng" color="red" loadDetail={loadDetail} status={statusBlockUser.Invalid} clientId={item.id} />
                    </div>) : null
                  }
                </div>
              </div>
            </div>
            <div className={styles.wageContainer}>
              <div className={styles.wageContainer_title}>M???C L????NG MONG MU???N</div>
              <div>{convertPrice(item.expectSalaryFrom)} - {convertPrice(item.expectSalaryTo)} VN??/Th??ng</div>
            </div>

            <div className={styles.stackUser}>
              <div className={styles.stackUser_expEdu}>
                <div className={styles.stackUser_expEdu_item}>
                  <div className={styles.stackUser_expEdu_item_title}>KINH NGHI???M L??M VI???C</div>
                  {exp.length ?
                    exp.map(item => (
                      <ExpCard
                        key={item.categoryId}
                        categoryId={item.categoryId}
                        experienceId={item.experienceId}
                        note={item.note}
                      />
                    )) : <div className={styles.stackUser_expEdu_item_NoItem}>Ch??a c?? kinh nghi???m l??m vi???c</div>}
                </div>
                <div className={styles.stackUser_expEdu_item}>
                  <div className={styles.stackUser_expEdu_item_title}>TR??NH ????? H???C V???N</div>
                  {edu.length
                    ? edu.map(item => (
                      <EducationCard
                        key={item.id}
                        shortName={item.shortName}
                        name={item.name}
                        degree={item.degree}
                        major={item.major}
                        startDate={item.startDate}
                        endDate={item.endDate}
                        otherDesc={item.otherDesc}
                      />
                    ))
                    : <div className={styles.stackUser_expEdu_item_NoItem}>Ch??a c?? h???c v???n n??o ???????c th??m v??o</div>}
                </div>
              </div>
              <div style={{ marginTop: "30px" }} className={styles.stackUser_expEdu}>
                <div className={styles.stackUser_expEdu_item}>
                  <div className={styles.stackUser_expEdu_item_title}>NG??NH NGH??? QUAN T??M</div>
                  {item.favCats.length
                    ? <div style={{
                      marginTop: "20px", border: "1px solid #ececec", borderRadius: "25px", padding: "20px", fontSize: "16px"
                    }}>{item.favCats.map(item =>
                      favCatsInit.map(fav => {
                        if (fav.id === item) {
                          return <div style={{ padding: "5px" }} key={fav.id}>- {fav.name}</div>;
                        }
                      }),
                    )}</div>
                    : <div className={styles.stackUser_expEdu_item_NoItem}>Ch??a c?? ng??nh ngh??? n??o ???????c quan t??m</div>}
                </div>
                <div className={styles.stackUser_expEdu_item}>
                  <div className={styles.stackUser_expEdu_item_title}>K??? N??NG</div>
                  {item.profSkills.length
                    ? item.profSkills.map(item => (
                      <ProfSkillCard key={item.id} profSkillId={item.profSkillId} experience={item.experience} note={item.note} />
                    ))
                    : <div className={styles.stackUser_expEdu_item_NoItem}>Ch??a c?? k??? n??ng n??o ???????c th??m</div>}
                </div>
              </div>
            </div>

            <div className={styles.companyContainer}>
              <div className={styles.stackUser_expEdu_item_title}>DANH S??CH DOANH NGHI???P</div>
              <Row justify='space-between' className={styles.itemContainer_row}>
                {company.length
                  ? company.map(item => (
                    <Col style={{ width: "48%" }} key={item.id} span={1000}>
                      <CompanyCard
                        key={item.id}
                        companyAvatar={item.avatar}
                        companyName={item.name}
                        companyContactPhone={item.contactPhone}
                        companyWebsite={item.website}
                        ucUserRole={item.userRole}
                      />
                    </Col>
                  ))
                  : <div className={styles.stackUser_expEdu_item_NoItem}>Ch??a tham gia doanh nghi???p n??o</div>}
              </Row>
            </div>

            <div className={styles.companyContainer} style={{ marginBottom: "100px" }}>
              <div className={styles.stackUser_expEdu_item_title}>DANH S??CH D???CH V???</div>
              <Row justify='space-between' className={styles.itemContainer_row}>
                {service.length
                  ? service.map(item => (
                    <Col style={{ width: "24%" }} key={item.id}>
                      <ServiceCard
                        serviceCode={item.serviceCode}
                        serviceName={item.serviceName}
                        quantity={item.quantity}
                        priceUnit={item.priceUnit}
                      />
                    </Col>
                  ))
                  : <div className={styles.stackUser_expEdu_item_NoItem}>Ch??a c?? d???ch v??? n??o s??? d???ng</div>}
              </Row>
            </div>
          </div>
        </Box>
      ) : (
        <Empty />
      )}

    </PageContainer>
  );
}
