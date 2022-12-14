import React, { useEffect, useState } from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { Carousel, Image , Empty, Input, Row, Rate, Avatar } from 'antd';
import { Form } from 'antd';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useStyles } from 'Configuration/function';
import styles from '../New/New.module.scss';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import ButtonGoBack from 'routes/Pages/components/Button/ButtonGoBack';
import { Box, CircularProgress, Paper } from '@material-ui/core';
import CardInput from '../../UserManager/User/Component/CardInput/CardInput';
import Backdrop from '@material-ui/core/Backdrop';
import ProductService from 'services/auth/ProductService';
import { useParams } from 'react-router';
import ProductDesService from '../../../../services/auth/ProductDesService';
import ProductPhotoService from 'services/auth/ProductPhotoService';
import VoteService from 'services/VoteService';

const heading = 'sidebar.productDetail';

export default function ProductDetail() {

  const [open, setOpen] = React.useState(false);
  const { code } = useParams();
  const [item, setItem] = useState([]);
  const [des, setDes] = useState([]);
  const [photos, setPhoto] = useState([]);
  const [ votes , setVote ] = useState([]);
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  const loadDetail = async () => {
    let res = await ProductService.productDetail(code);
    setItem(res.data);
  };
  const loadPhotos = async () => {
    let res = await ProductPhotoService.getByProductCode(code);
    setPhoto(res.data);
  };
  const loadVotes = async () => {
    let res = await VoteService.getByProductCode(code);
    setVote(res.data);
  }
  const loadDes = async () => {
    let res = await ProductDesService.getByProductCode(code);
    setDes(res.data);
  };
  useEffect(() => {
    loadDetail();
    loadDes();
    loadPhotos();
    loadVotes();
  }, []);
  const [form] = Form.useForm();
  const classes = useStyles();
  const widthCardInput = '30%';
  let count = 0;
  return (
    <PageContainer heading={<IntlMessages id={heading} />} className={styles.container}>
      <div className={styles.container_headerPage}>
        <ButtonGoBack />
      </div>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <div className={styles.contentArea}>
            <div className={styles.title}>TH??NG TIN S???N PH???M</div>
            {!!Object.keys(item).length ? (
              <>
                <Row justify="space-between">
                  <CardInput title="T??n s???n ph???m" width={widthCardInput}>
                    <Input type="text" value={item.productName} />
                  </CardInput>
                  <CardInput title="M?? s???n ph???m" width={widthCardInput}>
                    <Input type="text" value={item.productCode} />
                  </CardInput>
                  <CardInput title="Gi?? s???n ph???m" width={widthCardInput}>
                    <Input type="text" value={item.buyPrice.toLocaleString('vi-VN') + ' VN??'} />
                  </CardInput>
                  <CardInput title="M?? t??? s???n ph???m" width={widthCardInput}>
                    <Input type="text" value={item.productDescripttion} />
                  </CardInput>
                  <CardInput title="S??? l?????ng s???n ph???m" width={widthCardInput}>
                    <Input type="number" value={item.quantityInStock} />
                  </CardInput>
                  <CardInput title="H??ng s???n ph???m" width={widthCardInput}>
                    <Input type="text" value={item.productScale} />
                  </CardInput>
                </Row>
              </>
            ) : (
              <Empty />
            )}
          </div>
        </Paper>
      </Box>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <div className={styles.contentArea}>
            <div className={styles.title}>TH??NG S??? K??? THU???T</div>
            {!!Object.keys(des).length ? (
              <Row justify="space-between">
                <CardInput title="K??ch th?????c m??n h??nh" width={widthCardInput}>
                  <Input type="text" value={des.inches} />
                </CardInput>
                <CardInput title="????? ph??n gi???i m??n h??nh" width={widthCardInput}>
                  <Input type="text" value={des.pixels} />
                </CardInput>
                <CardInput title="B??? nh??? trong" width={widthCardInput}>
                  <Input type="text" value={des.memory} />
                </CardInput>
                <CardInput title="Chipset" width={widthCardInput}>
                  <Input type="text" value={des.chipset} />
                </CardInput>
                <CardInput title="Tr???ng l?????ng" width={widthCardInput}>
                  <Input type="text" value={des.weight} />
                </CardInput>
                <CardInput title="C??ng ngh??? m??n h??nh" width={widthCardInput}>
                  <Input type="text" value={des.screen} />
                </CardInput>
                <CardInput title="Quay video" width={widthCardInput}>
                  <Input type="text" value={des.video} />
                </CardInput>
                <CardInput title="K??ch th?????c" width={widthCardInput}>
                  <Input type="text" value={des.size} />
                </CardInput>
                <CardInput title="Pin" width={widthCardInput}>
                  <Input type="text" value={des.pin} />
                </CardInput>
                <CardInput title="Camera tr?????c" width={widthCardInput}>
                  <Input type="text" value={des.camera1} />
                </CardInput>
                <CardInput title="Camera sau" width={widthCardInput}>
                  <Input type="text" value={des.camera2} />
                </CardInput>
                <CardInput title="H??? ??i???u h??nh" width={widthCardInput}>
                  <Input type="text" value={des.os} />
                </CardInput>
                <CardInput title="Sim" width={widthCardInput}>
                  <Input type="text" value={des.sim} />
                </CardInput>
                <CardInput title="WLAN" width={widthCardInput}>
                  <Input type="text" value={des.wlan} />
                </CardInput>
                <CardInput title="Bluetooth" width={widthCardInput}>
                  <Input type="text" value={des.bluetooth} />
                </CardInput>
                <CardInput title="GPS" width={widthCardInput}>
                  <Input type="text" value={des.gps} />
                </CardInput>
                <CardInput title="NFC" width={widthCardInput}>
                  <Input type="text" value={des.nfc} />
                </CardInput>
                <CardInput title="C???m bi???n" width={widthCardInput}>
                  <Input type="text" value={des.sensor} />
                </CardInput>
                <CardInput title="Th??? nh???" width={widthCardInput}>
                  <Input type="text" value={des.memoryCard} />
                </CardInput>
              </Row>
            ) : (
              <Empty />
            )}
          </div>
        </Paper>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <div className={styles.contentArea}>
            <div className={styles.title}>H??NH ???NH S???N PH???M</div>
            {!!Object.keys(photos).length ? (
              photos.map(photo => {
                count += 1;
                return (
                  <div key={photo.id} style={{display:'inline-block',width:'30%',margin:'20px 10px 0 0',border:'2px solid rgb(130, 24, 209)',padding:'10px 10px 10px 10px',borderRadius:'20px'}}>
                    <h4>???nh {count} :</h4>
                    <Image style={contentStyle} src={photo.photoURL} />
                  </div>
                );
              })
            ) : (
              <Empty />
            )}
          </div>
        </Paper>
      </Box>
      <Box className={classes.root}>
        <Paper className={classes.paper}>
          <div className={styles.contentArea}>
            <div className={styles.title}>B??NH LU???N V??? S???N PH???M</div>
            {!!Object.keys(votes).length ? (
              votes.map(vote => {
                return (
                  <>
                  
                  <h3><Avatar size={64} src="https://joeschmoe.io/api/v1/random" /> {vote.customer.firstName + " " +  vote.customer.lastName} <span style={{color:'red'}}>({vote.timeVote.substring(0,10)})</span>  <Rate value={vote.vote}/> :</h3>
                  <CardInput required width={"100%"}>
                    <Input type="text" value={vote.comment} />
                  </CardInput>
                  </>      
                );
              })
            ) : (
              <Empty />
            )}
          </div>
        </Paper>
      </Box>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </PageContainer>
  );
}
