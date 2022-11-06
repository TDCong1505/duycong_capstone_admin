import React, { useEffect } from 'react';
import TableLayout from 'routes/Pages/components/TablleLayout/TableLayout';
import { Box } from '@material-ui/core';
import { useStyles } from 'Configuration/function';
import { Table, Space, Button, Popover, Rate } from 'antd';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { rootPath } from 'helpers/buildUrl';
import VoteService from 'services/VoteService';


const heading = 'Danh sách bình luận';
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
                <Link to={`${rootPath.listVote}/show/${record.id.props.children}`}>Xem chi tiết</Link>
              </div>
              <div style={{ padding: '5px' }}>
                <Link to={`${rootPath.listVote}/edit/${record.id.props.children}`}>Chỉnh sửa</Link>
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
    title: 'Khách hàng',
    dataIndex: 'customer',
  },
  {
    title: 'Sản phẩm',
    dataIndex: 'product',
  },
  {
    title: 'Thời gian',
    dataIndex: 'timeVote',
  },
  {
    title:'Nội dung',
    dataIndex:'comment',
  },
  {
    title:'Đánh giá',
    dataIndex:'vote',
  }
];

export default function ListVote() {

  const [list, setList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const loadList = async () => {
    let res =  await VoteService.getAllPageable(currentPage - 1);
    setList(res.data.content);
    setTotal(res.data.totalElements);
  }
  const showDrawer = () => {
    setVisible(true);
  };

  const pathCreate = `${rootPath.listVote}/new`;
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
      <Link style={{ color: 'black' }} to={`${rootPath.listVote}/show/${item.productLineCode}`}>
        {children}
      </Link>
    )
    const CustomerDetail = ({ children }) => (
        <Link style={{ color: 'black' }} to={`${rootPath.listCustomer}/show/${item.customer.id}`}>
          {children}
        </Link>
      )
    const ProductDetail = ({ children }) => (
        <Link style={{ color: 'black' }} to={`${rootPath.listProduct}/show/${item.product.productCode}`}>
          {children}
        </Link>
      )
    rows.push({
      key: item.code,
      id: <JobDetailCpn children={item.id} />,
      customer: <CustomerDetail children={item.customer.firstName + " " + item.customer.lastName}/>,
        product: <ProductDetail children={item.product.productName} />,
        timeVote: <JobDetailCpn children={item.timeVote.substring(0,10)} />,
        comment: <JobDetailCpn children={item.comment} />,
        vote: <JobDetailCpn children={<Rate value={item.vote}/>} />,
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
      pathFilter={pathFilter}>
      <Box style={styleTable} className={classes.root}>
        <Paper className={classes.paper}>
          <Table style={{ borderRadius: "10px" }} columns={columns} dataSource={rows} pagination={false} />
        </Paper>
      </Box>
    </TableLayout>
  );
}
