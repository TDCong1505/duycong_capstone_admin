import React, { useEffect, useState } from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ButtonSubmit from 'routes/Pages/components/Button/ButtonSubmit';
import { useStyles } from 'Configuration/function';
import styles from '../../Product/New/New.module.scss';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import ButtonGoBack from 'routes/Pages/components/Button/ButtonGoBack';
import { Box, CircularProgress, Paper } from '@material-ui/core';
import CardInput from 'routes/Pages/UserManager/User/Component/CardInput/CardInput';
import Backdrop from '@material-ui/core/Backdrop';
import { Input, message, Row, Image } from 'antd';
import { useParams } from 'react-router';
import ProductPhotoService from 'services/auth/ProductPhotoService';
import { useHistory } from 'react-router';
import { childPath } from 'helpers/buildUrl';

const heading = 'Xoá ảnh sản phẩm';
export default function DeletePhoto() {
  const history = useHistory();
  const [data, setData] = useState({});
  const { id } = useParams();
  const loadDetail = async () => {
    let res = await ProductPhotoService.getDetail(id);
    setData(res.data);
  };
  useEffect(() => {
    loadDetail();
  }, []);
  const classes = useStyles();
  const handleDelete = async () => {
    let res = ProductPhotoService.deleteById(id);
    message.loading({ content: 'Loading ...' });
    await setTimeout(() => {
      message.success({ content: 'Xoá ảnh thành công', duration: 2 });
    }, 500);
    await history.replace({ pathname: `${childPath.listPhoto}/undefined` });
  };
  const widthCardInput = '80%';
  const [open, setOpen] = React.useState(false);
  return (
    <PageContainer heading={<IntlMessages id={heading} />} className={styles.container}>
      <div className={styles.container_headerPage}>
        <ButtonGoBack />
      </div>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <div className={styles.contentArea}>
            <div className={styles.title}>ẢNH SẢN PHẨM</div>
            <Row justify="space-between">
              <CardInput title="Đường dẫn ảnh sản phẩm" width={widthCardInput}>
                <Input type="text" value={data.photoURL} />
              </CardInput>
              <CardInput title="Ảnh sản phẩm" width={widthCardInput}>
                <Image src={data.photoURL}></Image>
              </CardInput>
            </Row>
            <div style={{ textAlign: 'center' }}>
              <ButtonSubmit title="Xoá" width="160px" onClick={handleDelete} />
            </div>
          </div>
        </Paper>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </PageContainer>
  );
}
