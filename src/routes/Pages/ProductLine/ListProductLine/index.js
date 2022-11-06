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
import ProductLineService from 'services/auth/ProductLineService';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.dashBoard'} />, link: '/' },
  { label: <IntlMessages id={'Danh sách sản phẩm'} />, isActive: true },
];

const heading = 'Danh sách hãng sản phẩm';


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
                <Link to={`${rootPath.listProductLine}/show/${record.productLineCode.props.children}`}>Xem chi tiết</Link>
              </div>
              <div style={{ padding: '5px' }}>
                <Link to={`${rootPath.listProductLine}/edit/${record.productLineCode.props.children}`}>Chỉnh sửa loại sản phẩm</Link>
              </div>
              <div style={{ padding: '5px' }}>
                <Link to={`${rootPath.listProduct}/list/${record.id.props.children}`}>Xem các sản phẩm của hãng này</Link>
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
    title: 'Tên hãng sản phẩm',
    dataIndex: 'productLineName',
  },
  {
    title: 'Mã hãng sản phẩm',
    dataIndex: 'productLineCode',
  },
  {
    title: 'Mô tả hãng sản phẩm',
    dataIndex: 'description'
  },
];

export default function ListProductType() {

  const [list, setList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const loadList = async () => {
    let res =  await ProductLineService.getProductLinePageable(currentPage - 1);
    setList(res.data.content);
    setTotal(res.data.totalElements);
  }
  const showDrawer = () => {
    setVisible(true);
  };

  const pathCreate = `${rootPath.listProductLine}/new`;
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
      <Link style={{ color: 'black' }} to={`${rootPath.listProductLine}/show/${item.productLineCode}`}>
        {children}
      </Link>
    )
    rows.push({
      key: item.code,
      id: <JobDetailCpn children={item.id} />,
      productLineName: <JobDetailCpn children={item.productLineName}/>,
      productLineCode: <JobDetailCpn children={item.productLineCode}/>,
      description:  <JobDetailCpn children={item.description}/>,
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
