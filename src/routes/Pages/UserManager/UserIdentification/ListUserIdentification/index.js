import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';
import TableLayout from 'routes/Pages/components/TablleLayout/TableLayout';
import UserService from 'services/auth/UserService';
import { handleError } from '@jumbo/utils/commonHelper';
import { useDispatch } from 'react-redux';
import { Table, Space, Button, Image, message, Input, Form } from 'antd';
import { Box, Paper } from '@material-ui/core';
import {
  CONFIGURATION,
  convertGender,
  convertStatusUserIdentification,
  convertBirthday,
  convertIdentificationType,
} from 'Configuration';
import { setDataUserIdentification } from 'redux/actions/UserCurrent';
import { useStyles } from 'Configuration/function';
import { Link } from 'react-router-dom';
import { rootPath } from 'helpers/buildUrl';
import { Popup } from 'reactjs-popup';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.dashBoard'} />, link: '/' },
  { label: <IntlMessages id={'sidebar.userIdentification'} />, isActive: true },
];

const heading = 'sidebar.userIdentification';

function createData(key, id, name, birthday, gender, status, identificationType, image, reasonReject) {
  return {
    key,
    id,
    name,
    birthday,
    gender,
    status,
    identificationType,
    image,
    reasonReject,
  };
}

export default function ListUserIdentification() {
  const [list, setList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [total, setTotal] = React.useState();
  const [form] = Form.useForm()
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'name',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthday',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
    },
    {
      title: 'Loại ảnh',
      dataIndex: 'identificationType',
    },
    {
      title: 'Ảnh xác minh',
      dataIndex: 'image',
    },
    {
      title: 'Lý do từ chối',
      dataIndex: 'reasonReject',
    },
    {
      title: 'Thay đổi trạng thái',
      dataIndex: '',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={async () => {
              try {
                await UserService.updateUserIdentification(record.key, {
                  status: 1,
                  reasonReject: '',
                });
                // window.location.reload();
                loadList()
                message.loading({ content: 'Loading...', key });
                setTimeout(() => {
                  message.success({ content: 'Đã phê duyệt', key, duration: 2 });
                }, 500);
              } catch (error) {
                handleError(error);
              }
            }}
            size="middle"
            shape="round">
            Phê duyệt
          </Button>

          <>
            <Popup
              modal
              trigger={
                <Button size="middle" shape="round" danger>
                  Từ chối
                </Button>
              }>
              {close => (
                <div
                  style={{
                    width: '384px',
                    height: '241px',
                    backgroundColor: '#fff',
                    padding: '20px 16px',
                    borderRadius: '10px',
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                  }}>
                  <div
                    style={{
                      marginTop: '6px',
                      fontSize: '17px',
                      fontWeight: 'bold',
                      color: '#2a2e43',
                      textAlign: 'center',
                    }}>
                    Lý do thay đổi
                  </div>
                  <Form
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        form.submit();
                      }
                    }}
                    name="control-hooks"
                    onFinish={async values => {
                      try {
                        await UserService.updateUserIdentification(record.key, {
                          status: 2,
                          reasonReject: values.reasonReject,
                        });
                        message.loading({ content: 'Loading...', key });
                        // window.location.reload();
                        loadList()
                        setTimeout(() => {
                          message.success({ content: 'Đã từ chối', key, duration: 2 });
                        }, 500);
                        close();
                      } catch (error) {
                        handleError(error);
                      }
                    }}>
                    <Form.Item
                      name="reasonReject"
                      style={{ marginTop: '30px' }}
                      rules={[
                        {
                          required: true,
                        },
                      ]}>
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}>
                        <Button
                          style={{ width: '168px', height: '40px' }}
                          onClick={() => {
                            close();
                          }}
                          htmlType="button">
                          Hủy
                        </Button>
                        <Button style={{ width: '168px', height: '40px' }} type="primary" htmlType="submit">
                          Lưu
                        </Button>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              )}
            </Popup>
          </>
        </Space>
      ),
    },
  ];
  const key = 'updated';

  const pathCreate = null;
  const pathFilter = null;

  const dispatch = useDispatch();

  const classes = useStyles();
  const loadList = async () => {
    try {
      let res = await UserService.getAllUserIdentification({
        page: currentPage,
        limit: CONFIGURATION.page.limit,
      });
      setTotal(res.data.meta.pagination.total);
      setList(res.data.data);
      dispatch(setDataUserIdentification(res.data.data));
    } catch (error) {
      handleError(error);
    }
  };

  const handleCallBack = Lists => {
    setList(Lists);
    setCurrentPage(1);
    setTotal(list.length);
  };

  const rows = [];
  const handleChangePage = newPage => {
    setCurrentPage(newPage);
  };
  list.map(item => {
    rows.push(
      createData(
        item.id,
        <Link style={{ color: 'black' }} to={`${rootPath.user}/show/${item.code}`}>
          {item.id}
        </Link>,
        <Link style={{ color: 'black' }} to={`${rootPath.user}/show/${item.code}`}>
          {item.name}
        </Link>,
        <Link style={{ color: 'black' }} to={`${rootPath.user}/show/${item.code}`}>
          {convertBirthday(item.birthday)}
        </Link>,
        <Link style={{ color: 'black' }} to={`${rootPath.user}/show/${item.code}`}>
          {convertGender(item.gender)}
        </Link>,
        <Link style={{ color: 'black' }} to={`${rootPath.userIdentification}/show/${item.id}`}>
          {item.status === 0 && <div style={{color: "#FF8500"}}>{convertStatusUserIdentification(item.status)}</div>}
          {item.status === 1 && <div style={{color: "#6E00C2"}}>{convertStatusUserIdentification(item.status)}</div>}
          {item.status === 2 && <div style={{color: "#E6161A"}}>{convertStatusUserIdentification(item.status)}</div>}
        </Link>,
        <Link style={{ color: 'black' }} to={`${rootPath.userIdentification}/show/${item.id}`}>
          {convertIdentificationType(item.identificationType)}
        </Link>,
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '330px' }}>
          <Image.PreviewGroup>
            <Image width={100} src={item.selfieImage} />
            <Image width={100} src={item.frontDocument} />
            <Image width={100} src={item.backDocument} />
          </Image.PreviewGroup>
        </div>,
        <Link style={{ color: 'black' }} to={`${rootPath.userIdentification}/show/${item.id}`}>
          {item.reasonReject}
        </Link>,
        item.id,
      ),
    );
  });
  const styleTable = rows.length > 0 ? { width: '1600px' } : { width: '1600px' };
  React.useEffect(() => {
    loadList();
  }, [currentPage]);

  return (
    <TableLayout
      handleCallBack={handleCallBack}
      heading={heading}
      breadcrumbs={breadcrumbs}
      currentPage={currentPage}
      rows={rows}
      total={total}
      handleChangePage={handleChangePage}
      pathCreate={pathCreate}
      pathFilter={pathFilter}>
      <Box style={styleTable} className={classes.root}>
        <Paper className={classes.paper}>
          <Table columns={columns} dataSource={rows} pagination={false} />
          <div style={{ display: 'none' }}></div>
        </Paper>
      </Box>
    </TableLayout>
  );
}
