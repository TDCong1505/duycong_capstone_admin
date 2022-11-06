import React, { useEffect } from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';
import TableLayout from 'routes/Pages/components/TablleLayout/TableLayout';
import { Box } from '@material-ui/core';
import { useStyles } from 'Configuration/function';
import { Table, Space, Button, Popover } from 'antd';
import { BsThreeDots } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { rootPath } from 'helpers/buildUrl';
import ProductService from 'services/auth/ProductService';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.dashBoard'} />, link: '/' },
  { label: <IntlMessages id={'Danh sách sản phẩm'} />, isActive: true },
];

const heading = 'Danh sách sản phẩm';
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
                <Link to={`${rootPath.listProduct}/show/${record.productCode.props.children}`}>Xem chi tiết</Link>
              </div>
              <div style={{ padding: '5px' }}>
                <Link to={`${rootPath.listProduct}/edit/${record.productCode.props.children}`}>Chỉnh sửa sản phẩm</Link>
              </div>
              <div style={{ padding: '5px' }}>
                <Link to={`${rootPath.listProduct}/delete/${record.productCode.props.children}`}>Xoá sản phẩm</Link>
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
    title: 'Tên sản phẩm',
    dataIndex: 'productName',
  },
  {
    title: 'Mã sản phẩm',
    dataIndex: 'productCode',
  },
  {
    title:'Mô tả sản phẩm',
    dataIndex:'productDescripttion',
  },
  {
    title: 'Giá sản phẩm',
    dataIndex: 'buyPrice',
  },
  {
    title: 'Số lượng sản phẩm',
    dataIndex: 'quantityInStock',
  },
];

export default function ListProduct() {

  const { code } = useParams();
  const [list, setList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const loadList = async () => {
    if(code == "undefined"){
      let res =  await ProductService.getProductPageable(currentPage - 1);
    console.log(res.data.totalElements);
    setList(res.data.content);
    setTotal(res.data.totalElements);
    } else {
      //Viết code lấy danh sách sản phẩm theo id hãng sản phẩm
    }
  }
  const showDrawer = () => {
    setVisible(true);
  };

  const pathCreate = `${rootPath.listProduct}/new`;
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
    console.log(code);
  },[currentPage])
  list.forEach(item => {
    const JobDetailCpn = ({ children }) => (
      <Link style={{ color: 'black' }} to={`${rootPath.listProduct}/show/${item.productCode}`}>
        {children}
      </Link>
    )
    rows.push({
      key: item.code,
      id: <JobDetailCpn children={item.id} />,
      productName: <JobDetailCpn children={item.productName}/>,
      productCode: <JobDetailCpn children={item.productCode}/>,
      buyPrice: <JobDetailCpn children={item.buyPrice.toLocaleString("vi-VN")}/>,
      quantityInStock: <JobDetailCpn children={item.quantityInStock}/>,
      productCode: <JobDetailCpn children={item.productCode}/>,
      productDescripttion: <JobDetailCpn children={item.productDescripttion}/>,
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
