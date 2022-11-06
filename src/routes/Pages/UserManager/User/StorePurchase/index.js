import React from 'react';
import { useParams } from 'react-router-dom';
import IntlMessages from '@jumbo/utils/IntlMessages';
import UserService from 'services/auth/UserService';
import { handleError } from '@jumbo/utils/commonHelper';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Paper, Box } from '@material-ui/core';
import { Form } from 'antd';
import { Link } from 'react-router-dom';
import { useStyles } from 'Configuration/function';
import { useSelector } from 'react-redux';
import styles from './StoreReachase.module.scss';
import { rootPath } from 'helpers/buildUrl';
import StoreItem from './component/storeItem/storeItem';
import ButtonGoBack from 'routes/Pages/components/Button/ButtonGoBack';
import ButtonSubmit from 'routes/Pages/components/Button/ButtonSubmit';
import ButtonReset from 'routes/Pages/components/Button/ButtonReset';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.dashBoard'} />, link: '/' },
  { label: <IntlMessages id={'sidebar.listUser'} />, isActive: true },
  { label: <IntlMessages id={'sidebar.purchase'} />, isActive: true },
];
const heading = 'sidebar.purchase';

export default function StorePurchase() {
  const { code } = useParams();
  const [listItem, setListItem] = React.useState([]);
  const User = useSelector(state => state.user.authUser);
  const resp = User.filter(item => {
    return item.code === code;
  });
  const userId = resp[0].id;
  const loadListItem = async () => {
    try {
      let res = await UserService.getListItemStore({
        platform: process.env.REACT_APP_PLATFORM,
        appVersion: process.env.REACT_APP_API_VERSION,
      });
      setListItem(
        res.data.filter(function(item) {
          return item.itemType === 2;
        }),
      );
    } catch (error) {
      handleError(error);
    }
  };
  const classes = useStyles();
  React.useEffect(() => {
    loadListItem();
  }, []);

  return (
    <PageContainer heading={<IntlMessages id={heading} />} breadcrumbs={breadcrumbs} className={styles.container}>
      <div className={styles.container_headerPage}>
        <ButtonGoBack/>
        {heading === 'sidebar.purchase' ? (
          <div>
            <Link to={`${rootPath.user}/show/${code}`}>
              <ButtonSubmit title="Xem chi tiết" width="115px"/>
            </Link>
            <Link to={`${rootPath.user}/edit/${code}`}>
              <ButtonReset title="Chỉnh sửa" width="115px"/>
            </Link>
          </div>
        ) : null}
      </div>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <div>
            {listItem.map(item => (
              <Form.Item key={item.id}>
                <StoreItem name={item.name} cost={item.cost} id={item.id} userId={userId} code={code} />
              </Form.Item>
            ))}
          </div>
        </Paper>
      </Box>
    </PageContainer>
  );
}
