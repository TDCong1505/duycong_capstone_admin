import React, { useEffect, useState } from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useStyles } from 'Configuration/function';
import styles from '../../Product/New/New.module.scss';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import ButtonGoBack from 'routes/Pages/components/Button/ButtonGoBack';
import { Box, Paper } from '@material-ui/core';
import CardInput from '../../UserManager/User/Component/CardInput/CardInput';
import ProductTypeService from 'services/auth/ProductTypeService';
import { Input, message, Row } from 'antd';
import { useParams } from 'react-router';
import ButtonSubmit from 'routes/Pages/components/Button/ButtonSubmit';

const heading = 'Xoá thông tin loại sản phẩm';
export default function DeleteProductType() {
  const { code } = useParams();
  const [item, setItem] = useState({});
  const loadDetail = async () => {
    let res = await ProductTypeService.getDetail(code);
    setItem(res.data);
  };
  useEffect(() => {
    loadDetail();
  }, []);
  const classes = useStyles();
  const widthCardInput = '40%';
  const handleDelete = async () => {
    let res = await ProductTypeService.deleteByCode(code);
    message.loading({content: 'Loading ...'})
    await setTimeout(() => {
        message.success({ content: 'Xoá thành công', duration: 2 });
    }, 500);
  }
  return (
    <PageContainer heading={<IntlMessages id={heading} />} className={styles.container}>
      <div className={styles.container_headerPage}>
        <ButtonGoBack />
      </div>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <div className={styles.contentArea}>
            <div className={styles.title}>THÔNG TIN LOẠI SẢN PHẨM</div>
            <Row justify="space-between">
              <CardInput title="Tên loại sản phẩm" width={widthCardInput}>
                <Input type="text" value={item.productTypeName} />
              </CardInput>
              <CardInput title="Mã loại sản phẩm" width={widthCardInput}>
                <Input type="text" value={item.productTypeCode} />
              </CardInput>
            </Row>
          </div>
          <div style={{ textAlign: 'center' }}>
            <ButtonSubmit title="Xoá" width="160px" onClick={handleDelete} />
          </div>
        </Paper>
      </Box>
    </PageContainer>
  );
}
