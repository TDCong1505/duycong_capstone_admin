import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { Box, Paper } from '@material-ui/core';
import { useParams } from 'react-router';
import { handleError } from '@jumbo/utils/commonHelper';
import { message } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStyles } from 'Configuration/function';
import UserService from 'services/auth/UserService';
import { rootPath } from 'helpers/buildUrl';
import styles from './UserRoleDetail.module.scss';
import { useHistory } from 'react-router';
import ButtonGoBack from 'routes/Pages/components/Button/ButtonGoBack';
import ButtonSubmit from 'routes/Pages/components/Button/ButtonSubmit';
import ButtonDelete from 'routes/Pages/components/Button/ButtonDelete';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.dashBoard'} />, link: '/' },
  { label: <IntlMessages id={'sidebar.userRole'} />, isActive: true },
  { label: <IntlMessages id={'sidebar.detailUserRole'} />, isActive: true },
];

export default function JobDetail() {
  const [item, setItem] = React.useState([]);
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const UserRole = useSelector(state => state.user.userRole);
  const loadDetail = async () => {
    try {
      let res = UserRole.filter(item => {
        return item.id === parseInt(id);
      });
      setItem(res[0]);
    } catch (error) {
      handleError(error);
    }
  };
  const key = 'delete';
  const handleDelete = async () => {
    try {
      await UserService.deleteUserRole(id);
      message.loading({ content: 'Loading...', key });
      setTimeout(() => {
        message.success({ content: 'Xóa thành công', key, duration: 2 });
      }, 500);
      history.replace({ pathname: `${rootPath.fjobUserRole}/list` });
    } catch (error) {
      handleError(error);
    }
  };
  React.useEffect(() => {
    loadDetail();
  }, []);
  return (
    <PageContainer heading={<IntlMessages id="sidebar.detailUserRole" />} breadcrumbs={breadcrumbs}>
      <div className={styles.container_headerPage}>
        <ButtonGoBack />
        <div>
          <Link to={`${rootPath.fjobUserRole}/edit/${id}`}>
            <ButtonSubmit title="Chỉnh sửa" width="100px" />
          </Link>
          <ButtonDelete title="Xóa" width="58px" onClick={handleDelete} />
        </div>
      </div>

      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <div style={{ padding: '24px' }}>
            <div className={styles.Item}>
              <h3 className={styles.titleItem}>Email</h3>
              <div>{}</div>
            </div>
            <div className={styles.Item}>
              <h3 className={styles.titleItem}>ID</h3>
              <div>{item.id}</div>
            </div>
            <div className={styles.Item}>
              <h3 className={styles.titleItem}>SĐT</h3>
              <div>{}</div>
            </div>
            <div className={styles.Item}>
              <h3 className={styles.titleItem}>Role</h3>
              <div>{item.role}</div>
            </div>
            <div className={styles.Item}>
              <h3 className={styles.titleItem}>Tên</h3>
              <div>{item.name}</div>
            </div>
          </div>
        </Paper>
      </Box>
    </PageContainer>
  );
}
