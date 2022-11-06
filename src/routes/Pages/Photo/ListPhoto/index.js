import React, { useEffect } from 'react';
import IntlMessages from '@jumbo/utils/IntlMessages';
import TableLayout from 'routes/Pages/components/TablleLayout/TableLayout';
import { Box } from '@material-ui/core';
import { useStyles } from 'Configuration/function';
import { Table, Space, Button, Popover, Image } from 'antd';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { rootPath } from 'helpers/buildUrl';
import ProductPhotoService from 'services/auth/ProductPhotoService';


const heading = 'Danh sách ảnh sản phẩm';
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
                <Link to={`${rootPath.listPhoto}/edit/${record.id.props.children}`}>Chỉnh sửa</Link>
              </div>
              <div style={{ padding: '5px' }}>
                <Link to={`${rootPath.listPhoto}/delete/${record.id.props.children}`}>Xoá</Link>
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
    title:'Thuộc sản phẩm',
    dataIndex:'productCode',
  },
  {
    title:'Tên sản phẩm',
    dataIndex:'productName',
  },
  {
    title: 'Ảnh sản phẩm',
    dataIndex: 'image',
    width:'50%'
  },
  {
    title: 'Đường dẫn ảnh',
    dataIndex: 'photoURL',
  },
];

export default function ListPhoto() {

  const [list, setList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const loadList = async () => {
    let res =  await ProductPhotoService.getAllPageable(currentPage - 1);
    setList(res.data.content);
    setTotal(res.data.totalElements);
  }
  const showDrawer = () => {
    setVisible(true);
  };

  const pathCreate = `${rootPath.listPhoto}/new`;
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
      <Link style={{ color: 'black' }} to={`${rootPath.listProduct}/show/${item.product.productCode}`}>
        {children}
      </Link>
    )
    rows.push({
      key: item.code,
      id: <p>{item.id}</p>,
      image: <Image src={item.photoURL} style={{width:'400px',height:'300px'}}></Image>,
      photoURL: <p>{item.photoURL}</p>,
      productCode:<JobDetailCpn children={item.product.productCode} />,
      productName:<JobDetailCpn children={item.product.productName}></JobDetailCpn>,
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
