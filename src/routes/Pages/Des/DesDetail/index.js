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
import ProductDesService from 'services/auth/ProductDesService';

const heading = 'sidebar.descDetail';

export default function ProductTypeDetail() {

  const { id } = useParams();
  const [item, setItem] = useState({});
  const loadDetail = async () => {
    let res = await ProductDesService.getById(id);
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
            <div className={styles.title}>THÔNG SỐ SẢN PHẨM</div>
            <Row justify="space-between">
                <CardInput title="Kích thước màn hình" width={widthCardInput}>
                  <Input type="text" value={item.inches} />
                </CardInput>
                <CardInput title="Độ phân giải màn hình" width={widthCardInput}>
                  <Input type="text" value={item.pixels} />
                </CardInput>
                <CardInput title="Bộ nhớ trong" width={widthCardInput}>
                  <Input type="text" value={item.memory} />
                </CardInput>
                <CardInput title="Chipset" width={widthCardInput}>
                  <Input type="text" value={item.chipset} />
                </CardInput>
                <CardInput title="Trọng lượng" width={widthCardInput}>
                  <Input type="text" value={item.weight} />
                </CardInput>
                <CardInput title="Công nghệ màn hình" width={widthCardInput}>
                  <Input type="text" value={item.screen} />
                </CardInput>
                <CardInput title="Quay video" width={widthCardInput}>
                  <Input type="text" value={item.video} />
                </CardInput>
                <CardInput title="Kích thước" width={widthCardInput}>
                  <Input type="text" value={item.size} />
                </CardInput>
                <CardInput title="Pin" width={widthCardInput}>
                  <Input type="text" value={item.pin} />
                </CardInput>
                <CardInput title="Camera trước" width={widthCardInput}>
                  <Input type="text" value={item.camera1} />
                </CardInput>
                <CardInput title="Camera sau" width={widthCardInput}>
                  <Input type="text" value={item.camera2} />
                </CardInput>
                <CardInput title="Hệ điều hành" width={widthCardInput}>
                  <Input type="text" value={item.os} />
                </CardInput>
                <CardInput title="Sim" width={widthCardInput}>
                  <Input type="text" value={item.sim} />
                </CardInput>
                <CardInput title="WLAN" width={widthCardInput}>
                  <Input type="text" value={item.wlan} />
                </CardInput>
                <CardInput title="Bluetooth" width={widthCardInput}>
                  <Input type="text" value={item.bluetooth} />
                </CardInput>
                <CardInput title="GPS" width={widthCardInput}>
                  <Input type="text" value={item.gps} />
                </CardInput>
                <CardInput title="NFC" width={widthCardInput}>
                  <Input type="text" value={item.nfc} />
                </CardInput>
                <CardInput title="Cảm biến" width={widthCardInput}>
                  <Input type="text" value={item.sensor} />
                </CardInput>
                <CardInput title="Thẻ nhớ" width={widthCardInput}>
                  <Input type="text" value={item.memoryCard} />
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
