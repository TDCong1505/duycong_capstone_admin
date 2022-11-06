import React from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';
import TableLayout from 'routes/Pages/components/TablleLayout/TableLayout';
import UserService from 'services/auth/UserService';
import { handleError } from '@jumbo/utils/commonHelper';
import { Table, Space, Button, Popover, message } from 'antd';
import { useStyles } from 'Configuration/function';
import { rootPath } from 'helpers/buildUrl';
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import { Box, Paper } from '@material-ui/core';
import { useHistory } from 'react-router';
import DrawerFilters from '../Components/DrawerFilter';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.dashBoard'} />, link: '/' },
  { label: <IntlMessages id={'sidebar.userRole'} />, isActive: true },
];

const heading = 'sidebar.userRole';

function createData(key, id, userId, name, role) {
  return {
    key,
    id,
    userId,
    name,
    role,
  };
}

export default function ListUser() {
  const [list, setList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const history = useHistory();
  const [visible, setVisible] = React.useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const pathCreate = `${rootPath.fjobUserRole}/new`;
  const pathFilter = "yes";
  const key = 'delete';
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
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
                  <Link to={`${rootPath.fjobUserRole}/show/${record.key}`}>Show</Link>
                </div>
                <div style={{ padding: '5px' }}>
                  <Link to={`${rootPath.fjobUserRole}/edit/${record.key}`}>Edit</Link>
                </div>
                <div style={{ padding: '5px', color: 'red', cursor: 'pointer' }}>
                  <div
                    onClick={async () => {
                      try {
                        await UserService.deleteUserRole(record.key);
                        message.loading({ content: 'Loading...', key });
                        setTimeout(() => {
                          message.success({
                            content: 'Xóa thành công',
                            key,
                            duration: 2,
                          });
                        }, 500);
                        history.replace({
                          pathname: `${rootPath.fjobUserRole}/list`,
                        });
                      } catch (error) {
                        handleError(error);
                      }
                    }}>
                    Delete
                  </div>
                </div>
              </div>
            }
            trigger="click">
            <Button
              style={{
                backgroundColor: 'white',
                color: 'black',
                border: '1px solid #ececec',
              }}
              type="primary"
              danger
              icon={<BsThreeDots />}
            />
          </Popover>
        </Space>
      ),
    },
  ];
  const classes = useStyles();

  const handleCallBack = (Lists, total) => {
    setList(Lists);
  };
  const onClose = () => {
    setVisible(false);
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
          {item.userId}
        </Link>,
        <Link style={{ color: 'black' }} to={`${rootPath.user}/show/${item.code}`}>
          {item.name}
        </Link>,
        <Link style={{ color: 'black' }} to={`${rootPath.user}/show/${item.code}`}>
          {item.role}
        </Link>,
      ),
    );
  });
  const styleTable = rows.length > 0 ? { width: '700px', paddingRight: '60px' } : { width: '700px' };

  return (
    <TableLayout
      heading={heading}
      breadcrumbs={breadcrumbs}
      currentPage={currentPage}
      rows={rows}
      showDrawer={showDrawer}
      handleChangePage={handleChangePage}
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
          <Table columns={columns} dataSource={rows} pagination={false} />
        </Paper>
      </Box>
    </TableLayout>
  );
}
