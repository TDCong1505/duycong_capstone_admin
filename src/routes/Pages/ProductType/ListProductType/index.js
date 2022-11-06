import React, { useEffect } from 'react';
import TableLayout from 'routes/Pages/components/TablleLayout/TableLayout';
import { Box } from '@material-ui/core';
import { useStyles } from 'Configuration/function';
import { Table, Space, Button, Popover } from 'antd';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { rootPath } from 'helpers/buildUrl';
import ProductTypeService from 'services/auth/ProductTypeService';

const heading = 'Danh sách loại sản phẩm';
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
                <Link to={`${rootPath.listProductType}/show/${record.productTypeCode.props.children}`}>Xem chi tiết</Link>
              </div>
              <div style={{ padding: '5px' }}>
                <Link to={`${rootPath.listProductType}/edit/${record.productTypeCode.props.children}`}>Chỉnh sửa </Link>
              </div>
              <div style={{ padding: '5px' }}>
                <Link to={`${rootPath.listProductType}/delete/${record.productTypeCode.props.children}`}>Xoá</Link>
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
    title: 'Tên loại sản phẩm',
    dataIndex: 'productTypeName',
  },
  {
    title: 'Mã loại sản phẩm',
    dataIndex: 'productTypeCode',
  },
];

export default function ListProductType() {

  const [list, setList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const loadList = async () => {
    let res =  await ProductTypeService.getProductTypePageable(currentPage - 1);
    setList(res.data.content);
    setTotal(res.data.totalElements);
  }
  const showDrawer = () => {
    setVisible(true);
  };
  const pathCreate = `${rootPath.listProductType}/new`;
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
      <Link style={{ color: 'black' }} to={`${rootPath.listProductType}/show/${item.productTypeCode}`}>
        {children}
      </Link>
    )
    rows.push({
      key: item.code,
      id: <JobDetailCpn children={item.id} />,
      productTypeName: <JobDetailCpn children={item.productTypeName}/>,
      productTypeCode: <JobDetailCpn children={item.productTypeCode}/>,
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
