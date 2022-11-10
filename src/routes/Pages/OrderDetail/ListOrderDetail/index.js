import React, { useEffect } from 'react';
import TableLayout from 'routes/Pages/components/TablleLayout/TableLayout';
import { Box } from '@material-ui/core';
import { useStyles } from 'Configuration/function';
import { Table, Space, Button, Popover } from 'antd';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { rootPath } from 'helpers/buildUrl';
import OrderDetailService from 'services/auth/OrderDetailService';

const heading = 'sidebar.listOrderDetails';
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
                    <Link to={`${rootPath.listOrderDetail}/show/${record.id.props.children}`}>Xem chi tiết</Link>
                  </div>
                  <div style={{ padding: '5px' }}>
                    <Link to={`${rootPath.listOrderDetail}/edit/${record.id.props.children}`}>Chỉnh sửa</Link>
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
    title: 'Tên sản phẩm',
    dataIndex: 'product',
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantityOrder',
  },
  {
    title: 'Giá sản phẩm',
    dataIndex: 'priceEach',
  },
  {
    title: 'Tổng tiền đơn hàng',
    dataIndex: 'sumPrice',
  },
];

export default function ListOrderDetail() {
  const [list, setList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const loadList = async () => {
    let res = await OrderDetailService.getAllPageable(currentPage - 1);
    setList(res.data.content);
    setTotal(res.data.totalElements);
  };
  const showDrawer = () => {
    setVisible(true);
  };

  const pathCreate = `${rootPath.listOrderDetail}/new`;
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
      <Link style={{ color: 'black' }} to={`${rootPath.listOrderDetail}/show/${item.id}`}>
        {children}
      </Link>
    );
    const JobDetailProduct = ({ children }) => (
        <Link style={{ color: 'black' }} to={`${rootPath.listProduct}/show/${item.product.productCode}`}>
          {children}
        </Link>
      );
    rows.push({
      key: item.id,
      id: <JobDetailCpn children={item.id} />,
      product: <JobDetailProduct children={item.product.productName} />,
      quantityOrder: <JobDetailCpn children={item.quantityOrder} />,
      priceEach: <JobDetailCpn children={item.priceEach.toLocaleString("vi-VN")} />,
      sumPrice: <JobDetailCpn children={(item.priceEach * item.quantityOrder).toLocaleString("vi-VN")} />,
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
      pathFilter={pathFilter}>
      <Box style={styleTable} className={classes.root}>
        <Paper className={classes.paper}>
          <Table style={{ borderRadius: '10px' }} columns={columns} dataSource={rows} pagination={false} />
        </Paper>
      </Box>
    </TableLayout>
  );
}
