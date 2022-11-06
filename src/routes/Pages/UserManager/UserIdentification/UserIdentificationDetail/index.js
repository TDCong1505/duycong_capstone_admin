import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { Box, Paper } from '@material-ui/core';
import { useParams } from 'react-router';
import { handleError } from '@jumbo/utils/commonHelper';
import { convertGender, convertStatusUserIdentification } from 'Configuration';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { useStyles } from 'Configuration/function';
import { rootPath } from 'helpers/buildUrl';
import styles from './UserIdentificationDetail.module.scss';
import { IoArrowBack } from 'react-icons/io5';
import ButtonGoBack from 'routes/Pages/components/Button/ButtonGoBack';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.dashBoard'} />, link: '/' },
  { label: <IntlMessages id={'sidebar.userIdentification'} />, isActive: true },
  { label: <IntlMessages id={'sidebar.detailBlog'} />, isActive: true },
];

export default function JobDetail() {
  const [item, setItem] = React.useState([]);
  const classes = useStyles();
  const { id } = useParams();
  const UserIdentification = useSelector(state => state.user.userIdentification);
  const loadDetail = async () => {
    try {
      let res = UserIdentification.filter(item => {
        return item.id === parseInt(id);
      });
      setItem(res[0]);
    } catch (error) {
      handleError(error);
    }
  };
  React.useEffect(() => {
    loadDetail();
  }, []);
  return (
    <PageContainer heading={<IntlMessages id="sidebar.detailBlog" />} breadcrumbs={breadcrumbs}>
      <div className={styles.container_headerPage}>
        <ButtonGoBack/>
        {/* <div>
          <Link to={`${rootPath.userIdentification}/edit/${id}`}>
            <Button>Edit</Button>
          </Link>
        </div> */}
      </div>

      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '50%' }}>
                <div style={{ margin: '20px', color: '#8B008B' }}>THÔNG TIN CƠ BẢN</div>
                <div style={{ paddingLeft: '40px' }}>
                  <div className={styles.Item}>Tên user: {item.name}</div>
                  <div className={styles.Item}>User Id: {item.userId}</div>
                  <div className={styles.Item}>Sinh nhật: {new Date(item.birthday).toLocaleDateString()}</div>
                  <div className={styles.Item}>Giới tính: {convertGender(item.gender)}</div>
                </div>
              </div>
              <div>
                <div style={{ margin: '20px', color: '#8B008B' }}>THÔNG TIN XÁC MINH</div>
                <div style={{ paddingLeft: '40px' }}>
                  <div className={styles.Item}>Trạng thái: {convertStatusUserIdentification(item.status)}</div>
                </div>
              </div>
            </div>
            <hr />
            <div style={{ display: 'flex', margin: '20px 0' }}>
              <div style={{ width: '50%', paddingLeft: '40px' }}>
                <div className={styles.Item}>Ảnh Selfie</div>
                <img style={{ width: '80%' }} src={item.selfieImage} alt="" />
              </div>
              <div style={{ width: '50%', paddingLeft: '40px' }}>
                <div className={styles.Item}>Ảnh mặt trước</div>
                <img style={{ width: '80%' }} src={item.frontDocument} alt="" />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '20px 0',
              }}>
              <div style={{ width: '40%' }}>
                <div className={styles.Item}>Ảnh mặt sau</div>
                <img src={item.frontDocument} alt="" />
              </div>
            </div>
          </div>
        </Paper>
      </Box>
    </PageContainer>
  );
}
