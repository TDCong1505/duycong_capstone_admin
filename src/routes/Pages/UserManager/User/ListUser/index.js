import React, { useEffect } from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';
import TableLayout from 'routes/Pages/components/TablleLayout/TableLayout';
import { Box } from '@material-ui/core';
import { convertZetaJob, convertGender, convertCensorshipUser, convertEmployee, convertEmployer } from 'Configuration';
import { useStyles } from 'Configuration/function';
import { Table, Space, Button, Popover } from 'antd';
import DrawerFilters from '../Component/DrawerFilter';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { prefix, rootPath } from 'helpers/buildUrl';
import { formatDiamond } from 'helpers/uitilities';
import moment from "moment";

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.dashBoard'} />, link: '/' },
  { label: <IntlMessages id={'sidebar.listUser'} />, isActive: true },
];

const heading = 'sidebar.listUser';


const columns = [
  {
    title: '',
    dataIndex: '',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <Popover
          content={
            <div>
              <div style={{ padding: '5px' }}>
                <Link to={`${rootPath.user}/show/${record.key}`}>Xem chi tiết</Link>
              </div>
              <div style={{ padding: '5px' }}>
                <Link to={`${rootPath.user}/edit/${record.key}`}>Chỉnh sửa</Link>
              </div>
              <div style={{ padding: '5px' }}>
                <Link to={`${rootPath.user}/recharge/${record.key}`}>Nạp tiền</Link>
              </div>
              <div style={{ padding: '5px' }}>
                <Link to={`${rootPath.user}/store-purchase/${record.key}`}>Thêm dịch vụ</Link>
              </div>
            </div>
          }
          trigger="click">
          <Button
            style={{ backgroundColor: 'white', color: 'black', border: '1px solid #ececec' }}
            type="primary"
            danger
            icon={<BsThreeDots />}></Button>
        </Popover>
      </Space>
    ),
  },
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Tên tài khoản',
    dataIndex: 'name',
  },
  {
    title: 'Avatar',
    dataIndex: 'avatar',
  },
  {
    title: 'Kim cương',
    dataIndex: 'walletValue',
  },
  {
    title: 'SĐT',
    dataIndex: 'phoneNumber',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Giới tính',
    dataIndex: 'gender',
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'birthday',
  },
  {
    title: 'EE',
    dataIndex: 'isEmployee',
  },
  {
    title: 'ER',
    dataIndex: 'isEmployer',
  },
];

export default function ListUser() {
  const [list, setList] = React.useState([]);
  useEffect(() => {
    console.log(list);
  },[])
  const [currentPage, setCurrentPage] = React.useState(1);
  const [total, setTotal] = React.useState();
  const [visible, setVisible] = React.useState(false);

  const showDrawer = () => {
    console.log("hiện");
    setVisible(true);
  };

  const pathCreate = `${rootPath.user}/new`;
  const pathFilter = 'yes';

  const onClose = () => {
    setVisible(false);
  };

  const classes = useStyles();

  const handleCallBack = (Lists, total) => {
    setList(Lists);
    setTotal(total);
  };

  const rows = [];
  const handleChangePage = newPage => {
    setCurrentPage(newPage);
  };

  list.forEach(item => {
    const JobDetailCpn = ({ children }) => (
      <Link style={{ color: 'black' }} to={`${rootPath.user}/show/${item.code}`}>
        {children}
      </Link>
    )
    rows.push({
      key: item.code,
      id: <JobDetailCpn children={item.id} />,
      censorship: <JobDetailCpn children={convertCensorshipUser(item.censorship)} />,
      avatar: <JobDetailCpn children={<img src={item.avatar} width="80px" alt="" />} />,
      code: <JobDetailCpn children={item.code} />,
      name: <JobDetailCpn children={item.name} />,
      walletValue: <JobDetailCpn children={formatDiamond(item.walletValue)} />,
      phoneNumber: <JobDetailCpn children={item.phoneNumber} />,
      email: <JobDetailCpn children={item.email} />,
      gender: <JobDetailCpn children={convertGender(item.gender)} />,
      birthday: <JobDetailCpn children={item.birthday ? moment(item.birthday).format('DD/MM/yyyy') : ""} />,
      // isEmployee: <img src='/icons/icon_yes.svg' alt='' />,
      isEmployee: <JobDetailCpn>
        {item.isEmployee === 0 && <img src={`${prefix}/icons/icon_no.png`} alt='' />}
        {item.isEmployee === 1 && <img src={`${prefix}/icons/icon_yes.png`} alt='' />}
      </JobDetailCpn>,
      isEmployer: <JobDetailCpn >
        {item.isEmployer === 0 && <img src={`${prefix}/icons/icon_no.png`} alt='' />}
        {item.isEmployer === 1 && <img src={`${prefix}/icons/icon_yes.png`} alt='' />}
      </JobDetailCpn>,
      zetaAccount: <JobDetailCpn children={convertZetaJob(item.zetaAccount)} />,
      points: <JobDetailCpn children={item.points} />,
    })
  });

  const styleTable = rows.length > 0 ? { width: '1600px' } : { width: '1600px' };

  return (
    <TableLayout
      handleCallBack={handleCallBack}
      heading={heading}
      breadcrumbs={breadcrumbs}
      currentPage={currentPage}
      rows={rows}
      total={total}
      handleChangePage={handleChangePage}
      showDrawer={showDrawer}
      pathCreate={pathCreate}
      pathFilter={pathFilter}>
      <DrawerFilters
        handleCallBack={handleCallBack}
        currentPage={currentPage}
        titleFilter="Tìm kiếm"
        placement="right"
        onClose={onClose}
        visible={visible}
      />
      <Box style={styleTable} className={classes.root}>
        <Paper className={classes.paper}>
          <Table style={{ borderRadius: "10px" }} columns={columns} dataSource={rows} pagination={false} />
        </Paper>
      </Box>
    </TableLayout>
  );
}
