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
import AccountService from 'services/auth/AccountService';

const heading = 'Danh sách tài khoản nhân viên';
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
                    <Link to={`${rootPath.listAccount}/show/${record.id.props.children}`}>Xem chi tiết</Link>
                  </div>
                  <div style={{ padding: '5px' }}>
                    <Link to={`${rootPath.listAccount}/edit/${record.id.props.children}`}>Chỉnh sửa</Link>
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
    title: 'Tên tài  khoản',
    dataIndex: 'userName',
  },
  {
    title: 'Tên nhân viên',
    dataIndex: 'employee',
  },
  {
    title: 'Tạo bởi',
    dataIndex: 'createdBy',
  },
  {
    title: 'Cập nhật bởi',
    dataIndex: 'updatedBy',
  },
  {
    title: 'Quyền của tài khoản',
    dataIndex: 'roles',
  },
];

export default function ListAccount() {
  const [list, setList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const loadList = async () => {
    let res = await AccountService.getAllPageable(currentPage - 1);
    setList(res.data.content);
    console.log(res.data.content);
    setTotal(res.data.totalElements);
  };
  const showDrawer = () => {
    setVisible(true);
  };
  const pathCreate = `${rootPath.listAccount}/new`;
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
      <Link style={{ color: 'black' }} to={`${rootPath.listAccount}/show/${item.id}`}>
        {children}
      </Link>
    );
    rows.push({
      key: item.code,
      id: <JobDetailCpn children={item.id} />,
      userName: <JobDetailCpn children={item.username} />,
      employee: <JobDetailCpn children={item.employee.firstName + " " + item.employee.lastName} />,
      createdBy: <JobDetailCpn children={item.createdBy} />,
      updatedBy: <JobDetailCpn children={item.updatedBy} />,
      roles: <JobDetailCpn children={item.roles[0].roleKey} />,
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
