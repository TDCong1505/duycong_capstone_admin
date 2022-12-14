import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IntlMessages from '@jumbo/utils/IntlMessages';
import UserService from 'services/auth/UserService';
import { handleError } from '@jumbo/utils/commonHelper';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Box, Backdrop } from '@material-ui/core';
import { Empty, Form, Input, InputNumber, message, Row, Select, Space, Table, Tabs } from 'antd';
import { useStyles } from 'Configuration/function';
import styles from './Recharge.module.scss';
import ButtonGoBack from 'routes/Pages/components/Button/ButtonGoBack';
import ButtonSubmit from 'routes/Pages/components/Button/ButtonSubmit';
import CardInput from '../Component/CardInput/CardInput';
import { CONFIGURATION, convertPrice, convertTimestampToDate, convertTransactionType } from 'Configuration';
import Pagination from 'routes/Pages/components/Pagination/Pagination';
import { add, parseInt } from 'lodash';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { serviceConstant } from 'Configuration/serviceConstants';
import { BlurCircular } from '@material-ui/icons';

const { TabPane } = Tabs;
const { Option, OptGroup } = Select;
const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.dashBoard'} />, link: '/' },
  { label: <IntlMessages id={'sidebar.listUser'} />, isActive: true },
  { label: <IntlMessages id={'sidebar.recharge'} />, isActive: true },
];
const heading = 'sidebar.recharge';
function createDataDiamon(key, transTime, coin, money, transactionType, note) {
  return {
    key,
    transTime,
    coin,
    money,
    transactionType,
    note,
  };
}
function createDataService(key, transTime, detail, quantity, money, transactionType, note) {
  return {
    key,
    transTime,
    detail,
    quantity,
    money,
    transactionType,
    note,
  };
}
const formatter = value => ` ${value}`.replace(/\./, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const parser = x =>
  parseFloat(
    `${x}`
      .replace(/,/, '#')
      .replace(/\./g, '')
      .replace(/#/, '.'),
  );

export default function Recharge() {
  const { code } = useParams();
  const [form] = Form.useForm();
  const [item, setItem] = useState([]);
  const [listDiamon, setListDiamon] = useState([]);
  const [listService, setListService] = useState([]);
  const [currentPageDiamon, setCurrentPageDiamon] = React.useState(1);
  const [totalDiamon, setTotalDiamon] = React.useState();
  const [currentPageService, setCurrentPageService] = React.useState(1);
  const [totalService, setTotalService] = React.useState();
  const [typeRecharge, setTypeRecharge] = useState('diamon');
  const [promotionLists, setPromotionLists] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const tokenUser = localStorage.getItem('token');
  const decoded = jwtDecode(tokenUser) || {};

  let headers = {
    'Content-Type': 'application/json',
  };
  headers = {
    ...headers,
    'x-fjob-user-id': decoded.uid,
    'x-fjob-role': 'user',
    'x-fjob-user-code': decoded.userCode,
  };

  const loadDetail = async () => {
    try {
      const res = await UserService.userDetail(code);
      setItem(res.data.data);
      const resPromotions = await UserService.getPromotions()
      const resServices = await UserService.getServices()
      setServiceList(resServices.data.data)
      setPromotionLists(resPromotions.data.data)
      const resDiamon = await UserService.getHistoryChargeDiamon({
        page: currentPageDiamon,
        limit: CONFIGURATION.page.limit,
        userId: res.data.data.id,
        transType: 1,
      });
      setTotalDiamon(resDiamon.data.meta.pagination.total);
      setListDiamon(resDiamon.data.data);
      const resService = await UserService.getHistoryChargeService({
        page: currentPageService,
        limit: CONFIGURATION.page.limit,
        userId: res.data.data.id,
        transType: 2,
      });
      setTotalService(resService.data.meta.pagination.total);
      setListService(resService.data.data);
    } catch (error) {
      const res = await UserService.userDetail(code);
      const resService = await UserService.getHistoryChargeService({
        page: currentPageService,
        limit: CONFIGURATION.page.limit,
        userId: res.data.data.id,
        transType: 2,
      });
      setTotalService(resService.data.meta.pagination.total);
      setListService(resService.data.data);
      handleError(error);
    }
  };
  const classes = useStyles();
  const key = 'update';
  const onFinish = async values => {
    if (typeRecharge === 'diamon') {
      setOpen(true)
      try {
        await UserService.recharge({
          userId: item.id,
          money: parseInt(values.money),
          money1: 0,
          amount: parseInt(values.amount),
          note: values.note,
          transactionType: values.transactionType,
        });
        form.resetFields();
        loadDetail();
        message.loading({ content: 'Loading...', key });
        setTimeout(() => {
          message.success({ content: 'Th??m kim c????ng th??nh c??ng', key, duration: 2 });
        }, 500);
        setOpen(false)

      } catch (error) {
        handleError(error);
        setOpen(false)

      }
    }
    let services = []
    let promotions = []
    if (typeRecharge === "pack") {
      setOpen(true)

      values.packageId.split('_').shift() === "services" && services.push({ serviceId: parseInt(values.packageId.split('_').pop()), quantity: values.quantity, money: values.amount })
      values.packageId.split('_').shift() === "promotions" && promotions.push({ packageId: parseInt(values.packageId.split('_').pop()), quantity: values.quantity, money: values.amount })
      if (values.pack) {
        values.pack.map(item => item.packageId.split('_').shift() === "services" && services.push({ serviceId: parseInt(item.packageId.split('_').pop()), quantity: item.quantity, money: item.amount }));
        values.pack.map(item => item.packageId.split('_').shift() === "promotions" && promotions.push({ packageId: parseInt(item.packageId.split('_').pop()), quantity: item.quantity, money: item.amount }));
      }

      try {
        await UserService.buyService({
          userId: item.id,
          services,
          promotions,
          platform: process.env.REACT_APP_PLATFORM,
          note: values.note,
          transactionType: values.transactionType,
        });
        form.resetFields();
        loadDetail();
        setTypeRecharge("diamon")
        message.loading({ content: 'Loading...', key });
        setTimeout(() => {
          message.success({ content: 'Th??m g??i c?????c th??nh c??ng', key, duration: 2 });
        }, 500);
        setOpen(false)

      } catch (error) {
        handleError(error);
        setOpen(false)

      }
    }
  };
  const renderRole = () => {
    const arr = [];
    if (item.isEmployee === 1) arr.push('???ng vi??n');
    if (item.isEmployer === 1) arr.push('Nh?? tuy???n d???ng');
    return arr.join(' & ');
  };
  const handleChangeType = value => {
    setTypeRecharge(value);
    value === "pack" && add()
  };

  const columnsDiamon = [
    {
      title: 'Th???i gian n???p',
      dataIndex: 'transTime',
      width: 200,
    },
    {
      title: 'KC n???p',
      dataIndex: 'coin',
      width: 150,
    },
    {
      title: 'S??? ti???n n???p',
      dataIndex: 'money',
      width: 150,
    },
    {
      title: 'Ph??n lo???i',
      dataIndex: 'transactionType',
      width: 200,
    },
    {
      title: 'Ghi ch??',
      dataIndex: 'note',
      width: 400,
    },
  ];
  const columnsPack = [
    {
      title: 'Th???i gian n???p',
      dataIndex: 'transTime',
      width: 200,
    },
    {
      title: 'G??i c?????c',
      dataIndex: 'detail',
      width: 250,
    },
    {
      title: 'S??? l?????ng',
      dataIndex: 'quantity',
      width: 150,
    },
    {
      title: 'S??? ti???n n???p',
      dataIndex: 'money',
      width: 150,
    },
    {
      title: 'Ph??n lo???i',
      dataIndex: 'transactionType',
      width: 200,
    },
    {
      title: 'Ghi ch??',
      dataIndex: 'note',
      width: 400,

    },
  ];
  const rowDiamon = [];
  const rowService = [];
  // const handleAddField = (add) => {
  //   add()
  // }
  listDiamon.map(item => {
    rowDiamon.push(
      createDataDiamon(
        item.transTime,
        convertTimestampToDate(parseInt(item.transTime)),
        convertPrice(item.coin),
        convertPrice(item.money),
        convertTransactionType(parseInt(item.transactionType)),
        item.note,
      ),
    );
  });
  listService.map((item, index) => {
    rowService.push(
      createDataService(
        index,
        convertTimestampToDate(parseInt(item.transTime)),
        item.detail,
        convertPrice(item.quantity),
        convertPrice(item.money),
        convertTransactionType(parseInt(item.transactionType)),
        item.note,
      ),
    );
  });
  const checkQuantity = (_, value) => {
    if (value > 0 && value <= 100) {
      return Promise.resolve();
    }

    return Promise.reject(new Error('S??? l?????ng n???m trong kho???ng t??? 1 ?????n 100'));
  };
  const handleChangePageDiamon = newPage => {
    setCurrentPageDiamon(newPage);
  };
  const handleChangePageService = newPage => {
    setCurrentPageService(newPage);
  };
  useEffect(() => {
    loadDetail();
  }, [currentPageDiamon]);
  useEffect(() => {
    form.setFieldsValue({
      type: "diamon"
    })
  }, [])
  const width = "23%"
  return (
    <PageContainer heading={<IntlMessages id={heading} />} breadcrumbs={breadcrumbs} className={styles.container}>
      <div className={styles.container_headerPage}>
        <ButtonGoBack />

      </div>
      <Box className={classes.root}>
        {!!Object.keys(item).length ? (
          <div>
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
            <div className={styles.rechargeContainer}>
              <div className={styles.rechargeContainer_title}>N???P T??I KHO???N</div>
              <Form
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    form.submit();
                  }
                }}
                name="basic"
                initialValues={{
                  remember: true,
                }}
                form={form}
                onFinish={onFinish}
                autoComplete="off">
                <Row justify={typeRecharge === 'diamon' ? "space-between" : "start"}>
                  <CardInput title="Ch???n lo???i n???p" width={width}>
                    <Form.Item name="type">
                      <Select
                        // defaultValue="diamon"
                        className={styles.select}
                        placeholder="L???a ch???n"
                        onChange={handleChangeType}>
                        <Option value="diamon">N???p kim c????ng</Option>
                        <Option value="pack">N???p g??i c?????c</Option>
                      </Select>
                    </Form.Item>
                  </CardInput>
                  <CardInput title="Ph??n lo???i chi ti???t" width={width}>
                    <Form.Item
                      name="transactionType"
                      rules={[{ required: true, message: 'Ph??n lo???i giao d???ch kh??ng ???????c ????? tr???ng' }]}>
                      <Select className={styles.select} placeholder="L???a ch???n">
                        {CONFIGURATION.transactionType.map(item => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.title}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </CardInput>
                  {typeRecharge === 'diamon' && (
                    <>
                      <CardInput title="S??? kim c????ng" width={width}>
                        <Form.Item name="money" rules={[{ required: true, message: 'S??? kim c????ng kh??ng ???????c ????? tr???ng' }]}>
                          <InputNumber formatter={formatter} parser={parser} />
                        </Form.Item>
                      </CardInput>
                      <CardInput title="S??? ti???n mua" left="0 0 20px 0" width={width}>
                        <Form.Item name="amount" rules={[{ required: true, message: 'S??? ti???n mua kh??ng ???????c ????? tr???ng' }]}>
                          <InputNumber formatter={formatter} parser={parser} />
                        </Form.Item>
                      </CardInput>
                    </>
                  )}
                </Row>
                {typeRecharge === 'pack' && (
                  <div>
                    <div style={{ display: "flex" }}>
                      <div style={{ display: 'flex', width: "100%" }}>
                        <CardInput title="Ch???n g??i c?????c" width={width}>
                          <Form.Item name="packageId" rules={[{ required: true, message: 'G??i c?????c kh??ng ???????c ????? tr???ng' }]}>
                            <Select className={styles.select} placeholder="L???a ch???n">
                              <OptGroup label="G??i D???ch v???">
                                {serviceList.map(item => (
                                  <Select.Option key={`ser${item.id}`} value={`services_${item.id}`}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                      <div> {item.name}</div>
                                      <div>{item.basePrice} KC</div>
                                    </div>
                                  </Select.Option>
                                ))}
                              </OptGroup>
                              <OptGroup label="G??i Khuy???n m???i">
                                {promotionLists.map(item => (
                                  <Select.Option key={`pro${item.id}`} value={`promotions_${item.id}`}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                      <div> {item.name}</div>
                                      <div>{item.basePrice} KC</div>
                                    </div>
                                  </Select.Option>
                                ))}
                              </OptGroup>
                            </Select>
                          </Form.Item>
                        </CardInput>
                        <CardInput title="S??? L?????ng" width={width}>
                          <Form.Item name="quantity" rules={[{
                            validator: checkQuantity,
                          },]}>
                            <InputNumber formatter={formatter} parser={parser} />
                          </Form.Item>
                        </CardInput>
                        <CardInput title="S??? ti???n" width={width}>
                          <Form.Item name="amount" rules={[{ required: true, message: 'S??? ti???n kh??ng ???????c ????? tr???ng' }]}>
                            <InputNumber formatter={formatter} parser={parser} />
                          </Form.Item>
                        </CardInput>
                      </div>

                    </div>

                    <Form.List name="pack"
                    >

                      {(fields, { add, remove }, { errors }) => (

                        <>

                          {fields.map(({ key, name, ...restField }) => (
                            <div key={key} style={{ display: "flex", width: "100%" }}>
                              <div style={{ display: 'flex', width: "100%" }}>
                                <CardInput title="Ch???n g??i c?????c" width={width}>
                                  <Form.Item name={[name, "packageId"]} rules={[{ required: true, message: 'G??i c?????c kh??ng ???????c ????? tr???ng' }]}>
                                    <Select className={styles.select} placeholder="L???a ch???n">
                                      <OptGroup label="G??i D???ch v???">
                                        {serviceList.map(item => (
                                          <Select.Option key={`ser${item.id}`} value={`services_${item.id}`}>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                              <div> {item.name}</div>
                                              <div>{item.basePrice} KC</div>
                                            </div>
                                          </Select.Option>
                                        ))}
                                      </OptGroup>
                                      <OptGroup label="G??i Khuy???n m???i">
                                        {promotionLists.map(item => (
                                          <Select.Option key={`pro${item.id}`} value={`promotions_${item.id}`}>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                              <div> {item.name}</div>
                                              <div>{item.basePrice} KC</div>
                                            </div>
                                          </Select.Option>
                                        ))}
                                      </OptGroup>
                                    </Select>
                                  </Form.Item>
                                </CardInput>
                                <CardInput title="S??? L?????ng" width={width}>
                                  <Form.Item name={[name, "quantity"]} rules={[{
                                    validator: checkQuantity,
                                  },]}>
                                    <InputNumber formatter={formatter} parser={parser} />
                                  </Form.Item>
                                </CardInput>
                                <CardInput title="S??? ti???n" width={width}>
                                  <Form.Item name={[name, "amount"]} rules={[{ required: true, message: 'S??? ti???n kh??ng ???????c ????? tr???ng' }]}>
                                    <InputNumber formatter={formatter} parser={parser} />
                                  </Form.Item>
                                </CardInput>
                                <div style={{ display: "flex", flexDirection: "column", justifyItems: "end" }}>
                                  <button
                                    type="button"
                                    onClick={() => remove(name)}
                                    style={{
                                      width: '50px',
                                      height: '44px',
                                      backgroundColor: '#F5F5F5',
                                      color: 'red',
                                      border: '1px solid rgba(0, 0, 0, 0.05)',
                                      borderRadius: '8px',
                                      marginTop: "44px"
                                    }}>
                                    Xo??
                                  </button>
                                </div>
                              </div>

                            </div>
                          ))}
                          <Form.Item>
                            <div className={styles.addPack} onClick={() => add()}>
                              Th??m g??i c?????c
                            </div>
                            <Form.ErrorList errors={errors} />
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </div>


                )}
                <CardInput width="100%" title="Ghi ch??">
                  <Form.Item name="note" rules={[{ required: true, message: 'Ghi ch?? kh??ng ???????c ????? tr???ng' }]}>
                    <Input placeholder="vd: Kh??ch h??ng mua d???ch v???" />
                  </Form.Item>
                </CardInput>
              </Form>
              <div style={{ textAlign: 'center' }}>
                <ButtonSubmit title="X??c nh???n" width="142px" onClick={() => form.submit()} />
              </div>
            </div>

            <div className={styles.hostoryRecharge}>
              <Tabs defaultActiveKey="histioryDiamon">
                <TabPane tab="L???CH S??? MUA KIM C????NG" key="histioryDiamon">
                  <Table columns={columnsDiamon} dataSource={rowDiamon} pagination={false} />
                  <Pagination currentPage={currentPageDiamon} total={totalDiamon} handleChangePage={handleChangePageDiamon} />
                </TabPane>
                <TabPane tab="L???CH S??? MUA G??I C?????C" key="historyPacket">
                  <Table columns={columnsPack} dataSource={rowService} pagination={false} />
                  <Pagination currentPage={currentPageService} total={totalService} handleChangePage={handleChangePageService} />
                </TabPane>
              </Tabs>
              <Backdrop className={classes.backdrop} open={open}>
                <BlurCircular color="inherit" />
              </Backdrop>
            </div>
          </div>
        ) : (
          <Empty />
        )}
      </Box>
    </PageContainer>
  );
}
