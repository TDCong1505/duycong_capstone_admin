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
import OrderService from 'services/auth/OrderService';


const heading = 'Danh sách đơn hàng';


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
                <Link to={`${rootPath.listOrder}/show/${record.id.props.children}`}>Xem chi tiết</Link>
              </div>
              <div style={{ padding: '5px' }}>
                <Link to={`${rootPath.listOrder}/edit/${record.id.props.children}`}>Chỉnh sửa đơn hàng</Link>
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
    )}
  },
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Ngày đặt đơn',
    dataIndex: 'orderDate',
  },
  {
    title: 'Ngày xác nhận',
    dataIndex: 'requiredDate',
  },
  {
    title: 'Ngày giao hàng',
    dataIndex: 'shippedDate'
  },
  {
    title: 'Ghi chú',
    dataIndex:'comments',
  },
  {
    title:'Trạng thái',
    dataIndex:'status'
  },
];

export default function ListOrder() {

  const [list, setList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const loadList = async () => {
    let res =  await OrderService.getAllOrderPageable(currentPage - 1);
    setList(res.data.content);
    setTotal(res.data.totalElements);
  }
  const showDrawer = () => {
    setVisible(true);
  };

  const pathCreate = `${rootPath.listOrder}/new`;
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
  },[currentPage])
  list.forEach(item => {
    const JobDetailCpn = ({ children }) => (
      <Link style={{ color: 'black' }} to={`${rootPath.listOrder}/show/${item.id}`}>
        {children}
      </Link>
    )
    rows.push({
      key: item.code,
      id: <JobDetailCpn children={item.id} />,
      orderDate: <JobDetailCpn children={item.orderDate.substring(0,10)}/>,
      requiredDate:  <JobDetailCpn children={item.requiredDate.substring(0,10)}/>,
      shippedDate: <JobDetailCpn children={item.shippedDate.substring(0,10)}/>,
      comments:  <JobDetailCpn children={item.comments}/>,
      status:  <JobDetailCpn children={item.status}/>,
    })
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
          <Table style={{ borderRadius: "10px" }} columns={columns} dataSource={rows} pagination={false} />
        </Paper>
      </Box>
    </TableLayout>
  );
}
