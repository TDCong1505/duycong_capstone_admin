import React, { useEffect } from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';
import TableLayout from 'routes/Pages/components/TablleLayout/TableLayout';
import { Box } from '@material-ui/core';
import { useStyles } from 'Configuration/function';
import { Table, Space, Button, Popover } from 'antd';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { rootPath } from 'helpers/buildUrl';
import CustomerService from 'services/auth/CustomerService';

const heading = 'Danh sách khách hàng';
const columns = [
  {
    title: '',
    dataIndex: '',
    key: 'action',
    render: (text, record) => {
      return (
        <Space size="middle">
          <Popover
            content={
              <div>
                <div style={{ padding: '5px' }}>
                  <Link to={`${rootPath.listCustomer}/show/${record.id.props.children}`}>Xem chi tiết</Link>
                </div>
                <div style={{ padding: '5px' }}>
                  <Link to={`${rootPath.listCustomer}/edit/${record.id.props.children}`}>Sửa thông tin</Link>
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
      );
    },
  },
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Họ và tên',
    dataIndex: 'fullName',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
  },
  {
    title: 'Thành phố',
    dataIndex: 'city',
  },
  {
    title: 'Tiểu bang',
    dataIndex: 'state',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Mã bưu điện',
    dataIndex: 'postalCode',
  },
  {
    title: 'Quốc gia',
    dataIndex: 'country',
  },
  {
    title: 'Điểm tích luỹ',
    dataIndex: 'creditLimit',
  },
];

export default function ListProductType() {
  const [list, setList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const loadList = async () => {
    let res = await CustomerService.getAllPageable(currentPage - 1);
    setList(res.data.content);
    setTotal(res.data.totalElements);
  };
  const onClose = () => {
    setVisible(false);
  };
  const showDrawer = () => {
    setVisible(true);
  };

  const pathCreate = `${rootPath.listCustomer}/new`;
  const pathFilter = null;
  const classes = useStyles();

  const handleCallBack = (Lists, total) => {
    setList(Lists);
    setTotal(total);
  };

  const rows = [];
  const handleChangePage = newPage => {
    setCurrentPage(newPage);
  };
  useEffect(() => {
    loadList();
  }, [currentPage]);
  list.forEach(item => {
    const JobDetailCpn = ({ children }) => (
      <Link style={{ color: 'black' }} to={`${rootPath.listCustomer}/show/${item.id}`}>
        {children}
      </Link>
    );
    rows.push({
      key: item.code,
      id: <JobDetailCpn children={item.id} />,
      fullName: <JobDetailCpn children={item.firstName + ' ' + item.lastName} />,
      phoneNumber: <JobDetailCpn children={item.phoneNumber} />,
      address: <JobDetailCpn children={item.address} />,
      city: <JobDetailCpn children={item.city} />,
      state: <JobDetailCpn children={item.state} />,
      email: <JobDetailCpn children={item.email} />,
      postalCode: <JobDetailCpn children={item.postalCode} />,
      country: <JobDetailCpn children={item.country} />,
      creditLimit: <JobDetailCpn children={item.creditLimit.toLocaleString("vi-VN")} />,
    });
  });

  const styleTable = rows.length > 0 ? { width: '1600px' } : { width: '1600px' };

  return (
    <TableLayout
      handleCallBack={handleCallBack}
      heading={heading}
      currentPage={currentPage}
      rows={rows}
      total={total}
      handleChangePage={handleChangePage}
      showDrawer={showDrawer}
      pathFilter={pathFilter}
      pathCreate={pathCreate}>
      <Box style={styleTable} className={classes.root}>
        <Paper className={classes.paper}>
          <Table style={{ borderRadius: '10px' }} columns={columns} dataSource={rows} pagination={false} />
        </Paper>
      </Box>
    </TableLayout>
  );
}
