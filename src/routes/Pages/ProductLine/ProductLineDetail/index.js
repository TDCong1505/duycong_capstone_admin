import React, { useEffect, useState } from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { Form } from 'antd';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ButtonSubmit from 'routes/Pages/components/Button/ButtonSubmit';
import { useStyles } from 'Configuration/function';
import styles from '../../Product/New/New.module.scss';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import ButtonGoBack from 'routes/Pages/components/Button/ButtonGoBack';
import { Box, CircularProgress, Paper } from '@material-ui/core';
import CardInput from '../../UserManager/User/Component/CardInput/CardInput';
import Backdrop from '@material-ui/core/Backdrop';
import { DatePicker, Input, message, Row, Select } from 'antd';
import { useParams } from 'react-router';
import ProductLineService from 'services/auth/ProductLineService';

const heading = 'sidebar.productLineDetail';

export default function ProductTypeDetail() {

  const { code } = useParams();
  const [item, setItem] = useState({});
  const loadDetail = async () => {
    let res = await ProductLineService.getByCode(code);
    setItem(res.data);
  }
  useEffect(() => {
    loadDetail();
  }, []);
  const classes = useStyles();
  const widthCardInput = '40%';
  const [open, setOpen] = React.useState(false);
  return (
    <PageContainer heading={<IntlMessages id={heading} />} className={styles.container}>
      <div className={styles.container_headerPage}>
        <ButtonGoBack />
      </div>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <div className={styles.contentArea}>
            <div className={styles.title}>THÔNG TIN HÃNG SẢN PHẨM</div>
            <Row justify="space-between">
              <CardInput title="Tên hãng sản phẩm" width={widthCardInput}>
                <Input type="text" value={item.productLineName}/>
              </CardInput>
              <CardInput title="Mã hãng sản phẩm" width={widthCardInput}>
                <Input type="text" value={item.productLineCode}/>
              </CardInput>
              <CardInput title="Mô tả hãng sản phẩm" width={'100%'}>
                <Input type="text" value={item.description}/>
              </CardInput>
            </Row>
          </div>
        </Paper>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </PageContainer>
  );
}
